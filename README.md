# KannadaConnect 

> **Say it in Kannada. Understand what comes next.**

KannadaConnect is an AI-powered, real-world Kannada communication companion designed for students, relocating professionals, tourists, and newcomers across Karnataka.

Unlike generic translators that translate word-for-word without real-world context, **KannadaConnect** is engineered specifically for completing everyday spoken interactions:
- Asking a KSRTC or BMTC conductor if a bus goes to Mysuru
- Negotiating with an auto driver for meter fare
- Ordering two filter coffees with less sugar at a Darshini
- Asking vegetable vendors for prices and scanning UPI QR codes
- Requesting medicine at a pharmacy
- Politely telling locals that you are learning Kannada and asking them to speak slowly

---

## 🌟 The Core Experience: *Describe → Translate → Show → Understand*

1. **Describe in English**: Type what you need naturally without memorizing complex grammatical tables.
2. **Translate to Authentic Kannada**: Produces authentic Kannada script (Noto Sans Kannada), natural phonetic transliteration, pronunciation cadence guides, and English meaning.
3. **Show in Full Screen**: Open high-contrast, distraction-free **Show Mode** with massive typography designed to be readable across a counter or down a bus aisle in daylight or night.
4. **Understand What Comes Next**: Automatically predicts plausible replies you might hear back in Kannada with English meanings, so you are never caught off guard.

---

## 🎯 Key Features

### 1. Smart Show & Say
- Natural language intent translation with situational context (Transport, Food, Shopping, Health, Everyday Conversation).
- Clickable real-life example prompts for immediate one-click testing.
- **Voice Input (Speech Recognition)**: Tap the microphone button to speak your English intent naturally. Browser Web Speech Recognition converts voice to editable text with clear listening indicators and manual stop controls.
- **Kannada Voice Output (Speech Synthesis)**: Dedicated Listen buttons beside the Kannada sentence and toolbar with authentic Kannada voice detection, stop support, and fallback explanations.
- Fast clipboard copy with feedback toast.
- Cultural etiquette tips (e.g. respectful suffixes like *-kodi* and *-ree*, gestures, tipping tips).

### 2. Understand the Reply ("What they might say")
- Plausible situational responses generated alongside the phrase.
- Each reply includes Kannada script, transliteration, English meaning, and dedicated audio playback.
- Clear distinction between possible responses and guaranteed replies.

### 3. Full-Screen High-Contrast Show Mode
- Minimalist, distraction-free display built specifically for showing your screen to another person.
- Sunlight (Ivory) and High-Contrast Night (OLED Charcoal) modes.
- Distant legibility for noisy or crowded bus stands and bazaars.
- Keyboard support (`Escape` key to close).

### 4. Situation Phrasebook Explorer
- Curated collection of human-reviewed Kannada phrases across 5 categories:
  - 🚌 **Transport & Directions**
  - ☕ **Food & Restaurants**
  - 🛍️ **Shopping & Payments (UPI)**
  - 💊 **Health & Pharmacy**
  - 💬 **Everyday Conversations**
- Instant multi-field search across English meanings, Kannada script, and Romanized transliteration.
- One-click Show Mode and Audio pronunciation directly from any phrase card.

### 5. Offline Saved Phrases
- Save and bookmark essential phrases for quick offline retrieval.
- Persisted locally via `localStorage` (no account registration or telemetry required).
- Full management: preview, Show Mode, copy, speak, or delete.

### 6. Resilient Offline & Error Fallback
- If the AI API key is not configured, rate-limited, or offline, KannadaConnect automatically falls back to curated, reviewed phrasebook matches without crashing or showing blank components.
- Clearly distinguishes AI-generated translations from verified human-reviewed phrases.

---

## 🎨 Visual Identity & Design System

KannadaConnect avoids generic SaaS templates in favor of a warm, confident editorial Indian travel aesthetic:

- **Warm Ivory (`#FAF8F2`)**: Primary background, calm and paper-like.
- **Deep Forest Green (`#174C3C`)**: Primary actions, brand accents, and high-contrast emphasis.
- **Dark Charcoal (`#202722`)**: Readable, accessible typography.
- **Muted Sage (`#DCE8DD`)**: Soft badge fills, borders, and subtle dividers.
- **Warm Sand (`#EDE5D6`)**: Input cards, chips, and tactile surfaces.
- **Typography**: Google Fonts **Plus Jakarta Sans** for modern English UI and **Noto Sans Kannada** for authentic Kannada script rendering.

---

## 🛠️ Technology Stack & Architecture

- **Frontend**: React 19, Vite 8, Modern Semantic CSS with CSS Custom Properties.
- **Icons**: Lucide React.
- **Serverless AI Gateway**: Vercel Serverless Function (`api/generate.js`) interacting with **Google Gemini API** (`gemini-2.5-flash` / `gemini-1.5-flash`).
- **Dev Middleware**: Custom Vite serverless middleware simulating Vercel serverless behavior during `npm run dev`.
- **Speech**: HTML5 Web SpeechSynthesis API with graceful degradation notices.
- **Storage**: Browser `localStorage` with JSON serialization & error recovery.

```
KannadaConnect/
├── api/
│   └── generate.js          # Vercel serverless endpoint for Gemini API
├── public/
│   ├── favicon.svg          # Custom Kannada 'ಕ' SVG emblem
│   └── ...
├── src/
│   ├── components/
│   │   ├── Header.jsx            # Wordmark, navigation, saved badge, voice status
│   │   ├── IntentInput.jsx       # Situation pills, auto-expanding textarea, example chips
│   │   ├── PhraseResult.jsx      # Kannada script, transliteration, audio, actions
│   │   ├── ReplyList.jsx         # Contextual "What they might say" replies
│   │   ├── ShowMode.jsx          # Distraction-free full-screen display modal
│   │   ├── SituationExplorer.jsx # Searchable situation phrasebook
│   │   ├── SavedPhrases.jsx      # Offline saved phrasebook collection
│   │   └── PhraseCard.jsx        # Individual phrase presentation card
│   ├── data/
│   │   └── phrases.js            # Curated, reviewed Kannada phrases dataset
│   ├── services/
│   │   └── aiService.js          # Resilient API client with automatic curated fallback
│   ├── utils/
│   │   ├── speech.js             # SpeechSynthesis with Kannada voice detection
│   │   └── storage.js            # LocalStorage persistence manager
│   ├── App.jsx                   # Main application router and state
│   ├── index.css                 # Complete design system & custom tokens
│   └── main.jsx
├── .env.example
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm

### 1. Clone & Install
```bash
git clone https://github.com/anishagrawal25/KannadaConnect.git
cd KannadaConnect
npm install
```

### 2. Configure Environment (Optional for AI Generation)
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Open `.env` and add your Google Gemini API key:
```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
```
> *Note:* Even without a Gemini API key, KannadaConnect operates with its full curated phrasebook and instant fallback matching for offline and hackathon demonstrations!

### 3. Start Local Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 4. Build for Production
```bash
npm run build
npm run preview
```

---

## 🎪 Hackathon Live Demonstration Script (60 Seconds)

1. **The Hook (10s)**: "Moving to Bengaluru or travelling across Karnataka is daunting when you cannot speak Kannada. Existing translators give you dictionary words, but don't prepare you for real conversations."
2. **Enter Intent (10s)**: Click the **'Bus to Mysuru'** example chip: *"I need to ask whether this bus goes to Mysuru"*.
3. **Generate (10s)**: Click **Generate Kannada**. See the prominent Kannada script:
   - **ಈ ಬಸ್ ಮೈಸೂರಿಗೆ ಹೋಗುತ್ತದೆಯೇ?**
   - Transliteration: *Ee bus Mysurige hoguttadeye?*
   - Audio Pronunciation & Cultural Etiquette tip.
4. **Show Full Screen (15s)**: Click **Show Full Screen**. Demonstrate how a traveller can hold up the phone to a busy conductor with sunlight or OLED night contrast.
5. **Understand the Reply (10s)**: Exit Show Mode and reveal **"What they might say"**:
   - *ಹೌದು, ಹೋಗುತ್ತೆ, ಹತ್ತಿ.* (Yes, it goes, get in)
   - *ಇಲ್ಲ, ಇದು ಹೋಗಲ್ಲ. ಮುಂದಿನ ಬಸ್ ಹತ್ತಿ.* (No, this doesn't go. Take the next bus)
6. **Save & Explore (5s)**: Tap **Save** (badge updates to 1) and jump to the **Explore** tab to showcase the curated phrasebook for Food, Shopping, and Health.

---

## 🔒 Security & Privacy

- The Gemini API key is accessed exclusively server-side in `api/generate.js` via `process.env.GEMINI_API_KEY`.
- No API keys are bundled into frontend client scripts or public git commits.
- Saved phrases remain strictly in browser `localStorage`.

---

## 📄 License

MIT License — Copyright (c) 2026 Anisha Agrawal.
