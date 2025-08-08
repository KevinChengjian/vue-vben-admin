import type { ListItem } from './type';

import { requestClient } from '#/api/request';

/**
 * 操作权限标识
 */
export enum AuthCode {
  Create = 'admin.fruiting.create',
  Delete = 'admin.fruiting.delete',
  Detail = 'admin.fruiting.detail',
  SoldOut = 'admin.fruiting.sold-out',
  Update = 'admin.fruiting.update',
}

/**
 * 列表
 * @param params any
 * @returns ListResult
 */
export async function listApi(params: any = {}) {
  return requestClient.post<ListItem[]>('/admin/fruiting/list', params);
}

/**
 * 添加
 * @param params
 * @returns any
 */
export async function createApi(params: any) {
  return requestClient.post<any>('/admin/fruiting/create', params);
}

/**
 * 编辑
 * @param params
 * @returns any
 */
export async function updateApi(params: any) {
  return requestClient.post<any>('/admin/fruiting/update', params);
}

/**
 * 删除
 * @param params
 * @returns any
 */
export async function deleteApi(params: any) {
  return requestClient.post<any>('/admin/fruiting/delete', params);
}

/**
 * 详情
 * @param params
 * @returns any
 */
export async function detailApi(params: any) {
  return requestClient.post<any>('/admin/fruiting/detail', params);
}

/**
 * 详情
 * @param params
 * @returns any
 */
export async function soldOutApi(params: any) {
  return requestClient.post<any>('/admin/fruiting/sold-out', params);
}

/**
 * 总结
 * @param params
 * @returns any
 */
export async function summaryApi(params: any) {
  return requestClient.post<any>('/admin/fruiting/summary', params);
}

/**
 * 利润统计
 * @param params
 * @returns any
 */
export async function profitApi(params: any) {
  return requestClient.post<any>('/admin/fruiting/profit', params);
}

/** Config
 * 利润配置
 * @param params
 * @returns any
 */
export async function profitConfigApi(params: any) {
  return requestClient.post<any>('/admin/profit-config/store', params);
}
