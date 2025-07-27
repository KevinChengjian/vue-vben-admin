<script lang="ts" setup>
import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { Dict } from '#/api';

import { deviceCreateApi, deviceUpdateApi } from './api';

const emit = defineEmits(['reload']);

const [StoreForm, StoreFromApi] = useVbenForm({
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
      fieldName: 'alias',
      label: '名称',
      rules: 'required',
      componentProps: {
        placeholder: '请输入名称',
      },
    },
    {
      component: 'Input',
      fieldName: 'box_no',
      label: '序列号',
      rules: 'required',
      componentProps: {
        placeholder: '请输入序列号',
      },
    },
    {
      component: 'Select',
      fieldName: 'type',
      label: '关联类型',
      defaultValue: 1,
      rules: 'required',
      componentProps: {
        class: 'w-full',
        placeholder: '请选择关联类型',
        options: [
          { label: '养菌房', value: 1 },
          { label: '出菇房', value: 2 },
        ],
      },
    },
    {
      component: 'DictSelect',
      fieldName: 'sh_id',
      label: '养菌房',
      defaultValue: '1',
      rules: 'required',
      componentProps: {
        class: 'w-full',
        placeholder: '请选择养菌房',
        code: Dict.KeyEnum.STRAIN_HOUSE,
      },
      dependencies: {
        triggerFields: ['type'],
        if: (values: any) => {
          return values.type === 1;
        },
      },
    },
    {
      component: 'DictSelect',
      fieldName: 'sh_id',
      label: '出菇房',
      defaultValue: '1',
      rules: 'required',
      componentProps: {
        class: 'w-full',
        placeholder: '请选择出菇房',
        code: Dict.KeyEnum.FRUITING_HOUSE,
      },
      dependencies: {
        triggerFields: ['type'],
        if: (values: any) => {
          return values.type === 2;
        },
      },
    },
    {
      component: 'Input',
      fieldName: 'remark',
      label: '备注',
      componentProps: {
        class: 'grid-cols-1',
        placeholder: '请输入备注',
      },
    },
  ],
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
    StoreFromApi.setValues({ ...data.record });
  },
  onConfirm: async () => {
    try {
      await StoreFromApi.validate();
      const values = await StoreFromApi.getValues();
      await (values?.id ? deviceUpdateApi(values) : deviceCreateApi(values));

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
    :title="`${isUpdate ? '编辑' : '添加'}`"
    class="w-[680px]"
    content-class="pt-[20px] pb-0"
  >
    <StoreForm />
  </Modal>
</template>
