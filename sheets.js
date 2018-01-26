//written into google SpreadsheetApp

//1. link incoming emails to SpreadsheetApp -done
//2. get variables
//3. sort variables
//4. create new row
//5. append variables to spreadsheet
//6. move read emails
//7. set function on timer


//Account Manager Email Template:
//----------------------------------------------------------------
// Location:
// Name:
// Prep Type:
// Current Grade:
// Session Duration:
// Portal ID:
// Date & Time of Next Session:
// Request Details:
// Number of Sessions:
// Initials:

function loggedTime(){
  var date = new Date();
  var currentTime = date.getTime();
}



var time = loggedTime();



function curricRequests(start) {

    var start = start || 0;
    var threads = GmailApp.getInboxThreads(start, 5);
    var sheet = SpreadsheetApp.getActiveSheet();

    // var sheet = SpreadsheetApp.getActiveSpreadsheet();
    //    SpreadsheetApp.setActiveSpreadsheet(sheet.getSheets()[7]);

    for (var i = 0; i < threads.length; i++) {

      var post,
          message = threads[i].getMessages()[0],
          content = message.getPlainBody();

      if (content) {

        post = content.match(/Location:\s*([A-Za-z0-9\.\-\/\s]+)(\r?\n)/);
        var location = (post && post[1]) ? post[1].trim() : 'No Location';

        post = content.match(/Name:\s*([A-Za-z0-9\.\-\/&\s, '&']+)(\r?\n)/);
        var name = (post && post[1]) ? post[1].trim() : 'No Name';

        post = content.match(/Prep Type:\s*([A-Za-z0-9\.\-\/\s]+)(\r?\n)/);
        var prep = (post && post[1]) ? post[1].trim() : 'No Prep Type';

        post = content.match(/Current Grade:\s*([A-Za-z0-9\.\-\/\s]+)(\r?\n)/);
        var grade = (post && post[1]) ? post[1].trim() : 'No Grade';

        post = content.match(/Session Duration:\s*([A-Za-z0-9\.\-\/\s]+)(\r?\n)/);
        var duration = (post && post[1]) ? post[1].trim() : 'No Duration';

        post = content.match(/Portal ID:\s*([0-9\s]+)(\r?\n)/);
        var identify = (post && post[1]) ? post[1].trim() : 'No Portal ID';

        post = content.match(/Date & Time of Next Session:\s*([A-Za-z0-9\.\-\/\s]+)(\r?\n)/);
        var nextSession = (post && post[1]) ? post[1].trim() : 'No Session Details';

        post = content.match(/Request Details:\s*([A-Za-z0-9\.\-\/\s]+)(\r?\n)/);
        var request = (post && post[1]) ? post[1].trim() : 'No Request';

        post = content.match(/Number of Sessions:\s*([A-Za-z0-9\s]+)(\r?\n)/);
        var amount = (post && post[1]) ? post[1] : 'No Session Amount';

        post = content.match(/Initials:\s*([A-Za-z\s]+)\n/);
        var requestee = (post && post[1]) ? post[1].trim() : 'No Initials';




        sheet.appendRow([time, location, name, prep, grade, duration, identify, nextSession, request, amount, requestee]);

      }
      // threads[i].moveToSpam();
    }
  };
