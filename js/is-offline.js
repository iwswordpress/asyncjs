if (!navigator.onLine) {
    console.log('is-offline', !navigator.onLine);
    document.body.style.backgroundColor = 'Gainsboro';
} else {
    document.body.style.backgroundColor = '#fff';
}
var condition = navigator.onLine ? 'online' : 'offline';

if (condition === 'offline') {
    console.log('YOU ARE NOW OFFLINE');

    document.body.style.backgroundColor = 'Gainsboro';
    document.getElementById('offline-image').style.display = 'block';
} else {
    document.body.style.backgroundColor = '#fff';
    document.getElementById('offline-image').style.display = 'none';
}
