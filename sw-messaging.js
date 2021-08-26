//COMMUNICATION TO AND FROM PAGE/SW
//------------------------------------
// SW => PAGE
function sendMessage(msg) {
	console.log('FN sendMessage');
	self.clients
		.matchAll({
			includeUncontrolled: true,
			type: 'window',
		})
		.then(function (clients) {
			clients.forEach(function (client) {
				console.log(`[SW] sending message to PAGE with ID: ${client.id} - ${msg}`);
				client.postMessage(
					` <div style="font-weight:bold;color:green;margin-left:10px;">${msg}. <br>Your client.id:<br>${client.id}</div>`,
				);
			});
		});
}
// SW => PAGE
function alertPagesUpdate(msg) {
	clients
		.matchAll({
			includeUncontrolled: true,
			type: 'window',
		})
		.then((clients) => {
			clients.forEach((client) => {
				const clientId = client.id;
				const type = client.type;
				const url = client.url;
				client.postMessage(msg);
			});
		});
}

function listenToPageMessage(event) {
	const data = JSON.parse(event.data);
	console.log('');
	console.log('----- SW receiving message from PAGE -----');
	console.log(data);
	console.log('----- SW receiving message from PAGE -----');
	console.log('');
}
