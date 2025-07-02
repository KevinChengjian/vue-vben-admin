<script lang="ts" setup>
import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { Menu, MenuItem } from 'ant-design-vue';

import Basic from './components/basic.vue';
import BindAccount from './components/bindAccount.vue';
import Security from './components/security.vue';

const selectedKeys = ref(['basic']);
const [Modal] = useVbenModal({ footer: false });
</script>
<template>
  <Modal title="账户中心" class="w-[980px]" content-class="pt-[20px] pb-0">
    <div class="flex h-full min-h-[300px] w-full">
      <div class="left h-full w-[140px] flex-shrink-0">
        <Menu v-model:selected-keys="selectedKeys" type="inner" class="h-full">
          <MenuItem key="basic"> 基础设置 </MenuItem>
          <MenuItem key="security"> 安全设置 </MenuItem>
          <MenuItem key="bindAccount"> 微信绑定 </MenuItem>
        </Menu>
      </div>
      <div class="flex-1 pl-[24px] pr-[24px] pt-[8px]">
        <Basic v-if="selectedKeys.includes('basic')" />
        <Security v-if="selectedKeys.includes('security')" />
        <BindAccount v-if="selectedKeys.includes('bindAccount')" />
      </div>
    </div>
  </Modal>
</template>
