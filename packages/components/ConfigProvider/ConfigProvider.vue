<script setup lang="ts">
import type { ConfigProviderProps } from './types';
import { provideGloabalConfig } from './hooks';
// 该组件的意义在于, 

defineOptions({
	name: 'YoConfigProvider'
})

const props = defineProps<ConfigProviderProps>()

const config = provideGloabalConfig(props)
</script>

<template>
	<slot name="default" :config="config" />
</template>