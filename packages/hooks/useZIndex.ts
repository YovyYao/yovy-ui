import { computed, ref } from 'vue';

const zIndex = ref(0)

/**
 * 当某些组件的优先级较高时, 可采用useZIndex()将该组件的zIndex值设置为页面上中较高一个.
 * @param initValue 初始zIndex值
 * @returns 返回新的zIndex值, 当前zIndex值和下一次的zIndex值
 */
export function useZIndex(initValue = 2000) {
	const newInitValue = ref(initValue)
	const currentZIndex = computed(() => zIndex.value + newInitValue.value)
	const nextZIndex = () => {
		zIndex.value++
		return currentZIndex.value
	}

	return {
		initValue: newInitValue,
		currentZIndex,
		nextZIndex
	}
}