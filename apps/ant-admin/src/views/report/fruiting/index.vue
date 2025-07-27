<script lang="ts" setup>
import { computed, nextTick, onMounted, ref } from 'vue';

import { Page } from '@vben/common-ui';

import { DatePicker } from 'ant-design-vue';
import dayjs, { Dayjs } from 'dayjs';

import { useVbenVxeGrid } from '#/adapter/vxe-table';

import { listApi } from './api';

onMounted(() => {
  month.value = dayjs();
  getTableData();
});

// 日期选择
const month = ref<Dayjs>();
const title = computed(() => {
  return month.value?.format('YYYY年M月');
});
const handleMonth = () => {
  getTableData();
};

const gridOptions: any = {
  columns: [],
  border: true,
  editConfig: {
    trigger: 'dblclick',
    mode: 'row',
  },
  pagerConfig: {
    enabled: false,
  },
  proxyConfig: {},
  showOverflow: true,
  showFooter: true,
  footerData: [],
};

const [Grid, gridApi] = useVbenVxeGrid({
  gridOptions,
});

const tableData = ref<any>([]);
const tableHeader = ref<any>([]);
const getTableData = async () => {
  const result = await listApi({ month: month.value?.format('YYYY-MM') });
  tableData.value = result?.list || [];
  tableHeader.value = result?.header || [];

  nextTick(async () => {
    gridApi.grid.reloadColumn(result?.header || []);
    gridApi.grid.reloadData(result?.list || []);
    setTimeout(() => {
      gridApi.grid.setMergeCells(result?.mergeCall || []);
    }, 500);
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
          <div class="flex w-[240px]">
            <DatePicker
              format="YYYY年MM月"
              class="w-full flex-1"
              v-model:value="month"
              picker="month"
              :allow-clear="false"
              @change="handleMonth"
            />
          </div>
          <div class="text-[22px]">出菇统计（{{ title }}）</div>
          <div class="w-[240px]"></div>
        </div>
      </template>
    </Grid>
  </Page>
</template>
