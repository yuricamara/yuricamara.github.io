requirejs.config({
  paths: {
    //Modules
    app: 'modules/app',
    datesHandling: 'modules/datesHandling',
    featureDetection: 'modules/featureDetection',
    mailInfosFromJSON: 'modules/mailInfosFromJSON',
    mailListVisibilty: 'modules/mailListVisibilty',
    mailOpenedControl: 'modules/mailOpenedControl',
    mailCreation: 'modules/mailCreation',
    polyfills: 'modules/polyfills',

    //Templates
    openedMail: 'templates/opened-mail.html',
    shortMail: 'templates/short-mail.html',

    //Plugins
    text:'../vendors/text'
  }
});

require(['app'],function(app){
  'use strict';

  app();
});


