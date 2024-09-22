import type { VNode, ComponentInternalInstance, Ref } from 'vue';

// Notification组件的类型
export const notificationTypeArr = [
	'info',
	'success',
	'warning',
	'danger',
] as const
export type NotificationType = typeof notificationTypeArr[number]

// Notification组件出现的位置
export const notificationPositions = [
	'top-right',
	'top-left',
	'bottom-right',
	'bottom-left',
] as const
export type NotificationPositions = typeof notificationPositions[number]

// Notification组件的属性
export interface NotificationProps {
	title: string,
	id: string,
	zIndex: number
	position: NotificationPositions
	type?: NotificationType
	message?: string | VNode
	duration?: number
	showClose?: boolean
	offset?: number
	transitionName?: string
	icon?: string
	onClick?: () => void
	onClose?: () => void
	onDestroy?: () => void
}

// Notification组件实例
export interface NotificationInstance {
	id: string
	vnode: VNode
	vm: ComponentInternalInstance
	props: NotificationProps
	handler: NotificationHandler
}

// 开始创建Notification组件实例时不需要这三样
export type CreateNotificationProps = Omit<NotificationProps, 'onDesctory' | 'id' | 'zIndex'>

// 关闭Notification
export interface NotificationHandler {
	close(): void
}

export type NotificationOptions = Partial<Omit<NotificationProps, 'id'>>

export type NotificationParams = string | VNode | NotificationOptions

export type NotificationFn = {
	(props: NotificationParams): NotificationHandler
	closeAll(type?: NotificationType): void
}

export interface NotificationExpose {
	close(): void
	bottomOffset: Ref<number>
}

export type NotificationTypeFn = (props: NotificationParams) => NotificationHandler

export interface Notification extends NotificationFn {
	success: NotificationTypeFn
	warning: NotificationTypeFn
	danger: NotificationTypeFn
	info: NotificationTypeFn
}