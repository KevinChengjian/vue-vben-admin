import type { ListItem } from './type';

import { requestClient } from '#/api/request';

/**
 * 操作权限标识
 */
export enum AuthCode {
  Create = 'admin.vaccination-record.create',
  Delete = 'admin.vaccination-record.delete',
  Update = 'admin.vaccination-record.update',
}

/**
 * 列表
 * @param params any
 * @returns ListResult
 */
export async function listApi(params: any = {}) {
  return requestClient.post<ListItem[]>(
    '/admin/vaccination-record/list',
    params,
  );
}

/**
 * 添加
 * @param params
 * @returns any
 */
export async function createApi(params: any) {
  return requestClient.post<any>('/admin/vaccination-record/create', params);
}

/**
 * 编辑
 * @param params
 * @returns any
 */
export async function updateApi(params: any) {
  return requestClient.post<any>('/admin/vaccination-record/update', params);
}

/**
 * 删除
 * @param params
 * @returns any
 */
export async function deleteApi(params: any) {
  return requestClient.post<any>('/admin/vaccination-record/delete', params);
}

/**
 * 详情
 * @param params
 * @returns any
 */
export async function detailApi(params: any) {
  return requestClient.post<any>('/admin/vaccination-record/detail', params);
}

/**
 * 详情
 * @param params
 * @returns any
 */
export async function canNoApi(params: any) {
  return requestClient.post<any>('/admin/strain-identification/canNo', params);
}
