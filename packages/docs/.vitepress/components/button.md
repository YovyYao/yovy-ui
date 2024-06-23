---
title: Button
description: Button 组件文档

next:
	link: /components/icon
	text: Icon 图标

prev:
	link: /components/alert
	text: Alert 消息提示

---


# Button 按钮

常用的按钮

## 基础用法

使用 `type` 属性来定义 Button 的类型，支持 `primary`、`success`、`warning`、`danger` 四种类型，默认为 `default`。

::: preview
demo-preview=../demo/button/Base.vue
:::

## 禁用状态

你可以使用 `disabled` 属性来定义按钮是否可用，它接受一个 `Boolean`，默认为 `false`。

::: preview
demo-preview=../demo/button/Disabled.vue
:::

## 加载状态

你可以使用 `loading` 属性来定义按钮是否处于加载状态，它接受一个 `Boolean`，默认为 `false`。

::: preview
demo-preview=../demo/button/Loading.vue
:::

## 图标按钮

你可以使用 `icon` 属性来定义按钮的图标，它接受一个 `String`，默认为 `''`。

::: preview
demo-preview=../demo/button/Icon.vue
:::

## 按钮尺寸

你可以使用 `size` 属性来定义按钮组的尺寸，它接受一个 `String`，默认为 `''`。

::: preview
demo-preview=../demo/button/Size.vue
:::



## 按钮组合

你可以使用 `ButtonGroup` 组件来定义按钮组，它接受一个 `Array`，默认为 `[]`。

::: preview
demo-preview=../demo/button/Group.vue
:::

## Tag

你可以使用 `Tag` 组件来定义按钮组，它接受一个 `Array`，默认为 `[]`。

::: preview
demo-preview=../demo/button/Tag.vue
:::

## 节流模式

可以通过 `throttle` 属性来设置节流模式，默认为 `false`。

::: preview
demo-preview=../demo/button/Throttle.vue
:::

## Button API

### Props

| Name | Description | Type | Default |
| ---  |     ---     | ---  |   ---   |
| type | 按钮类型 | `string` | `default` |
| size | 按钮大小 | `string` | `default` |
| disabled | 是否禁用 | `boolean` | `false` |
| loading | 是否加载中 | `boolean` | `false` |
| plain | 是否朴素按钮 | `boolean` | `false` |
| round | 是否圆角按钮 | `boolean` | `false` |
| circle | 是否圆形按钮 | `boolean` | `false` |
| icon | 图标类名 | `string` | `''` |
| autofocus | 是否默认聚焦 | `boolean` | `false` |
| nativeType | 原生 type 属性 | `string` | `button` |
| block | 是否为块级元素 | `boolean` | `false` |
| loading | 是否加载中状态 | `boolean` | `false` |
| disabled | 是否禁用状态 | `boolean` | `false` |
| plain | 是否朴素按钮 | `boolean` | `false` |
| round | 是否圆角按钮 | `boolean` | `false` |
| circle | 是否圆形按钮 | `boolean` | `false` |

