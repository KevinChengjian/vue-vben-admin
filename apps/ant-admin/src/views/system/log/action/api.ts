import type { LogActionItem } from './type';

import { requestClient } from '#/api/request';

/**
 * 列表
 * @param params any
 * @returns ListResult
 */
export async function logActionApi(params: any = {}) {
  return requestClient.post<LogActionItem[]>('/admin/log/action', params);
}
