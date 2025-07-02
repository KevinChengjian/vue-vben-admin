import type { ListItem } from './type';

import { requestClient } from '#/api/request';

/**
 * 操作权限标识
 */
export enum AuthCode {
  Create = 'admin.sterilization-inspection.create',
  Delete = 'admin.sterilization-inspection.delete',
  Update = 'admin.sterilization-inspection.update',
}

/**
 * 列表
 * @param params any
 * @returns ListResult
 */
export async function listApi(params: any = {}) {
  return requestClient.post<ListItem[]>(
    '/admin/sterilization-inspection/list',
    params,
  );
}

/**
 * 添加
 * @param params
 * @returns any
 */
export async function createApi(params: any) {
  return requestClient.post<any>(
    '/admin/sterilization-inspection/create',
    params,
  );
}

/**
 * 编辑
 * @param params
 * @returns any
 */
export async function updateApi(params: any) {
  return requestClient.post<any>(
    '/admin/sterilization-inspection/update',
    params,
  );
}

/**
 * 删除
 * @param params
 * @returns any
 */
export async function deleteApi(params: any) {
  return requestClient.post<any>(
    '/admin/sterilization-inspection/delete',
    params,
  );
}

/**
 * 详情
 * @param params
 * @returns any
 */
export async function detailApi(params: any) {
  return requestClient.post<any>(
    '/admin/sterilization-inspection/detail',
    params,
  );
}
