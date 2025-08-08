<script lang="ts" setup>
import type { ListItem } from './type';

import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';
import { useUserStore } from '@vben/stores';

import {
  Button,
  Descriptions,
  DescriptionsItem,
  message,
  Space,
} from 'ant-design-vue';
import dayjs from 'dayjs';

import { useVbenForm } from '#/adapter/form';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { Dict } from '#/api';
import { useDelete } from '#/hooks';

import {
  AuthCode,
  outApi,
  outDeleteApi,
  outListApi,
  outUpdateApi,
} from './api';

const date = ref<string>('');
const room = ref<string>('');
const userStore = useUserStore();
const [StoreForm, StoreFromApi] = useVbenForm({
  schema: [
    {
      component: 'Input',
      fieldName: 'id',
      label: 'id',
      dependencies: {
        triggerFields: ['vr_id'],
        show: () => {
          return false;
        },
      },
    },
    {
      component: 'Input',
      fieldName: 'cr_id',
      label: 'cr_id',
      dependencies: {
        triggerFields: ['vr_id'],
        show: () => {
          return false;
        },
      },
    },
    {
      component: 'DictSelect',
      fieldName: 'room_id',
      label: '出菇房',
      rules: 'required',
      componentProps: {
        class: 'w-full',
        code: Dict.KeyEnum.FRUITING_HOUSE,
        placeholder: '请选择出菇房',
        onChange: async (_: any, opt: any) => {
          room.value = opt.label;
          if (room.value && date.value) {
            await StoreFromApi.setValues({
              fruiting_sn: `${date.value}-${room.value}`,
            });
          }
        },
      },
    },
    {
      component: 'DatePicker',
      fieldName: 'out_at',
      label: '出库日期',
      rules: 'required',
      componentProps: {
        valueFormat: 'YYYY-MM-DD',
        class: 'w-full',
        placeholder: '请选择出库日期',
        onChange: async (e: any) => {
          date.value = dayjs(e).format('YYYYMMDD');
          if (room.value && date.value) {
            await StoreFromApi.setValues({
              fruiting_sn: `${date.value}-${room.value}`,
            });
          }
        },
      },
    },
    {
      component: 'Input',
      fieldName: 'fruiting_sn',
      label: '出菇编号',
      rules: 'required',
      componentProps: {
        class: 'w-full',
        placeholder: '请输入出菇编号',
      },
    },
    {
      component: 'InputNumber',
      fieldName: 'num',
      label: '出库数量',
      rules: 'required',
      componentProps: {
        class: 'w-full',
        placeholder: '请输入出库数量',
      },
    },
    {
      component: 'InputNumber',
      fieldName: 'strain_age',
      label: '养菌期',
      rules: 'required',
      componentProps: {
        class: 'w-full',
        placeholder: '请输入养菌期',
      },
    },
    {
      component: 'InputNumber',
      fieldName: 'temperature',
      label: '包芯温度',
      componentProps: {
        addonAfter: '℃',
        class: 'w-full',
        placeholder: '请输入包芯温度',
      },
    },
    {
      component: 'Textarea',
      fieldName: 'remark',
      label: '备注',
      formItemClass: 'col-span-2',
      componentProps: {
        placeholder: '请输入备注',
      },
    },
  ],
  showDefaultActions: false,
  wrapperClass: 'grid-cols-2 mr-[25px]',
  commonConfig: {
    labelWidth: 90,
  },
});

const row = ref<ListItem>({} as ListItem);
const outList = ref<any>([]);
const showUpdate = ref<boolean>(false);
const [Modal, ModalApi] = useVbenModal({
  draggable: true,
  footer: false,
  closeOnClickModal: false,
  onOpenChange: async (isOpen: boolean) => {
    StoreFromApi.resetForm();
    if (!isOpen) return;

    row.value = ModalApi.getData<ListItem>();
    showUpdate.value = row.value.out_over === 2;
    handleReloadList();

    ModalApi.setData({});

    // 默认值
    date.value = dayjs().format('YYYYMMDD');
    await StoreFromApi.setValues({
      bl_num: row.value.bl_num,
      out_at: dayjs().format('YYYY-MM-DD'),
      cr_id: row.value.id,
      strain_age: row.value.strain_age || undefined,
      user_id: userStore.userInfo?.userId,
    });
  },
  onConfirm: async () => {},
});

const handleSubmit = async () => {
  try {
    await StoreFromApi.validate();
    const values = await StoreFromApi.getValues();
    const data = Object.assign(values, { cr_id: row.value?.id });
    await (values?.id ? outUpdateApi(data) : outApi(data));

    ModalApi.setData({});
    StoreFromApi.resetForm();
    handleReloadList();
    message.success('操作成功');
  } catch {}
};

const handleReset = async () => {
  StoreFromApi.resetForm();
};

const [Grid, gridApi] = useVbenVxeGrid({
  gridOptions: {
    columns: [
      {
        title: '出库日期',
        field: 'out_at',
        align: 'center',
        minWidth: 200,
      },
      {
        title: '出菇编号',
        field: 'fruiting_sn',
        align: 'center',
        minWidth: 200,
      },
      {
        title: '出菇房',
        field: 'room',
        align: 'center',
        minWidth: 200,
      },
      {
        title: '出库数量',
        field: 'num',
        align: 'center',
        minWidth: 200,
      },
      {
        title: '养菌期',
        field: 'strain_age',
        align: 'center',
        minWidth: 200,
      },
      {
        title: '包芯温度',
        field: 'temperature',
        align: 'center',
        minWidth: 200,
      },
      {
        title: '操作',
        field: 'action',
        align: 'center',
        minWidth: 90,
        fixed: 'right',
        slots: { default: 'action' },
      },
    ],
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

const handleReloadList = async () => {
  outList.value = await outListApi({ cr_id: row?.value?.id });
  gridApi.grid.reloadData(outList.value);

  let outNum: number = 0;
  outList.value.forEach((item: any) => {
    outNum += item.num;
  });

  row.value.out_num = outNum;
  row.value.bl_num =
    row.value?.put_num - row.value?.out_num - row.value?.bad_num;
  row.value.out_over = row.value.bl_num <= 0 ? 1 : 2;
};

const handleOutUpdate = async (data: any) => {
  showUpdate.value = true;
  await StoreFromApi.setValues({ ...data });
};

// 删除
const { destory } = useDelete<ListItem>({
  api: outDeleteApi,
  callback: () => {
    handleReloadList();
  },
});
</script>
<template>
  <Modal
    title="菌包出库"
    class="w-[1400px]"
    content-class="pt-[20px] pb-[24px]"
  >
    <Descriptions class="mb-[15px] ml-[32px]">
      <DescriptionsItem label="菌包编号">{{ row?.mb_sn }}</DescriptionsItem>
      <DescriptionsItem label="库房位置">{{ row?.location }}</DescriptionsItem>
      <DescriptionsItem label="入库数量">{{ row?.put_num }}</DescriptionsItem>
      <DescriptionsItem label="损耗数量">{{ row?.bad_num }}</DescriptionsItem>
      <DescriptionsItem label="出库数量">{{ row?.out_num }}</DescriptionsItem>
      <DescriptionsItem label="剩余数量">{{ row?.bl_num }}</DescriptionsItem>
    </Descriptions>

    <!-- 出库明细 -->
    <Grid>
      <template #action="{ row: item }">
        <Space :size="15">
          <div
            class="text-primary cursor-pointer"
            @click="handleOutUpdate(item)"
            v-access:code="AuthCode.OutUpdate"
          >
            编辑
          </div>
          <div
            class="text-destructive cursor-pointer"
            @click="destory({ id: item.id })"
            v-access:code="AuthCode.OutDelete"
          >
            删除
          </div>
        </Space>
      </template>
    </Grid>

    <StoreForm class="mt-[15px]" v-if="showUpdate" />
    <div class="flex items-center justify-center" v-if="showUpdate">
      <Space :size="15">
        <Button @click="handleReset">重置</Button>
        <Button type="primary" @click="handleSubmit">提交</Button>
      </Space>
    </div>
  </Modal>
</template>
