<script setup lang="ts">
import { onMounted, ref, computed, watch, type Ref } from 'vue';
import { bind, delay } from 'lodash-es';
import { iconTypeMap, RenderVnode, addUnit } from '@yovy-ui/utils';
import { useOffset } from '@yovy-ui/hooks';

import YoIcon from '../Icon/Icon.vue';
import type { MessageProps, MessageExpose } from './types';
import { getLastMessageBottomOffset } from './util';

defineOptions({
	name: "YoMessage"
})

const props = withDefaults(defineProps<MessageProps>(), {
	type: 'info',
	duration: 2000,
	offset: 10,
	transisitionName: 'fade-up',
})

const visible = ref(false)
const messageRef = ref<HTMLDivElement>()
const iconName = computed(() => iconTypeMap.get(props.type) ?? 'circle-info')
const containerHeight: Ref<number> = ref(0)
const { topOffset, bottomOffset } = useOffset({
	getLastBoxBottomOffset: bind(getLastMessageBottomOffset, props),
	offset: props.offset,
	boxHeight: containerHeight,
})
const customStyle = computed(() => ({
	top: addUnit(topOffset.value),
	zIndex: props.zIndex,
}))

let timer: number
// 开始倒计时
function startTimer() {
	if (props.duration === 0) return
	timer = delay(close, props.duration)
}

// 清除倒计时
function clearTimer() {
	clearTimeout(timer)
}

// 关闭Message弹窗
function close() {
	visible.value = false
}

onMounted(() => {
	visible.value = true
	startTimer()
})

watch(visible, newValue => {
	if(!newValue) containerHeight.value = -props.offset
})



defineExpose<MessageExpose>({
	close,
	bottomOffset: bottomOffset as unknown as Ref<number>,
})
</script>

<template>
	<Transition
		:name="transitionName"
		@after-leave="!visible && onDestory()"
		@enter="containerHeight = messageRef!.getBoundingClientRect().height"
	>
		<div
			ref="messageRef"
			class="yo-messgae"
			:class="{
				[`yo-message--${type}`]: type,
				'is-close': showClose,
				'text-center': center,
			}"
			:style="customStyle"
			v-show="visible"
			role="alert"
			@mouseenter="clearTimer"
			@mouseleave="startTimer"
		>
			<yo-icon class="yo-message__icon" :icon="iconName" />
			<div class="yo-message__content">
				<slot>
					<render-vnode v-if="message" :vNode="message" />
				</slot>
			</div>
			<div class="yo-message__close" v-if="showClose">
				<yo-icon @click="close" icon="xmark" />
			</div>
		</div>
	</Transition>
</template>

<style scoped>
@import './style.css'
</style>