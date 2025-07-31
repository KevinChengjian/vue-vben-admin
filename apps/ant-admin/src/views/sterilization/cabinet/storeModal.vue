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
      labelWidth: 100,
      componentProps: {
        placeholder: '请选择制包编号',
        onChange: async (_: string, opt: any) => {
          await StoreFromApi.setValues({
            mb_id: opt?.mb_id,
          });
        },
      },
    },
    {
      component: 'DictSelect',
      fieldName: 'ark_id',
      label: '灭菌柜',
      rules: 'required',
      componentProps: {
        class: 'w-full',
        showSearch: true,
        placeholder: '请选择灭菌柜',
        code: Dict.KeyEnum.STERILIZER_CABINET,
      },
    },
    {
      component: 'Input',
      fieldName: 'set_sterilization_time',
      label: '灭菌时间',
      labelWidth: 100,
      componentProps: {
        class: 'w-full',
        placeholder: '请输入灭菌时间',
      },
    },
    {
      component: 'Input',
      fieldName: 'sterilization_time',
      label: '实际灭菌时间',
      componentProps: {
        class: 'w-full',
        placeholder: '请输入实际灭菌时间',
      },
    },
    {
      component: 'InputNumber',
      fieldName: 'temperature',
      label: '灭菌温度',
      labelWidth: 100,
      componentProps: {
        addonAfter: '℃',
        class: 'w-full',
        placeholder: '请输入灭菌温度',
      },
    },
    {
      component: 'Input',
      fieldName: 'program',
      label: '灭菌程序',
      componentProps: {
        class: 'w-full',
        placeholder: '请输入灭菌程序',
      },
    },
    {
      component: 'Input',
      fieldName: 'tp',
      label: '温度压力',
      labelWidth: 100,
      componentProps: {
        addonAfter: 'MPa',
        class: 'w-full',
        placeholder: '请输入温度压力',
      },
    },
    {
      component: 'DictSelect',
      fieldName: 'user_id',
      label: '检测人员',
      rules: 'required',

      componentProps: {
        class: 'w-full',
        placeholder: '请选择检测人员',
        code: Dict.KeyEnum.SYS_USER,
      },
    },
    {
      component: 'DatePicker',
      fieldName: 'check_at',
      label: '灭菌日期',
      rules: 'required',
      labelWidth: 100,
      componentProps: {
        valueFormat: 'YYYY-MM-DD',
        class: 'w-full',
        placeholder: '请选择灭菌日期',
      },
    },
    {
      component: 'Textarea',
      fieldName: 'remark',
      label: '备注',
      labelWidth: 100,
      formItemClass: 'col-span-2',
      componentProps: {
        placeholder: '请输入备注',
      },
    },
  ],
  showDefaultActions: false,
  wrapperClass: 'grid-cols-2 mr-[25px]',
  commonConfig: {
    labelWidth: 120,
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
      check_at: dayjs().format('YYYY-MM-DD'),
      user_id: userStore.userInfo?.userId,
    });

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
      message.success('操作成功');
      emit('reload');
    } catch {}
  },
});
</script>
<template>
  <Modal
    :title="`${isUpdate ? '编辑记录' : '添加记录'}`"
    class="w-[960px]"
    content-class="pt-[20px] pb-0"
  >
    <StoreForm />
  </Modal>
</template>
