<script lang="ts" setup>
import { ref } from 'vue';

import { Page } from '@vben/common-ui';

import { Card, Menu, MenuItem } from 'ant-design-vue';

import Basic from './components/basic.vue';
import Security from './components/security.vue';

const selectedKeys = ref(['basic']);
</script>

<template>
  <Page class="h-full">
    <Card :bordered="false" class="h-full">
      <div class="flex h-full w-full">
        <div class="left h-full w-[240px] flex-shrink-0">
          <Menu
            v-model:selected-keys="selectedKeys"
            type="inner"
            class="h-full"
          >
            <MenuItem key="basic"> 基础设置 </MenuItem>
            <MenuItem key="security"> 安全设置 </MenuItem>
            <!-- <MenuItem key="bindAccount"> 账户绑定 </MenuItem> -->
          </Menu>
        </div>
        <div class="flex-1 pl-[40px] pr-[40px] pt-[8px]">
          <Basic v-if="selectedKeys.includes('basic')" />
          <Security v-if="selectedKeys.includes('security')" />
          <!-- <BindAccount v-if="selectedKeys.includes('bindAccount')" /> -->
        </div>
      </div>
    </Card>
  </Page>
</template>
