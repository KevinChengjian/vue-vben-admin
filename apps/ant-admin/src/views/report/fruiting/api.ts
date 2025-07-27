import { requestClient } from '#/api/request';

/**
 * 列表
 * @param params any
 * @returns ListResult
 */
export async function listApi(params: any = {}) {
  return requestClient.post<any>('/admin/report/fruiting-out', params);
}
