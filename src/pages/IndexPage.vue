<template>
	<q-page class="row items-center justify-evenly">
		<router-link :to="{ name: 'app.small.casebook' }">
			病例（移动端）
		</router-link>

		<router-link :to="{ name: 'app.large.casebook' }">
			病例（医生端）
		</router-link>

		<router-link :to="{ name: 'app.interaction' }"> 互动 </router-link>
	</q-page>
</template>

<script setup lang="ts"></script>
