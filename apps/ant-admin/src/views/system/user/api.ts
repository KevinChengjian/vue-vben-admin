import type { UserItem } from './type';

import { requestClient } from '#/api/request';

/**
 * 操作权限标识
 */
export enum AuthCode {
  Create = 'admin.user.create',
  Delete = 'admin.user.delete',
  ResetPwd = 'admin.user.reset-pwd',
  Update = 'admin.user.update',
}

/**
 * 列表
 * @param params any
 * @returns ListResult
 */
export async function userListApi(params: any = {}) {
  return requestClient.post<UserItem[]>('/admin/user/list', params);
}

/**
 * 添加
 * @param params
 * @returns any
 */
export async function userCreateApi(params: any) {
  return requestClient.post<any>('/admin/user/create', params);
}

/**
 * 编辑
 * @param params
 * @returns any
 */
export async function userUpdateApi(params: any) {
  return requestClient.post<any>('/admin/user/update', params);
}

/**
 * 删除
 * @param params
 * @returns any
 */
export async function userDeleteApi(params: any) {
  return requestClient.post<any>('/admin/user/delete', params);
}

/**
 * 删除
 * @param params
 * @returns any
 */
export async function userResetPwdApi(params: any) {
  return requestClient.post<any>('/admin/user/reset-pwd', params);
}
