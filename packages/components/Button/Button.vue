<script setup lang="ts">
import type { ButtonProps, ButtonEmits, ButtonInstance } from './types/index';
import { ref, computed, inject } from 'vue';
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

const handleBtnClick = (e: MouseEvent) => emits('click', e)
// useThrottle: true, 执行节流后封装的函数
const handleBtnClickThrottle = throttle(
	handleBtnClick,
	props.throttleDuration,
	{trailing: false}
)

defineExpose<ButtonInstance>({
	ref: _ref,
})
</script>

<template>
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