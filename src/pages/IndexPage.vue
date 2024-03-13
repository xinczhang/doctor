<template>
	<q-page class="row items-center justify-evenly">
		<router-link :to="{ name: 'app.diagnosis' }">诊断</router-link>
		<router-link :to="{ name: 'app.interaction' }">互动</router-link>
	</q-page>
</template>

<script setup lang="ts"></script>
