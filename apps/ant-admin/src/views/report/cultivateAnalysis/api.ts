import { requestClient } from '#/api/request';

/**
 * 操作权限标识
 */
export enum AuthCode {
  Create = 'admin.report.create',
  Delete = 'admin.report.delete',
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
