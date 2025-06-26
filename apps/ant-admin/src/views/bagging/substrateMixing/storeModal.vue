<script lang="ts" setup>
import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';
import { useUserStore } from '@vben/stores';

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
      component: 'FormulaSelect',
      fieldName: 'formula_id',
      label: '制包配方',
      rules: 'selectRequired',
      componentProps: {
        class: 'w-full',
        showSearch: true,
        placeholder: '请选择制包配方',
        onChange: (_: any, opt: any) => {
          StoreFromApi.setValues({
            make_bag_sn: `${dayjs().format('YYYYMMDD')}-${opt.label}`,
          });
        },
      },
    },
    {
      component: 'Input',
      fieldName: 'make_bag_sn',
      label: '制包编号',
      rules: 'required',
      componentProps: {
        placeholder: '请输入制包编号',
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
      label: '上层水份',
      formItemClass: 'col-span-1',
      componentProps: {
        class: 'w-full',
        placeholder: '请输入上层水份',
      },
    },
    {
      component: 'InputNumber',
      fieldName: 'middle_moisture',
      label: '中层水份',
      componentProps: {
        class: 'w-full',
        placeholder: '请输入中层水份',
      },
    },
    {
      component: 'InputNumber',
      fieldName: 'lower_moisture',
      label: '下层水份',
      componentProps: {
        class: 'w-full',
        placeholder: '请输入下层水份',
      },
    },
    {
      component: 'InputNumber',
      fieldName: 'upper_ph',
      label: '上层PH值',
      componentProps: {
        class: 'w-full',
        placeholder: '请输入上层PH值',
      },
    },

    {
      component: 'InputNumber',
      fieldName: 'middle_ph',
      label: '中层PH值',
      componentProps: {
        class: 'w-full',
        placeholder: '请输入中层PH值',
      },
    },

    {
      component: 'InputNumber',
      fieldName: 'lower_ph',
      label: '下层PH值',
      componentProps: {
        class: 'w-full',
        placeholder: '请输入下层PH值',
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
      purchase_at: dayjs().format('YYYY-MM-DD'),
      user_id: userStore.userInfo?.userId,
      material_sn: isUpdate.value ? '' : dayjs().format('YYYYMMDD'),
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
      emit('reload');
    } catch {}
  },
});
</script>
<template>
  <Modal
    :title="`${isUpdate ? '编辑拌料记录' : '添加拌料记录'}`"
    class="w-[960px]"
    content-class="pt-[20px] pb-0"
  >
    <StoreForm />
  </Modal>
</template>
