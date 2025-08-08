import type { ListItem } from './type';

import { requestClient } from '#/api/request';

/**
 * 操作权限标识
 */
export enum AuthCode {
  Create = 'admin.material-inventory.create',
  Delete = 'admin.material-inventory.delete',
  Import = 'admin.material-inventory.import',
  Refresh = 'admin.material-inventory.refresh',
}

/**
 * 列表
 * @param params any
 * @returns ListResult
 */
export async function listApi(params: any = {}) {
  return requestClient.post<ListItem[]>(
    '/admin/material-inventory/list',
    params,
  );
}

/**
 * 添加
 * @param params
 * @returns any
 */
export async function createApi(params: any) {
  return requestClient.post<any>('/admin/material-inventory/create', params);
}

/**
 * 编辑
 * @param params
 * @returns any
 */
export async function updateApi(params: any) {
  return requestClient.post<any>('/admin/material-inventory/update', params);
}

/**
 * 删除
 * @param params
 * @returns any
 */
export async function deleteApi(params: any) {
  return requestClient.post<any>('/admin/material-inventory/delete', params);
}

/**
 * 刷新
 * @returns any
 */
export async function refreshApi() {
  return requestClient.post<any>('/admin/material-inventory/refresh');
}

/**
 * 下载模板
 * @returns any
 */
export async function materialDownloadApi() {
  return requestClient.post<any>('/admin/material-inventory/download');
}
