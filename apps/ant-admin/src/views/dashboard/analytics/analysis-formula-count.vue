<script lang="ts" setup>
import type { EchartsUIType } from '@vben/plugins/echarts';

import { nextTick, onMounted, ref } from 'vue';

import { EchartsUI, useEcharts } from '@vben/plugins/echarts';

import { Analysis } from '#/api/core/analysis';

const chartRef = ref<EchartsUIType>();
const { renderEcharts } = useEcharts(chartRef);

const result = ref<any>();
onMounted(async () => {
  result.value = await Analysis.formulaCountApi();
  nextTick(() => {
    renderEcharts({
      color: [
        '#4582F7',
        '#68D6C4',
        '#FF6B6B', // 鲜红色
        '#4ECDC4', // 青蓝色
        '#FFD166', // 明黄色
        '#F78C6B', // 橙红色
        '#06D6A0', // 荧光绿
        '#9B5DE5', // 薰衣草紫
        '#EF476F', // 玫粉色
      ],
      tooltip: {
        trigger: 'item',
      },
      legend: {
        show: false,
        left: 'center',
        bottom: '1%',
      },
      series: [
        {
          name: '配方占比',
          type: 'pie',
          radius: ['35%', '52%'],
          avoidLabelOverlap: false,
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold',
            },
          },
          data: result.value || [],
        },
      ],
    });
  });
});
</script>

<template>
  <EchartsUI height="260px" ref="chartRef" />
</template>
