<script setup lang="ts">
import type { IconProps } from './types/index';
import { defineOptions, defineProps, computed } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { omit } from 'lodash-es';

defineOptions({
	name: 'YoIcon',
	inheritAttrs: false
})

const props = defineProps<IconProps>()
const filterProps = computed(() => omit(props, ['type', 'color']))
const customStyles = computed(() => ({ color: props.color ?? void 0 }))
</script>

<template>
	<i
		class="yo-icon"
		:class="{
			[`yo-icon-${type}`]: type,
		}"
		:style="customStyles"
		v-bind="$attrs"
	>
		<font-awesome-icon v-bind="filterProps" />
	</i>
</template>

<style scoped>
@import './style.css'
</style>