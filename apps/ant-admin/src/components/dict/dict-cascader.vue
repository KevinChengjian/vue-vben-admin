<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { Cascader } from 'ant-design-vue';

import { Dict } from '#/api';
import { useDictStore } from '#/store';

defineOptions({ customOptions: { name: 'DictCascader' } });

const props = defineProps<{ code: Dict.KeyEnum }>();

const { getDictByKey } = useDictStore();
const options = ref<Dict.ValueItem[]>();

onMounted(async () => {
  options.value = await getDictByKey(props.code);
});
</script>
<template>
  <Cascader v-bind="$attrs" :options="options" expand-trigger="hover" />
</template>
