import type { FormulaItem } from './type';

import { requestClient } from '#/api/request';

/**
 * 操作权限标识
 */
export enum AuthCode {
  Create = 'admin.pick-user.create',
  Delete = 'admin.pick-user.delete',
  Detail = 'admin.pick-user.detail',
  Update = 'admin.pick-user.update',
}

/**
 * 列表
 * @param params any
 * @returns ListResult
 */
export async function listApi(params: any = {}) {
  return requestClient.post<FormulaItem[]>('/admin/pick-user/list', params);
}

/**
 * 添加
 * @param params
 * @returns any
 */
export async function createApi(params: any) {
  return requestClient.post<any>('/admin/pick-user/create', params);
}

/**
 * 编辑
 * @param params
 * @returns any
 */
export async function updateApi(params: any) {
  return requestClient.post<any>('/admin/pick-user/update', params);
}

/**
 * 删除
 * @param params
 * @returns any
 */
export async function deleteApi(params: any) {
  return requestClient.post<any>('/admin/pick-user/delete', params);
}

/**
 * 详情
 * @param params
 * @returns any
 */
export async function detailApi(params: any) {
  return requestClient.post<any>('/admin/pick-user/detail', params);
}
