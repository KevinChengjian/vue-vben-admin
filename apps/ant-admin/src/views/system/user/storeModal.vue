<script lang="ts" setup>
import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { useVbenForm } from '#/adapter/form';

import { userCreateApi, userUpdateApi } from './api';
import { UserFormStoreSchema } from './schema';

const emit = defineEmits(['reload']);

const [UserForm, UserFromApi] = useVbenForm({
  schema: UserFormStoreSchema,
  showDefaultActions: false,
  wrapperClass: 'grid-cols-2 mr-[25px]',
  commonConfig: {
    labelWidth: 90,
  },
});

const isUpdate = ref<boolean>(false);
const [Modal, ModalApi] = useVbenModal({
  onOpenChange: (isOpen: boolean) => {
    UserFromApi.resetForm();
    if (!isOpen) return;

    const data = ModalApi.getData();
    ModalApi.setData({});

    isUpdate.value = data.isEdit;
    data.record && UserFromApi.setValues({ ...data.record });
    isUpdate.value &&
      UserFromApi.setValues({
        ...data.record,
        status: `${data.record.status}`,
      });
  },
  onConfirm: async () => {
    try {
      await UserFromApi.validate();
      const values = await UserFromApi.getValues();
      await (values?.id ? userUpdateApi(values) : userCreateApi(values));

      ModalApi.close();
      ModalApi.setData({});
      UserFromApi.resetForm();
      emit('reload');
    } catch {}
  },
});
</script>
<template>
  <Modal
    :title="`${isUpdate ? '编辑用户' : '添加用户'}`"
    class="w-[780px]"
    content-class="pt-[20px] pb-0"
  >
    <UserForm />
  </Modal>
</template>
