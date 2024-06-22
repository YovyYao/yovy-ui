<script setup lang="ts">
import { AlertProps } from './types';
defineOptions({
	name: "YoAlert"
})

</script>

<template>
	<div class="yo-alert">
		<slot></slot>
	</div>
</template>

<style scoped>
@import './style.css'
</style>