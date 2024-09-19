import { type Ref, computed } from 'vue';

type UseOffsetOptions = {
	offset: number
	// 存在未知的错误(无法使用Ref<number>)
	boxHeight: any
	getLastBoxBottomOffset(): number
}

type UseOffsetResult = {
	topOffset: Ref<number>
	bottomOffset: Ref<number>
}

export function useOffset(options: UseOffsetOptions): UseOffsetResult {
	const lastBoxBottomOffset = computed(() => options.getLastBoxBottomOffset())
	const topOffset = computed(() => options.offset + lastBoxBottomOffset.value)
	const bottomOffset = computed(() => topOffset.value + options.boxHeight.value)

	return {
		topOffset,
		bottomOffset: bottomOffset as Ref<number>,
	}
}