<script lang="ts" setup>
import type { RoleItem, RuleItem } from './type';

import { defineEmits, ref } from 'vue';

import {
  Button,
  Card,
  Checkbox,
  CheckboxGroup,
  Col,
  Row,
  Tree,
} from 'ant-design-vue';

import { roleRulesApi, roleSaveRulesApi } from './api';

const emit = defineEmits(['reload']);
const role = ref<RoleItem>();
const menuTree = ref<any>([]);
const ruleList = ref<RuleItem[]>([]);
const menuTreeSk = ref<any>([]);

const handleRoleRules = async (item: RoleItem) => {
  role.value = item;
  const res = await roleRulesApi({});
  menuTree.value = res.menus || [];
  ruleList.value = res.actions || [];
};
defineExpose({ handleRoleRules });

const activeIndex = ref<number>(0);
const selectIds = ref<number[]>([]);
const handleSelMenu = (menu: any) => {
  activeIndex.value = 0;
  if (menu.length > 0) {
    activeIndex.value = menu[0];
  }
};

const handleSubmit = async () => {
  try {
    await roleSaveRulesApi({ rules: selectIds.value, id: role.value?.id });
    emit('reload');
  } catch {}
};

// 全选/取消
const checkAll = ref<boolean>(false);
const handleSelectAll = (e: any) => {
  checkAll.value = false;
  readonlyAll.value = false;
  const ids: number[] = [];
  if (e.target.checked) {
    ruleList.value.forEach((item: any) => {
      ids.push(item.id);
      item.children.forEach((i: any) => {
        ids.push(i.id);
      });
      checkAll.value = true;
    });
  }
  selectIds.value = ids;
};

const readonlyAll = ref<boolean>(false);
const handleSelectReadonly = (e: any) => {
  readonlyAll.value = false;
  checkAll.value = false;
  const ids: number[] = [];
  if (e.target.checked) {
    ruleList.value.forEach((item: any) => {
      let ms = false;
      item.children.forEach((i: any) => {
        if (i.title.includes('查看')) {
          ids.push(i.id);
          ms = true;
        }
      });
      ms && ids.push(item.id);
      readonlyAll.value = true;
    });
  }
  selectIds.value = ids;
};

const handleSelectMenuItem = (e: any, id: number, mi: number) => {
  activeIndex.value = id;
  const children = ruleList.value[mi]?.children || [];
  menuTreeSk.value = [id];
  if (e.target.checked) {
    children.forEach((i: any) => {
      !selectIds.value.includes(i.id) && selectIds.value.push(i.id);
    });
    return;
  }
  children.forEach((i: any) => {
    const index = selectIds.value.indexOf(i.id);
    index !== -1 && selectIds.value.splice(index, 1);
  });
  checkAll.value = false;
};

const handleSelectActionItem = (
  e: any,
  id: number,
  pid: number,
  mi: number,
) => {
  menuTreeSk.value = [pid];
  activeIndex.value = pid;
  if (e.target.checked) {
    !selectIds.value.includes(id) && selectIds.value.push(id);
    !selectIds.value.includes(pid) && selectIds.value.push(pid);
    return;
  }
  let removePid = true;
  const children = ruleList.value[mi]?.children || [];
  for (const child of children) {
    if (selectIds.value.includes(child?.id as number)) {
      removePid = false;
      break;
    }
  }
  // 删除父级元素
  if (removePid) {
    const index = selectIds.value.indexOf(pid);
    index !== -1 && selectIds.value.splice(index, 1);
  }
  checkAll.value = false;
};
</script>
<template>
  <Card
    :bordered="false"
    class="h-full"
    title="角色权限"
    :body-style="{ padding: '15px 24px 24px 12px' }"
  >
    <template #extra>
      <Button type="primary" @click="handleSubmit"> 保存权限 </Button>
    </template>

    <div class="flex items-start">
      <div class="ml-[15px] flex w-[200px] flex-shrink-0">
        <Tree
          v-if="menuTree.length > 0"
          show-line
          :tree-data="menuTree"
          :field-names="{ children: 'children', title: 'title', key: 'id' }"
          :default-expand-all="true"
          v-model:selected-keys="menuTreeSk"
          @select="handleSelMenu"
        />
      </div>

      <div class="flex flex-1 flex-col">
        <div class="mb-[15px] flex items-center">
          <div class="ml-[5px] w-[160px]">
            <Checkbox :checked="checkAll" @change="handleSelectAll">
              <span class="text-primary select-none text-[16px]">全选</span>
            </Checkbox>
          </div>

          <div class="w-[160px]">
            <Checkbox :checked="readonlyAll" @change="handleSelectReadonly">
              <span class="text-primary select-none text-[16px]">仅查看</span>
            </Checkbox>
          </div>
        </div>

        <CheckboxGroup class="w-full" v-model:value="selectIds">
          <div class="w-full">
            <div
              class="mt-[24px] flex items-start border-b border-[#f0f0f0] pb-[15px] pl-[5px]"
              v-for="(item, mi) in ruleList"
              :key="mi"
              :class="{ 'menu-bg': item.id === activeIndex }"
            >
              <div class="w-[160px] flex-shrink-0">
                <Checkbox
                  :value="item.id"
                  @change="handleSelectMenuItem($event, item.id, mi)"
                >
                  <span class="select-none text-[14px] text-[#333]">{{
                    item.title
                  }}</span>
                </Checkbox>
              </div>

              <Row :gutter="15" class="flex" style="flex: 1">
                <Col
                  :xxxl="4"
                  :xxl="4"
                  :xl="6"
                  :md="6"
                  :sx="8"
                  :span="6"
                  class="pb-[10px] pt-[2px]"
                  v-for="act in item.children"
                  :key="act.id"
                  @change="handleSelectActionItem($event, act.id, item.id, mi)"
                >
                  <Checkbox :value="act.id">
                    <span class="select-none text-[14px] text-[#666]">
                      {{ act.title }}
                    </span>
                  </Checkbox>
                </Col>
              </Row>
            </div>
          </div>
        </CheckboxGroup>
      </div>
    </div>
  </Card>
</template>

<style scoped lang="less">
.menu-bg {
  border-color: hsl(var(--primary)) !important;
}
</style>
