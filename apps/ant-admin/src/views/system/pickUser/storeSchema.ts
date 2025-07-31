import type { VbenFormSchema } from '@vben/common-ui';

export const StoreSchema: VbenFormSchema[] = [
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
    label: '姓名',
    rules: 'required',
    componentProps: {
      placeholder: '请输入姓名',
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
