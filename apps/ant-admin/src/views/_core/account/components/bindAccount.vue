<script lants="ts" setup>
import { ref } from 'vue';

import { List, ListItem, ListItemMeta } from 'ant-design-vue';

const dataSource = ref([
  {
    title: '微信绑定',
    description: '已绑定',
    value: '',
    actions: {
      title: '解除绑定',
      callback: () => {},
    },
  },
]);
</script>

<template>
  <div>
    <List item-layout="horizontal" :data-source="dataSource">
      <template #renderItem="{ item }">
        <ListItem style="padding: 12px 0">
          <ListItemMeta>
            <template #title>
              <a>{{ item.title }}</a>
            </template>
            <template #description>
              <span>
                <span>{{ item.description }}</span>
                <span> ：</span>
                <span>{{ item.value }}</span>
              </span>
            </template>
          </ListItemMeta>
          <template #actions v-if="item.actions">
            <a
              class="text-primary cursor-pointer"
              @click="item.actions.callback"
            >
              {{ item.actions.title }}
            </a>
          </template>
        </ListItem>
      </template>
    </List>
  </div>
</template>
