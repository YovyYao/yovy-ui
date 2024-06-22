<script setup lang="ts">
import type { AlertProps, AlertEmits, AlertInstance } from './types';
import { iconTypeMap } from '@yovy-ui/utils';
import { ref, computed } from 'vue';
import YoIcon from '../Icon/Icon.vue';

defineOptions({
	name: "YoAlert"
})

const props = withDefaults(defineProps<AlertProps>(), {
	effect: "light",
	type: "info",
	closable: true,
})

const emits = defineEmits<AlertEmits>()
const slots = defineSlots()

// 是否可见
const visible = ref(true)

const iconName = computed(() => iconTypeMap.get(props.type) ?? "circle-info")
const withDescription = computed(() => props.description || slots.default)

/**
 * 关闭YoAlert, 然后触发emits的close事件
 */
function close() {
	visible.value = false
	emits("close")
}

/**
 * 展示YoAlert
 */
function open() {
	visible.value = true
}

defineExpose<AlertInstance>({
	close,
	open,
})
</script>

<template>
	<div
		class="yo-alert"
		v-show="visible"
		:class="{
			[`yo-alert__${type}`]: type,
			[`yo-alert__${effect}`]: effect,
			'text-center': center,
		}"
	>
		<!-- icon -->
		<yo-icon
			v-if="showIcon"
			class="yo-alert__icon"
			:class="{ 'big-icon': withDescription }"
			:icon="iconName"
		/>
		<!-- 提示内容 -->
		<div class="yo-alert__content">
			<!-- 提示信息的标题 -->
			<span
				class="yo-alert__title"
				:class="{ 'with-desc': withDescription }"
				:style="{ display: center && !showIcon ? 'flow' : 'inline' }"
			>
				<slot name="title">{{ title }}</slot>
			</span>
			<!-- 内容 -->
			<p class="yo-alert__description">
				<slot>{{ description }}</slot>
			</p>
			<!-- 用于关闭提示信息的按钮 -->
			<div class="yo-alert__close" v-if="closable">
				<yo-icon @click.stop="close" icon="xmark" />
			</div>
		</div>
	</div>
</template>

<style scoped>
@import './style.css'
</style>