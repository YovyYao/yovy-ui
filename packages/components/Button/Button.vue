<script setup lang="ts">
<<<<<<< HEAD
import type { ButtonProps, ButtonEmits, ButtonInstance } from './types/index';
import { defineOptions, defineProps, withDefaults, ref, defineSlots, defineExpose, defineEmits, computed, inject } from 'vue';
import { throttle } from 'lodash-es';
import YoIcon from '../Icon/Icon.vue';
import { BUTTON_GROUP_CTX_KEY } from './constants/index';

defineOptions({
	name: "YoButton"
})
const props = withDefaults(defineProps<ButtonProps>(), {
	tag: 'button',
	nativeType: 'button',
	useThrottle: true,
	throttleDuration: 500,
})

// 上下文
const ctx = inject(BUTTON_GROUP_CTX_KEY, void 0)
const emits = defineEmits<ButtonEmits>()
const slots = defineSlots()
const _ref = ref<HTMLButtonElement>()
const size = computed(() => ctx?.size ?? props?.size ?? "")
const type = computed(() => ctx?.type ?? props?.type ?? "")
const disabled = computed(() => ctx?.disabled || props?.disabled || false)
const iconStyle = computed(() => ({
	marginRight: slots.default ? "6px" : "0px"
}))

// 不节流,直接执行下面的函数
const handleBtnClick = (e: MouseEvent) => emits('click', e)
// useThrottle: true, 执行节流后封装的函数
const handleBtnClickThrottle = throttle(
	handleBtnClick,
	props.throttleDuration,
	{trailing: false}
)

defineExpose<ButtonInstance>({
	ref: _ref,
=======
defineOptions({
	name: "YovyButton"
>>>>>>> cfac2cb25c3cd0797e12721fe950de9ff98d6ff9
})
</script>

<template>
<<<<<<< HEAD
	<component
		:is="tag"
		ref="_ref"
		class="yo-button"
		:autofocus="autofocus"
		:type="tag === 'button' ? nativeType : void 0"
		:disabled="disabled || loading ? true : void 0"
		:class="{
			[`yo-button--${type}`]: type,
			[`yo-button--${size}`]: size,
			'is-plain': plain,
			'is-round': round,
			'is-circle': circle,
			'is-disabled': disabled,
			'is-loading': loading,
		}"
		@click="(e: MouseEvent)=>useThrottle ? handleBtnClickThrottle(e) : handleBtnClick(e)"
	>
		<template v-if="loading">
			<slot name="loading">
				<yo-icon
					class="loading-icon"
					:icon="loadingIcon ?? 'spinner'"
					:style=iconStyle
					spin
				/>
			</slot>
		</template>
		<yo-icon 
			v-if="icon && !loading"
			:icon="icon" 
			:style="iconStyle"
			size="1x"
		/>
		<slot></slot>
	</component>
</template>

<style scoped>
@import './style.css'
</style>
=======
	<button style="background-color: blueviolet; color: brown"> YovyButton </button>
</template>
>>>>>>> cfac2cb25c3cd0797e12721fe950de9ff98d6ff9