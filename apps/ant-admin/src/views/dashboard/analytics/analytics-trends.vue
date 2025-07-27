<script lang="ts" setup>
import type { EchartsUIType } from '@vben/plugins/echarts';

import { nextTick, onMounted, ref } from 'vue';

import { EchartsUI, useEcharts } from '@vben/plugins/echarts';

import * as echarts from 'echarts';

import { Analysis } from '#/api/core/analysis';

const chartRef = ref<EchartsUIType>();
const { renderEcharts } = useEcharts(chartRef);

const result = ref<Analysis.fruitingNumResult>();
onMounted(async () => {
  result.value = await Analysis.fruitingNumApi();
  nextTick(() => {
    renderEcharts({
      color: ['#4682F3'],
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['出菇产量', 'A菇产量'],
      },
      grid: {
        left: '0%',
        right: '1%',
        bottom: '2%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: result.value?.names || [],
          axisTick: {
            show: false,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: '出菇产量',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0,
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(111, 210, 194)',
              },
              {
                offset: 1,
                color: 'rgb(255, 255, 255)',
              },
            ]),
          },
          emphasis: {
            focus: 'series',
          },
          data: result.value?.amount || [],
        },
        {
          name: 'A菇产量',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0,
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(70, 130, 243)',
              },
              {
                offset: 1,
                color: 'rgb(255, 255, 255)',
              },
            ]),
          },
          emphasis: {
            focus: 'series',
          },
          data: result.value?.aAmount || [],
        },
      ],
    });
  });
});
</script>

<template>
  <EchartsUI height="373px" ref="chartRef" />
</template>
