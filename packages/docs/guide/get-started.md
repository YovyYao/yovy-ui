---
search: false

next:
  link: /components/alert
  text: Alert组件
---

# 在这里初步认识一下YovyPlus吧 🥰

## 安装

::: code-group
```bash [npm]
npm i @yovy-ui -D
```
```bash [yarn]
yarn add @yovy-ui -D
```
```bash [pnpm]
pnpm add @yovy-ui -D
```
:::

## 开始使用

### 全局引入

```js
// 引入所有组件
import YovyPlus from 'yovy-ui'
// 引入所有样式
import 'yovy-ui/dist/index.css'

import App from './App.vue'
// 使用插件
createApp(App).use(YovyPlus).mount('#app')
```

```html
<template>
	<yo-button>我是YoButton按钮组件</yo-button>
</template>
```

### 按需引入

YovyUI 提供了按需引入的功能，只需要在需要使用的组件中引入即可。

```vue
<script setup>
  import { YoButton } from 'yovy-ui'
</script>

<template>
  <yo-button>我是YoButton按钮组件</yo-button>
</template>
```

## 特点

:::details YovyPlus都有哪些优点呢 🤔
  - Vite + Viteset + Vitepress 搭建 🤪
  - 轻量级，支持按需引入 🥰
  - monorepo实现分包管理 😎
  - Github Action 实现 CI/CD 自动化部署 😁
  - 利用大模型等AI工具辅助完成产品需求分析，设计思路，组件实现，编写测试用例等，提高开发效率 😏
:::