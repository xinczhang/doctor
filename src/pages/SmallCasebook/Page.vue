<template>
	<q-layout
		view="lHh Lpr lFf"
		id="page-small-casebook"
		@scroll="setHeaderBackground"
	>
		<q-header
			bordered
			:class="{
				'solid-bg': scrolled,
				'bg-transparent': !scrolled,
			}"
			class="text-black"
		>
			<q-toolbar class="text-h6 text-weight-bold">
				<q-btn
					flat
					dense
					round
					icon="navigate_before"
					aria-label="Back"
					:to="{ name: 'app.index' }"
				/>

				<div>病历本</div>
			</q-toolbar>
		</q-header>

		<q-page-container>
			<q-page padding>
				<q-card
					id="identification"
					class="q-my-sm"
					flat
				>
					<q-card-section
						class="q-px-sm q-py-xs"
						id="name"
					>
						<div class="text-h5 text-weight-bold">李国斌</div>
					</q-card-section>

					<q-card-section
						class="q-px-sm q-py-xs"
						id="property"
					>
						男性 | 76岁 | 泌尿科A区
					</q-card-section>

					<q-card-section
						class="q-px-sm q-py-xs"
						id="slot-code"
					>
						<div class="text-caption text-grey-6">
							<q-icon
								name="domain"
								class="q-mr-xs"
							/>住院号：38277466
						</div>
					</q-card-section>
				</q-card>

				<q-card
					flat
					id="profile"
					class="q-my-md overflow-hidden"
				>
					<q-card-section class="q-pa-none">
						<q-btn
							label="体格检查"
							flat
							square
							class="text-weight-bold"
							id="profile-heading"
						></q-btn>
					</q-card-section>

					<q-card-section class="q-pa-none q-pa-sm">
						<div class="row q-col-gutter-xs">
							<profile-item
								class="col-3"
								v-for="(item, index) in profileList"
								:key="index"
								:label="item.label"
								:value="item.value"
							></profile-item>
						</div>
					</q-card-section>
				</q-card>

				<q-card
					id="detail"
					flat
					class="q-my-md"
				>
					<q-card-section class="q-pa-sm">
						<detail-item
							class="q-mb-sm"
							v-for="name in DETAIL_ITEM_LIST"
							:key="name"
							:label="details[name].label"
							:value="details[name].content"
						></detail-item>
					</q-card-section>
				</q-card>
			</q-page>
		</q-page-container>
	</q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { QLayoutProps } from 'quasar';

import ProfileItem from './ProfileItem.vue';
import DetailItem from './DetailItem.vue';

import profileList from './sample/profile.json';
import details from './sample/detail.json';

const DETAIL_ITEM_LIST: [
	'issue',
	'current',
	'history',
	'marriage',
	'family',
	'immunization',
	'suggestion',
] = [
	'issue',
	'current',
	'history',
	'marriage',
	'family',
	'immunization',
	'suggestion',
];

const scrolled = ref(false);

const setHeaderBackground: QLayoutProps['onScroll'] = (info) => {
	scrolled.value = info.position > 20;
};

defineOptions({ name: 'Page.SmallCasebook' });
</script>

<style lang="scss">
#page-small-casebook {
	background-color: #f4f5fa;

	.solid-bg {
		background-color: #f4f5fa;
	}

	.text-h6 {
		font-size: 16px;
	}

	&::before {
		content: '';
		display: block;
		position: absolute;
		top: 0;
		width: 100%;
		height: 210px;
		background: linear-gradient(51.58deg, #ffffff 0%, #d2efff 100%);
	}

	#identification {
		background-color: transparent;

		&::after {
			content: '';
			position: absolute;
			width: 150px;
			height: 200px;
			top: 16px;
			right: 10px;
			background-image: url('./image//icon-casebook.png');
			background-repeat: no-repeat;
			background-size: 100%;
		}
	}

	#profile {
		background-color: rgba(255, 255, 255, 0.8);

		#profile-heading {
			background: linear-gradient(
				180deg,
				#cae2eb 0%,
				rgba(202, 226, 235, 0) 100%
			);

			border-bottom-right-radius: $generic-border-radius;
		}
	}

	#detail {
		background: linear-gradient(
			180deg,
			#cae2eb 0%,
			rgba(202, 226, 235, 0) 100%
		);
	}
}
</style>
