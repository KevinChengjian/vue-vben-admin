import type { ListItem } from './type';

import { requestClient } from '#/api/request';

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
