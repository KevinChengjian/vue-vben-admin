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
    label: '配方名称',
    rules: 'required',
    componentProps: {
      placeholder: '请输入配方名称',
    },
  },
  {
    component: 'DictRadio',
    fieldName: 'status',
    label: '配方状态',
    defaultValue: '1',
    rules: 'required',
    componentProps: {
      class: 'w-full',
      placeholder: '请选择配方状态',
      code: Dict.KeyEnum.STATUS,
    },
  },
  {
    component: 'Input',
    fieldName: 'remark',
    label: '配方备注',
    componentProps: {
      class: 'grid-cols-1',
      placeholder: '请输入配方备注',
    },
  },
  {
    component: 'DictSelect',
    fieldName: 'material',
    label: '原料明细',
    componentProps: {
      class: 'grid-cols-1',
      placeholder: '请输入原料明细',
    },
  },
];
