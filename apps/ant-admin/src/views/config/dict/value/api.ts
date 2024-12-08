import type { DictValueItem } from './value.type';

import { requestClient } from '#/api/request';

export enum AuthCode {
  Create = 'admin.dictionary.value-create',
  Delete = 'admin.dictionary.value-delete',
  Update = 'admin.dictionary.value-update',
}

/**
 * 菜单列表
 * @param params
 * @returns any
 */
export async function dictionaryValueListApi(params: any = null) {
  return requestClient.post<{ list: DictValueItem[]; total: number }>(
    '/admin/dictionary/value-list',
    params,
  );
}

/**
 * 添加菜单
 * @param params
 * @returns any
 */
export async function dictionaryValueCreateApi(params: any) {
  return requestClient.post<any>('/admin/dictionary/value-create', params);
}

/**
 * 编辑菜单
 * @param params
 * @returns any
 */
export async function dictionaryValueUpdateApi(params: any) {
  return requestClient.post<any>('/admin/dictionary/value-update', params);
}

/**
 * 删除菜单
 * @param params
 * @returns any
 */
export async function dictionaryValueDeleteApi(params: any) {
  return requestClient.post<any>('/admin/dictionary/value-delete', params);
}
