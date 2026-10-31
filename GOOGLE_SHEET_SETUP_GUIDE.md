# 📊 30+ Students Classroom Leaderboard Setup Guide

All **30+ students** playing on their mobile or laptop can see each other on the **live classroom leaderboard**, and all scores will be saved directly into your free **Google Sheet**!

---

### Step 1: Open Google Sheets
1. Go to [sheets.google.com](https://sheets.google.com).
2. Click **+ Blank spreadsheet**.
3. Name it at the top left: `SyllableX Quiz Leaderboard`.

---

### Step 2: Open Apps Script
1. In the Google Sheets top menu, click **Extensions** > **Apps Script**.
2. A new tab will open with code editor.
3. Delete any default code like `function myFunction() { ... }` so the editor is completely empty.

---

### Step 3: Paste the Leaderboard Code
1. Open the file [`google-apps-script.js`](file:///c:/Users/Hari/Desktop/QUIZZ/google-apps-script.js) in your project folder.
2. Copy all code and paste it into the Google Apps Script editor.
3. Click the **Save** icon 💾 (or press `Ctrl + S`).

---

### Step 4: Deploy as a Web App (⚠️ Most Important Step!)
1. At the top right of Apps Script, click the blue **Deploy** button > **New deployment**.
2. Click the gear icon ⚙️ next to "Select type" and choose **Web app**.
3. Fill in the fields:
   - **Description**: `SyllableX Leaderboard`
   - **Execute as**: `Me (your email)`
   - **Who has access**: **`Anyone`** ⚠️ *(Must be "Anyone" so all 30 students can submit without signing into Google)*
4. Click **Deploy**.
5. *If Google asks to Authorize Permissions:*
   - Click **Authorize access**.
   - Choose your Google account.
   - Click **Advanced** (at bottom left).
   - Click **Go to SyllableX (unsafe)**.
   - Click **Allow**.
6. Google will give you a **Web app URL** that looks like:
   ```
   https://script.google.com/macros/s/AKfycbx.../exec
   ```
7. Click **Copy** to copy this URL.

---

### Step 5: Connected Live Google Sheet URL
The game is already connected directly to your active deployment:
```
https://script.google.com/macros/s/AKfycbxGBXTsjhXJ7u9M2GsEHWJd46VOLlJ32UsC0X7Zs9yQhyC_JPDrVSE7fG-ou1lljniG/exec
```
All 30+ students playing will automatically sync their scores here in real time!

