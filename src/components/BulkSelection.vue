<template>
  <div :class="computedBulkActionContainer">
    <p>{{ trs.bulkActions }}:</p>
    <p>{{ totalSelected }}</p>
    <button @click="setSelectAll">{{ currentSelectionText }}</button>
  </div>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import store from "../store/main";
import sharedFunctions from "../store/sharedFunctions";
import type { TItem } from "../../types/main";
const trs = computed(() => store.value.trs);

/**
 * Computed property that returns an array containing the class name for bulk actions
 * and a style value retrieved from shared functions.
 *
 * @returns {Array} An array with the class name "st-bulkactions" and a style value.
 */
const computedBulkActionContainer = computed(() => [
  "st-bulkactions",
  sharedFunctions.getStyle("bulkactions"),
]);

/**
 * Computed property that returns the current selection text.
 * It retrieves the 'selectAll' text from the 'trs' reactive reference.
 *
 * @returns {string} The text indicating the current selection state.
 */
const currentSelectionText = computed(() => {
  return trs.value.selectAll;
});

/**
 * Computed property that calculates the total number of selected items.
 * It considers whether the selection is managed by a server callback or locally.
 *
 * @returns {number} The total number of selected items.
 */
const totalSelected = computed(() => {
  const { hasServerCallback, checkboxes, dynamicRows, staticRows } =
    store.value;
  const checked = Object.values(checkboxes).filter((val) => val);
  if (!store.value.allSelected) {
    return checked.length;
  }
  return hasServerCallback ? dynamicRows.total : staticRows.total;
});

const emit = defineEmits(["updateSelection"]);

/**
 * Sets the "select all" state in the store and updates the selection status of all rows.
 *
 * This function updates the `allSelected` property in the store to `true`, indicating that all rows are selected.
 * It then determines whether to use `dynamicRows` or `staticRows` based on the presence of a server callback.
 * For each row, it sets the corresponding checkbox state to `true` in the store.
 * Finally, it emits an "updateSelection" event to notify other components of the change in selection state.
 *
 * @typedef {Object} TItem - Represents a row item with a unique identifier `ST_UID`.
 */
const setSelectAll = () => {
  store.value.allSelected = true;
  const { hasServerCallback, dynamicRows, staticRows } = store.value;
  const rows = hasServerCallback ? dynamicRows.rows : staticRows.rows;
  rows.forEach((row: TItem) => {
    store.value.checkboxes[row.ST_UID] = true;
  });
  emit("updateSelection");
};
</script>
