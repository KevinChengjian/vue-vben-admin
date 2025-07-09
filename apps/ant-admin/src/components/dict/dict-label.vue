<script setup lang="ts">
import type { Dict } from '#/api';

import { computed, onMounted, ref } from 'vue';

import { useDictStore } from '#/store';

defineOptions({ customOptions: { name: 'DictLabel' } });

const props = defineProps<{
  code: Dict.KeyEnum;
  value: null | number | string;
}>();

const dictItemList = ref<Dict.ValueItem[]>([]);
const { getDictByKey } = useDictStore();

onMounted(async () => {
  dictItemList.value = await getDictByKey(props.code);
});

const currentDictItem = computed(() => {
  const pv = `${props.value}`;
  const exIndex = dictItemList.value.findIndex((i) => i.value === pv);
  return exIndex === -1 ? null : dictItemList.value[exIndex];
});
</script>

<template>
  <span :style="{ color: currentDictItem?.color }">
    {{ currentDictItem?.label }}
  </span>
</template>
