type STTAdaptor = (recorder: Recorder) => unknown;

export class Recorder extends EventTarget {
	adaptor: STTAdaptor = () => {};

	constructor(adaptor: STTAdaptor) {
		super();
		this.adaptor = adaptor;
	}

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
		const recorder = (this.#recorder = new MediaRecorder(stream));
		const chunks: Blob[] = [];

		recorder.addEventListener('stop', async () => {
			if (this.#reserved) {
				const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });

				this.setAudio(blob);
				await this.adaptor(this);
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

	get finished() {
		return this.#finished;
	}

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
