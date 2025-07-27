<script lang="ts" setup>
import { ref } from 'vue';

import { Page, useVbenModal } from '@vben/common-ui';

import { Button, Select } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import VcMbSnSelect from '#/components/serialNumber/vr-mb-sn-select.vue';

import { listApi } from './api';
import { TableColumn, TableColumnItem } from './columns';
import ChartModal from './storeModal.vue';

const dayStepList = ref<any>([
  { label: '1天', value: 1 },
  { label: '2天', value: 2 },
  { label: '3天', value: 3 },
  { label: '4天', value: 4 },
  { label: '5天', value: 5 },
  { label: '6天', value: 6 },
  { label: '7天', value: 7 },
  { label: '8天', value: 8 },
  { label: '9天', value: 9 },
  { label: '10天', value: 10 },
]);
const dayStep = ref<number>(3);
const mbSnList = ref<string[]>([]);
const tableData = ref<any>([]);
const handleChange = () => {
  getTableData();
};

const tableHeader = ref<any>([]);
const builderHeader = (name: string, pefix: string) => {
  const item = JSON.stringify(TableColumnItem);
  const text = item.replaceAll(/%s/gi, name);
  const result = text.replaceAll(/%c/gi, pefix);
  return JSON.parse(result);
};

const getTableData = async () => {
  const resp = await listApi({ sn: mbSnList.value, step: dayStep.value });
  tableData.value = resp?.list || [];
  let header: any = TableColumn || [];
  resp.sn.forEach((item, key) => {
    header = header?.concat(builderHeader(item, `C${key}`));
  });
  tableHeader.value = header;

  if (resp?.sn && resp?.sn.length > 0) {
    gridApi.grid.reloadColumn(header);
    gridApi.grid.reloadData(tableData.value);
  }
};

const [Grid, gridApi] = useVbenVxeGrid({
  gridOptions: {
    columns: tableHeader.value,
    border: true,
    editConfig: {
      trigger: 'dblclick',
      mode: 'row',
    },
    pagerConfig: {
      enabled: false,
    },
    showOverflow: true,
  },
});

// 添加|编辑
const [StoreModal] = useVbenModal({
  connectedComponent: ChartModal,
});

const handleShowChart = () => {
  getTableData();
  // storeModalApi.setData({}).open();
};
</script>

<template>
  <Page class="h-full">
    <Grid>
      <template #table-title>
        <div
          class="flex w-full items-center justify-between pb-[15px] pt-[10px]"
        >
          <div class="w-[10px]"></div>
          <div class="text-[22px]">养菌分析</div>
          <div class="w-[10px]"></div>
        </div>
        <div class="flex w-full items-start">
          <Select
            v-model:value="dayStep"
            :options="dayStepList"
            class="mr-[10px] w-[80px] flex-shrink-0"
            @change="handleChange"
          />
          <VcMbSnSelect
            mode="multiple"
            v-model:value="mbSnList"
            placeholder="请选择对比批次"
          />
          <Button
            type="primary"
            class="ml-[10px] flex-shrink-0"
            :disabled="!mbSnList || mbSnList.length === 0"
            @click="handleShowChart"
          >
            分析
          </Button>
        </div>
      </template>
    </Grid>

    <StoreModal />
  </Page>
</template>
