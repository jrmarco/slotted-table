import { ref } from "vue";
import type { Store, Styles, Translations } from "../../types/main";

const store = ref<Store>({
  language: "en",
  trs: {} as Translations,
  loading: true,
  columns: [],
  ordering: {
    sortBy: "id",
    sortType: "desc",
  },
  startIndex: 1,
  endIndex: 1,
  page: 1,
  rowsPerPage: 10,
  totalItems: 0,
  styles: {} as Styles,
  filters: [],
  prevFilters: [],
  selection: [],
  selector: false,
  selectorColIdentifier: "",
  allSelected: false,
});

export default store;
