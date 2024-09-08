export type StyleKeys = 'container' | 'header' | 'body' | 'footer' | 'row' | 'cell' | 'pageselector' | 'pagebtns' | 'filter' | 'filteractions' | 'activefilter' | 'searchbutton' | 'filterbutton';
export type Styles = Record<StyleKeys, string | undefined>;
export type Translations = {[key: string]: string };

export type Store = {
  language: string,
  trs: Translations,
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
  totalItems: number,
  styles: Styles,
  filters: Array<string>,
  prevFilters: Array<string>,
  selection: Array<string>,
  selector: boolean,
  selectorColIdentifier: string,
  allSelected: boolean,
}
  

export type Headers = {
  text: string,
  value : string,
  empty ?: string,
  sortable ?: boolean,
  width ?: number,
}

// eslint-disable-next-line
export type Item = Record<string, any>;

export type CallbackParameters = {
  page: number;
  rowsPerPage: number | string;
  sortBy: string;
  sortType: string;
  filters ?: Array<string>,
};

// Define the type for the response object
export type ResponseType = {
  rows: Item[];
  totalRows: number;
}