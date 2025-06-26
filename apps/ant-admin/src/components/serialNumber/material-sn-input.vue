<script setup lang="ts">
import { Button, Input } from 'ant-design-vue';

import { Material } from '#/api/core/material';

defineOptions({ customOptions: { name: 'MaterialSnInput' } });

const model = defineModel({ type: String });

const handleBuild = async () => {
  model.value = await Material.materialSn();
};
</script>
<template>
  <div class="flex w-full gap-1">
    <Input
      v-model:value="model"
      placeholder="请输入原料编号"
      class="flex-1"
      allow-clear
    />
    <Button @click="handleBuild">自动生成</Button>
  </div>
</template>
