import type {
  TItem,
  TCallbackParameters,
  TResponseType,
} from "../../types/main";
import store from "./main";
import sharedFunctions from "./sharedFunctions";

/**
 * Orders the static rows in the store based on the specified ordering criteria.
 *
 * This function retrieves the static rows and ordering information from the store,
 * then sorts the rows according to the `sortBy` field and `sortType` (ascending or descending).
 *
 * The sorting is performed using the `sharedFunctions.castToType` method to ensure
 * that the values are compared correctly based on their types.
 *
 * @returns {void}
 */
const orderStaticResults = () => {
  const { staticRows, ordering } = store.value;
  const { sortBy, sortType } = ordering;
  staticRows.rows.sort((a, b) => {
    const valueA = sharedFunctions.castToType(a[sortBy]);
    const valueB = sharedFunctions.castToType(b[sortBy]);
    if (valueA < valueB) return sortType === "asc" ? -1 : 1;
    if (valueA > valueB) return sortType === "asc" ? 1 : -1;
    return 0;
  });
};

/**
 * Searches for matching results locally based on the applied filters.
 *
 * This function filters the `staticRows` in the store based on the provided filters.
 * If no filters are applied, it returns all rows. Otherwise, it checks each row to see if
 * it matches all the filters.
 *
 * @returns {void} This function does not return a value. It updates the `staticRows.filtered`
 * and `staticRows.filteredTotal` properties in the store.
 */
const searchMatchingResultsLocally = () => {
  const { filters, staticRows } = store.value;

  // If no filters are applied, return all rows
  if (filters.length === 0) {
    store.value.staticRows.filtered = staticRows.rows;
    store.value.staticRows.filteredTotal = staticRows.rows.length;
    return;
  }

  const filtered: Array<TItem> = staticRows.rows.filter((item: TItem) => {
    const values = Object.values(item).join("|").toLowerCase();
    let isMatching = 0;
    for (const filter of filters) {
      const match = values.includes(filter.toLowerCase());
      isMatching += match ? 1 : 0;
    }

    return isMatching === filters.length;
  });

  store.value.staticRows.filtered = filtered;
  store.value.staticRows.filteredTotal = filtered.length;
};

/**
 * Slices the static results based on the current page and rows per page.
 *
 * This function updates the `filtered` property of `staticRows` in the store
 * by slicing it according to the current page and rows per page values.
 *
 * @remarks
 * - The `page` and `rowsPerPage` values are used to determine the start and end indices for slicing.
 * - The sliced results are then assigned back to `staticRows.filtered`.
 */
const sliceStaticResults = () => {
  const { page, rowsPerPage, staticRows } = store.value;
  store.value.staticRows.filtered = staticRows.filtered.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage,
  );
};

const loadStaticData = () => {
  orderStaticResults();
  searchMatchingResultsLocally();
  sliceStaticResults();
};

/**
 * Loads server data based on the current state of the store and updates the store with the response.
 *
 * @param executeCallback - A callback function that takes `TCallbackParameters` and returns a promise of `TResponseType`.
 *
 * The function performs the following steps:
 * 1. Extracts pagination, ordering, and filter information from the store.
 * 2. Constructs the `parameters` object to be passed to the callback.
 * 3. Checks if the filters have changed and resets the page number if necessary.
 * 4. Updates the store's previous filters.
 * 5. Executes the callback with the constructed parameters.
 * 6. Updates the store with the rows and total rows from the response.
 */
const loadServerData = async (
  executeCallback: (parameters: TCallbackParameters) => Promise<TResponseType>,
) => {
  const { page, rowsPerPage, ordering, filters, prevFilters } = store.value;
  const { sortBy, sortType } = ordering;
  const parameters: TCallbackParameters = {
    page,
    rowsPerPage,
    sortBy,
    sortType,
  };
  if (filters.length > 0) {
    parameters.filters = filters;
    if (
      filters.length !== prevFilters.length ||
      filters.join("|") !== prevFilters.join("|")
    ) {
      store.value.page = 1;
      parameters.page = 1;
    }

    store.value.prevFilters = [...filters];
  } else {
    store.value.prevFilters = [];
  }

  const response = await executeCallback(parameters);
  store.value.dynamicRows.rows = response.rows;
  store.value.dynamicRows.total = response.totalRows;
};

/**
 * Returns an array of selected dynamic rows from the store.
 *
 * This function filters the dynamic rows based on the checkboxes in the store,
 * and returns a new array of objects with the `ST_UID` property removed.
 *
 * @returns {Array<object>} An array of selected dynamic rows with `ST_UID` removed.
 */
const returnSelectedDynamic = () => {
  const { dynamicRows } = store.value;
  return dynamicRows.rows
    .filter((item: TItem) => {
      return store.value.checkboxes[item.ST_UID];
    })
    .map((item: TItem) => {
      const temp = { ...item };
      delete temp.ST_UID;
      return temp;
    });
};

/**
 * Returns an array of selected static rows with the `ST_UID` property removed.
 *
 * This function checks the `store.value` object for the `checkboxes`, `allSelected`,
 * and `staticRows` properties. If `allSelected` is true, it uses all rows from
 * `staticRows.rows`; otherwise, it uses the filtered rows from `staticRows.filtered`.
 *
 * It then filters the rows based on the `checkboxes` property, and maps each selected
 * row to a new object with the `ST_UID` property removed.
 *
 * @returns {TItem[]} An array of selected static rows without the `ST_UID` property.
 */
const returnSelectedStatic = () => {
  const { checkboxes, allSelected, staticRows } = store.value;
  const rows = allSelected ? staticRows.rows : staticRows.filtered;
  return rows
    .filter((row: TItem) => checkboxes[row.ST_UID])
    .map((item: TItem) => {
      const temp = { ...item };
      delete temp.ST_UID;
      return temp;
    });
};

export default {
  loadStaticData,
  loadServerData,
  returnSelectedDynamic,
  returnSelectedStatic,
};
