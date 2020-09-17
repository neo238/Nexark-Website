// Event listeners

//On Load
window.addEventListener("load", () => {
	console.log("--Ready & Loaded!--");
});

//Start up the chat.
function startChat() {
	setTimeout(() => {
		const socket = io('https://nexark.bob8552.repl.co/');
		const messageContainer = document.getElementById('message-container');
		const messageForm = document.getElementById('send-container');
		const messageInput = document.getElementById('message-input');

		const name = prompt('Please enter your desired username');
		appendMessage('You joined');
		socket.emit('new-user', name);

		socket.on('chat-message', data => {
			appendMessage(`[${data.name}]: ${data.message}`);
		});

		socket.on('user-connected', name => {
			appendMessage(`[${name || "Unknown User"}] connected, say hi!`);
		});

		socket.on('user-disconnected', name => {
			appendMessage(`[${name || "Unknown User"}] has disconnected.`);
		});

		messageForm.addEventListener('submit', e => {
			e.preventDefault();
			const message = messageInput.value;
			if (message === "" || message === " ") return appendMessage("[SYSTEM]: You cannot send an empty message!");
			appendMessage(`[${name} (You)]: ${message}`);
			socket.emit('send-chat-message', message);
			messageInput.value = '';
		});

		function appendMessage(message) {
			const messageElement = document.createElement('div');
			messageElement.innerText = message;
			messageContainer.append(messageElement);
		}
	}, 50);
};