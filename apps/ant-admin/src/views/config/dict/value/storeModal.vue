<script lang="ts" setup>
import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';

import { dictionaryValueCreateApi, dictionaryValueUpdateApi } from './api';
import { DictValueFormStoreSchema } from './schema';

const emit = defineEmits(['reload']);

const [DictValueForm, DictKeyFromApi] = useVbenForm({
  schema: DictValueFormStoreSchema,
  showDefaultActions: false,
  commonConfig: {
    labelWidth: 90,
    wrapperClass: 'mr-[25px]',
  },
});

const isUpdate = ref<boolean>(false);
const [Modal, ModalApi] = useVbenModal({
  onOpenChange: (isOpen: boolean) => {
    DictKeyFromApi.resetForm();
    if (!isOpen) return;

    const data = ModalApi.getData();
    ModalApi.setData({});
    isUpdate.value = !!data?.id;
    DictKeyFromApi.setValues(data);
  },
  onConfirm: async () => {
    try {
      await DictKeyFromApi.validate();
      const values = await DictKeyFromApi.getValues();
      await (values?.id
        ? dictionaryValueUpdateApi(values)
        : dictionaryValueCreateApi(values));

      ModalApi.close();
      ModalApi.setData({});
      DictKeyFromApi.resetForm();
      message.success('操作成功');
      emit('reload');
    } catch {}
  },
});
</script>
<template>
  <Modal
    :title="`${isUpdate ? '编辑字典项' : '添加字典项'}`"
    content-class="pt-[20px] pb-0"
  >
    <DictValueForm />
  </Modal>
</template>
