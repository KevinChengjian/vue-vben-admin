<script lang="ts" setup>
import type { ListItem } from './type';

import { useRouter } from 'vue-router';

import { Page, useVbenModal } from '@vben/common-ui';

import { Button, Space } from 'ant-design-vue';

import { useDelete, useTable } from '#/hooks';

import { AuthCode, deleteApi, listApi } from './api';
import { TableColumn } from './columns';
import MaterialStoreModal from './storeModal.vue';

const [Grid, gridApi] = useTable({
  colums: TableColumn,
  api: listApi,
  searhcSchema: [
    {
      component: 'Input',
      fieldName: 'fruiting_sn',
      label: '出菇编号',
      componentProps: {
        allowClear: true,
        placeholder: '请输入出菇编号',
      },
    },
    {
      component: 'Input',
      fieldName: 'name',
      label: '采摘员',
      componentProps: {
        class: 'w-full',
        allowClear: true,
        placeholder: '请输入采摘员',
      },
    },
    {
      component: 'RangePicker',
      fieldName: 'pick_at',
      label: '采摘日期',
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
  storeModalApi
    .setData({
      isEdit: edit,
      record: item,
    })
    .open();
};

// 删除
const { destory } = useDelete<ListItem>({
  api: deleteApi,
  callback: () => {
    gridApi.reload();
  },
});

const router = useRouter();
const handleFruiting = (item: any) => {
  router.push({
    path: '/fruiting/record',
    query: {
      fruiting_sn: item.fruiting_sn,
      title: item.fruiting_sn,
    },
  });
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

      <template #fruiting_sn="{ row }">
        <div class="text-primary" @click="handleFruiting(row)">
          {{ row.fruiting_sn }}
        </div>
      </template>

      <template #action="{ row }">
        <Space :size="15">
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
  </Page>
</template>
