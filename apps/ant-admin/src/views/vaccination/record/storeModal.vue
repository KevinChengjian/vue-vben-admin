<script lang="ts" setup>
import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';
import { useUserStore } from '@vben/stores';

import { message } from 'ant-design-vue';
import dayjs from 'dayjs';

import { useVbenForm } from '#/adapter/form';
import { Dict } from '#/api';

import { canNoApi, createApi, updateApi } from './api';

const emit = defineEmits(['reload']);

const userStore = useUserStore();
const makeSn = ref<string>('');
const variety = ref<string>('');
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
      fieldName: 'si_id',
      label: '菌种鉴定ID',
      dependencies: {
        triggerFields: ['id'],
        show: () => {
          return false;
        },
      },
    },
    {
      component: 'Input',
      fieldName: 'mb_id',
      label: '制包拌料ID',
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
        makeNum: true,
        placeholder: '请选择制包编号',
        onChange: async (_: string, opt: any) => {
          makeSn.value = opt.value || '';

          const params: any = {
            mb_id: opt?.mb_id,
            formula_id: opt?.formula_id,
            num: opt?.num || undefined,
          };

          if (variety.value) {
            params.mb_sn = `NX-${opt.value}-${variety.value}`;
          }

          await StoreFromApi.setValues(params);
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
        onChange: async (canNo: string) => {
          if (canNo) {
            const result = await canNoApi({ can_no: canNo });
            if (!result.empty && result.detail) {
              variety.value = result.detail.variety || '';

              await StoreFromApi.setValues({
                si_id: result.detail.id,
                variety_id: result.detail.variety_id,
              });

              if (makeSn.value && variety.value) {
                const mbSn = `NX-${makeSn.value}-${variety.value}`;
                await StoreFromApi.setFieldValue('mb_sn', mbSn);
              }
              return;
            }

            message.error('该罐号无菌种鉴定信息');
            return;
          }

          variety.value = '';
          await StoreFromApi.setFieldValue('mb_sn', undefined);
        },
      },
    },
    {
      component: 'Input',
      fieldName: 'mb_sn',
      label: '菌包编号',
      rules: 'required',
      componentProps: {
        placeholder: '请填写菌包编号',
      },
    },
    {
      component: 'DatePicker',
      fieldName: 'vaccination_at',
      label: '接种时间',
      rules: 'required',
      componentProps: {
        class: 'w-full',
        showTime: { format: 'HH:mm' },
        format: 'YYYY-MM-DD HH:mm',
        valueFormat: 'YYYY-MM-DD HH:MM',
        placeholder: '请选择接种时间',
      },
    },

    {
      component: 'InputNumber',
      fieldName: 'num',
      label: '接种数量',
      rules: 'required',
      componentProps: {
        class: 'w-full',
        placeholder: '请填写接种数量',
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
      fieldName: 'strain_num',
      label: '菌种量(ml)',
      rules: 'required',
      componentProps: {
        class: 'w-full',
        placeholder: '请填写菌种量',
      },
    },
    {
      component: 'InputNumber',
      fieldName: 'breakage',
      label: '破损量',
      componentProps: {
        class: 'w-full',
        placeholder: '请填写破损量',
      },
    },
    {
      component: 'InputNumber',
      fieldName: 'room_temperature',
      label: '接种室温度',
      componentProps: {
        class: 'w-full',
        placeholder: '请填写接种室温度',
      },
    },
    {
      component: 'InputNumber',
      fieldName: 'ph',
      label: '菌包PH',
      componentProps: {
        class: 'w-full',
        placeholder: '请填写菌包PH',
      },
    },
    {
      component: 'InputNumber',
      fieldName: 'mb_temperature',
      label: '菌包温度',
      componentProps: {
        class: 'w-full',
        placeholder: '请填写菌包温度',
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
      vaccination_at: dayjs().format('YYYY-MM-DD HH:mm'),
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
    :title="`${isUpdate ? '编辑接种记录' : '添加接种记录'}`"
    class="w-[960px]"
    content-class="pt-[20px] pb-0"
  >
    <StoreForm />
  </Modal>
</template>
