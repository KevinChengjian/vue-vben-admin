<script lang="ts" setup>
import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';
import { useUserStore } from '@vben/stores';

import { message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { Dict } from '#/api';
import { Material } from '#/api/core/material';

import { createApi, updateApi } from './api';

const emit = defineEmits(['reload']);

const userStore = useUserStore();
const MaterialItems = ref<any>([]);
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
      component: 'MaterialSnSelect',
      fieldName: 'material_sn',
      label: '原料编号',
      rules: 'required',
      componentProps: {
        placeholder: '请输入原料编号',
      },
    },
    {
      component: 'Input',
      fieldName: 'make_bag_sn',
      label: '制包编号',
      componentProps: {
        class: 'w-full',
        placeholder: '请输入制包编号',
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
        onChange: async (e: string) => {
          if (e && MaterialItems.value) {
            MaterialItems.value.forEach(async (item: any) => {
              if (item.material_id === e) {
                await StoreFromApi.setValues({
                  unit_id: item.unit_id,
                  price: item.price,
                });
              }

              if (item.spec && item.spec.length > 0) {
                await StoreFromApi.updateSchema([
                  {
                    fieldName: 'spec_id',
                    componentProps: {
                      filters: item.spec || [],
                    },
                  },
                ]);
              }
            });
          }
        },
      },
      dependencies: {
        triggerFields: ['material_sn'],
        trigger: async (values) => {
          const { ids, list } = await Material.materialIds({
            keyword: values.material_sn,
          });
          MaterialItems.value = list;

          StoreFromApi.updateSchema([
            {
              fieldName: 'material_id',
              componentProps: {
                filters: ids,
              },
            },
          ]);
        },
      },
    },
    // {
    //   component: 'DictSelect',
    //   fieldName: 'spec_id',
    //   label: '原料规格',
    //   componentProps: {
    //     class: 'w-full',
    //     allowClear: true,
    //     placeholder: '请选择原料规格',
    //     code: Dict.KeyEnum.MATERIAL_SPEC,
    //   },
    // },
    {
      component: 'InputNumber',
      fieldName: 'num',
      label: '出库数量',
      rules: 'required',
      componentProps: {
        class: 'w-full',
        placeholder: '请输入数量',
      },
    },
    {
      component: 'DictSelectWithAdd',
      fieldName: 'unit_id',
      label: '单位',
      rules: 'required',
      componentProps: {
        class: 'w-full',
        allowClear: true,
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
              Number((values.num * values.price).toFixed(2)),
            );
          }
        },
      },
      componentProps: {
        suffix: '元',
        class: 'w-full',
        placeholder: '请输入合计金额',
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
    await StoreFromApi.setValues({
      user_id: userStore.userInfo?.userId,
    });

    isUpdate.value = data.isEdit;
    data.record && StoreFromApi.setValues({ ...data.record });
    isUpdate.value &&
      StoreFromApi.setValues({
        ...data.record,
        status: `${data.record.status}`,
      });
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
    :title="`${isUpdate ? '编辑出库记录' : '添加出库记录'}`"
    class="w-[960px]"
    content-class="pt-[20px] pb-0"
  >
    <StoreForm />
  </Modal>
</template>
