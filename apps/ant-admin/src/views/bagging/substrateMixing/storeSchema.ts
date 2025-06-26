import type { VbenFormSchema } from '@vben/common-ui';

import { Dict } from '#/api';

export const MaterialInFormStoreSchema: VbenFormSchema[] = [
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
    component: 'InputNumber',
    fieldName: 'upper_moisture',
    label: '上层水份',
    rules: 'required',
    formItemClass: 'col-span-1',
    componentProps: {
      class: 'w-full',
      placeholder: '请输入上层水份',
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'upper_ph',
    label: '上层PH值',
    rules: 'required',
    componentProps: {
      class: 'w-full',
      placeholder: '请输入上层PH值',
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'middle_moisture',
    label: '中层水份',
    rules: 'required',
    componentProps: {
      class: 'w-full',
      placeholder: '请输入中层水份',
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'middle_ph',
    label: '中层PH值',
    rules: 'required',
    componentProps: {
      class: 'w-full',
      placeholder: '请输入中层PH值',
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'lower_moisture',
    label: '下层水份',
    rules: 'required',
    componentProps: {
      class: 'w-full',
      placeholder: '请输入下层水份',
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'lower_ph',
    label: '下层PH值',
    rules: 'required',
    componentProps: {
      class: 'w-full',
      placeholder: '请输入下层PH值',
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
    component: 'Textarea',
    fieldName: 'remark',
    label: '备注',
    formItemClass: 'col-span-2',
    componentProps: {
      placeholder: '请输入备注',
    },
  },
];
