import { requestClient } from '#/api/request';

/**
 * 职务列表
 * @param params
 * @returns any
 */
export async function positionListApi(params: any = null) {
  return requestClient.post<any>('/admin/position/list', params);
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
