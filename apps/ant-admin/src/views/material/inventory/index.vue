<script lang="ts" setup>
import { Page, useVbenModal } from '@vben/common-ui';

import { Button, message } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';

import { AuthCode, listApi, refreshApi } from './api';
import { TableColumn } from './columns';
import StoreFormModal from './storeModal.vue';

const [Grid, gridApi] = useVbenVxeGrid({
  gridOptions: {
    columns: TableColumn,
    border: true,
    editConfig: {
      trigger: 'dblclick',
      mode: 'row',
    },
    pagerConfig: {
      enabled: false,
    },
    proxyConfig: {
      ajax: {
        query: async () => {
          return await listApi();
        },
      },
    },
    showOverflow: true,
  },
});

// 添加|编辑
const [StoreModal, storeModalApi] = useVbenModal({
  connectedComponent: StoreFormModal,
});

const handleStore = () => {
  storeModalApi.setData({ list: gridApi.grid.getData() }).open();
};

const handleRefresh = async () => {
  try {
    await refreshApi();
    message.success('提交成功，库存统计中请稍后刷新页面查看');
    gridApi.reload();
  } catch {}
};
</script>

<template>
  <Page class="h-full">
    <Grid>
      <template #table-title>
        <div
          class="flex w-full items-center justify-between pb-[15px] pt-[10px]"
        >
          <div class="w-[200px]">
            <Button
              type="primary"
              v-access:code="AuthCode.Create"
              @click="handleStore"
            >
              库存盘点
            </Button>

            <Button type="primary" class="ml-[14px]" @click="handleRefresh">
              刷新库存
            </Button>
          </div>
          <div class="text-[22px]">原料库存统计</div>
          <div class="w-[200px]"></div>
        </div>
      </template>
    </Grid>

    <StoreModal @reload="gridApi.reload" />
  </Page>
</template>
