import { isFunction } from 'lodash-es';
import type { Ref } from 'vue';
import { ref, getCurrentInstance } from 'vue';

interface UseFocusControlOptions {
	afterFocus?: () => void;
	beforeBlur?: (e: FocusEvent) => void | boolean;
	afterBlur?: () => void;
}

function useFocusControl<T extends HTMLElement | { focus(): void }>(
	target: Ref<T | void>,
	{ afterBlur, beforeBlur, afterFocus }: UseFocusControlOptions
) {
	const instance = getCurrentInstance()!
	const { emit } = instance
	const wrapperRef = ref<HTMLElement>()
	const isFocused = ref(false)
	
	const handleFocus = (e: FocusEvent) => {
		if (isFocused.value) return
		isFocused.value = true
		emit('focus', e)
		afterFocus?.()
	}

	const handleBlur = (e: FocusEvent) => {
		const cancelBlur = isFunction(beforeBlur) ? beforeBlur(e) : false
		if (cancelBlur || (e.relatedTarget && wrapperRef.value?.contains(e.relatedTarget as Node))) return
		isFocused.value = false
		emit('blur', e)
		afterBlur?.()
	}

	const handleClick = () => {
		target.value?.focus()
	}

	return {
		wrapperRef,
		isFocused,
		handleFocus,
	}
}