<script lang="ts" setup>
import { useRouter } from 'vue-router';

import { Page } from '@vben/common-ui';
import { downloadFileFromUrl } from '@vben/utils';

import { Button } from 'ant-design-vue';
import dayjs from 'dayjs';

import { Dict } from '#/api';
import { useTable } from '#/hooks';

import { exportApi, listApi } from './api';
import { TableColumn } from './columns';

const [Grid, gridApi] = useTable({
  colums: TableColumn,
  api: listApi,
  height: 900,
  pagerConfig: {
    enabled: false,
  },
  searhcSchema: [
    {
      component: 'Input',
      fieldName: 'mb_sn',
      label: '菌包编号',
      componentProps: {
        allowClear: true,
        placeholder: '请输入菌包编号',
      },
    },
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
      component: 'RangePicker',
      fieldName: 'vr_at',
      label: '接种日期',
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
        mode: 'multiple',
        placeholder: '请选择品种',
        code: Dict.KeyEnum.STRAIN_CATEGORY,
      },
    },
    {
      component: 'DictSelect',
      fieldName: 'warehouse_id',
      label: '养菌房',
      componentProps: {
        class: 'w-full',
        showSearch: true,
        allowClear: true,
        mode: 'multiple',
        placeholder: '请选择养菌房',
        code: Dict.KeyEnum.STRAIN_HOUSE,
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
        mode: 'multiple',
        placeholder: '请选择配方',
        code: Dict.KeyEnum.STRAIN_HOUSE,
      },
    },
    {
      component: 'RangePicker',
      fieldName: 'put_at',
      label: '上架时间',
      defaultValue: [
        dayjs().startOf('month').format('YYYY-MM-DD'),
        dayjs().endOf('month').format('YYYY-MM-DD'),
      ],
      componentProps: {
        valueFormat: 'YYYY-MM-DD',
        allowClear: true,
        placeholder: ['开始时间', '结束时间'],
      },
    },
  ],
});

const router = useRouter();
const handleCulture = (item: any) => {
  router.push({
    path: '/culture/cultivate',
    query: {
      mb_sn: item.mb_sn,
      title: item.mb_sn,
    },
  });
};

const handleFruiting = (item: any) => {
  router.push({
    path: '/fruiting/record',
    query: {
      fruiting_sn: item.fruiting_sn,
      title: item.fruiting_sn,
    },
  });
};

// 导出数据
const handleExport = async () => {
  try {
    const values = await gridApi.formApi.getValues();
    const resp = await exportApi(values);
    downloadFileFromUrl({ source: resp.url, target: '_self' });
  } catch {}
};
</script>

<template>
  <Page class="h-full">
    <Grid>
      <template #mb_sn="{ row }">
        <div class="text-primary" @click="handleCulture(row)">
          {{ row.mb_sn }}
        </div>
      </template>

      <template #fruiting_sn="{ row }">
        <div class="text-primary" @click="handleFruiting(row)">
          {{ row.fruiting_sn }}
        </div>
      </template>

      <template #table-title>
        <div class="w-full items-center">
          <Button type="primary" @click="handleExport()">
            <!-- v-access:code="AuthCode.Export" -->
            导出数据
          </Button>
        </div>
      </template>
    </Grid>
  </Page>
</template>
