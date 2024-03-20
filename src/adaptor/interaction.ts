class MessageEditor {
	#audio: Blob | null = null;

	get audio() {
		return this.#audio;
	}

	setAudio(blob: Blob | null = null) {
		this.#audio = blob;

		return this;
	}

	#text: string | null = null;

	get text() {
		return this.#text;
	}

	setText(value: string | null = null) {
		this.#text = value;

		return this;
	}

	#recording = false;
	#reserved = false;
	#recorder: MediaRecorder | null = null;

	async startRecord() {
		if (this.#recording) {
			throw new Error('It is recording.');
		}

		this.#recording = true;

		const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
		const recorder = this.#recorder = new MediaRecorder(stream);

		console.log(stream);

		recorder.addEventListener('stop', e => {
			if (!this.#reserved) {
				return;
			}

			e;
		});

		recorder.start();

		return this;
	}

	stopRecord(reserved: boolean = false) {
		if (!this.#recording || !this.#recorder) {
			throw new Error('No any recording.');
		}

		this.#recording = false;
		this.#reserved = reserved;
		this.#recorder.stop();
		this.#recorder = null;

		return this;
	}

	send() {

	}
}

export class Dialog {
	constructor() {
		if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
			throw new Error('getUserMedia not supported on your browser!');
		}
	}

	messageList: MessageEditor[] = [];

	input() {
		const message = new MessageEditor();

		this.messageList.push(message);

		return message;
	}
}
