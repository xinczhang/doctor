<template>
	<q-page padding>
		<q-chat-message
			name="Anny"
			avatar="https://cdn.quasar.dev/img/avatar3.jpg"
			:text="['hey, how are you?']"
			stamp="7 minutes ago"
			sent
			:size="SENT_SIZE"
			bg-color="amber-7"
		/>
		<q-chat-message
			name="Jane"
			avatar="https://cdn.quasar.dev/img/avatar5.jpg"
			:text="[
				'doing fine, how r you?',
				'I just feel like typing a really, really, REALLY long message to annoy you...',
			]"
			:size="SIZE"
			stamp="4 minutes ago"
			text-color="white"
			bg-color="primary"
		/>
		<q-chat-message
			name="Jane"
			avatar="https://cdn.quasar.dev/img/avatar5.jpg"
			:text="['Did it work?']"
			stamp="1 minutes ago"
			:size="SIZE"
			text-color="white"
			bg-color="primary"
		/>
		<q-chat-message
			name="Anny"
			avatar="https://cdn.quasar.dev/img/avatar3.jpg"
			:text="['hey, how are you?']"
			stamp="7 minutes ago"
			sent
			:size="SENT_SIZE"
			bg-color="amber-7"
		>
			<template v-slot:label>You recalled a message</template>
		</q-chat-message>
	</q-page>
</template>

<script setup lang="ts">
const SIZE = '10';
const SENT_SIZE = '6';

defineOptions({ name: 'PageInteraction' });
</script>
