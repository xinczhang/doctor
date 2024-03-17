<template>
	<div class="row symptom-item q-pa-sm">
		<div class="col-2 text-weight-bold">{{ props.label }}</div>
		<div class="col">{{ props.value }}</div>
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{
	label: string;
	value: string;
}>();
</script>

<style lang="scss">
.symptom-item {
	border: 1px solid #f7f7f7;
}
</style>
