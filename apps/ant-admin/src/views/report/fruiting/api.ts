import { requestClient } from '#/api/request';

/**
 * 操作权限标识
 */
export enum AuthCode {
  Export = 'admin.report.fruiting-out-export',
  List = 'admin.report.fruiting-out',
}

/**
 * 列表
 * @param params any
 * @returns ListResult
 */
export async function listApi(params: any = {}) {
  return requestClient.post<any>('/admin/report/fruiting-out', params);
}

/**
 * 导出
 * @param params any
 * @returns ListResult
 */
export async function exportApi(params: any = {}) {
  return requestClient.post<any>('/admin/report/fruiting-out-export', params);
}
