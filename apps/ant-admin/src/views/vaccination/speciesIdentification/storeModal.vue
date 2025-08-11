<script lang="ts" setup>
import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';
import { useUserStore } from '@vben/stores';

import { message } from 'ant-design-vue';
import dayjs from 'dayjs';

import { useVbenForm } from '#/adapter/form';
import { Dict } from '#/api';

import { createApi, updateApi } from './api';

const emit = defineEmits(['reload']);

const userStore = useUserStore();
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
      component: 'StrainSnSelect',
      fieldName: 'strain_sn',
      label: '菌种编号',
      rules: 'required',
      componentProps: {
        class: 'w-full',
        showSearch: true,
        placeholder: '请选择菌种编号',
        onChange: async (_: any, opt: any) => {
          if (opt.hour) {
            await StoreFromApi.setValues({
              variety_id: opt?.variety_id || undefined,
              hour: opt?.hour || undefined,
            });
          }
        },
      },
    },
    {
      component: 'DatePicker',
      fieldName: 'identification_at',
      label: '鉴定日期',
      rules: 'required',
      componentProps: {
        class: 'w-full',
        valueFormat: 'YYYY-MM-DD',
        placeholder: '请填写鉴定日期',
      },
    },
    {
      component: 'DictSelect',
      fieldName: 'variety_id',
      label: '品种',
      rules: 'required',
      componentProps: {
        class: 'w-full',
        disabled: true,
        showSearch: true,
        allowClear: true,
        placeholder: '请选择品种',
        code: Dict.KeyEnum.STRAIN_CATEGORY,
      },
    },
    {
      component: 'DictSelect',
      fieldName: 'user_id',
      label: '鉴定人员',
      rules: 'required',
      componentProps: {
        class: 'w-full',
        placeholder: '请选择鉴定人员',
        code: Dict.KeyEnum.SYS_USER,
      },
    },
    {
      component: 'InputNumber',
      fieldName: 'hour',
      label: '培养时间',
      componentProps: {
        addonAfter: 'h',
        class: 'w-full',
        placeholder: '请填写培养时间',
      },
    },
    {
      component: 'InputNumber',
      fieldName: 'ph',
      label: 'PH',
      componentProps: {
        class: 'w-full',
        placeholder: '请填写PH值',
      },
    },
    {
      component: 'Input',
      fieldName: 'concentration',
      label: '菌丝浓度',
      componentProps: {
        addonAfter: '%',
        class: 'w-full',
        placeholder: '请填写菌丝浓度',
      },
    },
    {
      component: 'DictSelect',
      fieldName: 'result_id',
      label: '判定结果',
      rules: 'required',
      componentProps: {
        class: 'w-full',
        placeholder: '请选择判定结果',
        code: Dict.KeyEnum.STRAIN_RESULT,
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
    {
      component: 'CustomUpload',
      fieldName: 'attach_ids',
      label: '附件',
      formItemClass: 'col-span-2',
      componentProps: {
        placeholder: '请上传附件',
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
    await StoreFromApi.setValues({
      sp_id: 0,
      identification_at: dayjs().format('YYYY-MM-DD'),
      user_id: userStore.userInfo?.userId,
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
      message.success('操作成功');
      emit('reload');
    } catch {}
  },
});
</script>
<template>
  <Modal
    :title="`${isUpdate ? '编辑鉴定记录' : '添加鉴定记录'}`"
    class="w-[960px]"
    content-class="pt-[20px] pb-0"
  >
    <StoreForm />
  </Modal>
</template>
