<script setup lang="ts">
import type { StateProps } from '#/api/core/device';

import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { deviceDataApi } from '#/api/core/device';

defineOptions({ customOptions: { name: 'DeviceState' } });

const props = withDefaults(defineProps<StateProps>(), {
  state: 0,
});

const data = ref<any>([]);
const handleDetail = async () => {
  data.value = await deviceDataApi({ warehouse_id: props.shId });
  if (data.value.empty) {
    message.error('设备数据获取失败');
  } else {
    modalApi.open();
  }
};

const [Modal, modalApi] = useVbenModal({
  footer: false,
});
</script>

<template>
  <div>
    <div v-if="props.state === 0">未知</div>
    <div @click="handleDetail" class="text-primary" v-if="props.state === 1">
      已连接
    </div>
    <div class="text-destructive" v-if="props.state === 2">已连接</div>
    <div class="text-destructive" v-if="props.state === 3">断开</div>

    <Modal class="w-[1000px]" title="设备状态">
      <div class="device-state">
        <div class="item" v-for="(item, index) in data?.current" :key="index">
          <div class="name">{{ item?.name }}：</div>
          <div
            class="value"
            :class="{
              btn: item.value === '已开启' || item.value === '已关闭',
              enable: item.value === '已开启',
            }"
          >
            {{ item?.value }} {{ item?.unit }}
            <span v-if="item.name === '①当前阶段' && item.value === '0'">
              （手动）
            </span>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<style lang="less">
.device-state {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  .item {
    padding: 4px 15px;
    width: 25%;
    display: flex;
    align-items: center;
    .name {
      text-align: left;
      font-weight: 400;
      font-size: 12px;
      color: #666;
      line-height: 17px;
      font-style: normal;
      margin-left: 10px;
      min-width: 81px;
    }
    .value {
      text-align: left;
      font-weight: 400;
      font-size: 14px;
      color: #333;
      line-height: 17px;
      font-style: normal;
      margin-left: 10px;
      .span {
        font-size: 14px;
        color: #333;
        line-height: 17px;
      }
    }
    .btn {
      background-color: hsl(var(--background-deep));
      padding: 3px 15px;
      border-radius: 20px;
      font-size: 12px;
    }

    .enable {
      background-color: hsl(var(--primary));
      color: #fff;
    }
  }
}
</style>
