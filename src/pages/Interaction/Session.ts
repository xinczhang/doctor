import { SpeechToText } from 'src/adaptor/InteractionSession';

export class Recorder extends EventTarget {
	audio: Blob | null = null;
	text: string | null = null;

	setAudio(blob: Blob | null = null) {
		this.audio = blob;

		return this;
	}

	setText(value: string | null = null) {
		this.text = value;

		return this;
	}

	#recording = false;
	#reserved = false;
	#recorder: MediaRecorder | null = null;
	#resolve: (value?: unknown) => void = () => {};

	async start() {
		if (this.#recording) {
			throw new Error('It is recording.');
		}

		this.#recording = true;

		const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
		const recorder = (this.#recorder = new MediaRecorder(stream));
		const chunks: Blob[] = [];

		const textSetter = (text: string) => {
			this.setText(text);
			this.dispatchEvent(new Event('text-change'));
		};

		recorder.addEventListener('stop', async () => {
			if (this.#reserved) {
				const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });

				this.setAudio(blob);
				await SpeechToText(blob, textSetter);
			}

			this.#resolve();
			this.end();
		});

		recorder.addEventListener('dataavailable', (event) => {
			chunks.push(event.data);
		});

		recorder.start();
	}

	async stop(reserved: boolean = false) {
		if (!this.#recording) {
			throw new Error('No any recording.');
		}

		this.#reserved = reserved;

		return new Promise((resolve) => {
			if (this.#recorder !== null) {
				this.#recorder.stop();
			}

			this.#resolve = resolve;
			this.#recorder = null;
			this.#recording = false;
		});
	}

	#finished = false;

	end() {
		if (this.#finished) {
			throw new Error('Recorder has been finished.');
		}

		this.dispatchEvent(new Event('finish'));
		this.#finished = true;
	}
}

type Attachment = string | Blob | File;

interface Message {
	who: string;
	sent: boolean;
	audioURL: string;
	text: string;
}

export class Session extends EventTarget {
	#attachments: { [key: string]: Attachment } = {};

	attach(key: string, resource: Attachment) {
		this.#attachments[key] = resource;
	}

	*attachments() {
		for (const key in this.#attachments) {
			yield [this.#attachments[key], key];
		}
	}

	messages: Message[] = [];

	put(sent: boolean, who: string, audioURL: string, text: string) {
		this.messages.push({ sent, who, audioURL, text });
		this.dispatchEvent(new Event('push-message'));
	}

	sent(who: string) {
		const recorder = new Recorder();

		recorder.addEventListener('finish', () => {
			if (recorder.audio === null || recorder.text === null) {
				throw new Error('Recording is NOT finished.');
			}

			console.log(recorder);

			this.put(true, who, URL.createObjectURL(recorder.audio), recorder.text);
		});

		return recorder;
	}

	static supported() {
		return navigator.mediaDevices && navigator.mediaDevices.getUserMedia;
	}
}