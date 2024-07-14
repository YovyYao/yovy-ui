import type { Placement, Options } from '@popperjs/core';

export interface TooltipProps {
	content?: string
	// 触发方式
	trigger?: 'hover' | 'click' | 'contextmenu'
	// Tooltip 的位置，由 @popperjs/core 的 Placement 类型定义
	placement?: Placement
	// 传递给 Popper.js 的配置选项，是 Options 类型的部分选项
	popperOptions?: Partial<Options>
	// 是否手动控制 Tooltip 的显示与隐藏
	manual?: boolean
	// Tooltip 显示和隐藏时的过渡效果名称
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