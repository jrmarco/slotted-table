<script lang="ts" setup>
import SlottedTable from "./SlottedTable.vue";
import { THeaders, TItem } from "../types/main";

const headers: THeaders[] = [
  { text: "SKU", value: "sku", sortable: true },
  { text: "Name", value: "name", sortable: true },
  { text: "Link", value: "link", sortable: false, empty: "No link" },
  { text: "Description", value: "description" },
  { text: "Quantity", value: "quantity", sortable: true },
  { text: "Weight", value: "weight", sortable: true },
  { text: "Updated", value: "updated_at", sortable: true },
  { text: "Action", value: "action", sortable: false },
];

const items: TItem[] = [
  {
    id: "30",
    sku: "SKU-14",
    name: "Butter",
    description: "Very good with bread...",
    link: "https://en.wikipedia.org/wiki/Butter",
    quantity: "3",
    weight: "9",
    created_at: "2024-07-16 16:32:35",
    updated_at: "2024-08-03 18:02:00",
    description_full: "Very good with bread and marmalade",
  },
  {
    id: "29",
    sku: "SKU-13",
    name: "Coffee",
    description: "Dark night black cof...",
    link: null,
    quantity: "2",
    weight: "5",
    created_at: "2024-07-16 16:32:35",
    updated_at: "2024-07-16 16:32:35",
    description_full: "Dark night black coffee",
  },
  {
    id: "29",
    sku: "SKU-13",
    name: "Coffee",
    description: "Dark night black cof...",
    link: null,
    quantity: "2",
    weight: "5",
    created_at: "2024-07-16 16:32:35",
    updated_at: "2024-07-16 16:32:35",
    description_full: "Dark night black coffee",
  },
  {
    id: "28",
    sku: "SKU-12",
    name: "Sugar",
    description: "Brown sugar",
    link: null,
    quantity: "0",
    weight: "5",
    created_at: "2024-07-16 16:32:35",
    updated_at: "2024-07-16 16:32:35",
    description_full: "Brown sugar",
  },
  {
    id: "27",
    sku: "SKU-11",
    name: "Oil",
    description: "Crushed olive oil",
    link: null,
    quantity: "2",
    weight: "9",
    created_at: "2024-07-16 16:32:35",
    updated_at: "2024-07-16 16:32:35",
    description_full: "Crushed olive oil",
  },
  {
    id: "26",
    sku: "SKU-10",
    name: "Pepper",
    description: "White and red pepper...",
    link: null,
    quantity: "0",
    weight: "6",
    created_at: "2024-07-16 16:32:35",
    updated_at: "2024-07-16 16:32:35",
    description_full: "White and red pepper, crushed",
  },
  {
    id: "25",
    sku: "SKU-9",
    name: "Salt",
    description: "Himalayan Salt",
    link: "https://en.wikipedia.org/wiki/Salt",
    linkText: "WikiSalt",
    quantity: "5",
    weight: "8",
    created_at: "2024-07-16 16:32:35",
    updated_at: "2024-07-16 16:32:35",
    description_full: "Himalayan Salt",
  },
  {
    id: "24",
    sku: "SKU-8",
    name: "Farfalle",
    description: "With wings",
    link: null,
    quantity: "1",
    weight: "3",
    created_at: "2024-07-16 16:32:35",
    updated_at: "2024-07-16 16:32:35",
    description_full: "With wings",
  },
  {
    id: "23",
    sku: "SKU-7",
    name: "Rigatoni",
    description: "With ridges arranged...",
    link: null,
    quantity: "1",
    weight: "8",
    created_at: "2024-07-16 16:32:35",
    updated_at: "2024-07-16 16:32:35",
    description_full: "With ridges arranged on each side",
  },
  {
    id: "22",
    sku: "SKU-6",
    name: "Spaghetti",
    description: "Misura 11 - Long-las...",
    link: null,
    quantity: "1",
    weight: "10",
    created_at: "2024-07-16 16:32:35",
    updated_at: "2024-07-16 16:32:35",
    description_full: "Misura 11 - Long-lasting during cooking",
  },
  {
    id: "21",
    sku: "SKU-5",
    name: "Toothpaste",
    description: "Mint-flavored",
    link: null,
    quantity: "0",
    weight: "0",
    created_at: "2024-07-16 16:32:35",
    updated_at: "2024-07-16 16:32:35",
    description_full: "Mint-flavored",
  },
];

const rowDetails = (data: TItem) => {
  const string = JSON.stringify(data)
    .replace(/\{/, "\n{\n")
    .replace(/,/g, ",\n")
    .replace(/\}/, "\n}");
  window.alert(`Clicked on row ${data.id}:\nData:${string}`);
};

const serverMimic = () => {
  return {
    rows: [],
    totalRows: 0,
  };
};
</script>

<template>
  <h1>Slotted table sample</h1>
  <SlottedTable
    :headers="headers"
    :items="items"
    :callback="serverMimic"
    :selector="true"
    @update-selection="(e) => console.log(e)"
  >
    <template v-slot:selector="{ data }">
      <input type="checkbox" :id="data.id" />
    </template>
    <template v-slot:action="{ data }">
      <button @click="rowDetails(data)">Trigger</button>
    </template>
    <template v-slot:description="{ cellData, data }">
      <a :title="data.description_full">{{ cellData }}</a>
    </template>
    <template v-slot:link="{ cellData, data }">
      <a
        :href="cellData !== 'No link' ? cellData : '#'"
        :target="cellData !== 'No link' ? '_blank' : ''"
      >
        {{ data.linkText || cellData }}
      </a>
    </template>
    <template v-slot="{ cellData }">
      {{ cellData }}
    </template>
  </SlottedTable>
</template>
