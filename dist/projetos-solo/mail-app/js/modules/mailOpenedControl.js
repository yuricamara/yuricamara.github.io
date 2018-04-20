define(['mailCreation','featureDetection','polyfills'],function(mdlMailCreation, mdlFeatureDetection, mdlPolyfills){

  var objMailOpened =  {

    idNumberLastMailCreated: 0,

    hideMail: function(idNumberLastMail){
      var elLastMail = document.getElementById('mail-' + idNumberLastMail);

      if(elLastMail){
        elLastMail.setAttribute('hidden','');
      }
    },

    openCloseMail: function(){
      //MUST be here (feature detection)
      if(mdlFeatureDetection.matchMedia()){
        mdlPolyfills.mediaQuery();
      }

      var desktopSize = window.matchMedia('(min-width:60em)');

      if(!desktopSize.matches){
        return true;
      }

      var elMailClicked = this,
          elMain =document.getElementById('main'),
          mailNumber = this.getAttribute('data-id'),
          idLastShortMailActive = objMailOpened.idNumberLastMailCreated,
          elLastShortMailActive = document.getElementsByClassName('m-short-mail--active')[0],
          elMailExising = document.getElementById('mail-' + mailNumber);

      //Inactive last short mail selected

      if(elLastShortMailActive){
        elLastShortMailActive.className = elLastShortMailActive.className
          .replace(' m-short-mail--active','');
      }

      //Active actual short mail selected

      elMailClicked.className += ' m-short-mail--active';

      //Hide last mail opened

      objMailOpened.hideMail(idLastShortMailActive);

      //Open new mail

      if(!elMailExising){
        var mail = mdlMailCreation.createLongMail(mailNumber);

        elMain.insertAdjacentHTML('beforeend',mail);
      }else{
        elMailExising.removeAttribute('hidden');
      }

      //Cache opened mail number
      objMailOpened.idNumberLastMailCreated = mailNumber;
    },

    addClickListeners : function(){
      var elsMailListItens = document.getElementsByClassName('js-short-mail'),
          l = elsMailListItens.length,
          i = 0;

      for(i,l;i < l; i++){
        elsMailListItens[i].addEventListener('click', objMailOpened.openCloseMail);
      }
    }
  };

  return objMailOpened;

});
