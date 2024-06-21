import type { Ref } from 'vue';

export type CollapseItemName = string | number

/**
 * Collapse组件的Props
 * @param modelValue 初始时默认激活的项
 * @param accordion 是否开启手风琴模式(手风琴模式: 只允许一个项激活)
 */
export interface CollapseProps {
	modelValue: CollapseItemName[]
	accordion?: boolean
}

export interface CollapseItemProps {
	name: CollapseItemName
	title?: string
	disabled?: boolean
}

// 触发函数
export interface CollapseEmits {
	(e: "update:modelValue", value: CollapseItemName[]): void
	(e: "change", value: CollapseItemName[]): void
}

export interface CollapseContext {
	// 已激活的Item
	activeNames: Ref<CollapseItemName[]>
	handleItemClick(name: CollapseItemName): void
}