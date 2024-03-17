<template>
	<q-layout
		view="lHh Lpr lFf"
		id="page-large-casebook"
		class="bg-grey-3"
	>
		<q-page-container class="row justify-center">
			<q-page
				class="col col-xl-6 col-lg-8 col-md-10 bg-white q-py-xl q-px-xl"
				padding
			>
				<div
					id="heading"
					class="flex justify-between q-pb-md"
				>
					<div
						class="text-h4"
						id="title"
					>
						<div>天津医科大学第二医院</div>
						<div class="text-caption text-uppercase text-weight-regular">
							THE SECOND HOSPITAL OF TIANJIN MEDICAL UNIVERSITY
						</div>
					</div>
					<div
						class="text-h4 text-right"
						id="category"
					>
						<div>入院记录</div>
						<div class="text-caption text-uppercase text-weight-regular">
							Admission record
						</div>
					</div>
				</div>
			</q-page>
		</q-page-container>
	</q-layout>
</template>

<script setup lang="ts">
defineOptions({ name: 'Page.LargeCasebook' });
</script>

<style lang="scss">
#page-large-casebook {
	#heading {
		color: $front-color;

		.text-caption {
			font-size: 16px;
		}

		border-bottom: solid $front-color 4px;
	}
}
</style>
