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
      <b>{{ column.text }} <span v-html="getDirection(column.value)" /></b>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import store from "./../store/main";
import sharedFunctions from "../store/functions";
import type { Headers } from "../../types/main";

const emit = defineEmits(["update"]);

const columns = computed(() => {
  return store.value.columns;
});

const computedHeaderRowClass = computed(() => {
  return [
    "row",
    "header",
    sharedFunctions.getStyle("row"),
    sharedFunctions.getStyle("header"),
  ];
});

const computedDataCellClass = (column: Headers) => {
  return [
    "cell",
    column.sortable ? "pointer" : "",
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
</script>
