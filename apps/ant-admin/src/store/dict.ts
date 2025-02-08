import type { DictResApi } from '#/api';

import { ref } from 'vue';

import { defineStore } from 'pinia';

import { DictApi } from '#/api';

export enum DictKeyEnum {
  STATUS = 'STATUS',
}

export const useDictStore = defineStore('dict', () => {
  const dictList = ref<DictResApi.KeyItem[]>([] as DictResApi.KeyItem[]);
  const dictMap: Map<string, DictResApi.ValueItem[]> = new Map();
  const loading = ref<boolean>(false);
  const resolveQueue = ref<{ reject: any; resolve: any }[]>([]);

  async function fetch() {
    dictList.value = await DictApi();
  }

  async function getDictByKey(
    dk: DictKeyEnum,
  ): Promise<DictResApi.ValueItem[]> {
    return new Promise<DictResApi.ValueItem[]>((resolve, reject) => {
      if (dictList.value.length > 0) {
        return resolve(dictMap.get(dk) || []);
      }

      if (loading.value) {
        resolveQueue.value.push({ resolve, reject });
      }

      if (!loading.value) {
        loading.value = true;
        DictApi()
          .then((res) => {
            loading.value = false;

            dictList.value = res || [];
            dictList.value.forEach((item: DictResApi.KeyItem) => {
              dictMap.set(item.code, item.values);
            });

            resolve(dictMap.get(dk) || []);
            resolveQueue.value.forEach((item) => {
              item.resolve(dictMap.get(dk) || []);
            });
            resolveQueue.value = [];
          })
          .catch((error) => {
            loading.value = false;
            reject(error);
          });
      }
    });
  }

  return { fetch, getDictByKey };
});
