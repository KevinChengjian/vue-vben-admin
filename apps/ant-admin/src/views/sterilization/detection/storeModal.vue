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
      component: 'InputNumber',
      fieldName: 'upper_moisture',
      label: '前排水份',
      componentProps: {
        addonAfter: '%',
        class: 'w-full',
        placeholder: '请输入前排水份',
      },
    },
    {
      component: 'InputNumber',
      fieldName: 'middle_moisture',
      label: '中间水份',
      componentProps: {
        addonAfter: '%',
        class: 'w-full',
        placeholder: '请输入中间水份',
      },
    },
    {
      component: 'InputNumber',
      fieldName: 'lower_moisture',
      label: '后排水份',
      componentProps: {
        addonAfter: '%',
        class: 'w-full',
        placeholder: '请输入后排水份',
      },
    },
    {
      component: 'InputNumber',
      fieldName: 'upper_ph',
      label: '前排PH',
      componentProps: {
        class: 'w-full',
        placeholder: '请输入前排PH',
      },
    },
    {
      component: 'InputNumber',
      fieldName: 'middle_ph',
      label: '中间PH',
      componentProps: {
        class: 'w-full',
        placeholder: '请输入中间PH',
      },
    },
    {
      component: 'InputNumber',
      fieldName: 'lower_ph',
      label: '后排PH',
      componentProps: {
        class: 'w-full',
        placeholder: '请输入后排PH',
      },
    },
    {
      component: 'InputNumber',
      fieldName: 'upper_weight',
      label: '前排重量',
      componentProps: {
        addonAfter: 'kg',
        class: 'w-full',
        placeholder: '请输入前排重量',
      },
    },
    {
      component: 'InputNumber',
      fieldName: 'middle_weight',
      label: '中间重量',
      componentProps: {
        addonAfter: 'kg',
        class: 'w-full',
        placeholder: '请输入中间重量',
      },
    },
    {
      component: 'InputNumber',
      fieldName: 'lower_weight',
      label: '后排重量',
      componentProps: {
        addonAfter: 'kg',
        class: 'w-full',
        placeholder: '请输入后排重量',
      },
    },
    {
      component: 'InputNumber',
      fieldName: 'upper_height',
      label: '前排高度',
      componentProps: {
        addonAfter: 'm',
        class: 'w-full',
        placeholder: '请输入前排高度',
      },
    },
    {
      component: 'InputNumber',
      fieldName: 'middle_height',
      label: '中间高度',
      componentProps: {
        addonAfter: 'm',
        class: 'w-full',
        placeholder: '请输入中间高度',
      },
    },
    {
      component: 'InputNumber',
      fieldName: 'lower_height',
      label: '后排高度',
      componentProps: {
        addonAfter: 'm',
        class: 'w-full',
        placeholder: '请输入后排高度',
      },
    },
    {
      component: 'DatePicker',
      fieldName: 'check_at',
      label: '检测日期',
      rules: 'required',
      componentProps: {
        valueFormat: 'YYYY-MM-DD',
        class: 'w-full',
        placeholder: '请选择检测日期',
      },
    },
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
    :title="`${isUpdate ? '编辑检测记录' : '添加检测记录'}`"
    class="w-[960px]"
    content-class="pt-[20px] pb-0"
  >
    <StoreForm />
  </Modal>
</template>
