<script lang="ts" setup>
import type { BatchMaterialItem } from './type';

import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';
import { useUserStore } from '@vben/stores';

import { Col, Input, InputNumber, message, Row } from 'ant-design-vue';
import dayjs from 'dayjs';

import { useVbenForm } from '#/adapter/form';
import { Dict } from '#/api';
import { Material } from '#/api/core/material';
import DictSelect from '#/components/dict/dict-select.vue';

import { materialInBatchCreateApi } from './api';

const emit = defineEmits(['reload']);

const userStore = useUserStore();
const [StoreForm, StoreFromApi] = useVbenForm({
  schema: [
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
      component: 'DictSelect',
      fieldName: 'user_id',
      label: '采购人员',
      rules: 'required',
      componentProps: {
        class: 'w-full',
        placeholder: '请选中采购人员',
        code: Dict.KeyEnum.SYS_USER,
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
      component: 'DatePicker',
      fieldName: 'purchase_at',
      label: '购置日期',
      rules: 'required',
      componentProps: {
        valueFormat: 'YYYY-MM-DD',
        class: 'w-full',
        placeholder: '请输入购置日期',
      },
    },
    {
      component: 'DatePicker',
      fieldName: 'put_at',
      label: '入库日期',
      rules: 'required',
      componentProps: {
        valueFormat: 'YYYY-MM-DD',
        class: 'w-full',
        placeholder: '请输入入库日期',
      },
    },
    {
      component: 'DictSelect',
      fieldName: 'material',
      label: '入库原料',
      formItemClass: 'col-span-2',
      componentProps: {
        mode: 'multiple',
        placeholder: '请选中入库原料',
        class: 'w-full',
        code: Dict.KeyEnum.MATERIAL,
        onChange: (_: any, options: any) => {
          const materials: BatchMaterialItem[] = [];
          options.forEach((item: Dict.ValueItem) => {
            const params: BatchMaterialItem = {
              material_id: item.value,
              material: item.label,
              spec_id: null,
              num: undefined,
              unit_id: '1',
              price: undefined,
              amount: undefined,
              remark: '',
            };

            const exists = materialItems.value.findIndex(
              (i: BatchMaterialItem) => i.material_id === item.value,
            );

            if (exists !== -1) {
              const batchItem = materialItems.value[exists];
              params.spec_id = batchItem?.spec_id || null;
              params.num = batchItem?.num || undefined;
              params.unit_id = batchItem?.unit_id || '1';
              params.price = batchItem?.price || undefined;
              params.amount = batchItem?.amount || undefined;
              params.remark = batchItem?.remark || '';
            }
            materials.push(params);
          });
          materialItems.value = materials;
        },
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
    materialItems.value = [];
    await StoreFromApi.setValues({
      put_at: dayjs().format('YYYY-MM-DD'),
      purchase_at: dayjs().format('YYYY-MM-DD'),
      user_id: userStore.userInfo?.userId,
      material_sn: isUpdate.value ? '' : await Material.materialSn(),
    });

    isUpdate.value = data.isEdit;
    data.record && StoreFromApi.setValues({ ...data.record });
  },
  onConfirm: async () => {
    try {
      await StoreFromApi.validate();
      const values = await StoreFromApi.getValues();
      await materialInBatchCreateApi(
        Object.assign(values, { materials: materialItems.value }),
      );

      ModalApi.close();
      ModalApi.setData({});
      StoreFromApi.resetForm();
      message.success('操作成功');
      emit('reload');
    } catch {}
  },
});

// 原料明细列
const materialItems = ref<BatchMaterialItem[]>([]);
const handleAmount = (i: number) => {
  const item: BatchMaterialItem = materialItems.value[i] as BatchMaterialItem;
  item.amount = Number(((item?.num || 0) * (item?.price || 0)).toFixed(2)) || 0;
};
</script>
<template>
  <Modal
    :title="`${isUpdate ? '编辑入库记录' : '添加入库记录'}`"
    class="w-[960px]"
    content-class="pt-[20px] pb-0"
  >
    <StoreForm />
    <div class="ml-[34px] pb-[24px]">
      <Row :gutter="10" class="mb-[15px]">
        <Col class="text-center" :span="3">原料</Col>
        <Col class="text-center" :span="3">规格</Col>
        <Col class="text-center" :span="3">数量</Col>
        <Col class="text-center" :span="3">单位</Col>
        <Col class="text-center" :span="3">单价(元)</Col>
        <Col class="text-center" :span="3">合计金额(元)</Col>
        <Col class="text-center" :span="6">备注</Col>
      </Row>
      <Row
        class="align-center mt-[10px] flex"
        v-for="(item, i) in materialItems"
        :key="i"
        :gutter="10"
      >
        <Col :span="3" class="flex items-center">
          <Input
            class="w-full"
            readonly
            v-model:value="item.material"
            placeholder="原料名称"
          />
        </Col>
        <Col :span="3" class="flex items-center">
          <DictSelect
            class="w-full"
            v-model:value="item.spec_id"
            :code="Dict.KeyEnum.MATERIAL_SPEC"
            placeholder="原料规格"
          />
        </Col>
        <Col :span="3">
          <InputNumber
            class="w-full"
            v-model:value="item.num"
            placeholder="入库数量"
            @change="handleAmount(i)"
          />
        </Col>
        <Col :span="3" class="flex items-center">
          <DictSelect
            class="w-full"
            v-model:value="item.unit_id"
            :code="Dict.KeyEnum.UNIT"
            placeholder="单位"
          />
        </Col>
        <Col :span="3">
          <InputNumber
            class="w-full"
            v-model:value="item.price"
            placeholder="单价"
            @change="handleAmount(i)"
          />
        </Col>
        <Col :span="3">
          <InputNumber
            class="w-full"
            v-model:value="item.amount"
            placeholder="合计金额"
          />
        </Col>
        <Col class="text-center" :span="6">
          <Input
            class="w-full"
            v-model:value="item.remark"
            placeholder="请输入备注"
          />
        </Col>
      </Row>
    </div>
  </Modal>
</template>
