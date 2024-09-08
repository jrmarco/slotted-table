<template>
  <div :class="computedContainerClass">
    <FilterComponent
      @update="reloadTable"
      @updateSelection="emitUpdateSelection"
    />
    <div v-if="loading || !rows.length" :class="computedBodyClass">
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
      <div v-for="row in rows" :key="row.ST_UID" :class="computedDataRowClass">
        <div
          v-for="column in columns"
          :key="`${row.ST_UID}-${column.value}`"
          :class="computedDataCellClass"
          :style="applyCellDynamicStyle(column)"
          @click="emitRowClicked(row)"
        >
          <div v-if="column.value === selectorUID">
            <input
              :id="row.ST_UID"
              class="st-row-selector"
              type="checkbox"
              :checked="isSelected(row.ST_UID)"
              @change="setSelectedElements"
              :disabled="isAllSelected"
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
  selector: { type: Boolean, default: false },
  items: { type: Array as () => Item[], default: () => [] },
  styles: { type: Object as () => Styles, default: () => ({}) },
  language: { type: String, default: "en" },
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  callBack: { type: Function as () => Function | null, default: null },
});

const { headers, items, styles, language, callBack, selector } = toRefs(props);
const serverSide = ref(false);
const rows = ref<Item[]>([]);
const allRows = ref<Item[]>([]);
const trs = ref<Translations>(i18n(language.value));

const emit = defineEmits(["updateSelection", "rowClick"]);

const executeCallback = async (parameters: CallbackParameters) => {
  if (!callBack.value) {
    throw new Error("Callback is not defined or invalid");
  }
  const response: ResponseType = await callBack.value({ ...parameters });
  if (response?.rows && response.totalRows) {
    response.rows.forEach((item: Item) => {
      item.ST_UID = generateConsistentIdentifier(item);
    });
    return {
      rows: response.rows,
      totalItems: response.totalRows,
    };
  }

  throw new Error("Callback response is invalid or errored");
};

// Load server-side data if callback is provided
const loadServerData = async () => {
  const { page, rowsPerPage, ordering, filters, prevFilters } = store.value;
  const { sortBy, sortType } = ordering;
  const parameters: CallbackParameters = {
    page,
    rowsPerPage,
    sortBy,
    sortType,
  };
  if (filters.length > 0) {
    parameters.filters = filters;

    if (
      filters.length !== prevFilters.length ||
      filters.join("|") !== prevFilters.join("|")
    ) {
      parameters.page = 1;
      store.value.page = 1;
    }

    store.value.prevFilters = [...filters];
  }

  const response = await executeCallback(parameters);
  rows.value = response.rows;
  store.value.totalItems = response.totalItems;
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

const searchMatchingResultsLocally = () => {
  const filters: Array<string> = store.value.filters;

  // If no filters are applied, return all rows
  if (filters.length === 0) {
    rows.value = allRows.value;
    store.value.totalItems = rows.value.length;
    return;
  }

  let filtered: Array<Item> = allRows.value.filter((item: Item) => {
    const values = Object.values(item).join("|").toLowerCase();
    let isMatching = 0;
    for (const filter of filters) {
      const match = values.includes(filter.toLowerCase());
      isMatching += match ? 1 : 0;
    }

    return isMatching === filters.length;
  });

  rows.value = filtered;
  store.value.totalItems = rows.value.length;
};

const sliceStaticResults = () => {
  const { page, rowsPerPage } = store.value;
  rows.value = rows.value.slice((page - 1) * rowsPerPage, page * rowsPerPage);
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
const selectorUID = computed(() => store.value.selectorColIdentifier);
const isAllSelected = computed(() => store.value.allSelected);

// Dynamic class names
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
const computedDataCellClass = computed(() => [
  "st-cell",
  sharedFunctions.getStyle("cell"),
]);
const computedFooterClass = computed(() => [
  "st-footer",
  sharedFunctions.getStyle("footer"),
]);

const allRowsSelected = () => {
  const checkboxes = document.querySelectorAll(".st-row-selector:checked");
  const checkboxesSelected = document.querySelectorAll(".st-row-selector");
  return checkboxes.length === checkboxesSelected.length;
};

const returnSelected = async () => {
  const { selection, allSelected, ordering } = store.value;
  if (allSelected) {
    if (serverSide.value) {
      const parameters: CallbackParameters = {
        sortBy: ordering.sortBy,
        sortType: ordering.sortType,
        page: 1,
        rowsPerPage: "all",
      };
      const response = await executeCallback(parameters);
      return response.rows;
    } else {
      return allRows.value;
    }
  }

  const filtered: Array<Item> = rows.value.filter(
    (row: Item) => selection.indexOf(row.ST_UID) !== -1,
  );
  const cured: Array<Item> = [];
  filtered.forEach((item: Item) => {
    const temp = { ...item };
    delete temp.ST_UID;
    cured.push(temp);
  });

  return cured;
};

const emitUpdateSelection = async () => {
  const list = await returnSelected();
  emit("updateSelection", { ...list });
};

const emitRowClicked = (row: Item) => {
  const temp = { ...row };
  delete temp.ST_UID;
  emit("rowClick", temp);
};

const setSelectedElements = (event: Event) => {
  const { selection } = store.value;
  const checkAll = document.querySelector("#st-select-all") as HTMLInputElement;
  const target = event.target as HTMLInputElement;
  if (!target) {
    return;
  }
  if (!target.checked) {
    store.value.selection = selection.filter(
      (elm: string) => elm !== target.id,
    );
    if (!allRowsSelected()) {
      checkAll.checked = false;
      store.value.allSelected = false;
    }
    return;
  }
  store.value.selection.push(target.id);

  if (allRowsSelected()) {
    checkAll.checked = true;
    store.value.allSelected = false;
  }

  emitUpdateSelection();
};

const isSelected = (uid: string) => {
  if (store.value.allSelected) {
    return true;
  }
  return store.value.selection.indexOf(uid) !== -1;
};

const generateConsistentIdentifier = (data: object): string => {
  const serializedData = JSON.stringify(data, Object.keys(data).sort());
  let hash = Date.now() - Math.random();
  for (let i = 0; i < serializedData.length; i++) {
    hash = (hash * 33) ^ serializedData.charCodeAt(i);
  }

  const uniqueId = (hash >>> 0).toString(16);
  return uniqueId;
};

// Initialize component
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
  store.value.selector = selector.value;

  serverSide.value = !!callBack.value;

  if (!serverSide.value) {
    items.value.forEach((item: Item) => {
      item.ST_UID = generateConsistentIdentifier(item);
    });
    allRows.value = items.value;
    store.value.totalItems = allRows.value.length;
  }

  await reloadTable();
});

const reloadTable = async (params = null) => {
  store.value.loading = true;
  if (serverSide.value) {
    await loadServerData();
  } else {
    orderStaticResults();
    searchMatchingResultsLocally();
    sliceStaticResults();
  }
  calculateStartEndIndex();

  // @ts-expect-error TS2339
  if (params?.clearSelected) {
    const checkAll = document.querySelector(
      "#st-select-all",
    ) as HTMLInputElement;
    if (checkAll) {
      checkAll.checked = false;
    }
    store.value.selection = [];
  }

  store.value.loading = false;
};

const getSelection = async () => await returnSelected();

defineExpose({ reloadTable, getSelection });
</script>

<style scoped>
@import "./assets/main.css";
</style>
