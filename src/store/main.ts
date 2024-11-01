import { ref } from "vue";
import type { Store, TStyles, TTranslations } from "../../types/main";

const store = ref<Store>({
  language: "en",
  trs: {} as TTranslations,
  loading: true,
  columns: [],
  ordering: {
    sortBy: "",
    sortType: "",
  },
  startIndex: 1,
  endIndex: 1,
  page: 1,
  rowsPerPage: 10,
  styles: {} as TStyles,
  filters: [],
  prevFilters: [],
  hasCheckboxSelector: false,
  selectorColIdentifier: "",
  allSelected: false,
  checkboxes: {},
  hasServerCallback: false,
  dynamicRows: {
    rows: [],
    total: 0,
  },
  staticRows: {
    rows: [],
    total: 0,
    filtered: [],
    filteredTotal: 0,
  },
});

export default store;
