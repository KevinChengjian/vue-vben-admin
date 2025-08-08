<script setup lang="ts">
import { computed } from 'vue';

import { useAppConfig } from '@vben/hooks';
import { useAccessStore } from '@vben/stores';

import { message, Upload } from 'ant-design-vue';

defineOptions({ customOptions: { name: 'CustomImport' } });
const props = defineProps<{ url: any }>();
const emit = defineEmits(['success']);

const { apiURL } = useAppConfig(import.meta.env, import.meta.env.PROD);
const accessStore = useAccessStore();
const action = computed(() => {
  return apiURL + props.url;
});

const headers: any = computed(() => {
  return {
    Authorization: accessStore.accessToken,
  };
});

const handleChange = ({ file }: any) => {
  if (file.response) {
    const result = file.response;
    if (result.code === 0) {
      message.success(result.msg || '导入成功');
      emit('success', result.data);
    } else {
      message.error(result.msg || '导入成功');
    }
  }
};
</script>
<template>
  <Upload
    :action="action"
    :headers="headers"
    :show-upload-list="false"
    @change="handleChange"
  >
    <slot></slot>
  </Upload>
</template>
