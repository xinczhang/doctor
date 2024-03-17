<template>
	<div class="app-index-item">
		<div class="bg-grey-2 q-py-xs q-px-sm rounded-borders text-no-wrap">
			<div class="text-caption text-grey-7">{{ props.label }}</div>
			<div class="app-index-value">{{ props.value }}</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{
	label: string;
	value: string;
}>();
</script>

<style lang="scss">
.app-index-item {
	& > div {
		border-radius: 4px;
	}

	.app-index-value {
		color: #285e72;
	}
}
</style>
