import type { VbenFormSchema } from '@vben/common-ui';

import { Dict } from '#/api';

export const PositionFormStoreSchema: VbenFormSchema[] = [
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
    label: '职务名称',
    rules: 'required',
    componentProps: {
      placeholder: '请输入职务名称',
    },
  },
  {
    component: 'Input',
    fieldName: 'code',
    label: '职务编码',
    componentProps: {
      placeholder: '请输入职务编码',
    },
  },
  {
    component: 'TreeSelect',
    fieldName: 'pid',
    label: '上级职务',
    componentProps: {
      fieldNames: {
        children: 'children',
        label: 'name',
        value: 'id',
      },
      class: 'w-full',
      placeholder: '请选择上级职务',
    },
  },
  {
    component: 'DictRadio',
    fieldName: 'status',
    label: '职务状态',
    defaultValue: '1',
    rules: 'required',
    componentProps: {
      class: 'w-full',
      placeholder: '请选择职务状态',
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
    label: '职务备注',
    componentProps: {
      placeholder: '请输入职务备注',
    },
  },
];

//   `created_at` datetime NOT NULL COMMENT '创建时间',
//   `updated_at` datetime NOT NULL COMMENT '更新时间',
//   `deleted_at` int(11) unsign
