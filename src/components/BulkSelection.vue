<template>
  <div :class="computedBulkActionContainer">
    <p>{{ trs.bulkActions }}:</p>
    <p>{{ totalSelected }}</p>
    <button @click="setSelectAll">{{ currentSelectionText }}</button>
  </div>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import store from "../store/main";
import sharedFunctions from "../store/functions";
const trs = computed(() => store.value.trs);

const computedBulkActionContainer = computed(() => [
  "st-bulkactions",
  sharedFunctions.getStyle("bulkactions"),
]);

const currentSelectionText = computed(() => {
  return store.value.allSelected ? trs.value.unselectAll : trs.value.selectAll;
});

const totalSelected = computed(() => {
  const length = store.value.selection.length;
  return store.value.allSelected ? store.value.totalItems : length;
});

const emit = defineEmits(["updateSelection"]);

const setSelectAll = () => {
  store.value.allSelected = !store.value.allSelected;
  if (store.value.allSelected === false) {
    store.value.selection = [];
  }
  emit("updateSelection");
};
</script>
