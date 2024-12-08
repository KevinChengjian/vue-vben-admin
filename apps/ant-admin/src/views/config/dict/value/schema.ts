import type { VbenFormSchema } from '@vben/common-ui';

export const DictValueFormStoreSchema: VbenFormSchema[] = [
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
    fieldName: 'key_id',
    label: 'key_id',
    dependencies: {
      triggerFields: ['key_id'],
      show: () => {
        return false;
      },
    },
  },
  {
    component: 'Input',
    fieldName: 'label',
    label: '数据名称',
    rules: 'required',
    componentProps: {
      placeholder: '请输入数据名称',
    },
  },
  {
    component: 'Select',
    fieldName: 'status',
    label: '数据状态',
    defaultValue: 1,
    rules: 'required',
    componentProps: {
      class: 'w-full',
      placeholder: '请选择状态',
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 2 },
      ],
    },
  },
  {
    component: 'Select',
    fieldName: 'default',
    label: '是否默认',
    defaultValue: 2,
    rules: 'required',
    componentProps: {
      class: 'w-full',
      placeholder: '请选择是否默认',
      options: [
        { label: '是', value: 1 },
        { label: '否', value: 2 },
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
    label: '数据备注',
    componentProps: {
      placeholder: '请输入数据备注',
    },
  },
];
