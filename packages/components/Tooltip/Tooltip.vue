<script setup lang="ts">
import type { TooltipProps, TooltipEmits, TooltipInstance } from './types';
import { computed, onUnmounted, ref, watch, watchEffect, type Ref } from 'vue';
import { debounce, type DebouncedFunc, bind, isNil } from 'lodash-es';
import { createPopper, type Instance } from '@popperjs/core';
import { clickOutsideElement } from './utils';

defineOptions({
	name: 'YoTooltip'
})

// 定义props, 并给某些字段提供默认值
const props = withDefaults(defineProps<TooltipProps>(), {
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
// 触发节点
const triggerNode = ref<HTMLElement>()
// popper相关的DOM节点
const popperNode = ref<HTMLElement>()

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

/**
 * 
 */
function openFinal() {
	closeDebounce?.cancel()
	openDebounce?.()
}

/**
 * 
 */
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
	if (props.trigger === 'hover') {
		events.value['mouseenter'] = openFinal
		outerEvents.value['mouseleave'] = closeFinal
		dropdownEvents.value['mouseenter'] = openFinal
		return
	}
	if (props.trigger === 'click') {
		events.value['click'] = togglePopper
		return
	}
	if (props.trigger === 'contextmenu') {
		events.value['contextmenu'] = (e) => {
			e.preventDefault()
			openFinal()
		}
		return
	}
}

let popperInstance: null | Instance

/**
 * 
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

const show: TooltipInstance['show'] = openFinal
const hide: TooltipInstance['hide'] = function() {
	openDebounce?.cancel()
	setVisible(false)
}

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
			resetEvents()
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

clickOutsideElement(containerNode, () => {
	emits('click-outside')
	if (props.trigger === 'hover' || props.manual) return

	visible.value && closeFinal()
})

watchEffect(() => {
	if (!props.manual) {
		attachEvents()
	}
	openDebounce = debounce(bind(setVisible, null, true), openDelay.value)
	closeDebounce = debounce(bind(setVisible, null, false), closeDelay.value)
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
		<div
			class="yo-tooltip__trigger"
			ref="triggerNode"
			v-on="events"
		>
			<slot></slot>
		</div>
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
				<div id="arrow" data-poppper-arrow></div>
			</div>
		</transition>
	</div>
</template>

<style scoped>
@import './style.css'
</style>