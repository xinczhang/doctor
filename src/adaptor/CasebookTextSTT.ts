import { Recorder } from 'src/pages/LargeCasebook/TextRecorder';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const MOCK_TEXT =
	'患者诉有高血压历史，长期服药控制血压水平150/100，控制较为良好'.split(' ');

export async function SpeechToText(recorder: Recorder) {
	const segments = [];

	for (const word of MOCK_TEXT) {
		const delay = Math.trunc(Math.random() * 500);

		await sleep(delay);
		segments.push(word);
		recorder.setText(segments.join(' '));
	}
}
