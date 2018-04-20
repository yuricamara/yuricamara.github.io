define(function(){

  var objFeatureDetection = {
    svg : function(){
        if (!!document.createElementNS && !! document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect) {
          return true;
        }else {
          return false;
        }
    },
    matchMedia : function(){
      if(!window.matchMedia){
        return true;
      }else{
        return false;
      }
    }
  };

  return objFeatureDetection;

});
