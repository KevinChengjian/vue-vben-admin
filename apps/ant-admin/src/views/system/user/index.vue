<script lang="ts" setup>
import { Page, useVbenModal } from '@vben/common-ui';

import { Button } from 'ant-design-vue';

import { Dict } from '#/api';
import { useTable } from '#/hooks';

import { AuthCode, userListApi } from './api';
import { UserColumn } from './columns';
import UserPwdModal from './pwdModal.vue';
import UserStoreModal from './storeModal.vue';

const [Grid, gridApi] = useTable({
  colums: UserColumn,
  api: userListApi,
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
      fieldName: 'username',
      label: '登录账号',
      componentProps: {
        allowClear: true,
        placeholder: '请输入登录账号',
      },
    },
    {
      component: 'DictTreeSelect',
      fieldName: 'dept_id',
      label: '所在部门',
      componentProps: {
        allowClear: true,
        class: 'w-full',
        showSearch: true,
        placeholder: '请选择所在部门',
        code: Dict.KeyEnum.SYS_DEPT,
      },
    },
    {
      component: 'DictTreeSelect',
      fieldName: 'position_id',
      label: '所在岗位',
      componentProps: {
        allowClear: true,
        class: 'w-full',
        showSearch: true,
        placeholder: '请选择所在岗位',
        code: Dict.KeyEnum.SYS_POSITION,
      },
    },
    {
      component: 'DictSelect',
      fieldName: 'status',
      label: '账号状态',
      componentProps: {
        allowClear: true,
        placeholder: '请选择账号状态',
        code: Dict.KeyEnum.STATUS,
      },
    },
    {
      component: 'Input',
      fieldName: 'phone',
      label: '手机号码',
      componentProps: {
        allowClear: true,
        placeholder: '请输入手机号码',
      },
    },
    {
      component: 'Input',
      fieldName: 'email',
      label: '邮箱地址',
      componentProps: {
        allowClear: true,
        placeholder: '请输入邮箱地址',
      },
    },
  ],
});

const [StoreModal, storeModalApi] = useVbenModal({
  connectedComponent: UserStoreModal,
});

const handleStoreUser = (item: any = {}, edit: boolean = false) => {
  storeModalApi
    .setData({
      isEdit: edit,
      record: item,
    })
    .open();
};

const [PwdModal, pwdModalApi] = useVbenModal({
  connectedComponent: UserPwdModal,
});
</script>

<template>
  <Page class="h-full">
    <Grid>
      <template #toolbar-actions>
        <Button
          type="primary"
          v-access:code="AuthCode.Create"
          @click="handleStoreUser"
        >
          新增用户
        </Button>
        <!-- <Button
          class="ml-[15px]"
          type="primary"
          danger
          v-access:code="AuthCode.ResetPwd"
          @click="handleStoreUser"
        >
          重置密码
        </Button> -->
      </template>

      <template #action="{ row }">
        <div class="flex items-center justify-center text-[14px]">
          <div
            class="text-primary cursor-pointer"
            v-access:code="AuthCode.Update"
            @click="handleStoreUser(row, true)"
          >
            编辑
          </div>
          <div
            class="text-primary ml-[15px] cursor-pointer"
            v-access:code="AuthCode.ResetPwd"
            @click="pwdModalApi.setData(row).open()"
          >
            重置密码
          </div>
          <div
            class="text-destructive ml-[15px] cursor-pointer"
            v-access:code="AuthCode.Delete"
          >
            删除
          </div>
        </div>
      </template>
    </Grid>

    <StoreModal @reload="gridApi.reload" />
    <PwdModal />
  </Page>
</template>
