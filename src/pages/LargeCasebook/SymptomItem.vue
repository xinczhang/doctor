<template>
	<div class="row symptom-item q-pa-sm">
		<div class="col-2 text-weight-bold">{{ props.label }}</div>
		<div
			class="col"
			@mouseup="changeByMic"
		>
			{{ props.value }}
		</div>
		<q-btn
			size="md"
			dense
			color="primary"
			class="fixed q-px-sm"
			icon="mic"
			label="语音修改"
			v-if="selecting"
			:style="{
				top: `${top}px`,
				left: `${left}px`,
			}"
			style="transform: translate(-50%, -120%)"
		></q-btn>
	</div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

const props = defineProps<{
	label: string;
	value: string;
}>();

const selecting = ref(false);
const top = ref(0);
const left = ref(0);

function changeByMic(event: MouseEvent) {
	const selection = window.getSelection();

	if (selection === null || selection.type !== 'Range') {
		return;
	}

	event.stopPropagation();
	selecting.value = true;

	const range = selection.getRangeAt(0);
	const rect = range.getBoundingClientRect();

	top.value = rect.top;
	left.value = (rect.left + rect.right) / 2;
}

function cancelChange() {
	selecting.value = false;
}

onMounted(() => document.addEventListener('mousedown', cancelChange));
onUnmounted(() => document.removeEventListener('mousedown', cancelChange));
</script>

<style lang="scss">
.symptom-item {
	border: 1px solid #f7f7f7;
}
</style>
