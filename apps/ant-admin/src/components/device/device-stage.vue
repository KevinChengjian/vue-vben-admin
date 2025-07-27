<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';

import { deviceDataStageApi } from '#/api/core/device';

interface DeviceProps {
  id?: string;
  type: number | string;
}

const props = defineProps<DeviceProps>();
const data = ref<any>([]);

watch(
  () => props.id,
  async (n) => {
    data.value = await deviceDataStageApi({
      warehouse_id: n,
      type: props.type,
    });
  },
);
onMounted(async () => {
  data.value = await deviceDataStageApi({
    warehouse_id: props.id,
    type: props.type,
  });
});
</script>

<template>
  <div class="device">
    <div class="header ml-[7%]">
      <div class="dh-item"><div class="header-item">湿度(%RH)</div></div>
      <div class="dh-item"><div class="header-item">灯光(分)</div></div>
      <div class="dh-item"><div class="header-item">内循环(分)</div></div>
      <div class="dh-item"><div class="header-item">CO₂(PPM)</div></div>
      <div class="dh-item"><div class="header-item">温度(℃)</div></div>
      <div class="dh-item">
        <div class="header-item">时长({{ data?.scUnit || '分' }})</div>
      </div>
    </div>
    <div class="rows flex items-center">
      <div class="item">手动出菇</div>
      <div class="item title">设定</div>
      <div class="item title">计时</div>
      <div class="item title">模式</div>
      <div class="item title">设定</div>
      <div class="item title">上线</div>
      <div class="item title">下限</div>
      <div class="item title">运行</div>
      <div class="item title">停止</div>
      <div class="item title">运行</div>
      <div class="item title">停止</div>
      <div class="item title">上线</div>
      <div class="item title">下限</div>
    </div>
    <div
      class="rows flex items-center"
      v-for="(item, index) in data?.state"
      :key="index"
    >
      <div class="item">{{ item.jd }}</div>
      <div class="item num">{{ item.sc }}</div>
      <div class="item num">{{ item.scjs }}</div>
      <div class="item num">{{ item.wdms }}</div>
      <div class="item num">{{ item.wdsd }}</div>
      <div class="item num">{{ item.max_co }}</div>
      <div class="item num">{{ item.min_co }}</div>
      <div class="item num">{{ item.nxh_yx }}</div>
      <div class="item num">{{ item.nxh_tz }}</div>
      <div class="item num">{{ item.dg_yx }}</div>
      <div class="item num">{{ item.dg_tz }}</div>
      <div class="item num">{{ item.max_sd }}</div>
      <div class="item num">{{ item.min_sd }}</div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.device {
  display: inline-block;
  padding: 15px;
  .header {
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    .dh-item {
      min-width: 120px;
      flex: 1;
      margin: 0 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      .header-item {
        min-width: 120px;
        height: 30px;
        line-height: 28px;
        text-align: center;
        background: linear-gradient(to top, #24435f, #0c202f);
        color: #fff;
        border-top: 1px solid #4e5960;
        border-bottom: 1px solid #4e5960;
        font-size: 16px;
        border-radius: 3px;
      }
    }
  }
  .rows {
    .item {
      margin: 2px 5px;
      min-width: 70px;
      flex: 1;
      height: 30px;
      line-height: 30px;
      text-align: center;
      background: linear-gradient(to top, #24435f, #0c202f);
      color: #fff;
      border-top: 1px solid #4e5960;
      border-bottom: 1px solid #4e5960;
      font-size: 16px;
      border-radius: 3px;
    }

    .title {
      color: #06bfc2;
    }

    .num {
      font-size: 18px;
      font-weight: 600;
    }
  }
}
</style>
