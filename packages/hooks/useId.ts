// 为每一个DropdownItem生成id
import { type Ref, computed } from 'vue';

const defaultIdInjection = {
	prefix: Math.floor(Math.random() * 10000),
	current: 0,
}

export function useId(namespace: string = 'yo'): Ref<string> {
	const idRef = computed(
		() =>
			`${namespace}-${defaultIdInjection.prefix}-${defaultIdInjection.current++}`
	)
	return idRef
}

export default useId