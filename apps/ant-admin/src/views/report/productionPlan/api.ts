import type { ListItem } from './type';

import { requestClient } from '#/api/request';

/**
 * 操作权限标识
 */
export enum AuthCode {
  Create = 'admin.production-plan.create',
  Delete = 'admin.production-plan.delete',
  Export = 'admin.production-plan.export',
  Plan = 'admin.production-plan.plan',
  Update = 'admin.production-plan.update',
}

/**
 * 列表
 * @param params any
 * @returns ListResult
 */
export async function listApi(params: any = {}) {
  return requestClient.post<ListItem[]>('/admin/production-plan/list', params);
}

/**
 * 批量添加计划
 * @param params
 * @returns any
 */
export async function planApi(params: any) {
  return requestClient.post<any>('/admin/production-plan/plan', params);
}

/**
 * 添加
 * @param params
 * @returns any
 */
export async function createApi(params: any) {
  return requestClient.post<any>('/admin/production-plan/create', params);
}

/**
 * 编辑
 * @param params
 * @returns any
 */
export async function updateApi(params: any) {
  return requestClient.post<any>('/admin/production-plan/update', params);
}

/**
 * 删除
 * @param params
 * @returns any
 */
export async function deleteApi(params: any) {
  return requestClient.post<any>('/admin/production-plan/delete', params);
}

/**
 * 详情
 * @param params
 * @returns any
 */
export async function detailApi(params: any) {
  return requestClient.post<any>('/admin/production-plan/detail', params);
}

/**
 * 导出
 * @param params
 * @returns any
 */
export async function exportApi(params: any) {
  return requestClient.post<any>('/admin/production-plan/export', params);
}
