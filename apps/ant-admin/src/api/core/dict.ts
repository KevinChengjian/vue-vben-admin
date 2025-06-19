import { requestClient } from '#/api/request';

export namespace Dict {
  export enum KeyEnum {
    DEPT = 'DEPT',
    DEPT_TYPE = 'DEPT_TYPE',
    MATERIAL = 'MATERIAL',
    MATERIAL_MACHINE = 'MATERIAL_MACHINE',
    MATERIAL_SPEC = 'MATERIAL_SPEC',
    STATUS = 'STATUS',
    SYS_DEPT = 'SYS_DEPT',
    SYS_POSITION = 'SYS_POSITION',
    SYS_USER = 'SYS_USER',
    UNIT = 'UNIT',
  }

  export interface ValueItem {
    label: string;
    value: string;
    color: string;
    children?: ValueItem[];
  }

  export interface KeyItem {
    code: string;
    name: string;
    values: ValueItem[];
  }

  export interface AddDictItemParams {
    label: string;
    code: KeyEnum;
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

  export async function addDictByCodeApi(params: AddDictItemParams) {
    return requestClient.post<any>(
      '/admin/dictionary/value-create-by-code',
      params,
    );
  }

  /**
   * 获取全部职务
   *
   * @param params
   * @returns
   */
  export async function positionTreeApi(params: any = {}) {
    return requestClient.get<ValueItem[]>('/admin/position/tree', params);
  }

  /**
   * 获取全部部门
   *
   * @param params
   * @returns
   */
  export async function deptTreeApi(params: any = {}) {
    return requestClient.get<ValueItem[]>('/admin/dpet/tree', params);
  }
}
