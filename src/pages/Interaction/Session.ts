import { OnSessionCreated, SpeechToText } from 'src/adaptor/InteractionSession';

export class Recorder extends EventTarget {
	audio: Blob | null = null;
	text: string | null = null;

	setAudio(blob: Blob | null = null) {
		this.audio = blob;

		return this;
	}

	setText(value: string | null = null) {
		this.text = value;
		this.dispatchEvent(new Event('text-change'));

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
		const recorder = (this.#recorder = new MediaRecorder(stream, {
			mimeType: 'audio/webm',
		}));
		const chunks: Blob[] = [];

		const textSetter = (text: string) => {
			this.setText(text);
		};

		recorder.addEventListener('stop', async () => {
			if (this.#reserved) {
				const blob = new Blob(chunks, { type: 'audio/webm' });

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

		if (this.audio === null || this.text === null) {
			throw new Error('Recording is incomplete.');
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

export class MessageEvent extends Event {
	message: Message | null = null;
}

export class RecorderEvent extends Event {
	recorder: Recorder | null = null;
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
		const message = { sent, who, audioURL, text };
		const pushMessageEvent = new MessageEvent('push-message');

		pushMessageEvent.message = message;
		this.messages.push(message);
		this.dispatchEvent(pushMessageEvent);

		const directionEvent = new MessageEvent(sent ? 'sent' : 'received');

		directionEvent.message = message;
		this.dispatchEvent(directionEvent);
	}

	receive(who: string) {
		const event = new RecorderEvent('receiving');
		const recorder = (event.recorder = new Recorder());

		recorder.addEventListener('finish', () => {
			this.put(false, who, URL.createObjectURL(recorder.audio), recorder.text);
		});

		this.dispatchEvent(event);

		return recorder;
	}

	sent(who: string) {
		const event = new RecorderEvent('sending');
		const recorder = (event.recorder = new Recorder());

		this.dispatchEvent(event);

		recorder.addEventListener('finish', () => {
			this.put(true, who, URL.createObjectURL(recorder.audio), recorder.text);
		});

		return recorder;
	}

	#locking = false;

	get locking() {
		return this.#locking;
	}

	lock() {
		if (!this.#locking) {
			this.#locking = true;
			this.dispatchEvent(new Event('lock-change'));
		}
	}

	unlock() {
		if (this.#locking) {
			this.#locking = false;
			this.dispatchEvent(new Event('lock-change'));
		}
	}

	constructor() {
		super();
		OnSessionCreated(this);
	}

	static supported() {
		return navigator.mediaDevices && navigator.mediaDevices.getUserMedia;
	}
}
