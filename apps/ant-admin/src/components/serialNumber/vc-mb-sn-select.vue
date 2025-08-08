<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { Select, SelectOption } from 'ant-design-vue';

import { Cultivate } from '#/api/core/cultivate';

defineOptions({ customOptions: { name: 'VcMbSnSelect' } });

const originalOptions = ref<Cultivate.Item[]>([]);
const searchResult = ref<Cultivate.Item[]>([]);

const getOptions = async (
  params: Cultivate.QueryParams,
  first: boolean = false,
) => {
  const result = await Cultivate.list(params);
  searchResult.value = result;
  first && (originalOptions.value = result);
};

const handleSearch = async (keyword: string) => {
  if (keyword) {
    let exists = false;
    const list: Cultivate.Item[] = [];
    for (let i = 0; i < originalOptions.value.length; i++) {
      const item = originalOptions.value[i] as Cultivate.Item;
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
      :key="item.id"
      :label="item.label"
      :id="item.id"
      :can_no="item.can_no"
      :variety_id="item.variety_id"
      :warehouse_id="item.warehouse_id"
      :num="item.num"
    >
      {{ item.label }}
    </SelectOption>
  </Select>
</template>
