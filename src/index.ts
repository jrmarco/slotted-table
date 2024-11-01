import SlottedTable from "./SlottedTable.vue";

declare global {
    interface Window {
        Vue?: typeof import("vue");
    }
}

if (typeof window !== "undefined" && window.Vue) {
    window.Vue.createApp({}).component("SlottedTable", SlottedTable);
}

export default SlottedTable;