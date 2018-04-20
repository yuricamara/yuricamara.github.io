/**
 * Show/hide mails list after the selection of a label on the side panel.
 * @returns {Object} showOnly(): add a click listener to the labels on side panel to show/hide mails of the mail list.
 *                   showAll(): show the mais of the mail list.
 */

define(function(){

  var objMailListVisibilty = {

    elsShortMailList: document.getElementsByClassName('js-short-mail'),

    elLabel: function(label){
      return document.getElementById('label-' + label);
    },

    elsLabels: document.getElementsByClassName('js-labels'),

    showOnlyMatchingLabel: function(label){

      var elsShortMailList = objMailListVisibilty.elsShortMailList,
          hasMailWithLabel = false,
          i,
          l;

      for(i = 0, l = elsShortMailList.length; i < l ; i++){
        //Label value of the mail
        var valueDataLabelAttr = elsShortMailList[i].getAttribute('data-label');

        if(valueDataLabelAttr !== (label)){
          //Case mail doens´t have the selected label value
          elsShortMailList[i]
            .setAttribute('hidden','');
        }else{
          //Case mail has the selected label value
          elsShortMailList[i]
            .removeAttribute('hidden');
          hasMailWithLabel = true;
        }
      }

      return hasMailWithLabel;
    },

    showAll: function(){
      var elsShortMailList = objMailListVisibilty.elsShortMailList,
          elZeroMails = document.getElementById('mail-list-zero-mails'),
          i = 0,
          l = 0;

      elZeroMails
        .setAttribute('hidden','');

      for(i = 0, l = elsShortMailList.length; i < l ; i++){
        elsShortMailList[i]
          .removeAttribute('hidden');
      }
    },

    showMessageNone: function(hasMailWithLabel,label){
      var elZeroMails = document.getElementById('mail-list-zero-mails');

      if(!hasMailWithLabel){
        elZeroMails
          .removeAttribute('hidden');
        elZeroMails
          .className = '';
        elZeroMails
          .className = 'm-mail-list_zero-mails' + ' th-label-' + label + '-pe';
      }else{
        elZeroMails
          .setAttribute('hidden','');
      }
    },

    setAttrToLabelSelected: function(elsLabels, elLabel){
      var i,
          l;

      for(i = 0, l = elsLabels.length; i < l; i++){
        elsLabels[i]
          .removeAttribute('data-selected');
      }

      elLabel
        .setAttribute('data-selected','');
    }

  };

  return function(label){

    //A label el of the side panel
    var elLabel = objMailListVisibilty.elLabel(label),
        //All the labels els of the side panel
        elsLabels = objMailListVisibilty.elsLabels;

    elLabel.addEventListener('click',function(){
      if(elLabel.hasAttribute('data-selected')){
        //Show all the mail list
        objMailListVisibilty
          .showAll();

        elLabel
          .removeAttribute('data-selected');
      }else{
        var hasMailWithLabel = objMailListVisibilty.showOnlyMatchingLabel(label);

        objMailListVisibilty
          .setAttrToLabelSelected(elsLabels, elLabel);
        objMailListVisibilty
          .showMessageNone(hasMailWithLabel, label);
      }
    });
  };
});
