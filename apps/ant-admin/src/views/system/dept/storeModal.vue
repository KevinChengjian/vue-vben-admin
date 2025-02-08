<script lang="ts" setup>
import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { useVbenForm } from '#/adapter/form';

import { deptCreateApi, deptUpdateApi } from './dept.api';
import { DeptFormStoreSchema } from './schema';

const emit = defineEmits(['reload']);

const [DeptForm, DeptFromApi] = useVbenForm({
  schema: DeptFormStoreSchema,
  showDefaultActions: false,
  wrapperClass: 'grid-cols-2 mr-[25px]',
  commonConfig: {
    labelWidth: 90,
  },
});

const isUpdate = ref<boolean>(false);
const [Modal, ModalApi] = useVbenModal({
  onOpenChange: (isOpen: boolean) => {
    DeptFromApi.resetForm();
    if (!isOpen) return;

    const data = ModalApi.getData();
    ModalApi.setData({});
    DeptFromApi.updateSchema([
      {
        fieldName: 'pid',
        componentProps: {
          treeData: data.deptTreeList,
        },
      },
    ]);

    isUpdate.value = data.isEdit;
    isUpdate.value && DeptFromApi.setValues(data);
  },
  onConfirm: async () => {
    try {
      await DeptFromApi.validate();
      const values = await DeptFromApi.getValues();
      await (values?.id ? deptUpdateApi(values) : deptCreateApi(values));

      ModalApi.close();
      ModalApi.setData({});
      DeptFromApi.resetForm();
      emit('reload');
    } catch {}
  },
});
</script>
<template>
  <Modal
    :title="`${isUpdate ? '编辑组织' : '添加组织'}`"
    class="w-[780px]"
    content-class="pt-[20px] pb-0"
  >
    <DeptForm />
  </Modal>
</template>
