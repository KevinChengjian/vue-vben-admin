<script lants="ts" setup>
import { reactive, ref } from 'vue';

import { useUserStore } from '@vben/stores';

import {
  Form,
  FormItem,
  Input,
  List,
  ListItem,
  ListItemMeta,
  message,
  Modal,
} from 'ant-design-vue';

import { changeEmail, changePhone, changePwd } from '#/api';
import { useAuthStore } from '#/store';

const userStore = useUserStore();
const authStore = useAuthStore();

const state = reactive({
  phoneVis: false,
  down: 60,
  phone: null,
  code: null,
  timer: null,

  emailVis: false,
  email: null,

  passVis: false,
  old_password: null,
  new_password: null,
});

// 获取验证码
// const getSmsCode = () => {
//   if (!state.phone) {
//     return message.error('请填写手机号码');
//   }
//   if (state.timer || state.down < 60) {
//     return;
//   }

//   SmsCode({ phone: state.phone }).then((res) => {
//     if (showMsg(res)) {
//       clearTimeout(state.timer);

//       state.down = 59;
//       state.timer = setInterval(() => {
//         state.down = state.down - 1;
//         if (state.down === 0) {
//           clearTimeout(state.timer);
//           state.down = 60;
//         }
//       }, 1000);
//     }
//   });
// };

// 修改手机号
const handleChangePhone = async () => {
  if (!state.phone) {
    return message.error('请填写手机号码');
  }

  // if (!state.code) {
  //   return message.error('请填写短信验证码');
  // }

  try {
    await changePhone({ phone: state.phone, code: state.code });
    state.phoneVis = false;
    dataSource.value[0].value = state.phone;
    state.phone = null;
    state.code = null;

    message.success('修改成功');
    await authStore.fetchUserInfo();
  } catch {}
};

// 修改密码
const handleChangePassword = async () => {
  if (!state.old_password) {
    return message.error('请填写旧密码');
  }

  if (!state.new_password) {
    return message.error('请填写新密码');
  }

  try {
    await changePwd({
      oldPwd: state.old_password,
      newPwd: state.new_password,
    });

    message.success('密码修改成功, 请重新登录');
    state.passVis = false;
    state.oldPwd = null;
    state.newPwd = null;

    await authStore.logout(false);
  } catch {}
};

// 修改邮箱
const handleChangeEmail = async () => {
  if (!state.email) {
    return message.error('请填写邮箱');
  }

  try {
    await changeEmail({ email: state.email });
    state.emailVis = false;
    state.email = null;
    dataSource.value[1].value = state.email;

    message.success('修改成功');
    await authStore.fetchUserInfo();
  } catch {}
};

const dataSource = ref([
  {
    title: '手机号码',
    description: '已绑定手机',
    value: userStore.userInfo?.phone || '',
    actions: {
      title: '修改',
      callback: () => {
        state.phoneVis = true;
      },
    },
  },
  {
    title: '电子邮箱',
    description: '已绑定邮箱',
    value: userStore.userInfo?.email || '',
    actions: {
      title: '修改',
      callback: () => {
        state.emailVis = true;
      },
    },
  },
  {
    title: '修改密码',
    description: '最近变动时间',
    value: userStore.userInfo?.updated_at || '',
    actions: {
      title: '修改',
      callback: () => {
        state.phone = userStore.phone;
        state.passVis = true;
      },
    },
  },
]);
</script>

<template>
  <div>
    <List item-layout="horizontal" :data-source="dataSource">
      <template #renderItem="{ item }">
        <ListItem style="padding: 12px 0">
          <ListItemMeta>
            <template #title>
              <a>{{ item.title }}</a>
            </template>
            <template #description>
              <span>
                <span>{{ item.description }}</span>
                <span> ：</span>
                <span>{{ item.value }}</span>
              </span>
            </template>
          </ListItemMeta>
          <template #actions v-if="item.actions">
            <a
              class="text-primary cursor-pointer"
              @click="item.actions.callback"
            >
              {{ item.actions.title }}
            </a>
          </template>
        </ListItem>
      </template>
    </List>

    <!-- 修改手机号码弹窗 -->
    <Modal
      v-model:open="state.phoneVis"
      :body-style="{ padding: '24px 24px 14px 14px' }"
      title="修改手机号码"
      @ok="handleChangePhone"
    >
      <Form :label-col="{ span: 5 }">
        <FormItem label="手机号码" :required="true">
          <Input v-model:value="state.phone" placeholder="请输入手机号码" />
        </FormItem>
        <!-- <FormItem label="验证码" :required="true">
          <InputSearch
            v-model:value="state.code"
            placeholder="请输入验证码"
            @search="getSmsCode"
          >
            <template #enterButton>
              <Button type="primary" v-if="state.down === 60"> 获取 </Button>
              <Button v-if="state.down < 60"> {{ state.down }}S </Button>
            </template>
          </InputSearch>
        </FormItem> -->
      </Form>
    </Modal>

    <!-- 修改邮箱弹窗 -->
    <Modal
      v-model:open="state.emailVis"
      :body-style="{ padding: '24px 24px 14px 24px' }"
      title="修改邮箱"
      @ok="handleChangeEmail"
    >
      <Form :label-col="{ span: 4 }">
        <FormItem label="邮箱" :required="true">
          <Input v-model:value="state.email" placeholder="请输入邮箱地址" />
        </FormItem>
      </Form>
    </Modal>

    <!-- 修改密码弹窗 -->
    <Modal
      v-model:open="state.passVis"
      :body-style="{ padding: '24px 24px 14px 24px' }"
      title="修改密码"
      @ok="handleChangePassword"
    >
      <Form :label-col="{ span: 4 }">
        <FormItem label="旧密码" :required="true">
          <Input
            v-model:value="state.old_password"
            placeholder="请输入旧密码"
          />
        </FormItem>
        <FormItem label="新密码" :required="true">
          <Input
            v-model:value="state.new_password"
            placeholder="请输入新密码"
          />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
