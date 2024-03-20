type TextSetter = (text: string) => void;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const MOCK_TEXT =
	'This is mock. There are many words to display for line breaking.'.split(' ');

export async function SpeechToText(audio: Blob, setText: TextSetter) {
	const segments = [];

	for (const word of [`${new Date().toISOString()}`].concat(MOCK_TEXT)) {
		const delay = Math.trunc(Math.random() * 200);

		await sleep(delay);
		segments.push(word);
		setText(segments.join(' '));
	}
}

import { Session } from 'src/pages/Interaction/Session';
import mock from './mock.json';

export async function OnSessionCreated(session: Session) {
	for (const { sent, who, text } of mock) {
		session.put(sent, who, 'http://example.com', text);
	}

	session.addEventListener('sending', () => session.lock());

	session.addEventListener('sent', async function reply() {
		session.lock();

		const recorder = session.receive('bot');
		const segments = [];

		for (const word of [`${new Date().toISOString()}`].concat(MOCK_TEXT)) {
			const delay = Math.trunc(Math.random() * 200);

			await sleep(delay);
			segments.push(word);
			recorder.setText(segments.join(' '));
		}

		// 自动播放可以在这里实现成副作用
		// https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement

		recorder.setAudio(new Blob());
		recorder.end();

		session.unlock();
	});
}
