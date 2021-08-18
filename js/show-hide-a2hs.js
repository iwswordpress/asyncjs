// https://web.dev/get-installed-related-apps/ to see if a native app is installed
// https://web.dev/customize-install/

// Opera shows button but does not work...

// one can see this property in dev tools...
// It is in Pascal case

// Detect Chrome
let userAgentString = navigator.userAgent;
let chromeAgent = userAgentString.indexOf('Chrome') > -1;

if (chromeAgent) {
   console.log(`%cChrome detected`, 'color:green; font-size:20px');
   document.getElementById('add').style.display = 'block';
   console.log('Can show A2HS');
} else {
   document.getElementById('add').style.display = 'none';
   console.log('NOT showing A2HS');
}

// if it is being installed we want to hide A2HS button
window.addEventListener('appinstalled', evt => {
   console.log('a2hs has been installed - hide A2HS button.');
   document.getElementById('add').style.display = 'none';
});

// we can get mode and hide A2HS button
if (window.matchMedia('(display-mode: standalone)').matches) {
   console.log('display-mode is standalone');
   document.getElementById('add').style.display = 'none';
}
