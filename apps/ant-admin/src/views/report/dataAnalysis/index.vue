<script lang="ts" setup>
import { Page } from '@vben/common-ui';

import dayjs from 'dayjs';

import { Dict } from '#/api';
import { useTable } from '#/hooks';

import { listApi } from './api';
import { TableColumn } from './columns';

const [Grid] = useTable({
  colums: TableColumn,
  api: listApi,
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
        placeholder: '请选择养菌房',
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
</script>

<template>
  <Page class="h-full">
    <Grid />
  </Page>
</template>
