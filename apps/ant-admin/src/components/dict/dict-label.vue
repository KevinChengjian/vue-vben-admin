<script setup lang="ts">
import type { DictResApi } from '#/api';
import type { DictKeyEnum } from '#/store';

import { computed, ref, watch } from 'vue';

import { useDictStore } from '#/store';

const props = defineProps<{
  code: DictKeyEnum;
  value: number | string;
}>();

const dictItemList = ref<DictResApi.ValueItem[]>([]);
const { getDictByKey } = useDictStore();

watch(
  () => props.code,
  async (code) => {
    dictItemList.value = await getDictByKey(code);
  },
  { immediate: true },
);

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
