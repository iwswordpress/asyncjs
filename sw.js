// Version needs to be before importScripts
const version = 31;

importScripts('./sw-util.js');
importScripts('./sw-assets.js');
importScripts('./sw-caching-patterns.js');
importScripts('./sw-messaging.js');
// Add IndexedDB imports
importScripts('./js/idb.js');
importScripts('./js/idb-fn.js');
// SW fires event on install and activate so we listen for them.

// ========== SW EVENTS ==========
// Install a SW but not LIVE.
self.addEventListener('install', loadPrecache);
// Activate SW so it is now LIVE and in controll.
self.addEventListener('activate', activateSW);

//cacheThenNetworkAndStoreThenFallback
self.addEventListener('fetch', cacheElseNetworkAndStoreDynamic);
self.addEventListener('sync', function (event) {
	// 1. Get data from IDB.
	// 2. Send data with fetch.
	// 3. Send Notifications and Message to client.
	// We will do this in the event.waitUntil(submitForm(event));
	// We can also CATCH the lastChance of SyncManager trying to carry out event when back online.
	if (event.tag == 'SEND-CONTACT-FORM') {
		event.waitUntil(submitForm());
	}
});

function submitForm() {
	const rnd = Math.floor(Math.random() * 100);

	// Get datga from IDB
	readAllData('FORM-DATA').then(function (response) {
		console.log('<= [SW] GET FORM DATA =>');
		console.log('FORM-DATA', response[0].data);
		const formData = new FormData();
		formData.append('data', response[0].data);
		// Send off to server - mirrors what is sent
		fetch('https://wp-html.co.uk/api/wp-json/api/v1/mirror', {
			method: 'POST',
			body: formData,
			// use FormData object as it is going to PHP so don't need to add content-type headers
		})
			.then(function (response) {
				console.log('fetch ', response);
				return response.json();
			})
			.then(function (res) {
				console.log('MIRROR = ', res);
				// make some visible change by capitalising it
				const resUpper = res.data.toUpperCase();
				const valid = res.valid;
				// SEND MESSAGE AND NOTIFICTION
				sendMessage(`${rnd} ${resUpper} [SW to PAGE] SUCCESS: ${valid}`);
				title = `${rnd} ${resUpper} SUCCESSFUL: ${valid} `;
				const reply = `${rnd} ${resUpper} Your form has been received whilst you were offline.`;
				options = {
					body: reply,
				};
				console.log('Notification.permision == ', Notification.permission);
				if (Notification.permission == 'granted') {
					self.registration.showNotification(title, options);
					console.log('Notifications sent...');
				}
			});
	});
}
