import type { DictKeyItem } from './type';

import { requestClient } from '#/api/request';

/**
 * 菜单列表
 * @param params
 * @returns any
 */
export async function dictionaryKeyListApi(params: any = null) {
  return requestClient.post<DictKeyItem[]>(
    '/admin/dictionary/key-list',
    params,
  );
}

/**
 * 添加菜单
 * @param params
 * @returns any
 */
export async function dictionaryKeyCreateApi(params: any) {
  return requestClient.post<any>('/admin/dictionary/key-create', params);
}

/**
 * 编辑菜单s
 * @param params
 * @returns any
 */
export async function dictionaryKeyUpdateApi(params: any) {
  return requestClient.post<any>('/admin/dictionary/key-update', params);
}

/**
 * 删除菜单
 * @param params
 * @returns any
 */
export async function dictionaryKeyDeleteApi(params: any) {
  return requestClient.post<any>('/admin/dictionary/key-delete', params);
}
