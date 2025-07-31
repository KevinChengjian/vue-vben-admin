<script lang="ts" setup>
import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';
import dayjs from 'dayjs';

import { useVbenForm } from '#/adapter/form';
import { Dict } from '#/api';

import { createApi, updateApi } from './api';

const emit = defineEmits(['reload']);

const makeAt = ref<string>('');
const variety = ref<string>('');
const warehouse = ref<string>('');
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
      fieldName: 'make_at',
      label: '制包日期',
      rules: 'required',
      componentProps: {
        class: 'w-full',
        valueFormat: 'YYYY-MM-DD',
        placeholder: '请填写制包日期',
        onChange: async (e: any) => {
          makeAt.value = dayjs(e).format('YYYYMMDD');
          if (makeAt.value && variety.value && warehouse.value) {
            await StoreFromApi.setValues({
              mb_sn: `NX-${makeAt.value}-购买菌包-${variety.value}-${warehouse.value}`,
            });
          }
        },
      },
    },
    {
      component: 'DatePicker',
      fieldName: 'vaccination_at',
      label: '接种日期',
      rules: 'required',
      componentProps: {
        class: 'w-full',
        valueFormat: 'YYYY-MM-DD',
        placeholder: '请填写接种日期',
      },
    },
    {
      component: 'DictSelect',
      fieldName: 'variety_id',
      label: '品种',
      rules: 'required',
      componentProps: {
        class: 'w-full',
        placeholder: '请选择品种',
        code: Dict.KeyEnum.STRAIN_CATEGORY,
        onChange: async (_: any, e: any) => {
          variety.value = e.label;
          if (makeAt.value && variety.value && warehouse.value) {
            await StoreFromApi.setValues({
              mb_sn: `NX-${makeAt.value}-购买菌包-${variety.value}-${warehouse.value}`,
            });
          }
        },
      },
    },
    {
      component: 'DictSelect',
      fieldName: 'warehouse_id',
      label: '养菌房',
      rules: 'required',
      componentProps: {
        class: 'w-full',
        placeholder: '请选择养菌房',
        code: Dict.KeyEnum.STRAIN_HOUSE,
        onChange: async (_: any, e: any) => {
          warehouse.value = e.label;
          if (makeAt.value && variety.value && warehouse.value) {
            await StoreFromApi.setValues({
              mb_sn: `NX-${makeAt.value}-购买菌包-${variety.value}-${warehouse.value}`,
            });
          }
        },
      },
    },
    {
      component: 'Input',
      fieldName: 'mb_sn',
      label: '菌包编号',
      rules: 'required',
      componentProps: {
        class: 'w-full',
        placeholder: '请输入菌包编号',
      },
    },
    {
      component: 'InputNumber',
      fieldName: 'strain_age',
      label: '菌龄',
      componentProps: {
        class: 'w-full',
        placeholder: '请输入菌龄',
      },
    },
    {
      component: 'InputNumber',
      fieldName: 'num',
      label: '数量',
      rules: 'required',
      componentProps: {
        class: 'w-full',
        placeholder: '请输入数量',
      },
    },
    {
      component: 'InputNumber',
      fieldName: 'amount',
      label: '金额',
      rules: 'required',
      componentProps: {
        class: 'w-full',
        placeholder: '请输入金额',
      },
    },
    {
      component: 'Input',
      fieldName: 'source',
      label: '来源',
      rules: 'required',
      componentProps: {
        class: 'w-full',
        placeholder: '请输入来源',
      },
    },
    {
      component: 'Input',
      fieldName: 'location',
      label: '库房位置',
      componentProps: {
        class: 'w-full',
        placeholder: '请输入库房位置',
      },
    },
    {
      component: 'DatePicker',
      fieldName: 'pay_at',
      label: '购买日期',
      rules: 'required',
      componentProps: {
        class: 'w-full',
        valueFormat: 'YYYY-MM-DD',
        placeholder: '请填写购买日期',
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
  wrapperClass: 'grid-cols-2 mr-[15px]',
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
    makeAt.value =
      isUpdate.value && data.record?.make_at
        ? dayjs(data.record?.make_at).format('YYYYMMDD')
        : dayjs().format('YYYYMMDD');
    variety.value = data.record?.variety || '';
    warehouse.value = data.record?.warehouse || '';

    await StoreFromApi.setValues({
      make_at: dayjs().format('YYYY-MM-DD'),
      vaccination_at: dayjs().format('YYYY-MM-DD'),
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
    :title="`${isUpdate ? '菌包购买记录' : '菌包购买记录'}`"
    class="w-[960px]"
    content-class="pt-[20px] pb-0"
  >
    <StoreForm />
  </Modal>
</template>
