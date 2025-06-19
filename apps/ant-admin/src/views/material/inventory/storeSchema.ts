import type { VbenFormSchema } from '@vben/common-ui';

import { Dict } from '#/api';

export const UserFormStoreSchema: VbenFormSchema[] = [
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
    fieldName: 'nickname',
    label: '用户名称',
    rules: 'required',
    componentProps: {
      placeholder: '请输入用户名称',
    },
  },
  {
    component: 'Input',
    fieldName: 'username',
    label: '登录账号',
    rules: 'required',
    componentProps: {
      placeholder: '请输入登录账号',
    },
  },
  {
    component: 'Input',
    fieldName: 'password',
    label: '登录密码',
    rules: 'required',
    dependencies: {
      show(values) {
        return !values.id;
      },
      triggerFields: ['id'],
    },
    componentProps: {
      autocomplete: 'off',
      placeholder: '请输入登录密码',
    },
  },
  {
    component: 'Input',
    fieldName: 'phone',
    label: '手机号码',
    componentProps: {
      placeholder: '请输入手机号码',
    },
  },
  {
    component: 'Input',
    fieldName: 'email',
    label: '电子邮箱',
    componentProps: {
      placeholder: '请输入电子邮箱',
    },
  },
  {
    component: 'DictRadio',
    fieldName: 'status',
    label: '账号状态',
    defaultValue: '1',
    rules: 'required',
    componentProps: {
      class: 'w-full',
      placeholder: '请选择账号状态',
      code: Dict.KeyEnum.STATUS,
    },
  },
  {
    component: 'DictTreeSelect',
    fieldName: 'dept_id',
    label: '所在部门',
    componentProps: {
      allowClear: true,
      class: 'w-full',
      showSearch: true,
      placeholder: '请选择所在部门',
      code: Dict.KeyEnum.SYS_DEPT,
    },
  },
  {
    component: 'DictTreeSelect',
    fieldName: 'position_id',
    label: '所在岗位',
    componentProps: {
      class: 'w-full',
      placeholder: '请选择所在岗位',
      code: Dict.KeyEnum.SYS_POSITION,
    },
  },
  {
    component: 'TreeSelect',
    fieldName: 'role_ids',
    label: '操作权限',
    componentProps: {
      class: 'w-full',
      placeholder: '请选择操作权限',
      multiple: true,
      treeDefaultExpandAll: true,
      showCheckedStrategy: 'SHOW_ALL',
      fieldNames: {
        children: 'children',
        label: 'name',
        key: 'id',
        value: 'id',
      },
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'sorting',
    label: '显示顺序',
    defaultValue: 0,
    componentProps: {
      class: 'w-full',
      placeholder: '请输入显示顺序',
    },
  },
  {
    component: 'Input',
    fieldName: 'remark',
    label: '用户备注',
    componentProps: {
      placeholder: '请输入用户备注',
    },
  },
];
