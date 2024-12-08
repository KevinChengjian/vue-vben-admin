import type { DeptItem } from './dept.type';

import { requestClient } from '#/api/request';

/**
 * 操作权限标识
 */
export enum AuthCode {
  Add = 'create',
  Delete = 'detlet',
  Edit = 'update',
}

/**
 * 列表
 * @param params any
 * @returns ListResult
 */
export async function DeptListApi(params: any = {}) {
  return requestClient.post<DeptItem[]>('/admin/dept/list', params);
}
