<script lang="ts" setup>
import type { Dayjs } from 'dayjs';

import { ref } from 'vue';

import { Page, useVbenModal } from '@vben/common-ui';
import { downloadFileFromUrl } from '@vben/utils';

import { Button, RangePicker } from 'ant-design-vue';
import dayjs from 'dayjs';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import CustomImport from '#/components/import/custom-import.vue';

import { AuthCode, listApi, materialDownloadApi } from './api';
import { TableColumn } from './columns';
import StoreFormModal from './storeModal.vue';

type RangeValue = [Dayjs, Dayjs];
const month = ref<RangeValue>([dayjs(), dayjs()]);

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
            startMonth: month.value[0].format('YYYY-MM'),
            endMonth: month.value[1].format('YYYY-MM'),
          });
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

const handleMonth = () => {
  gridApi.reload();
};

const handleDownload = async () => {
  try {
    const resp = await materialDownloadApi();
    downloadFileFromUrl({ source: resp.url, target: '_self' });
  } catch {}
};

// 导入库存盘点
const handleImport = () => {};
</script>

<template>
  <Page class="h-full">
    <Grid>
      <template #table-title>
        <div
          class="flex w-full items-center justify-center pb-[15px] pt-[10px]"
        >
          <div class="text-[22px]">原料库存统计</div>
        </div>
        <div class="w-full items-center">
          <RangePicker
            format="YYYY-MM"
            class="mr-[15px] w-[240px] flex-1"
            v-model:value="month"
            picker="month"
            :allow-clear="false"
            @change="handleMonth"
          />
          <Button
            type="primary"
            class="mr-[15px]"
            v-access:code="AuthCode.Create"
            @click="handleStore"
          >
            库存盘点
          </Button>

          <Button
            type="primary"
            class="mr-[15px]"
            v-access:code="AuthCode.Import"
            @click="handleDownload"
          >
            下载模板
          </Button>
          <CustomImport
            v-access:code="AuthCode.Import"
            url="/admin/material-inventory/import"
            @success="gridApi.reload"
          >
            <Button type="primary" @click="handleImport"> 盘库导入 </Button>
          </CustomImport>
        </div>
      </template>
    </Grid>

    <StoreModal @reload="gridApi.reload" />
  </Page>
</template>
