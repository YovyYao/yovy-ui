import type { Ref } from "vue"

export const inputTypeArr = ['text', 'password', 'textarea'] as const

export interface InputProps {
	id?: string
	modelValue: string
	// type?: 'text' | 'password' | 'textarea'
	type?: typeof inputTypeArr[number]
	size?: 'large' | 'small'
	disabled?: boolean
	clearable?: boolean
	isShowPassword?: boolean
	placeholder?: string
	readonly?: boolean
	autocomplete?: string
	autofocus?: boolean
	form?: string
}

export interface InputEmits {
	(e: 'update:modelValue', value: string): void
	(e: 'input', value: string): void
	(e: 'change', value: string): void
	(e: 'focus', value: FocusEvent): void
	(e: 'blur', value: FocusEvent): void
	(e: 'clear'): void
}

export interface InputInstance {
	ref: Ref<HTMLInputElement | HTMLTextAreaElement | void>
	focus(): void
	blur(): void
	select(): void
	clear(): void
}