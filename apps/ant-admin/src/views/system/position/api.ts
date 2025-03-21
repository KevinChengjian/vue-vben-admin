import type { PositionItem } from './type';

import { requestClient } from '#/api/request';

/**
 * 操作权限标识
 */
export enum AuthCode {
  Create = 'admin.position.create',
  Delete = 'admin.position.delete',
  Update = 'admin.position.update',
}

/**
 * 列表
 * @param params any
 * @returns ListResult
 */
export async function positionListApi(params: any = {}) {
  return requestClient.post<PositionItem[]>('/admin/position/list', params);
}

/**
 * 添加职务
 * @param params
 * @returns any
 */
export async function positionCreateApi(params: any) {
  return requestClient.post<any>('/admin/position/create', params);
}

/**
 * 编辑职务
 * @param params
 * @returns any
 */
export async function positionUpdateApi(params: any) {
  return requestClient.post<any>('/admin/position/update', params);
}

/**
 * 删除职务
 * @param params
 * @returns any
 */
export async function positionDeleteApi(params: any) {
  return requestClient.post<any>('/admin/position/delete', params);
}
