<script lang="ts" setup>
import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';

import { createApi, updateApi } from './api';
import { StoreSchema } from './storeSchema';

const emit = defineEmits(['reload']);

const [StoreForm, StoreFromApi] = useVbenForm({
  schema: StoreSchema,
  showDefaultActions: false,
  wrapperClass: 'grid-cols-1 mr-[25px]',
  commonConfig: {
    labelWidth: 90,
  },
});

const isUpdate = ref<boolean>(false);
const [Modal, ModalApi] = useVbenModal({
  closeOnClickModal: false,
  onOpenChange: async (isOpen: boolean) => {
    StoreFromApi.resetForm();
    if (!isOpen) return;

    const data = ModalApi.getData();
    ModalApi.setData({});

    isUpdate.value = data.isEdit;
    data.record && StoreFromApi.setValues({ ...data.record });
  },
  onConfirm: async () => {
    try {
      await StoreFromApi.validate();
      const values = await StoreFromApi.getValues();
      await (values?.id ? updateApi(values) : createApi(values));

      ModalApi.close();
      ModalApi.setData({});
      StoreFromApi.resetForm();
      message.success('操作成功');
      emit('reload');
    } catch {}
  },
});
</script>
<template>
  <Modal
    :title="`${isUpdate ? '编辑人员' : '添加人员'}`"
    class="w-[580px]"
    content-class="pt-[20px] pb-0"
  >
    <StoreForm />
  </Modal>
</template>
