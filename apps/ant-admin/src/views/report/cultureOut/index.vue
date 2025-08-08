<script lang="ts" setup>
import { useRouter } from 'vue-router';

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
        placeholder: '请选择养菌房',
        code: Dict.KeyEnum.STRAIN_HOUSE,
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

const handleStrainHouse = (item: any) => {
  router.push({
    path: '/culture/cultivate',
    query: {
      warehouse_id: item.warehouse_id,
      title: item.warehouse,
    },
  });
};
</script>

<template>
  <Page class="h-full">
    <Grid>
      <template #toolbar-actions> </template>
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

      <template #warehouse="{ row }">
        <div class="text-primary" @click="handleStrainHouse(row)">
          {{ row.warehouse }}
        </div>
      </template>
    </Grid>
  </Page>
</template>
