function checkBrowser() {
   console.log('Checking browser...');
   // Get the user-agent string

   // Detect Chrome
   let chromeAgent = userAgentString.indexOf('Chrome') > -1;

   // Detect Internet Explorer
   let IExplorerAgent = userAgentString.indexOf('MSIE') > -1 || userAgentString.indexOf('rv:') > -1;

   // Detect Firefox
   let firefoxAgent = userAgentString.indexOf('Firefox') > -1;

   // Detect Safari
   let safariAgent = userAgentString.indexOf('Safari') > -1;

   // Discard Safari since it also matches Chrome
   if (chromeAgent && safariAgent) safariAgent = false;

   // Detect Opera
   let operaAgent = userAgentString.indexOf('OP') > -1;

   // Discard Chrome since it also matches Opera
   if (chromeAgent && operaAgent) chromeAgent = false;
   let edgeAgent = false;
   if (navigator.appVersion.indexOf('Edge') != -1) {
      edgeAgent = true;
      document.documentElement.className += ' edge';
   }
   if (window.navigator.userAgent.indexOf('edg') > -1) {
      edgeAgent = true;
   }
   document.querySelector('.output-safari').textContent = safariAgent;
   document.querySelector('.output-edge').textContent = edgeAgent;
   document.querySelector('.output-chrome').textContent = chromeAgent;
   document.querySelector('.output-ie').textContent = IExplorerAgent;
   document.querySelector('.output-opera').textContent = operaAgent;
   document.querySelector('.output-firefox').textContent = firefoxAgent;
}

function demoStylingConsole() {
   console.log('%cThis is a green text', 'color:green');

   console.log('%cThis is a blue text', 'color:blue');

   console.log('%cThis is a yellow text', 'color:purple');

   console.log('%cThis is a red text', 'color:red');
   console.log(
      `  %cThis is a red text with template literals`,
      'font-weight: bold; font-size: 50px;color: red; border: 2px solid red; font-family:"Verdana"',
   );
}
