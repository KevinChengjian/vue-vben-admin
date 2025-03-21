import type { VbenFormSchema } from '@vben/common-ui';

import { Dict } from '#/api';

export const RoleFormStoreSchema: VbenFormSchema[] = [
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
    label: '角色名称',
    rules: 'required',
    componentProps: {
      placeholder: '请输入角色名称',
    },
  },
  {
    component: 'TreeSelect',
    fieldName: 'pid',
    label: '上级角色',
    componentProps: {
      fieldNames: {
        children: 'children',
        label: 'name',
        value: 'id',
      },
      class: 'w-full',
      placeholder: '请选择上级角色',
    },
  },
  {
    component: 'DictRadio',
    fieldName: 'status',
    label: '角色状态',
    defaultValue: '1',
    rules: 'required',
    componentProps: {
      class: 'w-full',
      placeholder: '请选择角色状态',
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
    label: '角色备注',
    componentProps: {
      placeholder: '请输入角色备注',
    },
  },
];
