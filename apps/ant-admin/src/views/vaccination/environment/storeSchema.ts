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
    component: 'DictSelect',
    fieldName: 'region_id',
    label: '检测区域',
    rules: 'required',
    componentProps: {
      class: 'w-full',
      showSearch: true,
      placeholder: '请选择检测区域',
      code: Dict.KeyEnum.ENV_REGION,
    },
  },
  {
    component: 'DictSelect',
    fieldName: 'point_id',
    label: '检测点位',
    rules: 'required',
    componentProps: {
      class: 'w-full',
      showSearch: true,
      placeholder: '请选择检测点位',
      code: Dict.KeyEnum.ENV_POINT,
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
    component: 'Input',
    fieldName: 'sgl_mildew',
    label: '甩柜绿霉',
    componentProps: {
      class: 'w-full',
      placeholder: '请输入甩柜绿霉',
    },
  },
  {
    component: 'Input',
    fieldName: 'q_mildew',
    label: '青霉',
    componentProps: {
      class: 'w-full',
      placeholder: '请输入青霉',
    },
  },
  {
    component: 'Input',
    fieldName: 'lp_mildew',
    label: '链孢霉',
    componentProps: {
      class: 'w-full',
      placeholder: '请输入链孢霉',
    },
  },
  {
    component: 'Input',
    fieldName: 'g_mildew',
    label: '跟霉',
    componentProps: {
      class: 'w-full',
      placeholder: '请输入跟霉',
    },
  },
  {
    component: 'Input',
    fieldName: 'm_mildew',
    label: '毛霉',
    componentProps: {
      class: 'w-full',
      placeholder: '请输入毛霉',
    },
  },
  {
    component: 'Input',
    fieldName: 'h_mildew',
    label: '黄曲霉',
    componentProps: {
      class: 'w-full',
      placeholder: '请输入黄曲霉',
    },
  },
  {
    component: 'DatePicker',
    fieldName: 'check_at',
    label: '检测日期',
    rules: 'required',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
      class: 'w-full',
      placeholder: '请选择检测日期',
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
