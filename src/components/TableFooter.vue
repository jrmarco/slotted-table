<template>
  <div :class="computedPageSelectorClass">
    {{ trs["rowsPerPage"] }}
    <select class="select" v-model="rowsPerPage" @change="setPage(1)">
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
    {{ startIndex }}-{{ endIndex }} {{ trs["of"] }} {{ totalItems || 0 }}
  </div>
  <div v-if="totalItems > rowsPerPage" :class="computedPageButtonsClass">
    <template v-for="pageNum in pages" :key="pageNum">
      <button
        v-if="typeof pageNum === 'number'"
        :class="{ active: Number(pageNum) === Number(page) }"
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
import sharedFunctions from "../store/functions";

const emit = defineEmits(["update"]);

const rowsPerPageOptions = computed(() => {
  return [5, 10, 25, 50];
});

/**
 * Prepare pages list based on number of items handled
 * @returns array
 */
const pages = computed(() => {
  const { totalItems, rowsPerPage, page } = store.value;
  if (!totalItems) return [];
  const totalPages = Math.ceil(totalItems / rowsPerPage);
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

const rowsPerPage = computed({
  get() {
    return store.value.rowsPerPage;
  },
  set(newValue) {
    store.value.rowsPerPage = newValue;
  },
});
const startIndex = computed(() => store.value.startIndex);
const endIndex = computed(() => store.value.endIndex);
const totalItems = computed(() => store.value.totalItems);
const page = computed(() => store.value.page);

const setPage = async (pageNum: number) => {
  if (!Number.isInteger(pageNum) || pageNum < 1) return;
  store.value.page = pageNum;
  emit("update");
};

const trs = computed(() => store.value.trs);

const computedPageSelectorClass = computed(() => {
  return ["pageselector", sharedFunctions.getStyle("pageselector")];
});

const computedPageButtonsClass = computed(() => {
  return ["pagebtns", sharedFunctions.getStyle("pagebtns")];
});
</script>
