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
  closeOnClickModal: false,
  footer: false,

  onOpenChange: async (isOpen: boolean) => {
    if (!isOpen) return;

    detail.value = ModalApi.getData();
    title.value = `${detail.value.strain_sn}-日报表`;

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
        {{ detail?.variety }}
      </DescriptionsItem>
      <DescriptionsItem label="观察日期">
        {{ detail?.observe_at }}
      </DescriptionsItem>
      <DescriptionsItem label="记录人员">
        {{ detail?.nickname }}
      </DescriptionsItem>
      <DescriptionsItem label="菌龄">
        {{ detail?.strain_age }}
      </DescriptionsItem>
      <DescriptionsItem label="培养时间">
        {{ parseFloat(detail?.hour) }}h
      </DescriptionsItem>
      <DescriptionsItem label="气味">
        {{ detail?.smell }}
      </DescriptionsItem>
      <DescriptionsItem label="菌种状态">
        {{ detail?.state }}
      </DescriptionsItem>
      <DescriptionsItem label="风速">
        {{ detail?.wind_speed }}
      </DescriptionsItem>
      <DescriptionsItem label="温度">
        {{ parseFloat(detail?.temperature) }}℃
      </DescriptionsItem>
      <DescriptionsItem label="有无杂菌">
        {{ detail?.variedText }}
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
