<script lang="ts" setup>
import type { CanItem } from './type';

import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';
import { useUserStore } from '@vben/stores';

import { Col, InputNumber, message, Row } from 'ant-design-vue';
import dayjs from 'dayjs';

import { useVbenForm } from '#/adapter/form';
import { Dict } from '#/api';

import { createApi, updateApi } from './api';

const emit = defineEmits(['reload']);

const userStore = useUserStore();
const date = ref<string>('');
const formula = ref<string>('');
const [StoreForm, StoreFromApi] = useVbenForm({
  schema: [
    {
      component: 'Input',
      fieldName: 'id',
      label: 'Id',
      dependencies: {
        triggerFields: ['id'],
        show: () => {
          return false;
        },
      },
    },
    {
      component: 'DatePicker',
      fieldName: 'make_at',
      label: '制包日期',
      rules: 'required',
      componentProps: {
        valueFormat: 'YYYY-MM-DD',
        class: 'w-full',
        placeholder: '请选择制包日期',
        onChange: async (e: any) => {
          date.value = dayjs(e).format('YYYYMMDD');
          if (date.value && formula.value) {
            StoreFromApi.setValues({
              make_bag_sn: `${date.value}-${formula.value}`,
            });
          }
        },
      },
    },
    {
      component: 'FormulaSelect',
      fieldName: 'formula_id',
      label: '制包配方',
      rules: 'selectRequired',
      componentProps: {
        class: 'w-full',
        showSearch: true,
        placeholder: '请选择制包配方',
        onChange: (_: any, opt: any) => {
          formula.value = opt.label;
          if (date.value && formula.value) {
            StoreFromApi.setValues({
              make_bag_sn: `${date.value}-${formula.value}`,
            });
          }
        },
      },
    },
    {
      component: 'Input',
      fieldName: 'make_bag_sn',
      label: '制包编号',
      rules: 'required',
      componentProps: {
        placeholder: '请输入制包编号',
      },
    },
    {
      component: 'DictSelect',
      fieldName: 'user_id',
      label: '检测人员',
      rules: 'required',
      componentProps: {
        class: 'w-full',
        placeholder: '请选择检测人员',
        code: Dict.KeyEnum.SYS_USER,
      },
    },
    {
      component: 'InputNumber',
      fieldName: 'can_num',
      label: '拌料罐数',
      rules: 'required',
      componentProps: {
        class: 'w-full',
        placeholder: '请输入拌料罐数',
        onChange: (e: number) => {
          handleCanNum(e);
        },
      },
    },
    {
      component: 'Textarea',
      fieldName: 'remark',
      label: '拌料备注',
      formItemClass: 'col-span-3',
      componentProps: {
        placeholder: '请输入拌料备注',
      },
    },
  ],
  showDefaultActions: false,
  wrapperClass: 'grid-cols-3 mr-[25px]',
  commonConfig: {
    labelWidth: 90,
  },
});

const isUpdate = ref<boolean>(false);
const [Modal, ModalApi] = useVbenModal({
  closeOnClickModal: false,
  onOpenChange: async (isOpen: boolean) => {
    StoreFromApi.resetForm();
    if (!isOpen) return;

    const data = ModalApi.getData();
    ModalApi.setData({});

    // 默认值
    isUpdate.value = data.isEdit;
    canNumItems.value = [];
    if (isUpdate.value) {
      date.value = dayjs(data?.record?.make_at).format('YYYYMMDD');
      canNumItems.value = data?.record?.can_items || [];
      formula.value = data?.record?.formula_name;
    }

    date.value = dayjs().format('YYYYMMDD');
    await StoreFromApi.setValues({
      user_id: userStore.userInfo?.userId,
      make_at: dayjs().format('YYYY-MM-DD'),
    });

    data.record && StoreFromApi.setValues({ ...data.record });
  },
  onConfirm: async () => {
    try {
      await StoreFromApi.validate();
      const values = await StoreFromApi.getValues();
      values.items = canNumItems.value;
      await (values?.id ? updateApi(values) : createApi(values));

      ModalApi.close();
      ModalApi.setData({});
      StoreFromApi.resetForm();
      message.success('操作成功');
      emit('reload');
    } catch {}
  },
});

const canNumItems = ref<CanItem[]>([]);
const handleCanNum = (num: number) => {
  const arr: CanItem[] = [];
  for (let i = 1; i <= num; i++) {
    const ix = canNumItems.value.findIndex((c) => c.can_no === i);
    if (ix === -1) {
      arr.push({ mbr_id: 0, can_no: i, moisture: '', ph: '' });
    } else {
      const item: any = canNumItems.value[ix];
      arr.push({
        mbr_id: item?.mbr_id,
        can_no: item?.can_no,
        moisture: item?.moisture,
        ph: item?.ph,
      });
    }
  }
  canNumItems.value = arr;
};
</script>
<template>
  <Modal
    :title="`${isUpdate ? '编辑拌料记录' : '添加拌料记录'}`"
    class="w-[960px]"
    content-class="pt-[20px] pb-0"
  >
    <StoreForm />
    <div class="ml-[34px] pb-[24px]">
      <Row :gutter="15" class="mb-[15px]">
        <Col class="text-center" :span="8">罐号</Col>
        <Col class="text-center" :span="8">水份</Col>
        <Col class="text-center" :span="8">PH值</Col>
      </Row>
      <Row
        class="align-center mt-[10px] flex"
        v-for="(item, i) in canNumItems"
        :key="i"
        :gutter="15"
      >
        <Col :span="8">
          <InputNumber
            class="w-full"
            v-model:value="item.can_no"
            placeholder="罐号"
          />
        </Col>
        <Col :span="8">
          <InputNumber
            class="w-full"
            v-model:value="item.moisture"
            placeholder="水份"
          />
        </Col>
        <Col :span="8">
          <InputNumber
            class="w-full"
            v-model:value="item.ph"
            placeholder="PH值"
          />
        </Col>
      </Row>
    </div>
  </Modal>
</template>
