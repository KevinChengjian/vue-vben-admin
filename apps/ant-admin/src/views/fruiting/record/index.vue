<script lang="ts" setup>
import type { ListItem } from './type';

import { Page, useVbenDrawer, useVbenModal } from '@vben/common-ui';

import { Space } from 'ant-design-vue';

import { Dict } from '#/api';
import { useDelete, useTable } from '#/hooks';
import { format } from '#/utils/money';

import { AuthCode, deleteApi, listApi } from './api';
import ClearStoreModal from './clearModal.vue';
import { TableColumn } from './columns';
import Detail from './detail.vue';
import MaterialStoreModal from './storeModal.vue';

const [Grid, gridApi] = useTable({
  colums: TableColumn,
  api: listApi,
  searhcSchema: [
    {
      component: 'Input',
      fieldName: 'fruiting_sn',
      label: '出菇编号',
      componentProps: {
        allowClear: true,
        placeholder: '请输入出菇编号',
      },
    },
    {
      component: 'Input',
      fieldName: 'fruiting_sn',
      label: '菌包编号',
      componentProps: {
        allowClear: true,
        placeholder: '请输入菌包编号',
      },
    },
    {
      component: 'DictSelect',
      fieldName: 'room_id',
      label: '出菇房',
      componentProps: {
        class: 'w-full',
        showSearch: true,
        allowClear: true,
        placeholder: '请选择出菇房',
        code: Dict.KeyEnum.FRUITING_HOUSE,
      },
    },
    {
      component: 'DictSelect',
      fieldName: 'dev_id',
      label: '技术员',
      componentProps: {
        class: 'w-full',
        showSearch: true,
        allowClear: true,
        placeholder: '请选择技术员',
        code: Dict.KeyEnum.SYS_USER,
      },
    },
    {
      component: 'RangePicker',
      fieldName: 'put_at',
      label: '上架日期',
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
const [DetailDrawer, detailDrawerApi] = useVbenDrawer({
  connectedComponent: Detail,
});
const handleDetail = (row: ListItem) => {
  detailDrawerApi.setData(row).open();
};

// 下架
const [ClearModal, clearModalApi] = useVbenModal({
  connectedComponent: ClearStoreModal,
});

const handleClear = (row: any) => {
  clearModalApi.setData({ record: row }).open();
};
</script>

<template>
  <Page class="h-full">
    <Grid>
      <template #toolbar-actions>
        <!-- <Button
          type="primary"
          v-access:code="AuthCode.Create"
          @click="handleStore"
        >
          新增记录
        </Button> -->
      </template>

      <template #price="{ row }">
        {{ format(row.price) }}
      </template>

      <template #action="{ row }">
        <Space :size="15">
          <div
            class="text-primary cursor-pointer"
            v-access:code="AuthCode.Detail"
            @click="handleDetail(row)"
          >
            详情
          </div>

          <div
            class="text-primary cursor-pointer"
            v-access:code="AuthCode.Detail"
            @click="handleClear(row)"
          >
            下架
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
    <DetailDrawer />
    <ClearModal />
  </Page>
</template>
