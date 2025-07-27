<script lang="ts" setup>
import { onMounted, ref } from 'vue';

import {
  FallOutlined,
  LeftOutlined,
  RightOutlined,
  RiseOutlined,
} from '@vben/icons';

import { Calendar, Col, Row } from 'ant-design-vue';
import dayjs, { Dayjs } from 'dayjs';

import { Analysis } from '#/api/core/analysis';
import CgImg from '#/assets/img/cg.png';
import JbImg from '#/assets/img/jb.png';
import JzImg from '#/assets/img/jz.png';
import ZbImg from '#/assets/img/zb.png';
import { format } from '#/utils/money';

import AnalysisCultureNum from './analysis-culture-num.vue';
import AnalysisFormulaCount from './analysis-formula-count.vue';
import AnalysisVarietyCount from './analysis-variety-count.vue';
import AnalyticsTrends from './analytics-trends.vue';

const data = ref<Analysis.Card>();
onMounted(async () => {
  data.value = await Analysis.cardApi();
  handlePlan(dayjs().format('YYYY-MM-DD'));
});

// 生产计划
const curDate = ref<string>('');
const planList = ref<string[]>([]);
const handlePlan = async (e: any) => {
  if (dayjs(e).format('YYYYMM') !== curDate.value) {
    curDate.value = dayjs(e).format('YYYYMM');
    planList.value = await Analysis.planDateApi({ date: e });
  }
};
const showSpot = (value: Dayjs) => {
  const date = value && value.format('YYYY-MM-DD');
  return planList.value && planList.value.includes(date);
};
</script>

<template>
  <div>
    <Row :gutter="14">
      <Col :span="18" :xs="24" :sm="19">
        <Row :gutter="15">
          <Col :span="6" :xs="12" :sm="6">
            <div :bordered="false" class="card-item flex-1">
              <div class="card-content">
                <div class="title">本月制包数量(包)</div>
                <div class="num">
                  {{ format(data?.makeBag?.makeNum || 0) }}
                  <div class="num-icon">
                    <RiseOutlined class="up" v-if="data?.makeBag?.makeResult" />
                    <FallOutlined class="down" v-else />
                  </div>
                </div>
                <div class="footer">
                  <div class="more">
                    上月：{{ format(data?.makeBag?.lastMakeNum || 0) }}
                  </div>
                  <div class="char">
                    {{ data?.makeBag?.makeResult ? '增长' : '下降' }}:
                    {{ data?.makeBag?.percent || 0 }}%
                  </div>
                </div>
              </div>
              <img class="card-icon" :src="ZbImg" alt="" />
            </div>
          </Col>
          <Col :span="6" :xs="12" :sm="6">
            <div :bordered="false" class="card-item flex-1">
              <div class="card-content">
                <div class="title">本月接种数量(包)</div>
                <div class="num">
                  {{ format(data?.vaccination?.total || 0) }}
                  <div class="num-icon">
                    <RiseOutlined
                      class="up"
                      v-if="data?.vaccination?.makeResult"
                    />
                    <FallOutlined class="down" v-else />
                  </div>
                </div>
                <div class="footer">
                  <div class="more">
                    上月：{{ format(data?.vaccination?.lastTotal || 0) }}
                  </div>
                  <div class="char">
                    {{ data?.vaccination?.makeResult ? '增长' : '下降' }}:
                    {{ data?.vaccination?.percent || 0 }}%
                  </div>
                </div>
              </div>
              <img class="card-icon" :src="JzImg" alt="" />
            </div>
          </Col>
          <Col :span="6" :xs="12" :sm="6">
            <div :bordered="false" class="card-item flex-1">
              <div class="card-content">
                <div class="title">本月菌包出库数量(包)</div>
                <div class="num">
                  {{ format(data?.strainBag?.total || 0) }}
                  <div class="num-icon">
                    <RiseOutlined
                      class="up"
                      v-if="data?.strainBag?.makeResult"
                    />
                    <FallOutlined class="down" v-else />
                  </div>
                </div>
                <div class="footer">
                  <div class="more">
                    上月：{{ format(data?.strainBag?.lastTotal || 0) }}
                  </div>
                  <div class="char">
                    {{ data?.strainBag?.makeResult ? '增长' : '下降' }}:
                    {{ data?.strainBag?.percent || 0 }}%
                  </div>
                </div>
              </div>
              <img class="card-icon" :src="JbImg" alt="" />
            </div>
          </Col>
          <Col :span="6" :xs="12" :sm="6">
            <div :bordered="false" class="card-item flex-1">
              <div class="title">本月出菇数量(斤)</div>
              <div class="num">
                {{ format(data?.fruiting?.total || 0) }}
                <div class="num-icon">
                  <RiseOutlined class="up" v-if="data?.fruiting?.makeResult" />
                  <FallOutlined class="down" v-else />
                </div>
              </div>
              <div class="footer">
                <div class="more">
                  A菇数量：{{ format(data?.fruiting?.aTotal || 0) }}
                </div>
                <div class="char">A菇率: {{ data?.fruiting?.rate || 0 }}%</div>
              </div>
              <img class="card-icon" :src="CgImg" alt="" />
            </div>
          </Col>
        </Row>

        <div class="card mt-[15px] w-full">
          <div class="ct">出菇统计</div>
          <AnalyticsTrends />
        </div>

        <div class="card mt-[15px] w-full">
          <div class="ct">菌包统计</div>
          <AnalysisCultureNum />
        </div>
      </Col>

      <Col :span="6" :xs="24" :sm="5">
        <div class="card !pb-[0px]">
          <div class="ct">生产计划</div>
          <Calendar
            :fullscreen="false"
            @change="handlePlan"
            value-format="YYYY-MM-DD"
          >
            <template #headerRender="{ value: current, onChange }">
              <div class="flex items-center justify-between py-[6px]">
                <div
                  @click="
                    () => {
                      onChange(
                        current.month(parseInt(current.month(), 10) - 1),
                      );
                    }
                  "
                >
                  <LeftOutlined />
                </div>
                <div class="text-[16px]">
                  {{ current.format('YYYY-MM-DD') }}
                </div>
                <div
                  @click="
                    () => {
                      onChange(
                        current.month(parseInt(current.month(), 10) + 1),
                      );
                    }
                  "
                >
                  <RightOutlined />
                </div>
              </div>
            </template>
            <template #dateCellRender="{ current }">
              <span
                v-if="showSpot(current)"
                class="mt-[2px] flex justify-center"
              >
                <span class="h-[4px] w-[4px] rounded-[100%] bg-[red]"></span>
              </span>
              <span v-else class="mt-[2px] flex justify-center">
                <span class="h-[4px] w-[4px] rounded-[100%] bg-[#fff]"></span>
              </span>
            </template>
          </Calendar>
        </div>

        <div class="card mt-[15px]">
          <div class="ct">品种占比</div>
          <AnalysisVarietyCount />
        </div>

        <div class="card mt-[15px]">
          <div class="ct">配方占比</div>
          <AnalysisFormulaCount />
        </div>
      </Col>
    </Row>
  </div>
</template>

<style lang="less" scoped>
.card {
  background-color: hsl(var(--background));
  box-shadow: 0px 1px 10px 5px rgba(232, 233, 234, 0.44);
  border-radius: 3px;
  padding: 18px 20px;
  .ct {
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

.card-item {
  background-color: hsl(var(--background));
  min-height: 115px;
  box-shadow: 0px 1px 10px 5px rgba(232, 233, 234, 0.44);
  border-radius: 3px;
  padding: 18px 20px 18px 20px;
  position: relative;
  .card-content {
    position: relative;
    z-index: 999;
  }

  .card-icon {
    position: absolute;
    right: 15px;
    top: 18px;
    width: 80px;
    height: 80px;
    z-index: 1;
  }

  .title {
    font-weight: 400;
    font-size: 14px;
    color: #555;
    line-height: 17px;
    text-align: left;
    font-style: normal;
  }

  .num {
    font-weight: 500;
    font-size: 24px;
    color: #333333;
    line-height: 30px;
    text-align: left;
    font-style: normal;
    margin-top: 10px;
    position: relative;
    display: flex;
    align-items: center;
    .num-icon {
      font-weight: 600;
      margin-left: 10px;
      font-size: 18px;
      padding-top: 10px;
      font-weight: 800;
      .up {
        color: #ee5958;
      }

      .down {
        color: #75cb7a;
      }
    }
  }

  .footer {
    display: flex;
    align-items: end;
    margin-top: 11px;

    .more {
      font-weight: 400;
      font-size: 13px;
      color: #999999;
      font-style: normal;
      flex-shrink: 0;
    }

    .char {
      font-weight: 400;
      font-size: 13px;
      color: #999999;
      font-style: normal;
      position: relative;
      margin-left: 15px;
    }
  }
}
</style>
