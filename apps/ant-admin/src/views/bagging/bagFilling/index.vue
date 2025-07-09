<script lang="ts" setup>
import type { ListItem } from './type';

import { Page, useVbenModal } from '@vben/common-ui';

import { Button, Space } from 'ant-design-vue';

import { Dict } from '#/api';
import { useDelete, useTable } from '#/hooks';
import { format } from '#/utils/money';

import { AuthCode, deleteApi, listApi } from './api';
import { TableColumn } from './columns';
import MaterialStoreModal from './storeModal.vue';

const [Grid, gridApi] = useTable({
  colums: TableColumn,
  api: listApi,
  searhcSchema: [
    {
      component: 'Input',
      fieldName: 'make_bag_sn',
      label: '制包编号',
      componentProps: {
        allowClear: true,
        placeholder: '请输入制包编号',
      },
    },
    {
      component: 'DictSelect',
      fieldName: 'machine_id',
      label: '装袋机器',
      componentProps: {
        class: 'w-full',
        showSearch: true,
        allowClear: true,
        placeholder: '请选择装袋机器',
        code: Dict.KeyEnum.BAG_MACHINE,
      },
    },
    {
      component: 'RangePicker',
      fieldName: 'created_at',
      label: '装袋时间',
      componentProps: {
        valueFormat: 'YYYY-MM-DD',
        allowClear: true,
        placeholder: ['开始时间', '结束时间'],
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
