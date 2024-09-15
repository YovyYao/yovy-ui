import type { VNode, ComponentInternalInstance, Ref } from 'vue';

// 
export type MessageOptions = Partial<Omit<MessageProps, 'id'>>
// 某些函数的参数的类型
export type MessageParams = string | VNode | MessageOptions

// Message弹窗
export interface MessageProps {
	// 每一条弹窗的唯一标识
	id: string
	// 弹窗的内容
	message?: string | VNode
	// 弹窗展示的时间
	duration?: number
	// 是否显示关闭按钮(是否允许手动关闭)
	showClose?: boolean
	// 是否居中
	center?: boolean
	// 弹窗的类型
	type?: MessageType
	// 弹窗距离顶部的距离
	offset?: number
	// 弹窗的层级
	zIndex: number
	// 动画名称
	transitionName?: string
	// 弹窗关闭时的回调
	onDestory(): void
}

// 弹窗的类型(普通, 成功, 警告, 错误, 危险)
export const messageTypes = [
	'info',
	'success',
	'warning',
	'error',
	'danger',
] as const
// messageTypes里的可选属性('info', 'success', 'warning', 'error', 'danger')
export type MessageType = (typeof messageTypes)[number]

// 用于关闭某个Message的函数
export interface MessageHandler {
	close(): void
}

// 用于关闭所有Message的函数
export type MessageFn = {
	(props: MessageParams): MessageHandler
	closeAll(type?: MessageType): void
}

// 
export type MessageFnType = (props: MessageParams) => MessageHandler

const a: MessageFnType = (props: MessageParams) => {
	const res: MessageHandler = {
		close: () => {
			
		}
	}
	return res
}

// Message实例的接口(每一个实例都有closeAll()这个函数)
export interface Message extends MessageFn {
	// 此处的每一个函数的类型都是MessageFnType, 参考上方例子中的函数a()
	info: MessageFnType
	success: MessageFnType
	warning: MessageFnType
	error: MessageFnType
	danger: MessageFnType
}

// Message实例
export interface MessageInstance {
	// 每一个Message实例的唯一标识
	id: string
	// 每一个Message实例的虚拟节点
	vnode: VNode
	// 每一个Message实例的props
	props: MessageProps
	// 每一个Message实例的组件实例
	vm: ComponentInternalInstance
	// 每一个Message实例的关闭函数
	handler: MessageHandler
}

export interface MessageExpose {
	close(): void
	bottomOffset: Ref<number>
}

// 创建一个没有'onDestory' | 'id' | 'zIndex'的MessageProps
export type CreateMessageProps = Omit<MessageProps, 'onDestory' | 'id' | 'zIndex'>