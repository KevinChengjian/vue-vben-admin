<script lang="ts" setup>
import type { ListItem } from './type';

import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { useVbenDrawer } from '@vben/common-ui';

import { Descriptions, DescriptionsItem } from 'ant-design-vue';

import { Dict } from '#/api';
import { DictLabel } from '#/components';

import { detailApi } from './api';
import LineChart from './line-chart.vue';

const row = ref<ListItem>();
const detail = ref<any>();
const title = ref<string>('');
const [Drawer, drawerApi] = useVbenDrawer({
  footer: false,
  destroyOnClose: true,
  class: 'w-[70%]',
  contentClass: 'pl-[25px]',
  onOpenChange: async (isOpen: boolean) => {
    if (!isOpen) return;
    row.value = drawerApi.getData<ListItem>();
    title.value = row.value.mb_sn;
    detail.value = await detailApi({ id: row.value.id });
  },
});

// 巡查记录
const router = useRouter();
const handleJump = (url: string, params: any) => {
  router.push({ path: url, query: params });
};
</script>

<template>
  <Drawer :title="title">
    <Descriptions title="制包" size="small" v-if="detail?.detail?.source === 1">
      <template v-for="(item, key) in detail?.bl" :key="key">
        <DescriptionsItem label="制包编号">
          <div
            class="text-primary cursor-pointer"
            @click="
              handleJump('/bagging/substrateMixing', {
                make_bag_sn: item.make_bag_sn,
                formula_id: item.formula_id,
                title: item.make_bag_sn,
              })
            "
          >
            {{ item?.make_bag_sn }}
          </div>
        </DescriptionsItem>
        <DescriptionsItem label="配方名称">
          {{ item?.formula?.name }}
        </DescriptionsItem>
        <DescriptionsItem label="制包日期">
          {{ item?.make_at }}
        </DescriptionsItem>
      </template>
    </Descriptions>

    <Descriptions size="small" v-if="detail?.detail?.source === 1">
      <template v-for="(item, key) in detail?.zd" :key="key">
        <DescriptionsItem label="装袋机器">
          <DictLabel
            :code="Dict.KeyEnum.BAG_MACHINE"
            :value="item?.machine_id"
          />
        </DescriptionsItem>
        <DescriptionsItem label="装袋数量">{{ item?.num }}</DescriptionsItem>
        <DescriptionsItem label="装袋日期">
          {{ item?.bagging_at }}
        </DescriptionsItem>
      </template>
    </Descriptions>

    <Descriptions
      title="菌种"
      class="mt-[20px]"
      size="small"
      v-if="detail?.detail?.source === 1"
    >
      <template v-for="(item, index) in detail?.strain" :key="index">
        <DescriptionsItem label="菌种编号">
          <div
            class="text-primary cursor-pointer"
            @click="
              handleJump('/vaccination/strain', {
                strain_sn: item.strain_sn,
                title: item.strain_sn,
              })
            "
          >
            {{ item?.strain_sn }}
          </div>
        </DescriptionsItem>
        <DescriptionsItem label="灌号">
          <DictLabel :code="Dict.KeyEnum.STRAIN_CAN_NO" :value="item?.can_no" />
        </DescriptionsItem>
        <DescriptionsItem label="品种">
          <DictLabel
            :code="Dict.KeyEnum.STRAIN_CATEGORY"
            :value="item?.identify_variety_id || item?.variety_id"
          />
        </DescriptionsItem>
      </template>
    </Descriptions>

    <Descriptions
      title="接种"
      class="mt-[20px]"
      size="small"
      v-if="detail?.detail?.source === 1"
    >
      <template v-for="(item, index) in detail?.vr" :key="index">
        <DescriptionsItem label="菌包编号">
          {{ item?.mb_sn }}
        </DescriptionsItem>
        <DescriptionsItem label="制包编号">
          <div
            class="text-primary cursor-pointer"
            @click="
              handleJump('/bagging/substrateMixing', {
                make_bag_sn: item.make_bag_sn,
                formula_id: item.formula_id,
                title: item.make_bag_sn,
              })
            "
          >
            {{ item?.make_bag_sn }}
          </div>
        </DescriptionsItem>
        <DescriptionsItem label="菌种编号">
          <div
            class="text-primary cursor-pointer"
            @click="
              handleJump('/vaccination/strain', {
                strain_sn: item.strain_sn,
                title: item.strain_sn,
              })
            "
          >
            {{ item?.strain_sn }}
          </div>
        </DescriptionsItem>
        <DescriptionsItem label="接种日期">
          {{ item?.vaccination_at }}
        </DescriptionsItem>
        <DescriptionsItem label="品种">
          <DictLabel
            :code="Dict.KeyEnum.STRAIN_CATEGORY"
            :value="item?.variety_id"
          />
        </DescriptionsItem>
        <DescriptionsItem label="养菌房">
          <DictLabel
            :code="Dict.KeyEnum.STRAIN_HOUSE"
            :value="item?.warehouse_id"
          />
        </DescriptionsItem>
        <DescriptionsItem label="菌种数量">
          {{ parseFloat(item?.strain_num) }}ml
        </DescriptionsItem>
        <DescriptionsItem label="数量">
          {{ item?.num }}
        </DescriptionsItem>
        <DescriptionsItem label="破损量" class="mb-[20px]">
          {{ item?.breakage }}
        </DescriptionsItem>
      </template>
    </Descriptions>

    <Descriptions
      title="购买菌包信息"
      class="mt-[20px]"
      size="small"
      v-if="detail?.detail?.source === 2"
    >
      <DescriptionsItem label="菌包编号">
        <div
          class="text-primary cursor-pointer"
          @click="
            handleJump('/culture/purchase', {
              mb_sn: detail?.pr.mb_sn,
              title: detail?.pr.mb_sn,
            })
          "
        >
          {{ detail?.pr?.mb_sn }}
        </div>
      </DescriptionsItem>
      <DescriptionsItem label="制包日期">
        {{ detail?.pr?.make_at }}
      </DescriptionsItem>
      <DescriptionsItem label="接种日期">
        {{ detail?.pr?.vaccination_at }}
      </DescriptionsItem>
      <DescriptionsItem label="品种">
        <DictLabel
          :code="Dict.KeyEnum.STRAIN_CATEGORY"
          :value="detail?.pr?.variety_id"
        />
      </DescriptionsItem>
      <DescriptionsItem label="养菌房">
        <DictLabel
          :code="Dict.KeyEnum.STRAIN_HOUSE"
          :value="detail?.pr?.warehouse_id"
        />
      </DescriptionsItem>
      <DescriptionsItem label="菌龄">
        {{ detail?.pr?.strain_age }}
      </DescriptionsItem>
      <DescriptionsItem label="购买数量">
        {{ detail?.pr?.num }}
      </DescriptionsItem>
      <DescriptionsItem label="购买金额">
        {{ detail?.pr?.amount }}
      </DescriptionsItem>
      <DescriptionsItem label="库房位置">
        {{ detail?.pr?.location }}
      </DescriptionsItem>
      <DescriptionsItem label="购买来源">
        {{ detail?.pr?.source }}
      </DescriptionsItem>
      <DescriptionsItem label="备注">
        {{ detail?.pr?.remark }}
      </DescriptionsItem>
    </Descriptions>

    <Descriptions title="养菌" class="mt-[20px]" size="small">
      <DescriptionsItem label="养菌房">
        <DictLabel
          :code="Dict.KeyEnum.STRAIN_HOUSE"
          :value="detail?.detail?.warehouse_id"
        />
      </DescriptionsItem>
      <DescriptionsItem label="库房位置">
        {{ detail?.detail?.location }}
      </DescriptionsItem>
      <DescriptionsItem label="入库日期">
        {{ detail?.detail?.put_at }}
      </DescriptionsItem>
      <DescriptionsItem label="入库数量">
        {{ detail?.detail?.put_num }}
      </DescriptionsItem>
      <DescriptionsItem label="透壁">
        {{ detail?.detail?.tw }}
      </DescriptionsItem>
      <DescriptionsItem label="长满">
        {{ detail?.detail?.overgrow }}
      </DescriptionsItem>
      <DescriptionsItem label="菌龄">
        {{ detail?.detail?.strain_age }}
      </DescriptionsItem>
      <DescriptionsItem label="设备状态">
        {{ detail?.detail?.device_state }}
      </DescriptionsItem>
      <DescriptionsItem label="消毒">
        {{ detail?.detail?.sterilize }}
      </DescriptionsItem>
      <DescriptionsItem label="消毒">
        {{ detail?.detail?.sterilize }}
      </DescriptionsItem>
      <DescriptionsItem label="出库日期">
        {{ detail?.detail?.out_at }}
      </DescriptionsItem>
      <DescriptionsItem label="出库量">
        {{ detail?.detail?.out_num }}
      </DescriptionsItem>
    </Descriptions>

    <Descriptions title="生长趋势" class="mt-[20px]" />
    <LineChart :mb-sn="row?.mb_sn" />
  </Drawer>
</template>
