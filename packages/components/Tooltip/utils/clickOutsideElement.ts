import { type Ref } from 'vue';
import { eventListener } from './eventListener';

/**
 * 判断点击的地方是否是触发节点和popperNode的其他节点. 如果elementRef不在被点击的元素中, 则执行callback
 * @param elementRef 即将要执行函数的元素
 * @param callback 一个回调函数, 其接受一个Event类型的参数, 该参数需要用来判断点击的是否为该元素
 */
export function clickOutsideElement(
	elementRef: Ref<HTMLElement | void>,
	callback: (e: Event) => void
) {
	eventListener(document, 'click', (e: Event) => {
		if (elementRef.value && e.target) {
			if (!elementRef.value.contains(e.target as HTMLElement)) {
				callback(e as MouseEvent);
			}
		}
	})
}