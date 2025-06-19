import type { FormulaItem } from './type';

import { requestClient } from '#/api/request';

/**
 * 操作权限标识
 */
export enum AuthCode {
  Create = 'admin.formula.create',
  Delete = 'admin.formula.delete',
  Detail = 'admin.formula.detail',
  Update = 'admin.formula.update',
}

/**
 * 列表
 * @param params any
 * @returns ListResult
 */
export async function formulaListApi(params: any = {}) {
  return requestClient.post<FormulaItem[]>('/admin/formula/list', params);
}

/**
 * 添加
 * @param params
 * @returns any
 */
export async function formulaCreateApi(params: any) {
  return requestClient.post<any>('/admin/formula/create', params);
}

/**
 * 编辑
 * @param params
 * @returns any
 */
export async function formulaUpdateApi(params: any) {
  return requestClient.post<any>('/admin/formula/update', params);
}

/**
 * 删除
 * @param params
 * @returns any
 */
export async function formulaDeleteApi(params: any) {
  return requestClient.post<any>('/admin/formula/delete', params);
}

/**
 * 详情
 * @param params
 * @returns any
 */
export async function formulaDetailApi(params: any) {
  return requestClient.post<any>('/admin/formula/detail', params);
}
