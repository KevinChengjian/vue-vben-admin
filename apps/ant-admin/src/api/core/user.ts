import type { UserInfo } from '@vben/types';

import { requestClient } from '#/api/request';

/**
 * 获取用户信息
 */
export async function getUserInfoApi() {
  return requestClient.get<UserInfo>('/admin/auth/userInfo');
}

/**
 * 修改用户密码
 */
export async function changePwd(params: { newPwd: string; oldPwd: string }) {
  return requestClient.post<any>('/admin/auth/change-pwd', params);
}

/**
 * 修改用户邮箱
 */
export async function changeEmail(params: { email: string }) {
  return requestClient.post<any>('/admin/auth/change-email', params);
}

/**
 * 修改用户手机号码
 */
export async function changePhone(params: { phone: string }) {
  return requestClient.post<any>('/admin/auth/change-phone', params);
}
