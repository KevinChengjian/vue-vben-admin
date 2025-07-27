<script lang="ts" setup>
import type { ListItem } from './type';

import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';
import { useUserStore } from '@vben/stores';

import { Descriptions, DescriptionsItem, message } from 'ant-design-vue';
import dayjs from 'dayjs';

import { useVbenForm } from '#/adapter/form';
import { Dict } from '#/api';

import { outApi } from './api';

const emit = defineEmits(['reload']);

const date = ref<string>('');
const room = ref<string>('');
const userStore = useUserStore();
const [StoreForm, StoreFromApi] = useVbenForm({
  schema: [
    {
      component: 'Input',
      fieldName: 'cr_id',
      label: 'cr_id',
      dependencies: {
        triggerFields: ['vr_id'],
        show: () => {
          return false;
        },
      },
    },
    {
      component: 'DictSelect',
      fieldName: 'room_id',
      label: '出菇房',
      rules: 'required',
      componentProps: {
        class: 'w-full',
        code: Dict.KeyEnum.FRUITING_HOUSE,
        placeholder: '请选择出菇房',
        onChange: async (_: any, opt: any) => {
          room.value = opt.label;
          if (room.value && date.value) {
            await StoreFromApi.setValues({
              fruiting_sn: `${date.value}-${room.value}`,
            });
          }
        },
      },
    },
    {
      component: 'DatePicker',
      fieldName: 'out_at',
      label: '出库日期',
      rules: 'required',
      componentProps: {
        valueFormat: 'YYYY-MM-DD',
        class: 'w-full',
        placeholder: '请选择出库日期',
        onChange: async (e: any) => {
          date.value = dayjs(e).format('YYYYMMDD');
          if (room.value && date.value) {
            await StoreFromApi.setValues({
              fruiting_sn: `${date.value}-${room.value}`,
            });
          }
        },
      },
    },
    {
      component: 'Input',
      fieldName: 'fruiting_sn',
      label: '出菇编号',
      rules: 'required',
      componentProps: {
        class: 'w-full',
        placeholder: '请输入出菇编号',
      },
    },
    {
      component: 'InputNumber',
      fieldName: 'num',
      label: '出库数量',
      rules: 'required',
      componentProps: {
        class: 'w-full',
        placeholder: '请输入出库数量',
      },
    },
    {
      component: 'InputNumber',
      fieldName: 'strain_age',
      label: '养菌期',
      rules: 'required',
      componentProps: {
        class: 'w-full',
        placeholder: '请输入养菌期',
      },
    },
    {
      component: 'InputNumber',
      fieldName: 'temperature',
      label: '包芯温度',
      componentProps: {
        addonAfter: '℃',
        class: 'w-full',
        placeholder: '请输入包芯温度',
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

const row = ref<ListItem>();
const [Modal, ModalApi] = useVbenModal({
  closeOnClickModal: false,
  onOpenChange: async (isOpen: boolean) => {
    StoreFromApi.resetForm();
    if (!isOpen) return;

    row.value = ModalApi.getData<ListItem>();
    ModalApi.setData({});

    // 默认值
    date.value = dayjs().format('YYYYMMDD');
    await StoreFromApi.setValues({
      bl_num: row.value.bl_num,
      out_at: dayjs().format('YYYY-MM-DD'),
      cr_id: row.value.id,
      strain_age: row.value.strain_age || undefined,
      user_id: userStore.userInfo?.userId,
    });
  },
  onConfirm: async () => {
    try {
      await StoreFromApi.validate();
      const values = await StoreFromApi.getValues();
      await outApi(Object.assign(values, { cr_id: row.value?.id }));

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
  <Modal title="菌包出库" class="w-[960px]" content-class="pt-[20px] pb-0">
    <Descriptions class="mb-[15px] ml-[32px]">
      <DescriptionsItem label="菌包编号">{{ row?.mb_sn }}</DescriptionsItem>
      <DescriptionsItem label="库房位置">{{ row?.location }}</DescriptionsItem>
      <DescriptionsItem label="出库日期">{{ row?.out_at }}</DescriptionsItem>
      <DescriptionsItem label="入库数量">{{ row?.put_num }}</DescriptionsItem>
      <DescriptionsItem label="出库数量">{{ row?.out_num }}</DescriptionsItem>
      <DescriptionsItem label="剩余数量">{{ row?.bl_num }}</DescriptionsItem>
    </Descriptions>
    <StoreForm />
  </Modal>
</template>
