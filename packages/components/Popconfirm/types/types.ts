import type { ButtonType } from '../../Button';

export interface PopconfirmProps {
	// 气泡的内容
	title: string
	// 在弹出来的气泡中, 会有两个按钮, 一个是"Confirm(确定)", 一个是"Cancel(取消)".
	confirmButtonText?: string
	cancelButtonText?: string
	// 在弹出来的气泡中, 按钮的类型. Popconfirm组件的按钮使用YoButton组件的按钮类型.
	confirmButtonType?: ButtonType
	cancelButtonType?: ButtonType
	// 气泡的icon
	icon?: string
	// 气泡的icon的类型
	iconColor?: string
	// 是否隐藏icon
	hideIcon?: boolean
	// ???
	hideAfter?: number
	// 弹出气泡的宽度
	width?: number | string
}

export interface PopconfirmEmits {
	(e: 'confirm', value: MouseEvent): void
	(e: 'cancel', value: MouseEvent): void
}