<script lang="ts" setup>
import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';
import { useUserStore } from '@vben/stores';

import { message } from 'ant-design-vue';
import dayjs from 'dayjs';

import { useVbenForm } from '#/adapter/form';
import { Dict } from '#/api';
import { Material } from '#/api/core/material';

import { createApi, updateApi } from './api';

const emit = defineEmits(['reload']);

const userStore = useUserStore();
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
      component: 'MaterialSnSelect',
      fieldName: 'material_sn',
      label: '原料编号',
      rules: 'required',
      componentProps: {
        placeholder: '请输入原料编号',
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
      component: 'DictSelect',
      fieldName: 'material_id',
      label: '检测原料',
      rules: 'required',
      componentProps: {
        class: 'w-full',
        showSearch: true,
        placeholder: '请选择检测原料',
        code: Dict.KeyEnum.MATERIAL,
      },
      dependencies: {
        triggerFields: ['material_sn'],
        trigger: async (values) => {
          const { ids } = await Material.materialIds({
            keyword: values.material_sn,
          });
          StoreFromApi.updateSchema([
            {
              fieldName: 'material_id',
              componentProps: {
                filters: ids,
              },
            },
          ]);
        },
      },
    },
    {
      component: 'DatePicker',
      fieldName: 'detection_at',
      label: '检测日期',
      rules: 'required',
      componentProps: {
        format: 'YYYY-MM-DD',
        valueFormat: 'YYYY-MM-DD',
        class: 'w-full',
        placeholder: '请输入检测日期',
      },
    },
    {
      component: 'DictSelect',
      fieldName: 'machine_id',
      label: '检测机器',
      rules: 'required',
      componentProps: {
        class: 'w-full',
        showSearch: true,
        placeholder: '请选择检测机器',
        code: Dict.KeyEnum.MATERIAL_MACHINE,
      },
    },
    {
      component: 'InputNumber',
      fieldName: 'moisture',
      label: '水份',
      componentProps: {
        addonAfter: '%',
        class: 'w-full',
        placeholder: '请输入水份',
      },
    },
    {
      component: 'InputNumber',
      fieldName: 'ph',
      label: 'PH值',
      componentProps: {
        class: 'w-full',
        placeholder: '请输入PH值',
      },
    },
    {
      component: 'InputNumber',
      fieldName: 'protein',
      label: '含碳量',
      componentProps: {
        addonAfter: '%',
        class: 'w-full',
        placeholder: '请输入含碳量',
      },
    },
    {
      component: 'InputNumber',
      fieldName: 'nitrogen',
      label: '含氮量',
      componentProps: {
        addonAfter: '%',
        class: 'w-full',
        placeholder: '请输入含氮量',
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

const isUpdate = ref<boolean>(false);
const [Modal, ModalApi] = useVbenModal({
  closeOnClickModal: false,
  onOpenChange: async (isOpen: boolean) => {
    StoreFromApi.resetForm();
    if (!isOpen) return;

    const data = ModalApi.getData();
    ModalApi.setData({});

    // 默认值
    await StoreFromApi.setValues({
      detection_at: dayjs().format('YYYY-MM-DD'),
      user_id: userStore.userInfo?.userId,
    });

    isUpdate.value = data.isEdit;
    data.record &&
      (await StoreFromApi.setValues({
        ...data.record,
        user_id: data.record?.user_id || undefined,
      }));
  },
  onConfirm: async () => {
    try {
      await StoreFromApi.validate();
      const values = await StoreFromApi.getValues();
      await (values?.id ? updateApi(values) : createApi(values));

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
    class="w-[960px]"
    content-class="pt-[20px] pb-0"
  >
    <StoreForm />
  </Modal>
</template>
