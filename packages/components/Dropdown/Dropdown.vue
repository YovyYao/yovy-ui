<script setup lang="ts">
import { computed, ref, provide } from 'vue';
import { isNil, omit } from 'lodash-es';
import type { TooltipInstance } from '../Tooltip/types';
import { type ButtonInstance } from '../Button/index';
import YoButton from '../Button/Button.vue';
import YoButtonGroup from '../Button/ButtonGroup.vue';
import type {
	DropdownProps,
	DropdownEmits,
	DropdownInstance,
	DropdownContext,
	DropdownItemProps
} from './types';

import { useDisabledStyle } from '@yovy-ui/hooks';

import { DROPDOWN_CTX_KEY } from './constant';

import DropdownItem from './DropdownItem.vue';
import YoTooltip from '../Tooltip/Tooltip.vue';

defineOptions({
	name: 'YoDropdown',
	inheritAttrs: false,
})

const props = withDefaults(defineProps<DropdownProps>(), {
	hideOnClick: true,
	items: () => [] as DropdownItemProps[],
})

const emits = defineEmits<DropdownEmits>()
const slots = defineSlots()

// 需要获得Tooltip组件和Button组件的ref实例
// 类型为TooltipInstance的ref实例
const tooltipRef = ref<TooltipInstance>()
// 类型为ButtonInstance的ref实例
const triggerRef = ref<ButtonInstance>()

// const virtualRef = computed(() => triggerRef.value?.ref ?? void 0)
// 对于tooltip, 它并不需要知道Dropdown的type、size、items、hideOnClick、splitButton属性
// tooltip的作用是展示下拉菜单和确认取消操作
const tooltipProps = computed(() => omit(props, ['type', 'size', 'items', 'hideOnClick', 'splitButton']))

/**
 * 处理被点击的那一项
 * @param e 被点击的那一项
 */
function handleItemClick(e: DropdownItemProps) {
	props.hideOnClick && tooltipRef.value?.hide()
	!isNil(e.command) && emits('command', e.command)
}

useDisabledStyle()

// 将inject的数据provide给Dropdown的每一个Item
provide<DropdownContext>(DROPDOWN_CTX_KEY, {
	handleItemClick,
	size: computed(() => props.size)
})

// 把open函数和close函数暴露给Dropdown组件的实例对象
defineExpose<DropdownInstance>({
	open: () => tooltipRef.value?.show(),
	close: () => tooltipRef.value?.hide()
})
</script>

<template>
	<div class="yo-dropdown" :class="{ 'is-disabled': props.disabled }">
		<yo-tooltip
			ref="tooltipRef"
			v-bind="tooltipProps"
			:virtual-triggering="splitButton"
			:virtual-ref="triggerRef?.ref.value"
			@visible-change="$emit('visible-change', $event)"
		>
			<yo-button-group
				v-if="splitButton"
				:type="type"
				:size="size"
				:disabled="disabled">
				<yo-button @click="$emit('click', $event)">
					<slot name="default"></slot>
				</yo-button>
				<yo-button ref="triggerRef" icon="angle-down" />
			</yo-button-group>
			<slot name="default" v-else></slot>
			<template #content>
				<div class="yo-dropdown__menu">
					<slot name="dropdown">
						<template v-for="item in items" :key="item.command">
							<dropdown-item v-bind="item"></dropdown-item>
						</template>
					</slot>
				</div>
			</template>
		</yo-tooltip>
	</div>
</template>

<style scoped>
@import './style.css';

:deep(.yo-button__group) {
	& > :last-child {
		padding: 5px 7px;
	}
}
</style>