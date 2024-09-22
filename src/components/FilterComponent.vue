<template>
  <div :class="computedFilterContainerClass">
    <div :class="computedFilterActionClass">
      {{ trs.filter }}
      <input
        id="st-text-search"
        type="text"
        @keyup.enter="updateFilterText"
        v-model="searchText"
        autocomplete="on"
      />
      <button
        :class="computedFilterButtonSearch"
        @click="updateFilterText"
        :disabled="currentRows <= 0"
      >
        {{ trs.search }}
      </button>
    </div>
    <BulkActions v-if="useCheckbox" @updateSelection="emitUpdateSelection" />
  </div>
  <div v-if="activefilters.length > 0" :class="computedActiveFilters">
    {{ trs.activefilters }}
    <button
      :class="computedFilterButtonsActive"
      v-for="activefilter in activefilters"
      v-bind:key="normalizeString(activefilter)"
      :data-key="normalizeString(activefilter)"
      @click="removeTextFilter"
    >
      {{ activefilter }}
    </button>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed } from "vue";
import store from "../store/main";
import sharedFunctions from "../store/sharedFunctions";
import BulkActions from "./BulkSelection.vue";

const trs = computed(() => store.value.trs);
const searchText = ref("");
const activeList = ref<string[]>([]);

const emit = defineEmits(["update", "updateSelection"]);

/**
 * Computed properties for FilterComponent.vue
 *
 * - computedFilterContainerClass: Computes the CSS classes for the filter container.
 * - computedFilterActionClass: Computes the CSS classes for the filter actions.
 * - computedActiveFilters: Computes the CSS classes for the active filters.
 * - computedFilterButtonSearch: Computes the CSS classes for the search button in the filter.
 * - computedFilterButtonsActive: Computes the CSS classes for the active filter buttons.
 *
 * Each computed property returns an array containing a default class and a dynamically
 * generated class from the sharedFunctions.getStyle method.
 */
const computedFilterContainerClass = computed(() => [
  "st-filtercontainer",
  sharedFunctions.getStyle("filter"),
]);
const computedFilterActionClass = computed(() => [
  "st-filteractions",
  sharedFunctions.getStyle("filteractions"),
]);
const computedActiveFilters = computed(() => [
  "st-activefilter",
  sharedFunctions.getStyle("activefilter"),
]);
const computedFilterButtonSearch = computed(() => [
  "st-searchbutton",
  sharedFunctions.getStyle("searchbutton"),
]);
const computedFilterButtonsActive = computed(() => [
  "st-filterbutton",
  sharedFunctions.getStyle("filterbutton"),
]);

/**
 * Computed property that returns the active filters from the store.
 * If no filters are present, it returns an empty array.
 */
const activefilters = computed(() => store.value.filters || []);

/**
 * Computed property that checks if the checkbox selector is enabled in the store.
 * Returns a boolean value.
 */
const useCheckbox = computed(() => store.value.hasCheckboxSelector);

/**
 * Computed property that returns the current number of rows.
 */
const currentRows = computed(() =>
  store.value.hasServerCallback
    ? store.value.dynamicRows.total
    : store.value.staticRows.filteredTotal,
);

/**
 * Normalizes a given string by performing the following operations:
 *
 * @param {string} rawString - The string to be normalized.
 * @returns {string} - The normalized string.
 */
const normalizeString = (rawString: string) => {
  if (!rawString || rawString === "") {
    return "";
  }
  let curedString = rawString.trim().toLowerCase();
  curedString = curedString.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  curedString = curedString.replace(/[^a-z0-9]/g, "-").trim();

  return curedString;
};

/**
 * Updates the filter text based on the current search text and active rows.
 *
 * @function updateFilterText
 */
const updateFilterText = () => {
  const text = store.value.filters || [];
  if (searchText.value === "" || currentRows.value <= 0) {
    return;
  }

  const curedString = normalizeString(searchText.value);
  if (!text || text.length === 0) {
    if (!text) {
      store.value.filters = [];
    }
    sharedFunctions.resetCheckboxes();
    store.value.filters.push(searchText.value);
    activeList.value.push(curedString);
    emit("update", { resetPage: true });
    searchText.value = "";
    return;
  }

  if (activeList.value.indexOf(curedString) !== -1) {
    return;
  }

  sharedFunctions.resetCheckboxes();
  store.value.filters.push(searchText.value);
  activeList.value.push(curedString);
  emit("update", { resetPage: true });
  searchText.value = "";
};

/**
 * Removes a text filter from the active list and store filters.
 *
 * @param {MouseEvent} event - The mouse event triggered by the user action.
 */
const removeTextFilter = (event: MouseEvent) => {
  const target = event.target as Element;
  const searchText = target.getAttribute("data-key") || "";
  activeList.value = activeList.value.filter(
    (val: string) => val !== searchText,
  );
  store.value.filters = store.value.filters.filter(
    (val: string) => val !== target.innerHTML,
  );
  target.remove();
  emit("update", { resetPage: true });
};

const emitUpdateSelection = () => emit("updateSelection");
</script>
