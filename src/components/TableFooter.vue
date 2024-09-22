<template>
  <div :class="computedPageSelectorClass">
    {{ trs["rowsPerPage"] }}
    <select
      name="st-rows-per-page-selector"
      class="st-select"
      v-model="rowsPerPage"
      @change="setPage(1)"
    >
      <option
        v-for="option in rowsPerPageOptions"
        :key="option"
        :value="option"
      >
        {{ option }}
      </option>
    </select>
  </div>
  <div>
    {{ startIndex }}-{{ endIndex }} {{ trs["of"] }}
    {{ sharedFunctions.getTotalRows() || 0 }}
  </div>
  <div
    v-if="sharedFunctions.getTotalRows() > rowsPerPage"
    :class="computedPageButtonsClass"
  >
    <template v-for="pageNum in pages" :key="pageNum">
      <button
        v-if="typeof pageNum === 'number'"
        :class="{ 'st-active': Number(pageNum) === Number(page) }"
        @click="setPage(pageNum)"
      >
        {{ pageNum }}
      </button>
      <span v-else>&nbsp;&nbsp;</span>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import store from "./../store/main";
import sharedFunctions from "../store/sharedFunctions";

const emit = defineEmits(["update"]);

const rowsPerPageOptions = computed(() => {
  return [5, 10, 25, 50];
});

/**
 * Computes the pagination pages to be displayed based on the total number of rows,
 * rows per page, and the current page.
 *
 * @returns {Array<string | number>} An array of page numbers and ellipses to be displayed.
 */
const pages = computed(() => {
  const { rowsPerPage, page } = store.value;
  if (!sharedFunctions.getTotalRows()) return [];
  const totalPages = Math.ceil(sharedFunctions.getTotalRows() / rowsPerPage);
  const currentPage = page;
  if (totalPages <= 4)
    return Array.from({ length: totalPages }, (_, i) => i + 1);

  const pages: (string | number)[] = [1];
  if (currentPage > 3) pages.push("...");
  if (currentPage > 2) pages.push(currentPage - 1);
  if (currentPage !== 1 && currentPage !== totalPages) pages.push(currentPage);
  if (currentPage < totalPages - 1) pages.push(currentPage + 1);
  if (currentPage < totalPages - 2) pages.push("...");
  pages.push(totalPages);
  return pages;
});

/**
 * Computed property for rows per page with getter and setter.
 * - `get`: Retrieves the current number of rows per page from the store.
 * - `set`: Updates the number of rows per page in the store.
 */
const rowsPerPage = computed({
  get() {
    return store.value.rowsPerPage;
  },
  set(newValue) {
    store.value.rowsPerPage = newValue;
  },
});
// Computed property for the start index of the current page.
const startIndex = computed(() => store.value.startIndex);
// Computed property for the end index of the current page.
const endIndex = computed(() => store.value.endIndex);
// Computed property for the current page number.
const page = computed(() => store.value.page);

/**
 * Sets the current page number in the store and emits an update event.
 *
 * @param {number} pageNum - The page number to set. Must be an integer greater than or equal to 1.
 * @returns {Promise} - A promise that resolves when the page number is set and the event is emitted.
 */
const setPage = async (pageNum: number) => {
  if (!Number.isInteger(pageNum) || pageNum < 1) return;
  store.value.page = pageNum;
  emit("update", { clearSelected: true });
};

/**
 * Computed property that retrieves the 'trs' value from the store.
 *
 * @returns {Array} The 'trs' array from the store.
 */
const trs = computed(() => store.value.trs);

/**
 * Computed property that returns an array of CSS classes for the page selector.
 * The array includes a default class "st-pageselector" and a dynamically
 * retrieved class from shared functions.
 *
 * @returns {Array} Array of CSS class names for the page selector.
 */
const computedPageSelectorClass = computed(() => {
  return ["st-pageselector", sharedFunctions.getStyle("pageselector")];
});

/**
 * Computed property that returns an array of CSS classes for page buttons.
 * The array includes a default class "st-pagebtns" and a dynamically
 * retrieved class from sharedFunctions.getStyle("pagebtns").
 *
 * @returns {Array} Array of CSS class names for page buttons.
 */
const computedPageButtonsClass = computed(() => {
  return ["st-pagebtns", sharedFunctions.getStyle("pagebtns")];
});
</script>
