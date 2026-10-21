# 🏆 SyllableX - Master the Rhythm of Language

An interactive, high-energy technical syllable arranging quiz game built for students and language learners. Players unscramble and arrange technical computer science and engineering terminology syllables under time pressure.

![SyllableX Preview](https://img.shields.io/badge/Netlify-Deployed-00C7B7?style=flat&logo=netlify) ![License](https://img.shields.io/badge/License-MIT-blue)

---

## ⚡ Features

- **20 Dynamic Tech Challenges**: From 2-syllable basics like *DATABASE* and *FIRMWARE* up to 4-syllable advanced concepts like *ARTIFICIAL*, *INTELLIGENCE*, and *INFRASTRUCTURE*.
- **Interactive Drag & Drop / Click Sequencing**: Click or drag syllable tiles seamlessly to construct words.
- **Synthesized Web Audio Sound Effects**: Zero-dependency Web Audio synthesizer for crisp pops, success chimes, and alert sounds.
- **Netlify-Ready**: Fully static, responsive layout with `index.html` configured for seamless root URL routing.
- **Classroom Live Leaderboard (Google Sheets Cloud Database)**:
  - Real-time shared scoreboard across **30+ students** simultaneously.
  - Automatically deduplicates and retains the highest score & shortest time per student.
  - Connects to Google Sheets via Google Apps Script (100% free, no credit card or account needed for students).
  - Built-in `This Device` offline fallback mode with browser `localStorage`.

---

## 🚀 Live Classroom Leaderboard Setup (2 Minutes)

To enable the shared online leaderboard across all 30+ students:

1. Open [Google Sheets](https://sheets.google.com) and create a **New spreadsheet** named `SyllableX Quiz Leaderboard`.
2. Click **Extensions** > **Apps Script**.
3. Copy and paste the contents of [`google-apps-script.js`](./google-apps-script.js).
4. Click **Deploy** > **New deployment** > Select **Web app**.
   - **Execute as**: `Me`
   - **Who has access**: **`Anyone`** *(Required so students can submit scores without logging into Google)*
5. Copy the generated **Web app URL** (`https://script.google.com/macros/s/.../exec`).
6. In the game:
   - Click **Leaderboard** in the navigation bar.
   - Click **Connect Sheet** (gear icon).
   - Paste the Web App URL and click **Save & Sync**.

For detailed instructions with troubleshooting, see [`GOOGLE_SHEET_SETUP_GUIDE.md`](./GOOGLE_SHEET_SETUP_GUIDE.md).

---

## 📁 Repository Structure

```text
├── index.html                   # Main entry point for Netlify deployment
├── Tech Syllable Arranger.html   # Standalone HTML game application
├── google-apps-script.js        # Backend API script for Google Sheets cloud sync
├── GOOGLE_SHEET_SETUP_GUIDE.md  # Step-by-step setup walkthrough
└── README.md                    # Project overview & documentation
```

---

## 🌐 Deploying to Netlify

1. Connect this GitHub repository directly to [Netlify](https://app.netlify.com).
2. Set build command: *(Leave blank)*.
3. Set publish directory: `.` (root directory).
4. Deploy! Your site will be live instantly at `https://[your-site-name].netlify.app`.