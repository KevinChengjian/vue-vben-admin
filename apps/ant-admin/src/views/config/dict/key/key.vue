<script setup lang="ts">
import type { DictKeyItem } from './type';

import { defineModel, onMounted, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { Button, Card, Input, Space } from 'ant-design-vue';

import { useDelete } from '#/hooks';

import { dictionaryKeyDeleteApi, dictionaryKeyListApi } from './api';
import { AuthCode } from './auth';
import StoreKeyModal from './storeModal.vue';

const dictKeyList = ref<DictKeyItem[]>([]);
const model = defineModel<DictKeyItem>('value', { default: () => {} });
const handleChangeDictKey = (e: DictKeyItem) => {
  model.value = e;
};

const dictKeyKeyword = ref<string>('');
const getDictKeyList = async () => {
  dictKeyList.value = await dictionaryKeyListApi({
    keyword: dictKeyKeyword.value,
  });
  if (dictKeyList.value.length > 0 && !model.value.id) {
    model.value = dictKeyList.value[0] as DictKeyItem;
  }
};

const [KeyModal, keyModalApi] = useVbenModal({
  connectedComponent: StoreKeyModal,
});

const handleEditDictKey = (item: any) => {
  keyModalApi.setData(item);
  keyModalApi.open();
};

const { destory } = useDelete<DictKeyItem>({
  api: dictionaryKeyDeleteApi,
  key: '字典',
  callback: () => {
    getDictKeyList();
  },
});

onMounted(() => {
  getDictKeyList();
});
</script>

<template>
  <Card
    :body-style="{ padding: '15px 24px 24px 24px' }"
    :bordered="false"
    class="h-full"
    title="字典管理"
  >
    <template #extra>
      <Button
        type="primary"
        v-access:code="AuthCode.Create"
        @click="keyModalApi.open()"
      >
        添加
      </Button>
    </template>

    <Input
      v-model:value="dictKeyKeyword"
      :allow-clear="true"
      placeholder="字典名称/编码"
      @press-enter="getDictKeyList"
    >
      <template #suffix>
        <span class="icon-[ant-design--search-outlined]"></span>
      </template>
    </Input>

    <div class="dict-list-wrap">
      <div
        v-for="item in dictKeyList"
        :key="item.id"
        :class="{ active: item.id === model?.id }"
        class="dict-item"
        @click="handleChangeDictKey(item)"
      >
        <div class="name">
          {{ item.name }}<span>({{ item.num || 0 }})</span>
        </div>
        <div class="action">
          <Space :size="15">
            <div
              class="text-primary cursor-pointer"
              v-access:code="AuthCode.Update"
              @click="handleEditDictKey(item)"
            >
              编辑
            </div>
            <div
              class="text-destructive cursor-pointer"
              v-access:code="AuthCode.Delete"
              @click.stop="destory({ id: item.id }, item)"
            >
              删除
            </div>
          </Space>
        </div>
      </div>
    </div>
  </Card>

  <KeyModal @reload="getDictKeyList" />
</template>

<style scoped lang="scss">
.dict-list-wrap {
  margin-top: 15px;

  .dict-item {
    display: flex;
    justify-content: space-between;
    margin-top: 8px;

    .name {
      flex: 1;
      cursor: pointer;

      span {
        margin-left: 8px;
        user-select: none;
      }
    }

    .action {
      display: flex;
      flex-shrink: 0;
      align-items: center;
      font-size: 12px;
      user-select: none;
    }
  }

  .active {
    .name {
      color: hsl(var(--primary));
    }
  }
}
</style>
