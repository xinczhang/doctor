type TextSetter = (text: string) => void;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function SpeechToText(audioBlob: Blob, setText: TextSetter) {
	// Assuming the Flask endpoint is '/upload_audio'
	const url = 'http://191.96.31.224:8504/upload_audio';

	// Create a FormData object and append the audio blob
	const formData = new FormData();
	formData.append('audioFile', audioBlob, 'recording.webm');
	const headers = new Headers();
	headers.append('Access-Control-Allow-Origin', '*');
	try {
		// Make the POST request to the Flask server
		const response = await fetch(url, {
			method: 'POST',
			body: formData,
			headers: headers,
			// Headers are not needed for FormData; the browser sets the correct multipart/form-data boundary
		});

		// Check if the upload was successful
		if (response.ok) {
			const result = await response.json(); // Assuming the server responds with JSON
			const segments = [];

			for (const word of result.content) {
				const delay = Math.trunc(Math.random() * 200);

				await sleep(delay);
				segments.push(word);
				setText(segments.join(''));
			}
		} else {
			console.error('Upload failed', response.statusText);
			// Handle errors or unsuccessful upload
		}
	} catch (error) {
		console.error('Error during fetch', error);
		// Handle network errors
	}
}

import { Session } from 'src/pages/Interaction/Session';
import mock from './mock.json';

export async function OnSessionCreated(session: Session) {
	for (const { sent, who, text } of mock) {
		session.put(sent, who, 'http://example.com', text);
	}

	session.addEventListener('sending', () => session.lock());

	session.addEventListener('sent', async function reply() {
		session.lock();

		const recorder = session.receive('bot');
		const url = 'http://191.96.31.224:8504/generate_response'; // Replace with your actual Flask endpoint
		const data = {
			text: session.messages[session.messages.length - 1].text,
			uid: '1234',
		};

		try {
			const response = await fetch(url, {
				method: 'POST', // or 'PUT'
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data), // convert data to JSON string
			});

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const responseData = await response.json(); // Parse JSON response
			const segments = [];
			console.log(responseData.text);
			for (const word of responseData.text) {
				const delay = Math.trunc(Math.random() * 200);

				await sleep(delay);
				segments.push(word);
				recorder.setText(segments.join(''));
				// 自动播放可以在这里实现成副作用
				// https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement
			}
			recorder.setAudio(new Blob());
			recorder.end();
		} catch (error) {
			console.error('Request failed:', error);
			// Handle errors here
		}

		session.unlock();
	});
}
