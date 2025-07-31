import type { VbenFormSchema } from '@vben/common-ui';

import { Dict } from '#/api';

export const StoreFormSchema: VbenFormSchema[] = [
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
    component: 'VcMbSnSelect',
    fieldName: 'mb_sn',
    label: '菌包编号',
    rules: 'required',
    formItemClass: 'col-span-1',
    componentProps: {
      placeholder: '请选择菌包编号',
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
    label: '检测日期',
    rules: 'required',
    componentProps: {
      class: 'w-full',
      valueFormat: 'YYYY-MM-DD',
      placeholder: '请选择检测日期',
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'upper_moisture',
    label: '上层水份',
    componentProps: {
      addonAfter: '%',
      class: 'w-full',
      placeholder: '请输入上层水份',
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
    label: '下层水份',
    componentProps: {
      addonAfter: '%',
      class: 'w-full',
      placeholder: '请输入下层水份',
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'upper_ph',
    label: '上层PH',
    componentProps: {
      class: 'w-full',
      placeholder: '请输入上层PH',
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
    label: '下层PH',
    componentProps: {
      class: 'w-full',
      placeholder: '请输入下层PH',
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
];
