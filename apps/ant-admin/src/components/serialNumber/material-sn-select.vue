<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { Select, SelectOption } from 'ant-design-vue';

import { Dict } from '#/api';
import { useDictStore } from '#/store';

defineOptions({ customOptions: { name: 'MaterialSnSelect' } });

const props = defineProps<{ code: Dict.KeyEnum }>();

const { getDictByKey } = useDictStore();
const options = ref<Dict.ValueItem[]>();

onMounted(async () => {
  options.value = await getDictByKey(props.code);
});
</script>
<template>
  <Select show-search option-filter-prop="label" v-bind="$attrs">
    <SelectOption
      v-for="item in options"
      :value="item.value"
      :key="item.value"
      :label="item.label"
    >
      {{ item.label }}
    </SelectOption>
  </Select>
</template>
