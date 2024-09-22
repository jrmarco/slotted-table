<template>
  <div :class="computedHeaderRowClass">
    <div
      v-for="(column, idx) in columns"
      :key="column.value || idx"
      @click="orderBy(column)"
      :class="computedDataCellClass(column)"
      :style="applyCellDynamicStyle(column)"
      :title="column.text"
    >
      <b v-if="column.value !== selectorUID"
        >{{ column.text }} <span v-html="getDirection(column.value)"
      /></b>
      <button
        v-else
        class="st-select-all"
        @click="togglePageSelection"
        :title="trs.selectCurrentPageElement"
      >
        ☑️
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import store from "./../store/main";
import sharedFunctions from "../store/sharedFunctions";
import type { THeaders, TItem } from "../../types/main";

const emit = defineEmits(["update", "updateSelection"]);

const columns = computed(() => store.value.columns);
const selectorUID = computed(() => store.value.selectorColIdentifier);
const trs = computed(() => store.value.trs);

/**
 * Computes the CSS classes for the table header row.
 *
 * @returns {Array} An array of CSS class names including:
 * - "st-row": A base class for table rows.
 * - "st-header": A base class for header rows.
 * - Additional classes derived from shared functions for row and header styles.
 */
const computedHeaderRowClass = computed(() => {
  return [
    "st-row",
    "st-header",
    sharedFunctions.getStyle("row"),
    sharedFunctions.getStyle("header"),
  ];
});

/**
 * Computes the CSS class list for a data cell based on the provided column properties.
 *
 * @param {THeaders} column - The column object containing properties for the header.
 * @returns {string[]} - An array of CSS class names to be applied to the data cell.
 */
const computedDataCellClass = (column: THeaders) => {
  const classList = [
    "st-cell",
    column.sortable ? "st-pointer" : "",
    sharedFunctions.getStyle("cell"),
  ];

  if (column.value === selectorUID.value) {
    classList.push("w30");
  }

  return classList;
};

/**
 * Orders the table by the specified column.
 *
 * @param {Object} column - The column to order by.
 * @param {string} column.value - The value of the column.
 * @param {boolean} column.sortable - Indicates if the column is sortable.
 *
 * If the column is not sortable or has no value, the function returns early.
 * Otherwise, it toggles the sort type between 'asc' and 'desc' based on the current sort state,
 * and updates the store with the new sort order. Finally, it emits an 'update' event.
 */
const orderBy = (column: { value: string; sortable: boolean }) => {
  if (!column || !column.value || !column.sortable) return;
  const { sortBy, sortType } = store.value.ordering;
  store.value.ordering.sortType =
    sortBy === column.value ? (sortType === "asc" ? "desc" : "asc") : "asc";
  store.value.ordering.sortBy = column.value;
  emit("update");
};

/**
 * Applies dynamic styles to a table header cell based on the provided column properties.
 *
 * @param {THeaders} column - The column object containing header properties.
 * @returns {Object} An object containing the dynamic styles for the table header cell.
 */
const applyCellDynamicStyle = (column: THeaders) => {
  return {
    width: column.width ? `${column.width}px` : "auto",
  };
};

/**
 * Determines the sort direction arrow for a given column name.
 *
 * @param {string} columnName - The name of the column to check the sort direction for.
 * @returns {string} - Returns an upward arrow ("&uarr;") if the sort type is ascending or not set,
 *                     a downward arrow ("&darr;") if the sort type is descending,
 *                     or an empty string if the column is not the one being sorted.
 */
const getDirection = (columnName: string) => {
  const { sortBy, sortType } = store.value.ordering;
  if (sortBy !== columnName) {
    return "";
  }

  return !sortType || sortType === "asc" ? "&uarr;" : "&darr;";
};

/**
 * Toggles the selection state of all rows on the current page.
 *
 * If all rows are currently selected, it will deselect all rows and reset the checkboxes.
 * If not all rows are selected, it will toggle the selection state of each row.
 *
 * Emits an "updateSelection" event after toggling the selection state.
 *
 * @function togglePageSelection
 */
const togglePageSelection = () => {
  const rows = sharedFunctions.getRows();
  if (store.value.allSelected) {
    store.value.allSelected = false;
    sharedFunctions.resetCheckboxes();
    return;
  }

  rows.forEach((row: TItem) => {
    store.value.checkboxes[row.ST_UID] = !store.value.checkboxes[row.ST_UID];
  });
  emit("updateSelection");
};
</script>
