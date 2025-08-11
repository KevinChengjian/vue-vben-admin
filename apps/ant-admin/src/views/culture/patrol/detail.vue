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
    title.value = `${detail.value.mb_sn}`;

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
    <Descriptions title="发菌情况" size="small" class="ml-[10px]">
      <DescriptionsItem label="巡库日期">
        {{ detail?.patrol_at }}
      </DescriptionsItem>
      <DescriptionsItem label="巡库人员">
        {{ detail?.nickname }}
      </DescriptionsItem>
      <DescriptionsItem label="养菌房">
        {{ detail?.warehouse }}
      </DescriptionsItem>
      <DescriptionsItem label="发菌">
        {{ detail?.fh }}
      </DescriptionsItem>

      <DescriptionsItem label="包温1"> {{ detail?.bag_t }}℃ </DescriptionsItem>
      <DescriptionsItem label="包温2"> {{ detail?.bag_t1 }}℃ </DescriptionsItem>
      <DescriptionsItem label="菌龄">
        {{ detail?.strain_age }}
      </DescriptionsItem>
      <DescriptionsItem label="后熟" :span="2">
        {{ detail?.postripeness }}
      </DescriptionsItem>
      <DescriptionsItem label="备注" :span="3">
        {{ detail?.postripeness }}
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

    <Descriptions title="库房情况" size="small" class="ml-[10px] mt-[20px]">
      <DescriptionsItem label="设定温度">
        {{ detail?.set_wd }}℃
      </DescriptionsItem>
      <DescriptionsItem label="设定CO₂">
        {{ detail?.set_cd }}
      </DescriptionsItem>
      <DescriptionsItem label="设定湿度">
        {{ detail?.set_humidity }}
      </DescriptionsItem>
      <DescriptionsItem label="实际温度1"> {{ detail?.wd }}℃ </DescriptionsItem>
      <DescriptionsItem label="实际温度2">
        {{ detail?.wd2 }}℃
      </DescriptionsItem>
      <DescriptionsItem label="实际均温">
        {{ detail?.reality_temperature }}℃
      </DescriptionsItem>
      <DescriptionsItem label="实际CO₂">
        {{ detail?.reality_cd }}
      </DescriptionsItem>
      <DescriptionsItem label="实际湿度">
        {{ detail?.reality_humidity }}
      </DescriptionsItem>
    </Descriptions>

    <Descriptions title="天气情况" size="small" class="ml-[10px] mt-[20px]">
      <DescriptionsItem label="天气高温">
        {{ detail?.max_t }}℃
      </DescriptionsItem>
      <DescriptionsItem label="天气低温">
        {{ detail?.min_t }}℃
      </DescriptionsItem>
      <DescriptionsItem label="天气湿度">
        {{ detail?.humidity }}
      </DescriptionsItem>
      <DescriptionsItem label="天气情况">
        {{ detail?.weather }}
      </DescriptionsItem>
    </Descriptions>
  </Modal>
</template>
