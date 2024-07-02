import {
	onMounted,
	onBeforeUnmount,
	watch,
	isRef,
	unref,
	type MaybeRef,
} from 'vue';

/**
 * 在Vue组件中动态地为元素或事件目标绑定事件监听器。函数接受三个参数：target、event和callback
 * @detail 通过isRef函数判断target是否是一个ref对象。如果是ref对象，则通过watch函数监听ref对象的值的变化。在监听器的回调函数中，先移除旧的事件监听器，然后添加新的事件监听器。如果target不是一个ref对象，则在组件挂载时通过onMounted钩子函数添加事件监听器。在组件卸载时通过onBeforeUnmount钩子函数移除事件监听器。
 * @param target 一个HTMLElement、EventTarget或void的引用类型，或者是一个ref对象。如果target是一个ref对象，函数会通过watch函数监听ref对象的值的变化，在ref对象的值更新时，动态地添加或移除事件监听器
 * @param event 一个字符串，表示要监听的事件名称
 * @param callback 一个函数，表示事件被触发时要执行的回调函数
 */
export function eventListener(
	target: MaybeRef<HTMLElement | EventTarget | void>,
	event: string,
	callback: (e: Event) => any
) {
	if (isRef(target)) {
		// 如果是Ref对象, 就可以对该参数进行监听
		// 监听的方式是: 移除oldValue上的监听器, 然后在newValue上添加监听器
		watch(target, (newValue, oldValue) => {
			oldValue?.removeEventListener(event, callback)
			newValue?.addEventListener(event, callback)
		})
	} else {
		onMounted(() => target?.addEventListener(event, callback))
	}
	onBeforeUnmount(() => unref(target)?.removeEventListener(event, callback))
}