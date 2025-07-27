<script lang="ts" setup>
import type { EchartsUIType } from '@vben/plugins/echarts';

import { nextTick, onMounted, ref } from 'vue';

import { EchartsUI, useEcharts } from '@vben/plugins/echarts';

import { Analysis } from '#/api/core/analysis';

const chartRef = ref<EchartsUIType>();
const { renderEcharts } = useEcharts(chartRef);

const result = ref<Analysis.cultureNumResult>();
onMounted(async () => {
  result.value = await Analysis.cultureNumApi();
  nextTick(() => {
    renderEcharts({
      color: [
        '#4582F7',
        '#68D6C4',
        // 'rgba(255, 193, 104, 0.8)', // 琥珀色
      ],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {},
      grid: {
        left: '1%',
        right: '1%',
        bottom: '2%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: result.value?.names || [],
        axisTick: {
          show: false,
        },
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: '入库数量',
          type: 'bar',
          stack: 'total',
          label: {
            show: false,
          },
          barMaxWidth: 20,
          emphasis: {
            focus: 'series',
          },
          data: result.value?.putSeries || [],
        },
        // {
        //   name: '出库数量',
        //   type: 'bar',
        //   stack: 'total',
        //   label: {
        //     show: false,
        //   },
        //   barMaxWidth: 20,
        //   emphasis: {
        //     focus: 'series',
        //   },
        //   data: result.value?.outSeries || [],
        // },
        {
          name: '剩余数量',
          type: 'bar',
          stack: 'total',
          label: {
            show: false,
          },
          barWidth: 20,
          emphasis: {
            focus: 'series',
          },
          data: result.value?.blSeries || [],
        },
      ],
    });
  });
});
</script>

<template>
  <EchartsUI height="400px" ref="chartRef" />
</template>
