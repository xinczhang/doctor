import { Recorder } from 'src/pages/LargeCasebook/TextRecorder';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const MOCK_TEXT = 'Some more conent. 1 2 3 4.'.split(' ');

export async function SpeechToText(recorder: Recorder) {
	const segments = [];

	for (const word of [`${new Date().toISOString()}`].concat(MOCK_TEXT)) {
		const delay = Math.trunc(Math.random() * 500);

		await sleep(delay);
		segments.push(word);
		recorder.setText(segments.join(' '));
	}
}
