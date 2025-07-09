<script lang="ts" setup>
import type { FormulaItem } from './type';

import { Page, useVbenModal } from '@vben/common-ui';

import { Button, Space } from 'ant-design-vue';

import { Dict } from '#/api';
import { useDelete, useTable } from '#/hooks';

import { AuthCode, deviceDeleteApi, deviceListApi } from './api';
import { TableColumn } from './columns';
import FormulaStoreModal from './storeModal.vue';

const [Grid, gridApi] = useTable({
  colums: TableColumn,
  api: deviceListApi,
  pagerConfig: {
    enabled: false,
  },
  searhcSchema: [
    {
      component: 'Input',
      fieldName: 'name',
      label: '序列号',
      componentProps: {
        allowClear: true,
        placeholder: '请输入序列号',
      },
    },
    {
      component: 'DictSelect',
      fieldName: 'sh_id',
      label: '养菌房',
      componentProps: {
        allowClear: true,
        placeholder: '请选择养菌房',
        code: Dict.KeyEnum.STRAIN_HOUSE,
      },
    },
  ],
});

// 添加&编辑
const [StoreModal, storeModalApi] = useVbenModal({
  draggable: true,
  connectedComponent: FormulaStoreModal,
});

const handleStore = (item: any = {}, edit: boolean = false) => {
  storeModalApi.setData({ isEdit: edit, record: item }).open();
};

// 删除
const { destory } = useDelete<FormulaItem>({
  api: deviceDeleteApi,
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
          新增
        </Button>
      </template>
      <template #state="{ row }">
        <div v-if="row.state === 0">未知</div>
        <div v-if="row.state === 1" class="text-primary">已连接</div>
        <div v-if="row.state === 2" class="text-destructive">超时</div>
        <div v-if="row.state === 3" class="text-destructive">断开</div>
      </template>

      <template #action="{ row }">
        <Space :size="15">
          <div
            class="text-primary cursor-pointer"
            @click="handleStore(row, true)"
            v-access:code="AuthCode.Update"
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
