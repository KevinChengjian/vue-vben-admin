<script lang="ts" setup>
import { useVbenModal } from '@vben/common-ui';

import { useVbenForm } from '#/adapter/form';

import { userResetPwdApi } from './api';

const [UserForm, UserFromApi] = useVbenForm({
  schema: [
    {
      component: 'Input',
      fieldName: 'id',
      label: 'Id',
      dependencies: {
        triggerFields: ['id'],
        show: () => {
          return false;
        },
      },
    },
    {
      component: 'Input',
      fieldName: 'username',
      label: '登录账号',
      rules: 'required',
      disabled: true,
      componentProps: {
        placeholder: '登录账号',
      },
    },
    {
      component: 'Input',
      fieldName: 'password',
      label: '登录密码',
      rules: 'required',
      componentProps: {
        autocomplete: 'off',
        placeholder: '请输入登录密码',
      },
    },
  ],
  showDefaultActions: false,
  wrapperClass: 'grid-cols-1 mr-[25px]',
  commonConfig: {
    labelWidth: 90,
  },
});

const [Modal, ModalApi] = useVbenModal({
  onOpenChange: (isOpen: boolean) => {
    UserFromApi.resetForm();
    if (!isOpen) return;

    const data = ModalApi.getData();
    UserFromApi.setValues({
      id: data.id,
      username: data.username,
      password: '',
    });
  },
  onConfirm: async () => {
    try {
      await UserFromApi.validate();
      const values = await UserFromApi.getValues();
      await userResetPwdApi(values);

      ModalApi.close();
      ModalApi.setData({});
      UserFromApi.resetForm();
    } catch {}
  },
});
</script>
<template>
  <Modal title="重置密码" class="w-[480px]" content-class="pt-[20px] pb-0">
    <UserForm />
  </Modal>
</template>
