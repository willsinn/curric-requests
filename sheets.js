//written into google SpreadsheetApp

//1. link incoming emails to SpreadsheetApp -done
//2. get variables
//3. sort variables
//4. create new row
//5. append variables to spreadsheet
//6. move read emails
//7. set function on timer


function curriculum(start) {

    var start = start || 0;
    var threads = GmailApp.getInboxThreads(start, 5);
    var sheet = SpreadsheetApp.getActiveSpreadsheet();
       SpreadsheetApp.setActiveSpreadsheet(sheet.getSheets()[7]);

    for (var i = 0; i < threads.length; i++) {

      var post,      
          message = threads[i].getMessages()[0],
          content = message.getPlainBody();

      if (content) {

        post = content.match(/Name:\s*([A-Za-z0-9\s]+)(\r?\n)/);
        var username = (post && post[1]) ? post[1].trim() : 'No username';

        post = content.match(/Email:\s*([A-Za-z0-9@.]+)/);
        var email = (post && post[1]) ? post[1].trim() : 'No email';

        post = content.match(/Subject:\s*([A-Za-z0-9\s]+)(\r?\n)/);
        var subject = (post && post[1]) ? post[1].trim() : 'No subject';

        post = content.match(/Comments:\s*([\s\S]+)/);
        var comment = (post && post[1]) ? post[1] : 'No comment';

        sheet.appendRow([username, email, subject, comment]);

      }
      threads[i].moveToSpam();
    }
  };








function processInboxToSheet() {

  var start = start || 0;
  var threads = GmailApp.getInboxThreads(start, 5);
  var sheet = SpreadsheetApp.getActiveSheet();


  for (var i = 0; i < threads.length; i++) {

      var tmp,
        message = threads[i].getMessages()[0],
        subject = message.getSubject(),
        content = message.getPlainBody();

    if (content) {

      tmp = content.match(/Name:\s*([A-Za-z0-9\s]+)(\r?\n)/);
      var username = (tmp && tmp[1]) ? tmp[1].trim() : 'No username';

      tmp = content.match(/Email:\s*([A-Za-z0-9@.]+)/);
      var email = (tmp && tmp[1]) ? tmp[1].trim() : 'No email';

      tmp = content.match(/Subject:\s*([A-Za-z0-9\s]+)(\r?\n)/);
      var subject = (tmp && tmp[1]) ? tmp[1].trim() : 'No subject';

      tmp = content.match(/Comments:\s*([\s\S]+)/);
      var comment = (tmp && tmp[1]) ? tmp[1] : 'No comment';

      sheet.appendRow([username, email, subject, comment]);

    }
    GmailApp.moveThreadToSpam(threads);
  }
};












function parseEmailMessages(start) {

  start = start || 0;

  var threads = GmailApp.getInboxThreads(start, 100);
  var sheet = SpreadsheetApp.getActiveSheet();

  for (var i = 0; i < threads.length; i++) {

  // Get the first email message of a threads
    var tmp,
      message = threads[i].getMessages()[0],
      subject = message.getSubject(),
      content = message.getPlainBody();

    // Get the plain text body of the email message
    // You may also use getRawContent() for parsing HTML

    // Implement Parsing rules using regular expressions
    if (content) {

      tmp = content.match(/Name:\s*([A-Za-z0-9\s]+)(\r?\n)/);
      var username = (tmp && tmp[1]) ? tmp[1].trim() : 'No username';

      tmp = content.match(/Email:\s*([A-Za-z0-9@.]+)/);
      var email = (tmp && tmp[1]) ? tmp[1].trim() : 'No email';

      tmp = content.match(/Comments:\s*([\s\S]+)/);
      var comment = (tmp && tmp[1]) ? tmp[1] : 'No comment';

      sheet.appendRow([username, email, subject, comment]);

    } // End if

  } // End for loop
}





function storeValues (){

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName ("Sheet 1");

    var label = GmailApp.getUserLabelBy("MyLabel");
    var threads = label.getThreads();

    for (var i=0; i<threads.length; i++)
    {
      var details = threads[i].getDetails();

      for (var j=0; j<details.length; j++)
      {
        var nam = details[j].getPlainName();
        var dat = details[j].getPlainDate();

        ss.appendRow([nam, dat])
      }
      threads[i].removeLabel(label);
    }
}
