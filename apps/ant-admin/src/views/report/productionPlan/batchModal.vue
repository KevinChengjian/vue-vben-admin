<script lang="ts" setup>
import type { ListItem } from './type';

import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { Col, DatePicker, Input, message, Row } from 'ant-design-vue';
import dayjs from 'dayjs';

import { Dict } from '#/api';
import { DictSelect } from '#/components';

import { planApi } from './api';

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
      await planApi({ plan: planItems.value });

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
    mc: '',
    bottled_num: '',
    variety_id: '',
    make_can: '',
    vc_can: '',
    production: '',
    production_vc: '',
    remark: '',
  });
};
</script>
<template>
  <Modal
    :title="`${isUpdate ? '编辑生产计划' : '添加生产计划'}`"
    class="w-[1400px]"
    content-class="pt-[20px] pb-0"
  >
    <div class="pb-[24px]">
      <Row :gutter="10" class="mb-[15px]">
        <Col class="text-center" :span="3">日期</Col>
        <Col class="text-center" :span="2">做陪养基</Col>
        <Col class="text-center" :span="2">接瓶</Col>
        <Col class="text-center" :span="3">品种</Col>
        <Col class="text-center" :span="2">做罐</Col>
        <Col class="text-center" :span="2">接罐</Col>
        <Col class="text-center" :span="3">生产</Col>
        <Col class="text-center" :span="3">生产接种</Col>
        <Col class="text-center" :span="3">备注</Col>
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
        <Col :span="2" class="flex items-center">
          <Input
            class="w-full"
            v-model:value="item.mc"
            placeholder="做陪养基"
          />
        </Col>
        <Col :span="2">
          <Input
            class="w-full"
            v-model:value="item.bottled_num"
            placeholder="接瓶"
          />
        </Col>
        <Col :span="3" class="flex items-center">
          <DictSelect
            class="w-full"
            v-model:value="item.variety_id"
            placeholder="品种"
            :code="Dict.KeyEnum.STRAIN_CATEGORY"
          />
        </Col>
        <Col :span="2">
          <Input
            class="w-full"
            v-model:value="item.make_can"
            placeholder="做罐"
          />
        </Col>
        <Col :span="2">
          <Input
            class="w-full"
            v-model:value="item.vc_can"
            placeholder="接罐"
          />
        </Col>

        <Col :span="3">
          <Input
            class="w-full"
            v-model:value="item.production"
            placeholder="生产"
          />
        </Col>
        <Col :span="3">
          <Input
            class="w-full"
            v-model:value="item.production_vc"
            placeholder="生产接种"
          />
        </Col>
        <Col class="text-center" :span="3">
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
