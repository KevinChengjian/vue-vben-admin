import { ref } from 'vue';

import { defineStore } from 'pinia';

import { Dict } from '#/api';

export const useDictStore = defineStore('dict', () => {
  const dictList = ref<Dict.KeyItem[]>([] as Dict.KeyItem[]);
  const dictMap: Map<string, Dict.ValueItem[]> = new Map();
  const loading = ref<boolean>(false);
  const resolveQueue = ref<{ dk: Dict.KeyEnum; reject: any; resolve: any }[]>(
    [],
  );

  async function fetch() {
    dictList.value = await Dict.listApi();
  }

  async function getDictByKey(
    dk: Dict.KeyEnum,
    force: boolean = false,
  ): Promise<Dict.ValueItem[]> {
    return new Promise<Dict.ValueItem[]>((resolve, reject) => {
      if (!force && dictList.value.length > 0) {
        return resolve(dictMap.get(dk) || []);
      }

      if (loading.value) {
        resolveQueue.value.push({ resolve, reject, dk });
      }

      if (!loading.value) {
        loading.value = true;
        Dict.listApi()
          .then((res) => {
            loading.value = false;

            dictList.value = res || [];
            dictList.value.forEach((item: Dict.KeyItem) => {
              dictMap.set(item.code, item.values);
            });

            resolve(dictMap.get(dk) || []);
            resolveQueue.value.forEach((item) => {
              item.resolve(dictMap.get(item.dk) || []);
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

  const addDictItem = async (params: Dict.AddDictItemParams) => {
    await Dict.addDictByCodeApi(params);
  };

  function $reset() {
    loading.value = false;
  }

  return { fetch, getDictByKey, addDictItem, $reset };
});
