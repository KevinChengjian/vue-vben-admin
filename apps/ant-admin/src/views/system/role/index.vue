<script setup lang="ts">
import type { RoleItem } from './type';

import { onMounted, ref } from 'vue';

import { Page, useVbenModal } from '@vben/common-ui';

import { Button, Card, Col, Input, Row, Tree } from 'ant-design-vue';

import { useDelete } from '#/hooks';

import { AuthCode, roleDeleteApi, roleListApi, roleUpdateApi } from './api';
import AuthModal from './authModal.vue';
import roleStoreModal from './storeModal.vue';

const roleList = ref<any>([]);
const roleKeyword = ref<string>('');
const getRoleList = async () => {
  roleList.value = await roleListApi({ keyword: roleKeyword.value });

  if (selectRoleKeys.value.length === 0 && roleList.value.length > 0) {
    selectRoleKeys.value = [roleList.value[0].id];
    handleRoleAuth(roleList.value[0]);
  }
};

const [StoreModal, storeModalApi] = useVbenModal({
  connectedComponent: roleStoreModal,
});

const handleStoreRole = (item: any = {}, edit: boolean = false) => {
  storeModalApi.setData({
    roleTreeList: roleList.value,
    isEdit: edit,
    record: edit
      ? {
          id: item.id,
          name: item.name,
          pid: item.pid,
          status: item.status,
          sorting: item.sorting,
          remark: item.remark,
        }
      : {},
  });
  storeModalApi.open();
};

const handleRoleStatus = async (item: RoleItem) => {
  try {
    await roleUpdateApi({
      id: item.id,
      name: item.name,
      pid: item.pid,
      status: item.status === 1 ? 2 : 1,
      sorting: item.sorting,
      remark: item.remark,
    });
    item.status = item.status === 1 ? 2 : 1;
  } catch {}
};

const { destory } = useDelete<RoleItem>({
  api: roleDeleteApi,
  callback: () => {
    getRoleList();
  },
});

const selectRoleKeys = ref<number[]>([]);
const authRef = ref<InstanceType<typeof AuthModal>>();
const handleRoleAuth = (record: RoleItem) => {
  authRef.value && authRef.value.handleRoleRules(record);
};

onMounted(() => {
  getRoleList();
});
</script>

<template>
  <Page class="role-wrap h-full">
    <Row :gutter="15" class="h-full">
      <Col :span="7">
        <Card
          :bordered="false"
          class="h-full"
          title="角色管理"
          :body-style="{ padding: '15px 24px 24px 24px' }"
        >
          <template #extra>
            <Button
              type="primary"
              v-access:code="AuthCode.Create"
              @click="handleStoreRole"
            >
              添加
            </Button>
          </template>

          <Input
            :allow-clear="true"
            placeholder="角色名称"
            @press-enter="getRoleList"
          >
            <template #suffix>
              <span class="icon-[ant-design--search-outlined]"></span>
            </template>
          </Input>

          <Tree
            v-if="roleList.length > 0"
            class="mt-[14px] w-full"
            :field-names="{ children: 'children', title: 'name', key: 'id' }"
            :show-icon="false"
            :show-line="true"
            :block-node="true"
            :tree-data="roleList"
            v-model:selected-keys="selectRoleKeys"
            :default-expand-all="true"
          >
            <template #title="{ name, data }">
              <div class="flex items-center justify-between">
                <div
                  :class="{ 'text-destructive': data.status !== 1 }"
                  @click="handleRoleAuth(data)"
                >
                  {{ name }}
                </div>
                <div class="flex items-center" v-if="data.super === 2">
                  <div
                    class="text-primary cursor-pointer"
                    v-access:code="AuthCode.Update"
                    @click.stop="handleStoreRole(data, true)"
                  >
                    编辑
                  </div>

                  <div
                    class="ml-[15px] cursor-pointer"
                    :class="{
                      'text-destructive !important': data.status === 1,
                      'text-primary': data.status !== 1,
                    }"
                    v-access:code="AuthCode.Update"
                    @click.stop="handleRoleStatus(data)"
                  >
                    {{ data.status === 1 ? '禁用' : '启用' }}
                  </div>

                  <div
                    class="text-destructive ml-[15px] cursor-pointer"
                    v-access:code="AuthCode.Update"
                    @click.stop="destory({ id: data.id })"
                  >
                    删除
                  </div>
                </div>
              </div>
            </template>
          </Tree>
        </Card>
      </Col>
      <Col :span="17" class="h-full">
        <AuthModal ref="authRef" @reload="getRoleList" />
      </Col>
    </Row>

    <StoreModal @reload="getRoleList" />
  </Page>
</template>

<style></style>
