<script setup lang="ts">
import type { DeptItem } from './dept.type';

import { onMounted, ref } from 'vue';

import { Page } from '@vben/common-ui';

import { Card, Table } from 'ant-design-vue';

import { DeptColumn } from './columns';
import { DeptListApi } from './dept.api';

const deptList = ref<DeptItem[]>([]);
const getDeptList = async () => {
  deptList.value = await DeptListApi();
};

onMounted(() => {
  getDeptList();
});
</script>

<template>
  <Page class="h-full">
    <Card :bordered="false">
      <Table
        :columns="DeptColumn"
        :data-source="deptList"
        :pagination="false"
        row-key="id"
        size="middle"
      />
    </Card>
  </Page>
</template>
