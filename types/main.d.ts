export type TStyleKeys = 'container' | 'header' | 'body' | 'footer' | 'row' | 'cell' | 'pageselector' | 'pagebtns' | 'filter' | 'filteractions' | 'activefilter' | 'searchbutton' | 'filterbutton';
export type TStyles = Record<TStyleKeys, string | undefined>;
export type TTranslations = {[key: string]: string };
// eslint-disable-next-line
export type TItem = Record<string, any>;

export type Store = {
  language: string,
  trs: TTranslations,
  loading: boolean,
  // eslint-disable-next-line
  columns: Array<any>,
  ordering: {
    sortBy: string,
    sortType: string,
  },
  startIndex: number,
  endIndex: number,
  page: number,
  rowsPerPage: number,
  styles: TStyles,
  filters: Array<string>,
  prevFilters: Array<string>,
  hasCheckboxSelector: boolean,
  selectorColIdentifier: string,
  allSelected: boolean,
  checkboxes: {[key: string]: boolean},
  hasServerCallback: boolean,
  dynamicRows: {
    rows: TItem[],
    total: number,
  },
  staticRows: {
    rows: TItem[],
    total: number,
    filtered: TItem[],
    filteredTotal: number,
  }
}
  

export type THeaders = {
  text: string,
  value : string,
  empty ?: string,
  sortable ?: boolean,
  width ?: number,
}

export type TCallbackParameters = {
  page: number;
  rowsPerPage: number | string;
  sortBy: string;
  sortType: string;
  filters ?: Array<string>,
  all ?: boolean,
};

// Define the type for the response object
export type TResponseType = {
  rows: TItem[];
  totalRows: number;
}

export type TReloadParams = {
  clearSelected ?: boolean,
  resetPage ?: boolean,
}