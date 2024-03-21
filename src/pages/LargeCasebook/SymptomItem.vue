<template>
	<div class="row symptom-item q-pa-sm">
		<div class="col-2 text-weight-bold">{{ props.label }}</div>
		<div
			class="col"
			@mouseup="requestRecording"
		>
			{{ value }}
		</div>
		<q-btn
			@mousedown.stop="startRecord"
			@mouseup.stop="stopRecord"
			size="md"
			dense
			:color="listening ? 'negative' : 'primary'"
			class="fixed q-px-sm"
			:icon="listening ? 'hearing' : 'mic'"
			:label="listening ? '正在听...' : '语音识别以替换'"
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
import { Recorder } from './TextRecorder';

const props = defineProps<{
	name: string;
	label: string;
	value: string;
}>();

const value = ref<string>(props.value);
const selecting = ref(false);
const top = ref(0);
const left = ref(0);
const listening = ref(false);
const recording = ref<Recorder | null>(null);

const currentSelection = {
	start: -1,
	end: -1,
};

function resetSelection() {
	currentSelection.start = -1;
	currentSelection.end = -1;
}

function requestRecording(event: MouseEvent) {
	const selection = window.getSelection();

	if (selection === null || selection.type !== 'Range') {
		return;
	}

	event.stopPropagation();
	selecting.value = true;

	const range = selection.getRangeAt(0);
	const rect = range.getBoundingClientRect();

	currentSelection.start = range.startOffset;
	currentSelection.end = range.endOffset;

	top.value = rect.top;
	left.value = (rect.left + rect.right) / 2;
}

function cancelRecording() {
	selecting.value = false;

	const recorder = recording.value;

	if (recorder !== null) {
		if (!recorder.finished) {
			recorder.stop();
		}

		recording.value = null;
	}

	resetSelection();
}

async function startRecord() {
	listening.value = true;

	const prefix = value.value.substring(0, currentSelection.start);
	const suffix = value.value.substring(currentSelection.end);
	const recorder = (recording.value = new Recorder(props.name));

	recorder.addEventListener('text-change', () => {
		value.value = `${prefix}${recorder.text}...${suffix}`;
	});

	recorder.addEventListener('finish', () => {
		value.value = `${prefix}${recorder.text}${suffix}`;
	});

	await recorder.start();
}

async function stopRecord() {
	listening.value = false;
	await recording.value?.stop(true);
	cancelRecording();
}

onMounted(() => document.addEventListener('mousedown', cancelRecording));
onUnmounted(() => document.removeEventListener('mousedown', cancelRecording));
</script>

<style lang="scss">
.symptom-item {
	border: 1px solid #f7f7f7;
}
</style>
