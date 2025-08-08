<script lang="ts" setup>
import type { ListItem } from './type';

import { computed, onMounted, ref } from 'vue';

import { Page, useVbenModal } from '@vben/common-ui';
import { downloadFileFromUrl } from '@vben/utils';

import { Button, DatePicker, Space } from 'ant-design-vue';
import dayjs, { Dayjs } from 'dayjs';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { useDelete } from '#/hooks';

import { AuthCode, deleteApi, exportApi, listApi } from './api';
import BatchFormModal from './batchModal.vue';
import { TableColumn } from './columns';
import StoreFormModal from './storeModal.vue';

onMounted(() => {
  month.value = dayjs();
});

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
          return await listApi({
            plan_at: month.value?.format('YYYY-MM'),
          });
        },
      },
    },
    showOverflow: true,
  },
});

// 日期选择
const month = ref<Dayjs>();
const title = computed(() => {
  return month.value?.format('YYYY年M月');
});
const handleMonth = () => {
  gridApi.reload();
};

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

// 批量计划
const [BatchStoreModal, batchStoreModalApi] = useVbenModal({
  connectedComponent: BatchFormModal,
});
const handleBatchStore = () => {
  batchStoreModalApi.open();
};

// 删除
const { destory } = useDelete<ListItem>({
  api: deleteApi,
  callback: () => {
    gridApi.reload();
  },
});

// 导出数据
const handleExport = async () => {
  try {
    const resp = await exportApi({ plan_at: month.value?.format('YYYY-MM') });
    downloadFileFromUrl({ source: resp.url, target: '_self' });
  } catch {}
};
</script>

<template>
  <Page class="h-full">
    <Grid>
      <template #table-title>
        <div class="flex w-full items-center justify-between pt-[10px]">
          <div class="flex w-[80px]"></div>
          <div class="text-[22px]">制种计划（{{ title }}）</div>
          <div class="w-[80px]"></div>
        </div>
        <div class="w-full items-center">
          <DatePicker
            format="YYYY年MM月"
            class="w-[200px] flex-1"
            v-model:value="month"
            picker="month"
            :allow-clear="false"
            @change="handleMonth"
          />
          <Button
            type="primary"
            class="ml-[15px]"
            v-access:code="AuthCode.Plan"
            @click="handleBatchStore"
          >
            批量新增
          </Button>

          <Button
            type="primary"
            class="ml-[15px]"
            v-access:code="AuthCode.Create"
            @click="handleStore()"
          >
            新增计划
          </Button>

          <Button
            type="primary"
            class="ml-[15px]"
            @click="handleExport()"
            v-access:code="AuthCode.Export"
          >
            导出数据
          </Button>
        </div>
      </template>

      <template #action="{ row }">
        <Space :size="15">
          <div
            class="text-primary cursor-pointer"
            v-access:code="AuthCode.Update"
            @click="handleStore(row, true)"
            v-if="row?.id > 0"
          >
            编辑
          </div>
          <div
            class="text-destructive cursor-pointer"
            v-access:code="AuthCode.Delete"
            @click="destory({ id: row.id })"
            v-if="row?.id > 0"
          >
            删除
          </div>
        </Space>
      </template>
    </Grid>

    <StoreModal @reload="gridApi.reload" />
    <BatchStoreModal @reload="gridApi.reload" />
  </Page>
</template>
