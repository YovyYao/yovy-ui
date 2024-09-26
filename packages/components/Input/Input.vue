<script lang="ts" setup>
import { computed, ref, shallowRef, useAttrs, watch } from 'vue';
import { useFocusControl, useId } from '@yovy-ui/hooks';
import { each, noop } from 'lodash-es';

import type { InputProps, InputEmits, InputInstance } from './types';
import Icon from '../Icon/Icon.vue';

defineOptions({
	name: "YoInput",
	inheritAttrs: false,
})

const props = withDefaults(defineProps<InputProps>(), {
	type: 'text',
	autocomplete: 'off',
})

const emits = defineEmits<InputEmits>()
const innerValue = ref(props.modelValue)
const pwdVisible = ref(false)
// 普通的输入框
const commonInputRef = shallowRef<HTMLInputElement>()
// 输入框是文本域
const textareaRef = shallowRef<HTMLInputElement>()
// 最终的输入框类型
const inputRef = computed(() => commonInputRef.value || textareaRef.value)
const isDisabled = ref(props.disabled)
const isShowClear = computed(() => props.clearable && !isDisabled.value && !!innerValue.value && isFocused.value)
const attrs = useAttrs()
const { wrapperRef, isFocused, handleBlur, handleFocus } = useFocusControl(inputRef as any, {
	// 失焦时触发校验
	afterBlur() {

	}
})
// 当密码可显示, 输入框可点击, input框有值的时候
const showPwd = computed(
	() => props.type === 'password' && props.isShowPassword && !isDisabled.value && innerValue.value
)

/**
 * 清空输入框的值
 */
const clear: InputInstance['clear'] = () => {
	innerValue.value = ''
	each(['input', 'change', 'update:modelValue'], e => emits(e as any, ''))
	emits('clear')
}

const focus: InputInstance['focus'] = async () => {

}

const blur: InputInstance['blur'] = async () => {

}

const select: InputInstance['select'] = async () => {

}

const handleInput = () => {
	emits('input', innerValue.value)
	emits('update:modelValue', innerValue.value)
}

const handleChange = () => {
	emits('change', innerValue.value)
}

const togglePwdVisible = () => {
	pwdVisible.value = !pwdVisible.value
}

watch(() => props.modelValue, newValue => {
	innerValue.value = newValue
})

defineExpose<InputInstance>({
	ref: inputRef,
	blur,
	select,
	clear,
	focus,
})
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
			<div v-if="$slots.prepend" class="yo-input__prepend">
				<slot name="prepend"></slot>
			</div>
			<div class="yo-input__wrapper" ref="wrapperRef">
				<span v-if="$slots.prefix" class="yo-input__prefix">
					<slot name="prefix"></slot>
				</span>
				<input
					class="yo-input__inner"
					ref="commonInputRef"
					:id="useId().value"
					:type="props.isShowPassword ? (pwdVisible ? 'text' : 'password') : props.type"
					:disabled="isDisabled"
					:readonly="props.readonly"
					:autocomplete="props.autocomplete"
					:placeholder="props.placeholder"
					:autofocus="props.autofocus"
					:form="props.form"
					v-model="innerValue"
					v-bind="attrs"
					@input="handleInput"
					@change="handleChange"
					@focus="handleFocus"
					@blur="handleBlur"
				/>
				<span v-if="$slots.suffix || isShowClear || showPwd" class="yo-input__suffix">
					<slot name="suffix"></slot>
					<!-- 一键清空 -->
					<icon
						icon="xmark"
						v-if="isShowClear"
						class="yo-input__clear"
						@click="clear"
						@mousedown.prevent="noop"
					/>
					<!-- 睁开的眼睛 -->
					<icon
						icon="eye"
						class="yo-input__password"
						v-if="pwdVisible && showPwd"
						@click="togglePwdVisible"
					/>
					<!-- 闭上的眼睛 -->
					<icon
						icon="eye-slash"
						class="yo-input__password"
						v-if="!pwdVisible && showPwd"
						@click="togglePwdVisible"
					/>
				</span>
			</div>
			<div v-if="$slots.append" class="yo-input__append">
				<slot name="append"></slot>
			</div>
		</template>
		<template v-else>
			<textarea
				class="yo-textarea__wrapper"
				ref="textareaRef"
				:disabled="isDisabled"
				:readonly="props.readonly"
				:autocomplete="props.autocomplete"
				:placeholder="props.placeholder"
				:autofocus="props.autofocus"
				:form="props.form"
				v-model="innerValue"
				v-bind="attrs"
				@input="handleInput"
				@change="handleChange"
				@focus="handleFocus"
				@blur="handleBlur"
			>
			</textarea>
		</template>
	</div>
</template>

<style scoped>
@import './style.css'
</style>