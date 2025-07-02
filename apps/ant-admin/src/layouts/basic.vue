<script lang="ts" setup>
import { computed, watch } from 'vue';

import { AuthenticationLoginExpiredModal, useVbenModal } from '@vben/common-ui';
import { useWatermark } from '@vben/hooks';
import { ClearOutlined, Settings } from '@vben/icons';
import { BasicLayout, LockScreen, UserDropdown } from '@vben/layouts';
import { preferences } from '@vben/preferences';
import { useAccessStore, useUserStore } from '@vben/stores';

import { message } from 'ant-design-vue';

import { useAuthStore, useDictStore } from '#/store';
import UserAccount from '#/views/_core/account/modal.vue';
import LoginForm from '#/views/_core/authentication/login.vue';

const userStore = useUserStore();
const authStore = useAuthStore();
const accessStore = useAccessStore();
const { destroyWatermark, updateWatermark } = useWatermark();

// 账户中心
const [UserAccountModal, UserAccountApi] = useVbenModal({
  connectedComponent: UserAccount,
});

const { fetch } = useDictStore();

const menus = computed(() => [
  {
    handler: () => {
      UserAccountApi.open();
    },
    icon: Settings,
    text: `账户中心`,
  },
  {
    handler: async () => {
      fetch();
      message.success('清除缓存成功');
    },
    icon: ClearOutlined,
    text: `清除缓存`,
  },
]);

const avatar = computed(() => {
  return userStore.userInfo?.avatar || preferences.app.defaultAvatar;
});

async function handleLogout() {
  await authStore.logout(false);
}

watch(
  () => preferences.app.watermark,
  async (enable) => {
    if (enable) {
      await updateWatermark({
        content: `${userStore.userInfo?.username}`,
      });
    } else {
      destroyWatermark();
    }
  },
  {
    immediate: true,
  },
);
</script>

<template>
  <BasicLayout @clear-preferences-and-logout="handleLogout">
    <template #logo-text>
      <UserAccountModal />
      <span class="truncate text-nowrap"> 农新生物科技 </span>
    </template>
    <template #user-dropdown>
      <UserDropdown
        :avatar
        :menus
        :text="userStore.userInfo?.nickname"
        :description="`${userStore.userInfo?.phone || userStore.userInfo?.email}`"
        :tag-text="userStore.userInfo?.position"
        @logout="handleLogout"
      />
    </template>
    <template #extra>
      <AuthenticationLoginExpiredModal
        v-model:open="accessStore.loginExpired"
        :avatar
      >
        <LoginForm />
      </AuthenticationLoginExpiredModal>
    </template>
    <template #lock-screen>
      <LockScreen :avatar @to-login="handleLogout" />
    </template>
  </BasicLayout>
</template>
