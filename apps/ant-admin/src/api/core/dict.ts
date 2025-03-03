import { requestClient } from '#/api/request';

export namespace Dict {
  export enum KeyEnum {
    DEPT_TYPE = 'DEPT_TYPE',
    STATUS = 'STATUS',
  }

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

  /**
   * 获取字典列表
   *
   * @param params
   * @return
   */
  export async function listApi(params: any = {}) {
    return requestClient.get<KeyItem[]>('/admin/dictionary/value-all', params);
  }
}
