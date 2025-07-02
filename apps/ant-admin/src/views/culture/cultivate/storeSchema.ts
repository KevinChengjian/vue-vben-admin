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
    component: 'MakeBagSnSelect',
    fieldName: 'make_bag_sn',
    label: '制包编号',
    rules: 'required',
    componentProps: {
      placeholder: '请选择制包编号',
    },
  },
  {
    component: 'DictSelect',
    fieldName: 'ark_id',
    label: '灭菌柜',
    rules: 'required',
    componentProps: {
      class: 'w-full',
      showSearch: true,
      placeholder: '请选择灭菌柜',
      code: Dict.KeyEnum.STERILIZER_CABINET,
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
    component: 'InputNumber',
    fieldName: 'upper_moisture',
    label: '前排水份',
    componentProps: {
      class: 'w-full',
      placeholder: '请输入前排水份',
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'middle_moisture',
    label: '中间水份',
    componentProps: {
      class: 'w-full',
      placeholder: '请输入前排水份',
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'lower_moisture',
    label: '后排水份',
    componentProps: {
      class: 'w-full',
      placeholder: '请输入前排水份',
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'upper_ph',
    label: '前排PH',
    componentProps: {
      class: 'w-full',
      placeholder: '请输入前排PH',
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'middle_ph',
    label: '中间PH',
    componentProps: {
      class: 'w-full',
      placeholder: '请输入前排PH',
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'lower_ph',
    label: '后排PH',
    componentProps: {
      class: 'w-full',
      placeholder: '请输入前排PH',
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'upper_weight',
    label: '前排重量',
    componentProps: {
      class: 'w-full',
      placeholder: '请输入前排重量',
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'middle_weight',
    label: '中间重量',
    componentProps: {
      class: 'w-full',
      placeholder: '请输入前排重量',
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'lower_weight',
    label: '后排重量',
    componentProps: {
      class: 'w-full',
      placeholder: '请输入前排重量',
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'upper_height',
    label: '前排高度',
    componentProps: {
      class: 'w-full',
      placeholder: '请输入前排高度',
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'middle_height',
    label: '中间高度',
    componentProps: {
      class: 'w-full',
      placeholder: '请输入前排高度',
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'lower_height',
    label: '后排高度',
    componentProps: {
      class: 'w-full',
      placeholder: '请输入前排高度',
    },
  },
  {
    component: 'Textarea',
    fieldName: 'remark',
    label: '备注',
    formItemClass: 'col-span-3',
    componentProps: {
      placeholder: '请输入备注',
    },
  },
];
