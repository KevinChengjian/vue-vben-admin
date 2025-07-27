<script lang="ts" setup>
import type { TableColumnsType } from 'ant-design-vue';

import type { ListItem } from './type';

import { ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';

import {
  Button,
  Col,
  Input,
  message,
  Row,
  Table,
  Textarea,
} from 'ant-design-vue';

import deviceStage from '#/components/device/device-stage.vue';

import { detailApi, summaryApi } from './api';

const row = ref<ListItem>();
const detail = ref<any>();
const title = ref<string>('');
const tableList = ref<any>([]);
const [Drawer, drawerApi] = useVbenDrawer({
  footer: false,
  class: 'w-[95%] fruiting-wrap',
  contentClass: '',
  headerClass: 'flex text-center',
  onOpenChange: async (isOpen: boolean) => {
    if (!isOpen) return;
    row.value = drawerApi.getData<ListItem>();
    detail.value = await detailApi({ id: row.value.id });
    tableList.value = detail.value?.table || [];
    title.value = `出菇房（${row.value?.roomName}）`;
    storeForm.value.id = row.value.id;

    storeForm.value.summarize = detail.value?.summarize || '';
    storeForm.value.experiment = detail.value?.experiment || '';
    storeForm.value.strain_info = detail.value?.strain_info || '';
    storeForm.value.fruiting_info = detail.value?.fruiting_info || '';
    storeForm.value.improvement = detail.value?.improvement || '';
    storeForm.value.sales_amount = detail.value?.sales_amount || '';
    storeForm.value.a_sales_price = detail.value?.a_sales_price || '';
    storeForm.value.a_sales_amount = detail.value?.a_sales_amount || '';
    storeForm.value.a1_sales_price = detail.value?.a1_sales_price || '';
    storeForm.value.a1_sales_amount = detail.value?.a1_sales_amount || '';
    storeForm.value.sales_poor = detail.value?.sales_poor || '';
    storeForm.value.cost = detail.value?.cost || '';
    storeForm.value.cost_bag = detail.value?.cost_bag || '';
    storeForm.value.cost_cg = detail.value?.cost_cg || '';
    storeForm.value.cost_cz = detail.value?.cost_cz || '';
    storeForm.value.cost_acz = detail.value?.cost_acz || '';
    storeForm.value.cost_ccz = detail.value?.cost_ccz || '';
    storeForm.value.cost_sp = detail.value?.cost_sp || '';
    storeForm.value.profit = detail.value?.profit || '';
    storeForm.value.profit_sp = detail.value?.profit_sp || '';
  },
});

const columns: TableColumnsType = [
  {
    title: '菌包数据',
    children: [
      {
        title: '菌包编号',
        dataIndex: 'mb_sn',
        key: 'mb_sn',
        align: 'center',
      },
      {
        title: '接种日期',
        dataIndex: 'vr_at',
        key: 'vr_at',
        align: 'center',
      },
      {
        title: '菌龄',
        dataIndex: 'strain_age',
        key: 'strain_age',
        align: 'center',
      },
      {
        title: '养菌房',
        dataIndex: 'warehouse',
        key: 'warehouse',
        align: 'center',
      },
      {
        title: '菌种',
        dataIndex: 'variety',
        key: 'variety',
        align: 'center',
      },
      {
        title: '配方',
        dataIndex: 'formulaName',
        key: 'formulaName',
        align: 'center',
      },
      {
        title: '含水率%',
        children: [
          {
            title: '上',
            dataIndex: 'upper_moisture',
            key: 'upper_moisture',
            align: 'center',
          },
          {
            title: '中',
            dataIndex: 'middle_moisture',
            key: 'middle_moisture',
            align: 'center',
          },
          {
            title: '下',
            dataIndex: 'lower_moisture',
            key: 'lower_moisture',
            align: 'center',
          },
        ],
      },
      {
        title: 'PH值',
        children: [
          {
            title: '上',
            dataIndex: 'upper_ph',
            key: 'upper_ph',
            align: 'center',
          },
          {
            title: '中',
            dataIndex: 'middle_ph',
            key: 'middle_ph',
            align: 'center',
          },
          {
            title: '下',
            dataIndex: 'lower_ph',
            key: 'lower_ph',
            align: 'center',
          },
        ],
      },
    ],
  },
  {
    title: '出菇数据',
    children: [
      {
        title: '出菇编号',
        dataIndex: 'fruiting_sn',
        key: 'fruiting_sn',
        align: 'center',
      },
      {
        title: '上架时间',
        dataIndex: 'put_at',
        key: 'put_at',
        align: 'center',
      },
      {
        title: '下架时间',
        dataIndex: 'out_at',
        key: 'out_at',
        align: 'center',
      },
      {
        title: '产量',
        children: [
          {
            title: '总',
            dataIndex: 'co_amount',
            key: 'co_amount',
            align: 'center',
          },
          {
            title: 'A菇',
            dataIndex: 'co_a_amount',
            key: 'co_a_amount',
            align: 'center',
          },
        ],
      },
      {
        title: 'A菇率',
        dataIndex: 'co_a_rate',
        key: 'co_a_rate',
        align: 'center',
      },
      {
        title: '单包产量/斤',
        children: [
          {
            title: '总',
            dataIndex: 'co_sp_num',
            key: 'co_sp_num',
            align: 'center',
          },
          {
            title: 'A菇',
            dataIndex: 'co_asp_num',
            key: 'co_asp_num',
            align: 'center',
          },
        ],
      },
      {
        title: '技术员',
        dataIndex: 'devName',
        key: 'devName',
        width: 200,
        align: 'center',
      },
    ],
  },
];

// 总结
const storeForm = ref<any>({
  id: '',
  summarize: '',
  experiment: '',
  strain_info: '',
  fruiting_info: '',
  improvement: '',
  // 销售
  sales_amount: 0,
  a_sales_price: 0,
  a_sales_amount: 0,
  a1_sales_price: 0,
  a1_sales_amount: 0,
  sales_poor: 0,

  // 成本
  cost: 0,
  cost_bag: 0,
  cost_cg: 0,
  cost_cz: 0,
  cost_acz: 0,
  cost_ccz: 0,
  cost_sp: 0,

  // 利润
  profit: 0,
  profit_sp: 0,
});
const handleSubmit = async () => {
  try {
    await summaryApi(storeForm.value);
    message.success('操作成功');
  } catch {}
};
</script>

<template>
  <Drawer :title="title">
    <Table
      bordered
      size="small"
      :columns="columns"
      :data-source="tableList"
      :pagination="false"
    />
    <Row>
      <Col :span="24">
        <deviceStage class="w-full" :id="detail?.warehouse_id" />
      </Col>
    </Row>

    <Row class="border">
      <Col :span="4" class="flex items-center justify-center border-r">
        <div
          class="flex w-full items-center justify-center text-[18px]"
          style="writing-mode: vertical-lr"
        >
          综合分析
        </div>
      </Col>
      <Col :span="20">
        <Col :span="24">
          <Row>
            <Col
              :span="4"
              class="flex items-center justify-center border-r text-center"
            >
              实验:
            </Col>
            <Col :span="20">
              <Textarea
                :bordered="false"
                v-model:value="storeForm.experiment"
                :rows="2"
              />
            </Col>
          </Row>
        </Col>
        <Col :span="24" class="border-t">
          <Row>
            <Col
              :span="4"
              class="flex items-center justify-center border-r text-center"
            >
              总结:
            </Col>
            <Col :span="20">
              <Textarea
                :bordered="false"
                v-model:value="storeForm.summarize"
                :rows="2"
              />
            </Col>
          </Row>
        </Col>
        <Col :span="24" class="border-t">
          <Row>
            <Col
              :span="4"
              class="flex items-center justify-center border-r text-center"
            >
              菌包情况:
            </Col>
            <Col :span="20">
              <Textarea
                :bordered="false"
                v-model:value="storeForm.strain_info"
                :rows="2"
              />
            </Col>
          </Row>
        </Col>
        <Col :span="24" class="border-y">
          <Row>
            <Col
              :span="4"
              class="flex items-center justify-center border-r text-center"
            >
              出菇情况:
            </Col>
            <Col :span="20">
              <Textarea
                :bordered="false"
                v-model:value="storeForm.fruiting_info"
                :rows="2"
              />
            </Col>
          </Row>
        </Col>
        <Col :span="24" class="mt-[24px] border-t">
          <Row>
            <Col
              :span="4"
              class="flex items-center justify-center border-r text-center"
            >
              改进方向:
            </Col>
            <Col :span="20">
              <Textarea
                :bordered="false"
                v-model:value="storeForm.improvement"
                :rows="2"
              />
            </Col>
          </Row>
        </Col>

        <Col :span="24" class="border-t">
          <Row>
            <Col
              :span="4"
              class="flex items-center justify-center border-r text-center"
            >
              预计出售总金额(去箱子):
            </Col>
            <Col :span="20">
              <Row>
                <Col
                  :span="3"
                  class="flex items-center justify-center border-r text-center"
                >
                  <Input
                    class="flex-1"
                    v-model:value="storeForm.sales_amount"
                    :bordered="false"
                    placeholder="销售金额"
                    :min="0"
                  />
                  <div class="mr-[10px]">元</div>
                </Col>
                <Col
                  :span="2"
                  class="flex items-center justify-center border-r text-center"
                >
                  <div class="ml-[10px]">A:</div>
                  <Input
                    class="flex-1"
                    :bordered="false"
                    placeholder="单价"
                    v-model:value="storeForm.a_sales_price"
                    :min="0"
                  />
                  <div class="mr-[10px]">元</div>
                </Col>
                <Col
                  :span="3"
                  class="flex items-center justify-center border-r text-center"
                >
                  <Input
                    class="flex-1"
                    v-model:value="storeForm.a_sales_amount"
                    :bordered="false"
                    placeholder="A菇销售额"
                    :min="0"
                  />
                  <div class="mr-[10px]">元</div>
                </Col>
                <Col
                  :span="2"
                  class="flex items-center justify-center border-r text-center"
                >
                  <div class="ml-[10px]">A1:</div>
                  <Input
                    class="flex-1"
                    :bordered="false"
                    placeholder="A1菇单价"
                    v-model:value="storeForm.a1_sales_price"
                    :min="0"
                  />
                  <div class="mr-[10px]">元</div>
                </Col>
                <Col
                  :span="3"
                  class="flex items-center justify-center border-r text-center"
                >
                  <Input
                    class="flex-1"
                    :bordered="false"
                    placeholder="A1菇销售额"
                    v-model:value="storeForm.a1_sales_amount"
                    :min="0"
                  />
                  <div class="mr-[10px]">元</div>
                </Col>
                <Col
                  :span="3"
                  class="flex items-center justify-center border-r text-center"
                >
                  <div class="ml-[10px]">差:</div>
                  <Input
                    class="flex-1"
                    :bordered="false"
                    :min="0"
                    v-model:value="storeForm.sales_poor"
                  />
                  <div class="mr-[10px]">元</div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>

        <Col :span="24" class="border-t">
          <Row>
            <Col
              :span="4"
              class="flex items-center justify-center border-r text-center"
            >
              预计成本:
            </Col>
            <Col :span="20">
              <Row>
                <Col
                  :span="3"
                  class="flex items-center justify-center border-b border-r text-center"
                >
                  <Input
                    class="flex-1"
                    :bordered="false"
                    placeholder="总成本"
                    :min="0"
                    v-model:value="storeForm.cost"
                  />
                  <div class="mr-[10px]">元</div>
                </Col>
                <Col
                  :span="2"
                  class="flex items-center justify-center border-b border-r text-center"
                >
                  <div>包成本</div>
                </Col>
                <Col
                  :span="3"
                  class="flex items-center justify-center border-b border-r text-center"
                >
                  <Input
                    class="flex-1"
                    :bordered="false"
                    :min="0"
                    v-model:value="storeForm.cost_bag"
                  />
                  <div class="mr-[10px]">元</div>
                </Col>

                <Col
                  :span="2"
                  class="flex items-center justify-center border-b border-r text-center"
                >
                  <div>出菇成本</div>
                </Col>
                <Col
                  :span="3"
                  class="flex items-center justify-center border-b border-r text-center"
                >
                  <Input
                    class="flex-1"
                    :bordered="false"
                    :min="0"
                    v-model:value="storeForm.cost_cg"
                  />
                  <div class="mr-[10px]">元</div>
                </Col>

                <Col
                  :span="2"
                  class="flex items-center justify-center border-b border-r text-center"
                >
                  <div>采摘成本</div>
                </Col>
                <Col
                  :span="3"
                  class="flex items-center justify-center border-b border-r text-center"
                >
                  <Input
                    class="flex-1"
                    :bordered="false"
                    :min="0"
                    v-model:value="storeForm.cost_cz"
                  />
                  <div class="mr-[10px]">元/包</div>
                </Col>

                <Col
                  :span="2"
                  class="flex items-center justify-center border-b border-r text-center"
                >
                  <div>A菇采摘成本</div>
                </Col>
                <Col
                  :span="4"
                  class="flex items-center justify-center border-b border-r text-center"
                >
                  <Input
                    class="flex-1"
                    :bordered="false"
                    :min="0"
                    v-model:value="storeForm.cost_acz"
                  />
                  <div class="mr-[10px]">元</div>
                </Col>
                <Col
                  :span="2"
                  :offset="3"
                  class="flex items-center justify-center border-l border-r text-center"
                >
                  <div>C菇采摘成本</div>
                </Col>
                <Col
                  :span="3"
                  class="flex items-center justify-center border-r text-center"
                >
                  <Input
                    class="flex-1"
                    :bordered="false"
                    :min="0"
                    v-model:value="storeForm.cost_ccz"
                  />
                  <div class="mr-[10px]">元</div>
                </Col>
                <Col
                  :span="2"
                  class="flex items-center justify-center border-r text-center"
                >
                  <div>合计单包成本</div>
                </Col>
                <Col
                  :span="3"
                  class="flex items-center justify-center border-r text-center"
                >
                  <Input
                    class="flex-1"
                    :bordered="false"
                    :min="0"
                    v-model:value="storeForm.cost_sp"
                  />
                  <div class="mr-[10px]">元/包</div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>

        <Col :span="24" class="border-t">
          <Row>
            <Col
              :span="4"
              class="flex items-center justify-center border-r text-center"
            >
              预计利润:
            </Col>
            <Col :span="20">
              <Row>
                <Col
                  :span="3"
                  class="flex items-center justify-center border-r text-center"
                >
                  <Input
                    class="flex-1"
                    :bordered="false"
                    placeholder="预计利润"
                    :min="0"
                    v-model:value="storeForm.profit"
                  />
                  <div class="mr-[10px]">元</div>
                </Col>

                <Col
                  :span="2"
                  class="flex items-center justify-center border-r text-center"
                >
                  <div>单包利润</div>
                </Col>
                <Col
                  :span="19"
                  class="flex items-center justify-center border-r text-center"
                >
                  <Input
                    class="flex-1"
                    :bordered="false"
                    :min="0"
                    v-model:value="storeForm.profit_sp"
                  />
                  <div class="mr-[10px]">元</div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>

        <Col :span="24" class="flex items-center justify-center border-t">
          <Button
            class="my-[10px] w-[120px]"
            type="primary"
            @click="handleSubmit"
          >
            提交
          </Button>
        </Col>
      </Col>
    </Row>
  </Drawer>
</template>

<style lang="less">
.fruiting-wrap {
  th {
    padding: 4px 8px !important;
  }
}
</style>
