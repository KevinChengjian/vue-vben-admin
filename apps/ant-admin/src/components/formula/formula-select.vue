<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { Select, SelectOption } from 'ant-design-vue';

import { Formula } from '#/api/core/formula';

defineOptions({ customOptions: { name: 'FormulaSelect' } });

const options = ref<Formula.Item[]>([]);

onMounted(async () => {
  options.value = await Formula.list();
});
</script>
<template>
  <Select show-search option-filter-prop="label" v-bind="$attrs" class="w-full">
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
