<script lang="ts" setup>
import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { Col, Descriptions, DescriptionsItem, Row } from 'ant-design-vue';

const detail = ref<any>();
const [Modal, ModalApi] = useVbenModal({
  draggable: true,
  closeOnClickModal: false,
  footer: false,

  onOpenChange: async (isOpen: boolean) => {
    if (!isOpen) return;

    detail.value = ModalApi.getData();
    ModalApi.setData({});
  },
});
</script>

<template>
  <Modal title="环境检测详情" class="w-[860px] pb-1">
    <Descriptions size="small" class="ml-[10px]">
      <DescriptionsItem label="检测日期">
        {{ detail?.check_at }}
      </DescriptionsItem>
      <DescriptionsItem label="检测人员">
        {{ detail?.nickname }}
      </DescriptionsItem>
      <DescriptionsItem label="备注">
        {{ detail?.remark }}
      </DescriptionsItem>
    </Descriptions>

    <Row class="ml-[20px] mt-[15px] pb-[5px] text-[#323639]" :gutter="20">
      <Col span="3" class="text-center">位置</Col>
      <Col span="4" class="text-center">培养皿-1</Col>
      <Col span="4" class="text-center">培养皿-2</Col>
      <Col span="4" class="text-center">培养皿-3</Col>
      <Col span="4" class="text-center">培养皿-4</Col>
      <Col span="4" class="text-center">培养皿-5(中)</Col>
    </Row>

    <Row
      class="ml-[20px] mt-[15px] text-[#323639]"
      :gutter="20"
      v-for="(item, index) in detail?.area"
      :key="index"
    >
      <Col span="3" class="flex items-center justify-center text-center">
        {{ item.label }}
      </Col>
      <Col span="4" class="flex items-center justify-center text-center">
        {{ item.rs1 || '' }}
      </Col>
      <Col span="4" class="flex items-center justify-center text-center">
        {{ item.rs2 || '' }}
      </Col>
      <Col span="4" class="flex items-center justify-center text-center">
        {{ item.rs3 || '' }}
      </Col>
      <Col span="4" class="flex items-center justify-center text-center">
        {{ item.rs4 || '' }}
      </Col>
      <Col span="4" class="flex items-center justify-center text-center">
        {{ item.rs5 || '' }}
      </Col>
    </Row>
  </Modal>
</template>
