<script lang="ts" setup>
import { Page, useVbenModal } from '@vben/common-ui';

import { Button } from 'ant-design-vue';

import { Dict } from '#/api';
import { useTable } from '#/hooks';

import { AuthCode, userListApi } from './api';
import { UserColumn } from './columns';
import UserStoreModal from './storeModal.vue';

const [Grid, gridApi] = useTable({
  colums: UserColumn,
  api: userListApi,
  searhcSchema: [
    {
      component: 'Input',
      fieldName: 'name',
      label: '原料编号',
      componentProps: {
        allowClear: true,
        placeholder: '请输入配方名称',
      },
    },
    {
      component: 'DictSelect',
      fieldName: 'status',
      label: '配方状态',
      componentProps: {
        allowClear: true,
        placeholder: '请选择配方状态',
        code: Dict.KeyEnum.STATUS,
      },
    },
    // {
    //   component: 'Input',
    //   fieldName: 'material',
    //   label: '配方原料',
    //   componentProps: {
    //     allowClear: true,
    //     placeholder: '请输入配方原料',
    //   },
    // },
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
          新增配方
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
            class="text-destructive ml-[15px] cursor-pointer"
            v-access:code="AuthCode.Delete"
          >
            删除
          </div>
        </div>
      </template>
    </Grid>

    <StoreModal @reload="gridApi.reload" />
  </Page>
</template>
