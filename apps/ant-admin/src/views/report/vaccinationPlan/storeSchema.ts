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
  // {
  //   component: 'Divider',
  //   fieldName: '',
  //   label: '',
  //   formItemClass: 'col-span-2',
  //   labelWidth: 20,
  //   componentProps: {
  //     title: '计划制包',
  //   },
  // },
  {
    component: 'Input',
    fieldName: 'plan_at',
    label: '计划日期',
    rules: 'required',
    componentProps: {
      readonly: true,
      class: 'w-full',
      placeholder: '请输入计划日期',
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'bucket_num',
    label: '拌料桶数',
    componentProps: {
      class: 'w-full',
      placeholder: '请输入拌料桶数',
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'plan_num',
    label: '计划数量',
    componentProps: {
      class: 'w-full',
      placeholder: '请输入计划数量',
    },
  },
  {
    component: 'FormulaSelect',
    fieldName: 'plan_fid',
    label: '计划配方',
    componentProps: {
      class: 'w-full',
      placeholder: '请选择计划配方',
    },
  },
  {
    component: 'DictSelect',
    fieldName: 'plan_variety_id',
    label: '计划接种',
    componentProps: {
      class: 'w-full',
      code: Dict.KeyEnum.STRAIN_CATEGORY,
      placeholder: '请选择计划接种',
    },
  },
  {
    component: 'DictSelect',
    fieldName: 'user_id',
    label: '常规/试验',
    componentProps: {
      class: 'w-full',
      placeholder: '请选择常规/试验',
      code: Dict.KeyEnum.VACCINATION_TYPE,
    },
  },
  // 实际生产
  {
    component: 'InputNumber',
    fieldName: 'reality_num',
    label: '实际数量',
    componentProps: {
      class: 'w-full',
      placeholder: '请输入实际数量',
    },
  },
  {
    component: 'FormulaSelect',
    fieldName: 'reality_fid',
    label: '实际配方',
    componentProps: {
      class: 'w-full',
      placeholder: '请选择实际配方',
    },
  },
  {
    component: 'DictSelect',
    fieldName: 'variety_id',
    label: '实际接种',
    componentProps: {
      class: 'w-full',
      code: Dict.KeyEnum.STRAIN_CATEGORY,
      placeholder: '请选择实际接种',
    },
  },
  {
    component: 'DatePicker',
    fieldName: 'reality_at',
    label: '接种日期',
    componentProps: {
      format: 'YYYY-MM-DD',
      valueFormat: 'YYYY-MM-DD',
      class: 'w-full',
      placeholder: '请输入接种日期',
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'put_num',
    label: '入库数量',
    componentProps: {
      class: 'w-full',
      placeholder: '请输入入库数量',
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'vaccination_num',
    label: '库房接种量',
    componentProps: {
      class: 'w-full',
      placeholder: '请输入库房接种量',
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
