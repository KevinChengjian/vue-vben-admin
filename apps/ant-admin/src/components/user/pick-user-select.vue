<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { Select, SelectOption } from 'ant-design-vue';

import { PickUser } from '#/api/core/pickUser';

defineOptions({ customOptions: { name: 'PickUserSelect' } });

const options = ref<PickUser.Item[]>([]);

onMounted(async () => {
  options.value = await PickUser.list();
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
