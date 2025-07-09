import type { VbenFormSchema } from '@vben/common-ui';

import { Dict } from '#/api';

export const FormulaFormStoreSchema: VbenFormSchema[] = [
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
    fieldName: 'alias',
    label: '名称',
    rules: 'required',
    componentProps: {
      placeholder: '请输入名称',
    },
  },
  {
    component: 'Input',
    fieldName: 'box_no',
    label: '序列号',
    rules: 'required',
    componentProps: {
      placeholder: '请输入序列号',
    },
  },
  {
    component: 'DictSelect',
    fieldName: 'sh_id',
    label: '养菌房',
    defaultValue: '1',
    rules: 'required',
    componentProps: {
      class: 'w-full',
      placeholder: '请选择养菌房',
      code: Dict.KeyEnum.STRAIN_HOUSE,
    },
  },
  {
    component: 'Input',
    fieldName: 'remark',
    label: '备注',
    componentProps: {
      class: 'grid-cols-1',
      placeholder: '请输入备注',
    },
  },
];
