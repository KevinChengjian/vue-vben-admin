import type { DeptItem } from './dept.type';

import { requestClient } from '#/api/request';

/**
 * 操作权限标识
 */
export enum AuthCode {
  Create = 'admin.dept.create',
  Delete = 'admin.dept.delete',
  Update = 'admin.dept.update',
}

/**
 * 列表
 * @param params any
 * @returns ListResult
 */
export async function deptListApi(params: any = {}) {
  return requestClient.post<DeptItem[]>('/admin/dept/list', params);
}

/**
 * 添加部门
 * @param params
 * @returns any
 */
export async function deptCreateApi(params: any) {
  return requestClient.post<any>('/admin/dept/create', params);
}

/**
 * 编辑部门
 * @param params
 * @returns any
 */
export async function deptUpdateApi(params: any) {
  return requestClient.post<any>('/admin/dept/update', params);
}

/**
 * 删除部门
 * @param params
 * @returns any
 */
export async function deptDeleteApi(params: any) {
  return requestClient.post<any>('/admin/dept/delete', params);
}
