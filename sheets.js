//written into google SpreadsheetApp

//1. find unread emails
//2. process unread emails through script
//3. mark emails read

//------------------------------------

//*****Learn Refactoring***** D.R.Y.
// Don't, Repeat, Yourself

function loggedTime(){
  var date = new Date();
  var currentTime = date.getTime();
  return date;

}


var regexPattern = '/\s*[A-Za-z0-9\.\-\/\s, '&']+)(\r?\n)/';
var dataTypeMap = {
  location: 'Location:',
  name: 'Name:',
  prepType: 'Prep Type:',
  grade: 'Current Grade:',
  duration: 'Session Duration:',
  portalId: 'Portal ID:',
  sessionDetails: 'Date & Time of Next Session:',
  request: 'Request Details:',
  sessionAmount: 'Number of Sessions:',
  initials: 'Initials:'

};

function matchUserDataWithContent(content) {
  return function(dataType) {
    var matchedData = content.match(new RegExp(dataTypeMap[dataType] + regexPattern));
    return (matchedData && matchedData[1]) ? matchedData[1].trim() : 'No ' + dataType;
  }
}

function curricRequests(start, dataTypes) {
  var start = start || 0;
  var threads = GmailApp.getInboxThreads(start, 5);
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Test');

  for (var i = 0; i < threads.length; i++) {

    var message = threads[i].getMessages()[0],
        content = message.getPlainBody();

    var matchUserData = matchUserDataWithContent(content);
    var dataTypes = ['location', 'name', 'prepType', 'grade', 'duration', 'portalId', 'sessionDetails', 'request', 'sessionAmount', 'initials'];

    if (content) {
      var dataRow = [loggedTime()];
      dataTypes.map(function(dataType) {
        dataRow.push(matchUserData(dataType));
      });

      sheet.appendRow(dataRow);
    }
    // threads[i].moveToTrash();
  }
};
