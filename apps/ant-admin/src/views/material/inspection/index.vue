<script lang="ts" setup>
import type { MaterialInItem } from './type';

import { Page, useVbenModal } from '@vben/common-ui';

import { Button, Space } from 'ant-design-vue';

import { Dict } from '#/api';
import { useDelete, useTable } from '#/hooks';
import { format } from '#/utils/money';

import { AuthCode, deleteApi, listApi } from './api';
import { TableColumn } from './columns';
import UserStoreModal from './storeModal.vue';

const [Grid, gridApi] = useTable({
  colums: TableColumn,
  api: listApi,
  searhcSchema: [
    {
      component: 'MaterialSnSelect',
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
      label: '检测人员',
      componentProps: {
        class: 'w-full',
        showSearch: true,
        allowClear: true,
        placeholder: '请选择检测人员',
        code: Dict.KeyEnum.SYS_USER,
      },
    },
    {
      component: 'DictSelect',
      fieldName: 'machine_id',
      label: '检测机器',
      componentProps: {
        class: 'w-full',
        showSearch: true,
        allowClear: true,
        placeholder: '请选择检测机器',
        code: Dict.KeyEnum.MATERIAL_MACHINE,
      },
    },
    {
      component: 'RangePicker',
      fieldName: 'detection_at',
      label: '检测时间',
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
  connectedComponent: UserStoreModal,
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
const { destory } = useDelete<MaterialInItem>({
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
