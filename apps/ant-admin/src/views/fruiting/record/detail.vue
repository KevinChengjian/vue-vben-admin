<script lang="ts" setup>
import type { ListItem, Profit, Summary } from './type';

import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { useVbenDrawer } from '@vben/common-ui';

import { Card, Col, Image, Input, Row, Textarea } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import deviceStage from '#/components/device/device-stage.vue';
import ImageUplod from '#/components/upload/image-upload.vue';

import { detailApi, profitApi, profitConfigApi, summaryApi } from './api';
import { DetailTableColumn } from './columns';

const [Grid, gridApi] = useVbenVxeGrid({
  gridOptions: {
    columns: DetailTableColumn,
    headerCellConfig: {
      height: 20,
    },
    border: true,
    minHeight: 50,
    pagerConfig: {
      enabled: false,
    },
  },
});

const title = ref<string>('');
const record = ref<ListItem>({} as ListItem);

const detail = ref<any>();
const [Drawer, drawerApi] = useVbenDrawer({
  footer: false,
  class: 'w-[95%] fruiting-wrap',
  contentClass: 'p-0',
  headerClass: 'flex text-center',
  onOpenChange: async (isOpen: boolean) => {
    if (!isOpen) return;
    record.value = drawerApi.getData<ListItem>();
    title.value = record.value?.roomName;
    await getDetail();
  },
});

// 获取出菇详情
const getDetail = async () => {
  detail.value = await detailApi({ id: record.value.id });
  gridApi.grid.reloadData(detail.value?.table || []);

  summaryForm.value.id = detail.value.id;
  summaryForm.value.experiment = detail.value.experiment;
  summaryForm.value.summarize = detail.value.summarize;
  summaryForm.value.strain_info = detail.value.strain_info;
  summaryForm.value.fruiting_info = detail.value.fruiting_info;
  summaryForm.value.improvement = detail.value.improvement;
  summaryForm.value.cz_dx = detail.value.cz_dx;
  summaryForm.value.cz_sf = detail.value.cz_sf;
  summaryForm.value.resource_id = detail.value.res_id || '0';

  storeForm.value.fid = record.value.id;
  storeForm.value.sale_a_price = detail.value?.profit.sale_a_price || 0;
  storeForm.value.sale_a_amount = detail.value?.profit.sale_a_amount || 0;
  storeForm.value.sale_a1_price = detail.value?.profit.sale_a1_price || 0;
  storeForm.value.sale_a1_amount = detail.value?.profit.sale_a1_amount || 0;
  storeForm.value.sale_c_price = detail.value?.profit.sale_c_price || 0;
  storeForm.value.sale_c_amount = detail.value?.profit.sale_c_amount || 0;
  storeForm.value.sale_amount = detail.value?.profit.sale_amount || 0;
  storeForm.value.cost_amount = detail.value?.profit.cost_amount || 0;
  storeForm.value.cost_bag_rate = detail.value?.profit.cost_bag_rate || 0;
  storeForm.value.cost_bag_amount = detail.value?.profit.cost_bag_amount || 0;
  storeForm.value.cost_cg_rate = detail.value?.profit.cost_cg_rate || 0;
  storeForm.value.cost_cg_amount = detail.value?.profit.cost_cg_amount || 0;
  storeForm.value.cost_a_rate = detail.value?.profit.cost_a_rate || 0;
  storeForm.value.cost_a_amount = detail.value?.profit.cost_a_amount || 0;
  storeForm.value.cost_c_rate = detail.value?.profit.cost_c_rate || 0;
  storeForm.value.cost_c_amount = detail.value?.profit.cost_c_amount || 0;
  storeForm.value.cost_cz_price = detail.value?.profit.cost_cz_price || 0;
  storeForm.value.cost_sp_price = detail.value?.profit.cost_sp_price || 0;
  storeForm.value.profit = detail.value?.profit.profit || 0;
  storeForm.value.profit_sp = detail.value?.profit.profit_sp || 0;
};

const summaryForm = ref<Summary>({
  id: 0,
  experiment: '',
  summarize: '',
  strain_info: '',
  fruiting_info: '',
  improvement: '',
  cz_dx: '',
  cz_sf: '',
  resource_id: '0',
});
const handleSubmitResource = (id: number) => {
  summaryForm.value.resource_id = id;
  handleSubmitSummary();
  getDetail();
};
const handleSubmitSummary = async () => {
  try {
    await summaryApi(summaryForm.value);
  } catch {}
};

const storeForm = ref<Profit>({
  fid: 0,
  // 销售
  sale_a_price: 0,
  sale_a_amount: 0,
  sale_a1_price: 0,
  sale_a1_amount: 0,
  sale_c_price: 0,
  sale_c_amount: 0,
  sale_amount: 0,

  // 成本
  cost_amount: 0,
  cost_bag_rate: 1.7,
  cost_bag_amount: 0,
  cost_cg_rate: 1.1,
  cost_cg_amount: 0,
  cost_a_rate: 0.4,
  cost_a_amount: 0,
  cost_c_rate: 0.6,
  cost_c_amount: 0,
  cost_cz_price: 0,
  cost_sp_price: 0,

  // 利润
  profit: 0,
  profit_sp: 0,
});

const handleSubmit = async (key: string) => {
  try {
    await profitConfigApi(storeForm.value);
  } catch {}

  try {
    const putNum: number = detail.value.put_num;
    const outNum: number = detail.value.out_num;
    const aOutNum: number = detail.value.a_out_num;
    const otherNum: number = outNum - aOutNum;
    if (key === 'sale') {
      // A菇销售额
      storeForm.value.sale_a_amount = Number.parseFloat(
        (aOutNum * storeForm.value.sale_a_price).toFixed(2),
      );
      // 剩余销售
      storeForm.value.sale_c_amount = Number.parseFloat(
        (otherNum * storeForm.value.sale_c_price).toFixed(2),
      );

      // 销售总额
      const sa = storeForm.value.sale_a_amount + storeForm.value.sale_c_amount;
      storeForm.value.sale_amount = Number.parseFloat(sa.toFixed(2));
    }

    if (key === 'cost') {
      // 包成本
      storeForm.value.cost_bag_amount = Number.parseFloat(
        (putNum * storeForm.value.cost_bag_rate).toFixed(2),
      );

      // 出菇成本
      storeForm.value.cost_cg_amount = Number.parseFloat(
        (putNum * storeForm.value.cost_cg_rate).toFixed(2),
      );

      // A菇采摘成本
      storeForm.value.cost_a_amount = Number.parseFloat(
        (aOutNum * storeForm.value.cost_a_rate).toFixed(2),
      );

      // C菇采摘成本
      storeForm.value.cost_c_amount = Number.parseFloat(
        (otherNum * storeForm.value.cost_c_rate).toFixed(2),
      );

      // 单包采摘成本
      storeForm.value.cost_cz_price = 0;
      if (putNum > 0) {
        const czPrice =
          (storeForm.value.cost_a_amount + storeForm.value.cost_c_amount) /
          putNum;
        storeForm.value.cost_cz_price = Number.parseFloat(czPrice.toFixed(2));
      }

      // 总成本
      storeForm.value.cost_amount = Number.parseFloat(
        (
          storeForm.value.cost_bag_amount +
          storeForm.value.cost_cg_amount +
          storeForm.value.cost_a_amount +
          storeForm.value.cost_c_amount
        ).toFixed(2),
      );

      // 合计单包成本
      storeForm.value.cost_sp_price = 0;
      if (putNum > 0) {
        storeForm.value.cost_sp_price = Number.parseFloat(
          (storeForm.value.cost_amount / putNum).toFixed(2),
        );
      }
    }

    // 计算利润
    const profit = storeForm.value.sale_amount - storeForm.value.cost_amount;
    storeForm.value.profit = Number.parseFloat(profit.toFixed(3));
    storeForm.value.profit_sp = 0;
    if (putNum > 0) {
      const psp = storeForm.value.profit / putNum;
      storeForm.value.profit_sp = Number.parseFloat(psp.toFixed(3));
    }

    await profitApi(storeForm.value);
  } catch {}
};

const router = useRouter();
const handleCulture = (item: any) => {
  router.push({
    path: '/culture/cultivate',
    query: {
      mb_sn: item.mb_sn,
      title: item.mb_sn,
    },
  });
};
</script>

<template>
  <Drawer :title="title">
    <div>
      <Grid>
        <template #mb_sn="{ row }">
          <div v-if="row.mb_sn === '总计'">
            {{ row.mb_sn }}
          </div>
          <div v-else class="text-primary" @click="handleCulture(row)">
            {{ row.mb_sn }}
          </div>
        </template>
      </Grid>
      <div class="px-[15px]">
        <Card
          title="操作记录"
          size="small"
          :header="false"
          :body-style="{ padding: 0 }"
          :head-style="{ backgroundColor: '#f4f4f5', color: '#606266' }"
        >
          <template #extra>
            <ImageUplod
              txt="上传图片"
              :max="1"
              v-model:value="summaryForm.resource_id"
              @change="handleSubmitResource"
            />
          </template>

          <Row :gutter="10">
            <Col :span="18">
              <Image
                style="width: 100%"
                class="ml-[2px] mt-[2px]"
                v-if="detail?.resource_id > 0"
                :src="detail?.resource_url"
              />
              <deviceStage
                v-else
                class="w-full p-0"
                :id="detail?.room_id"
                :type="2"
              />
            </Col>
            <Col :span="6" class="border-l">
              <div class="border-b py-[6px] text-center">实验:</div>
              <div class="border-b text-center">
                <Textarea
                  :bordered="false"
                  class="w-full"
                  v-model:value="summaryForm.experiment"
                  @press-enter.prevent="handleSubmitSummary"
                />
              </div>
              <div class="border-b py-[6px] text-center">总结:</div>
              <div class="border-b text-center">
                <Textarea
                  :bordered="false"
                  class="w-full"
                  v-model:value="summaryForm.summarize"
                  @press-enter.prevent="handleSubmitSummary"
                />
              </div>
              <div class="flex items-center text-center">
                <div class="w-2/5 flex-shrink-0 text-center">菌包情况</div>
                <div class="flex-1 border-l text-center">
                  <Textarea
                    :bordered="false"
                    class="w-full"
                    v-model:value="summaryForm.strain_info"
                    @press-enter.prevent="handleSubmitSummary"
                  />
                </div>
              </div>
              <div class="flex items-center border-t">
                <div class="w-2/5 flex-shrink-0 text-center">出菇情况</div>
                <div class="flex-1 border-l text-center">
                  <Textarea
                    :bordered="false"
                    class="w-full"
                    v-model:value="summaryForm.fruiting_info"
                    @press-enter.prevent="handleSubmitSummary"
                  />
                </div>
              </div>
              <div class="flex items-center border-t">
                <div class="w-2/5 flex-shrink-0 text-center">改进方向</div>
                <div class="flex-1 border-l text-center">
                  <Textarea
                    :bordered="false"
                    class="w-full"
                    v-model:value="summaryForm.improvement"
                    @press-enter.prevent="handleSubmitSummary"
                  />
                </div>
              </div>
              <div class="border-t py-[6px] text-center">采摘状态</div>
              <div class="flex items-center border-t">
                <div class="w-1/5 flex-shrink-0 text-center">水份</div>
                <div class="flex-1 border-l text-center">
                  <Input
                    :bordered="false"
                    class="w-full"
                    v-model:value="summaryForm.cz_sf"
                    @press-enter.prevent="handleSubmitSummary"
                  />
                </div>
              </div>
              <div class="flex items-center border-b border-t">
                <div class="w-1/5 flex-shrink-0 text-center">大小</div>
                <div class="flex-1 border-l text-center">
                  <Input
                    :bordered="false"
                    class="w-full"
                    v-model:value="summaryForm.cz_dx"
                    @press-enter.prevent="handleSubmitSummary"
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Card>

        <Card
          title="本库利润"
          class="profit mt-[15px]"
          :body-style="{ padding: 0 }"
          size="small"
          :head-style="{ backgroundColor: '#f4f4f5', color: '#606266' }"
        >
          <div class="flex border-b">
            <div class="flex w-[170px] flex-shrink-0 border-r">
              <div
                class="flex w-[170px] items-center justify-center px-[6px] py-[10px]"
              >
                预计销售金额(去箱子):
              </div>
            </div>
            <div class="flex w-[120px] flex-shrink-0 border-r">
              <div
                class="flex w-[120px] items-center justify-center px-[5px] py-[10px]"
              >
                {{ storeForm.sale_amount }} <span class="ml-[3px]">元</span>
              </div>
            </div>
            <div class="flex w-[120px] flex-shrink-0 border-r">
              <div
                class="flex w-[120px] items-center justify-center px-[15px] py-[10px] text-center"
              >
                <span>A：</span>
                <input
                  v-model="storeForm.sale_a_price"
                  @keyup.enter="handleSubmit('sale')"
                  class="w-full border-none text-right outline-none"
                />
                <span class="ml-[3px]">元</span>
              </div>
            </div>
            <div class="flex w-[140px] flex-shrink-0 border-r">
              <div
                class="label flex w-[140px] items-center justify-center px-[15px] py-[10px] text-center"
              >
                {{ storeForm.sale_a_amount }}
                <span class="ml-[3px]">元</span>
              </div>
            </div>
            <div class="flex w-[120px] flex-shrink-0 border-r">
              <div
                class="flex w-[120px] items-center justify-center px-[15px] py-[10px] text-center"
              >
                <span class="flex-shrink-0">其他：</span>
                <input
                  v-model="storeForm.sale_c_price"
                  @keyup.enter="handleSubmit('sale')"
                  class="w-full border-none text-right outline-none"
                />
                <span class="ml-[3px]">元</span>
              </div>
            </div>
            <div class="flex w-[140px] flex-shrink-0 border-r">
              <div
                class="label flex w-[140px] items-center justify-center px-[15px] py-[10px] text-center"
              >
                {{ storeForm.sale_c_amount }}
                <span class="ml-[3px]">元</span>
              </div>
            </div>
          </div>

          <div class="flex border-b">
            <div class="w-[170px] flex-shrink-0 border-r">
              <div class="label w-[170px] px-[5px] py-[10px] text-center">
                预计成本:
              </div>
            </div>
            <div class="flex w-[120px] flex-shrink-0 border-r">
              <div class="label w-[120px] px-[5px] py-[10px] text-center">
                {{ storeForm.cost_amount }}
                <span class="ml-[3px]">元</span>
              </div>
            </div>

            <div class="flex w-[120px] flex-shrink-0 border-r">
              <div
                class="flex w-[120px] items-center justify-center py-[10px] pl-[10px] pr-[15px] text-center"
              >
                <span class="flex-shrink-0">包成本：</span>
                <input
                  v-model="storeForm.cost_bag_rate"
                  @keyup.enter="handleSubmit('cost')"
                  class="w-full border-none text-right outline-none"
                />
              </div>
            </div>
            <div class="flex w-[140px] flex-shrink-0 border-r">
              <div
                class="label flex w-full items-center justify-center px-[15px] py-[10px] text-center"
              >
                {{ storeForm.cost_bag_amount }}
                <span class="ml-[3px]">元</span>
              </div>
            </div>

            <div class="flex w-[120px] flex-shrink-0 border-r">
              <div
                class="flex w-[120px] items-center justify-center py-[10px] pl-[10px] pr-[15px] text-center"
              >
                <span class="flex-shrink-0">出菇成本：</span>
                <input
                  v-model="storeForm.cost_cg_rate"
                  @keyup.enter="handleSubmit('cost')"
                  class="w-full border-none text-right outline-none"
                />
              </div>
            </div>
            <div class="flex w-[140px] flex-shrink-0 border-r">
              <div
                class="label flex w-full items-center justify-center px-[15px] py-[10px] text-center"
              >
                {{ storeForm.cost_cg_amount }}
                <span class="ml-[3px]">元</span>
              </div>
            </div>

            <div class="flex w-[120px] flex-shrink-0 border-r">
              <div
                class="flex w-[120px] items-center justify-center py-[10px] pl-[10px] pr-[15px] text-center"
              >
                <span class="flex-shrink-0">A菇采摘：</span>
                <input
                  v-model="storeForm.cost_a_rate"
                  @keyup.enter="handleSubmit('cost')"
                  class="w-full border-none text-right outline-none"
                />
              </div>
            </div>
            <div class="flex w-[140px] flex-shrink-0 border-r">
              <div
                class="label flex w-full items-center justify-center px-[15px] py-[10px] text-center"
              >
                {{ storeForm.cost_a_amount }}
                <span class="ml-[3px]">元</span>
              </div>
            </div>

            <div class="flex w-[120px] flex-shrink-0 border-r">
              <div
                class="flex w-[120px] items-center justify-center py-[10px] pl-[10px] pr-[15px] text-center"
              >
                <span class="flex-shrink-0">C菇采摘：</span>
                <input
                  v-model="storeForm.cost_c_rate"
                  @keyup.enter="handleSubmit('cost')"
                  class="w-full border-none text-right outline-none"
                />
              </div>
            </div>
            <div class="flex w-[140px] flex-shrink-0 border-r">
              <div
                class="label flex w-full items-center justify-center px-[15px] py-[10px] text-center"
              >
                {{ storeForm.cost_c_amount }}
                <span class="ml-[3px]">元</span>
              </div>
            </div>
            <div class="flex w-[110px] flex-shrink-0 border-r">
              <div
                class="flex w-[110px] items-center justify-center py-[10px] text-center"
              >
                <span class="flex-shrink-0">合计单包成本：</span>
              </div>
            </div>
            <div class="flex flex-1 flex-shrink-0 border-r">
              <div
                class="label flex w-full items-center justify-center px-[15px] py-[10px] text-center"
              >
                {{ storeForm.cost_sp_price }}
                <span class="ml-[3px]">元/包</span>
              </div>
            </div>
          </div>

          <div class="flex">
            <div class="w-[170px] flex-shrink-0 border-r">
              <div class="label w-[170px] px-[5px] py-[10px] text-center">
                预计利润:
              </div>
            </div>
            <div class="flex w-[120px] flex-shrink-0 border-r">
              <div
                class="label text-destructive flex w-[120px] justify-center px-[5px] py-[10px] text-center"
              >
                {{ storeForm.profit }}
                <span class="ml-[3px]">元</span>
              </div>
            </div>
            <div class="flex w-[120px] flex-shrink-0 border-r">
              <div
                class="flex w-[120px] items-center justify-center px-[5px] py-[6px] text-center"
              >
                单包利润：
              </div>
            </div>
            <div class="flex w-full flex-1 flex-shrink-0">
              <div
                class="text-destructive flex w-full justify-center px-[5px] py-[10px] text-center"
              >
                {{ storeForm.profit_sp }} <span class="ml-[3px]">元/包</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </Drawer>
</template>

<style lang="less">
.fruiting-wrap {
  th {
    padding: 4px 8px !important;
  }
}
</style>
