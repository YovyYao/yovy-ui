import type { MaybeRef } from "vue";
import { onMounted, onBeforeUnmount, watch, isRef, unref } from "vue";

export function useEventListener(
	target: MaybeRef<EventTarget | HTMLElement | void>,
	event: string,
	handler: (e: Event) => any
) {
	if (isRef(target)) {
		watch(target, (newValue, oldValue) => {
			oldValue?.removeEventListener(event, handler)
			newValue?.addEventListener(event, handler)
		})
	} else {
		onMounted(() => target?.addEventListener(event, handler))
	}
	onBeforeUnmount(() => unref(target)?.removeEventListener(event, handler))
}