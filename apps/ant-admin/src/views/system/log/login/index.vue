<script lang="ts" setup>
import { Page } from '@vben/common-ui';

import { useTable } from '#/hooks';

import { logLoginApi } from './api';
import { LoginColumn } from './columns';

const [Grid] = useTable({
  colums: LoginColumn,
  api: logLoginApi,
  searhcSchema: [
    {
      component: 'Input',
      fieldName: 'username',
      label: '登录账号',
      componentProps: {
        allowClear: true,
        placeholder: '请输入登录账号',
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
      fieldName: 'login_at',
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
      <template #resultCode="{ row }">
        <span class="text-primary" v-if="row.result_code === '0'">
          登录成功
        </span>
        <span class="text-destructive" v-else>登录失败</span>
      </template>
    </Grid>
  </Page>
</template>
