<script lang="ts" setup>
import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { useVbenForm } from '#/adapter/form';

import { userCreateApi, userUpdateApi } from './api';
import { RoleFormStoreSchema } from './schema';

const emit = defineEmits(['reload']);

const [RoleForm, RoleFromApi] = useVbenForm({
  schema: RoleFormStoreSchema,
  showDefaultActions: false,
  wrapperClass: 'grid-cols-2 mr-[25px]',
  commonConfig: {
    labelWidth: 90,
  },
});

const isUpdate = ref<boolean>(false);
const [Modal, ModalApi] = useVbenModal({
  onOpenChange: (isOpen: boolean) => {
    RoleFromApi.resetForm();
    if (!isOpen) return;

    const data = ModalApi.getData();
    ModalApi.setData({});
    RoleFromApi.updateSchema([
      {
        fieldName: 'pid',
        componentProps: {
          treeData: data.roleTreeList,
        },
      },
    ]);

    isUpdate.value = data.isEdit;
    data.record && RoleFromApi.setValues({ ...data.record });
    isUpdate.value &&
      RoleFromApi.setValues({
        ...data.record,
        status: `${data.record.status}`,
        pid: data.record.pid || null,
      });
  },
  onConfirm: async () => {
    try {
      await RoleFromApi.validate();
      const values = await RoleFromApi.getValues();
      values.pid = values.pid || 0;
      await (values?.id ? userUpdateApi(values) : userCreateApi(values));

      ModalApi.close();
      ModalApi.setData({});
      RoleFromApi.resetForm();
      emit('reload');
    } catch {}
  },
});
</script>
<template>
  <Modal
    :title="`${isUpdate ? '编辑角色' : '添加角色'}`"
    class="w-[780px]"
    content-class="pt-[20px] pb-0"
  >
    <RoleForm />
  </Modal>
</template>
