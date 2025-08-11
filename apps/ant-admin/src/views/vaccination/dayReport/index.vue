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
  if (!route.query?.strain_sn) return;
  setTabTitle(`${route.query?.strain_sn}-日报表`);
});

const [Grid, gridApi] = useTable({
  colums: TableColumn,
  api: listApi,
  searhcSchema: [
    // {
    //   component: 'Input',
    //   fieldName: 'mb_sn',
    //   label: '菌包编号',
    //   componentProps: {
    //     allowClear: true,
    //     placeholder: '请输入菌包编号',
    //   },
    // },
    {
      component: 'Input',
      fieldName: 'strain_sn',
      label: '菌种编号',
      defaultValue: route?.query?.strain_sn || undefined,
      componentProps: {
        allowClear: true,
        placeholder: '请输入菌种编号',
      },
    },
    {
      component: 'DictSelect',
      fieldName: 'can_no',
      label: '罐号',
      defaultValue: route?.query?.can_no || undefined,
      componentProps: {
        class: 'w-full',
        showSearch: true,
        allowClear: true,
        placeholder: '请选择罐号',
        code: Dict.KeyEnum.STRAIN_CAN_NO,
      },
    },
    {
      component: 'RangePicker',
      fieldName: 'observe_at',
      label: '观察日期',
      componentProps: {
        valueFormat: 'YYYY-MM-DD',
        allowClear: true,
        placeholder: ['开始日期', '结束日期'],
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
      fieldName: 'user_id',
      label: '记录人员',
      componentProps: {
        class: 'w-full',
        showSearch: true,
        allowClear: true,
        placeholder: '请选择记录人员',
        code: Dict.KeyEnum.SYS_USER,
      },
    },
    // {
    //   component: 'RangePicker',
    //   fieldName: 'created_at',
    //   label: '记录时间',
    //   componentProps: {
    //     valueFormat: 'YYYY-MM-DD',
    //     allowClear: true,
    //     placeholder: ['开始时间', '结束时间'],
    //   },
    // },
  ],
});

// 添加|编辑
const [StoreModal, storeModalApi] = useVbenModal({
  connectedComponent: MaterialStoreModal,
});

const handleStore = (item: any = {}, edit: boolean = false) => {
  if (!edit && route.query?.strain_sn) {
    item = {
      strain_sn: route.query?.strain_sn,
      can_no: route.query?.can_no,
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
