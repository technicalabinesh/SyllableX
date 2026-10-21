/**
 * =======================================================================
 * SYLLABLEX CLASSROOM LEADERBOARD - GOOGLE APPS SCRIPT BACKEND
 * =======================================================================
 * 
 * This script turns your Google Sheet into a free, live, real-time
 * cloud database for all 30+ students playing your Netlify web app!
 * 
 * QUICK SETUP (2 MINUTES):
 * 1. Go to Google Sheets (https://sheets.google.com) and create a NEW spreadsheet.
 * 2. Title it: "SyllableX Quiz Leaderboard".
 * 3. In the top menu, click: Extensions -> Apps Script.
 * 4. Erase all existing code in the editor, and PASTE this entire file.
 * 5. Click the "Save" icon (or Ctrl+S / Cmd+S).
 * 6. Click the blue "Deploy" button (top-right) -> "New deployment".
 * 7. Click the Gear icon next to "Select type" -> select "Web app".
 * 8. Set the following EXACT settings:
 *    - Description: "SyllableX Leaderboard"
 *    - Execute as: "Me" (your email)
 *    - Who has access: "Anyone"  <-- CRITICAL: Must be "Anyone" so students can submit without logging in!
 * 9. Click "Deploy". (Google may ask you to Authorize / Review Permissions - click Advanced -> Go to SyllableX (unsafe) -> Allow).
 * 10. COPY the "Web app URL" (it starts with https://script.google.com/macros/s/...)
 * 11. Paste that URL into the game (either via the "⚙️ Connect Database" button on the leaderboard, or inside the HTML file)!
 */

// Initialize or get the active sheet with headers
function setupSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Timestamp", "Student Name", "Score", "Time (MM:SS)", "Seconds Elapsed", "Date"]);
    var headerRange = sheet.getRange(1, 1, 1, 6);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#0c383b");
    headerRange.setFontColor("#ffffff");
    headerRange.setHorizontalAlignment("center");
    sheet.setFrozenRows(1);
    
    // Auto-fit column widths
    sheet.setColumnWidth(1, 170); // Timestamp
    sheet.setColumnWidth(2, 200); // Student Name
    sheet.setColumnWidth(3, 100); // Score
    sheet.setColumnWidth(4, 120); // Time (MM:SS)
    sheet.setColumnWidth(5, 130); // Seconds Elapsed
    sheet.setColumnWidth(6, 120); // Date
  }
  return sheet;
}

// Handles GET requests: Reading the leaderboard OR adding a score via query params
function doGet(e) {
  try {
    var sheet = setupSheet();
    var params = (e && e.parameter) ? e.parameter : {};

    // 1. ADD SCORE (Works seamlessly via GET to avoid any cross-origin preflight issues)
    if (params.action === 'add' || (params.name && params.score !== undefined)) {
      var name = (params.name || "Student").toString().trim().substring(0, 40);
      var score = parseInt(params.score || "0", 10);
      var time = (params.time || "00:00").toString().trim();
      var seconds = parseInt(params.seconds || "0", 10);
      var date = (params.date || new Date().toLocaleDateString()).toString().trim();

      sheet.appendRow([new Date(), name, score, time, seconds, date]);

      return createJsonResponse({
        status: "success",
        message: "Score submitted successfully for " + name
      });
    }

    // 2. FETCH LEADERBOARD (Returns sorted rankings for all students)
    var data = sheet.getDataRange().getValues();
    var rawEntries = [];

    // Skip row 0 (headers)
    for (var i = 1; i < data.length; i++) {
      var row = data[i];
      if (row[1] && row[1].toString().trim() !== "") {
        rawEntries.push({
          name: row[1].toString().trim(),
          score: Number(row[2]) || 0,
          time: row[3] ? row[3].toString().trim() : "00:00",
          seconds: Number(row[4]) || 0,
          date: row[5] ? row[5].toString().trim() : ""
        });
      }
    }

    // Classroom ranking logic:
    // If a student played multiple times, keep their BEST attempt (highest score, lowest time)
    var bestAttempts = {};
    for (var j = 0; j < rawEntries.length; j++) {
      var item = rawEntries[j];
      var key = item.name.toLowerCase().trim();
      if (!bestAttempts[key]) {
        bestAttempts[key] = item;
      } else {
        if (item.score > bestAttempts[key].score ||
           (item.score === bestAttempts[key].score && item.seconds < bestAttempts[key].seconds)) {
          bestAttempts[key] = item;
        }
      }
    }

    var leaderboard = [];
    var keys = Object.keys(bestAttempts);
    for (var k = 0; k < keys.length; k++) {
      leaderboard.push(bestAttempts[keys[k]]);
    }

    // Sort: Highest score first; if tied, lowest time (fewer seconds) first
    leaderboard.sort(function(a, b) {
      if (b.score !== a.score) return b.score - a.score;
      return a.seconds - b.seconds;
    });

    return createJsonResponse({
      status: "success",
      totalStudents: leaderboard.length,
      totalSubmissions: rawEntries.length,
      leaderboard: leaderboard
    });

  } catch (error) {
    return createJsonResponse({
      status: "error",
      message: error.toString()
    });
  }
}

// Handles POST requests: Adding a score via JSON or Form Data
function doPost(e) {
  try {
    var sheet = setupSheet();
    var postData = {};

    if (e && e.postData && e.postData.contents) {
      try {
        postData = JSON.parse(e.postData.contents);
      } catch (jsonErr) {
        postData = (e && e.parameter) ? e.parameter : {};
      }
    } else if (e && e.parameter) {
      postData = e.parameter;
    }

    var name = (postData.name || "Student").toString().trim().substring(0, 40);
    var score = parseInt(postData.score || "0", 10);
    var time = (postData.time || "00:00").toString().trim();
    var seconds = parseInt(postData.seconds || "0", 10);
    var date = (postData.date || new Date().toLocaleDateString()).toString().trim();

    sheet.appendRow([new Date(), name, score, time, seconds, date]);

    return createJsonResponse({
      status: "success",
      message: "Score submitted successfully for " + name
    });

  } catch (error) {
    return createJsonResponse({
      status: "error",
      message: error.toString()
    });
  }
}

// Helper to return clean JSON with proper mime type
function createJsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
