<script setup lang="ts">
import { ref, computed } from 'vue';
import { addUnit } from '@yovy-ui/utils';

import YoTooltip from '../Tooltip/Tooltip.vue';
import YoButton from '../Button/Button.vue';
import YoIcon from '../Icon/Icon.vue';

import type { PopconfirmProps, PopconfirmEmits } from './types';
import type { TooltipInstance } from '../Tooltip';

defineOptions({
	name: 'YoPopconfirm'
})

// 在Popconfirm组件用到了YoTooltip, 所以需要使用TooltipInstance实例类型
const tooltipRef = ref<TooltipInstance>()

// Popconfirm的props
const props = withDefaults(defineProps<PopconfirmProps>(), {
	title: '默认文本',
	confirmButtonText: 'Confirm',
	cancelButtonText: 'Cancel',
	confirmButtonType: 'primary',
	cancelButtonType: 'info',
	icon: 'question-circle',
	iconColor: "#f90",
	hideIcon: false,
	hideAfter: 500,
	width: 300,
})

// 将width转换为带有单位的string类型的数据
const style = computed(() => ({
	width: addUnit(props.width)
}))

const emits = defineEmits<PopconfirmEmits>()

// Popconfirm的emits事件必然会导致Tooltip组件的隐藏
function hidePopper() {
	tooltipRef.value?.hide()
}

// Popconfirm的emits事件
function confirm(e: MouseEvent) {
	emits('confirm', e)
	hidePopper()
}

function cancel(e: MouseEvent) {
	emits('cancel', e)
	hidePopper()
}
</script>

<template>
	<yo-tooltip ref="tooltipRef" trigger="click" :hide-timeout="hideAfter">
		<template #content>
			<div class="yo-popconfirm" :style="style">
				<div class="yo-popconfirm__main">
					<yo-icon v-if="!hideIcon && icon" :icon="icon" :color="iconColor" />
					{{ title }}
				</div>
				<div class="yo-popconfirm__action">
					<yo-button
						size="small"
						:type="confirmButtonType"
						@click="confirm"
					>
						{{ confirmButtonText }}
					</yo-button>
					<yo-button
						size="small"
						:type="cancelButtonType"
						@click="cancel"
					>
						{{ cancelButtonText }}
					</yo-button>
				</div>
			</div>
		</template>

		<template v-if="$slots.default" #default>
			<slot name="default"></slot>
		</template>

		<template v-if="$slots.reference" #default>
			<slot name="reference"></slot>
		</template>
	</yo-tooltip>
</template>

<style scoped>
@import './style.css'
</style>