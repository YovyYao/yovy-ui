import { type Ref, computed } from 'vue';

interface UseOffsetOptions {
	offset: number
	boxHeight: Ref<number>
	getLastBoxBottomOffset: () => number
}

interface UseOffsetResult {
	topOffset: Ref<number>
	bottomOffset: Ref<number>
}

export function useOffset(options: UseOffsetOptions): UseOffsetResult {
	const lastBoxBottomOffset = computed(() => options.getLastBoxBottomOffset())
	const topOffset = computed(() => options.offset + lastBoxBottomOffset.value)
	const bottomOffset = computed(() => topOffset.value + options.boxHeight.value)

	return {
		topOffset,
		bottomOffset,
	}
}