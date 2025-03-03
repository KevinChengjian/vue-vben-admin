<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { Radio, RadioGroup } from 'ant-design-vue';

import { Dict } from '#/api';
import { useDictStore } from '#/store';

const props = defineProps<{ code: Dict.KeyEnum }>();

const { getDictByKey } = useDictStore();
const options = ref<Dict.ValueItem[]>();

onMounted(async () => {
  options.value = await getDictByKey(props.code);
});
</script>
<template>
  <RadioGroup v-bind="$attrs">
    <Radio v-for="(item, index) in options" :value="item.value" :key="index">
      {{ item.label }}
    </Radio>
  </RadioGroup>
</template>
