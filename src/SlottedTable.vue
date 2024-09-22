<template>
  <div :class="computedContainerClass">
    <FilterComponent
      @update="reloadTable"
      @updateSelection="emitUpdateSelection"
    />
    <div
      v-if="loading || !sharedFunctions.getTotalRows()"
      :class="computedBodyClass"
    >
      <div :class="computedDataRowClass">
        <div :class="computedDataCellClass">
          <SpinnerSvg v-if="loading" :text="trs['pleaseWait']" />
          <span v-else>{{ trs["noResults"] }}</span>
        </div>
      </div>
    </div>
    <div v-else :class="computedBodyClass">
      <TableHeader
        @update="reloadTable"
        @updateSelection="emitUpdateSelection"
      />
      <div
        v-for="row in sharedFunctions.getRows()"
        :key="row.ST_UID"
        :class="computedDataRowClass"
      >
        <div
          v-for="column in columns"
          :key="`${row.ST_UID}-${column.value}`"
          :class="computedDataCellClass(column)"
          :style="applyCellDynamicStyle(column)"
          @click="emitRowClicked(row)"
        >
          <div v-if="column.value === selectorUID">
            <input
              :id="row.ST_UID"
              class="st-row-selector"
              type="checkbox"
              v-model="store.checkboxes[row.ST_UID]"
              @change="rowChecked"
            />
          </div>
          <slot
            v-else
            :name="column.value"
            :column="column.value"
            :cellData="row[column.value] || column.empty"
            :data="row"
          >
            <slot
              :column="column.value"
              :cellData="row[column.value] || column.empty"
              :data="row"
            />
          </slot>
        </div>
      </div>
    </div>
    <div :class="computedFooterClass">
      <TableFooter @update="reloadTable" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, toRefs } from "vue";
import i18n from "./i18n/index";
import TableHeader from "./components/TableHeader.vue";
import TableFooter from "./components/TableFooter.vue";
import SpinnerSvg from "./components/SpinnerItem.vue";
import FilterComponent from "./components/FilterComponent.vue";
import store from "./store/main";
import sharedFunctions from "./store/sharedFunctions";
import type {
  THeaders,
  TItem,
  TTranslations,
  TStyles,
  TCallbackParameters,
  TResponseType,
  TReloadParams,
} from "../types/main";
import functions from "./store/sharedFunctions";
import dataLoading from "./store/dataLoading";

// Props
const props = defineProps({
  headers: {
    type: Array as () => THeaders[],
    default: () => [],
    required: true,
  },
  selector: { type: Boolean, default: false },
  items: { type: Array as () => TItem[], default: () => [] },
  styles: { type: Object as () => TStyles, default: () => ({}) },
  language: { type: String, default: "en" },
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  callBack: { type: Function as () => Function | null, default: null },
});

const { headers, items, styles, language, callBack, selector } = toRefs(props);
const trs = ref<TTranslations>(i18n(language.value));

const emit = defineEmits(["updateSelection", "rowClick"]);

/**
 * Executes the provided callback function with the given parameters.
 *
 * @function executeCallback
 * @param {TCallbackParameters} parameters - The parameters to pass to the callback function.
 * @throws {Error} Throws an error if the callback is not defined or invalid.
 * @returns {Promise<{rows: TItem[], totalRows: number}>} The response containing rows and totalRows.
 */
const executeCallback = async (parameters: TCallbackParameters) => {
  if (!callBack.value) {
    throw new Error("Callback is not defined or invalid");
  }

  let response = {} as TResponseType;
  try {
    response = await callBack.value({ ...parameters });
  } catch (e: unknown) {
    console.log(e);
    throw new Error("Callback response is invalid or errored - ");
  }

  if (response?.rows && response.totalRows !== undefined) {
    response.rows.forEach((item: TItem) => {
      item.ST_UID = generateConsistentIdentifier(item);
      store.value.checkboxes[item.ST_UID] = false;
    });
    return {
      rows: response.rows,
      totalRows: response.totalRows,
    };
  }

  throw new Error("Callback response is invalid or errored");
};

/**
 * Calculates and updates the start and end index for the current page of rows.
 *
 * This function uses the current page number and the number of rows per page
 * from the store to determine the starting and ending indices of the rows
 * to be displayed. The start index is calculated as the first row of the
 * current page, and the end index is either the last row of the current page
 * or the total number of rows, whichever is smaller.
 *
 * @returns {void}
 */
const calculateStartEndIndex = () => {
  const { page, rowsPerPage } = store.value;
  store.value.startIndex = (page - 1) * rowsPerPage + 1;
  store.value.endIndex = Math.min(page * rowsPerPage, functions.getTotalRows());
};

/**
 * Applies dynamic styles to a table cell based on the provided column properties.
 *
 * @param {THeaders} column - The column object containing properties for the table cell.
 * @returns {Object} An object containing the dynamic style properties for the table cell.
 *                   - width: The width of the cell in pixels if specified, otherwise "auto".
 */
const applyCellDynamicStyle = (column: THeaders) => ({
  width: column.width ? `${column.width}px` : "auto",
});

/**
 * Computed property to get the loading state from the store.
 * @returns {boolean} - The loading state.
 */
const loading = computed(() => store.value.loading);
/**
 * Computed property to get the columns from the store.
 * @returns {Array} - The columns array.
 */
const columns = computed(() => store.value.columns);
/**
 * Computed property to get the selector column identifier from the store.
 * @returns {string} - The selector column identifier.
 */
const selectorUID = computed(() => store.value.selectorColIdentifier);

/**
 * Computed properties for generating CSS class lists for various parts of the SlottedTable component.
 *
 * - `computedContainerClass`: Computes the CSS classes for the table container.
 * - `computedBodyClass`: Computes the CSS classes for the table body.
 * - `computedDataRowClass`: Computes the CSS classes for the table rows.
 * - `computedDataCellClass`: Computes the CSS classes for the table cells, with an optional column parameter to add a specific class if the column matches the selector UID.
 * - `computedFooterClass`: Computes the CSS classes for the table footer.
 *
 * Each computed property utilizes the `sharedFunctions.getStyle` method to dynamically include additional styles.
 */
const computedContainerClass = computed(() => [
  "slottedtable",
  sharedFunctions.getStyle("container"),
]);
const computedBodyClass = computed(() => [
  "st-body",
  sharedFunctions.getStyle("body"),
]);
const computedDataRowClass = computed(() => [
  "st-row",
  sharedFunctions.getStyle("row"),
]);
const computedDataCellClass = (column?: THeaders) => {
  const list = ["st-cell", sharedFunctions.getStyle("cell")];
  if (column && column.value === selectorUID.value) {
    list.push("w30");
  }

  return list;
};
const computedFooterClass = computed(() => [
  "st-footer",
  sharedFunctions.getStyle("footer"),
]);

/**
 * Asynchronously returns the selected rows based on the current state of the store.
 *
 * If the store has a server callback and all rows are selected, it will execute the callback
 * with the appropriate parameters and return the rows from the server response.
 *
 * If the store has a server callback but not all rows are selected, it will return the selected
 * rows dynamically.
 *
 * If the store does not have a server callback, it will return the selected rows statically.
 *
 * @returns {Promise<Array>} A promise that resolves to an array of selected rows.
 */
const returnSelected = async () => {
  const { allSelected, ordering, rowsPerPage } = store.value;
  if (store.value.hasServerCallback) {
    if (allSelected) {
      const parameters: TCallbackParameters = {
        sortBy: ordering.sortBy,
        sortType: ordering.sortType,
        page: 1,
        rowsPerPage,
        all: true,
      };
      const response = await executeCallback(parameters);
      return response.rows;
    }

    return dataLoading.returnSelectedDynamic();
  }

  return dataLoading.returnSelectedStatic();
};

/**
 * Handles the row checked event.
 *
 * This function sets the display row as selected using the shared function
 * `setDisplayRowSelected` and then emits an update selection event.
 *
 * @async
 * @function rowChecked
 * @returns {Promise<void>} A promise that resolves when the update selection event has been emitted.
 */
const rowChecked = async () => {
  sharedFunctions.setDisplayRowSelected();
  await emitUpdateSelection();
};

/**
 * Emits an "updateSelection" event with the current selection list.
 *
 * This function asynchronously retrieves the selected items using the
 * `returnSelected` function and then emits an "updateSelection" event
 * with the retrieved list.
 *
 * @async
 * @function emitUpdateSelection
 * @returns {Promise<void>} A promise that resolves when the event is emitted.
 */
const emitUpdateSelection = async () => {
  const list = await returnSelected();
  emit("updateSelection", [...list]);
};

/**
 * Emits a "rowClick" event with a copy of the provided row object, excluding the "ST_UID" property.
 *
 * @param {TItem} row - The row object to be processed and emitted.
 */
const emitRowClicked = (row: TItem) => {
  const temp = { ...row };
  delete temp.ST_UID;
  emit("rowClick", temp);
};

/**
 * Generates a consistent identifier for a given object.
 * The identifier is created by serializing the object and hashing the serialized string.
 * The hash is then converted to a hexadecimal string to form the unique identifier.
 *
 * @param {object} data - The object for which to generate the identifier.
 * @returns {string} - A consistent unique identifier for the given object.
 */
const generateConsistentIdentifier = (data: object): string => {
  const serializedData = JSON.stringify(data, Object.keys(data).sort());
  let hash = Date.now() - Math.random();
  for (let i = 0; i < serializedData.length; i++) {
    hash = (hash * 33) ^ serializedData.charCodeAt(i);
  }

  const uniqueId = (hash >>> 0).toString(16);
  return uniqueId;
};

onMounted(async () => {
  store.value.selectorColIdentifier = `${Date.now()}-${Math.random().toString(36)}`;
  // @ts-expect-error TS2322
  store.value.trs = trs;
  store.value.language = language.value;
  if (selector.value) {
    headers.value.unshift({
      text: "",
      value: store.value.selectorColIdentifier,
      sortable: false,
    });
  }
  store.value.columns = headers.value;
  store.value.styles = styles.value;
  store.value.hasCheckboxSelector = selector.value;

  store.value.hasServerCallback = !!callBack.value;
  if (!store.value.hasServerCallback) {
    items.value.forEach((item: TItem) => {
      item.ST_UID = generateConsistentIdentifier(item);
      store.value.checkboxes[item.ST_UID] = false;
    });
    store.value.staticRows.rows = items.value;
    store.value.staticRows.total = items.value.length;
  }

  await reloadTable();
});

/**
 * Reloads the table data based on the provided parameters.
 *
 * @param {TReloadParams} [params={}] - Optional parameters for reloading the table.
 * @param {boolean} [params.resetPage] - If true, resets the current page to the first page.
 * @param {boolean} [params.clearSelected] - If true, clears the selected checkboxes.
 *
 * @returns {Promise<void>} - A promise that resolves when the table data has been reloaded.
 *
 * The function performs the following steps:
 * 1. Sets the loading state to true.
 * 2. If a server callback is available, loads data from the server using the callback.
 * 3. Otherwise, if `resetPage` is true, resets the current page to 1 and loads static data.
 * 4. Calculates the start and end index for the table data.
 * 5. If `clearSelected` is true, resets the selected checkboxes.
 * 6. Sets the loading state to false.
 */
const reloadTable = async (params: TReloadParams = {}) => {
  store.value.loading = true;
  if (store.value.hasServerCallback) {
    await dataLoading.loadServerData(executeCallback);
  } else {
    if (params?.resetPage) {
      store.value.page = 1;
    }
    dataLoading.loadStaticData();
  }
  calculateStartEndIndex();

  if (params?.clearSelected) {
    sharedFunctions.resetCheckboxes();
  }

  store.value.loading = false;
};

/**
 * Asynchronously retrieves the selected items and returns them as a new array.
 *
 * @returns {Promise<Array>} A promise that resolves to an array of selected items.
 */
const getSelection = async () => {
  const list = await returnSelected();
  return [...list];
};

/**
 * Resets the selection of checkboxes in the store.
 * Iterates over all keys in the store's checkboxes object and sets their values to false.
 */
const resetSelection = () => {
  const keys = Object.keys(store.value.checkboxes);
  for (let i = 0; i < keys.length; i += 1) {
    store.value.checkboxes[keys[i]] = false;
  }
};

defineExpose({ reloadTable, getSelection, resetSelection });
</script>

<style scoped>
@import "./assets/main.css";
</style>
