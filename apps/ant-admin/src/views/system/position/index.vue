<script setup lang="ts">
import type { PositionItem } from './type';

import { onMounted, ref } from 'vue';

import { Page, useVbenModal, VbenButton } from '@vben/common-ui';

import { Card, Input, Table } from 'ant-design-vue';

import { Dict } from '#/api';
import DictLabel from '#/components/dict/dict-label.vue';
import { useDelete } from '#/hooks';

import { AuthCode, positionDeleteApi, positionListApi } from './api';
import { PositionColumn } from './columns';
import positionStoreModal from './storeModal.vue';

const positionList = ref<PositionItem[]>([]);
const positionKeyword = ref<string>('');
const getPositionList = async () => {
  positionList.value = await positionListApi({
    keyword: positionKeyword.value,
  });
};

const [StoreModal, storeModalApi] = useVbenModal({
  connectedComponent: positionStoreModal,
});

const handleStorePosition = (item: any = {}, edit: boolean = false) => {
  storeModalApi.setData({
    positionTreeList: positionList.value,
    isEdit: edit,
    record: item,
  });
  storeModalApi.open();
};

const { destory } = useDelete<PositionItem>({
  api: positionDeleteApi,
  callback: () => {
    getPositionList();
  },
});

onMounted(() => {
  getPositionList();
});
</script>

<template>
  <Page class="h-full">
    <Card
      :body-style="{ padding: '15px' }"
      :bordered="false"
      :title="false"
      class="h-full"
    >
      <div class="flex justify-between">
        <div>
          <VbenButton
            v-access:code="AuthCode.Create"
            class="pl-[15px] pr-[15px] text-[14px]"
            size="sm"
            @click="handleStorePosition"
          >
            <span
              class="icon-[ant-design--plus-outlined] mr-[1px] text-[#fff]"
            ></span>
            新增职务
          </VbenButton>
        </div>
        <div>
          <Input
            v-model:value="positionKeyword"
            :allow-clear="true"
            placeholder="职务名称/编码"
            @press-enter="getPositionList"
          >
            <template #suffix>
              <span class="icon-[ant-design--search-outlined]"></span>
            </template>
          </Input>
        </div>
      </div>

      <Table
        v-if="positionList.length > 0"
        :default-expand-all-rows="true"
        :columns="PositionColumn"
        :data-source="positionList"
        :pagination="false"
        class="mt-[16px]"
        row-key="id"
        size="middle"
      >
        <template #bodyCell="{ column, record }">
          <DictLabel
            v-if="column.dataIndex === 'status'"
            :code="Dict.KeyEnum.STATUS"
            :value="record.status"
          />

          <template v-if="column.dataIndex === 'action'">
            <div class="flex items-center justify-center text-[12px]">
              <div
                class="text-primary cursor-pointer"
                v-access:code="AuthCode.Update"
                @click="handleStorePosition(record, true)"
              >
                编辑
              </div>
              <div
                class="text-primary ml-[15px] cursor-pointer"
                v-access:code="AuthCode.Create"
                @click="handleStorePosition({ pid: record.id })"
              >
                添加下级
              </div>
              <div
                class="text-destructive ml-[15px] cursor-pointer"
                v-access:code="AuthCode.Delete"
                @click="destory({ id: record.id })"
              >
                删除
              </div>
            </div>
          </template>
        </template>
      </Table>

      <Table v-else :columns="PositionColumn" class="mt-[16px]" size="middle" />
    </Card>

    <StoreModal @reload="getPositionList" />
  </Page>
</template>
