<script setup lang="ts">
import { ref, provide, watch, watchEffect } from 'vue';
import type { CollapseProps, CollapseEmits, CollapseItemName } from './types';
import { COLLAPSE_CTX_KEY } from './constant';
import { debugWarn } from '@yovy-ui/utils';

const COMP_NAME = 'YoCollapse' as const

defineOptions({
	name: COMP_NAME
})

const props = defineProps<CollapseProps>()
const emits = defineEmits<CollapseEmits>()
const activeNames = ref(props.modelValue)

/**
 * 更新激活项
 * @param newNames 即将要更新的新的激活项
 * @returns
 */
function updateActiveNames(newNames: CollapseItemName[]) {
	activeNames.value = newNames
	emits("update:modelValue", newNames)
	emits("change", newNames)
}

/**
 * 折叠面板点击事件
 * @param item 被点击的那一项
 * @returns
 */
function handleItemClick(item: CollapseItemName) {
	let _activeNames = [...activeNames.value]
	// 如果开启了手风琴模式
	if (props.accordion) {
		// 手风琴模式只允许一项展开
		_activeNames = [_activeNames[0] === item ? "" : item]
		updateActiveNames(_activeNames)
		return
	}
	// 普通模式允许多项展开
	const index = _activeNames.indexOf(item)
	if (index > -1) {
		// 已激活, 则点击后应该关闭, 所以在激活数组中删除该项
		_activeNames.splice(index, 1)
	} else {
		// 未激活, 则点击后应该展开, 所以在激活数组中添加该项
		_activeNames.push(item)
	}
	updateActiveNames(_activeNames)
}

// 开启了手风琴模式但激活数组中有2项或以上, 报错
watchEffect(() => {
	if (props.accordion && activeNames.value.length > 1) {
		debugWarn(COMP_NAME, "accordion mode should only have one active item")
	}
})

watch(
	() => props.modelValue,
	(newNames) => updateActiveNames(newNames)
)

provide(COLLAPSE_CTX_KEY, {
	activeNames,
	handleItemClick,
})
</script>

<template>
	<div class="yo-collapse">
		<slot />
	</div>
</template>

<style scoped>
@import './style.css'
</style>