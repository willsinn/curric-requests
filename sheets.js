//Script Aim: designed to remove Curriculum-Requests and reduce human error: specifically forgetting to submit Curriculum Requests
//Script Function: Runs on set timer recording vital Student-Specific information from Email-TEMPLATE sent by ACCOUNT MANAGERS during Registration
//ACCOUNT MANAGER EMAIL TEMPLATE LOCATED IN README!!!
//

//1. find unread emails
//2. process unread emails through script
//3. mark emails read

//      Debugging
//1. debug line 40, need the string to be reposted and not the var!!

//------------------------------------


function hourTrigger() {  //GoogleApps script-runtime limitations: 30 seconds/execution

  scriptApp.newTrigger('curricRequests')
          .timeBased()
          .everyHours(1)
          .create();

}

function loggedTime(){  //Current time of script-runtime, Registrations within the hour of the script
  var date = new Date();
  var currentTime = date.getTime();
  return date;

}

var regexPattern = '/\s*[A-Za-z0-9\.\-\/\s, '&']+)(\r?\n)/'; //Searches for characters of a certain pattern

var dataTypeMap = { //DATA required for building curriculums, THIS IS WHERE YOU WANT TO ADD A DATATYPE
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

function matchUserDataWithContent(content) {  //Matches Keys in Email-threads and returns Student-Specific Data
  return function(dataType) {
    var matchedData = content.match(new RegExp(dataTypeMap[dataType] + regexPattern));
    return (matchedData && matchedData[1]) ? matchedData[1].trim() : 'No ' + dataType;
  }
}

function curricRequests(start, dataTypes) {  //Main function
  var start = start || 0;
  var threads = GmailApp.getInboxThreads(start, 5); //Pulls Emails from 1-100: GoogleApps script-runtime max limit: 100threads/call
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Test'); //Find sheet by NAME

  for (var i = 0; i < threads.length; i++) {

    var message = threads[i].getMessages()[0],
        content = message.getPlainBody();

    var matchUserData = matchUserDataWithContent(content);
    var dataTypes = ['location', 'name', 'prepType', 'grade', 'duration', 'portalId', 'sessionDetails', 'request', 'sessionAmount', 'initials'];
        //DATA required for building curriculums, THIS IS WHERE YOU WANT TO ADD A DATATYPE
    if (content) {
      var dataRow = [loggedTime()]; //Adds current time as a value to Array
      dataTypes.map(function(dataType) {
        dataRow.push(matchUserData(dataType));
      });

      sheet.appendRow(dataRow); //Posts Array in order to Google Spreadsheet
    }
      threads[i].moveToTrash(); //Moves Processed Emails to Trash
  }
};
