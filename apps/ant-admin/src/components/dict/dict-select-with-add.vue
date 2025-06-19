<script setup lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

import { Button, Divider, Input, Select } from 'ant-design-vue';

import { Dict } from '#/api';
import { useDictStore } from '#/store';

defineOptions({ customOptions: { name: 'DictSelect' } });

const props = withDefaults(
  defineProps<{ code: Dict.KeyEnum; showAdd?: boolean }>(),
  {
    showAdd: true,
  },
);

const VNodes = defineComponent({
  props: {
    vnodes: {
      type: Object,
      required: true,
    },
  },
  render() {
    return this.vnodes;
  },
});

const { getDictByKey, addDictItem } = useDictStore();
const options = ref<Dict.ValueItem[]>();

onMounted(async () => {
  options.value = await getDictByKey(props.code);
});

const dictValue = ref<string>('');
const handleAdd = async () => {
  await addDictItem({ code: props.code, label: dictValue.value });
  dictValue.value = '';
  options.value = await getDictByKey(props.code, true);
};
</script>
<template>
  <Select
    show-search
    allow-clear
    option-filter-prop="label"
    v-bind="$attrs"
    :options="options"
  >
    <template #dropdownRender="{ menuNode: menu }" v-if="showAdd">
      <VNodes :vnodes="menu" />
      <Divider style="margin: 4px 0" />
      <div class="flex w-full items-center justify-between px-[8px] py-[4px]">
        <Input
          v-model:value="dictValue"
          class="w-full"
          placeholder="请输入新增内容"
        />
        <Button type="primary" class="ml-[15px]" @click="handleAdd">
          新增
        </Button>
      </div>
    </template>
  </Select>
</template>
