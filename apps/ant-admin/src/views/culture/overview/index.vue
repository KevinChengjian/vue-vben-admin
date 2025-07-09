<script lang="ts" setup>
import { useRouter } from 'vue-router';

import { Page, useVbenModal } from '@vben/common-ui';

import { Popover, Space } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';

import { AuthCode, listApi } from './api';
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

const handleStore = (item: any = {}, edit: boolean = false) => {
  storeModalApi
    .setData({
      isEdit: edit,
      record: item,
    })
    .open();
};

const router = useRouter();
const handleRecord = (row: any) => {
  router.push({
    path: '/culture/cultivate',
    query: {
      title: row.label,
      warehouse_id: row.value,
    },
  });
};
</script>

<template>
  <Page class="h-full">
    <Grid>
      <template #table-title>
        <div
          class="flex w-full items-center justify-between pb-[15px] pt-[10px]"
        >
          <div class="w-[200px]"></div>
          <div class="text-[22px]">养菌总览</div>
          <div class="w-[200px]"></div>
        </div>
      </template>

      <template #label="{ row }">
        <div class="text-primary cursor-pointer" @click="handleRecord(row)">
          {{ row.label }}
        </div>
      </template>

      <template #mb_sn_num="{ row }">
        <Popover>
          <template #content>
            <p v-for="(sn, si) in row.mb_sn_arr" :key="si">
              {{ sn }}
            </p>
          </template>

          <div class="text-primary cursor-pointer">
            {{ row.mb_sn_num }}
          </div>
        </Popover>
      </template>

      <template #action="{ row }">
        <Space :size="15">
          <div
            class="text-primary cursor-pointer"
            v-access:code="AuthCode.Update"
            @click="handleStore(row, !!row.id)"
          >
            {{ row.id ? '编辑' : '添加' }}
          </div>
          <div
            class="text-destructive cursor-pointer"
            v-access:code="AuthCode.Delete"
          >
            删除
          </div>
        </Space>
      </template>
    </Grid>

    <StoreModal @reload="gridApi.reload" />
  </Page>
</template>
