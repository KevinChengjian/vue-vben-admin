import type { FormulaItem } from './type';

import { requestClient } from '#/api/request';

/**
 * 操作权限标识
 */
export enum AuthCode {
  Create = 'admin.device.create',
  Delete = 'admin.device.delete',
  Detail = 'admin.device.detail',
  Update = 'admin.device.update',
}

/**
 * 列表
 * @param params any
 * @returns ListResult
 */
export async function deviceListApi(params: any = {}) {
  return requestClient.post<FormulaItem[]>('/admin/device/list', params);
}

/**
 * 添加
 * @param params
 * @returns any
 */
export async function deviceCreateApi(params: any) {
  return requestClient.post<any>('/admin/device/create', params);
}

/**
 * 编辑
 * @param params
 * @returns any
 */
export async function deviceUpdateApi(params: any) {
  return requestClient.post<any>('/admin/device/update', params);
}

/**
 * 删除
 * @param params
 * @returns any
 */
export async function deviceDeleteApi(params: any) {
  return requestClient.post<any>('/admin/device/delete', params);
}

/**
 * 详情
 * @param params
 * @returns any
 */
export async function deviceDetailApi(params: any) {
  return requestClient.post<any>('/admin/device/detail', params);
}

/**
 * 监控点列表
 * @param params
 * @returns any
 */
export async function deviceboxNodeApi(params: any) {
  return requestClient.post<any>('/admin/device/box-node', params);
}

/**
 * 监控点列表
 * @param params
 * @returns any
 */
export async function deviceboxNodeUpdateApi(params: any) {
  return requestClient.post<any>('/admin/device/update-box-node', params);
}
