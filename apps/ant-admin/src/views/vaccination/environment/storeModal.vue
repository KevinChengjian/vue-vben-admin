<script lang="ts" setup>
import type { AreaItem } from './type';

import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';
import { useUserStore } from '@vben/stores';

import { Col, Input, message, Row } from 'ant-design-vue';
import dayjs from 'dayjs';

import { useVbenForm } from '#/adapter/form';
import { Dict } from '#/api';
import { useDictStore } from '#/store';

import { createApi, updateApi } from './api';
import { StoreFormSchema } from './storeSchema';

const emit = defineEmits(['reload']);

const dictStore = useDictStore();
const userStore = useUserStore();
const [StoreForm, StoreFromApi] = useVbenForm({
  schema: StoreFormSchema,
  showDefaultActions: false,
  wrapperClass: 'grid-cols-3 mr-[25px]',
  commonConfig: {
    labelWidth: 90,
  },
});

const isUpdate = ref<boolean>(false);
const areaItems = ref<AreaItem[]>([]);
const [Modal, ModalApi] = useVbenModal({
  closeOnClickModal: false,
  onOpenChange: async (isOpen: boolean) => {
    StoreFromApi.resetForm();
    if (!isOpen) return;

    const data = ModalApi.getData();
    ModalApi.setData({});

    const areas = await dictStore.getDictByKey(Dict.KeyEnum.ENV_REGION);
    const areaItemArr: AreaItem[] = [];
    const exisArea: AreaItem[] = data.record.area || [];
    areas.forEach((item: Dict.ValueItem) => {
      let rs1 = '';
      let rs2 = '';
      let rs3 = '';
      let rs4 = '';
      let rs5 = '';
      if (data.isEdit && exisArea.length > 0) {
        const ii = exisArea.findIndex((i) => i.value === item.value);
        if (ii !== -1) {
          const tItem: any = exisArea[ii];
          rs1 = tItem.rs1 || '';
          rs2 = tItem.rs2 || '';
          rs3 = tItem.rs3 || '';
          rs4 = tItem.rs4 || '';
          rs5 = tItem.rs5 || '';
        }
      }

      areaItemArr.push({
        label: item.label,
        value: item.value,
        rs1,
        rs2,
        rs3,
        rs4,
        rs5,
      });
    });

    areaItems.value = areaItemArr;

    // 默认值
    isUpdate.value = data.isEdit;
    await StoreFromApi.setValues({
      check_at: dayjs().format('YYYY-MM-DD'),
      user_id: userStore.userInfo?.userId,
    });

    data.record && StoreFromApi.setValues({ ...data.record });
  },
  onConfirm: async () => {
    try {
      await StoreFromApi.validate();
      const values = await StoreFromApi.getValues();
      const parmas = Object.assign(values, {
        area: areaItems.value,
      });

      await (values?.id ? updateApi(parmas) : createApi(parmas));

      ModalApi.close();
      ModalApi.setData({});
      StoreFromApi.resetForm();
      message.success('操作成功');
      emit('reload');
    } catch {}
  },
});
</script>
<template>
  <Modal
    :title="`${isUpdate ? '编辑检测记录' : '添加检测记录'}`"
    class="w-[1200px]"
    content-class="pt-[20px] pb-[20px]"
  >
    <StoreForm />
    <Row class="ml-[20px] pb-[10px] text-[#323639]" :gutter="20">
      <Col span="3" class="text-center">位置</Col>
      <Col span="4" class="text-center">培养皿-1</Col>
      <Col span="4" class="text-center">培养皿-2</Col>
      <Col span="4" class="text-center">培养皿-3</Col>
      <Col span="4" class="text-center">培养皿-4</Col>
      <Col span="4" class="text-center">培养皿-5(中)</Col>
    </Row>

    <Row
      class="ml-[20px] mt-[15px] text-[#323639]"
      :gutter="20"
      v-for="(item, index) in areaItems"
      :key="index"
    >
      <Col span="3" class="flex items-center justify-center text-center">
        {{ item.label }}
      </Col>
      <Col span="4"><Input v-model:value="item.rs1" /></Col>
      <Col span="4"><Input v-model:value="item.rs2" /></Col>
      <Col span="4"><Input v-model:value="item.rs3" /></Col>
      <Col span="4"><Input v-model:value="item.rs4" /></Col>
      <Col span="4"><Input v-model:value="item.rs5" /></Col>
    </Row>
  </Modal>
</template>
