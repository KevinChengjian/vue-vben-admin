<script lang="ts" setup>
import type { EchartsUIType } from '@vben/plugins/echarts';

import { nextTick, onMounted, ref } from 'vue';

import { EchartsUI, useEcharts } from '@vben/plugins/echarts';

import { lineChatApi } from './api';

const props = defineProps<{ mbSn?: string }>();
const chartRef = ref<EchartsUIType>();
const { renderEcharts } = useEcharts(chartRef);

onMounted(async () => {
  if (!props.mbSn) return;
  const result = await lineChatApi({ mb_sn: props.mbSn });
  nextTick(() => {
    renderEcharts({
      color: [
        // 'rgba(86, 119, 252, 0.8)', // 蓝紫色
        // 'rgba(96, 189, 219, 0.8)', // 天蓝色
        'rgba(88, 217, 178, 0.8)', // 青绿色
        // 'rgba(255, 193, 104, 0.8)', // 琥珀色
        // 'rgba(255, 140, 148, 0.8)', // 粉红色
      ],
      tooltip: {
        show: true,
        trigger: 'axis',
      },
      legend: {
        data: result.names || [],
      },
      grid: {
        left: '0%',
        right: '0.6%',
        bottom: '2%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: result.x || [],
        },
      ],
      yAxis: [
        {
          type: 'category',
          data: result.y || [],
        },
      ],
      series: result.d,
    });
  });
});
</script>

<template>
  <EchartsUI height="360px" ref="chartRef" />
</template>
