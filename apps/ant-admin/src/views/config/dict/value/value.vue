<script setup lang="ts">
import type { DictKeyItem } from '../key/type';
import type { DictValueItem } from './value.type';

import { reactive, ref, watch } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import {
  Button,
  Card,
  Col,
  Input,
  Row,
  Select,
  SelectOption,
  Table,
} from 'ant-design-vue';

import { AuthCode, dictionaryValueListApi } from './api';
import { DictValueColumn } from './columns';
import StoreValueModal from './storeModal.vue';

const props = defineProps<{ dictKey: DictKeyItem }>();
const query = reactive<any>({
  key_id: props?.dictKey?.id,
  label: '',
  status: undefined,
  page: 1,
  pageSize: 10,
  sortField: undefined,
  sortOrder: undefined,
});
const dictValueList = ref<DictValueItem[]>([]);
const dictValueTotal = ref<number>(0);

const getDictValueList = async () => {
  const res = await dictionaryValueListApi(query);
  dictValueList.value = res.list || [];
  dictValueTotal.value = res.total || 0;
};

const handleReload = (e: any, _: any = null, sorter: any = null) => {
  query.page = e.current;
  query.pageSize = e.pageSize;

  if (sorter !== null) {
    if (sorter.order) {
      query.sortField = sorter.field;
      query.sortOrder = sorter.order;
    } else {
      query.sortField = undefined;
      query.sortOrder = undefined;
    }
  }

  getDictValueList();
};

watch(
  () => props.dictKey,
  (n) => {
    query.key_id = n.id;
    getDictValueList();
  },
);

const [ValueModal, ValueModalApi] = useVbenModal({
  connectedComponent: StoreValueModal,
});

const handleEditDictValue = (item: any) => {
  ValueModalApi.setData(item);
  ValueModalApi.open();
};
</script>

<template>
  <Card
    :body-style="{ padding: '15px 24px 24px 24px' }"
    :bordered="false"
    class="h-full"
    title="字典项管理"
  >
    <template #extra>
      <Button
        type="primary"
        v-access:code="AuthCode.Create"
        @click="handleEditDictValue({ key_id: dictKey.id })"
      >
        添加
      </Button>
    </template>

    <Row :gutter="15">
      <Col :span="6">
        <Input
          v-model:value="query.label"
          :allow-clear="true"
          placeholder="数据名称"
          @keyup.enter="handleReload({ current: 1, pageSize: query.pageSize })"
        />
      </Col>
      <Col :span="6">
        <Select
          v-model:value="query.status"
          :allow-clear="true"
          class="w-full"
          placeholder="数据状态"
        >
          <SelectOption :value="1">启用</SelectOption>
          <SelectOption :value="2">禁用</SelectOption>
        </Select>
      </Col>
      <Col :span="6">
        <Button
          type="primary"
          @click="handleReload({ current: 1, pageSize: query.pageSize })"
        >
          搜索
        </Button>
      </Col>
    </Row>

    <Table
      :bordered="true"
      :columns="DictValueColumn"
      :data-source="dictValueList"
      :pagination="{
        current: query.page,
        pageSize: query.pageSize,
        total: dictValueTotal,
      }"
      class="mt-[15px]"
      size="small"
      @change="handleReload"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'status'">
          <span v-if="record.status === 1" class="text-primary">启用</span>
          <span v-if="record.status === 2" class="text-destructive">禁用</span>
        </template>

        <template v-if="column.dataIndex === 'default'">
          <span v-if="record.default === 1">是</span>
          <span v-if="record.default === 2">否</span>
        </template>

        <template v-if="column.dataIndex === 'action'">
          <div class="flex items-center justify-center text-[12px]">
            <div
              class="text-primary"
              v-access:code="AuthCode.Update"
              @click="handleEditDictValue(record)"
            >
              编辑
            </div>
            <div
              class="text-destructive ml-[15px]"
              v-access:code="AuthCode.Delete"
              @click="showConfirm"
            >
              删除
            </div>
          </div>
        </template>
      </template>
    </Table>

    <ValueModal @reload="getDictValueList" />
  </Card>
</template>
