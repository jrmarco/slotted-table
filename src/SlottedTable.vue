<template>
  <div :class="computedContainerClass">
    <div v-if="loading || !rows.length" :class="computedBodyClass">
      <div :class="computedDataRowClass">
        <div :class="computedDataCellClass">
          <SpinnerSvg v-if="loading" :text="trs['pleaseWait']" />
          <span v-else>{{ trs["noResults"] }}</span>
        </div>
      </div>
    </div>
    <div v-else :class="computedBodyClass">
      <TableHeader @update="reloadTable" />
      <div
        v-for="(row, idx) in rows"
        :key="row.id || idx"
        :class="computedDataRowClass"
      >
        <div
          v-for="(column, colIdx) in columns"
          :key="column.value || colIdx"
          :class="computedDataCellClass"
          :style="applyCellDynamicStyle(column)"
        >
          <slot
            :column="column.value"
            :cellData="row[column.value] || column.empty"
            :data="row"
          />
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
import store from "./store/main";
import sharedFunctions from "./store/functions";
import type {
  Headers,
  Item,
  Translations,
  Styles,
  CallbackParameters,
  ResponseType,
} from "../types/main";

// Props
const props = defineProps({
  headers: {
    type: Array as () => Headers[],
    default: () => [],
    required: true,
  },
  items: { type: Array as () => Item[], default: () => [] },
  styles: { type: Object as () => Styles, default: () => ({}) },
  language: { type: String, default: "en" },
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  callBack: { type: Function as () => Function | null, default: null },
});

const { headers, items, styles, language, callBack } = toRefs(props);
const serverSide = ref(false);
const rows = ref<Item[]>([]);
const allRows = ref<Item[]>([]);
const trs = ref<Translations>(i18n(language.value));

// Load server-side data if callback is provided
const loadServerData = async () => {
  if (!callBack.value) return;

  const { page, rowsPerPage, ordering } = store.value;
  const { sortBy, sortType } = ordering;
  const parameters: CallbackParameters = {
    page,
    rowsPerPage,
    sortBy,
    sortType,
  };
  const response: ResponseType = await callBack.value(parameters);

  if (response?.rows && response.totalRows) {
    rows.value = response.rows;
    store.value.totalItems = response.totalRows;
  }
};

// Order and slice static rows
const orderStaticResults = () => {
  const { sortBy, sortType } = store.value.ordering;
  allRows.value.sort((a, b) => {
    const valueA = sharedFunctions.castToType(a[sortBy]);
    const valueB = sharedFunctions.castToType(b[sortBy]);
    if (valueA < valueB) return sortType === "asc" ? -1 : 1;
    if (valueA > valueB) return sortType === "asc" ? 1 : -1;
    return 0;
  });
};

const sliceStaticResults = () => {
  const { page, rowsPerPage } = store.value;
  rows.value = allRows.value.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage,
  );
};

// Update pagination indices
const calculateStartEndIndex = () => {
  const { page, rowsPerPage, totalItems } = store.value;
  store.value.startIndex = (page - 1) * rowsPerPage + 1;
  store.value.endIndex = Math.min(page * rowsPerPage, totalItems);
};

// Apply dynamic styles to cells
const applyCellDynamicStyle = (column: Headers) => ({
  width: column.width ? `${column.width}px` : "auto",
});

const loading = computed(() => store.value.loading);
const columns = computed(() => store.value.columns);

// Dynamic class names
const computedContainerClass = computed(() => [
  "slottedtable",
  sharedFunctions.getStyle("container"),
]);
const computedBodyClass = computed(() => [
  "body",
  sharedFunctions.getStyle("body"),
]);
const computedDataRowClass = computed(() => [
  "row",
  sharedFunctions.getStyle("row"),
]);
const computedDataCellClass = computed(() => [
  "cell",
  sharedFunctions.getStyle("cell"),
]);
const computedFooterClass = computed(() => [
  "footer",
  sharedFunctions.getStyle("footer"),
]);

// Initialize component
onMounted(async () => {
  // @ts-expect-error TS2322
  store.value.trs = trs;
  store.value.language = language.value;
  store.value.columns = headers.value;
  store.value.styles = styles.value;

  serverSide.value = !!callBack.value;

  if (!serverSide.value) {
    allRows.value = items.value;
    store.value.totalItems = allRows.value.length;
  }

  await reloadTable();
});

const reloadTable = async () => {
  store.value.loading = true;
  if (serverSide.value) {
    await loadServerData();
  } else {
    orderStaticResults();
    sliceStaticResults();
  }
  calculateStartEndIndex();
  store.value.loading = false;
};

defineExpose({ reloadTable });
</script>

<style scoped>
@import "./assets/main.css";
</style>
