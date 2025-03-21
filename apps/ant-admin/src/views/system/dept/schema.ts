import type { VbenFormSchema } from '@vben/common-ui';

import { Dict } from '#/api';

export const DeptFormStoreSchema: VbenFormSchema[] = [
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
    label: '组织名称',
    rules: 'required',
    componentProps: {
      placeholder: '请输入组织名称',
    },
  },
  {
    component: 'Input',
    fieldName: 'code',
    label: '组织编码',
    componentProps: {
      placeholder: '请输入组织编码',
    },
  },
  {
    component: 'DictSelect',
    fieldName: 'type',
    label: '组织类型',
    defaultValue: '1',
    rules: 'required',
    componentProps: {
      class: 'w-full',
      placeholder: '请选择组织类型',
      code: Dict.KeyEnum.DEPT_TYPE,
    },
  },
  {
    component: 'TreeSelect',
    fieldName: 'pid',
    label: '所属上级',
    componentProps: {
      allowClear: true,
      fieldNames: {
        children: 'children',
        label: 'name',
        value: 'id',
      },
      class: 'w-full',
      placeholder: '请选择所属上级',
    },
  },
  {
    component: 'DictRadio',
    fieldName: 'status',
    label: '组织状态',
    defaultValue: '1',
    rules: 'required',
    componentProps: {
      class: 'w-full',
      placeholder: '请选择组织状态',
      code: Dict.KeyEnum.STATUS,
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'sorting',
    label: '显示顺序',
    defaultValue: 0,
    rules: 'required',
    componentProps: {
      class: 'w-full',
      placeholder: '请输入显示顺序',
    },
  },
  {
    component: 'Input',
    fieldName: 'remark',
    label: '组织备注',
    componentProps: {
      placeholder: '请输入组织备注',
    },
  },
];
