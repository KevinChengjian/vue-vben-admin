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

const date = ref<string>('');
const room = ref<string>('');

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
      fieldName: 'fruiting_sn',
      label: '出菇编号',
      rules: 'required',
      componentProps: {
        class: 'w-full',
        placeholder: '请输入出菇编号',
      },
    },
    {
      component: 'DictSelect',
      fieldName: 'room_id',
      label: '出菇房',
      rules: 'required',
      componentProps: {
        class: 'w-full',
        showSearch: true,
        placeholder: '请选择出菇房',
        code: Dict.KeyEnum.FRUITING_HOUSE,
      },
    },
    {
      component: 'DatePicker',
      fieldName: 'put_at',
      label: '上架日期',
      rules: 'required',
      componentProps: {
        valueFormat: 'YYYY-MM-DD',
        class: 'w-full',
        placeholder: '请输入上架日期',
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
      component: 'DictSelect',
      fieldName: 'dev_id',
      label: '技术员',
      rules: 'required',
      componentProps: {
        class: 'w-full',
        placeholder: '请选择技术员',
        code: Dict.KeyEnum.SYS_USER,
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
    // {
    //   component: 'Textarea',
    //   fieldName: 'experiment',
    //   label: '出菇实验',
    //   formItemClass: 'col-span-3',
    //   componentProps: {
    //     class: 'w-full',
    //     placeholder: '请输入出菇实验',
    //   },
    // },
    // {
    //   component: 'Textarea',
    //   fieldName: 'summarize',
    //   label: '出菇总结',
    //   formItemClass: 'col-span-3',
    //   componentProps: {
    //     class: 'w-full',
    //     placeholder: '请输入出菇总结',
    //   },
    // },
    {
      component: 'Textarea',
      fieldName: 'remark',
      label: '备注',
      formItemClass: 'col-span-3',
      componentProps: {
        placeholder: '请输入备注',
      },
    },
  ],
  showDefaultActions: false,
  wrapperClass: 'grid-cols-3 mr-[25px]',
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
    date.value = isUpdate.value
      ? data.record.put_at
      : dayjs().format('YYYYMMDD');
    await StoreFromApi.setValues({
      put_at: dayjs().format('YYYY-MM-DD'),
      dev_id: userStore.userInfo?.userId,
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
    :title="`${isUpdate ? '编辑出菇记录' : '添加出菇记录'}`"
    class="w-[1000px]"
    content-class="pt-[20px] pb-0"
  >
    <StoreForm />
  </Modal>
</template>
