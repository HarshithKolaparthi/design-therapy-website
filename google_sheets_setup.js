// Setup Instructions for Google Sheets Integration

// 1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1-lef65W9gSTpjNSg6JhB9pZ_SKM_pV0sqUL-8lpzF40/edit?usp=sharing
// 2. Click on "Extensions" -> "Apps Script" in the top menu.
// 3. Delete any code in the editor and paste the code below.
// 4. Click the "Save" icon (or File -> Save).
// 5. Click the bright blue "Deploy" button at the top right -> "New deployment".
// 6. Click the gear icon next to "Select type" and choose "Web app".
// 7. For "Description", enter "Design Therapy API".
// 8. For "Execute as", select "Me (<your email>)".
// 9. IMPORTANT: For "Who has access", select "Anyone".
// 10. Click "Deploy".
// 11. (Google might ask for authorization. Click "Authorize access", choose your account, click "Advanced", and click "Go to Untitled project (unsafe)").
// 12. Copy the "Web app URL" provides at the end (it ends with /exec).
// 13. Paste that URL back into our chat so I can add it to the website, OR paste it directly into src/config.ts.

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Parse the JSON data sent from the website
  var data = JSON.parse(e.postData.contents);
  
  // If this is the very first time, add headers
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Timestamp",
      "Team Number",
      "Problem Statement ID",
      "P1 Name",
      "P1 Reg Number",
      "P2 Name",
      "P2 Reg Number",
      "P3 Name",
      "P3 Reg Number",
      "P4 Name",
      "P4 Reg Number"
    ]);
  }
  
  // Append the data as a new row
  sheet.appendRow([
    new Date(),
    data.teamNumber,
    data.selectedProblemStatement,
    data.participant1Name,
    data.participant1RegisterNumber,
    data.participant2Name,
    data.participant2RegisterNumber,
    data.participant3Name || "",
    data.participant3RegisterNumber || "",
    data.participant4Name || "",
    data.participant4RegisterNumber || ""
  ]);
  
  // Return a success response
  return ContentService.createTextOutput(JSON.stringify({ "status": "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Ensure CORS handles preflight requests
function doOptions(e) {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT);
}
