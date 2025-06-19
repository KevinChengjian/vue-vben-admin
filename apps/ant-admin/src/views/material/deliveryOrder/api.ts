import type { MaterialInItem } from './type';

import { requestClient } from '#/api/request';

/**
 * 操作权限标识
 */
export enum AuthCode {
  Create = 'admin.material-out.create',
  Delete = 'admin.material-out.delete',
  Update = 'admin.material-out.update',
}

/**
 * 列表
 * @param params any
 * @returns ListResult
 */
export async function listApi(params: any = {}) {
  return requestClient.post<MaterialInItem[]>(
    '/admin/material-out/list',
    params,
  );
}

/**
 * 添加
 * @param params
 * @returns any
 */
export async function createApi(params: any) {
  return requestClient.post<any>('/admin/material-out/create', params);
}

/**
 * 编辑
 * @param params
 * @returns any
 */
export async function updateApi(params: any) {
  return requestClient.post<any>('/admin/material-out/update', params);
}

/**
 * 删除
 * @param params
 * @returns any
 */
export async function deleteApi(params: any) {
  return requestClient.post<any>('/admin/material-out/delete', params);
}

/**
 * 详情
 * @param params
 * @returns any
 */
export async function detailApi(params: any) {
  return requestClient.post<any>('/admin/material-out/detail', params);
}
