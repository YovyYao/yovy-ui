<script setup lang="ts">
import type { TooltipProps, TooltipEmits, TooltipInstance } from './types';
import { computed, onUnmounted, ref, watch, watchEffect, type Ref } from 'vue';
import { debounce, type DebouncedFunc, bind, isNil } from 'lodash-es';
import { createPopper, type Instance } from '@popperjs/core';
import { clickOutsideElement, eventsOnTriggerNode } from './utils';
import type { ButtonInstance } from '../Button';

// 是否开启虚拟触发
interface _TooltipProps extends TooltipProps {
	virtualRef?: HTMLElement | ButtonInstance | void
	virtualTriggering?: boolean
}

defineOptions({
	name: 'YoTooltip'
})

// 定义props, 并给某些字段提供默认值
const props = withDefaults(defineProps<_TooltipProps>(), {
	placement: 'bottom',
	trigger: 'hover',
	transition: 'fade',
	showTimeout: 0,
	hideTimeout: 200,
})

// 定义组件的emits(事件)
const emits = defineEmits<TooltipEmits>()
// Tooltip默认设置为不可见, 当触发hover, click或呼唤右键菜单时才展示
const visible = ref(false)

// 普通事件
const events: Ref<Record<string, EventListener>> = ref({})
// 外层容器事件
const outerEvents: Ref<Record<string, EventListener>> = ref({})
// 下拉事件
const dropdownEvents: Ref<Record<string, EventListener>> = ref({})

// 容器节点
const containerNode = ref<HTMLElement>()
// 触发节点(用于给triggerNode兜底)
const _triggerNode = ref<HTMLElement>()
// popper相关的DOM节点
const popperNode = ref<HTMLElement>()
// 触发节点. 如果开启了虚拟触发节点, 则使用_triggerNode
const triggerNode = computed(() => {
	if (props.virtualTriggering) {
		return (
			((props.virtualRef as ButtonInstance)?.ref as any) ??
			(props.virtualRef as HTMLElement) ??
			_triggerNode.value
		)
	}
	return _triggerNode.value as HTMLElement
})

// 定义popper.js的位移, 偏移量等配置项
const popperOptions = computed(() => ({
	placements: props.placement,
	modifiers: [
		{
			name: 'offset',
			options: {
				offset: [0, 9],
			},
		},
	],
	...props.popperOptions,
}))

// 若开启防抖, 则创建防抖函数
let openDebounce: DebouncedFunc<() => void> | void
let closeDebounce: DebouncedFunc<() => void> | void

// 展示/隐藏Tooltip的防抖延时, 如果不是hover, 则不需要防抖
const openDelay = computed(() => props.trigger === 'hover' ? props.showTimeout : 0)
const closeDelay = computed(() => props.trigger === 'hover' ? props.hideTimeout : 0)

const triggerStrategyMap: Map<string, () => void> = new Map()
triggerStrategyMap.set("hover", () => {
	events.value['mouseenter'] = openFinal
	outerEvents.value['mouseleave'] = closeFinal
	dropdownEvents.value['mouseenter'] = openFinal
})
triggerStrategyMap.set("click", () => {
	events.value['click'] = togglePopper
})
triggerStrategyMap.set('contextmenu', () => {
	events.value['contextmenu'] = e => {
		e.preventDefault()
		openFinal()
	}
})

function openFinal() {
	closeDebounce?.cancel()
	openDebounce?.()
}

function closeFinal() {
	openDebounce?.cancel()
	closeDebounce?.()
}

/**
 * 如果Tooltip可见, 则调用closeFinal()关闭Tooltip, 否则调用openFinal()打开Tooltip
 */
function togglePopper() {
	visible.value ? closeFinal() : openFinal()
}

/**
 * 设置Visible. 如果Tooltip不可见, 则无法设置
 * @param value 是否开启Visible
 */
function setVisible(value: boolean) {
	if (props.disabled) return
	visible.value = value
	emits('visible-change', value)
}

/**
 * 
 */
function attachEvents() {
	if (props.disabled || props.manual) return
	triggerStrategyMap.get(props.trigger)?.()
	// if (props.trigger === 'hover') {
	// 	events.value['mouseenter'] = openFinal
	// 	outerEvents.value['mouseleave'] = closeFinal
	// 	dropdownEvents.value['mouseenter'] = openFinal
	// 	return
	// }
	// if (props.trigger === 'click') {
	// 	events.value['click'] = togglePopper
	// 	return
	// }
	// if (props.trigger === 'contextmenu') {
	// 	events.value['contextmenu'] = (e) => {
	// 		e.preventDefault()
	// 		openFinal()
	// 	}
	// 	return
	// }
}

let popperInstance: null | Instance

/**
 * 销毁popper实例, 从而销毁Tooltip组件, 并执行popperInstance = null, 防止内存泄漏
 */
function destroyPopperInstance() {
	if(isNil(popperInstance)) return
	popperInstance.destroy()
	popperInstance = null
}

/**
 * 重置Events
 */
function resetEvents() {
	events.value = {}
	outerEvents.value = {}
	dropdownEvents.value = {}
	attachEvents()
}

if (!props.manual) {
	attachEvents()
}

const show: TooltipInstance['show'] = openFinal
const hide: TooltipInstance['hide'] = function() {
	openDebounce?.cancel()
	setVisible(false)
}

/**
 * 监听visible. 如果开启了触发节点和popper节点, 则调用popperjs创建一个popper对象, 其服务于Tooltip. 
 */
watch(
	visible,
	(newValue) => {
		if (!newValue) return
		if (triggerNode.value && popperNode.value) {
			popperInstance = createPopper(
				triggerNode.value,
				popperNode.value,
				popperOptions.value,
			)
		}
	},
	{ flush: 'post'}
)

watch(
	() => props.manual,
	isManual => {
		if (isManual) {
			events.value = {}
			outerEvents.value = {}
			dropdownEvents.value = {}
			return
		}
		attachEvents()
	},
)

watch(
	() => props.trigger,
	(newValue, oldValue) => {
		if (newValue === oldValue) return
		openDebounce?.cancel()
		visible.value = false
		emits('visible-change', false)
		resetEvents()
	}
)

// 监听disabled. 如果disabled发生了变化, 则销毁popper实例, 并重置Events
watch(
	() => props.disabled,
	(newValue, oldValue) => {
		if (newValue === oldValue) return
		openDebounce?.cancel()
		visible.value = false
		emits('visible-change', false)
		resetEvents()
	}
)

// 判断点击的地方是否在containerNode容器里面, 如果???, 则触发click-outside事件. 如果popper的触发方式不是hover或者不是manual模式, 并且如果设置了可见的条件下, 执行closeFianl()关闭popper
clickOutsideElement(containerNode, () => {
	emits('click-outside')
	if (props.trigger === 'hover' || props.manual) return

	visible.value && closeFinal()
})

watchEffect(() => {
	// if (!props.manual) {
	// 	attachEvents()
	// }
	openDebounce = debounce(bind(setVisible, null, true), openDelay.value)
	closeDebounce = debounce(bind(setVisible, null, false), closeDelay.value)
})

eventsOnTriggerNode(props, triggerNode, events, () => {
	openDebounce?.cancel()
	setVisible(false)
})

onUnmounted(() => {
	destroyPopperInstance()
})

defineExpose<TooltipInstance>({
	show,
	hide,
})
</script>

<template>
	<div class="yo-tooltip" ref="containerNode" v-on="outerEvents">
		<!-- 触发器. 可以通过'click', 'hover', 'contextmenu'触发Tooltip的显示和隐藏 -->
		<div
			class="yo-tooltip__trigger"
			ref="_triggerNode"
			v-on="events"
			v-if="!virtualTriggering"
		>
			<slot></slot>
		</div>
		<slot name="default" v-else></slot>
		<!-- Tooltip的popper. 由触发器决定是否显示和隐藏 -->
		<transition :name="transition" @after-leave="destroyPopperInstance">
			<div
				class="yo-tooltip__popper"
				ref="popperNode"
				v-on="dropdownEvents"
				v-if="visible"
			>
				<slot name="content">
					{{content}}
				</slot>
				<div id="arrow" data-popper-arrow></div>
			</div>
		</transition>
	</div>
</template>

<style scoped>
@import './style.css'
</style>