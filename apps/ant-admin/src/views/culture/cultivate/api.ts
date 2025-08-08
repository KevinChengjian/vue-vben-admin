import type { ListItem } from './type';

import { requestClient } from '#/api/request';

/**
 * 操作权限标识
 */
export enum AuthCode {
  Create = 'admin.cultivate.create',
  Delete = 'admin.cultivate.delete',
  Detail = 'admin.cultivate.Detail',
  Out = 'admin.cultivate.out',
  OutDelete = 'admin.cultivate.out-delete',
  OutList = 'admin.cultivate.out-list',
  OutUpdate = 'admin.cultivate.out-update',
  Patrol = 'admin.culture-patrol.list',
  Update = 'admin.cultivate.update',
}

/**
 * 列表
 * @param params any
 * @returns ListResult
 */
export async function listApi(params: any = {}) {
  return requestClient.post<ListItem[]>('/admin/cultivate/list', params);
}

/**
 * 添加
 * @param params
 * @returns any
 */
export async function createApi(params: any) {
  return requestClient.post<any>('/admin/cultivate/create', params);
}

/**
 * 编辑
 * @param params
 * @returns any
 */
export async function updateApi(params: any) {
  return requestClient.post<any>('/admin/cultivate/update', params);
}

/**
 * 删除
 * @param params
 * @returns any
 */
export async function deleteApi(params: any) {
  return requestClient.post<any>('/admin/cultivate/delete', params);
}

/**
 * 详情
 * @param params
 * @returns any
 */
export async function detailApi(params: any) {
  return requestClient.post<any>('/admin/cultivate/detail', params);
}

/**
 * 出库
 * @param params
 * @returns any
 */
export async function outApi(params: any) {
  return requestClient.post<any>('/admin/cultivate/out', params);
}

/**
 * 出库
 * @param params
 * @returns any
 */
export async function outListApi(params: any) {
  return requestClient.post<any>('/admin/cultivate/out-list', params);
}

/**
 * 出库
 * @param params
 * @returns any
 */
export async function outDeleteApi(params: any) {
  return requestClient.post<any>('/admin/cultivate/out-delete', params);
}

/**
 * 出库
 * @param params
 * @returns any
 */
export async function outUpdateApi(params: any) {
  return requestClient.post<any>('/admin/cultivate/out-update', params);
}

/**
 * 出库
 * @param params
 * @returns any
 */
export async function lineChatApi(params: any) {
  return requestClient.post<{
    d: string[];
    names: string[];
    x: string[];
    y: string[];
  }>('/admin/cultivate/line-chat', params);
}
