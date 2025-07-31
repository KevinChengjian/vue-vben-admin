<script lang="ts" setup>
import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { Descriptions, DescriptionsItem } from 'ant-design-vue';

const detail = ref<any>();
const [Modal, ModalApi] = useVbenModal({
  closeOnClickModal: false,
  footer: false,
  onOpenChange: async (isOpen: boolean) => {
    if (!isOpen) return;
    detail.value = ModalApi.getData();
    ModalApi.setData({});
  },
});
</script>
<template>
  <Modal title="拌料详情" class="w-[860px]" content-class="py-[20px] pl-[38px]">
    <Descriptions :column="3">
      <DescriptionsItem :span="1" label="制包编号">
        {{ detail?.make_bag_sn }}
      </DescriptionsItem>
      <DescriptionsItem :span="1" label="制包日期">
        {{ detail?.make_at }}
      </DescriptionsItem>
      <DescriptionsItem :span="1" label="配方名称">
        {{ detail?.formula_name }}
      </DescriptionsItem>
      <DescriptionsItem :span="1" label="拌料罐数">
        {{ detail?.can_num }}
      </DescriptionsItem>
      <DescriptionsItem :span="2" label="记录人员">
        {{ detail?.nickname }}
      </DescriptionsItem>
      <DescriptionsItem :span="3" label="备注">
        {{ detail?.remark }}
      </DescriptionsItem>

      <template v-for="(item, i) in detail?.can_items" :key="i">
        <DescriptionsItem :span="1" label="罐号">
          {{ item?.can_no }}
        </DescriptionsItem>
        <DescriptionsItem :span="1" label="水份">
          {{ item?.moisture }}%
        </DescriptionsItem>
        <DescriptionsItem :span="1" label="PH">
          {{ item?.ph }}
        </DescriptionsItem>
      </template>
    </Descriptions>
  </Modal>
</template>
