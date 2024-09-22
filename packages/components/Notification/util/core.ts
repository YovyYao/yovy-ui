import { useZIndex, useId } from '@yovy-ui/hooks';
import { h, isVNode, render, shallowReactive } from 'vue';
import { each, findIndex, get, isString, set } from 'lodash-es';

import {
	notificationTypeArr,
	type CreateNotificationProps,
	type Notification,
	type NotificationFn,
	type NotificationHandler,
	type NotificationInstance,
	type NotificationParams,
	type NotificationProps,
	type NotificationType
} from '../types';
import YoNotification from '../Notification.vue';


const instanceArr: NotificationInstance[] = shallowReactive([])
const { nextZIndex } = useZIndex()

export const notificationDefaults = {
	type: 'info',
	duration: 3000,
	offset: 20,
	transitionName: 'fade',
	showClose: true,
} as const

const normalizedOptions = (options: NotificationParams): CreateNotificationProps => {
	const res = !options || isVNode(options) || isString(options) ? { message: options } : options
	
	return { ...notificationDefaults, ...res } as CreateNotificationProps
}

const createNotification = (props: CreateNotificationProps): NotificationInstance => {
	const id = useId().value
	const container: Element = document.createElement('div')
	const destroy = () => {
		const index = findIndex(instanceArr, { id })
		if (index === -1) return
		instanceArr.splice(index, 1)
		render(null, container)
	}

	const newProps: NotificationProps = {
		...props,
		id,
		zIndex: nextZIndex(),
		onDestroy: destroy,
	}

	const vnode = h(YoNotification, newProps)
	render(vnode, container)
	document.body.appendChild(container.firstElementChild!)

	const vm = vnode.component!
	const handler: NotificationHandler = {
		close: () => vm!.exposed!.close()
	}
	const instance: NotificationInstance = {
		props: newProps,
		id,
		vm,
		handler,
		vnode
	}
	instanceArr.push(instance)
	return instance
}

export const notification: NotificationFn & Partial<Notification> = (options = {}) => {
	const normalized = normalizedOptions(options)
	const instance = createNotification(normalized)
	return instance.handler
}

export function closeAll(type?: NotificationType) {
	each(instanceArr, instance => {
		if (type) {
			instance.props.type === type && instance.handler.close()
			return
		}
		instance.handler.close()
	})
}
notification.closeAll = closeAll

export function getLastNotificationBottomOffset(this: NotificationProps) {
	const index = findIndex(instanceArr, { id: this.id })
	if (index <= 0) return 0
	
	return get(instanceArr, [index - 1, 'vm', 'exposed', 'bottomOffset'])
}

each(notificationTypeArr, type => {
	set(notification, type, (options: NotificationParams) => {
		const normalized = normalizedOptions(options)
		return notification({ ...normalized, type })
	})
})