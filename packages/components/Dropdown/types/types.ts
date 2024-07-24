import type { VNode, ComputedRef } from 'vue';
import type { TooltipProps } from '../../Tooltip/types';
import type { ButtonType, ButtonSize } from '../../Button/types';

export type DropdownCommand = string | number

// 下拉菜单的每一项
export interface DropdownItemProps {
	// Dropdown所包含的每一个Item都有command，当Item每点击时触发
	command?: DropdownCommand
	// 每一项的名称
	label?: string | VNode
	// 该项是否可点击
	disabled?: boolean
	// 是否需要每一项之间的分隔符
	divided?: boolean
}

// 下拉菜单的每一项的容器
export interface DropdownProps extends TooltipProps {
	// Dropdown需要点击某个按钮才能展示下拉菜单
	// 该按钮的类型
	type?: ButtonType
	// 该按钮的大小
	size?: ButtonSize
	// Dropdown作为DropdownItem的容器, 它所存储的东西一定是DropdownItemProps类型的
	items?: DropdownItemProps[]
	// 是否点击隐藏/展开下拉菜单
	hideOnClick?: boolean
	// 是否将按钮和文字分开
	splitButton?: boolean
}

export interface DropdownEmits {
	// 当下拉菜单隐藏或展示时会触发
	(e: 'visible-change', value: boolean): void
	// 
	(e: 'command', value: DropdownCommand): void
	// Dropdown所包裹的item的点击事件
	(e: 'click', value: MouseEvent): void
}

export interface DropdownInstance {
	open(): void
	close(): void
}

export interface DropdownContext {
	handleItenClick(item: DropdownItemProps): void
	size: ComputedRef<ButtonSize | void>
}