# 📊 2-Minute Google Sheet Setup for SyllableX Classroom Leaderboard

Follow these simple steps so all **30+ students** playing on Netlify appear on the same **live global leaderboard**, and all scores are saved directly into your Google Sheet!

---

### Step 1: Create a New Google Sheet
1. Open [sheets.google.com](https://sheets.google.com) in your web browser.
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
3. Click the **Save** disk icon 💾 (or press `Ctrl + S`).

---

### Step 4: Deploy as a Web App (Important Settings!)
1. At the top right of Apps Script, click the blue **Deploy** button > **New deployment**.
2. Click the gear icon ⚙️ next to "Select type" and choose **Web app**.
3. Fill in the fields:
   - **Description**: `SyllableX Leaderboard`
   - **Execute as**: `Me (your email)`
   - **Who has access**: **`Anyone`** ⚠️ *(CRITICAL: Must choose "Anyone" so all students can submit their scores without needing a Google sign-in)*
4. Click **Deploy**.
5. *If asked to Authorize Permissions:*
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

### Step 5: Connect It to Your Quiz Game
You can connect the URL in **two easy ways**:

#### Method A: Directly in the Web App UI (No Coding Needed!)
1. Open your quiz game in the browser (or on Netlify).
2. Click **Leaderboard** in the top navigation.
3. Click **⚙️ Database Settings** at the bottom of the modal.
4. Paste your Web App URL and click **Save & Connect**.
5. That's it! It will test connection and immediately sync live scores.

#### Method B: Paste into the Code (Permanent for all Netlify users)
Open `index.html` (and `Tech Syllable Arranger.html`), find:
```javascript
const CLOUD_SHEET_URL = "";
```
And replace it with your URL:
```javascript
const CLOUD_SHEET_URL = "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec";
```
Then re-deploy/upload to Netlify!

---

### What You Will See as a Teacher:
In your Google Sheet, as students finish the quiz, new rows will automatically appear in real time:

| Timestamp | Student Name | Score | Time (MM:SS) | Seconds Elapsed | Date |
|-----------|--------------|-------|--------------|-----------------|------|
| 10/21/2026 10:30 AM | Sarah Jenkins | 200 | 02:41 | 161 | 10/21/2026 |
| 10/21/2026 10:32 AM | Liam Patel | 190 | 03:05 | 185 | 10/21/2026 |
| 10/21/2026 10:33 AM | Priya Sharma | 200 | 02:18 | 138 | 10/21/2026 |

On the students' screens:
- The leaderboard automatically ranks all students (Priya #1 with 200 pts in 2m18s, Sarah #2 with 200 pts in 2m41s, Liam #3, etc.)
- A refresh button allows students to check their rank as others submit.
