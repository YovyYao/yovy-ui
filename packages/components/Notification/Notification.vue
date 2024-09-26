<script setup lang="ts">
import { ref, computed, onMounted, type Ref } from 'vue';
import { bind, delay } from 'lodash-es';
import { useOffset } from '@yovy-ui/hooks';
import { addUnit, iconTypeMap, RenderVnode } from '@yovy-ui/utils';

import YoIcon from '../Icon/Icon.vue'
import type { NotificationExpose, NotificationProps } from './types';
import { getLastNotificationBottomOffset } from './util';

defineOptions({
	name: 'YoNotification'
})

const props = withDefaults(defineProps<NotificationProps>(), {
	type: 'info',
	duration: 3000,
	offset: 20,
	transitionName: 'fade',
	showClose: true
})

const visible = ref(false)
const notificationRef = ref<HTMLElement>()
const boxHeight = ref(0)

const { topOffset, bottomOffset } = useOffset({
	getLastBoxBottomOffset: bind(getLastNotificationBottomOffset, props),
	offset: props.offset,
	boxHeight
})

const iconName = computed(() => iconTypeMap.get(props.type) ?? 'circle-info')
const customStyle = computed(() => ({
	top: addUnit(topOffset.value),
	zIndex: props.zIndex,
}))

let timer: number

function startTimer() {
	if (props.duration === 0) return
	timer = delay(close, props.duration)
}

function clearTimer() {
	clearTimeout(timer)
}

function close() {
	visible.value = false
}

onMounted(() => {
	visible.value = true
	startTimer()
})

defineExpose<NotificationExpose>({
	bottomOffset: bottomOffset as unknown as Ref<number>,
	close
})
</script>

<template>
	<transition
		:name="`yo-notification-${transitionName}`"
		@after-leave="!visible && onDestroy()"
		@enter="boxHeight = notificationRef!.getBoundingClientRect().height"
	>
		<div
			ref="notificationRef"
			class="yo-notification"
			:class="{
				[`yo-notification--${type}`]: type,
				// [horizonTalClass]: true,
				'show-close': showClose,
			}"
			:style="customStyle"
			v-show="visible"
			role="alert"
			@click="onClick"
			@mouseenter="clearTimer"
			@mouseleave="startTimer"
		>
			<yo-icon v-if="iconName" :icon="iconName" class="yo-notification__icon" />

			<div class="yo-notification__text">
				<div class="yo-notification__title">{{ title }}</div>
				<div class="yo-notification__content">
					<slot>
						<render-vnode v-if="message" :vNode="message"></render-vnode>
					</slot>
				</div>
			</div>
			<div class="yo-notification__close" v-if="showClose">
				<yo-icon icon="xmark" @click.stop="close" />
			</div>
		</div>
	</transition>
</template>

<style scoped>
@import './style.css'
</style>