<script lang="ts" setup>
import type { FormulaItem } from './type';

import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import {
  Col,
  Descriptions,
  DescriptionsItem,
  Divider,
  Row,
} from 'ant-design-vue';

import { Dict } from '#/api/core/dict';
import DictLabel from '#/components/dict/dict-label.vue';

const formula = ref<FormulaItem>({} as FormulaItem);
const [Modal, ModalApi] = useVbenModal({
  closeOnClickModal: false,
  footer: false,
  onOpenChange: async (isOpen: boolean) => {
    if (!isOpen) return;
    formula.value = ModalApi.getData() as FormulaItem;
    ModalApi.setData({});
  },
});
</script>
<template>
  <Modal title="配方详情" class="w-[680px]" content-class="py-[20px] pl-[24px]">
    <Descriptions :column="3">
      <DescriptionsItem :span="1" label="配方名称">
        {{ formula?.name }}
      </DescriptionsItem>
      <DescriptionsItem label="启用状态">
        <DictLabel :value="formula.status" :code="Dict.KeyEnum.STATUS" />
      </DescriptionsItem>
      <DescriptionsItem label="创建人员">
        {{ formula?.nickname }}
      </DescriptionsItem>
      <DescriptionsItem label="创建时间">
        {{ formula?.created_at }}
      </DescriptionsItem>
      <DescriptionsItem label="配方备注" :span="2">
        {{ formula?.remark }}
      </DescriptionsItem>
    </Descriptions>
    <Divider class="!mt-[10px]" orientation="left" orientation-margin="0px">
      原料比例
    </Divider>
    <Row
      class="mt-[10px]"
      v-for="(item, i) in formula?.materials"
      :key="i"
      :gutter="15"
    >
      <Col :span="8" class="flex items-center">
        {{ item.name }}
      </Col>
      <Col :span="6" class="flex items-center"> {{ item.weight }} kg </Col>
      <Col class="flex items-center" :span="8" :offset="2">
        {{ item.remark || '~' }}
      </Col>
    </Row>
  </Modal>
</template>
