import { isVNode, render, h, shallowReactive } from 'vue';
import { isString, findIndex, get, set, each } from 'lodash-es';

import type {
	CreateMessageProps,
	MessageInstance,
	MessageFn,
	Message,
	MessageParams,
	MessageHandler,
	MessageType,
	MessageProps,
} from '../types';
import { messageTypes } from '../types';
import YoMessage from '../Message.vue'
import { useId } from '@yovy-ui/hooks';

// 用于存放所有Message实例的数组
const instanceArr: MessageInstance[] = shallowReactive([])

// Message实例的默认属性
export const messageDefaults = {
	type: 'info',
	duration: 2000,
	offset: 10,
	transitionName: 'fade-up',
}

/**
 * 初始化Message的options. 判断options, 若为空, 或为VNode类型, 或为String类型, 则为其配置一个新的message的options, 否则直接引入, 并与Message实例的默认属性合并
 * @param options 配置项(可能为空)
 * @returns 返回一个CreateMessageProps类型的配置项
 */
const normalizedOptions = (options: MessageParams): CreateMessageProps => {
	const newOptions = !options || isVNode(options) || isString(options) ? {
		message: options
	} : options
	
	return {...messageDefaults, ...newOptions} as CreateMessageProps
}

/**
 * 创建Message实例. Message组件需要弹出时, 则要先创建实例. 例如点击了页面上的某个按钮, 就会弹出Message组件, 那么这个过程就需要先创建Message组件实例
 * @param props 一个没有'onDestory' | 'id' | 'zIndex'的配置对象
 */
const createMessage = (props: CreateMessageProps): MessageInstance => {
	// 该实例的唯一标识: id
	const id = useId().value
	// Message组件的容器
	const container = document.createElement('div')
	// 用于销毁Message组件的函数
	const destory = () => {
		const index = findIndex(instanceArr, { id })
		if (index === -1) return
		instanceArr.splice(index, 1)
		// 渲染Message组件的容器
		render(null, container)
	}

	// 创建新的props， 并与旧的props合并
	const newProps: MessageProps = {
		...props,
		id,
		zIndex: 999,
		onDestory: destory
	}
	// 构建虚拟DOM
	const vnode = h(YoMessage, newProps)
	// 渲染Message组件的容器和虚拟节点
	render(vnode, container)
	// 将该节点(HTML元素)挂载到容器上
	document.body.appendChild(container.firstElementChild!)

	const vm = vnode.component!
	// 用于处理Message组件关闭的函数
	const handler: MessageHandler = {
		close:() => vm.exposed!.close()
	}
	const instance: MessageInstance = {
		props: newProps,
		id,
		vm,
		vnode,
		handler,
	}
	// 将Message组件推入instanceArr中
	instanceArr.push(instance)

	return instance
}

/**
 * 获取currentMessage的上一个Message组件的底边距
 * @param currentMessage 页面上的某个Message组件
 * @returns 
 */
export function getLastMessageBottomOffset(currentMessage: MessageProps) {
	const index = findIndex(instanceArr, { id: currentMessage.id })
	if (index <= 0) return 0
	
	return get(instanceArr, [index - 1, 'vm', 'exposed', 'bottomOffset'])
}

/**
 * 本文件导出一个message()函数. 该函数在页面需要Message组件时调用.
 * @param options 
 * @returns 
 */
export const message: MessageFn & Partial<Message> = (options = {}) => {
	// 初始化配置项
	const normalized = normalizedOptions(options)
	// 获得实例
	const instance = createMessage(normalized)
	// 返回Message的handler()????
	return instance.handler
}

/**
 * 关闭所有指定类型的Message组件.
 * @param type 关闭指定类型的Message组件
 */
export function closeAll(type?: MessageType) {
	each(instanceArr, instance => {
		if (type) {
			// 如果该实例上的props里的type和需要关闭的type一致, 则关闭该组件
			instance.props.type === type && instance.handler.close()
			return
		}
		instance.handler.close()
	})
}
message.closeAll = closeAll

// 
each(messageTypes, type => {
	set(message, type, (options: MessageParams) => {
		const normalized = normalizedOptions(options)
		return message({ ...normalized, type })
	})
})

export default message as Message