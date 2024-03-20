<template>
	<q-layout
		view="hHh lpR fFf"
		id="page-interaction"
		class="non-selectable"
	>
		<q-header
			bordered
			class="text-black"
		>
			<q-toolbar>
				<q-toolbar-title>
					<div
						class="text-h6 text-weight-bold"
						style="line-height: 20px"
					>
						海河优医
					</div>
					<div class="text-caption text-grey-6">
						<q-icon
							class="icon-align-fix text-positive q-mr-xs"
							name="fiber_manual_record"
						/>已接入智能助手
					</div>
				</q-toolbar-title>
				<q-btn-dropdown
					flat
					split
					disable-main-btn
					dropdown-icon="menu"
					content-style="box-shadow: 0px 8px 20px 0px #0000001A;"
				>
					<q-list separator>
						<q-item
							clickable
							:to="{ name: 'app.index' }"
						>
							<q-item-section side>
								<q-icon
									class="text-black"
									name="backup"
								/>
							</q-item-section>
							<q-item-section>
								<q-item-label>上传检查报告</q-item-label>
							</q-item-section>
						</q-item>

						<q-item clickable>
							<q-item-section side>
								<q-icon
									class="text-black"
									name="folder_open"
								/>
							</q-item-section>
							<q-item-section>
								<q-item-label>查看病例本</q-item-label>
							</q-item-section>
						</q-item>
					</q-list>
				</q-btn-dropdown>
			</q-toolbar>
		</q-header>

		<q-page-container>
			<q-page
				padding
				class="q-pa-md"
			>
				<template
					v-for="(message, index) in messages"
					:key="index"
				>
					<q-chat-message
						class="q-mt-md q-mb-xs"
						:text="[message.text]"
						:bg-color="message.sent ? 'grey-4' : 'white'"
						:name="message.who"
						:sent="message.sent"
						text-html
					>
						<template
							v-if="!message.sent"
							v-slot:name
						>
							<q-avatar
								class="q-mb-xs"
								size="32px"
								><img src="/ai.jpg"
							/></q-avatar>
						</template>

						<template
							v-if="index === 0"
							v-slot:stamp
						>
							<div class="text-grey-8">
								<q-icon
									class="icon-align-fix q-mr-xs q-mt-xs"
									name="help_outline"
								/>使用帮助请点击右上角
							</div>
						</template>
					</q-chat-message>

					<div class="row items-end no-wrap reverse">
						<q-btn
							v-if="message.sent"
							rounded
							outline
							padding="none sm none xs"
							size="sm"
							color="grey-8"
							><q-icon
								name="refresh"
								class="flip-horizontal"
							/>重说</q-btn
						>
					</div>
				</template>

				<q-chat-message
					class="q-mt-md q-mb-xs"
					:text="[inputingText]"
					bg-color="grey-4"
					name="就诊人"
					sent
					text-html
					stamp="正在分析您的语音..."
					v-if="inputing !== null"
				></q-chat-message>

				<q-chat-message
					class="q-mt-md q-mb-xs"
					:text="[receivingText]"
					bg-color="white"
					text-html
					v-if="receiving !== null"
				>
					<template v-slot:name>
						<q-avatar
							class="q-mb-xs"
							size="32px"
							><img src="/ai.jpg"
						/></q-avatar>
					</template>
				</q-chat-message>
				<div ref="bottom"></div>
			</q-page>
		</q-page-container>

		<q-footer
			bordered
			class="no-border"
		>
			<q-toolbar class="q-pa-none">
				<q-btn
					@contextmenu.prevent
					@touchstart.stop="startInput"
					@touchend.stop="appendMessage"
					flat
					class="full-width text-black text-h6"
					style="line-height: 50px"
					:class="{ gradient: inputing !== null }"
					:icon="inputing !== null ? 'radio_button_checked' : 'mic'"
					:label="inputing !== null ? '说话中...' : '点击后开始说话'"
					v-if="!locking"
				/>
				<q-btn
					@contextmenu.prevent
					disable
					flat
					class="full-width text-black text-h6"
					style="line-height: 50px"
					icon="pending"
					label="正在分析..."
					v-if="locking"
				/>
			</q-toolbar>
		</q-footer>
	</q-layout>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { scroll } from 'quasar';
import { Session, Recorder, RecorderEvent } from './Session';

interface Message {
	sent: boolean;
	who: string;
	text: string;
	audioURL: string;
}

const messages: Message[] = reactive([]);
const bottom = ref<HTMLDivElement>(document.createElement('div'));
const inputing = ref<Recorder | null>(null);
const inputingText = ref<string>('');
const receiving = ref<Recorder | null>(null);
const receivingText = ref<string>('');
const locking = ref(false);

function scrollToBottom(duration: number = 0) {
	scroll.setVerticalScrollPosition(window, bottom.value.offsetTop, duration);
}

const session = new Session();

function render() {
	messages.splice(0);

	messages.push(
		...session.messages.map((message) => {
			return {
				sent: message.sent,
				who: message.who,
				text: message.text,
				audioURL: message.audioURL,
			};
		}),
	);
}

render();
session.addEventListener('push-message', render);

session.addEventListener('lock-change', () => {
	locking.value = session.locking;
});

session.addEventListener('receiving', (event) => {
	const recorderEvent = event as RecorderEvent;
	const recorder = recorderEvent.recorder as Recorder;

	receiving.value = recorder;

	recorder.addEventListener('text-change', () => {
		receivingText.value = recorder.text as string;
		scrollToBottom();
	});
});

session.addEventListener('received', () => {
	receiving.value = null;
	receivingText.value = '';
});

async function startInput() {
	const recorder = session.sent('就诊人');

	recorder.addEventListener('text-change', () => {
		inputingText.value = recorder.text as string;
		scrollToBottom();
	});

	inputingText.value = ' ';
	inputing.value = recorder;
	await recorder.start();
}

async function appendMessage() {
	const { value: recorder } = inputing;

	if (recorder === null) {
		return;
	}

	await recorder.stop(true);
	inputing.value = null;
	scrollToBottom(500);
}

defineOptions({ name: 'Page.InteractionPanel' });
</script>

<style lang="scss">
#page-interaction {
	.text-h6 {
		font-size: 16px;
	}

	background-color: #f4f5fa;

	.q-header {
		background-color: #f4f5fa;
	}

	.q-footer {
		background-color: #ffffff;
	}

	.q-btn.gradient {
		background-image: linear-gradient(to right, #fff, #eee, #fff);
	}

	$bubble-blank: 48px;

	.q-message-sent {
		padding-left: $bubble-blank;
		.q-message-text {
			background-color: #cae2eb;
		}
	}

	.q-message-name {
		color: #bbb;
	}

	.q-message-received {
		padding-right: $bubble-blank;
	}

	.q-message-text {
		min-height: 0;

		padding: 1em;

		&::before {
			content: none;
		}

		&.q-message-text--received {
			border-top-left-radius: 0;
			border-bottom-left-radius: $generic-border-radius;
		}

		&.q-message-text--sent {
			border-top-right-radius: 0;
			border-bottom-right-radius: $generic-border-radius;
		}
	}
}
</style>
