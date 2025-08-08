import { requestClient } from '../request';

export namespace Analysis {
  export interface MakeBag {
    planNum?: number;
    makeNum?: number;
    lastMakeNum?: number;
    makeResult?: boolean;
    percent: number;
  }

  export interface Fruiting {
    total?: number;
    aTotal?: number;
    lastTotal?: number;
    lastATotal?: number;
    makeResult: boolean;
    rate: number;
  }

  export interface CardItem {
    total?: number;
    lastTotal?: number;
    makeResult: boolean;
    percent: number;
  }

  export interface Card {
    makeBag?: MakeBag;
    fruiting?: Fruiting;
    strainBag?: CardItem;
    vaccination?: CardItem;
  }

  export interface cultureNumResult {
    names: string[];
    putSeries: number[];
    outSeries: number[];
    blSeries: number[];
  }

  export interface fruitingNumResult {
    names: string[];
    amount: number[];
    aAmount: number[];
  }

  export interface fruitingProfitResult {
    names: string[];
    sale: number[];
    cost: number[];
    profit: number[];
  }

  /**
   * 卡片统计
   * @returns any
   */
  export async function cardApi() {
    return requestClient.get<Card>('/admin/analytics/card');
  }

  /**
   * 养菌房菌包统计
   * @returns any
   */
  export async function cultureNumApi() {
    return requestClient.get<cultureNumResult>('/admin/analytics/culture-num');
  }

  /**
   * 出菇统计
   * @returns any
   */
  export async function fruitingNumApi() {
    return requestClient.get<fruitingNumResult>(
      '/admin/analytics/fruiting-num',
    );
  }

  /**
   * 利润统计
   * @returns any
   */
  export async function fruitingProfitApi() {
    return requestClient.get<fruitingProfitResult>('/admin/analytics/profit');
  }

  /**
   * 出菇统计
   * @returns any
   */
  export async function strainGrowApi(params: any = {}) {
    return requestClient.post<{ names: string[]; series: any }>(
      '/admin/analytics/strain-grow',
      params,
    );
  }

  /**
   * 品种统计
   * @returns any
   */
  export async function varietyCountApi(params: any = {}) {
    return requestClient.post<any>('/admin/analytics/variety-count', params);
  }

  /**
   * 配方统计
   * @returns any
   */
  export async function formulaCountApi(params: any = {}) {
    return requestClient.post<any>('/admin/analytics/formula-count', params);
  }

  /**
   * 计划统计
   * @returns any
   */
  export async function planDateApi(params: any = {}) {
    return requestClient.post<any>('/admin/analytics/plan-date', params);
  }
}
