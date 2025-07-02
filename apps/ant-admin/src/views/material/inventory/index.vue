<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';

import { Page, useVbenModal } from '@vben/common-ui';

import { DatePicker, Space } from 'ant-design-vue';
import dayjs, { Dayjs } from 'dayjs';

import { useVbenVxeGrid } from '#/adapter/vxe-table';

import { AuthCode, listApi } from './api';
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
          <div class="text-[22px]">原料库存统计（{{ title }}）</div>
          <div class="w-[200px]"></div>
        </div>
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
