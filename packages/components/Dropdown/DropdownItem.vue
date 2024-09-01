<script setup lang="ts">
import type { DropdownItemProps } from './types';
import { DROPDOWN_CTX_KEY } from './constant';
import { inject, computed } from 'vue';

import { useId } from '@yovy-ui/hooks';

defineOptions({
	name: 'YoDropdownItem'
})

const props = withDefaults(defineProps<DropdownItemProps>(), {
	disabled: false,
	divided: false,
	command: useId().value,
})

const ctx = inject(DROPDOWN_CTX_KEY)
const size = computed(() => ctx?.size.value)

// 处理Item的点击事件
function handleClick() {
	if (props.disabled) return
	ctx?.handleItemClick(props)
}
</script>

<template>
	<li v-if="divided" role="separator" class="divided-placeholder"></li>
	<li
		:id="`dropdown-item-${command ?? useId().value}`"
		:class="{
			'yo-dropdown__item': true,
			['yo-dropdown__item--' + size]: size,
			'is-disabled': disabled,
			'is-divided': divided,
		}"
		@click="handleClick"
	>
		<slot>{{ label }}</slot>
	</li>
</template>

<style scoped>
@import './style.css';
</style>