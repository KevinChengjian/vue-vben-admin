<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { Select, SelectOption } from 'ant-design-vue';

import { Fruiting } from '#/api/core/fruiting';

defineOptions({ customOptions: { name: 'FruitingSnSelect' } });

const originalOptions = ref<Fruiting.Item[]>([]);
const searchResult = ref<Fruiting.Item[]>([]);

const getOptions = async (
  params: Fruiting.QueryParams,
  first: boolean = false,
) => {
  const result = await Fruiting.list(params);
  searchResult.value = result;
  first && (originalOptions.value = result);
};

const handleSearch = async (keyword: string) => {
  if (keyword) {
    let exists = false;
    const list: Fruiting.Item[] = [];
    for (let i = 0; i < originalOptions.value.length; i++) {
      const item = originalOptions.value[i] as Fruiting.Item;
      if (item.value.indexOf(keyword) === 0) {
        exists = true;
        list.push(item);
      }
    }
    exists && (searchResult.value = list);
    !exists && getOptions({ keyword });
  } else {
    searchResult.value = originalOptions.value;
  }
};

onMounted(async () => {
  getOptions({}, true);
});
</script>
<template>
  <Select
    show-search
    option-filter-prop="label"
    v-bind="$attrs"
    class="w-full"
    @search="handleSearch"
  >
    <SelectOption
      v-for="item in searchResult"
      :value="item.value"
      :key="item.value"
      :label="item.label"
    >
      {{ item.label }}
    </SelectOption>
  </Select>
</template>
