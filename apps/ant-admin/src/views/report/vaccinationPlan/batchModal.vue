<script lang="ts" setup>
import type { ListItem } from './type';

import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import {
  Col,
  DatePicker,
  Input,
  InputNumber,
  message,
  Row,
} from 'ant-design-vue';
import dayjs from 'dayjs';

import { Dict } from '#/api';
import { DictSelect } from '#/components';
import FormulaSelect from '#/components/formula/formula-select.vue';

import { createApi } from './api';

const emit = defineEmits(['reload']);

// 原料明细列
const isUpdate = ref<boolean>(false);
const planItems = ref<ListItem[]>([]);
const [Modal, ModalApi] = useVbenModal({
  closeOnClickModal: false,
  onOpenChange: async (isOpen: boolean) => {
    if (!isOpen) return;

    const data = ModalApi.getData();
    isUpdate.value = data.isEdit;
    ModalApi.setData({});
  },
  onConfirm: async () => {
    try {
      await createApi({ plan: planItems.value });

      ModalApi.close();
      ModalApi.setData({});
      message.success('操作成功');
      emit('reload');
    } catch {}
  },
});

const handleDelete = (index: number) => {
  planItems.value.splice(index, 1);
};
const handleAddRow = () => {
  planItems.value.push({
    id: 0,
    day: 0,
    plan_at: dayjs().format('YYYY-MM-DD'),
    bucket_num: 0,
    plan_num: 0,
    plan_fid: undefined,
    plan_variety_id: undefined,
    plan_type: undefined,
  });
};
</script>
<template>
  <Modal
    :title="`${isUpdate ? '编辑生产计划' : '添加生产计划'}`"
    class="w-[1150px]"
    content-class="pt-[20px] pb-0"
  >
    <div class="pb-[24px]">
      <Row :gutter="10" class="mb-[15px]">
        <Col class="text-center" :span="3">日期</Col>
        <Col class="text-center" :span="3">拌料桶数</Col>
        <Col class="text-center" :span="3">数量</Col>
        <Col class="text-center" :span="3">配方</Col>
        <Col class="text-center" :span="3">接种</Col>
        <Col class="text-center" :span="3">常规/实验</Col>
        <Col class="text-center" :span="5">备注</Col>
      </Row>
      <Row
        class="align-center mt-[10px] flex"
        v-for="(item, i) in planItems"
        :key="i"
        :gutter="10"
      >
        <Col :span="3" class="flex items-center">
          <DatePicker
            class="w-full"
            value-format="YYYY-MM-DD"
            v-model:value="item.plan_at"
            placeholder="请选择生产日期"
          />
        </Col>
        <Col :span="3" class="flex items-center">
          <InputNumber
            class="w-full"
            v-model:value="item.bucket_num"
            placeholder="拌料桶数"
          />
        </Col>
        <Col :span="3">
          <InputNumber
            class="w-full"
            v-model:value="item.plan_num"
            placeholder="数量"
          />
        </Col>
        <Col :span="3" class="flex items-center">
          <FormulaSelect
            class="w-full"
            v-model:value="item.plan_fid"
            placeholder="配方"
          />
        </Col>
        <Col :span="3">
          <DictSelect
            class="w-full"
            v-model:value="item.plan_variety_id"
            placeholder="接种"
            :code="Dict.KeyEnum.STRAIN_CATEGORY"
          />
        </Col>
        <Col :span="3">
          <DictSelect
            :code="Dict.KeyEnum.VACCINATION_TYPE"
            class="w-full"
            v-model:value="item.plan_type"
            placeholder="请选择类型"
          />
        </Col>
        <Col class="text-center" :span="5">
          <Input
            class="w-full"
            v-model:value="item.remark"
            placeholder="请输入备注"
          />
        </Col>
        <Col
          class="text-destructive cursor-pointer"
          style="line-height: 32px"
          :span="1"
          @click="handleDelete(i)"
        >
          删除
        </Col>
      </Row>
    </div>
    <div
      @click="handleAddRow"
      class="mb-[20px] cursor-pointer select-none rounded-[8px] border py-[8px] text-center text-[14px]"
    >
      新增
    </div>
  </Modal>
</template>
