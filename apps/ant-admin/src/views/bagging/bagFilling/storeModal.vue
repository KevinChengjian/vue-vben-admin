<script lang="ts" setup>
import type { CanItem } from '../substrateMixing/type';

import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { Col, Input, InputNumber, message, Row } from 'ant-design-vue';
import dayjs from 'dayjs';

import { useVbenForm } from '#/adapter/form';
import { Dict } from '#/api';

import { canItemsApi, createApi, updateApi } from './api';

const emit = defineEmits(['reload']);

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
        placeholder: '请选择制包编号',
        onChange: async (_: string, opt: any) => {
          handleFormatCanItems(opt?.mb_id);
          await StoreFromApi.setValues({
            mb_id: opt?.mb_id,
            formula_id: opt?.formula_id,
          });
        },
      },
    },
    {
      component: 'DatePicker',
      fieldName: 'bagging_at',
      label: '装袋日期',
      rules: 'required',
      componentProps: {
        valueFormat: 'YYYY-MM-DD',
        class: 'w-full',
        placeholder: '请选择装袋日期',
      },
    },
    {
      component: 'Input',
      fieldName: 'formula_id',
      label: '制包配方',
      componentProps: {
        class: 'w-full',
        placeholder: '请选择制包配方',
      },
      dependencies: {
        triggerFields: ['id'],
        show: () => {
          return false;
        },
      },
    },
    {
      component: 'DictSelect',
      fieldName: 'machine_id',
      label: '装袋机器',
      rules: 'required',
      componentProps: {
        class: 'w-full',
        showSearch: true,
        placeholder: '请选择装袋机器',
        code: Dict.KeyEnum.BAG_MACHINE,
      },
    },
    {
      component: 'InputNumber',
      fieldName: 'num',
      label: '装袋数量',
      rules: 'required',
      componentProps: {
        class: 'w-full',
        placeholder: '请输入装袋数量',
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
    await StoreFromApi.setValues({
      bagging_at: dayjs().format('YYYY-MM-DD'),
    });

    isUpdate.value = data.isEdit;
    if (isUpdate.value) {
      canNumItems.value = data?.record?.can_items || [];
    }
    data.record && StoreFromApi.setValues({ ...data.record });
  },
  onConfirm: async () => {
    try {
      await StoreFromApi.validate();
      const values = await StoreFromApi.getValues();
      values.can_items = canNumItems.value || [];
      await (values?.id ? updateApi(values) : createApi(values));

      ModalApi.close();
      ModalApi.setData({});
      StoreFromApi.resetForm();
      message.success('操作成功');
      emit('reload');
    } catch {}
  },
});

const canNumItems = ref<CanItem[]>([]);
const handleFormatCanItems = async (id: number) => {
  const reuslt = await canItemsApi({ id });
  canNumItems.value = reuslt || [];
};
</script>
<template>
  <Modal
    :title="`${isUpdate ? '编辑装袋' : '添加装袋'}`"
    class="w-[1100px]"
    content-class="pt-[20px] pb-0"
  >
    <StoreForm />
    <div class="ml-[34px] pb-[24px]">
      <Row :gutter="15" class="mb-[15px]">
        <Col class="text-center" :span="4">罐号</Col>
        <Col class="text-center" :span="5">菌棒重量/kg</Col>
        <Col class="text-center" :span="5">中孔深度/cm</Col>
        <Col class="text-center" :span="5">菌棒高度/cm</Col>
        <Col class="text-center" :span="5">菌包松紧度</Col>
      </Row>
      <Row
        class="align-center mt-[10px] flex"
        v-for="(item, i) in canNumItems"
        :key="i"
        :gutter="15"
      >
        <Col :span="4">
          <InputNumber
            class="w-full"
            v-model:value="item.can_no"
            placeholder="罐号"
            :readonly="true"
          />
        </Col>
        <Col :span="5">
          <InputNumber
            class="w-full"
            v-model:value="item.weight"
            placeholder="菌棒重量"
          />
        </Col>
        <Col :span="5">
          <InputNumber
            class="w-full"
            v-model:value="item.depth"
            placeholder="中孔深度"
          />
        </Col>
        <Col :span="5">
          <InputNumber
            class="w-full"
            v-model:value="item.height"
            placeholder="菌棒高度"
          />
        </Col>
        <Col :span="5">
          <Input
            class="w-full"
            v-model:value="item.dt"
            placeholder="菌包松紧度"
          />
        </Col>
      </Row>
    </div>
  </Modal>
</template>
