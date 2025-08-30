import { requestClient } from '#/api/request';

/**
 * 操作权限标识
 */
export enum AuthCode {
  Create = 'admin.report.create',
  Delete = 'admin.report.delete',
  Export = 'admin.report.strain-export',
  Update = 'admin.report.update',
}

/**
 * 列表
 * @param params any
 * @returns ListResult
 */
export async function listApi(params: any = {}) {
  return requestClient.post<{ list: any; sn: string[] }>(
    '/admin/report/strain',
    params,
  );
}

/**
 * 导出
 * @param params
 * @returns any
 */
export async function exportApi(params: any) {
  return requestClient.post<any>('/admin/report/strainexport', params);
}
