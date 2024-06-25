<script setup lang="ts">
import type { CollapseItemProps } from './types';
import { inject, computed } from 'vue';
import { COLLAPSE_CTX_KEY } from './constant';
import YoIcon from '../Icon/Icon.vue';
import transitionEvents from './utils/transitionEvents';

defineOptions({
	name: "YoCollapseItem"
})

const props = defineProps<CollapseItemProps>()
const ctx = inject(COLLAPSE_CTX_KEY, void 0)
const isActive = computed(() => ctx?.activeNames.value?.includes(props.name))

/**
 * 处理Collapse中的Item的点击事件
 */
function handleClick() {
	if (props.disabled) return
	ctx?.handleItemClick(props.name)
}
</script>

<template>
	<div
		class="yo-collapse-item"
		:class="{
			'is-disabled': disabled
		}"
	>
		<!-- name -->
		<div
			class="yo-collapse-item__header"
			@click="handleClick"
			:id="`item-header-${name}`"
			:class="{
				'is-active': isActive,
				'is-disabled': disabled
			}"
		>
			<span class="yo-collapse-item__title">
				<slot name="title">
					{{ title }}
				</slot>
			</span>
			<yo-icon icon="angle-right" class="header-angle"></yo-icon>
		</div>
		<!-- content -->
		<transition name="slide" v-on="transitionEvents">
			<div class="yo-collapse-item__wrapper" v-show="isActive">
				<div class="yo-collapse-item__content" :id="`item-content-${name}`">
					<slot />
				</div>
			</div>
		</transition>
	</div>
</template>

<style scoped>
@import './style.css'
</style>