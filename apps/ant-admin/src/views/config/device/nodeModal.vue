<script lang="ts" setup>
import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import {
  Button,
  Col,
  InputNumber,
  message,
  Row,
  TreeSelect,
} from 'ant-design-vue';

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
    current.value = rowData.value.current;
    nodeItems.value = rowData.value.stage;
    ModalApi.setData({});

    boxList.value = await deviceBoxNodeApi({ box_no: data.box_no });
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

const nodeItems = ref<any>([]);
const current = ref<any>({});
const rowIndex = ref<any>();
const handleDelete = () => {
  if (rowIndex.value !== undefined) {
    nodeItems.value.splice(rowIndex.value, 1);
    rowIndex.value = undefined;
  }
};
const handleAddRow = () => {
  nodeItems.value.push({
    jd: '',
    sc: '',
    scjs: '',
    wdsd: '',
    max_co: '',
    min_co: '',
    nxh_yx: '',
    nxh_dz: '',
    dg_yx: '',
    dg_tz: '',
    max_sd: '',
    min_sd: '',
  });
};
</script>
<template>
  <Modal title="监控点配置" class="w-[95%]" content-class="pt-[20px] pb-0">
    <Row :gutter="10" class="mb-[15px]">
      <Col class="text-center" :span="2">库房分组</Col>
      <Col class="text-center" :span="2">当前阶段</Col>
      <Col class="text-center" :span="2">计时清零</Col>
      <Col class="text-center" :span="2">温度</Col>
      <Col class="text-center" :span="2">包心</Col>
      <Col class="text-center" :span="2">CO₂</Col>
      <Col class="text-center" :span="2">温度设定</Col>
      <Col class="text-center" :span="2">温差设定</Col>
      <Col class="text-center" :span="2">CO₂上限设定</Col>
      <Col class="text-center" :span="2">CO₂下限设定</Col>
    </Row>
    <Row :gutter="10">
      <Col :span="2" class="flex items-center">
        <TreeSelect
          class="w-full"
          v-model:value="current.group_id"
          :field-names="{ children: 'items', label: 'name', value: 'id' }"
          :tree-data="boxList"
        />
      </Col>
      <Col :span="2" class="flex items-center">
        <TreeSelect
          class="w-full"
          v-model:value="current.stage"
          :field-names="{ children: 'items', label: 'name', value: 'id' }"
          :tree-data="boxList"
        />
      </Col>
      <Col :span="2" class="flex items-center">
        <TreeSelect
          class="w-full"
          v-model:value="current.js"
          :field-names="{ children: 'items', label: 'name', value: 'id' }"
          :tree-data="boxList"
        />
      </Col>
      <Col :span="2" class="flex items-center">
        <TreeSelect
          class="w-full"
          v-model:value="current.wd"
          :field-names="{ children: 'items', label: 'name', value: 'id' }"
          :tree-data="boxList"
        />
      </Col>
      <Col :span="2" class="flex items-center">
        <TreeSelect
          class="w-full"
          v-model:value="current.bx"
          :field-names="{ children: 'items', label: 'name', value: 'id' }"
          :tree-data="boxList"
        />
      </Col>
      <Col :span="2" class="flex items-center">
        <TreeSelect
          class="w-full"
          v-model:value="current.co"
          :field-names="{ children: 'items', label: 'name', value: 'id' }"
          :tree-data="boxList"
        />
      </Col>
      <Col :span="2" class="flex items-center">
        <TreeSelect
          class="w-full"
          v-model:value="current.set_wd"
          :field-names="{ children: 'items', label: 'name', value: 'id' }"
          :tree-data="boxList"
        />
      </Col>
      <Col :span="2" class="flex items-center">
        <TreeSelect
          class="w-full"
          v-model:value="current.set_wc"
          :field-names="{ children: 'items', label: 'name', value: 'id' }"
          :tree-data="boxList"
        />
      </Col>
      <Col :span="2" class="flex items-center">
        <TreeSelect
          class="w-full"
          v-model:value="current.max_co"
          :field-names="{ children: 'items', label: 'name', value: 'id' }"
          :tree-data="boxList"
        />
      </Col>
      <Col :span="2" class="flex items-center">
        <TreeSelect
          class="w-full"
          v-model:value="current.min_co"
          :field-names="{ children: 'items', label: 'name', value: 'id' }"
          :tree-data="boxList"
        />
      </Col>
    </Row>

    <div class="mt-[35px] pb-[24px]">
      <Row :gutter="10" class="mb-[15px]">
        <Col class="text-center" :span="2">阶段名称</Col>
        <Col class="text-center" :span="2">时长设定</Col>
        <Col class="text-center" :span="2">时长计时</Col>
        <Col class="text-center" :span="2">温度设定</Col>
        <Col class="text-center" :span="2">CO₂上限</Col>
        <Col class="text-center" :span="2">CO₂下限</Col>
        <Col class="text-center" :span="2">内循环运行</Col>
        <Col class="text-center" :span="2">内循环停止</Col>
        <Col class="text-center" :span="2">灯光运行</Col>
        <Col class="text-center" :span="2">灯光停止</Col>
        <Col class="text-center" :span="2">湿度上限</Col>
        <Col class="text-center" :span="2">湿度下限</Col>
      </Row>
      <Row
        class="align-center mt-[10px] flex"
        v-for="(item, i) in nodeItems"
        :key="i"
        :gutter="10"
      >
        <Col :span="2" class="flex items-center">
          <TreeSelect
            class="w-full"
            v-model:value="item.jd"
            :field-names="{ children: 'items', label: 'name', value: 'id' }"
            :tree-data="boxList"
          />
        </Col>
        <Col :span="2" class="flex items-center">
          <TreeSelect
            class="w-full"
            v-model:value="item.sc"
            :field-names="{ children: 'items', label: 'name', value: 'id' }"
            :tree-data="boxList"
          />
        </Col>
        <Col :span="2" class="flex items-center">
          <TreeSelect
            class="w-full"
            v-model:value="item.scjs"
            :field-names="{ children: 'items', label: 'name', value: 'id' }"
            :tree-data="boxList"
          />
        </Col>
        <Col :span="2">
          <TreeSelect
            class="w-full"
            v-model:value="item.wdsd"
            :field-names="{ children: 'items', label: 'name', value: 'id' }"
            :tree-data="boxList"
          />
        </Col>
        <Col :span="2" class="flex items-center">
          <TreeSelect
            class="w-full"
            v-model:value="item.max_co"
            :field-names="{ children: 'items', label: 'name', value: 'id' }"
            :tree-data="boxList"
          />
        </Col>
        <Col :span="2">
          <TreeSelect
            class="w-full"
            v-model:value="item.min_co"
            :field-names="{ children: 'items', label: 'name', value: 'id' }"
            :tree-data="boxList"
          />
        </Col>
        <Col :span="2">
          <TreeSelect
            class="w-full"
            v-model:value="item.nxh_yx"
            :field-names="{ children: 'items', label: 'name', value: 'id' }"
            :tree-data="boxList"
          />
        </Col>
        <Col class="text-center" :span="2">
          <TreeSelect
            class="w-full"
            v-model:value="item.nxh_tz"
            :field-names="{ children: 'items', label: 'name', value: 'id' }"
            :tree-data="boxList"
          />
        </Col>
        <Col :span="2">
          <TreeSelect
            class="w-full"
            v-model:value="item.dg_yx"
            :field-names="{ children: 'items', label: 'name', value: 'id' }"
            :tree-data="boxList"
          />
        </Col>
        <Col class="text-center" :span="2">
          <TreeSelect
            class="w-full"
            v-model:value="item.dg_tz"
            :field-names="{ children: 'items', label: 'name', value: 'id' }"
            :tree-data="boxList"
          />
        </Col>
        <Col :span="2">
          <TreeSelect
            class="w-full"
            v-model:value="item.max_sd"
            :field-names="{ children: 'items', label: 'name', value: 'id' }"
            :tree-data="boxList"
          />
        </Col>
        <Col class="text-center" :span="2">
          <div class="flex items-center">
            <div class="flex-1">
              <TreeSelect
                class="w-full"
                v-model:value="item.min_sd"
                :field-names="{ children: 'items', label: 'name', value: 'id' }"
                :tree-data="boxList"
              />
            </div>
          </div>
        </Col>
      </Row>
    </div>
    <div class="mb-[30px] flex flex-shrink-0">
      <InputNumber class="w-[240px]" v-model:value="rowIndex" :min="0" />
      <Button type="primary" danger class="ml-[24px]" @click="handleDelete">
        删除行
      </Button>
      <Button type="primary" class="ml-[24px]" @click="handleAddRow">
        新增阶段
      </Button>
    </div>
  </Modal>
</template>
