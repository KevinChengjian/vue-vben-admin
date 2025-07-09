<script lang="ts" setup>
import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import dayjs from 'dayjs';

import { useVbenForm } from '#/adapter/form';
import { Dict } from '#/api';

import { createApi, updateApi } from './api';

const emit = defineEmits(['reload']);

const makeSn = ref<string>('');
const variety = ref<string>('');
const warehouseId = ref<string>('');

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
      component: 'MakeBagSnSelect',
      fieldName: 'make_bag_sn',
      label: '制包编号',
      rules: 'required',
      componentProps: {
        makeNum: true,
        placeholder: '请选择制包编号',
        onChange: async (_: string, opt: any) => {
          makeSn.value = opt?.value || '';
          const params: any = {
            num: opt?.num || undefined,
          };

          if (makeSn.value && variety.value && warehouseId.value) {
            params.mb_sn = `NX-${makeSn.value}-${variety.value}-${warehouseId.value}`;
          }

          await StoreFromApi.setValues(params);
        },
      },
    },
    {
      component: 'StrainSnSelect',
      fieldName: 'strain_sn',
      label: '菌种编号',
      rules: 'required',
      componentProps: {
        makeNum: true,
        placeholder: '请选择菌种编号',
        onChange: async (_: string, opt: any) => {
          variety.value = opt?.variety || '';
          const params: any = {
            variety_id: opt.identify_variety_id || opt.variety_id,
          };

          if (makeSn.value && variety.value && warehouseId.value) {
            params.mb_sn = `NX-${makeSn.value}-${variety.value}-${warehouseId.value}`;
          }

          await StoreFromApi.setValues(params);
        },
      },
    },
    {
      component: 'DictSelect',
      fieldName: 'warehouse_id',
      label: '养菌房',
      rules: 'required',
      componentProps: {
        class: 'w-full',
        showSearch: true,
        placeholder: '请选择养菌房',
        code: Dict.KeyEnum.STRAIN_HOUSE,
        onChange: async (e: string) => {
          warehouseId.value = e;
          if (makeSn.value && variety.value && warehouseId.value) {
            await StoreFromApi.setValues({
              mb_sn: `NX-${makeSn.value}-${variety.value}-${warehouseId.value}`,
            });
          }
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
        format: 'YYYY-MM-DD',
        valueFormat: 'YYYY-MM-DD',
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
      label: '菌种量',
      rules: 'required',
      componentProps: {
        addonAfter: 'ml',
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
        addonAfter: '℃',
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
        addonAfter: '℃',
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
    makeSn.value = isUpdate.value ? data.record?.make_bag_sn : '';
    variety.value = isUpdate.value ? data.record?.variety : '';
    warehouseId.value = isUpdate.value ? data.record?.warehouse_id : '';

    await StoreFromApi.setValues({
      vaccination_at: dayjs().format('YYYY-MM-DD HH:mm'),
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
