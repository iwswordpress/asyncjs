const btn = document.getElementById('notifications');
btn.addEventListener('click', requestNotificationPermission);

function requestNotificationPermission() {
	const btn = document.getElementById('notifications');
	Notification.requestPermission(function (result) {
		//default
		if (result == 'granted') {
			console.log('notification permission granted! :)');
			displayConfirmNotification();
			console.log('notification permission granted! :)');
			// disable button to prevent user clicking it.
			btn.disabled = true;
			btn.innerHTML = 'NOTIFICATIONS ENABLED';
			btn.style.display = 'none';
		}
		if (result == 'denied') {
			console.log('notification permission DENIED!');
			btn.disabled = false;
		}
	});
}

function displayConfirmNotification() {
	if ('serviceWorker' in navigator) {
		console.log('displayConfirmation');
		var options = {
			body: '[SW]: Thank you for registering for notifications!',
			icon: './images/wppwa.png',
			image: './images/ndc-pwa-workshp.png',
			dir: 'ltr',
			lang: 'en-US', // BCP 47,
			// vibrate: [100, 50, 200],
			badge: './images/offline.png', // on top bar
		};
		navigator.serviceWorker.ready.then(function (swreg) {
			swreg.showNotification('Notifications confirmed.', options);
		});
	}
}
