import SlottedTable from "./SlottedTable.vue";

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.createApp({}).component("SlottedTable", SlottedTable);
}

export default SlottedTable;
