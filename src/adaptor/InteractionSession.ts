type TextSetter = (text: string) => void;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const MOCK_TEXT = ['This', 'is', 'mock.'];

export async function SpeechToText(audio: Blob, setText: TextSetter) {
	console.log(audio);

	const segments = [];

	for (const word of [`${new Date().toISOString()}`].concat(MOCK_TEXT)) {
		const delay = Math.trunc(Math.random() * 1000);

		await sleep(delay);
		segments.push(word);
		setText(segments.join(' '));
		console.log(delay, segments);
	}
}

export async function OnSessionCreated() {}
