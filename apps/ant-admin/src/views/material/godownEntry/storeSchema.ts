import type { VbenFormSchema } from '@vben/common-ui';

import { Dict } from '#/api';

export const MaterialInFormStoreSchema: VbenFormSchema[] = [
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
    component: 'MaterialSnInput',
    fieldName: 'material_sn',
    label: '原料编号',
    rules: 'required',
    componentProps: {
      placeholder: '请输入原料编号',
    },
  },
  {
    component: 'Input',
    fieldName: 'manufacturer',
    label: '购置厂家',
    componentProps: {
      placeholder: '请输入购置厂家',
    },
  },
  {
    component: 'DictSelect',
    fieldName: 'material_id',
    label: '原料名称',
    rules: 'required',
    componentProps: {
      class: 'w-full',
      showSearch: true,
      placeholder: '请选择原料名称',
      code: Dict.KeyEnum.MATERIAL,
    },
  },
  {
    component: 'DictSelect',
    fieldName: 'spec_id',
    label: '原料规格',
    componentProps: {
      class: 'w-full',
      placeholder: '请选择原料规格',
      code: Dict.KeyEnum.MATERIAL_SPEC,
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'num',
    label: '入库数量',
    rules: 'required',
    componentProps: {
      class: 'w-full',
      placeholder: '请输入数量',
    },
  },
  {
    component: 'DictSelect',
    fieldName: 'unit_id',
    label: '单位',
    rules: 'required',
    componentProps: {
      class: 'w-full',
      placeholder: '请选择原料单位',
      code: Dict.KeyEnum.UNIT,
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'price',
    label: '单价',
    rules: 'required',
    componentProps: {
      suffix: '元',
      class: 'w-full',
      placeholder: '请输入单价',
    },
  },
  {
    component: 'InputNumber',
    fieldName: 'amount',
    label: '合计金额',
    rules: 'required',
    dependencies: {
      triggerFields: ['num', 'price'],
      trigger: async (values, formApi) => {
        if (!Number.isNaN(values.num) && !Number.isNaN(values.price)) {
          formApi.setFieldValue(
            'amount',
            Number((values.num * values.price).toFixed(2)) || '',
          );
        }
      },
    },
    componentProps: {
      suffix: '元',
      class: 'w-full',
      placeholder: '请输入总价',
    },
  },
  {
    component: 'DictSelect',
    fieldName: 'user_id',
    label: '采购人员',
    rules: 'required',
    componentProps: {
      class: 'w-full',
      placeholder: '请选择采购人员',
      code: Dict.KeyEnum.SYS_USER,
    },
  },
  {
    component: 'DatePicker',
    fieldName: 'purchase_at',
    label: '采购日期',
    rules: 'required',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
      class: 'w-full',
      placeholder: '请输入采购日期',
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
