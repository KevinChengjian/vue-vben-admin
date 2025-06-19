import type { MaterialInItem } from './type';

import { requestClient } from '#/api/request';

/**
 * 操作权限标识
 */
export enum AuthCode {
  Create = 'admin.material-in.create',
  Delete = 'admin.material-in.delete',
  Update = 'admin.material-in.update',
}

/**
 * 列表
 * @param params any
 * @returns ListResult
 */
export async function materialInListApi(params: any = {}) {
  return requestClient.post<MaterialInItem[]>(
    '/admin/material-in/list',
    params,
  );
}

/**
 * 添加
 * @param params
 * @returns any
 */
export async function materialInCreateApi(params: any) {
  return requestClient.post<any>('/admin/material-in/create', params);
}

/**
 * 编辑
 * @param params
 * @returns any
 */
export async function materialInUpdateApi(params: any) {
  return requestClient.post<any>('/admin/material-in/update', params);
}

/**
 * 删除
 * @param params
 * @returns any
 */
export async function materialInDeleteApi(params: any) {
  return requestClient.post<any>('/admin/material-in/delete', params);
}

/**
 * 详情
 * @param params
 * @returns any
 */
export async function materialInDetailApi(params: any) {
  return requestClient.post<any>('/admin/material-in/detail', params);
}
