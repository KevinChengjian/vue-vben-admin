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
  Space,
  Table,
} from 'ant-design-vue';

import { Dict } from '#/api';
import DictLabel from '#/components/dict/dict-label.vue';
import { Status } from '#/enums/StatusEnum';
import { useDelete } from '#/hooks';

import {
  AuthCode,
  dictionaryValueDeleteApi,
  dictionaryValueListApi,
} from './api';
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

const { destory } = useDelete({
  api: dictionaryValueDeleteApi,
  callback: () => {
    getDictValueList();
  },
});
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
        <DictLabel
          v-if="column.dataIndex === 'status'"
          :code="Dict.KeyEnum.STATUS"
          :value="record.status"
        />

        <template v-if="column.dataIndex === 'default'">
          <span v-if="record.default === 1">是</span>
          <span v-if="record.default === 2">否</span>
        </template>

        <template v-if="column.dataIndex === 'action'">
          <Space :size="15">
            <div
              class="text-primary cursor-pointer"
              v-access:code="AuthCode.Update"
              v-if="record.fixed === Status.Disable"
              @click="handleEditDictValue(record)"
            >
              编辑
            </div>
            <div
              class="text-destructive cursor-pointer"
              v-access:code="AuthCode.Delete"
              v-if="record.fixed === Status.Disable"
              @click="destory({ id: record.id })"
            >
              删除
            </div>
          </Space>
        </template>
      </template>
    </Table>

    <ValueModal @reload="getDictValueList" />
  </Card>
</template>
