<script lang="ts" setup>
import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';
import dayjs from 'dayjs';

import { useVbenForm } from '#/adapter/form';

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
      component: 'FruitingSnSelect',
      fieldName: 'fruiting_sn',
      label: '出菇编号',
      rules: 'required',
      componentProps: {
        placeholder: '请选择出菇编号',
      },
    },
    {
      component: 'Input',
      fieldName: 'name',
      label: '采摘员姓名',
      dependencies: {
        triggerFields: ['id'],
        show: () => {
          return false;
        },
      },
    },
    {
      component: 'PickUserSelect',
      fieldName: 'user_id',
      label: '采摘员',
      rules: 'required',
      componentProps: {
        class: 'w-full',
        placeholder: '请输入采摘员',
        onChange: (_: any, opt: any) => {
          StoreFromApi.setValues({ name: opt.label });
        },
      },
    },
    {
      component: 'DatePicker',
      fieldName: 'pick_at',
      label: '采摘日期',
      rules: 'required',
      componentProps: {
        valueFormat: 'YYYY-MM-DD',
        class: 'w-full',
        placeholder: '请输入采摘日期',
      },
    },
    {
      component: 'InputNumber',
      fieldName: 'amount',
      label: '采摘数量',
      rules: 'required',
      componentProps: {
        addonAfter: '斤',
        class: 'w-full',
        placeholder: '请输入采摘数量',
      },
    },
    {
      component: 'InputNumber',
      fieldName: 'a_amount',
      label: 'A菇数量',
      rules: 'required',
      componentProps: {
        addonAfter: '斤',
        class: 'w-full',
        placeholder: '请输入A菇数量',
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

    // 默认值
    isUpdate.value = data.isEdit;
    await StoreFromApi.setValues({
      pick_at: dayjs().format('YYYY-MM-DD'),
    });

    data.record && StoreFromApi.setValues({ ...data.record });
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
  <Modal
    :title="`${isUpdate ? '编辑采摘记录' : '添加采摘记录'}`"
    class="w-[960px]"
    content-class="pt-[20px] pb-0"
  >
    <StoreForm />
  </Modal>
</template>
