<script lang="ts" setup>
import type { ListItem } from './type';

import { nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { Page, useVbenModal } from '@vben/common-ui';
import { useTabs } from '@vben/hooks';

import { Button, Space } from 'ant-design-vue';

import { Dict } from '#/api';
import { useDelete, useTable } from '#/hooks';
import { format } from '#/utils/money';

import { AuthCode, deleteApi, listApi } from './api';
import { TableColumn } from './columns';
import MaterialStoreModal from './storeModal.vue';

const route = useRoute();
const { setTabTitle } = useTabs();
nextTick(() => {
  if (!route.query?.title) return;
  setTabTitle(`${route.query?.title}-菌种记录`);
});
const [Grid, gridApi] = useTable({
  colums: TableColumn,
  api: listApi,
  searhcSchema: [
    // {
    //   component: 'Input',
    //   fieldName: 'mb_sn',
    //   label: '菌包编号',
    //   componentProps: {
    //     allowClear: true,
    //     placeholder: '请输入菌包编号',
    //   },
    // },
    {
      component: 'Input',
      fieldName: 'strain_sn',
      label: '菌种编号',
      defaultValue: route?.query?.strain_sn || undefined,
      componentProps: {
        allowClear: true,
        placeholder: '请输入菌种编号',
      },
    },
    {
      component: 'DictSelect',
      fieldName: 'can_no',
      label: '罐号',
      componentProps: {
        class: 'w-full',
        showSearch: true,
        allowClear: true,
        placeholder: '请选择罐号',
        code: Dict.KeyEnum.STRAIN_CAN_NO,
      },
    },
    {
      component: 'DictSelect',
      fieldName: 'variety_id',
      label: '品种',
      componentProps: {
        class: 'w-full',
        showSearch: true,
        allowClear: true,
        placeholder: '请选择品种',
        code: Dict.KeyEnum.STRAIN_CATEGORY,
      },
    },
    {
      component: 'RangePicker',
      fieldName: 'cultivate_at',
      label: '培养日期',
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
const handleDayReport = (row: any) => {
  router.push({
    path: '/vaccination/dayReport',
    query: {
      strain_sn: row.strain_sn,
      can_no: row.can_no,
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

      <template #price="{ row }">
        {{ format(row.price) }}
      </template>

      <template #action="{ row }">
        <Space :size="15">
          <div
            class="text-primary cursor-pointer"
            v-access:code="AuthCode.DayReport"
            @click="handleDayReport(row)"
          >
            日报表
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
  </Page>
</template>
