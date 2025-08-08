import type { VbenFormSchema } from '@vben/common-ui';

import { Dict } from '#/api';

export const FormulaFormStoreSchema: VbenFormSchema[] = [
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
    fieldName: 'name',
    label: '名称',
    rules: 'required',
    componentProps: {
      placeholder: '请输入配方名称',
    },
  },
  {
    component: 'DictRadio',
    fieldName: 'status',
    label: '状态',
    defaultValue: '1',
    rules: 'required',
    componentProps: {
      class: 'w-full',
      placeholder: '请选择配方状态',
      code: Dict.KeyEnum.STATUS,
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'moisture',
    label: '水份',
    rules: 'required',
    componentProps: {
      class: 'w-full',
      addonAfter: '%',
      placeholder: '请输入水份',
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'sorting',
    defaultValue: 0,
    label: '排序',
    rules: 'required',
    componentProps: {
      class: 'w-full',
      addonAfter: '%',
      placeholder: '请输入排序',
    },
  },
  {
    component: 'Input',
    fieldName: 'remark',
    label: '备注',
    componentProps: {
      class: 'grid-cols-1',
      placeholder: '请输入配方备注',
    },
  },
  {
    component: 'DictSelect',
    fieldName: 'material',
    label: '原料',
    componentProps: {
      class: 'grid-cols-1',
      placeholder: '请输入原料明细',
    },
  },
];
