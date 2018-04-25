(function () {
  var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
  var isIEtill10 = navigator.userAgent && navigator.userAgent.indexOf('MSIE') != -1;

  if(isIEtill10 || isIE11){
    console.log('IE Browser Detected');

    // Carrega e executa Polyfill pro SVG Externo
    // ******************************************
    var el = document.createElement('script');
    el.type = 'text/javascript';
    el.src = '/dist/scripts/polyfills/svg4everybody.min.js';
    el.onload = el.onreadystatechange = function() {
      var rs = this.readyState;
      if (rs && rs !== 'complete' && rs !== 'loaded') return;
      svg4everybody();
    };

    var script = document.getElementsByTagName('script')[0];
    script.parentNode.insertBefore(el, script);
  }
})();


