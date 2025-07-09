import type { VbenFormSchema } from '@vben/common-ui';

import { Dict } from '#/api';

export const StoreFormSchema: VbenFormSchema[] = [
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
    component: 'StrainSnSelect',
    fieldName: 'strain_sn',
    label: '菌种编号',
    rules: 'required',
    componentProps: {
      class: 'w-full',
      placeholder: '请选择菌种编号',
    },
  },
  {
    component: 'DatePicker',
    fieldName: 'observe_at',
    label: '观察日期',
    rules: 'required',
    componentProps: {
      class: 'w-full',
      valueFormat: 'YYYY-MM-DD',
      placeholder: '请填写观察日期',
    },
  },
  {
    component: 'DictSelect',
    fieldName: 'user_id',
    label: '记录人员',
    rules: 'required',
    componentProps: {
      class: 'w-full',
      placeholder: '请选择记录人员',
      code: Dict.KeyEnum.SYS_USER,
    },
  },
  // {
  //   component: 'DictSelect',
  //   fieldName: 'variety_id',
  //   label: '品种',
  //   componentProps: {
  //     class: 'w-full',
  //     showSearch: true,
  //     allowClear: true,
  //     placeholder: '请选择品种',
  //     code: Dict.KeyEnum.STRAIN_CATEGORY,
  //   },
  // },
  {
    component: 'Input',
    fieldName: 'hour',
    label: '培养时间',
    componentProps: {
      addonAfter: 'h',
      class: 'w-full',
      placeholder: '请填写培养时间',
    },
  },
  {
    component: 'Input',
    fieldName: 'state',
    label: '菌种状态',
    componentProps: {
      class: 'w-full',
      placeholder: '请填写菌种状态',
    },
  },
  {
    component: 'DictSelect',
    fieldName: 'varied_id',
    label: '有无杂菌',
    componentProps: {
      class: 'w-full',
      placeholder: '请选择有无杂菌',
      code: Dict.KeyEnum.STRAIN_VARIED,
    },
  },

  {
    component: 'Input',
    fieldName: 'smell',
    label: '气味',
    componentProps: {
      class: 'w-full',
      placeholder: '请填写气味',
    },
  },
  {
    component: 'Input',
    fieldName: 'wind_speed',
    label: '风速',
    componentProps: {
      class: 'w-full',
      placeholder: '请填写风速',
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'temperature',
    label: '温度',
    componentProps: {
      addonAfter: '℃',
      class: 'w-full',
      placeholder: '请填写温度',
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
