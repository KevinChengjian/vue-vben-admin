import { requestClient } from '#/api/request';

/**
 * 菜单列表
 * @param params
 * @returns any
 */
export async function menuListApi(params: any = null) {
  return requestClient.post<any>('/admin/menu/list', params);
}

/**
 * 添加菜单
 * @param params
 * @returns any
 */
export async function menuCreateApi(params: any) {
  return requestClient.post<any>('/admin/menu/create', params);
}

/**
 * 编辑菜单
 * @param params
 * @returns any
 */
export async function menuUpdateApi(params: any) {
  return requestClient.post<any>('/admin/menu/update', params);
}

/**
 * 删除菜单
 * @param params
 * @returns any
 */
export async function menuDeleteApi(params: any) {
  return requestClient.post<any>('/admin/menu/delete', params);
}

/**
 * 路由列表
 * @returns any
 */
export async function menuRouterApi() {
  return requestClient.post<any>('/admin/menu/router');
}

/**
 * 绑定操作权限
 * @param params
 * @returns any
 */
export async function menuBindApi(params: any) {
  return requestClient.post<any>('/admin/menu/bind', params);
}
