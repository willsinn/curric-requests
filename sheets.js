//written into google spreadsheet

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
