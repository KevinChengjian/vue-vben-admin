<script setup lang="ts">
import type { DeptItem } from './dept.type';

import { onMounted, ref } from 'vue';

import { Page, useVbenModal, VbenButton } from '@vben/common-ui';

import { Card, Input, Table } from 'ant-design-vue';

import { DictLabel } from '#/components/dict';
import { DictKeyEnum } from '#/store';

import { DeptColumn } from './columns';
import { AuthCode, deptListApi } from './dept.api';
import deptStoreModal from './storeModal.vue';

const deptList = ref<DeptItem[]>([]);
const getDeptList = async () => {
  deptList.value = await deptListApi();
};

const [StoreModal, storeModalApi] = useVbenModal({
  connectedComponent: deptStoreModal,
});

const handleStoreDept = (item: any = {}, edit: boolean = false) => {
  storeModalApi.setData({
    deptTreeList: deptList.value,
    isEdit: edit,
    record: item,
  });
  storeModalApi.open();
};

onMounted(() => {
  getDeptList();
});
</script>

<template>
  <Page class="h-full">
    <Card
      :body-style="{ padding: '16px 24px 24px 24px' }"
      :bordered="false"
      title="组织管理"
    >
      <div class="flex justify-between">
        <div class="left">
          <Input :allow-clear="true" placeholder="组织名称/代码">
            <template #suffix>
              <span class="icon-[ant-design--search-outlined]"></span>
            </template>
          </Input>
        </div>
        <div class="right">
          <VbenButton
            class="pl-[15px] pr-[15px] text-[14px]"
            size="sm"
            @click="handleStoreDept"
          >
            <span
              class="icon-[ant-design--plus-outlined] mr-[1px] text-[#fff]"
            ></span>
            新增
          </VbenButton>
        </div>
      </div>

      <Table
        :columns="DeptColumn"
        :data-source="deptList"
        :pagination="false"
        class="mt-[16px]"
        row-key="id"
        size="middle"
      >
        <template #bodyCell="{ column, record }">
          <DictLabel
            v-if="column.dataIndex === 'status'"
            :code="DictKeyEnum.STATUS"
            :value="record.status"
          />

          <template v-if="column.dataIndex === 'action'">
            <div class="flex items-center justify-center text-[12px]">
              <div
                class="text-primary"
                v-access:code="AuthCode.Update"
                @click="handleStoreDept(record, true)"
              >
                编辑
              </div>
              <div
                class="text-destructive ml-[15px]"
                v-access:code="AuthCode.Delete"
              >
                删除
              </div>
            </div>
          </template>
        </template>
      </Table>
    </Card>

    <StoreModal @reload="getDeptList" />
  </Page>
</template>
