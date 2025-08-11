<script lang="ts" setup>
import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import {
  Descriptions,
  DescriptionsItem,
  Image,
  ImagePreviewGroup,
} from 'ant-design-vue';

import { Resource } from '#/api/core/upload';

const detail = ref<any>();
const title = ref<string>('');
const attach = ref<any>([]);
const [Modal, ModalApi] = useVbenModal({
  draggable: true,
  closeOnClickModal: false,
  footer: false,

  onOpenChange: async (isOpen: boolean) => {
    if (!isOpen) return;

    detail.value = ModalApi.getData();
    title.value = `${detail.value.strain_sn}-菌种鉴定`;

    attach.value = [];
    if (detail.value.attach_ids) {
      attach.value = await Resource.fileListApi({
        ids: detail.value.attach_ids,
      });
    }

    ModalApi.setData({});
  },
});
</script>

<template>
  <Modal :title="title" class="w-[860px]">
    <Descriptions size="small" class="ml-[10px]">
      <DescriptionsItem label="菌种编号">
        {{ detail?.strain_sn }}
      </DescriptionsItem>
      <DescriptionsItem label="罐号">
        {{ detail?.canNo }}
      </DescriptionsItem>
      <DescriptionsItem label="品种">
        {{ detail?.varietyText }}
      </DescriptionsItem>
      <DescriptionsItem label="鉴定日期">
        {{ detail?.identification_at }}
      </DescriptionsItem>
      <DescriptionsItem label="鉴定人员">
        {{ detail?.nickname }}
      </DescriptionsItem>
      <DescriptionsItem label="培养时间">
        {{ parseFloat(detail?.hour) }}h
      </DescriptionsItem>
      <DescriptionsItem label="PH">
        {{ detail?.ph }}
      </DescriptionsItem>
      <DescriptionsItem label="菌丝浓度">
        {{ detail?.concentration }}%
      </DescriptionsItem>
      <DescriptionsItem label="判定结果">
        {{ detail?.result }}
      </DescriptionsItem>
      <DescriptionsItem label="备注" :span="3">
        {{ detail?.remark }}
      </DescriptionsItem>
      <DescriptionsItem label="附件" :span="3">
        <ImagePreviewGroup>
          <Image
            class="mr-[10px] !h-[120px] !w-[120px]"
            v-for="(item, i) in attach"
            :key="i"
            :src="item.url"
          />
        </ImagePreviewGroup>
      </DescriptionsItem>
    </Descriptions>
  </Modal>
</template>
