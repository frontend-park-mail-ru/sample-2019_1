const ws = new WebSocket('ws://localhost:3000/ws');

function makeNotify(data = 'kek') {
	if (!'Notification' in window) {
		console.error('not not sup');
		return;
	}

	if (Notification.permission === 'granted') {
		new Notification(data);
		return;
	}

	if (Notification.permission !== 'denied') {
		Notification
			.requestPermission()
			.then((permission) => {
				if (permission === 'granted') {
					new Notification(data);
					return;
				}
			})
	}
}

ws.onopen = () => {
	console.log('ws success connect');

	ws.onmessage = (event) => {
		makeNotify(event.data);
	}
}
