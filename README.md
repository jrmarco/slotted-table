# SlottedTable v1.0

## Introduction

`SlottedTable` is a Vue.js 3.x component designed to provide a flexible and feature-rich data table. It comes with built-in slot support, making it easy to customize and extend. Whether you need pagination, sorting, or style customization, `SlottedTable` has you covered.

## Website

For more details, visit the [GitHub repository](https://github.com/jrmarco/slotted-table).

## Features

- **Item Slot**: Easily customize table cells using slots.
- **Buttons Pagination**: Navigate through pages with a button-based pagination system.
- **Single Field Sorting**: Sort by individual columns with ease.
- **Static Pagination and Sorting**: Supports client-side pagination and sorting.
- **Server-Side Pagination and Sorting**: Integrate with server-side data handling for large datasets.
- **Style Customization**: Customize the appearance of the table to match your design needs.

## Getting Started

### 1. Installation

To use `SlottedTable` in your Vue 3 application, first install it via npm:

```bash
npm install slotted-table
```

### 2. Registration

Import and register the component in your Vue application:

```js
import { createApp } from 'vue';
import SlottedTable from 'slotted-table';
import App from './App.vue';
// import "slotted-table/dist/index.css"; # optional

const app = createApp(App);
app.component('SlottedTable', SlottedTable);
app.mount('#app');
```

### 3. Usage

Use `SlottedTable` in your Vue components as follows:

  1. Static dataset

```html
<template>
  <SlottedTable
    :headers="headers"
    :items="items"
  >
    <template v-slot:COLUMN_NAME="{ column, cellData, data }">
      <!-- Execute custom data manipulation 
        column: contains the column name
        cellData: contains row column value
        data: contains row full data
      -->
    </template>
    <template v-slot="{ column, cellData, data }">
      <!-- Execute default data manipulation -->
    </template>
  </SlottedTable>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { THeader, TItem } from 'slotted-table';
// import "slotted-table/dist/index.css"; # optional

export default defineComponent({
  setup() {
    const headers: THeader[] = [...];
    const items: TItem[] = [...];

    return { headers, items };
  },
});
</script>
```

  2. Dynamic ( Server-Side ) dataset:

```html
<template>
  <SlottedTable
    :headers="headers"
    :callBack="serverRequest"
  >
    ....
  </SlottedTable>
</template>

<script setup lang="ts">
import { defineComponent, onMounted } from 'vue';
import type { THeader, TItem } from 'slotted-table';

export default defineComponent({
  const headers: THeader[] = ref([...]);

  const serverRequest = async => (tableProps) {
    const { sortBy, sortType, page, rowsPerPage, all } = tableProps;
    try {
      const response = axios.post(ENDPOINT_URL, { ...YOUR_DATA, ...tableProps })
      // Handle response
      return response;
    } catch (error) {
      // Handle error
    }
  },
});
</script>
```

## Configuration

- **Headers**:  
an array defining the columns of the table. Each header is an object with properties:<ul>
  <li><code>text</code>: The display name of the column. ( required )</li>
  <li><code>value</code>: The unique identifier for the column. ( required )</li>
  <li><code>sortable</code>: Boolean flag indicating if the column is sortable.</li>
  <li><code>empty</code>: Default value displayed if the cell value is empty.</li>
  <li><code>width</code>: Maximum width of the column.</li>
</ul>

Sample:

```js
  [{ 
    text: "COL_PUBLIC_NAME", // required
    value: "COL_NAME", // required
    sortable: SORTABLE_FLAG,
    empty: EMPTY_CELL_TEXT,
    widget: MAX_WIDTH 
  }, ...]
``` 
  

- **Styles**: 
custom CSS classes for various table elements. Provide classes for <code>container, header, body, footer, row, cell, pageselector, pagebtn filter, filteractions, activefilter, searchbutton, filterbutton</code>. Example:  
```js
styles = { 
  header: "myCustomClass", 
  cell: "myCellclass myCellsubclass",
  CLASS_NAME: "CUSTOM_CLASS_1 CUSTOM_CLASS_2",
  ...
}
```

- **Language**:  
ISO 639-1 language code for localization of table text.

- **Items** ( static ):  
an array of objects representing table rows. Each object should correspond to the columns defined in headers, but may also include additional properties.
Sample:

```js
// Headers sample, using three columns
const headers = [
  { text: 'Column 1', value: 'col1' },
  { text: 'Column 2', value: 'col2', width: 25 }
  { text: 'Column 3', value: 'col3', empty: "No value" },
];

// Items sample: we map the three columns 
// and some unmapped column data
const items = [
  {
    col1: 'Data 1',
    col2: 'Data 2',
    extraData: 'Additional info'
  }
  // more items
];
``` 

- **Callback** ( Server-Side ):  
a function for fetching data dynamically. This function receives an object with properties page, rowsPerPage, sortBy, sortType and all. The function should return an object with rows (array of data) and totalRows (total number of items).

```js
// Callback object parameters
parameters = {
  page, // current page - starts at 1
  rowsPerPage, // maximum number of element per page
  sortBy, // field to sorty by - default "id"
  sortType, // ordering type ( asc / desc ) - default "desc",
  all, // flag ( bool ) - request all entries when in server mode
}

// Callback function sample
async function serverRequest(params) {
  const response = await axios.post(ENDPOINT_URL, params);
  return {
    rows: response.data.rows,
    totalRows: response.data.totalRows
  };
}
```

### <i>Important Notes:</i>  

The callback function must return an object with rows and totalRows properties.  
Assuming the callback function returns a promise that resolves to TResponseType


```js
// ResponseType
export type TResponseType = {
  rows: TItem[];
  totalRows: number;
}

// result
{ 
  rows: [...],
  totalRows: 10,
}
```

## Exposed methods

### reloadTable:
asynchronous function responsible for reloading table data based on the provided parameters. It handles both server-side and static data reloading, while also performing additional actions such as resetting the table page, recalculating indices, and clearing selected checkboxes when required.
#### Parameters:
- params (TReloadParams - optional): An object containing optional parameters that control the behavior of the table reloading. Default is an empty object ({}).
  - resetPage (boolean - optional): If true, the table's page will be reset to the first page (page = 1).
  - clearSelected (boolean - optional): If true, the selected checkboxes in the table will be cleared.

### getSelection:
asynchronous function that returns the currently selected rows in a table. It handles both server-side and static data, depending on whether the table is configured to fetch data from the server. When all rows are selected, and the table supports server-side operations, it requests all rows from the server.

### resetSelection:
function clear the selected rows list

## Todo
- **Custom table components slot**: Detect if user configuration provides custom slots ( filters, search, etc. ) and use them as replacement

---

- ~~**Filtering**: Add functionality for filtering table rows based on criteria.~~ ✅
- ~~**Searching**: Implement search capabilities to find specific items.~~ ✅

- ~~**Row Selection**: Enable selection of individual rows for actions or details.~~ ✅

## Contribution

We welcome contributions to improve SlottedTable. If you have suggestions, feature requests, or find issues, please open a pull request or create an issue on our [GitHub repository](https://github.com/jrmarco/slotted-table).

## License

`SlottedTable` is open-source and available under the GPLv3 License. See the LICENSE file for more information.