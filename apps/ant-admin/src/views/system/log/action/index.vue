<script lang="ts" setup>
import { Page } from '@vben/common-ui';

import { useTable } from '#/hooks';

import { logActionApi } from './api';
import { LogColumn } from './columns';

const [Grid] = useTable({
  colums: LogColumn,
  api: logActionApi,
  searhcSchema: [
    {
      component: 'Input',
      fieldName: 'nickname',
      label: '用户名称',
      componentProps: {
        allowClear: true,
        placeholder: '请输入用户名称',
      },
    },
    {
      component: 'Input',
      fieldName: 'menu_name',
      label: '系统模块',
      componentProps: {
        allowClear: true,
        placeholder: '请输入系统模块',
      },
    },
    {
      component: 'Input',
      fieldName: 'action_name',
      label: '操作类型',
      componentProps: {
        allowClear: true,
        placeholder: '请输入操作类型',
      },
    },
    {
      component: 'Input',
      fieldName: 'address',
      label: '操作地址',
      componentProps: {
        allowClear: true,
        placeholder: '请输入操作地址',
      },
    },
    {
      component: 'RangePicker',
      fieldName: 'operation_at',
      label: '操作时间',
      componentProps: {
        allowClear: true,
        class: 'w-full',
        format: 'YYYY-MM-DD',
        valueFormat: 'YYYY-MM-DD',
        showSearch: true,
        placeholder: ['开始时间', '结束时间'],
      },
    },
  ],
});
</script>

<template>
  <Page class="h-full">
    <Grid>
      <template #result_code="{ row }">
        <span class="text-primary" v-if="row.result_code === 0">成功</span>
        <span class="text-destructive" v-else>失败</span>
      </template>
    </Grid>
  </Page>
</template>
