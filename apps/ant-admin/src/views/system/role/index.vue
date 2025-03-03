<script setup lang="ts">
import type { RoleItem } from './type';

import { onMounted, ref } from 'vue';

import { Page, useVbenModal, VbenButton } from '@vben/common-ui';

import { Card, Input, Table } from 'ant-design-vue';

import { Dict } from '#/api';
import DictLabel from '#/components/dict/dict-label.vue';

import { AuthCode, roleListApi } from './api';
import { RoleColumn } from './columns';
import roleStoreModal from './storeModal.vue';

const roleList = ref<RoleItem[]>([]);
const roleKeyword = ref<string>('');
const getRoleList = async () => {
  roleList.value = await roleListApi({
    keyword: roleKeyword.value,
  });
};

const [StoreModal, storeModalApi] = useVbenModal({
  connectedComponent: roleStoreModal,
});

const handleStoreRole = (item: any = {}, edit: boolean = false) => {
  storeModalApi.setData({
    roleTreeList: roleList.value,
    isEdit: edit,
    record: item,
  });
  storeModalApi.open();
};

onMounted(() => {
  getRoleList();
});
</script>

<template>
  <Page class="h-full">
    <Card
      :body-style="{ padding: '16px 24px 24px 24px' }"
      :bordered="false"
      title="角色管理"
    >
      <div class="flex justify-between">
        <div class="left">
          <Input
            v-model:value="roleKeyword"
            :allow-clear="true"
            placeholder="职务名称/编码"
            @press-enter="getRoleList"
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
            @click="handleStoreRole"
          >
            <span
              class="icon-[ant-design--plus-outlined] mr-[1px] text-[#fff]"
            ></span>
            新增职务
          </VbenButton>
        </div>
      </div>

      <Table
        v-if="roleList.length > 0"
        :default-expand-all-rows="true"
        :columns="RoleColumn"
        :data-source="roleList"
        :pagination="false"
        class="mt-[16px]"
        row-key="id"
        size="middle"
      >
        <template #bodyCell="{ column, record }">
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
                @click="handleStoreRole(record, true)"
              >
                编辑
              </div>
              <div
                class="text-primary ml-[15px] cursor-pointer"
                v-access:code="AuthCode.Create"
                @click="handleStoreRole({ pid: record.id })"
              >
                添加下级职务
              </div>
              <div
                class="text-destructive ml-[15px] cursor-pointer"
                v-access:code="AuthCode.Delete"
              >
                删除
              </div>
            </div>
          </template>
        </template>
      </Table>

      <Table
        v-else
        :columns="RoleColumn"
        class="mt-[16px]"
        row-key="id"
        size="middle"
      />
    </Card>

    <StoreModal @reload="getRoleList" />
  </Page>
</template>
