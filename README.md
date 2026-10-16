# 🌸 Sara's Romantic Proposal Website 💗

A romantic, anime-inspired interactive proposal website created especially for Sara. Built with pure HTML5, CSS3, and Vanilla JavaScript with zero server or backend dependencies.

---

## ✨ Features & Visual Experience

- **Anime-Romance Aesthetic:** Dreamy color palette of soft pinks, gentle purples, deep midnight blues, and warm gold glows.
- **Canvases & Particle Physics:**
  - Floating Sakura (Cherry Blossom) petals with realistic flutter, sway, and organic depth.
  - Twinkling cosmic stardust & shooting stars.
  - Heart confetti and celebration particle fountain upon saying YES!
- **8 Interactive Screens:**
  1. **Secret Password Screen:** Glassmorphic lock card ("A little surprise for someone special..."), customizable password, hint accordion, and playful static-site security note.
  2. **Romantic Welcome Screen:** Animated typewriter text (*"Hey Sara... I've made something special just for you. 💗"*), floating anime avatar, and "Begin Our Story" interaction.
  3. **3D Animated Love Letter:** Interactive envelope with animated flap opening, sliding parchment letter, and handwritten typewriter animation.
  4. **Cute Love Quiz:** 3 fun, romantic questions with instant sweet reactions and a skip option.
  5. **The Proposal Screen:** Glowing proposal headline (*"Sara, would you give me a chance to become someone special in your life? 💖"*), animated YES button that grows, and a NO button that playfully dodges cursor on desktop and remains touch-friendly on mobile.
  6. **YES Celebration:** Heart confetti burst, forever badge, animated 3D heart, and celebration stats.
  7. **Sara's Feelings Form:** 4 heartfelt questions with direct EmailJS integration sending responses straight to `jh4406011@gmail.com` with real validation, loading state, and direct mail fallback.
  8. **Final Starry Sky Screen:** Midnight moon scene, romantic closing reflection, and replay button.
- **Audio Experience:**
  - Plays **Ed Sheeran - "Perfect"** (YouTube: `https://youtu.be/hIvcu6291ik`) automatically in the background once Sara interacts with the website!
  - Includes procedural **Web Audio API Romantic Piano Synthesizer** as an automatic backup.
  - Also supports custom MP3 files placed in `assets/music/romantic-melody.mp3`.
  - Respects browser autoplay policies: music begins politely upon Sara's first interaction.
- **Accessibility & Responsiveness:** Fully responsive from 320px mobile phones to 4K displays; includes `@media (prefers-reduced-motion)` support.

---

## 📁 Project Structure

```text
sara-proposal/
│
├── index.html               # Main website structure & screens
├── style.css                # Anime-romance styling & glassmorphism
├── script.js                # Interactive logic, audio synth, EmailJS
├── assets/
│   ├── music/
│   │   └── README.txt       # Audio guide (or place romantic-melody.mp3 here)
│   └── images/
│       └── favicon.svg      # Glowing sakura heart favicon
└── README.md                # Complete beginner setup & deployment guide
```

---

## 🚀 Beginner Quick-Start: How to Run in VS Code

You don't need Node.js, npm, Python, or command-line tools.

1. **Open the Folder in VS Code:**
   - Launch **Visual Studio Code**.
   - Click **File** > **Open Folder...** (or press `Ctrl+K Ctrl+O`).
   - Select this folder (`e:\sarav2` or `sara-proposal`).
2. **Install Live Server Extension:**
   - On the left sidebar of VS Code, click the **Extensions** icon (or press `Ctrl+Shift+X`).
   - Search for **Live Server** (by *Ritwick Dey*).
   - Click **Install**.
3. **Launch the Website:**
   - Right-click `index.html` in the VS Code file explorer.
   - Click **Open with Live Server**.
   - Your default web browser will open at `http://127.0.0.1:5500/index.html`.
4. **Test the Password:**
   - Type `sara` and click **Unlock My Heart 💖**.

---

## 💌 How the Direct Email API Works (Zero Setup Required!)

The website is **pre-configured with the FormSubmit AJAX REST API** connected to your email: **`jh4406011@gmail.com`**.

### 🌟 Why this is so convenient:
- **No API keys needed:** You don't have to copy or paste complex tokens.
- **No backend or server required:** Works completely from the browser.
- **100% Free:** Unlimited email submissions.
- **Pre-formatted Table:** Sara's responses arrive in your Gmail neatly formatted.

### ⚠️ One-Time Activation (Important):
1. When the feelings form is submitted for the very first time, **FormSubmit** will send a confirmation email to `jh4406011@gmail.com`.
2. Open that email and click the button: **"Activate Form"**.
3. That's it! Every future response will land directly in your inbox instantly.

---

## ⚙️ Optional: Switching to EmailJS

If you prefer using EmailJS with custom email templates:
1. In `script.js`, set `EMAIL_PROVIDER: 'emailjs'`.
2. Follow the steps below to insert your EmailJS keys:

> [!NOTE]
> **Free Tier Limits:** EmailJS provides **200 free emails per month**, which is more than enough for personal proposals.

### Step 1: Create a Free Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/) and click **Sign Up Free**.
2. Sign in with your Google account or email.

### Step 2: Add Your Gmail Service
1. In the EmailJS Dashboard, click **Email Services** on the left menu.
2. Click **Add New Service** and choose **Gmail**.
3. Name it (e.g., `gmail_service`).
4. Click **Connect Account** and grant EmailJS permission to send emails from your address `jh4406011@gmail.com`.
5. Click **Create Service**.
6. Copy your **Service ID** (e.g., `service_abc123`).

### Step 3: Create the Email Template
1. In the EmailJS Dashboard, click **Email Templates** on the left menu.
2. Click **Create New Template**.
3. In the template editor:
   - **Subject:** `New Romantic Response from Sara! 💌`
   - **Content:**
     ```text
     A new response was submitted on Sara's Proposal Website:

     1. First Thought:
     {{first_thought}}

     2. How she feels about you:
     {{feelings}}

     3. What she would like you to be:
     {{future}}

     4. Anything else:
     {{message}}

     Date & Time: {{timestamp}}
     ```
   - In the **Settings** tab on the right side of the template editor, make sure **To Email** is set to:
     `jh4406011@gmail.com`
4. Click **Save**.
5. Copy your **Template ID** (e.g., `template_xyz789`).

### Step 4: Get Your Public Key
1. In the EmailJS Dashboard, click **Account** (bottom-left corner).
2. Under the **API Keys** tab, copy your **Public Key** (e.g., `aBcDeF123456`).

### Step 5: Add Keys to `script.js`
Open `script.js` in VS Code and locate lines 22–27 at the very top:

```javascript
EMAILJS: {
  PUBLIC_KEY: 'YOUR_PUBLIC_KEY_HERE',
  SERVICE_ID: 'YOUR_SERVICE_ID_HERE',
  TEMPLATE_ID: 'YOUR_TEMPLATE_ID_HERE',
},
```

Replace the placeholders with your actual keys and save the file.

> [!IMPORTANT]
> **Security & Spam Protection:**
> - Never hardcode your Gmail password in any JavaScript file. EmailJS uses a restricted browser token (Public Key) so your account password remains completely safe.
> - To prevent anyone else from using your EmailJS Public Key, go to **EmailJS Dashboard > Account > Security** and add your GitHub Pages URL to **Allowed Domains** (e.g. `yourusername.github.io`).

---

## 🎨 How to Customize the Content

All settings are neatly organized at the top of `script.js`:

1. **Change the Password:**
   In `script.js`:
   ```javascript
   SECRET_PASSWORD: 'sara',
   ```
2. **Customize the Love Letter:**
   In `script.js`, edit `LOVE_LETTER_CONTENT`:
   ```javascript
   LOVE_LETTER_CONTENT: `Dear Sara, ...`,
   ```
3. **Customize the Quiz Questions & Reactions:**
   In `script.js`, edit the `QUIZ` array.
4. **Use Your Own Custom Song:**
   - Drop your favorite romantic MP3 into `assets/music/` and name it `romantic-melody.mp3`.
   - The website will automatically play your MP3 instead of the procedural synthesizer!

---

## 🌐 Free Deployment to GitHub Pages

You can host this website online for free using GitHub Pages:

1. **Create a GitHub Account** at [github.com](https://github.com/) (if you don't already have one).
2. **Create a New Repository:**
   - Click the **+** icon in the top right corner and choose **New repository**.
   - Repository name: `for-sara` (or any name you like).
   - Set repository to **Public**.
   - Click **Create repository**.
3. **Upload Files:**
   - On the repository page, click **uploading an existing file**.
   - Drag and drop:
     - `index.html`
     - `style.css`
     - `script.js`
     - `assets/` folder
   - Click **Commit changes**.
4. **Enable GitHub Pages:**
   - In your repository, click **Settings** (gear tab at the top).
   - Click **Pages** on the left navigation menu.
   - Under **Build and deployment > Branch**, select `main` (or `master`) and folder `/ (root)`.
   - Click **Save**.
5. **Get Your Public Link:**
   - Within 1–2 minutes, refresh the Pages tab.
   - Your live link will appear: `https://<your-username>.github.io/for-sara/`.
   - Send this link to Sara! 💗

---

## 💖 Made with Love
Created for Sara with pure anime romance and magic.
