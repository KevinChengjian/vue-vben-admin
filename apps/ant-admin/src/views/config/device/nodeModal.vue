<script lang="ts" setup>
import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { Button, Col, Input, message, Row, TreeSelect } from 'ant-design-vue';

import { deviceBoxNodeApi } from '#/api/core/device';

import { deviceboxNodeUpdateApi } from './api';

const emit = defineEmits(['reload']);

const boxList = ref<any>([]);
const rowData = ref<any>();
const [Modal, ModalApi] = useVbenModal({
  closeOnClickModal: false,
  onOpenChange: async (isOpen: boolean) => {
    if (!isOpen) return;

    const data = ModalApi.getData();
    rowData.value = data;
    current.value = rowData.value.current || {};
    nodeItems.value = rowData.value.stage || [];
    stageIds.value = [];
    prefix.value = '';
    ModalApi.setData({});
    currentOtherOption.value = [];

    boxList.value = await deviceBoxNodeApi({ box_no: data.box_no });
    boxList.value.forEach((item: any) => {
      if (item.id === current.value.group_id) {
        currentOtherOption.value = item.items || [];
      }
    });

    if (rowData.value.stage && rowData.value.stage.length === 0) {
      const ids: any = [];
      boxList.value.forEach((item: any) => {
        if (item.name && item.name.includes('阶段')) {
          ids.push(item.id);
        }
      });
      stageIds.value = ids || [];
      handleDeviceStage(ids);
    }
  },
  onConfirm: async () => {
    try {
      await deviceboxNodeUpdateApi({
        id: rowData.value.id,
        group_id: current.value.group_id,
        current: current.value,
        stage: nodeItems.value,
      });

      ModalApi.close();
      ModalApi.setData({});
      message.success('操作成功');
      emit('reload');
    } catch {}
  },
});

const stageIds = ref<string[]>([]);
const nodeItems = ref<any>([]);
const current = ref<any>({});
const prefix = ref<string>('');
const currentOtherOption = ref<any>([]);
const handleDeviceGroup = (e: any) => {
  boxList.value.forEach((item: any) => {
    if (item.id === e) {
      currentOtherOption.value = item.items || [];
      currentOtherOption.value.forEach((ci: any) => {
        if (ci && ci.name && ci.name.includes('当前阶段')) {
          current.value.stage = ci.id;
        }

        if (ci && ci.name && ci.name.includes('计时清零')) {
          current.value.js = ci.id;
        }

        if (ci && ci.name && ci.name === '温度①') {
          current.value.wd = ci.id;
        }

        if (ci && ci.name && ci.name === '温度②') {
          current.value.wd2 = ci.id;
        }

        if (ci && ci.name && ci.name === '均温') {
          current.value.wd_avg = ci.id;
        }

        if (ci && ci.name && ci.name === '包心①') {
          current.value.bag_wd = ci.id;
        }

        if (ci && ci.name && ci.name === '包心②') {
          current.value.bag_wd2 = ci.id;
        }

        if (ci && ci.name && ci.name === '湿度') {
          current.value.sd = ci.id;
        }

        if (ci && ci.name && ci.name === 'CO₂') {
          current.value.co = ci.id;
        }

        if (ci && ci.name && ci.name === '温度设定') {
          current.value.set_wd = ci.id;
        }

        if (ci && ci.name && ci.name === '温差设定') {
          current.value.set_wc = ci.id;
        }

        if (ci && ci.name && ci.name === 'CO₂上限设定') {
          current.value.max_co = ci.id;
        }

        if (ci && ci.name && ci.name === 'CO₂下限设定') {
          current.value.min_co = ci.id;
        }
      });
    }
  });
};

const handleDeviceStage = (ids: any) => {
  const nodeList: any = [];
  ids.forEach((id: any) => {
    const index = boxList.value.findIndex((i: any) => i.id === id);
    if (index !== -1) {
      const item = boxList.value[index];
      let sc = '';
      let scjs = '';
      let wdsd = '';
      let max_co = '';
      let min_co = '';
      let nxh_yx = '';
      let nxh_dz = '';
      const dg_yx = '';
      const dg_tz = '';
      const max_sd = '';
      const min_sd = '';

      item.items.forEach((it: any) => {
        if (it.name && it.name.includes(`${prefix.value}时长设定`)) {
          sc = it.id;
        }

        if (it.name && it.name.includes(`${prefix.value}时长计时`)) {
          scjs = it.id;
        }

        if (it.name && it.name.includes(`${prefix.value}温度设定`)) {
          wdsd = it.id;
        }

        if (it.name && it.name.includes(`${prefix.value}CO₂上限设定`)) {
          max_co = it.id;
        }

        if (it.name && it.name.includes(`${prefix.value}CO₂下限设定`)) {
          min_co = it.id;
        }

        if (it.name && it.name.includes(`${prefix.value}内风循环运行`)) {
          nxh_yx = it.id;
        }

        if (it.name && it.name.includes(`${prefix.value}内风循环停止`)) {
          nxh_dz = it.id;
        }
      });

      nodeList.push({
        list: item.items || [],
        jdName: item.name,
        jd: item.id,
        sc,
        scjs,
        wdsd,
        max_co,
        min_co,
        nxh_yx,
        nxh_dz,
        dg_yx,
        dg_tz,
        max_sd,
        min_sd,
      });
    }
  });
  nodeItems.value = nodeList;
};
</script>
<template>
  <Modal title="监控点配置" class="w-[95%]" content-class="p-[20px] pb-0">
    <div class="mb-[20px] flex text-center">
      <div class="bg-primary mr-[5px] h-[18px] w-[4px]"></div>
      <div class="leading-[18px]">库房设备参数配置</div>
    </div>

    <Row :gutter="24" class="mb-[15px]">
      <Col :span="8">
        <div class="flex items-center">
          <div class="mr-[10px] w-[60px] shrink-0 text-right">设备名称:</div>
          <TreeSelect
            class="w-full"
            v-model:value="current.group_id"
            :field-names="{ children: 'items', label: 'name', value: 'id' }"
            :tree-data="boxList"
            @change="handleDeviceGroup"
          />
        </div>
      </Col>
    </Row>

    <Row :gutter="24">
      <Col :span="4" class="mb-[15px]">
        <div class="flex items-center">
          <div class="mr-[10px] w-[60px] shrink-0 text-right">当前阶段:</div>
          <TreeSelect
            class="w-full"
            v-model:value="current.stage"
            :field-names="{ children: 'items', label: 'name', value: 'id' }"
            :tree-data="currentOtherOption"
          />
        </div>
      </Col>

      <Col :span="4" class="mb-[15px]">
        <div class="flex items-center">
          <div class="mr-[10px] w-[60px] shrink-0 text-right">计时清零:</div>
          <TreeSelect
            class="w-full"
            v-model:value="current.js"
            :field-names="{ children: 'items', label: 'name', value: 'id' }"
            :tree-data="currentOtherOption"
          />
        </div>
      </Col>

      <Col :span="4" class="mb-[15px]">
        <div class="flex items-center">
          <div class="mr-[10px] w-[60px] shrink-0 text-right">温度1:</div>
          <TreeSelect
            class="w-full"
            v-model:value="current.wd"
            :field-names="{ children: 'items', label: 'name', value: 'id' }"
            :tree-data="currentOtherOption"
          />
        </div>
      </Col>

      <Col :span="4" class="mb-[15px]">
        <div class="flex items-center">
          <div class="mr-[10px] w-[60px] shrink-0 text-right">温度2:</div>
          <TreeSelect
            class="w-full"
            v-model:value="current.wd2"
            :field-names="{ children: 'items', label: 'name', value: 'id' }"
            :tree-data="currentOtherOption"
          />
        </div>
      </Col>

      <Col :span="4" class="mb-[15px]">
        <div class="flex items-center">
          <div class="mr-[10px] w-[60px] shrink-0 text-right">均温:</div>
          <TreeSelect
            class="w-full"
            v-model:value="current.wd_avg"
            :field-names="{ children: 'items', label: 'name', value: 'id' }"
            :tree-data="currentOtherOption"
          />
        </div>
      </Col>

      <Col :span="4" class="mb-[15px]">
        <div class="flex items-center">
          <div class="mr-[10px] w-[60px] shrink-0 text-right">包心1:</div>
          <TreeSelect
            class="w-full"
            v-model:value="current.bag_wd"
            :field-names="{ children: 'items', label: 'name', value: 'id' }"
            :tree-data="currentOtherOption"
          />
        </div>
      </Col>

      <Col :span="4" class="mb-[15px]">
        <div class="flex items-center">
          <div class="mr-[10px] w-[60px] shrink-0 text-right">包心2:</div>
          <TreeSelect
            class="w-full"
            v-model:value="current.bag_wd2"
            :field-names="{ children: 'items', label: 'name', value: 'id' }"
            :tree-data="currentOtherOption"
          />
        </div>
      </Col>

      <Col :span="4" class="mb-[15px]">
        <div class="flex items-center">
          <div class="mr-[10px] w-[60px] shrink-0 text-right">湿度:</div>
          <TreeSelect
            class="w-full"
            v-model:value="current.sd"
            :field-names="{ children: 'items', label: 'name', value: 'id' }"
            :tree-data="currentOtherOption"
          />
        </div>
      </Col>

      <Col :span="4" class="mb-[15px]">
        <div class="flex items-center">
          <div class="mr-[10px] w-[60px] shrink-0 text-right">CO₂:</div>
          <TreeSelect
            class="w-full"
            v-model:value="current.co"
            :field-names="{ children: 'items', label: 'name', value: 'id' }"
            :tree-data="currentOtherOption"
          />
        </div>
      </Col>

      <Col :span="4" class="mb-[15px]">
        <div class="flex items-center">
          <div class="mr-[10px] w-[60px] shrink-0 text-right">温度设定:</div>
          <TreeSelect
            class="w-full"
            v-model:value="current.set_wd"
            :field-names="{ children: 'items', label: 'name', value: 'id' }"
            :tree-data="currentOtherOption"
          />
        </div>
      </Col>

      <Col :span="4" class="mb-[15px]">
        <div class="flex items-center">
          <div class="mr-[10px] w-[60px] shrink-0 text-right">温差设定:</div>
          <TreeSelect
            class="w-full"
            v-model:value="current.set_wc"
            :field-names="{ children: 'items', label: 'name', value: 'id' }"
            :tree-data="currentOtherOption"
          />
        </div>
      </Col>

      <Col :span="4" class="mb-[15px]">
        <div class="flex items-center">
          <div class="mr-[10px] w-[60px] shrink-0 text-right">CO₂上限:</div>
          <TreeSelect
            class="w-full"
            v-model:value="current.max_co"
            :field-names="{ children: 'items', label: 'name', value: 'id' }"
            :tree-data="currentOtherOption"
          />
        </div>
      </Col>

      <Col :span="4" class="mb-[15px]">
        <div class="flex items-center">
          <div class="mr-[10px] w-[60px] shrink-0 text-right">CO₂下限:</div>
          <TreeSelect
            class="w-full"
            v-model:value="current.min_co"
            :field-names="{ children: 'items', label: 'name', value: 'id' }"
            :tree-data="currentOtherOption"
          />
        </div>
      </Col>
    </Row>

    <div class="mb-[20px] mt-[30px] flex text-center">
      <div class="bg-primary mr-[5px] h-[18px] w-[4px]"></div>
      <div class="leading-[18px]">程序分组配置</div>
    </div>

    <Row :gutter="24" class="mb-[15px]">
      <Col :span="24">
        <div class="flex items-center">
          <div class="shrink-0">程序分组：</div>
          <TreeSelect
            class="w-full"
            multiple
            v-model:value="stageIds"
            :field-names="{ children: 'items', label: 'name', value: 'id' }"
            :tree-data="boxList"
            @change="handleDeviceStage"
          />
        </div>
      </Col>
      <Col :span="24" class="mt-[15px]">
        <div class="flex items-center">
          <div class="shrink-0">分组前缀：</div>
          <Input class="w-[240px]" v-model:value="prefix" />
          <Button
            type="primary"
            class="ml-[10px]"
            @click="handleDeviceStage(stageIds)"
          >
            匹配
          </Button>
        </div>
      </Col>
    </Row>

    <div class="mt-[15px] pb-[24px]">
      <Row :gutter="10" class="mb-[15px]">
        <Col :span="2" class="text-center">阶段名称</Col>
        <Col :span="2" class="text-center">时长设定</Col>
        <Col :span="2" class="text-center">时长计时</Col>
        <Col :span="2" class="text-center">温度设定</Col>
        <Col :span="2" class="text-center">CO₂上限</Col>
        <Col :span="2" class="text-center">CO₂下限</Col>
        <Col :span="2" class="text-center">内循环运行</Col>
        <Col :span="2" class="text-center">内循环停止</Col>
        <Col :span="2" class="text-center">灯光运行</Col>
        <Col :span="2" class="text-center">灯光停止</Col>
        <Col :span="2" class="text-center">湿度上限</Col>
        <Col :span="2" class="text-center">湿度下限</Col>
      </Row>
      <Row
        class="align-center mt-[10px] flex"
        v-for="(item, i) in nodeItems"
        :key="i"
        :gutter="10"
      >
        <Col :span="2" class="flex items-center">
          <Input v-model:value="item.jdName" readonly />
        </Col>
        <Col :span="2" class="flex items-center">
          <TreeSelect
            class="w-full"
            v-model:value="item.sc"
            :field-names="{ children: 'items', label: 'name', value: 'id' }"
            :tree-data="item.list"
          />
        </Col>
        <Col :span="2" class="flex items-center">
          <TreeSelect
            class="w-full"
            v-model:value="item.scjs"
            :field-names="{ children: 'items', label: 'name', value: 'id' }"
            :tree-data="item.list"
          />
        </Col>
        <Col :span="2">
          <TreeSelect
            class="w-full"
            v-model:value="item.wdsd"
            :field-names="{ children: 'items', label: 'name', value: 'id' }"
            :tree-data="item.list"
          />
        </Col>
        <Col :span="2" class="flex items-center">
          <TreeSelect
            class="w-full"
            v-model:value="item.max_co"
            :field-names="{ children: 'items', label: 'name', value: 'id' }"
            :tree-data="item.list"
          />
        </Col>
        <Col :span="2">
          <TreeSelect
            class="w-full"
            v-model:value="item.min_co"
            :field-names="{ children: 'items', label: 'name', value: 'id' }"
            :tree-data="item.list"
          />
        </Col>
        <Col :span="2">
          <TreeSelect
            class="w-full"
            v-model:value="item.nxh_yx"
            :field-names="{ children: 'items', label: 'name', value: 'id' }"
            :tree-data="item.list"
          />
        </Col>
        <Col :span="2">
          <TreeSelect
            class="w-full"
            v-model:value="item.nxh_dz"
            :field-names="{ children: 'items', label: 'name', value: 'id' }"
            :tree-data="item.list"
          />
        </Col>
        <Col :span="2">
          <TreeSelect
            class="w-full"
            v-model:value="item.dg_yx"
            :field-names="{ children: 'items', label: 'name', value: 'id' }"
            :tree-data="item.list"
          />
        </Col>
        <Col :span="2">
          <TreeSelect
            class="w-full"
            v-model:value="item.dg_tz"
            :field-names="{ children: 'items', label: 'name', value: 'id' }"
            :tree-data="item.list"
          />
        </Col>
        <Col :span="2">
          <TreeSelect
            class="w-full"
            v-model:value="item.max_sd"
            :field-names="{ children: 'items', label: 'name', value: 'id' }"
            :tree-data="item.list"
          />
        </Col>
        <Col :span="2">
          <TreeSelect
            class="w-full"
            v-model:value="item.min_sd"
            :field-names="{ children: 'items', label: 'name', value: 'id' }"
            :tree-data="item.list"
          />
        </Col>
      </Row>
    </div>
  </Modal>
</template>
