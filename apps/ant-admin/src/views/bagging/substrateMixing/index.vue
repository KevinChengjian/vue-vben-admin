<script lang="ts" setup>
import type { ListItem } from './type';

import { nextTick } from 'vue';
import { useRoute } from 'vue-router';

import { Page, useVbenModal } from '@vben/common-ui';
import { useTabs } from '@vben/hooks';

import { Button, Space } from 'ant-design-vue';

import { useDelete, useTable } from '#/hooks';
import { format } from '#/utils/money';

import { AuthCode, deleteApi, listApi } from './api';
import { TableColumn } from './columns';
import detail from './detail.vue';
import MaterialStoreModal from './storeModal.vue';

const route = useRoute();
let formulaId: any;
if (route?.query?.formula_id) {
  formulaId = Number.parseInt(route?.query?.formula_id as any);
}
const { setTabTitle } = useTabs();
nextTick(() => {
  if (!route.query?.title) return;
  setTabTitle(`${route.query?.title}-拌料记录`);
});

const [Grid, gridApi] = useTable({
  colums: TableColumn,
  api: listApi,
  searhcSchema: [
    {
      component: 'Input',
      fieldName: 'make_bag_sn',
      label: '制包编号',
      defaultValue: route?.query?.make_bag_sn || undefined,
      componentProps: {
        allowClear: true,
        placeholder: '请输入制包编号',
      },
    },
    {
      component: 'FormulaSelect',
      fieldName: 'formula_id',
      defaultValue: formulaId,
      label: '制包配方',
      componentProps: {
        class: 'w-full',
        showSearch: true,
        allowClear: true,
        placeholder: '请选择制包配方',
      },
    },
    {
      component: 'RangePicker',
      fieldName: 'make_at',
      label: '制包日期',
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

// 详情
const [DetailModal, detailModalApi] = useVbenModal({
  connectedComponent: detail,
});
const handleDetail = (row: any) => {
  detailModalApi.setData(row).open();
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
          <div class="text-primary cursor-pointer" @click="handleDetail(row)">
            详情
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
    <DetailModal />
  </Page>
</template>
