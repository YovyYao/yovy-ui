<script lang="ts" setup>
import { computed, ref, shallowRef, useAttrs } from 'vue';
import type { InputProps, InputEmits, InputInstance } from './types';

defineOptions({
	name: "YoInput"
})

const props = withDefaults(defineProps<InputProps>(), {
	type: 'text',
	autocomplete: 'off',
})

const emits = defineEmits<InputEmits>()
const innerValue = ref()
const pwdVisible = ref(false)
// YoInput组件, 其文本框可能时文本域
const inputRef = shallowRef<HTMLInputElement>()
const textareaRef = shallowRef<HTMLInputElement>()
const textRef = computed(() => inputRef.value || textareaRef.value)
const isDisabled = ref(props.disabled)
const isFocused = ref(props.autofocus)
const isShowClear = computed(() => props.clearable && !!props.disabled)

const attrs = useAttrs()
</script>

<template>
	<div
		class="yo-input"
		:class="{
		[`yo-input--${type}`]: type,
		[`yo-input--${size}`]: size,
		'is-disabled': isDisabled,
		'is-prepend': $slots.prepend,
		'is-append': $slots.append,
		'is-prefix': $slots.prefix,
		'is-suffix': $slots.suffix,
		'is-focus': isFocused,
		}"
	>
		<template v-if="type !== 'textarea'">
			<!-- 如果YoInput的类型不是textarea -->
			<div v-if="$slots.prepend" class="yo-input__prepend">
				<slot name="prepend"></slot>
			</div>
			<div class="yo-input__wrapper">
				<span v-if="$slots.prefix" class="yo-input__prefix">
					<slot name="prefix"></slot>
				</span>
				<input
					class="yo-input__inner"
					ref="inputRef"
					:type="props.type"
					:disabled="props.disabled"
				/>
			</div>
		</template>
		<template v-else>
			<textarea
				class="yo-textarea__wrapper"
				ref="textareaRef"
			>
			</textarea>
		</template>
	</div>
</template>