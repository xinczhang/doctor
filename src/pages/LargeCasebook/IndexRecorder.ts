import { SpeechToText } from 'src/adaptor/CasebookIndexSTT';
import { Recorder as BaseRecorder } from 'src/Recorder';

export class Recorder extends BaseRecorder {
	name: string = '';

	setName(value: string) {
		this.name = value;
	}

	constructor() {
		super(SpeechToText);
	}

	audio: Blob | null = null;
}
