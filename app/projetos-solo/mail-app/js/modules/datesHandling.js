/**
 * Receive a date in dd/mm format and returns the month number, the
 * month string (mmm format) and the day as object properties.
 * @returns {Function}  A function which returns the date informations.
 */

define(function(){

  var months = {
    '01': 'Jan',
    '02': 'Feb',
    '03': 'Mar',
    '04': 'Apr',
    '05': 'May',
    '06': 'Jun',
    '07': 'Jul',
    '08': 'Aug',
    '09': 'Sep',
    '10': 'Oct',
    '11': 'Nov',
    '12': 'Dec'
  };

  /**
   * Receive a date in dd/mm format and returns the month number,
   * month string (mmm format) and the day.
   * @param   {String} unformattedDate A date starting with dd/mm numeric format.
   * @returns {Object} Month number, month string (mmm format) and day as object properties.
   */

  var format = {
    formatDate : function(unformattedDate){
      var dateValuesArray = unformattedDate.match(/(\d{2})\/(\d{2})/);

      if(dateValuesArray !== null){
        return {
          monthNumber : dateValuesArray[2],
          monthShortString: months[dateValuesArray[2]],
          day :  dateValuesArray[1]
        };
      }else{
        return {};
      }
    },
    formatTime : function(unformattedDate){
       var timeValuesArray = unformattedDate.match(/(\d{2}):\d{2}/),
            time = timeValuesArray[0],
            timeHour = timeValuesArray[1];

        if(timeHour >= 12){
          return time + ' PM';
        }else{
          return time + ' AM';
        }
    }
  }

  return format;
});
