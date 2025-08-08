<script lang="ts" setup>
import type { ListItem } from './type';

import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { Col, Input, InputNumber, message, Row } from 'ant-design-vue';

import { createApi } from './api';

const emit = defineEmits(['reload']);

const [Modal, ModalApi] = useVbenModal({
  closeOnClickModal: false,
  onOpenChange: async (isOpen: boolean) => {
    if (!isOpen) return;

    const { list = [] } = ModalApi.getData();
    ModalApi.setData({});

    list.forEach((item: ListItem) => {
      item.remark = '';
      item.reality_num = 0;
    });
    materialItems.value = list;
  },
  onConfirm: async () => {
    try {
      await createApi({ materials: materialItems.value });
      ModalApi.close();
      ModalApi.setData({});
      message.success('操作成功');
      emit('reload');
    } catch {}
  },
});

// 库存条目明细细列
const materialItems = ref<ListItem[]>([]);
</script>
<template>
  <Modal title="库存盘点" class="w-[960px]" content-class="pt-[20px] pb-0">
    <div class="pb-[24px]">
      <Row :gutter="10" class="mb-[15px]">
        <Col class="text-center" :span="5">原料</Col>
        <Col class="text-center" :span="5">规格</Col>
        <Col class="text-center" :span="5">数量</Col>
        <Col class="text-center" :span="9">备注</Col>
      </Row>
      <Row
        class="align-center mt-[10px] flex"
        v-for="(item, i) in materialItems"
        :key="i"
        :gutter="10"
      >
        <Col :span="5" class="flex items-center">
          <Input
            class="w-full text-center"
            readonly
            v-model:value="item.material"
            placeholder="原料名称"
          />
        </Col>
        <Col :span="5" class="flex items-center">
          <Input
            class="w-full text-center"
            readonly
            v-model:value="item.spec"
            placeholder="原料规格"
          />
        </Col>
        <Col :span="5" class="flex items-center">
          <InputNumber
            class="w-full"
            v-model:value="item.reality_num"
            placeholder="库存数量"
            :addon-after="item.unit"
          />
        </Col>
        <Col :span="9" class="flex items-center">
          <Input
            class="w-full"
            v-model="item.remark"
            placeholder="请输入备注"
          />
        </Col>
      </Row>
    </div>
  </Modal>
</template>
