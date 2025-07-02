<script lang="ts" setup>
import { computed } from 'vue';

import { preferences } from '@vben/preferences';
import { useUserStore } from '@vben/stores';

import { Avatar, Descriptions, DescriptionsItem } from 'ant-design-vue';

const userStore = useUserStore();

const roleNams = computed(() => {
  const arr: string[] = [];
  (userStore.userInfo?.roles || []).forEach((item: any) => {
    item.name && arr.push(item.name);
  });
  return arr.join(',');
});
const avatar = computed(() => {
  return userStore.userInfo?.avatar || preferences.app.defaultAvatar;
});
</script>

<template>
  <div class="flex items-start">
    <div class="flex-shrink-0">
      <Avatar
        :src="avatar"
        :size="{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }"
      />
    </div>
    <div class="ml-[24px] mt-[5px] flex-1">
      <Descriptions>
        <DescriptionsItem label="账户昵称">
          {{ userStore.userInfo?.nickname }}
        </DescriptionsItem>
        <DescriptionsItem label="登录账号">
          {{ userStore.userInfo?.username }}
        </DescriptionsItem>
        <DescriptionsItem label="手机号码">
          {{ userStore.userInfo?.phone }}
        </DescriptionsItem>
        <DescriptionsItem label="任职部门">
          {{ userStore.userInfo?.deptName }}
        </DescriptionsItem>
        <DescriptionsItem label="任职岗位">
          {{ userStore.userInfo?.position }}
        </DescriptionsItem>
        <DescriptionsItem label="电子邮箱" :content-style="{}">
          {{ userStore.userInfo?.email }}
        </DescriptionsItem>
        <DescriptionsItem label="操作权限" :span="3">
          {{ roleNams }}
        </DescriptionsItem>
      </Descriptions>
    </div>
  </div>
  <!-- <Row :gutter="15">
    <Col :span="24" />
    <Col :span="20">个人业务员</Col>
  </Row> -->
</template>
