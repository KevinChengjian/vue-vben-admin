<script lang="ts" setup>
import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { useVbenForm } from '#/adapter/form';

import { positionCreateApi, positionUpdateApi } from './api';
import { PositionFormStoreSchema } from './schema';

const emit = defineEmits(['reload']);

const [PositionForm, PositionFromApi] = useVbenForm({
  schema: PositionFormStoreSchema,
  showDefaultActions: false,
  wrapperClass: 'grid-cols-2 mr-[25px]',
  commonConfig: {
    labelWidth: 90,
  },
});

const isUpdate = ref<boolean>(false);
const [Modal, ModalApi] = useVbenModal({
  onOpenChange: (isOpen: boolean) => {
    PositionFromApi.resetForm();
    if (!isOpen) return;

    const data = ModalApi.getData();
    ModalApi.setData({});
    PositionFromApi.updateSchema([
      {
        fieldName: 'pid',
        componentProps: {
          treeData: data.positionTreeList,
        },
      },
    ]);

    isUpdate.value = data.isEdit;
    data.record && PositionFromApi.setValues({ ...data.record });
    isUpdate.value &&
      PositionFromApi.setValues({
        ...data.record,
        status: `${data.record.status}`,
        pid: data.record.pid || null,
      });
  },
  onConfirm: async () => {
    try {
      await PositionFromApi.validate();
      const values = await PositionFromApi.getValues();
      values.pid = values.pid || 0;
      await (values?.id
        ? positionUpdateApi(values)
        : positionCreateApi(values));

      ModalApi.close();
      ModalApi.setData({});
      PositionFromApi.resetForm();
      emit('reload');
    } catch {}
  },
});
</script>
<template>
  <Modal
    :title="`${isUpdate ? '编辑职位' : '添加职位'}`"
    class="w-[780px]"
    content-class="pt-[20px] pb-0"
  >
    <PositionForm />
  </Modal>
</template>
