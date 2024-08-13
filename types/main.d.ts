export type StyleKeys = 'container' | 'header' | 'body' | 'footer' | 'row' | 'cell' | 'pageselector' | 'pagebtns';
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
  rowsPerPage: number;
  sortBy: string;
  sortType: string;
};

// Define the type for the response object
export type ResponseType = {
  rows: Item[];
  totalRows: number;
}