import { requestClient } from '../request';

export async function deviceInfoApi(params: any = {}) {
  return requestClient.post<any>('/admin/device/detail', params);
}
