import { requestClient } from '#/api/request';

export namespace DictResApi {
  export interface ValueItem {
    label: string;
    value: string;
    color: string;
  }

  export interface KeyItem {
    code: string;
    name: string;
    values: ValueItem[];
  }
}

/**
 * 获取字典列表
 *
 * @param params
 * @return
 */
export async function DictApi(params: any = {}) {
  return requestClient.get<DictResApi.KeyItem[]>(
    '/admin/dictionary/value-all',
    params,
  );
}
