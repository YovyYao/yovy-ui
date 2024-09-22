<script setup lang="ts">
import { type DropdownItemProps } from 'yovy-ui';
import { YoMessage, YoNotification } from '@yovy-ui/components';
import { h } from 'vue';

const items: DropdownItemProps[] = [
  {command: '1', label: '选项1'},
  {command: '2', label: '选项2'},
  {command: '3', label: '选项3', disabled: true},
  {command: '4', label: '选项4'},
  {command: '5', label: '选项5', divided: true},
]

import { jp, kr, en, zhCN, zhTW } from 'yovy-ui';
import { get } from 'lodash-es';
import { computed, ref } from 'vue';

const language = ref('')
const languageMap = {
  jp,
  kr,
  en,
  zhCN,
  zhTW
} as const

const locale = computed(() => get(languageMap, language.value))
const changeLanguage = () => {
  const temp = ['zhCN', 'zhTW', 'kr', 'en', 'jp']
  language.value = temp[(temp.indexOf(language.value) + 1) % temp.length]
}

const open1 = () => {
  YoMessage({
    showClose: true,
    message: 'this is a message',
  })
}
const open2 = () => {
  YoMessage({
    showClose: true,
    message: 'wow! success! ^_^ ',
    type: 'success'
  })
}

const open3 = () => {
  YoMessage({
    showClose: true,
    message: 'warning! 0.0 ',
    type: 'warning'
  })
}

const open4 = () => {
  YoMessage({
    showClose: true,
    message: 'error! X_X ',
    type: 'error'
  })
}

function openNotification1() {
  YoNotification({
    title: "标题1",
    message: h('i', { style: 'color: teal' }, '这是一个通知'),
    position: 'bottom-left'
  })
}

function openNotification2() {
  YoNotification({
    title: "标题2",
    message: h('i', { style: 'color: teal' }, '这是一个通知'),
    position: 'bottom-right'
  })
}

</script>

<template>
  <div class="app">
    <yo-button type="default" size="primary"> Test </yo-button>
    <yo-collapse  :modelValue="['a']">
      <yo-collapse-item title="标题1" name="a">
        <div>内容1</div>
      </yo-collapse-item>
      <yo-collapse-item title="标题2" name="b">
        <div>内容2</div>
      </yo-collapse-item>
      <yo-collapse-item title="标题3" name="c" disabled>
        <div>内容3</div>
      </yo-collapse-item>
      <yo-collapse-item title="标题4" name="d">
        <div>内容4</div>
      </yo-collapse-item>
    </yo-collapse>
    <yo-alert type="success" title="标题" description="描述" show-icon closeable visable> </yo-alert>
    <yo-tooltip content="提示文字" placement="top" trigger="hover">
      <button>Hover Me</button>
    </yo-tooltip>
    <!-- Dropdown组件展示 -->
    <div class="row">
      <div class="col">
        <div class="desc">disabled</div>
        <yo-dropdown :items="items" disabled>
          <span class="dropdown-link">
            Dropdown List
            <yo-icon icon="angle-down" />
          </span>
        </yo-dropdown>
      </div>
      <div class="col">
        <div class="desc">abled</div>
        <yo-dropdown :items="items">
          <span class="dropdown-link">
            Dropdown List
            <yo-icon icon="angle-down"></yo-icon>
          </span>
        </yo-dropdown>
      </div>
    </div>

    <!-- ConfigProvider组件展示 -->
    <yo-button @click="changeLanguage" type="info">切换语言</yo-button>
    <yo-config-provider :locale="locale">
      <yo-popconfirm title="Are you sure to delete this item?">
        <yo-button>Delete</yo-button>
      </yo-popconfirm>
    </yo-config-provider>

    <!-- Message组件展示 -->
    <yo-button :plan="true" @click="open1">Message</yo-button>
    <yo-button :plan="true" @click="open2">Success</yo-button>
    <yo-button :plan="true" @click="open3">Warning</yo-button>
    <yo-button :plan="true" @click="open4">Error</yo-button>

    <yo-button @click="openNotification1" plain>Close automatically</yo-button>
    <yo-button @click="openNotification2" plain>Close without automatically</yo-button>
  </div>
</template>

<style scoped>
.app {
  display: flex;
  justify-content: center
}

.row {
  display: flex;
  flex-direction: row;
}

.col {
  display: flex;
  flex-direction: column;
}

.desc {
  margin-bottom: 10px;
  display: block;
  color: var(--yo-text-color-secondary);
}

.dropdown-link {
  padding: 5px 10px;
  border: 1px solid #ccc;
}

i {
  margin-left: 8px;
}
</style>
