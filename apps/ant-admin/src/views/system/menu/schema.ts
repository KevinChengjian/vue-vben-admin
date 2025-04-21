import type { VbenFormSchema } from '@vben/common-ui';

export const MenuFormStoreSchema: VbenFormSchema[] = [
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
    component: 'Select',
    fieldName: 'type',
    label: '菜单类型',
    rules: 'selectRequired',
    componentProps: {
      class: 'w-full',
      placeholder: '请选择菜单类型',
      options: [
        { label: '目录', value: 'dir' },
        { label: '菜单', value: 'menu' },
        { label: '按钮', value: 'button' },
        { label: '外链', value: 'link' },
      ],
    },
  },
  {
    component: 'TreeSelect',
    fieldName: 'pid',
    label: '上级菜单',
    componentProps: {
      class: 'w-full',
      placeholder: '请选择上级菜单',
      allowClear: true,
      fieldNames: { children: 'children', label: 'title', value: 'id' },
    },
  },
  {
    component: 'Input',
    fieldName: 'title',
    label: '菜单名称',
    rules: 'required',
    componentProps: {
      placeholder: '请输入菜单名称',
    },
  },
  {
    component: 'IconPicker',
    fieldName: 'icon',
    label: '菜单图标',
    componentProps: {
      placeholder: '请选择菜单图标',
    },
    dependencies: {
      triggerFields: ['type'],
      if: (values, _) => {
        return values.type !== 'button';
      },
    },
  },
  {
    component: 'Input',
    fieldName: 'path',
    label: '路由地址',
    componentProps: {
      placeholder: '请输入菜单路由，http链接',
    },
  },
  {
    component: 'Input',
    fieldName: 'name',
    label: '路由名称',
    componentProps: {
      placeholder: '请输入路由名称',
    },
    dependencies: {
      triggerFields: ['type'],
      if: (values, _) => {
        return values.type === 'dir' || values.type === 'menu';
      },
    },
  },
  {
    component: 'Input',
    fieldName: 'component',
    label: '组件路径',
    componentProps: {
      placeholder: '请输入组件路径',
    },
    dependencies: {
      triggerFields: ['type'],
      if: (values, _) => {
        return values.type === 'dir' || values.type === 'menu';
      },
    },
  },
  {
    component: 'Select',
    fieldName: 'target',
    label: '外链显示',
    defaultValue: '',
    rules: 'selectRequired',
    componentProps: {
      class: 'w-full',
      placeholder: '请选择外链显示方式',
      options: [
        { label: '新窗口', value: 'link' },
        { label: '内嵌', value: 'iframeSrc' },
      ],
    },
    dependencies: {
      triggerFields: ['type'],
      if: (values, _) => {
        return values.type === 'link';
      },
    },
  },
  {
    component: 'Select',
    fieldName: 'keep_alive',
    label: '是否缓存',
    defaultValue: 2,
    componentProps: {
      class: 'w-full',
      placeholder: '请选择是否缓存',
      options: [
        { label: '是', value: 1 },
        { label: '否', value: 2 },
      ],
    },
    dependencies: {
      triggerFields: ['type'],
      if: (values, _) => {
        return values.type === 'menu';
      },
    },
  },
  {
    component: 'Input',
    fieldName: 'auth_code',
    label: '权限编码',
    componentProps: {
      class: 'w-full',
      placeholder: '请输入权限编码',
    },
    dependencies: {
      triggerFields: ['type'],
      if: (values, _) => {
        return values.type === 'button';
      },
    },
  },
  {
    component: 'Select',
    fieldName: 'status',
    label: '菜单状态',
    defaultValue: 1,
    componentProps: {
      class: 'w-full',
      placeholder: '请选择菜单状态',
      options: [
        { label: '显示', value: 1 },
        { label: '不显示', value: 2 },
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
];
