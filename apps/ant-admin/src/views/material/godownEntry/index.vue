<script lang="ts" setup>
import type { MaterialInItem } from './type';

import { Page, useVbenModal } from '@vben/common-ui';

import { Button, Space } from 'ant-design-vue';

import { Dict } from '#/api';
import { useDelete, useTable } from '#/hooks';
import { format } from '#/utils/money';

import { AuthCode, materialInDeleteApi, materialInListApi } from './api';
import BatchStoreModal from './batchModal.vue';
import { TableColumn } from './columns';
import MaterialStoreModal from './storeModal.vue';

const [Grid, gridApi] = useTable({
  colums: TableColumn,
  api: materialInListApi,
  searhcSchema: [
    {
      component: 'Input',
      fieldName: 'material_sn',
      label: '原料编号',
      componentProps: {
        allowClear: true,
        placeholder: '请输入原料编号',
      },
    },
    {
      component: 'DictSelect',
      fieldName: 'material_id',
      label: '原料名称',
      componentProps: {
        class: 'w-full',
        showSearch: true,
        allowClear: true,
        placeholder: '请选择原料名称',
        code: Dict.KeyEnum.MATERIAL,
      },
    },
    {
      component: 'DictSelect',
      fieldName: 'user_id',
      label: '采购人员',
      componentProps: {
        class: 'w-full',
        showSearch: true,
        allowClear: true,
        placeholder: '请输入采购人员',
        code: Dict.KeyEnum.SYS_USER,
      },
    },
    {
      component: 'Input',
      fieldName: 'manufacturer',
      label: '购置厂家',
      componentProps: {
        allowClear: true,
        placeholder: '请输入购置厂家',
      },
    },
    {
      component: 'RangePicker',
      fieldName: 'created_at',
      label: '购置日期',
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

// 批量添加
const [BatchModal, batchModalApi] = useVbenModal({
  connectedComponent: BatchStoreModal,
});
const handleBatchStore = () => {
  batchModalApi.open();
};

// 删除
const { destory } = useDelete<MaterialInItem>({
  api: materialInDeleteApi,
  callback: () => {
    gridApi.reload();
  },
});
</script>

<template>
  <Page class="h-full">
    <Grid>
      <template #toolbar-actions>
        <Button
          type="primary"
          v-access:code="AuthCode.BatchCreate"
          @click="handleBatchStore"
          class="mr-[12px]"
        >
          批量新增
        </Button>
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
    <BatchModal @reload="gridApi.reload" />
  </Page>
</template>
