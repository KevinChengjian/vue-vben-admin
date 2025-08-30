<script lang="ts" setup>
import type { ListItem } from './type';

import { Page, useVbenModal } from '@vben/common-ui';

import { Button, Space } from 'ant-design-vue';

import { Dict } from '#/api';
import { useDelete, useTable } from '#/hooks';
import { format } from '#/utils/money';

import { AuthCode, deleteApi, listApi } from './api';
import { TableColumn } from './columns';
import Detail from './detail.vue';
import MaterialStoreModal from './storeModal.vue';

const [Grid, gridApi] = useTable({
  colums: TableColumn,
  api: listApi,
  searhcSchema: [
    {
      component: 'DictSelect',
      fieldName: 'user_id',
      label: '检测人员',
      componentProps: {
        class: 'w-full',
        showSearch: true,
        placeholder: '请选择检测人员',
        code: Dict.KeyEnum.SYS_USER,
      },
    },
    {
      component: 'RangePicker',
      fieldName: 'check_at',
      label: '检测日期',
      componentProps: {
        valueFormat: 'YYYY-MM-DD',
        allowClear: true,
        placeholder: ['开始日期', '结束日期'],
      },
    },
  ],
});

// 添加|编辑
const [StoreModal, storeModalApi] = useVbenModal({
  connectedComponent: MaterialStoreModal,
});

const handleStore = (item: any = {}, edit: boolean = false) => {
  storeModalApi.setData({ isEdit: edit, record: item }).open();
};

// 删除
const { destory } = useDelete<ListItem>({
  api: deleteApi,
  callback: () => {
    gridApi.reload();
  },
});

// 详情
const [DetailModal, detailModalApi] = useVbenModal({
  connectedComponent: Detail,
});
const handleDetail = (row: ListItem) => {
  detailModalApi.setData(row).open();
};
</script>

<template>
  <Page class="h-full">
    <Grid>
      <template #toolbar-actions>
        <Button
          type="primary"
          v-access:code="AuthCode.Create"
          @click="handleStore"
        >
          新增记录
        </Button>
      </template>

      <template #price="{ row }">
        {{ format(row.price) }}
      </template>

      <template #action="{ row }">
        <Space :size="15">
          <div class="text-primary cursor-pointer" @click="handleDetail(row)">
            详情
          </div>
          <div
            class="text-primary cursor-pointer"
            v-access:code="AuthCode.Update"
            @click="handleStore(row, true)"
          >
            编辑
          </div>
          <div
            class="text-destructive cursor-pointer"
            v-access:code="AuthCode.Delete"
            @click="destory({ id: row.id })"
          >
            删除
          </div>
        </Space>
      </template>
    </Grid>

    <StoreModal @reload="gridApi.reload" />
    <DetailModal />
  </Page>
</template>
