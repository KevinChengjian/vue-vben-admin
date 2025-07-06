<script lang="ts" setup>
import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';
import { useUserStore } from '@vben/stores';

import { message } from 'ant-design-vue';
import dayjs from 'dayjs';

import { useVbenForm } from '#/adapter/form';
import { Dict } from '#/api';
import { Status } from '#/enums/StatusEnum';

import { createApi, strainPatrolListApi, updateApi } from './api';

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
      component: 'Input',
      fieldName: 'sp_id',
      label: 'sp_id',
      defaultValue: 0,
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
      componentProps: {
        class: 'w-full',
        showSearch: true,
        allowClear: true,
        placeholder: '请选择罐号',
        code: Dict.KeyEnum.STRAIN_CAN_NO,
        onChange: async (e: any) => {
          const result = await strainPatrolListApi({ can_no: e });
          if (result.detail) {
            await StoreFromApi.setFieldValue('sp_id', result.detail.id);
            if (result.detail.variety_id) {
              await StoreFromApi.setFieldValue(
                'variety_id',
                result.detail.variety_id,
              );
            }
            if (result.detail.hour) {
              await StoreFromApi.setFieldValue('hour', result.detail.hour);
            }

            if (result.detail.used === Status.Enable) {
              message.error('该罐号下菌种已被使用');
            }
          } else {
            message.error('该罐号下无菌种观察记录');
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
      component: 'DictSelect',
      fieldName: 'variety_id',
      label: '品种',
      rules: 'required',
      componentProps: {
        class: 'w-full',
        showSearch: true,
        allowClear: true,
        placeholder: '请选择品种',
        code: Dict.KeyEnum.STRAIN_CATEGORY,
      },
    },
    {
      component: 'InputNumber',
      fieldName: 'hour',
      label: '培养时间(h)',
      componentProps: {
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
        class: 'w-full',
        placeholder: '请填写菌丝浓度',
      },
    },
    {
      component: 'Input',
      fieldName: 'result',
      label: '判定结果',
      componentProps: {
        class: 'w-full',
        placeholder: '请填写判定结果',
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
