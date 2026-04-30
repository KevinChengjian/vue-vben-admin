<script lang="ts" setup>
import { Cascader } from 'ant-design-vue';

const model = defineModel();

// const SHOW_PARENT = TreeSelect.SHOW_PARENT;
// export default {
//   data() {
//     return {
//       value: ['0-0-0'],
//       treeData,
//       SHOW_PARENT,
//     };
//   },
// };
</script>
<template>
  <Cascader
    v-model:value="model"
    style="width: 100%"
    :tree-data="treeData"
    tree-checkable
    :show-checked-strategy="SHOW_PARENT"
    :replace-fields="{ title: 'label', key: 'value', value: 'value' }"
    search-placeholder="Please select"
  />
</template>
