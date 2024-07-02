import { type Ref } from 'vue';
import { eventListener } from './eventListener';

export function clickOutsideElement(
	elementRef: Ref<HTMLElement | void>,
	callback: (e: Event) => any
) {
	eventListener(document, 'click', (e: Event) => {
		if (elementRef.value && e.target) {
			if (!elementRef.value.contains(e.target as HTMLElement)) {
				callback(e as MouseEvent);
			}
		}
	})
}