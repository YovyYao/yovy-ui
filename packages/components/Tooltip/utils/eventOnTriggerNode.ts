// 触发虚拟节点, 绑定和解绑事件监听器
import { each, isElement } from 'lodash-es';
import { onMounted, onUnmounted, watch } from 'vue';
import type { ComputedRef, Ref, WatchStopHandle } from 'vue';
import type { TooltipProps } from '../types';

/**
 * 绑定虚拟触发节点和事件监听. Tooltip组件组要知道, 它的虚拟节点和事件什么时候会被触发. (事件: hover, click, contextmenu)
 * @param props Tooltip组件的属性和一个可选的虚拟触发器属性
 * @param triggerNode 基于vue的ComputedRef, 将该参数变成computed计算属性, 该属性可能是HTMLElement类型或void类型
 * @param events 基于vue的Ref, 将参数变成Ref对象.(hover, click, contextmenu)
 * @param closeMethod 
 */
export function eventsOnTriggerNode(
	props: TooltipProps & { virtualTrigger?: boolean },
	triggerNode: ComputedRef<HTMLElement | void>,
	events: Ref<Record<string, EventListener>>,
	closeMethod: () => void,
) {
	let watchEventsStopHandle: WatchStopHandle | void
	let watchTriggerNodeStopHandle: WatchStopHandle | void

	const _eventHandleMap = new Map()

	/**
	 * 绑定虚拟节点上的触发器. 监听events(一个事件, hover, click, contextmenu)
	 */
	const _bindEventOnVirtualTrigger = () => {
		const el = triggerNode.value
		isElement(el) &&
			each(events.value, (fn, event) => {
				_eventHandleMap.set(event, fn)
				el?.addEventListener(event as keyof HTMLElementEventMap, fn)
			})
	}
	
	/**
	 * 解绑虚拟节点上的触发器. 
	 */
	const _unbindEventOnVirtualTrigger = () => {
		const el = triggerNode.value
		isElement(el) &&
			each(
				["mouseenter", "click", "contextmenu"],
				key => _eventHandleMap.has(key) && el?.removeEventListener(key, _eventHandleMap.get(key))
			)
	}

	/**
	 * 监听triggerNode. 当开启了虚拟节点的触发时, 调用_bindEventOnVirtualTrigger()绑定虚拟节点触发.
	 * ps: Vue3中的 watch 有返回值, 其返回值的类型是WatchStopHandle, 返回的值可用于停止监听.
	 */
	onMounted(() => {
		watchTriggerNodeStopHandle = watch(
			triggerNode,
			() => props.virtualTrigger && _bindEventOnVirtualTrigger(),
			{ immediate: true },
		)
	})

	/**
	 * 监听events. 如果开启了虚拟节点的触发, 则选解绑, 再绑定. 在调用closeMethod()
	 */
	watchEventsStopHandle = watch(
		events,
		() => {
			if (!props.virtualTrigger) return
			_unbindEventOnVirtualTrigger()
			_bindEventOnVirtualTrigger()
			closeMethod()
		},
		{ deep: true },
	)

	/**
	 * 虚拟节点卸载后, 停止对其事件和触发的监听.
	 */
	onUnmounted(() => {
		watchTriggerNodeStopHandle?.()
		watchEventsStopHandle?.()
	})
}

export default eventsOnTriggerNode