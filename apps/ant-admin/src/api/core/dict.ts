import { requestClient } from '#/api/request';

export namespace Dict {
  export enum KeyEnum {
    BAG_MACHINE = 'BAG_MACHINE',
    DEPT = 'DEPT',
    DEPT_TYPE = 'DEPT_TYPE',
    ENV_POINT = 'ENV_POINT',
    ENV_REGION = 'ENV_REGION',
    FORMULA = 'FORMULA',
    FRUITING_HOUSE = 'FRUITING_HOUSE',
    MATERIAL = 'MATERIAL',
    MATERIAL_MACHINE = 'MATERIAL_MACHINE',
    MATERIAL_SPEC = 'MATERIAL_SPEC',
    STATUS = 'STATUS',
    STERILIZER_CABINET = 'STERILIZER_CABINET',
    STRAIN_CAN_NO = 'STRAIN_CAN_NO',
    STRAIN_CATEGORY = 'STRAIN_CATEGORY',
    STRAIN_HOUSE = 'STRAIN_HOUSE',
    STRAIN_STATE = 'STRAIN_STATE',
    STRAIN_VARIED = 'STRAIN_VARIED',
    SYS_DEPT = 'SYS_DEPT',
    SYS_POSITION = 'SYS_POSITION',
    SYS_USER = 'SYS_USER',
    UNIT = 'UNIT',
    VACCINATION_TYPE = 'VACCINATION_TYPE',
  }

  export interface ValueItem {
    label: string;
    value: number | string;
    color: string;
    children?: ValueItem[];
    disabled?: boolean;
  }

  export interface KeyItem {
    code: string;
    name: string;
    values: ValueItem[];
  }

  export interface DictResult {
    version: number | string;
    list: KeyItem[];
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
    return requestClient.get<DictResult>('/admin/dictionary/value-all', params);
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
   * @returns any
   */
  export async function positionTreeApi(params: any = {}) {
    return requestClient.get<ValueItem[]>('/admin/position/tree', params);
  }

  /**
   * 获取全部部门
   *
   * @param params
   * @returns any
   */
  export async function deptTreeApi(params: any = {}) {
    return requestClient.get<ValueItem[]>('/admin/dpet/tree', params);
  }
}
