<script lang="ts" setup>
import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { useVbenForm } from '#/adapter/form';

import { dictionaryKeyCreateApi, dictionaryKeyUpdateApi } from './api';
import { DictKeyFormStoreSchema } from './schema';

const emit = defineEmits(['reload']);

const [DictKeyForm, DictKeyFromApi] = useVbenForm({
  schema: DictKeyFormStoreSchema,
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
    isUpdate.value && DictKeyFromApi.setValues(data);
  },
  onConfirm: async () => {
    try {
      await DictKeyFromApi.validate();
      const values = await DictKeyFromApi.getValues();
      await (values?.id
        ? dictionaryKeyUpdateApi(values)
        : dictionaryKeyCreateApi(values));

      ModalApi.close();
      ModalApi.setData({});
      DictKeyFromApi.resetForm();
      emit('reload');
    } catch {}
  },
});
</script>
<template>
  <Modal
    :title="`${isUpdate ? '编辑字典' : '添加字典'}`"
    content-class="pt-[20px] pb-0"
  >
    <DictKeyForm />
  </Modal>
</template>
