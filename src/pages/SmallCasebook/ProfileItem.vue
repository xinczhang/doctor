<template>
	<div class="app-profile-item">
		<div class="bg-grey-2 q-pa-xs rounded-borders text-center text-no-wrap">
			<div class="text-caption text-grey-7">{{ props.label }}</div>
			<div class="app-profile-value">{{ props.value }}</div>
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
.app-profile-item {
	.app-profile-value {
		color: #285e72;
	}
}
</style>
