<script lang="ts" setup>
import type { ListItem } from './type';

import { nextTick } from 'vue';
import { useRoute } from 'vue-router';

import { Page, useVbenModal } from '@vben/common-ui';
import { useTabs } from '@vben/hooks';

import { Button, Space } from 'ant-design-vue';

import { Dict } from '#/api';
import { useDelete, useTable } from '#/hooks';

import { AuthCode, deleteApi, listApi } from './api';
import { TableColumn } from './columns';
import Detail from './detail.vue';
import MaterialStoreModal from './storeModal.vue';

const route = useRoute();
const { setTabTitle } = useTabs();
nextTick(() => {
  if (!route.query?.mb_sn) return;
  setTabTitle(`${route.query?.mb_sn} 巡查记录`);
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
      component: 'RangePicker',
      fieldName: 'patrol_at',
      label: '巡库日期',
      componentProps: {
        valueFormat: 'YYYY-MM-DD',
        allowClear: true,
        placeholder: ['开始日期', '结束日期'],
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
      component: 'DictSelect',
      fieldName: 'fh_id',
      label: '发菌',
      componentProps: {
        class: 'w-full',
        showSearch: true,
        allowClear: true,
        placeholder: '请选择发菌',
        code: Dict.KeyEnum.STRAIN_STATE,
      },
    },
    {
      component: 'DictSelect',
      fieldName: 'user_id',
      label: '巡库人员',
      componentProps: {
        class: 'w-full',
        showSearch: true,
        allowClear: true,
        placeholder: '请选择灭菌柜',
        code: Dict.KeyEnum.SYS_USER,
      },
    },
  ],
});

// 添加|编辑
const [StoreModal, storeModalApi] = useVbenModal({
  connectedComponent: MaterialStoreModal,
});

const handleStore = (item: any = {}, edit: boolean = false) => {
  if (!edit && route.query?.mb_sn) {
    item = {
      mb_sn: route.query?.mb_sn,
      warehouse_id: route.query?.warehouse_id,
    };
  }

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
  connectedComponent: Detail,
});
const handleDetail = (row: ListItem) => {
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

      <template #attach_ids="{ row }">
        <div class="text-primary cursor-pointer">
          {{ row.attach }}
        </div>
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
