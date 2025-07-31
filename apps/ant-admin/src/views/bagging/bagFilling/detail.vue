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
  <Modal title="装袋详情" class="w-[960px]" content-class="py-[20px] pl-[38px]">
    <Descriptions :column="7">
      <DescriptionsItem :span="2" label="制包编号">
        {{ detail?.make_bag_sn }}
      </DescriptionsItem>
      <DescriptionsItem :span="2" label="装袋日期">
        {{ detail?.bagging_at }}
      </DescriptionsItem>
      <DescriptionsItem :span="3" label="配方名称">
        {{ detail?.formula_name }}
      </DescriptionsItem>
      <DescriptionsItem :span="2" label="装袋机器">
        {{ detail?.machineName }}
      </DescriptionsItem>
      <DescriptionsItem :span="2" label="装袋数量">
        {{ detail?.num }}
      </DescriptionsItem>
      <DescriptionsItem :span="3" label="记录人员">
        {{ detail?.nickname }}
      </DescriptionsItem>
      <DescriptionsItem :span="7" label="备注">
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
        <DescriptionsItem :span="1" label="重量">
          {{ item?.weight }}kg
        </DescriptionsItem>
        <DescriptionsItem :span="1" label="中孔深度">
          {{ item?.depth }}cm
        </DescriptionsItem>
        <DescriptionsItem :span="1" label="高度">
          {{ item?.height }}cm
        </DescriptionsItem>
        <DescriptionsItem :span="1" label="松紧度">
          {{ item?.dt }}
        </DescriptionsItem>
      </template>
    </Descriptions>
  </Modal>
</template>
