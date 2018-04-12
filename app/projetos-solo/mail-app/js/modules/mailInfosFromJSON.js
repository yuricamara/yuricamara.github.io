define(['datesHandling'], function(MdlDatesHandling){
  'use strict';

  var objMailsInfosFromJSON = {

    mailsJSONArray: [],
    getMailInfos: function(i){

      var createdAtInfo = objMailsInfosFromJSON.mailsJSONArray[i].created_at || '';

      this.senderName =   objMailsInfosFromJSON.mailsJSONArray[i].owner || 'me',
      this.subject =      objMailsInfosFromJSON.mailsJSONArray[i].title || '',
      this.mailNumber =   objMailsInfosFromJSON.mailsJSONArray[i].id || 9999,
      this.contentLong =  objMailsInfosFromJSON.mailsJSONArray[i].body || 'empty e-mail',
      this.contentShort = this.contentLong.slice(0,35 - this.subject.length) + '...' || 'empty e-mail',
      this.monthNumber =  MdlDatesHandling.formatDate(createdAtInfo).monthNumber,
      this.monthString =  MdlDatesHandling.formatDate(createdAtInfo).monthShortString,
      this.day =          MdlDatesHandling.formatDate(createdAtInfo).day,
      this.time =         MdlDatesHandling.formatTime(createdAtInfo),
      this.category =     objMailsInfosFromJSON.mailsJSONArray[i].category.replace(/\s/g , '-').toLowerCase();
    },
    JsonLength : function(){
      return objMailsInfosFromJSON.mailsJSONArray.length;
    }
  };

  return objMailsInfosFromJSON;
});
