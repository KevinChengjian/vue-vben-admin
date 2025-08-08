<script lang="ts" setup>
import type { EchartsUIType } from '@vben/plugins/echarts';

import { nextTick, onMounted, ref } from 'vue';

import { EchartsUI, useEcharts } from '@vben/plugins/echarts';

import { Col, Row } from 'ant-design-vue';
import * as echarts from 'echarts';

import { Analysis } from '#/api/core/analysis';

const chartRef = ref<EchartsUIType>();
const { renderEcharts } = useEcharts(chartRef);

const result = ref<Analysis.fruitingProfitResult>();
onMounted(async () => {
  result.value = await Analysis.fruitingProfitApi();
  nextTick(() => {
    renderEcharts({
      color: ['#4682F3'],
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['销售额', '成本', '利润'],
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
          name: '销售额',
          type: 'line',
          stack: '销售额',
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
          data: result.value?.sale || [],
        },
        {
          name: '成本',
          type: 'line',
          stack: '成本',
          smooth: true,
          lineStyle: {
            width: 0,
          },
          showSymbol: false,
          areaStyle: {
            opacity: 1,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(104, 214, 196)',
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
          data: result.value?.cost || [],
        },
        {
          name: '利润',
          type: 'line',
          stack: '利润',
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
                color: 'rgb(250, 200, 80)',
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
          data: result.value?.profit || [],
        },
      ],
    });
  });
});
</script>

<template>
  <Row :gutter="0" class="mt-[15px]">
    <Col :span="24" class="card">
      <div class="align-center flex justify-between">
        <div class="title">利润统计</div>
        <div class="w-[240px]">
          <!-- <DictSelect
            class="w-full"
            :code="Dict.KeyEnum.STRAIN_HOUSE"
            placeholder="请选择养菌房"
            @change="handleChange"
            mode="multiple"
            :show-search="true"
            v-model:value="houseId"
            allow-clear
          /> -->
        </div>
      </div>
      <EchartsUI height="400px" ref="chartRef" />
    </Col>
  </Row>
</template>

<style lang="less" scoped>
.card {
  background-color: hsl(var(--background));
  box-shadow: 0px 1px 10px 5px rgba(232, 233, 234, 0.44);
  border-radius: 3px;
  padding: 18px 20px;

  .title {
    font-weight: 500;
    font-size: 16px;
    color: #333333;
    line-height: 22px;
    text-align: left;
    font-style: normal;
    display: flex;
    align-items: center;
  }

  .gn {
    background-color: rgba(0, 107, 230, 0.9);
    border-radius: 3px;
    margin-right: 5px;
  }
}
</style>
