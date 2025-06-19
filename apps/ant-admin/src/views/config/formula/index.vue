<script lang="ts" setup>
import type { FormulaItem } from './type';

import { Page, useVbenModal } from '@vben/common-ui';

import { Button, Space } from 'ant-design-vue';

import { Dict } from '#/api';
import { useDelete, useTable } from '#/hooks';

import { AuthCode, formulaDeleteApi, formulaListApi } from './api';
import { TableColumn } from './columns';
import FormulaDetailModal from './detailModal.vue';
import FormulaStoreModal from './storeModal.vue';

const [Grid, gridApi] = useTable({
  colums: TableColumn,
  api: formulaListApi,
  searhcSchema: [
    {
      component: 'Input',
      fieldName: 'name',
      label: '配方名称',
      componentProps: {
        allowClear: true,
        placeholder: '请输入配方名称',
      },
    },
    {
      component: 'DictSelect',
      fieldName: 'status',
      label: '配方状态',
      componentProps: {
        allowClear: true,
        placeholder: '请选择配方状态',
        code: Dict.KeyEnum.STATUS,
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
        placeholder: '请输入创建人员',
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
  api: formulaDeleteApi,
  callback: () => {
    gridApi.reload();
  },
});

// 详情
const [DetailModal, detailModalApi] = useVbenModal({
  connectedComponent: FormulaDetailModal,
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
          新增配方
        </Button>
      </template>

      <template #action="{ row }">
        <Space :size="15">
          <div
            class="text-primary cursor-pointer"
            @click="handleDetail(row)"
            v-access:code="AuthCode.Detail"
          >
            详情
          </div>

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
    <DetailModal />
  </Page>
</template>
