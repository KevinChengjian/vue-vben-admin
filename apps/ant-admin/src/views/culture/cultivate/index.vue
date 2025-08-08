<script lang="ts" setup>
import type { ListItem } from './type';

import { nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { Page, useVbenDrawer, useVbenModal } from '@vben/common-ui';
import { useTabs } from '@vben/hooks';

import { Button, Space } from 'ant-design-vue';

import { Dict } from '#/api';
import { DeviceState } from '#/components';
import { useDelete, useTable } from '#/hooks';

import { AuthCode, deleteApi, listApi } from './api';
import { TableColumn } from './columns';
import Detail from './detail.vue';
import OutStoreModal from './outModal.vue';
import MaterialStoreModal from './storeModal.vue';

const route = useRoute();
const { setTabTitle } = useTabs();
nextTick(() => {
  if (!route.query?.title) return;
  setTabTitle(`${route.query?.title}-培养记录`);
});

const [Grid, gridApi] = useTable({
  colums: TableColumn,
  api: listApi,
  searhcSchema: [
    {
      component: 'Input',
      fieldName: 'mb_sn',
      label: '菌包编号',
      defaultValue: route?.query?.mb_sn || undefined,
      componentProps: {
        allowClear: true,
        placeholder: '请输入菌包编号',
      },
    },
    {
      component: 'FormulaSelect',
      fieldName: 'formula_id',
      label: '配方',
      componentProps: {
        class: 'w-full',
        showSearch: true,
        allowClear: true,
        placeholder: '请选择配方',
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
      fieldName: 'warehouse_id',
      label: '养菌房',
      defaultValue: route?.query?.warehouse_id || undefined,
      componentProps: {
        class: 'w-full',
        showSearch: true,
        allowClear: true,
        placeholder: '请选择养菌房',
        code: Dict.KeyEnum.STRAIN_HOUSE,
      },
    },
    {
      component: 'RangePicker',
      fieldName: 'put_at',
      label: '入库日期',
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

// 巡查记录
const router = useRouter();
const handleRecord = (row: any) => {
  router.push({
    path: '/culture/patrol',
    query: {
      mb_sn: row.mb_sn,
      warehouse_id: row.warehouse_id,
    },
  });
};

// 详情
const [DetailDrawer, detailDrawerApi] = useVbenDrawer({
  connectedComponent: Detail,
});
const handleDetail = (row: ListItem) => {
  detailDrawerApi.setData(row).open();
};

const [OutModal, outModalApi] = useVbenModal({
  connectedComponent: OutStoreModal,
  onClosed: () => {
    gridApi.reload();
  },
});

const handleOut = (item: any) => {
  outModalApi.setData(item).open();
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

      <template #mb_sn="{ row }">
        <div class="text-primary" @click="handleDetail(row)">
          {{ row.mb_sn }}
        </div>
      </template>

      <template #device_state="{ row }">
        <DeviceState :state="row.device_state" :sh-id="row.warehouse_id" />
      </template>

      <template #action="{ row }">
        <Space :size="15">
          <div
            class="text-primary cursor-pointer"
            v-access:code="AuthCode.Patrol"
            @click="handleRecord(row)"
          >
            巡查
          </div>
          <div
            class="text-primary cursor-pointer"
            v-access:code="AuthCode.Update"
            @click="handleStore(row, true)"
            v-if="row.out_over === 2"
          >
            编辑
          </div>
          <div
            class="text-primary cursor-pointer"
            v-access:code="AuthCode.OutList"
            @click="handleOut(row)"
          >
            出库
          </div>
          <div
            class="text-destructive cursor-pointer"
            v-access:code="AuthCode.Delete"
            @click="destory({ id: row.id })"
            v-if="row.out_over === 2"
          >
            删除
          </div>
        </Space>
      </template>
    </Grid>

    <StoreModal @reload="gridApi.reload" />
    <OutModal @reload="gridApi.reload" />
    <DetailDrawer />
  </Page>
</template>
