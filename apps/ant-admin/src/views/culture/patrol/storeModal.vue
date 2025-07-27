<script lang="ts" setup>
import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';
import { useUserStore } from '@vben/stores';

import { message } from 'ant-design-vue';
import dayjs, { Dayjs } from 'dayjs';

import { useVbenForm } from '#/adapter/form';
import { Dict } from '#/api';
import { deviceInfoApi } from '#/api/core/device';

import { createApi, updateApi, weatherApi } from './api';

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
      fieldName: 'warehouse_id',
      label: '养菌房',
      dependencies: {
        triggerFields: ['id'],
        show: () => {
          return false;
        },
      },
    },
    {
      component: 'VcMbSnSelect',
      fieldName: 'mb_sn',
      label: '菌包编号',
      rules: 'required',
      componentProps: {
        placeholder: '请选择菌包编号',
        onChange: async (e: any, opt: any) => {
          handleQueryDeviceInfo(e);
          await StoreFromApi.setFieldValue('warehouse_id', opt.warehouse_id);
        },
      },
    },
    {
      component: 'DatePicker',
      fieldName: 'patrol_at',
      label: '巡库日期',
      rules: 'required',
      componentProps: {
        disabledDate: (now: Dayjs) => {
          return now && now > dayjs().endOf('day');
        },
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
        addonAfter: '℃',
        class: 'w-full',
        placeholder: '请输入设定温度',
      },
    },
    {
      component: 'InputNumber',
      fieldName: 'set_wc',
      label: '设定温差',
      componentProps: {
        addonAfter: '℃',
        class: 'w-full',
        placeholder: '请输入设定温差',
      },
    },
    {
      component: 'InputNumber',
      fieldName: 'reality_temperature',
      label: '实际温度',
      componentProps: {
        addonAfter: '℃',
        class: 'w-full',
        placeholder: '请输入实际温度',
      },
    },
    {
      component: 'InputNumber',
      fieldName: 'set_min_cd',
      label: 'CO₂下限',
      componentProps: {
        addonAfter: 'PPM',
        class: 'w-full',
        placeholder: '请输入设定二氧化碳',
      },
    },
    {
      component: 'InputNumber',
      fieldName: 'set_max_cd',
      label: 'CO₂上限',
      componentProps: {
        addonAfter: 'PPM',
        class: 'w-full',
        placeholder: '请输入设定二氧化碳',
      },
    },
    {
      component: 'InputNumber',
      fieldName: 'reality_cd',
      label: 'CO₂',
      componentProps: {
        addonAfter: 'PPM',
        class: 'w-full',
        placeholder: '请输入实际二氧化碳',
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
      fieldName: 'reality_humidity',
      label: '库内湿度',
      componentProps: {
        class: 'w-full',
        placeholder: '请输入库内湿度',
      },
    },

    {
      component: 'InputNumber',
      fieldName: 'max_t',
      label: '最高温度',
      formItemClass: 'col-start-1',
      componentProps: {
        addonAfter: '℃',
        class: 'w-full',
        placeholder: '请输入今日最高温度',
      },
    },
    {
      component: 'InputNumber',
      fieldName: 'min_t',
      label: '最低温度',
      componentProps: {
        addonAfter: '℃',
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
      label: '包温',
      componentProps: {
        addonAfter: '℃',
        class: 'w-full',
        placeholder: '请输入包温',
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
      component: 'CustomUpload',
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

    const date = dayjs().format('YYYY-MM-DD');
    const weather = await weatherApi({ date });

    const data = ModalApi.getData();
    ModalApi.setData({});

    // 默认值
    isUpdate.value = data.isEdit;
    const deviceValue = {};
    if (!isUpdate.value && data.record && data.record.warehouse_id) {
      handleQueryDeviceInfo(data.record.mb_sn);
    }

    await StoreFromApi.setValues({
      patrol_at: date,
      user_id: userStore.userInfo?.userId,
      max_t: weather?.max_t || undefined,
      min_t: weather?.min_t || undefined,
      humidity: weather?.humidity || undefined,
      weather: weather?.text || undefined,
      ...deviceValue,
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

const handleQueryDeviceInfo = async (sn: string) => {
  const value = await deviceInfoApi({ sn });
  await StoreFromApi.setValues(value);
};
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
