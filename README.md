# KannadaConnect

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![AI](https://img.shields.io/badge/AI-Google_Gemini-4285F4?logo=google&logoColor=white)](https://ai.google.dev/)
[![Web_Speech_API](https://img.shields.io/badge/Audio-Web_Speech_API-174C3C)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> **Say it in Kannada. Understand what comes next.**

**KannadaConnect** is an AI-powered, real-world communication assistant tailored for students, relocating professionals, tourists, and newcomers navigating Karnataka. 

While conventional translators produce static, word-for-word dictionary translations, KannadaConnect is designed specifically for **real-world spoken interactions**:
- Inquiring with BMTC or KSRTC bus conductors about routes and stops
- Requesting auto drivers to run by the meter
- Ordering meals and filter coffee with custom preferences in local Darshinis
- Inquiring about vegetable prices and paying via UPI QR codes
- Explaining medical symptoms and requesting prescription items at pharmacies
- Politely communicating that you are learning Kannada and asking locals to speak slowly

---

## 🌟 The Core Experience: *Describe → Translate → Show → Understand*

1. **Describe in English (Text or Voice)**: Speak or type what you need naturally without needing prior mastery of complex grammatical rules.
2. **Translate to Authentic Kannada**: Generates contextually accurate Kannada script (`Noto Sans Kannada`), phonetic Romanized transliteration, cadence guides, and literal English meanings.
3. **Show in Full Screen**: Launch the high-contrast, distraction-free **Show Mode** featuring oversized typography engineered for legibility across counters or crowded transit environments in daylight or at night.
4. **Understand What Comes Next**: Accurately anticipates plausible responses the other person might say back in Kannada, complete with English meanings and pronunciation audio.

---

## 🎯 Key Features

### 1. Smart Show & Say
- **Situational Framing**: Filter or target phrases across specific real-world contexts (*Transport, Food, Shopping, Health, Everyday Conversation*).
- **Curated Example Chips**: Instant one-click prompts for rapid access to high-frequency scenarios.
- **Cultural Etiquette Guidance**: Practical linguistic tips (e.g., respectful suffixes such as *-kodi* and *-ree*, polite gestures, and local customs).
- **Instant Clipboard Action**: Copy Kannada script with real-time feedback.

### 2. Integrated Voice Mode
- **Voice-to-Text Input**: Tap the microphone button to dictate in English using the browser's native Web Speech Recognition. Converts audio to editable text in real time with active waveform indicators and manual stop controls.
- **Kannada Voice Output**: Dedicated audio playback utilizing browser SpeechSynthesis with automatic Kannada voice detection (`kn-IN`).
- **Graceful Audio Degradation**: If native Kannada audio synthesis is not installed on the user's operating system, the interface automatically presents clear notices and prioritizes the phonetic guide and Show Mode.
- **Privacy-Preserving**: Speech recognition operates entirely in the browser client without relaying audio files to third-party servers.

### 3. Predictive Reply Suggestions ("What they might say")
- Accompanying each generated sentence is a curated set of up to three likely responses a local speaker might provide.
- Every response includes authentic Kannada script, phonetic pronunciation, English meaning, and independent audio pronunciation.

### 4. Distraction-Free High-Contrast Show Mode
- Minimalist presentation overlay designed for showing directly to another person.
- Instant toggle between **Daylight Warm Ivory** and **OLED High-Contrast Dark** modes.
- Distant visibility optimized for outdoor markets, noisy bus terminals, and dim environments.
- Full keyboard accessibility (`Escape` key to dismiss).

### 5. Situation Phrasebook & Multi-Field Search
- Comprehensive offline repository of reviewed phrases across five core categories:
  - 🚌 **Transport & Directions**
  - ☕ **Food & Restaurants**
  - 🛍️ **Shopping & Payments (UPI)**
  - 💊 **Health & Pharmacy**
  - 💬 **Everyday Conversations**
- Real-time search indexing English meanings, Kannada script, and Romanized transliteration.

### 6. Offline Saved Phrases
- Local bookmarking system enabling immediate offline access to critical phrases.
- Backed by persistent browser `localStorage` with zero account registration or telemetry required.

### 7. Dual Engine Architecture (AI + Resilient Local Fallback)
- Connects securely to Google's Gemini API via serverless backend endpoints.
- If an API key is not configured or network connectivity is unavailable, the application automatically leverages its human-reviewed phrase collection without interrupting the user experience.

---

## 🎨 Visual Identity & Design System

KannadaConnect features a tailored editorial palette inspired by classical South Indian print aesthetics and modern digital utilities:

| Token | Hex Value | Usage |
| :--- | :--- | :--- |
| **Warm Ivory** | `#FAF8F2` | Primary application canvas and paper-like background |
| **Deep Forest Green** | `#174C3C` | Primary interactive elements, brand identity, and focus states |
| **Dark Charcoal** | `#202722` | High-contrast, accessible typography |
| **Muted Sage** | `#DCE8DD` | Soft badge backgrounds, borders, and subtle dividers |
| **Warm Sand** | `#EDE5D6` | Cards, pill surfaces, and secondary input controls |

**Typography**:
- **English UI**: [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans)
- **Kannada Script**: [Noto Sans Kannada](https://fonts.google.com/specimen/Noto+Sans+Kannada)

---

## 🏗️ Architecture & Technology Stack

```
KannadaConnect/
├── api/
│   └── generate.js          # Serverless AI gateway (Gemini API)
├── public/
│   ├── favicon.svg          # Custom Kannada 'ಕ' brand emblem
│   └── ...
├── src/
│   ├── components/
│   │   ├── Header.jsx            # Brand header, tab routing, saved counter, voice status
│   │   ├── IntentInput.jsx       # Voice input, situation pills, expanding textarea
│   │   ├── PhraseResult.jsx      # Kannada script, inline audio, actions, etiquette note
│   │   ├── ReplyList.jsx         # Contextual reply suggestions with audio
│   │   ├── ShowMode.jsx          # Full-screen high-contrast presentation mode
│   │   ├── SituationExplorer.jsx # Searchable situation phrasebook
│   │   ├── SavedPhrases.jsx      # Offline phrase collection
│   │   └── PhraseCard.jsx        # Individual phrase presentation card
│   ├── data/
│   │   └── phrases.js            # Curated, human-reviewed Kannada phrase dataset
│   ├── hooks/
│   │   └── useSpeechRecognition.js # React hook managing Web Speech recognition lifecycle
│   ├── services/
│   │   └── aiService.js          # API client with automatic curated fallback
│   ├── utils/
│   │   ├── speech.js             # SpeechSynthesis with Kannada voice validation
│   │   ├── speechRecognition.js  # Web Speech recognition controller
│   │   └── storage.js            # LocalStorage persistence manager
│   ├── App.jsx                   # Application root and state orchestrator
│   ├── index.css                 # Design system tokens and global styling
│   └── main.jsx
├── .env.example
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

- **Frontend**: React 19, Vite 8, Semantic HTML5, Vanilla CSS Design System
- **Icons**: Lucide React
- **Serverless AI**: Vercel Serverless Function interfacing with Google Gemini (`gemini-2.5-flash` / `gemini-1.5-flash`)
- **Speech Technologies**: Native Web Speech API (`SpeechRecognition` & `SpeechSynthesis`)

---

## 🚀 Quickstart & Local Development

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm

### 1. Clone Repository & Install Dependencies
```bash
git clone https://github.com/anishagrawal25/KannadaConnect.git
cd KannadaConnect
npm install
```

### 2. Environment Configuration (Optional)
To enable live dynamic AI translations, copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Provide your Google Gemini API key:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```
> *Note:* KannadaConnect operates immediately out of the box using its built-in reviewed phrasebook even without an API key configured.

### 3. Start Development Server
```bash
npm run dev
```

Open your browser at:
**[http://localhost:5173](http://localhost:5173)**

---

## 📦 Production Build & Deployment

### Build Locally
```bash
npm run build
npm run preview
```

### Deploy to Vercel
1. Push your repository to GitHub.
2. Import the project into the [Vercel Dashboard](https://vercel.com).
3. Under **Project Settings → Environment Variables**, add:
   - `GEMINI_API_KEY`: Your Google Gemini API key.
4. Deploy. Vercel automatically deploys the frontend and the `/api/generate` serverless endpoint.

---

## 🔒 Security & Privacy

- The `GEMINI_API_KEY` is maintained exclusively server-side in `api/generate.js` and is never exposed in client bundles or public commits.
- Saved phrases are persisted entirely within the user's browser `localStorage`.
- Speech recognition runs locally through standard browser Web Speech interfaces.

---

## 📄 License

MIT License — Copyright (c) 2026 Anisha Agrawal.
