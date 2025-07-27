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
  searhcSchema: [
    {
      component: 'DatePicker',
      fieldName: 'month',
      label: '出库日期',
      defaultValue: dayjs().format('YYYY-MM'),
      componentProps: {
        picker: 'month',
        valueFormat: 'YYYY-MM',
        allowClear: true,
        placeholder: '请选择出库日期',
      },
    },
    {
      component: 'DictSelect',
      fieldName: 'variety_id',
      label: '品种',
      componentProps: {
        class: 'w-full',
        mode: 'multiple',
        showSearch: true,
        allowClear: true,
        placeholder: '请选择品种',
        code: Dict.KeyEnum.STRAIN_CATEGORY,
      },
    },
    {
      component: 'FormulaSelect',
      fieldName: 'formula_id',
      label: '配方',
      componentProps: {
        class: 'w-full',
        mode: 'multiple',
        showSearch: true,
        allowClear: true,
        placeholder: '请选择配方',
      },
    },
    {
      component: 'DictSelect',
      fieldName: 'warehouse_id',
      label: '养菌房',
      componentProps: {
        class: 'w-full',
        mode: 'multiple',
        showSearch: true,
        allowClear: true,
        placeholder: '请选择出菇房',
        code: Dict.KeyEnum.FRUITING_HOUSE,
      },
    },
    {
      component: 'DictSelect',
      fieldName: 'room_id',
      label: '出菇房',
      componentProps: {
        class: 'w-full',
        mode: 'multiple',
        showSearch: true,
        allowClear: true,
        placeholder: '请选择出菇房',
        code: Dict.KeyEnum.FRUITING_HOUSE,
      },
    },
  ],
});
</script>

<template>
  <Page class="h-full">
    <Grid>
      <template #toolbar-actions> </template>
    </Grid>
  </Page>
</template>
