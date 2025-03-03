import type { RoleItem } from './type';

import { requestClient } from '#/api/request';

/**
 * 操作权限标识
 */
export enum AuthCode {
  Create = 'admin.role.create',
  Delete = 'admin.role.delete',
  Update = 'admin.role.update',
}

/**
 * 列表
 * @param params any
 * @returns ListResult
 */
export async function roleListApi(params: any = {}) {
  return requestClient.post<RoleItem[]>('/admin/role/list', params);
}

/**
 * 添加部门
 * @param params
 * @returns any
 */
export async function roleCreateApi(params: any) {
  return requestClient.post<any>('/admin/role/create', params);
}

/**
 * 编辑部门
 * @param params
 * @returns any
 */
export async function roleUpdateApi(params: any) {
  return requestClient.post<any>('/admin/role/update', params);
}

/**
 * 删除部门
 * @param params
 * @returns any
 */
export async function roleDeleteApi(params: any) {
  return requestClient.post<any>('/admin/role/delete', params);
}
