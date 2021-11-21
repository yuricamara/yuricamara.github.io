(function () {
  var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
  var isIEtill10 = navigator.userAgent && navigator.userAgent.indexOf('MSIE') !== -1;

  if(isIEtill10 || isIE11){
    // Exibe aviso que está usando IE
    // ******************************************
    document.getElementById('ie')
      .setAttribute('style', 'display:block');
  }
})();


