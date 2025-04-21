<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { TreeSelect } from 'ant-design-vue';

import { Dict } from '#/api';
import { useDictStore } from '#/store';

defineOptions({ customOptions: { name: 'DictTreeSelect' } });

const props = defineProps<{ code: Dict.KeyEnum }>();

const { getDictByKey } = useDictStore();
const options = ref<Dict.ValueItem[]>();

onMounted(async () => {
  options.value = await getDictByKey(props.code);
});
</script>
<template>
  <TreeSelect
    v-bind="$attrs"
    :tree-data="options"
    tree-node-filter-prop="label"
    tree-default-expand-all
  />
</template>
