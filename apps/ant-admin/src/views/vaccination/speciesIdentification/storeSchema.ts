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
    component: 'DictSelect',
    fieldName: 'can_no',
    label: '罐号',
    componentProps: {
      class: 'w-full',
      showSearch: true,
      allowClear: true,
      placeholder: '请选择罐号',
      code: Dict.KeyEnum.STRAIN_CAN_NO,
    },
  },
  {
    component: 'DatePicker',
    fieldName: 'identification_at',
    label: '鉴定日期',
    rules: 'required',
    componentProps: {
      class: 'w-full',
      valueFormat: 'YYYY-MM-DD',
      placeholder: '请填写鉴定日期',
    },
  },
  {
    component: 'DictSelect',
    fieldName: 'user_id',
    label: '鉴定人员',
    rules: 'required',
    componentProps: {
      class: 'w-full',
      placeholder: '请选择鉴定人员',
      code: Dict.KeyEnum.SYS_USER,
    },
  },

  {
    component: 'DictSelect',
    fieldName: 'variety_id',
    label: '品种',
    rules: 'required',
    componentProps: {
      class: 'w-full',
      showSearch: true,
      allowClear: true,
      placeholder: '请选择品种',
      code: Dict.KeyEnum.STRAIN_CATEGORY,
    },
  },
  {
    component: 'Input',
    fieldName: 'hour',
    label: '培养时间(h)',
    componentProps: {
      class: 'w-full',
      placeholder: '请填写培养时间',
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'ph',
    label: 'PH',
    componentProps: {
      class: 'w-full',
      placeholder: '请填写PH值',
    },
  },
  {
    component: 'Input',
    fieldName: 'concentration',
    label: '菌丝浓度',
    componentProps: {
      class: 'w-full',
      placeholder: '请填写菌丝浓度',
    },
  },
  {
    component: 'Input',
    fieldName: 'result',
    label: '判定结果',
    componentProps: {
      class: 'w-full',
      placeholder: '请填写判定结果',
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
];
