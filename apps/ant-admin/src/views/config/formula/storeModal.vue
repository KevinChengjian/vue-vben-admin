<script lang="ts" setup>
import type { FormulaMaterialItem } from './type';

import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { Col, Input, Row } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { Dict } from '#/api';
import { DictSelect } from '#/components';
import { useDictStore } from '#/store';

import { formulaCreateApi, formulaUpdateApi } from './api';
import { FormulaFormStoreSchema } from './storeSchema';

const emit = defineEmits(['reload']);
const { getDictByKey } = useDictStore();

const [StoreForm, StoreFromApi] = useVbenForm({
  schema: FormulaFormStoreSchema,
  showDefaultActions: false,
  wrapperClass: 'grid-cols-1 mr-[25px]',
  commonConfig: {
    labelWidth: 90,
  },
});

const dictMaterialList = ref<Dict.ValueItem[]>([]);
const materialForm = ref<FormulaMaterialItem[]>([]);
const handleMaterial = (ids: any) => {
  const materialValue: FormulaMaterialItem[] = [];
  ids.forEach((id: string) => {
    const index = dictMaterialList.value?.findIndex((d) => d.value === id);
    if (index > -1) {
      const item = dictMaterialList.value[index];
      const ei = materialForm.value.findIndex((m) => m.mid === Number(id));
      let ratio = 0;
      let remark = '';
      if (ei !== -1) {
        const mfItem = materialForm.value[ei];
        ratio = mfItem?.ratio || 0;
        remark = mfItem?.remark || '';
      }

      materialValue.push({
        id: 0,
        fid: 0,
        mid: Number(id),
        name: item?.label,
        ratio,
        remark,
      });
    }
  });
  materialForm.value = materialValue;
};

const isUpdate = ref<boolean>(false);
const [Modal, ModalApi] = useVbenModal({
  closeOnClickModal: false,
  onOpenChange: async (isOpen: boolean) => {
    StoreFromApi.resetForm();
    if (!isOpen) return;
    dictMaterialList.value = await getDictByKey(Dict.KeyEnum.MATERIAL);

    const data = ModalApi.getData();
    ModalApi.setData({});

    isUpdate.value = data.isEdit;
    materialForm.value = [];
    if (isUpdate.value) {
      const material: string[] = [];
      data.record.materials.forEach((item: FormulaMaterialItem) => {
        material.push(item.mid.toString());
        materialForm.value.push({
          id: item.id,
          fid: item.fid,
          mid: item.mid,
          name: item.name,
          ratio: Number.parseFloat(item.ratio.toString()),
          remark: item.remark,
        });
      });

      StoreFromApi.setValues({
        ...data.record,
        status: `${data.record.status}`,
        material,
      });
    }
  },
  onConfirm: async () => {
    try {
      await StoreFromApi.validate();
      const values = await StoreFromApi.getValues();
      values.material = materialForm.value;
      await (values?.id ? formulaUpdateApi(values) : formulaCreateApi(values));

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
    :title="`${isUpdate ? '编辑配方' : '添加配方'}`"
    class="w-[680px]"
    content-class="pt-[20px] pb-0"
  >
    <StoreForm>
      <template #material="slotProps">
        <DictSelect
          :code="Dict.KeyEnum.MATERIAL"
          v-bind="slotProps"
          placeholder="请选择使用原料"
          class="w-full"
          mode="multiple"
          @change="handleMaterial"
        />
      </template>
      <div class="ml-[100px] pb-[24px]">
        <Row :gutter="15" class="mb-[15px]">
          <Col class="text-center" :span="8">原料</Col>
          <Col class="text-center" :span="6">比例</Col>
          <Col class="text-center" :span="10">备注</Col>
        </Row>
        <Row
          class="align-center mt-[10px] flex"
          v-for="(item, i) in materialForm"
          :key="i"
          :gutter="15"
        >
          <Col :span="8" class="flex items-center">
            <Input readonly v-model:value="item.name" placeholder="原料名称" />
          </Col>
          <Col :span="6">
            <Input
              v-model:value="item.ratio"
              placeholder="原料比例"
              addon-after="%"
            />
          </Col>
          <Col class="text-center" :span="10">
            <Input v-model="item.remark" placeholder="请输入备注" />
          </Col>
        </Row>
      </div>
    </StoreForm>
  </Modal>
</template>
