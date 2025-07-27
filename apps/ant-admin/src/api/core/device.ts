import { requestClient } from '../request';

export interface StateProps {
  state?: number | string | undefined;
  shId?: number | string | undefined;
}

export async function deviceInfoApi(params: any = {}) {
  return requestClient.post<any>('/admin/device/detail', params);
}

export async function deviceDataApi(params: any = {}) {
  return requestClient.post<any>('/admin/device/data', params);
}

export async function deviceDataStageApi(params: any = {}) {
  return requestClient.post<any>('/admin/device/data-stage', params);
}

export async function deviceBoxNodeApi(params: any = {}) {
  return requestClient.post<any>('/admin/device/box-node', params);
}
