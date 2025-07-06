import type { ListItem } from './type';

import { requestClient } from '#/api/request';

/**
 * 操作权限标识
 */
export enum AuthCode {
  Create = 'admin.strain-identification.create',
  Delete = 'admin.strain-identification.delete',
  Update = 'admin.strain-identification.update',
}

/**
 * 列表
 * @param params any
 * @returns ListResult
 */
export async function listApi(params: any = {}) {
  return requestClient.post<ListItem[]>(
    '/admin/strain-identification/list',
    params,
  );
}

/**
 * 添加
 * @param params
 * @returns any
 */
export async function createApi(params: any) {
  return requestClient.post<any>('/admin/strain-identification/create', params);
}

/**
 * 编辑
 * @param params
 * @returns any
 */
export async function updateApi(params: any) {
  return requestClient.post<any>('/admin/strain-identification/update', params);
}

/**
 * 删除
 * @param params
 * @returns any
 */
export async function deleteApi(params: any) {
  return requestClient.post<any>('/admin/strain-identification/delete', params);
}

/**
 * 详情
 * @param params
 * @returns any
 */
export async function detailApi(params: any) {
  return requestClient.post<any>('/admin/strain-identification/detail', params);
}

/**
 * 菌种观察记录
 * @param params
 * @returns any
 */
export async function strainPatrolListApi(params: any) {
  return requestClient.post<any>('/admin/strain-patrol/authenticate', params);
}
