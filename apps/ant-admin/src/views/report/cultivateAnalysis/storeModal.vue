<script lang="ts" setup>
import { useVbenModal } from '@vben/common-ui';

const [Modal] = useVbenModal({
  closeOnClickModal: false,
  footer: false,
  onOpenChange: async (isOpen: boolean) => {
    if (!isOpen) return;
  },
});
</script>
<template>
  <Modal
    title="菌包生长分析"
    class="w-[960px]"
    content-class="pt-[20px] pb-0"
  />
</template>
