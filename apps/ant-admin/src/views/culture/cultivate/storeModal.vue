<script lang="ts" setup>
import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';
import { useUserStore } from '@vben/stores';

import { message } from 'ant-design-vue';
import dayjs from 'dayjs';

import { useVbenForm } from '#/adapter/form';
import { Dict } from '#/api';

import { createApi, updateApi } from './api';

const emit = defineEmits(['reload']);

const userStore = useUserStore();
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
      fieldName: 'source',
      label: 'source',
      dependencies: {
        triggerFields: ['id'],
        show: () => {
          return false;
        },
      },
    },
    {
      component: 'Input',
      fieldName: 'source_id',
      label: 'source_id',
      dependencies: {
        triggerFields: ['source'],
        show: () => {
          return false;
        },
      },
    },
    {
      component: 'VrMbSnSelect',
      fieldName: 'vr_mb_sn',
      label: '菌包编号',
      rules: 'required',
      componentProps: {
        placeholder: '请选择菌包编号',
        onChange: async (_: any, opt: any) => {
          await StoreFromApi.setValues({ put_num: opt.num || 0 });
        },
      },
      dependencies: {
        triggerFields: ['source'],
        if: (values) => {
          return values.source === 1;
        },
      },
    },
    {
      component: 'SpMbSnSelect',
      fieldName: 'vr_mb_sn',
      label: '菌包编号',
      rules: 'required',
      componentProps: {
        placeholder: '请选择购买菌包编号',
        onChange: async (_: any, opt: any) => {
          await StoreFromApi.setValues({
            put_num: opt.num || 0,
            source_id: opt.id,
          });
        },
      },
      dependencies: {
        triggerFields: ['source'],
        if: (values) => {
          return values.source === 2;
        },
      },
    },
    {
      component: 'Input',
      fieldName: 'location',
      label: '库房位置',
      rules: 'required',
      componentProps: {
        class: 'w-full',
        placeholder: '请输入库房位置',
      },
    },
    {
      component: 'DatePicker',
      fieldName: 'put_at',
      label: '入库日期',
      rules: 'required',
      labelWidth: 100,
      componentProps: {
        valueFormat: 'YYYY-MM-DD',
        class: 'w-full',
        placeholder: '请选择入库日期',
      },
    },
    {
      component: 'InputNumber',
      fieldName: 'put_num',
      label: '入库数量',
      rules: 'required',
      componentProps: {
        class: 'w-full',
        placeholder: '请输入入库数量',
      },
    },
    {
      component: 'Input',
      fieldName: 'sterilize',
      label: '消毒',
      componentProps: {
        class: 'w-full',
        placeholder: '请输入消毒',
      },
    },
    {
      component: 'DictSelect',
      fieldName: 'user_id',
      label: '记录人员',
      rules: 'required',
      componentProps: {
        class: 'w-full',
        placeholder: '请选择记录人员',
        code: Dict.KeyEnum.SYS_USER,
      },
    },
    {
      component: 'InputNumber',
      fieldName: 'bad_num',
      label: '损耗数量',
      componentProps: {
        class: 'w-full',
        placeholder: '请填写损耗数量',
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
      put_at: dayjs().format('YYYY-MM-DD'),
      source: 1,
      user_id: userStore.userInfo?.userId,
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
    :title="`${isUpdate ? '编辑培养记录' : '添加培养记录'}`"
    class="w-[960px]"
    content-class="pt-[20px] pb-0"
  >
    <StoreForm />
  </Modal>
</template>
