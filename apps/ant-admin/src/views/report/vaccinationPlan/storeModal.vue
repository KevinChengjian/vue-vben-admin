<script lang="ts" setup>
import { useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';
import dayjs from 'dayjs';

import { useVbenForm } from '#/adapter/form';
import { Dict } from '#/api';

import { updateApi } from './api';

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
      fieldName: 'plan_at',
      label: '计划日期',
      rules: 'required',
      componentProps: {
        readonly: true,
        class: 'w-full',
        placeholder: '请输入计划日期',
      },
    },
    {
      component: 'InputNumber',
      fieldName: 'bucket_num',
      label: '拌料桶数',
      componentProps: {
        class: 'w-full',
        placeholder: '请输入拌料桶数',
      },
    },
    {
      component: 'InputNumber',
      fieldName: 'plan_num',
      label: '计划数量',
      componentProps: {
        class: 'w-full',
        placeholder: '请输入计划数量',
      },
    },
    {
      component: 'FormulaSelect',
      fieldName: 'plan_fid',
      label: '计划配方',
      componentProps: {
        class: 'w-full',
        placeholder: '请选择计划配方',
      },
    },
    {
      component: 'DictSelect',
      fieldName: 'plan_variety_id',
      label: '计划接种',
      componentProps: {
        class: 'w-full',
        code: Dict.KeyEnum.STRAIN_CATEGORY,
        placeholder: '请选择计划接种',
      },
    },
    {
      component: 'DictSelect',
      fieldName: 'plan_type',
      label: '常规/试验',
      componentProps: {
        class: 'w-full',
        placeholder: '请选择常规/试验',
        code: Dict.KeyEnum.VACCINATION_TYPE,
      },
    },
    {
      component: 'InputNumber',
      fieldName: 'put_num',
      label: '入库数量',
      componentProps: {
        class: 'w-full',
        placeholder: '请输入入库数量',
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

const [Modal, ModalApi] = useVbenModal({
  closeOnClickModal: false,
  onOpenChange: async (isOpen: boolean) => {
    StoreFromApi.resetForm();
    if (!isOpen) return;

    const data = ModalApi.getData();
    ModalApi.setData({});

    // 默认值
    await StoreFromApi.setValues({
      plan_at: dayjs().format('YYYY-MM-DD HH:mm'),
    });

    StoreFromApi.setValues({ ...data.record, id: data.record?.plan_id });
  },
  onConfirm: async () => {
    try {
      await StoreFromApi.validate();
      const values = await StoreFromApi.getValues();
      await updateApi(values);

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
  <Modal title="编辑计划" class="w-[960px]" content-class="pt-[20px] pb-0">
    <StoreForm />
  </Modal>
</template>
