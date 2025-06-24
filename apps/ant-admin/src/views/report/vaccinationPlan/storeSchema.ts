import type { VbenFormSchema } from '@vben/common-ui';

import { Dict } from '#/api';

export const FormStoreSchema: VbenFormSchema[] = [
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
    fieldName: 'material_sn',
    label: '原料编号',
    rules: 'required',
    componentProps: {
      placeholder: '请输入原料编号',
    },
  },
  {
    component: 'DictSelect',
    fieldName: 'user_id',
    label: '检测人员',
    rules: 'required',
    componentProps: {
      class: 'w-full',
      placeholder: '请选择检测人员',
      code: Dict.KeyEnum.SYS_USER,
    },
  },
  {
    component: 'DictSelect',
    fieldName: 'material_id',
    label: '检测原料',
    rules: 'required',
    componentProps: {
      class: 'w-full',
      showSearch: true,
      placeholder: '请选择检测原料',
      code: Dict.KeyEnum.MATERIAL,
    },
  },
  {
    component: 'DatePicker',
    fieldName: 'detection_at',
    label: '检测时间',
    rules: 'required',
    componentProps: {
      showTime: { format: 'HH:mm' },
      format: 'YYYY-MM-DD HH:mm',
      valueFormat: 'YYYY-MM-DD HH:mm',
      class: 'w-full',
      placeholder: '请输入检测时间',
    },
  },
  {
    component: 'DictSelect',
    fieldName: 'machine_id',
    label: '检测机器',
    rules: 'required',
    componentProps: {
      class: 'w-full',
      showSearch: true,
      placeholder: '请选择检测机器',
      code: Dict.KeyEnum.MATERIAL_MACHINE,
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'moisture',
    label: '水份',
    componentProps: {
      class: 'w-full',
      placeholder: '请输入水份',
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'ph',
    label: 'PH值',
    componentProps: {
      class: 'w-full',
      placeholder: '请输入PH值',
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'protein',
    label: '蛋白含量',
    componentProps: {
      class: 'w-full',
      placeholder: '请输入蛋白含量',
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'nitrogen',
    label: '含氮量',
    componentProps: {
      class: 'w-full',
      placeholder: '请输入含氮量',
    },
  },
  {
    component: 'Textarea',
    fieldName: 'remark',
    label: '备注',
    formItemClass: 'col-span-2',
    componentProps: {
      placeholder: '请输入备注',
    },
  },
];
