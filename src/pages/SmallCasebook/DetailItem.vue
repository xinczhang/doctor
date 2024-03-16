<template>
	<q-card
		class="overflow-hidden app-detail-item"
		flat
	>
		<q-card-section class="q-pa-none">
			<q-expansion-item
				:label="props.label"
				v-model="open"
				:header-class="{
					'text-weight-bold': true,
					'text-h6': open,
					'text-grey-8': !open,
				}"
			>
				<q-card>
					<q-card-section class="q-pt-none">{{ props.value }}</q-card-section>
				</q-card>
			</q-expansion-item>
		</q-card-section>
	</q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
	label: string;
	value: string;
}>();

const open = ref(false);
</script>

<style lang="scss">
.app-detail-item {
	.text-h6 {
		font-size: 16px;
	}
}
</style>
