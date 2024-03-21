import { SpeechToText } from 'src/adaptor/CasebookTextSTT';
import { Recorder as BaseRecorder } from 'src/Recorder';

export class Recorder extends BaseRecorder {
	name?: string = '';

	constructor(name: string) {
		super(SpeechToText);
		this.name = name;
	}

	audio: Blob | null = null;
}
