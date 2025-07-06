<script lang="ts" setup>
import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';
import { useUserStore } from '@vben/stores';

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
      component: 'StrainSnSelect',
      fieldName: 'vr_mb_sn',
      label: '菌包编号',
      rules: 'required',
      componentProps: {
        placeholder: '请选择菌包编号',
      },
    },
    {
      component: 'DictSelect',
      fieldName: 'warehouse_id',
      label: '养菌房',
      rules: 'required',
      componentProps: {
        class: 'w-full',
        showSearch: true,
        placeholder: '请选择养菌房',
        code: Dict.KeyEnum.STRAIN_HOUSE,
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
      component: 'Input',
      fieldName: 'transendothelial',
      label: '透壁',
      componentProps: {
        class: 'w-full',
        placeholder: '请输入透壁',
      },
    },
    {
      component: 'Input',
      fieldName: 'overgrow',
      label: '长满',
      componentProps: {
        class: 'w-full',
        placeholder: '请输入长满',
      },
    },
    {
      component: 'Input',
      fieldName: 'device_state',
      label: '设备状态',
      componentProps: {
        class: 'w-full',
        placeholder: '请输入设备状态',
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
      component: 'DatePicker',
      fieldName: 'out_at',
      label: '出库时间',
      componentProps: {
        class: 'w-full',
        valueFormat: 'YYYY-MM-DD',
        placeholder: '请填写出库时间',
      },
    },
    {
      component: 'InputNumber',
      fieldName: 'out_num',
      label: '出库量',
      componentProps: {
        class: 'w-full',
        placeholder: '请输入出库量',
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
