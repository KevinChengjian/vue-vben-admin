import type { ListItem } from './type';

import { requestClient } from '#/api/request';

/**
 * 操作权限标识
 */
export enum AuthCode {
  Export = 'admin.report.composite-export',
}

/**
 * 列表
 * @param params any
 * @returns ListResult
 */
export async function listApi(params: any = {}) {
  return requestClient.post<ListItem[]>(
    '/admin/report/composite-analysis',
    params,
  );
}

/**
 * 导出
 * @param params any
 * @returns ListResult
 */
export async function exportApi(params: any = {}) {
  return requestClient.post<any>('/admin/report/composite-export', params);
}
