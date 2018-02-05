//written into google SpreadsheetApp

//1. link incoming emails to SpreadsheetApp -done
//2. get variables
//3. sort variables
//4. create new row
//5. append variables to spreadsheet
//6. move read emails
//7. set function on timer

//------------------------------------

//*****Learn Refactoring***** D.R.Y.
// Don't, Repeat, Yourself

function loggedTime(){
  var date = new Date();
  var currentTime = date.getTime();  // Number of ms since Jan 1, 1970
  return date;
}

var regexPattern = /s*/[A-Za-z0-9\.\-\/\s]+)(\r?\n)/;
var dataTypeMap = {
  location: 'Location:',
  name: 'Name:',
  prepType: 'Prep Type:',
}

// var patternTypes = {
//   location: /Location:\s*([A-Za-z0-9\.\-\/\s]+)(\r?\n)/,
//   name: /Name:\s*([A-Za-z0-9\.\-\/&\s, '&']+)(\r?\n)/,
//   prepType: /Prep Type:\s*([A-Za-z0-9\.\-\/\s]+)(\r?\n)/,
//   grade: /Current Grade:\s*([A-Za-z0-9\.\-\/\s]+)(\r?\n)/,
//   duration: /Session Duration:\s*([A-Za-z0-9\.\-\/\s]+)(\r?\n)/,
//   portalId: /Portal ID:\s*([0-9\s]+)(\r?\n)/,
//   sessionDetails: /Date & Time of Next Session:\s*([A-Za-z0-9\.\-\/\s]+)(\r?\n)/,
//   request: /Request Details:\s*([A-Za-z0-9\.\-\/\s]+)(\r?\n)/,
//   sessionAmount: /Number of Sessions:\s*([A-Za-z0-9\s]+)(\r?\n)/,
//   initials: /Initials:\s*([A-Za-z\s]+)\n/
// };

function matchUserDataWithContent(content) {
  return function(dataType) {
    var matchedData = content.match(new RegExp(dataTypeMap[dataType] + regexPattern));
    return (matchedData && matchedData[1]) ? matchedData[1].trim() : 'No ' + dataType;
  }
}

function curricRequests(start, dataTypes) {
  var start = start || 0;
  var threads = GmailApp.getInboxThreads(start, 5);
  var sheet = SpreadsheetApp.getActiveSheet();

  // var sheet = SpreadsheetApp.getActiveSpreadsheet();
  //    SpreadsheetApp.setActiveSpreadsheet(sheet.getSheets()[7]);

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
    // threads[i].moveToSpam();
  }
};


// curricRequests(1, ['location', 'name', 'prepType', 'grade', 'duration', 'portalId', 'sessionDetails', 'request', 'sessionAmount', 'initials']);
//
// curricRequests(1, ['location', 'name']);
