<script lang="ts" setup>
import { useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';
import dayjs from 'dayjs';

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
      component: 'DatePicker',
      fieldName: 'plan_at',
      label: '计划日期',
      rules: 'required',
      componentProps: {
        valueFormat: 'YYYY-MM-DD',
        class: 'w-full',
        placeholder: '请输入计划日期',
      },
    },
    {
      component: 'Input',
      fieldName: 'mc',
      label: '做陪养基',
      componentProps: {
        class: 'w-full',
        placeholder: '请输入做陪养基',
      },
    },
    {
      component: 'Input',
      fieldName: 'bottled_num',
      label: '接瓶',
      componentProps: {
        class: 'w-full',
        placeholder: '请输入接瓶',
      },
    },
    {
      component: 'DictSelect',
      fieldName: 'variety_id',
      label: '品种',
      componentProps: {
        class: 'w-full',
        code: Dict.KeyEnum.STRAIN_CATEGORY,
        placeholder: '请选择品种',
      },
    },
    {
      component: 'Input',
      fieldName: 'make_can',
      label: '做罐',
      componentProps: {
        class: 'w-full',
        placeholder: '请输入做罐',
      },
    },
    {
      component: 'Input',
      fieldName: 'vc_can',
      label: '接罐',
      componentProps: {
        class: 'w-full',
        placeholder: '请输入接罐',
      },
    },
    {
      component: 'Input',
      fieldName: 'production',
      label: '生产',
      componentProps: {
        class: 'w-full',
        placeholder: '请输入生产',
      },
    },
    {
      component: 'Input',
      fieldName: 'production_vc',
      label: '生产接种',
      componentProps: {
        class: 'w-full',
        placeholder: '请输入生产接种',
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
      plan_at: dayjs().format('YYYY-MM-DD'),
    });

    StoreFromApi.setValues({
      ...data.record,
      reality_fid: data?.record?.reality_fid || undefined,
      variety_id: data?.record?.variety_id || undefined,
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
