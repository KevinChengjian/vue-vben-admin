<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

import { Select, SelectOption } from 'ant-design-vue';

import { Dict } from '#/api';
import { useDictStore } from '#/store';

defineOptions({ customOptions: { name: 'DictSelect' } });

const props = defineProps<{ code: Dict.KeyEnum; filters?: string[] }>();

const { getDictByKey } = useDictStore();
const options = ref<Dict.ValueItem[]>([]);
const handleFilter = () => {
  const filterIds: any[] = props.filters || [];
  options.value.forEach((item: Dict.ValueItem) => {
    item.disabled = filterIds.length > 0 && !filterIds.includes(item.value);
  });
};

watch(
  () => props.filters,
  () => handleFilter(),
);

onMounted(async () => {
  options.value = await getDictByKey(props.code);
  props.filters !== undefined && handleFilter();
});
</script>
<template>
  <Select show-search option-filter-prop="label" v-bind="$attrs">
    <SelectOption
      v-for="item in options"
      :value="item.value"
      :key="item.value"
      :label="item.label"
      :disabled="item.disabled"
    >
      {{ item.label }}
    </SelectOption>
  </Select>
</template>
