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
      <template v-if="column.value !== selectorUID">
        <b>{{ column.text }} <span v-html="getDirection(column.value)" /></b>
      </template>
      <template v-else>
        <input
          id="st-select-all"
          type="checkbox"
          :title="trs.selectCurrentPageElement"
          :checked="isSelected"
          @change="setSelectedElements"
          :disabled="isSelected"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import store from "./../store/main";
import sharedFunctions from "../store/functions";
import type { Headers } from "../../types/main";

const emit = defineEmits(["update", "updateSelection"]);

const columns = computed(() => store.value.columns);
const selectorUID = computed(() => store.value.selectorColIdentifier);
const trs = computed(() => store.value.trs);
const isSelected = computed(() => store.value.allSelected);

const computedHeaderRowClass = computed(() => {
  return [
    "st-row",
    "st-header",
    sharedFunctions.getStyle("row"),
    sharedFunctions.getStyle("header"),
  ];
});

const computedDataCellClass = (column: Headers) => {
  return [
    "st-cell",
    column.sortable ? "st-pointer" : "",
    sharedFunctions.getStyle("cell"),
  ];
};

/**
 * Set selected colum ordering option
 * @param {string} column
 */
const orderBy = (column: { value: string; sortable: boolean }) => {
  if (!column || !column.value || !column.sortable) return;
  const { sortBy, sortType } = store.value.ordering;
  store.value.ordering.sortType =
    sortBy === column.value ? (sortType === "asc" ? "desc" : "asc") : "asc";
  store.value.ordering.sortBy = column.value;
  emit("update");
};

const applyCellDynamicStyle = (column: Headers) => {
  return {
    width: column.width ? `${column.width}px` : "auto",
  };
};

const getDirection = (columnName: string) => {
  const { sortBy, sortType } = store.value.ordering;
  if (sortBy !== columnName) {
    return "";
  }

  return !sortType || sortType === "asc" ? "&uarr;" : "&darr;";
};

const setSelectedElements = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (!target) {
    return;
  }
  let checkboxes = document.querySelectorAll(".st-row-selector");
  const ids: Array<string> = [];
  checkboxes.forEach((element: Element) => {
    const checkbox = element as HTMLInputElement;
    checkbox.checked = target.checked;
    ids.push(checkbox.id);
  });

  ids.forEach((id: string) => {
    if (target.checked) {
      if (store.value.selection.indexOf(id) === -1) {
        store.value.selection.push(id);
      }
    } else {
      store.value.selection = store.value.selection.filter(
        (storedId: string) => storedId !== id,
      );
    }
  });

  emit("updateSelection");
};
</script>
