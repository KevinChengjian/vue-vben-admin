<script setup lang="ts">
import type { UploadRequestOption } from 'ant-design-vue/es/vc-upload/interface';

import { ref, watch } from 'vue';

import { PlusOutlined } from '@vben/icons';

import { Image, message, Upload } from 'ant-design-vue';

import { Resource } from '#/api/core/upload';

defineOptions({ customOptions: { name: 'CustomUpload' } });

const props = withDefaults(defineProps<Resource.Props>(), {
  multiple: true,
  max: 15,
});

const model = defineModel({ type: String });
watch(
  () => model.value,
  (n) => {
    n && handleFileList(n);
  },
);

const handleFileList = async (ids: string) => {
  if (ids === '') {
    return;
  }

  if (fileList.value.length === 0) {
    try {
      const result = await Resource.fileListApi({ ids });
      result.forEach((item: Resource.FileItem) => {
        fileList.value.push({
          uid: item.id,
          name: item.url,
          status: 'done',
          url: item.url,
          response: item,
        });
      });
    } catch {}
  }
};
const changeFile = () => {
  const fileIds: number[] = [];
  fileList.value.forEach((item: any) => {
    if (item.response && item.response.id > 0) {
      fileIds.push(item.response.id);
    }
  });
  model.value = fileIds.join(',');
};

const fileList = ref<any>([]);

const customRequest = async (e: UploadRequestOption) => {
  const { file, onSuccess, onError, onProgress } = e;
  try {
    const response = await Resource.uploadApi(
      { file },
      {
        onUploadProgress: (ev: any) => {
          const percent = (ev.loaded / ev.total) * 100;
          onProgress && onProgress({ percent });
        },
      },
    );

    if (response.id) {
      onSuccess && onSuccess(response);
      changeFile();
      message.success('文件上传成功');
      return;
    }
  } catch {}
  handleRemove(file);
  onError && onError({} as any);
};

const handleRemove = (e: any) => {
  const index = fileList.value.findIndex((i: any) => i.uid === e.uid);
  index !== -1 && fileList.value.splice(index, 1);
  changeFile();
};

const previewVisible = ref<boolean>(false);
const previewUrl = ref<string>('');
const handleShowPreview = (value: boolean) => {
  previewVisible.value = value;
};
const handlePreview = (e: any) => {
  previewUrl.value = e?.response?.url || e.thumbUrl;
  handleShowPreview(true);
};
</script>

<template>
  <div>
    <Upload
      v-bind="$attrs"
      list-type="picture-card"
      name="file"
      v-model:file-list="fileList"
      :multiple="props.multiple"
      :custom-request="customRequest"
      @remove="handleRemove"
      @preview="handlePreview"
    >
      <div class="flex flex-col items-center justify-center">
        <PlusOutlined />
        <div style="margin-top: 8px">附件上传</div>
      </div>
    </Upload>

    <Image
      :width="200"
      :style="{ display: 'none' }"
      :src="previewUrl"
      :preview="{
        visible: previewVisible,
        onVisibleChange: handleShowPreview,
      }"
    />
  </div>
</template>
