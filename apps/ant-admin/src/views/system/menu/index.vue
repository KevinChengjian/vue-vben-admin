<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { Page, useVbenModal } from '@vben/common-ui';

import { Button, Card, Col, message, Row, Select, Tree } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';

import {
  AuthCode,
  menuBindApi,
  menuCreateApi,
  menuDeleteApi,
  menuListApi,
  menuRouterApi,
  menuUpdateApi,
} from './api';
import { MenuFormStoreSchema } from './schema';

const menuTree = ref<any>([]);
const selectKeys = ref<any>([]);
const isCreate = ref<boolean>(true);

const [MenuForm, MenuFromApi] = useVbenForm({
  schema: MenuFormStoreSchema,
  wrapperClass: 'grid-cols-1 md:grid-cols-2',
  actionWrapperClass: 'text-left ml-[96px]',
  resetButtonOptions: { class: 'w-[100px]' },
  submitButtonOptions: { class: 'w-[100px]' },
  handleSubmit: async () => {
    try {
      await MenuFromApi.validate();
      const values = await MenuFromApi.getValues();
      await (values?.id ? menuUpdateApi(values) : menuCreateApi(values));
      MenuFromApi.resetForm();

      await getMenuList();
    } catch {}
  },
});

const getMenuList = async () => {
  menuTree.value = await menuListApi({});
  MenuFromApi.updateSchema([
    {
      fieldName: 'pid',
      componentProps: {
        treeData: menuTree.value,
      },
    },
  ]);
};

const handleAddMenu = () => {
  isCreate.value = true;
  MenuFromApi.resetForm();
};

const handleEditMenu = (_: any, menu: any) => {
  isCreate.value = false;
  MenuFromApi.setValues({
    id: menu.node.id,
    app_id: menu.node.app_id,
    type: menu.node.type,
    title: menu.node.title,
    status: menu.node.status,
    icon: menu.node.icon,
    path: menu.node.path,
    name: menu.node.name,
    component: menu.node.component,
    cache: menu.node.cache,
    sorting: menu.node.sorting,
    auth_code: menu.node.auth_code,
    target: menu.node.target,
    pid: menu.node.pid === 0 ? undefined : menu.node.pid,
  });
};

const handleDestroy = async (id: number) => {
  try {
    await menuDeleteApi({ id });
    getMenuList();
  } catch {}
};

// 绑定操作权限
const actionList = ref<any>([]);
const selectActionValues = ref<any>([]);
const selectActionList = ref<any>([]);
const bindPid = ref<number>(0);

const [BindActionModal, BindActionModalApi] = useVbenModal({
  title: '绑定操作权限',
  onConfirm: async () => {
    if (selectActionList.value.length === 0) {
      return message.error('请选择要绑定的操作权限');
    }
    try {
      await menuBindApi({
        pid: bindPid.value,
        router: selectActionList.value,
      });

      getMenuList();
      BindActionModalApi.close();
    } catch {}
  },
});

const getActionList = async () => {
  actionList.value = await menuRouterApi();
};

const handleSelectActions = (_: any, options: any) => {
  selectActionList.value = options;
};

const handleBind = (id: number) => {
  bindPid.value = id;
  getActionList();
  BindActionModalApi.open();
  selectActionValues.value = [];
  selectActionList.value = [];
};

onMounted(() => {
  getMenuList();
});
</script>

<template>
  <Page class="h-full">
    <Row :gutter="12" class="h-full">
      <Col :lg="8" :span="8" :xs="24">
        <Card
          :bordered="false"
          class="h-full"
          title="菜单管理"
          :body-style="{ padding: '24px 0 24px 24px' }"
        >
          <template #extra>
            <Button
              type="primary"
              v-access:code="AuthCode.Create"
              @click="handleAddMenu"
            >
              添加
            </Button>
          </template>

          <Tree
            v-model:selected-keys="selectKeys"
            :field-names="{ children: 'children', title: 'title', key: 'id' }"
            :show-icon="false"
            :show-line="true"
            :block-node="true"
            :tree-data="menuTree"
            @select="handleEditMenu"
            style="height: calc(100vh - 240px); overflow-y: scroll"
          >
            <template #title="{ title, data }">
              <div class="flex items-center justify-between">
                <div :class="{ 'text-destructive': data.status !== 1 }">
                  {{ title }}
                </div>
                <div class="flex items-center">
                  <div
                    class="text-primary cursor-pointer"
                    v-access:code="AuthCode.Bind"
                    @click.stop="handleBind(data.id)"
                    v-if="data.type === 'menu'"
                  >
                    关联权限
                  </div>
                  <div
                    class="text-destructive ml-[15px] mr-[20px] cursor-pointer"
                    v-access:code="AuthCode.Delete"
                    @click.stop="handleDestroy(data.id)"
                  >
                    删除
                  </div>
                </div>
              </div>
            </template>
          </Tree>
        </Card>
      </Col>

      <Col :lg="16" :span="16" :xs="24">
        <Card
          :bordered="false"
          :title="`${isCreate ? '添加菜单' : '编辑菜单'}`"
          class="h-full"
        >
          <MenuForm class="menu-from" />
        </Card>
      </Col>
    </Row>

    <!-- 绑定操作权限 -->
    <BindActionModal>
      <Select
        v-model:value="selectActionValues"
        :allow-clear="true"
        :field-names="{
          label: 'title',
          value: 'auth_code',
          options: 'options',
        }"
        :options="actionList"
        class="w-full"
        mode="multiple"
        placeholder="请选择要绑定的操作权限"
        @change="handleSelectActions"
      />
      <Row
        v-for="(item, index) in selectActionList"
        :key="index"
        class="mt-[10px]"
      >
        <Col :offset="1" :span="4">{{ item.title }}</Col>
        <!-- <Col :span="19">{{ item.router }}</Col> -->
        <Col :span="18">{{ item.auth_code }}</Col>
      </Row>
    </BindActionModal>
  </Page>
</template>

<style lang="less">
.menu-from {
  button[aria-haspopup='dialog'] {
    display: flex !important;
    flex: 1 !important;
  }
}
</style>
