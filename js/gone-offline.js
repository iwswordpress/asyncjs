window.addEventListener('load', function () {
   if (navigator.connection) {
      var networkSpeed = navigator.connection.effectiveType.toUpperCase();
      console.log(`%cNetwork Speed is ${networkSpeed}`, 'color:green; font-size:20px');
   }

   function updateOnlineStatus(event) {
      var condition = navigator.onLine ? 'online' : 'offline';

      if (condition === 'offline') {
         console.log('YOU ARE NOW OFFLINE');

         document.body.style.backgroundColor = 'Gainsboro';
         document.getElementById('offline-image').style.display = 'block';
      } else {
         console.log(`%cONLINE with network Speed ${networkSpeed}`, 'color:green; font-size:20px');
         document.body.style.backgroundColor = '#fff';
         document.getElementById('offline-image').style.display = 'none';
      }
   }

   window.addEventListener('online', updateOnlineStatus);
   window.addEventListener('offline', updateOnlineStatus);
});
