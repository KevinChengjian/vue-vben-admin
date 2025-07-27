<script lang="ts" setup>
import type { EchartsUIType } from '@vben/plugins/echarts';

import { nextTick, onMounted, ref } from 'vue';

import { EchartsUI, useEcharts } from '@vben/plugins/echarts';

import { Col, Row } from 'ant-design-vue';

import { Analysis } from '#/api/core/analysis';
import { Dict } from '#/api/core/dict';
import { DictSelect } from '#/components';

const chartRef = ref<EchartsUIType>();
const { renderEcharts } = useEcharts(chartRef);

const result = ref<any>();
const houseId = ref<string[]>([]);
const handleChange = async (e: string) => {
  renderChart({ warehouse_id: e });
};
const renderChart = async (params: any = {}) => {
  result.value = await Analysis.strainGrowApi(params);
  nextTick(() => {
    renderEcharts({
      color: [
        '#4582F7',
        'rgba(255, 193, 104, 0.8)', // 琥珀色
        '#68D6C4',
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
        data: result.value?.chartX || [],
        axisTick: {
          show: false,
        },
      },
      yAxis: {
        type: 'category',
        data: result.value?.chartY || [],
      },
      series: result.value?.series || [],
    });
  });
};
onMounted(async () => {
  renderChart();
});
</script>

<template>
  <Row :gutter="0" class="mt-[15px]">
    <Col :span="24" class="card">
      <div class="align-center flex justify-between">
        <div class="title">菌包生长分析</div>
        <div class="w-[240px]">
          <DictSelect
            class="w-full"
            :code="Dict.KeyEnum.STRAIN_HOUSE"
            placeholder="请选择养菌房"
            @change="handleChange"
            mode="multiple"
            :show-search="true"
            v-model:value="houseId"
            allow-clear
          />
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
