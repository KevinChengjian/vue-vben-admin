<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { Page } from '@vben/common-ui';
import {
  SvgDevCsIcon,
  SvgDevDkIcon,
  SvgDevLjfIcon,
  SvgDevWzfIcon,
  SvgYjKfIcon,
} from '@vben/icons';

import { Card, Col, Popover, Row } from 'ant-design-vue';

import { Dict } from '#/api';
import { VrMbSnSelect } from '#/components';
import DictSelect from '#/components/dict/dict-select.vue';
import { format } from '#/utils/money';

import { listApi } from './api';

onMounted(() => {
  getList();
});

const houseList = ref<any>([]);
const houseId = ref<string[]>([]);
const mbSn = ref<string>();
const getList = async () => {
  houseList.value = await listApi({
    warehouse_id: houseId.value,
    mb_sn: mbSn.value,
  });
};

const router = useRouter();
const handleRecord = (row: any) => {
  router.push({
    path: '/culture/cultivate',
    query: {
      title: row.label,
      warehouse_id: row.value,
    },
  });
};
</script>

<template>
  <Page class="h-full w-full">
    <Row>
      <Col :span="24">
        <Card :body-style="{ padding: '18px 24px' }">
          <div class="flex">
            <DictSelect
              allow-clear
              class="w-[240px]"
              :code="Dict.KeyEnum.STRAIN_HOUSE"
              placeholder="养菌房"
              v-model:value="houseId"
              mode="multiple"
              @change="getList"
            />

            <VrMbSnSelect
              allow-clear
              class="ml-[14px] !w-[240px]"
              placeholder="菌包编号"
              v-model:value="mbSn"
              @change="getList"
            />
            <div class="radius-[3px] h-[32px] w-[32px]"></div>
          </div>
        </Card>
      </Col>
    </Row>

    <Row :gutter="15">
      <Col
        class="mt-[15px] w-full"
        :span="6"
        :xs="12"
        :md="12"
        :lg="8"
        :xxl="6"
        :xxxl="4"
        v-for="(item, index) in houseList"
        :key="index"
      >
        <div class="card-item">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="icons"><SvgYjKfIcon style="font-size: 14px" /></div>
              <div class="title">{{ item.label }}</div>
            </div>
            <div>
              <SvgDevWzfIcon v-if="item.device === 0" />
              <SvgDevLjfIcon v-if="item.device === 1" />
              <SvgDevCsIcon v-if="item.device === 2" />
              <SvgDevDkIcon v-if="item.device === 3" />
            </div>
          </div>
          <div class="items mt-[10px]" @click="handleRecord(item)">
            <div class="item">
              <div class="label">接种日期</div>
              <div class="value">{{ item.vr_min_at || '~' }}</div>
            </div>
            <div class="item">
              <div class="label">批次数</div>
              <div class="value">
                <Popover>
                  <template #content>
                    <p v-for="(sn, si) in item.mb_sn_arr" :key="si">
                      {{ sn }}
                    </p>
                  </template>
                  {{ item.mb_sn_num }}
                </Popover>
              </div>
            </div>
            <div class="item">
              <div class="label">总数量</div>
              <div class="value">
                {{ format(Number.parseFloat(item.put_total || 0)) }}
              </div>
            </div>
            <div class="item">
              <div class="label">剩余量</div>
              <div class="value">
                {{ format(Number.parseFloat(item.bl_total || 0)) }}
              </div>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  </Page>
</template>

<style scoped lang="less">
.dark {
  .card-item {
    .title {
      color: hsl(var(--foreground));
    }
    .label {
      color: hsl(var(--foreground));
    }
    .value {
      color: hsl(var(--foreground)) !important;
    }
  }
}
.card-item {
  background-color: hsl(var(--background));
  min-height: 115px;
  box-shadow: 0px 1px 10px 5px rgba(232, 233, 234, 0.44);
  border-radius: 5px;
  padding: 18px 20px;

  .icons {
    width: 24px;
    height: 24px;
    border-radius: 6px;
    background-color: rgba(0, 107, 230, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .title {
    width: 120px;
    height: 17px;
    font-weight: 400;
    font-size: 16px;
    color: #333;
    line-height: 17px;
    text-align: left;
    font-style: normal;
    margin-left: 10px;
  }

  .items {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    .item {
      margin-top: 8px;
      width: calc(50% - 4px);
      padding: 5px 0px 6px 18px;
      border-radius: 4px;
      background-color: hsl(var(--background-deep));
      display: flex;
      align-items: center;
      .label {
        font-size: 14px;
        color: #999;
        min-width: 65px;
        flex-shrink: 0;
      }
      .value {
        font-size: 14px;
        color: #333;
        flex: 1;
        width: 75px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
