<script lang="ts" setup>
import type { FormulaItem } from './type';

import { Page, useVbenModal } from '@vben/common-ui';

import { Button, Space } from 'ant-design-vue';

import { Dict } from '#/api';
import { useDelete, useTable } from '#/hooks';

import { AuthCode, deleteApi, listApi } from './api';
import { TableColumn } from './columns';
import FormulaStoreModal from './storeModal.vue';

const [Grid, gridApi] = useTable({
  colums: TableColumn,
  api: listApi,
  searhcSchema: [
    {
      component: 'Input',
      fieldName: 'name',
      label: '姓名',
      componentProps: {
        allowClear: true,
        placeholder: '请输入姓名',
      },
    },
    {
      component: 'DictSelect',
      fieldName: 'creator_id',
      label: '创建人员',
      componentProps: {
        class: 'w-full',
        showSearch: true,
        allowClear: true,
        placeholder: '请选择创建人员',
        code: Dict.KeyEnum.SYS_USER,
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
          新增人员
        </Button>
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
