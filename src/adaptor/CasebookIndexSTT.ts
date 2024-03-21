import { Recorder } from 'src/pages/LargeCasebook/IndexRecorder';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function randomInt(from: number, to: number) {
	return Math.trunc(from + (to - from) * Math.random());
}

export async function SpeechToText(recorder: Recorder) {
	const delay = Math.trunc(Math.random() * 1000);

	await sleep(delay);
	recorder.setName('pressure');
	recorder.setText(`${randomInt(90, 200)}/${randomInt(40, 110)}`);
}
