// Setup Instructions for Google Sheets Integration (READ CAREFULLY TO UPDATE)

// 1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1-lef65W9gSTpjNSg6JhB9pZ_SKM_pV0sqUL-8lpzF40/edit?usp=sharing
// 2. Click on "Extensions" -> "Apps Script" in the top menu.
// 3. Delete ALL existing code in the editor and paste the NEW code below.
// 4. Click the "Save" icon (or File -> Save).
// 5. IMPORTANT: You MUST deploy a new version for the changes to take effect!
// 6. Click "Deploy" -> "Manage deployments"
// 7. Click the pencil (Edit) icon.
// 8. Under "Version", select "New version".
// 9. Click "Deploy".
// 10. You do NOT need a new URL. The same URL will now use the new code.

function doPost(e) {
  // Use a lock to prevent concurrent submissions from multiple devices
  var lock = LockService.getScriptLock();
  lock.waitLock(10000); // wait up to 10 seconds for other submissions

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch(err) {
      return ContentService.createTextOutput(JSON.stringify({"status": "error", "message": "Invalid JSON mapping"}))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Handle Reset Action
    if (data.action === "reset") {
      var lastRow = sheet.getLastRow();
      if (lastRow > 1) {
        // Delete all rows except header
        sheet.deleteRows(2, lastRow - 1);
      }
      return ContentService.createTextOutput(JSON.stringify({ "status": "reset_success" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Handle Submit Action
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp", "Team Number", "Problem Statement ID", 
        "P1 Name", "P1 Reg Number", "P2 Name", "P2 Reg Number", 
        "P3 Name", "P3 Reg Number", "P4 Name", "P4 Reg Number"
      ]);
    }
    
    // Check if the problem statement is already taken by someone else
    var newStatement = data.selectedProblemStatement;
    var lastRow = sheet.getLastRow();
    if (lastRow > 1 && newStatement) {
      var takenValues = sheet.getRange(2, 3, lastRow - 1, 1).getValues();
      for (var i = 0; i < takenValues.length; i++) {
        if (takenValues[i][0] && takenValues[i][0].toString() === newStatement.toString()) {
          return ContentService.createTextOutput(JSON.stringify({ "status": "taken_error", "message": "Already taken" }))
            .setMimeType(ContentService.MimeType.JSON);
        }
      }
    }
    
    sheet.appendRow([
      new Date(), data.teamNumber, data.selectedProblemStatement,
      data.participant1Name, data.participant1RegisterNumber,
      data.participant2Name, data.participant2RegisterNumber,
      data.participant3Name || "", data.participant3RegisterNumber || "",
      data.participant4Name || "", data.participant4RegisterNumber || ""
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ "status": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch(err) {
    return ContentService.createTextOutput(JSON.stringify({ "status": "error", "message": err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// GET request returns the list of taken problem statement IDs
function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var lastRow = sheet.getLastRow();

  var takenIds = [];
  if (lastRow > 1) {
    // Get all values from Column 3 (Problem Statement ID), skipping the header (row 1)
    var values = sheet.getRange(2, 3, lastRow - 1, 1).getValues();
    for (var i = 0; i < values.length; i++) {
      if (values[i][0]) {
        takenIds.push(values[i][0].toString());
      }
    }
  }

  return ContentService.createTextOutput(JSON.stringify({ "taken": takenIds }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doOptions(e) {
  return ContentService.createTextOutput("").setMimeType(ContentService.MimeType.TEXT);
}
