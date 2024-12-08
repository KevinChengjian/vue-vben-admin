<script setup lang="ts">
import type { DictKeyItem } from './key/type';

import { ref } from 'vue';

import { Page } from '@vben/common-ui';

import { Col, Row } from 'ant-design-vue';

import DictKey from './key/key.vue';
import DictValue from './value/value.vue';

const currentDictKey = ref<DictKeyItem>({} as DictKeyItem);
</script>

<template>
  <Page class="h-full">
    <Row :gutter="12" class="h-full">
      <Col :lg="7" :span="7" :xs="24">
        <DictKey v-model:value="currentDictKey" />
      </Col>

      <Col :lg="17" :span="17" :xs="24">
        <DictValue :dict-key="currentDictKey" />
      </Col>
    </Row>
  </Page>
</template>
