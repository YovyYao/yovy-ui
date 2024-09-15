<script lang="ts">
import { onMounted, ref, computed } from 'vue';
import { delay } from 'lodash-es';
import { iconTypeMap, RenderVnode } from '@yovy-ui/utils';

import YoIcon from '../Icon/Icon.vue';
import type { MessageProps } from './types';

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
const boxHeight = ref(0)

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

defineExpose({
	close
})
</script>

<template>
	<Transition :name="transitionName" @after-leave="!visible && onDestory()">
		<div
			ref="messageRef"
			class="yo-messgae"
			:class="{
				[`yo-message--${type}`]: type,
				'is-close': showClose,
				'text-center': center,
			}"
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