import type { VbenFormSchema } from '@vben/common-ui';

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
    component: 'Select',
    fieldName: 'type',
    label: '组织类型',
    defaultValue: 1,
    rules: 'required',
    componentProps: {
      class: 'w-full',
      placeholder: '请选择组织类型',
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 2 },
      ],
    },
  },
  {
    component: 'TreeSelect',
    fieldName: 'pid',
    label: '上级组织',
    rules: 'required',
    componentProps: {
      fieldNames: {
        children: 'children',
        label: 'name',
        value: 'id',
      },
      class: 'w-full',
      placeholder: '请选择上级组织',
    },
  },

  {
    component: 'Select',
    fieldName: 'status',
    label: '组织状态',
    defaultValue: 1,
    rules: 'required',
    componentProps: {
      class: 'w-full',
      placeholder: '请选择组织状态',
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 2 },
      ],
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
    label: '字典备注',
    componentProps: {
      placeholder: '请输入字典备注',
    },
  },
];
