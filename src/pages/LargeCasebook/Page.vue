<template>
	<q-layout
		view="lHh Lpr lFf"
		id="page-large-casebook"
		class="bg-grey-3"
	>
		<q-page-container class="row justify-center">
			<q-page
				class="col col-xl-4 col-lg-6 col-md-7 col-sm-12 bg-white q-py-xl q-px-xl"
				style="min-width: 720px; max-width: 840px"
				padding
			>
				<div
					id="heading"
					class="flex justify-between q-pb-md"
				>
					<div
						class="text-h5"
						id="title"
					>
						<div>天津医科大学第二医院</div>
						<div class="text-caption text-uppercase text-weight-regular">
							THE SECOND HOSPITAL OF TIANJIN MEDICAL UNIVERSITY
						</div>
					</div>
					<div
						class="text-h5 text-right"
						id="category"
					>
						<div>入院记录</div>
						<div class="text-caption text-uppercase text-weight-regular">
							Admission record
						</div>
					</div>
				</div>

				<div
					id="location"
					class="flex justify-between q-pb-md q-mt-md"
				>
					<div id="room">
						<span class="text-grey-6">科室：</span>{{ casebook.class }}
					</div>
					<div id="code">
						<span class="text-grey-6">住院号：</span>{{ casebook.code }}
					</div>
				</div>

				<div class="row q-col-gutter-sm">
					<div class="col">
						<q-input
							class="compact-form-input"
							outlined
							dense
							label="姓名"
							:model-value="casebook.profile.name"
						></q-input>
					</div>
					<div class="col">
						<q-input
							class="compact-form-input"
							outlined
							dense
							label="性别"
							:model-value="casebook.profile.sex"
						></q-input>
					</div>
					<div class="col">
						<q-input
							class="compact-form-input"
							outlined
							dense
							label="年龄"
							:model-value="casebook.profile.age"
						></q-input>
					</div>
				</div>

				<div class="row q-col-gutter-sm q-mt-sm">
					<div class="col">
						<q-input
							class="classical-form-input"
							dense
							label="民族"
							:model-value="casebook.profile.family"
						></q-input>
					</div>
					<div class="col">
						<q-input
							class="classical-form-input"
							dense
							label="婚姻状况"
							:model-value="casebook.profile.marriage"
						></q-input>
					</div>
					<div class="col">
						<q-input
							class="classical-form-input"
							dense
							label="籍贯"
							:model-value="casebook.profile.registry"
						></q-input>
					</div>
					<div class="col">
						<q-input
							class="classical-form-input"
							dense
							label="电话"
							:model-value="casebook.profile.phone"
						></q-input>
					</div>
					<div class="col">
						<q-input
							class="classical-form-input"
							dense
							label="可靠程度"
							:model-value="String(casebook.profile.reliable)"
						></q-input>
					</div>
				</div>

				<div class="row q-col-gutter-sm q-mt-sm">
					<div class="col">
						<q-input
							class="classical-form-input"
							stack-label
							dense
							label="职业"
							:model-value="casebook.profile.job"
							placeholder="无"
						></q-input>
					</div>
					<div class="col">
						<q-input
							class="classical-form-input"
							stack-label
							dense
							label="工作单位"
							:model-value="casebook.profile.employer"
							placeholder="无"
						></q-input>
					</div>
				</div>

				<div class="row q-col-gutter-sm q-mt-sm">
					<div class="col">
						<q-input
							class="classical-form-input"
							dense
							label="住址"
							:model-value="casebook.profile.address"
						></q-input>
					</div>
				</div>

				<div class="row q-col-gutter-sm q-mt-sm">
					<div class="col">
						<q-input
							class="classical-form-input"
							dense
							label="入院日期"
							:model-value="toLocalString(casebook.profile.createdAt)"
						></q-input>
					</div>
					<div class="col">
						<q-input
							class="classical-form-input"
							dense
							label="病历采写日期"
							:model-value="toLocalString(casebook.profile.recordedAt)"
						></q-input>
					</div>
				</div>

				<div
					id="signature"
					class="row q-col-gutter-sm q-mt-sm"
				>
					<div class="col">
						<q-input
							class="classical-form-input"
							dense
							readonly
							label="病史陈述者及签字"
							:model-value="null"
						></q-input>
					</div>
				</div>

				<symptom-item
					class="q-mt-sm"
					label="患者主诉："
					:value="casebook.symptom.issue"
				/>

				<symptom-item
					class="q-mt-sm"
					label="现病史："
					:value="casebook.symptom.current"
				/>

				<symptom-item
					class="q-mt-sm"
					label="既往史："
					:value="casebook.symptom.history"
				/>
			</q-page>
		</q-page-container>
	</q-layout>
</template>

<script setup lang="ts">
import { date } from 'quasar';

import SymptomItem from './SymptomItem.vue';
import casebook from './sample/profile.json';

const MASK = 'YYYY-MM-DD HH:mm';

function toLocalString(isoString: string) {
	return date.formatDate(new Date(isoString).getTime(), MASK);
}

defineOptions({ name: 'Page.LargeCasebook' });
</script>

<style lang="scss">
#page-large-casebook {
	#heading {
		color: $front-color;

		.text-caption {
			font-size: 14px;
		}

		border-bottom: solid $front-color 4px;
	}

	#location {
		color: $front-color;
	}

	#signature {
		input {
			height: 72px;
		}

		.q-field__control {
			height: 96px;

			$gap: 10px;

			.q-field__control-container {
				height: 72px;

				&::after {
					text-align: center;
					line-height: 48px;
					font-size: 24px;
					color: #bbb;
					content: '患者在此区域内签名';
					display: block;
					position: absolute;
					border-color: #ddd;
					border-style: dashed;
					border-width: 2px;
					border-radius: 4px;
					top: $gap;
					left: $gap;
					right: $gap;
					bottom: $gap;
				}
			}
		}
	}
}
</style>
