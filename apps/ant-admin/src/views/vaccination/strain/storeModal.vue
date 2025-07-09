<script lang="ts" setup>
import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import dayjs from 'dayjs';

import { useVbenForm } from '#/adapter/form';
import { Dict } from '#/api';

import { createApi, updateApi } from './api';

const emit = defineEmits(['reload']);
const canNo = ref<string>('');
const date = ref<string>('');
const handleStrainSn = () => {
  let strainSn: string = '';
  if (canNo.value && date.value) {
    strainSn = `${dayjs(date.value).format('YYYYMMDD')}-${canNo.value}`;
  }
  StoreFromApi.setFieldValue('strain_sn', strainSn);
};

const [StoreForm, StoreFromApi] = useVbenForm({
  schema: [
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
      fieldName: 'can_no',
      label: '罐号',
      rules: 'required',
      componentProps: {
        class: 'w-full',
        placeholder: '请选择罐号',
        code: Dict.KeyEnum.STRAIN_CAN_NO,
        onChange: (_: any, opt: any) => {
          canNo.value = opt.label;
          handleStrainSn();
        },
      },
    },
    {
      component: 'DatePicker',
      fieldName: 'cultivate_at',
      label: '培养日期',
      rules: 'required',
      componentProps: {
        valueFormat: 'YYYY-MM-DD',
        class: 'w-full',
        placeholder: '请选择培养日期',
        onChange: (e: any) => {
          date.value = e;
          handleStrainSn();
        },
      },
    },
    {
      component: 'Input',
      fieldName: 'strain_sn',
      label: '菌种编号',
      rules: 'required',
      componentProps: {
        class: 'w-full',
        placeholder: '请输入菌种编号',
      },
    },
    {
      component: 'DictSelect',
      fieldName: 'variety_id',
      label: '品种',
      componentProps: {
        class: 'w-full',
        showSearch: true,
        placeholder: '请选择品种',
        code: Dict.KeyEnum.STRAIN_CATEGORY,
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
  ],
  showDefaultActions: false,
  wrapperClass: 'grid-cols-2 mr-[25px]',
  commonConfig: {
    labelWidth: 90,
  },
});

const isUpdate = ref<boolean>(false);
const [Modal, ModalApi] = useVbenModal({
  closeOnClickModal: false,
  onOpenChange: async (isOpen: boolean) => {
    StoreFromApi.resetForm();
    if (!isOpen) return;

    const data = ModalApi.getData();
    ModalApi.setData({});

    // 默认值
    isUpdate.value = data.isEdit;
    date.value = data?.record?.cultivate_at || dayjs().format('YYYY-MM-DD');
    await StoreFromApi.setValues({
      cultivate_at: date.value,
    });

    data.record && StoreFromApi.setValues({ ...data.record });
  },
  onConfirm: async () => {
    try {
      await StoreFromApi.validate();
      const values = await StoreFromApi.getValues();
      await (values?.id ? updateApi(values) : createApi(values));

      ModalApi.close();
      ModalApi.setData({});
      StoreFromApi.resetForm();
      emit('reload');
    } catch {}
  },
});
</script>
<template>
  <Modal
    :title="`${isUpdate ? '编辑记录' : '添加记录'}`"
    class="w-[960px]"
    content-class="pt-[20px] pb-0"
  >
    <StoreForm />
  </Modal>
</template>
