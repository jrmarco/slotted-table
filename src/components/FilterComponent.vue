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
import sharedFunctions from "../store/functions";
import BulkActions from "./BulkSelection.vue";

const trs = computed(() => store.value.trs);
const searchText = ref("");
const activeList = ref<string[]>([]);

const emit = defineEmits(["update", "updateSelection"]);

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

const activefilters = computed(() => store.value.filters || []);
const useCheckbox = computed(() => store.value.selector);
const currentRows = computed(() => Number(store.value.totalItems));

const normalizeString = (rawString: string) => {
  if (!rawString || rawString === "") {
    return "";
  }
  let curedString = rawString.trim().toLowerCase();
  curedString = curedString.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  curedString = curedString.replace(/[^a-z0-9]/g, "-").trim();

  return curedString;
};

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
    store.value.filters.push(searchText.value);
    activeList.value.push(curedString);
    emit("update");
    searchText.value = "";
    return;
  }

  if (activeList.value.indexOf(curedString) !== -1) {
    return;
  }

  store.value.filters.push(searchText.value);
  activeList.value.push(curedString);
  emit("update");
  searchText.value = "";
};

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
  emit("update");
};

const emitUpdateSelection = () => emit("updateSelection");
</script>
