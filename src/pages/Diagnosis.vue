<template>
	<q-page
		padding
		id="app-diagnosis"
	>
		<q-card
			id="app-diagnosis-card"
			bordered
			class="bg-positive no-shadow"
		>
			<q-card-section>
				<q-card :class="[`shadow-${SHADOW_DEPTH}`]">
					<q-card-section>Abstract</q-card-section>
				</q-card>
				<q-card
					class="q-mt-md"
					:class="[`shadow-${SHADOW_DEPTH}`]"
				>
					<q-card-section>Reference</q-card-section>
					<q-card-section class="bg-grey-2">list</q-card-section>

					<q-card-section class="">
						<div class="text-subtitle2 q-mb-sm text-red-14 text-weight-bold">
							<q-icon
								name="error_outline"
								class="q-mr-sm"
							/>风险提示
						</div>
						<ol class="q-pl-md q-ma-none text-body2 text-grey-6">
							<li>高烧三天不退建议尽快就医；</li>
							<li>有备孕计划或哺乳期的患者谨慎用药；</li>
							<li>若正服用其他药品，请用医生确认是否可以使用以上止痛药；</li>
							<li>继发性痛经建议尽快就医。</li>
						</ol>
					</q-card-section>
				</q-card>
			</q-card-section>
		</q-card>

		<q-btn
			class="full-width q-mt-md rounded-borders q-pa-sm"
			color="red-6"
			align="center"
			label="Next"
		/>
	</q-page>
</template>

<script setup lang="ts">
const SHADOW_DEPTH = 4;

defineOptions({ name: 'PageDiagnosis' });
</script>

<style lang="scss">
#app-diagnosis-card {
	border-color: #000;
}
</style>
