define([
  'text!shortMail',
  'text!openedMail',
  'mailInfosFromJSON'
],function(shortMailTpl, openedMailTpl, MdlMailInfosFromJson){
  'use strict';

  var objMailCreation =  {

    parseTemplate: function(mailTpl, mailInfos, hasTime){
      var tplParsed = '';

      if(hasTime){
        mailTpl = mailTpl
          .replace('({%=time%})', mailInfos.time);
      }

      tplParsed = mailTpl
        .replace(/\({%=mail_number%}\)/g, mailInfos.mailNumber)
        .replace(/\({%=sender_name%}\)/g, mailInfos.senderName)
        .replace('({%=month_number%})', mailInfos.monthNumber)
        .replace('({%=month_string%})', mailInfos.monthString)
        .replace(/\({%=day%}\)/g, mailInfos.day)
        .replace(/\({%=category%}\)/g,mailInfos.category)

      //Biggest strings
        .replace(/\({%=subject%}\)/g, mailInfos.subject)
        .replace('({%=content_short%})', mailInfos.contentShort)
        .replace('({%=content_long%})', mailInfos.contentLong)
      ;


      return tplParsed;
    },

    createShortMails : function(){

      var l = MdlMailInfosFromJson.JsonLength(),
          i = 0,
          shortMailTplStrParsed = "",
          shortMailStr = "";

      for(i, l; i < l; i++){

        var mailInfos = new MdlMailInfosFromJson.getMailInfos(i);

        shortMailTplStrParsed = objMailCreation.parseTemplate(shortMailTpl, mailInfos);

        shortMailStr += shortMailTplStrParsed;
      }

      return shortMailStr;
    },
    createLongMail: function(mailNumber){
      var i = mailNumber - 1,
          mailInfos = new MdlMailInfosFromJson.getMailInfos(i);

      return objMailCreation.parseTemplate(openedMailTpl, mailInfos, true);
    }
  };

  return objMailCreation;

});
