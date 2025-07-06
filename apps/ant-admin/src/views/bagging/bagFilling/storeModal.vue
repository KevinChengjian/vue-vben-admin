<script lang="ts" setup>
import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { useVbenForm } from '#/adapter/form';
import { Dict } from '#/api';

import { createApi, updateApi } from './api';

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
      fieldName: 'mb_id',
      label: '制包拌料ID',
      dependencies: {
        triggerFields: ['id'],
        show: () => {
          return false;
        },
      },
    },
    {
      component: 'MakeBagSnSelect',
      fieldName: 'make_bag_sn',
      label: '制包编号',
      rules: 'required',
      componentProps: {
        placeholder: '请选择制包编号',
        onChange: async (_: string, opt: any) => {
          await StoreFromApi.setValues({
            mb_id: opt?.mb_id,
            formula_id: opt?.formula_id,
          });
        },
      },
    },
    {
      component: 'Input',
      fieldName: 'formula_id',
      label: '制包配方',
      componentProps: {
        class: 'w-full',
        placeholder: '请选择制包配方',
      },
      dependencies: {
        triggerFields: ['id'],
        show: () => {
          return false;
        },
      },
    },
    {
      component: 'DictSelect',
      fieldName: 'machine_id',
      label: '装袋机器',
      rules: 'required',
      componentProps: {
        class: 'w-full',
        showSearch: true,
        placeholder: '请选择装袋机器',
        code: Dict.KeyEnum.BAG_MACHINE,
      },
    },
    {
      component: 'InputNumber',
      fieldName: 'num',
      label: '装袋数量',
      rules: 'required',
      componentProps: {
        class: 'w-full',
        placeholder: '请输入装袋数量',
      },
    },
    {
      component: 'InputNumber',
      fieldName: 'weight',
      label: '菌棒重量',
      rules: 'required',
      componentProps: {
        class: 'w-full',
        placeholder: '请输入菌棒重量',
      },
    },
    {
      component: 'InputNumber',
      fieldName: 'depth',
      label: '中孔深度',
      componentProps: {
        class: 'w-full',
        placeholder: '请输入中孔深度',
      },
    },
    {
      component: 'InputNumber',
      fieldName: 'height',
      label: '菌棒高度',
      componentProps: {
        class: 'w-full',
        placeholder: '请输入菌棒高度',
      },
    },
    {
      component: 'Input',
      fieldName: 'dt',
      label: '菌棒松紧度',
      componentProps: {
        class: 'w-full',
        placeholder: '请输入菌棒松紧度',
      },
    },
    {
      component: 'Textarea',
      fieldName: 'remark',
      label: '备注',
      formItemClass: 'col-span-2',
      componentProps: {
        placeholder: '请输入备注',
      },
    },
  ],
  showDefaultActions: false,
  wrapperClass: 'grid-cols-2 mr-[25px]',
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
    isUpdate.value &&
      StoreFromApi.setValues({
        ...data.record,
        status: `${data.record.status}`,
      });
  },
  onConfirm: async () => {
    try {
      await StoreFromApi.validate();
      const values = await StoreFromApi.getValues();
      await (values?.id ? updateApi(values) : createApi(values));

      ModalApi.close();
      ModalApi.setData({});
      StoreFromApi.resetForm();
      emit('reload');
    } catch {}
  },
});
</script>
<template>
  <Modal
    :title="`${isUpdate ? '编辑装袋记录' : '添加装袋记录'}`"
    class="w-[960px]"
    content-class="pt-[20px] pb-0"
  >
    <StoreForm />
  </Modal>
</template>
