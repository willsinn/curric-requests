/*
Script Aim: designed to remove Curriculum-Requests and reduce human error: specifically forgetting to submit Curriculum Requests
Script Function: Runs on set timer recording vital Student-Specific information from Email-TEMPLATE sent by ACCOUNT MANAGERS during Registration
ACCOUNT MANAGER EMAIL TEMPLATE LOCATED IN README!!!
*/

/*
 Improvements
------------
1. find unread emails
2. process unread emails through script
3. mark emails read



 Bugs
------
*/


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

var patternTypes = {
  location: /Location:\s*([A-Za-z0-9\.,\-\/\s'&']+)(\r?\n)/,
  name: /Name:\s*([A-Za-z0-9\.,\-\/&\s'&']+)(\r?\n)/,
  portalId: /Portal ID:\s*([0-9\s]+)(\r?\n)/,
  prepType: /Prep Type:\s*([A-Za-z0-9\.,\-\/\s'&']+)(\r?\n)/,
  grade: /Current Grade:\s*([A-Za-z0-9\.,\-\/\s]+)(\r?\n)/,
  duration: /Session Duration:\s*([A-Za-z0-9\.,\-\/\s]+)(\r?\n)/,
  sessionDetails: /Date & Time of Next Session:\s*([A-Za-z0-9\.,\-\/\s'&']+)(\r?\n)/,
  sessionAmount: /Number of Sessions:\s*([A-Za-z0-9\,.\-\/\s]+)(\r?\n)/,
  request: /Request Details:\s*([A-Za-z0-9\.,'"\-\/\s]+)(\r?\n)/,
  initials: /Initials:\s*([A-Za-z\,.\-\/]+)/

};

var inputString = "
Location: New York, NY,\n
Name: Rob,
"

var listOfInput = inputString.split("\n") // ["Location: New York, NY", "Name: Rob"]

listOfInput.map((string) => {
  // string.replace('Location: ', ''); // New York, NY
  string.indexOf(':') // 13
  string.splice(13, string.length).trim();
});





function matchUserDataWithContent(content) {
  return function(dataType) {
    var matchedData = content.match(patternTypes[dataType]);
    return (matchedData && matchedData[1]) ? matchedData[1].trim() : 'No-Input, Contact A.M.';
  }
}
function curricRequests(start, dataTypes) {  //Main function
  var start = start || 0;
  var threads = GmailApp.getInboxThreads(0, 5); //Pulls Emails from 1-100: GoogleApps script-runtime max limit: 100threads/call
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Test'); //Find sheet by NAME

  for (var i = 0; i < threads.length; i++) {

    var message = threads[i].getMessages()[0],
        content = message.getPlainBody();

    var matchUserData = matchUserDataWithContent(content);
    var dataTypes = ['location', 'name','portalId', 'prepType', 'grade', 'duration', 'sessionDetails','sessionAmount', 'request', 'initials'];
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


/* How to ADD a DataType:
      1. ADD a dataType variable at the bottom of dataTypeMap formatted: --- dataTypeName: 'dataKeyNameInEmail:', ---
      2. ADD dataTypeName variable at the end of the dataTypes array in curricRequests function formatted: --- 'dataTypeName' --- */
