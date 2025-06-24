<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';

import { Page } from '@vben/common-ui';

import { DatePicker, Space } from 'ant-design-vue';
import dayjs, { Dayjs } from 'dayjs';

import { useVbenVxeGrid } from '#/adapter/vxe-table';

import { AuthCode, listApi } from './api';
import { TableColumn } from './columns';

onMounted(() => {
  month.value = dayjs();
});

const [Grid, gridApi] = useVbenVxeGrid({
  gridOptions: {
    columns: TableColumn,
    border: true,
    editConfig: {
      mode: 'row',
      trigger: 'click',
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
</script>

<template>
  <Page class="h-full">
    <Grid>
      <template #table-title>
        <div
          class="flex w-full items-center justify-between pb-[15px] pt-[10px]"
        >
          <div class="w-[200px]">
            <DatePicker
              format="YYYY年MM月"
              class="w-full"
              v-model:value="month"
              picker="month"
              :allow-clear="false"
              @change="handleMonth"
            />
          </div>
          <div class="text-[22px]">制包生产计划（{{ title }}）</div>
          <div class="w-[200px]"></div>
        </div>
      </template>

      <template #action="{ row }">
        <Space :size="15">
          <div
            class="text-primary cursor-pointer"
            v-access:code="AuthCode.Update"
          >
            编辑
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
  </Page>
</template>
