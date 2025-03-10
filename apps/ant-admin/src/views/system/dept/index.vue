<script setup lang="ts">
import type { DeptItem } from './dept.type';

import { onMounted, ref } from 'vue';

import { Page, useVbenModal, VbenButton } from '@vben/common-ui';

import { Card, Input, Table } from 'ant-design-vue';

import { Dict } from '#/api';
import DictLabel from '#/components/dict/dict-label.vue';
import { useDelete } from '#/hooks';

import { DeptColumn } from './columns';
import { AuthCode, deptDeleteApi, deptListApi } from './dept.api';
import deptStoreModal from './storeModal.vue';

const deptList = ref<DeptItem[]>([]);
const deptKeyword = ref<string>('');
const getDeptList = async () => {
  deptList.value = await deptListApi({
    keyword: deptKeyword.value,
  });
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

const { destory } = useDelete<DeptItem>({
  api: deptDeleteApi,
  callback: () => {
    getDeptList();
  },
});

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
          <Input
            v-model:value="deptKeyword"
            :allow-clear="true"
            placeholder="组织名称/代码"
            @press-enter="getDeptList"
          >
            <template #suffix>
              <span class="icon-[ant-design--search-outlined]"></span>
            </template>
          </Input>
        </div>
        <div class="right">
          <VbenButton
            v-access:code="AuthCode.Create"
            class="pl-[15px] pr-[15px] text-[14px]"
            size="sm"
            @click="handleStoreDept"
          >
            <span
              class="icon-[ant-design--plus-outlined] mr-[1px] text-[#fff]"
            ></span>
            新增组织
          </VbenButton>
        </div>
      </div>

      <Table
        v-if="deptList.length > 0"
        :default-expand-all-rows="true"
        :columns="DeptColumn"
        :data-source="deptList"
        :pagination="false"
        class="mt-[16px]"
        row-key="id"
        size="middle"
      >
        <template #bodyCell="{ column, record }">
          <DictLabel
            v-if="column.dataIndex === 'type'"
            :code="Dict.KeyEnum.DEPT_TYPE"
            :value="record.type"
          />

          <DictLabel
            v-if="column.dataIndex === 'status'"
            :code="Dict.KeyEnum.STATUS"
            :value="record.status"
          />

          <template v-if="column.dataIndex === 'action'">
            <div class="flex items-center justify-center text-[12px]">
              <div
                class="text-primary cursor-pointer"
                v-access:code="AuthCode.Update"
                @click="handleStoreDept(record, true)"
              >
                编辑
              </div>
              <div
                class="text-primary ml-[15px] cursor-pointer"
                v-access:code="AuthCode.Create"
                @click="handleStoreDept({ pid: record.id })"
              >
                添加下级组织
              </div>
              <div
                class="text-destructive ml-[15px] cursor-pointer"
                v-access:code="AuthCode.Delete"
                @click="destory({ id: record.id })"
              >
                删除
              </div>
            </div>
          </template>
        </template>
      </Table>

      <Table
        v-else
        :columns="DeptColumn"
        class="mt-[16px]"
        row-key="id"
        size="middle"
      />
    </Card>

    <StoreModal @reload="getDeptList" />
  </Page>
</template>
