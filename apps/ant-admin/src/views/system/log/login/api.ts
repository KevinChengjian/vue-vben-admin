import type { LogLoginItem } from './type';

import { requestClient } from '#/api/request';

/**
 * 列表
 * @param params any
 * @returns ListResult
 */
export async function logLoginApi(params: any = {}) {
  return requestClient.post<LogLoginItem[]>('/admin/log/login', params);
}
