import type { VbenFormSchema } from '@vben/common-ui';

export const DictKeyFormStoreSchema: VbenFormSchema[] = [
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
    label: '字典名称',
    rules: 'required',
    componentProps: {
      placeholder: '请输入字典名称',
    },
  },
  {
    component: 'Input',
    fieldName: 'code',
    label: '字典编码',
    rules: 'required',
    componentProps: {
      placeholder: '请输入字典编码',
    },
  },
  {
    component: 'Select',
    fieldName: 'status',
    label: '字典状态',
    defaultValue: 1,
    rules: 'required',
    componentProps: {
      class: 'w-full',
      placeholder: '请选择字典状态',
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
