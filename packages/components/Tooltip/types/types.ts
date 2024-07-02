import type { Placement, Options } from '@popperjs/core';

export interface TooltipProps {
	content?: string
	// 触发方式
	trigger?: 'hover' | 'click' | 'contextmenu'
	placement?: Placement
	popperOptions?: Partial<Options>
	manual?: boolean
	transition?: string
	// 是否可以展示tooltip
	disabled?: boolean
	// 鼠标进入后, 延时展示
	showTimeout?: number
	// 鼠标离开后, 延时消失
	hideTimeout?: number
	onVisibleChange?: (visible: boolean) => void
}

export interface TooltipEmits {
	(e: 'visible-change', value: boolean): void
	(e: 'click-outside'): void
}

export interface TooltipInstance {
	show(): void
	hide(): void
}