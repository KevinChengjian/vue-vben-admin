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
      fieldName: 'mb_sn',
      label: '菌包编号',
      rules: 'required',
      componentProps: {
        placeholder: '请选择菌包编号',
      },
    },
    {
      component: 'DatePicker',
      fieldName: 'patrol_at',
      label: '巡库日期',
      rules: 'required',
      componentProps: {
        class: 'w-full',
        valueFormat: 'YYYY-MM-DD',
        placeholder: '请填写巡库日期',
      },
    },
    {
      component: 'DictSelect',
      fieldName: 'user_id',
      label: '巡库人员',
      rules: 'required',
      componentProps: {
        class: 'w-full',
        placeholder: '请选择巡库人员',
        code: Dict.KeyEnum.SYS_USER,
      },
    },

    {
      component: 'InputNumber',
      fieldName: 'set_temperature',
      label: '设定温度',
      componentProps: {
        class: 'w-full',
        placeholder: '请输入设定温度',
      },
    },
    {
      component: 'InputNumber',
      fieldName: 'set_cd',
      label: '设定二氧化碳',
      componentProps: {
        class: 'w-full',
        placeholder: '请输入设定二氧化碳',
      },
    },
    {
      component: 'InputNumber',
      fieldName: 'set_humidity',
      label: '设定湿度',
      componentProps: {
        class: 'w-full',
        placeholder: '请输入设定湿度',
      },
    },
    {
      component: 'InputNumber',
      fieldName: 'reality_temperature',
      label: '实际温度',
      componentProps: {
        class: 'w-full',
        placeholder: '请输入实际温度',
      },
    },
    {
      component: 'InputNumber',
      fieldName: 'reality_cd',
      label: '实际二氧化碳',
      componentProps: {
        class: 'w-full',
        placeholder: '请输入实际二氧化碳',
      },
    },
    {
      component: 'InputNumber',
      fieldName: 'reality_humidity',
      label: '实际湿度',
      componentProps: {
        class: 'w-full',
        placeholder: '请输入实际湿度',
      },
    },

    {
      component: 'InputNumber',
      fieldName: 'max_t',
      label: '最高温度',
      componentProps: {
        class: 'w-full',
        placeholder: '请输入今日最高温度',
      },
    },
    {
      component: 'InputNumber',
      fieldName: 'min_t',
      label: '最低温度',
      componentProps: {
        class: 'w-full',
        placeholder: '请输入今日最低温度',
      },
    },
    {
      component: 'InputNumber',
      fieldName: 'humidity',
      label: '湿度',
      componentProps: {
        class: 'w-full',
        placeholder: '请输入今日空气湿度',
      },
    },
    {
      component: 'Input',
      fieldName: 'weather',
      label: '天气',
      componentProps: {
        class: 'w-full',
        placeholder: '请输入今日天气',
      },
    },
    {
      component: 'DictSelect',
      fieldName: 'fh_id',
      label: '发菌',
      rules: 'required',
      componentProps: {
        class: 'w-full',
        showSearch: true,
        placeholder: '请选择发菌',
        code: Dict.KeyEnum.STRAIN_STATE,
      },
    },
    {
      component: 'InputNumber',
      fieldName: 'bag_t',
      label: '包温度',
      componentProps: {
        class: 'w-full',
        placeholder: '请输入包温度',
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
    {
      component: 'Upload',
      fieldName: 'attach_ids',
      label: '附件',
      formItemClass: 'col-span-3',
      componentProps: {
        placeholder: '请上传附件',
      },
    },
  ],
  showDefaultActions: false,
  wrapperClass: 'grid-cols-3 mr-[25px]',
  commonConfig: {
    labelWidth: 110,
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
    :title="`${isUpdate ? '编辑巡库记录' : '添加巡库记录'}`"
    class="w-[1200px]"
    content-class="pt-[20px] pb-0"
  >
    <StoreForm />
  </Modal>
</template>
