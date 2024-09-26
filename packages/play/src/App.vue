<script setup lang="ts">
import { type DropdownItemProps } from 'yovy-ui';
import { YoMessage, YoNotification } from '@yovy-ui/components';
import { h, reactive } from 'vue';

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

const form = reactive({
  name: '',
  desc: '',
})
</script>

<template>
  <div class="app">


    <!-- Input组件展示 -->
    <yo-input v-model="form.name" is-show-password clearable type="password" placeholder="请输入内容" />
    <yo-input v-model="form.desc" placeholder="请输入内容" />
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
