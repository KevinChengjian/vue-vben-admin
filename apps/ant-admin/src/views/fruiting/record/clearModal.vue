<script lang="ts" setup>
import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { Descriptions, DescriptionsItem, message } from 'ant-design-vue';
import dayjs from 'dayjs';

import { useVbenForm } from '#/adapter/form';

import { soldOutApi } from './api';

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
      fieldName: 'out_at',
      label: '下架日期',
      rules: 'required',
      componentProps: {
        valueFormat: 'YYYY-MM-DD',
        class: 'w-full',
        placeholder: '请输入上架日期',
      },
    },
    {
      component: 'Textarea',
      fieldName: 'remark',
      label: '备注',
      formItemClass: 'col-span-1',
      componentProps: {
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

const row = ref<any>();
const [Modal, ModalApi] = useVbenModal({
  closeOnClickModal: false,
  onOpenChange: async (isOpen: boolean) => {
    StoreFromApi.resetForm();
    if (!isOpen) return;

    const data = ModalApi.getData();
    row.value = data.record;
    ModalApi.setData({});

    await StoreFromApi.setValues({
      out_at: dayjs().format('YYYY-MM-DD'),
    });

    StoreFromApi.setValues({ ...data.record });
  },
  onConfirm: async () => {
    try {
      await StoreFromApi.validate();
      const values = await StoreFromApi.getValues();
      await soldOutApi(values);

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
  <Modal title="下架" class="w-[640px]" content-class="pt-[20px] pb-0">
    <Descriptions class="mb-[15px] ml-[42px]">
      <DescriptionsItem label="菌包编号" :span="3">
        {{ row.mb_sn }}
      </DescriptionsItem>
      <DescriptionsItem label="出菇房">{{ row.roomName }}</DescriptionsItem>
      <DescriptionsItem label="上架数量">{{ row.put_num }}</DescriptionsItem>
      <DescriptionsItem label="上架日期">{{ row.put_at }}</DescriptionsItem>
    </Descriptions>
    <StoreForm />
  </Modal>
</template>
