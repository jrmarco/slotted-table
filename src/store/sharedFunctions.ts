import type { TStyleKeys, TItem } from "../../types/main";
import store from "./main";

/**
 * Retrieves the style associated with the given target name from the store.
 *
 * @param targetName - The name of the target element whose style is to be retrieved.
 * @returns The style string associated with the target name, or an empty string if no styles are defined or the target name is invalid.
 */
const getStyle = (targetName: string) => {
  const { styles } = store.value;
  if (!Object.keys(styles).length) {
    return "";
  }

  // Type guard function to check if a key is valid
  function isStyleKey(key: string): key is TStyleKeys {
    return [
      "container",
      "header",
      "body",
      "footer",
      "row",
      "cell",
      "pageselector",
      "pagebtns",
      "filter",
      "filteractions",
      "activefilter",
      "searchbutton",
      "filterbutton",
    ].includes(key);
  }

  if (isStyleKey(targetName)) {
    return styles[targetName] || "";
  }
  return "";
};

/**
 * Checks if a given date string is a valid date.
 *
 * @param dateString - The date string to validate.
 * @returns The timestamp of the date if valid, otherwise `false`.
 */
const isValidDate = (dateString: string) => {
  // Try creating a new Date object
  const date = new Date(dateString);

  // Check if the created date is valid and matches the original string
  if (
    !isNaN(date.getTime()) &&
    dateString === date.toISOString().split("T")[0]
  ) {
    return date.getTime();
  }

  return false;
};

/**
 * Casts the given value to a specific type if possible.
 *
 * - If the value can be converted to a number, it returns the number.
 * - If the value is a valid date, it returns the date.
 * - Otherwise, it returns the original value.
 *
 * @param value - The value to be casted.
 * @returns The casted value as a number, date, or the original value.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const castToType = (value: any) => {
  // Cast to number if number
  if (!isNaN(Number(value))) {
    return Number(value);
  }

  if (isValidDate(value)) {
    return isValidDate(value);
  }
  return value;
};

/**
 * Retrieves the rows from the store based on the presence of a server callback.
 *
 * @returns {Array} The rows to be displayed
 */
const getRows = () => {
  const { hasServerCallback, dynamicRows, staticRows } = store.value;
  return hasServerCallback ? dynamicRows.rows : staticRows.filtered;
};

/**
 * Retrieves the total number of rows from the store.
 *
 * This function checks if there is a server callback available. If so, it returns the total number of dynamic rows.
 * Otherwise, it returns the total number of filtered static rows.
 *
 * @returns {number} The total number of rows.
 */
const getTotalRows = () => {
  const { hasServerCallback, dynamicRows, staticRows } = store.value;
  return hasServerCallback ? dynamicRows.total : staticRows.filteredTotal;
};

/**
 * Resets all checkboxes in the store to `false` and sets `allSelected` to `false`.
 *
 * This function iterates over all checkbox IDs in the store and sets their values to `false`.
 * It also ensures that the `allSelected` property is set to `false`.
 */
const resetCheckboxes = () => {
  const ids = Object.keys(store.value.checkboxes);
  ids.forEach((id: string) => {
    store.value.checkboxes[id] = false;
  });
  store.value.allSelected = false;
};

/**
 * Updates the display of selected rows in the store.
 *
 * This function performs the following steps:
 * 1. Initializes an empty array to keep track of checked items.
 * 2. Sets the `allSelected` property of the store to `false`.
 * 3. Iterates over the keys of the `checkboxes` object in the store and adds checked items to the `checked` array.
 * 4. Resets all checkboxes in the store.
 * 5. Retrieves the rows and maps them to their unique identifiers (`ST_UID`).
 * 6. Re-checks the checkboxes for items that are still present in the rows.
 *
 * @remarks
 * This function assumes the existence of `store`, `resetCheckboxes`, and `getRows` functions or variables in the scope.
 *
 * @returns {void}
 */
const setDisplayRowSelected = () => {
  const checked = [];
  store.value.allSelected = false;

  const keys = Object.keys(store.value.checkboxes);
  for (let i = 0; i < keys.length; i += 1) {
    if (store.value.checkboxes[keys[i]]) {
      checked.push(keys[i]);
    }
  }

  resetCheckboxes();
  const rows = getRows().map((row: TItem) => row.ST_UID);
  checked.forEach((key: string) => {
    if (rows.indexOf(key) !== -1) {
      store.value.checkboxes[key] = true;
    }
  });
};

export default {
  getStyle,
  castToType,
  getRows,
  getTotalRows,
  resetCheckboxes,
  setDisplayRowSelected,
};
