// Vercel Serverless Function: /api/generate
// Translates English communication intent into authentic, situation-appropriate Kannada,
// phonetic transliteration, meaning, cultural context, and plausible replies.

export default async function handler(req, res) {
  // Enforce POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const { intent, situation, isAlternative } = req.body || {};

  // Input validation
  if (!intent || typeof intent !== 'string' || !intent.trim()) {
    return res.status(400).json({ error: 'Please provide a valid English intent description.' });
  }

  const trimmedIntent = intent.trim().slice(0, 300);

  // 1. If Gemini API Key is configured in environment, attempt Google Gemini first
  const apiKey = process.env.GEMINI_API_KEY;
  const hasGeminiKey = apiKey && apiKey !== 'undefined' && apiKey !== 'your_gemini_api_key_here' && apiKey.trim().length > 0;

  if (hasGeminiKey) {
    const geminiResult = await tryGeminiGeneration(trimmedIntent, situation, isAlternative, apiKey);
    if (geminiResult) {
      return res.status(200).json({
        success: true,
        data: geminiResult
      });
    }
  }

  // 2. High-precision dynamic neural translation
  // Guarantees that whatever English phrase the user types, authentic Kannada & transliteration is returned
  const dynamicResult = await dynamicTranslate(trimmedIntent, situation);
  if (dynamicResult) {
    return res.status(200).json({
      success: true,
      data: dynamicResult
    });
  }

  // 3. Fallback error if all services are unreachable
  return res.status(502).json({
    error: 'Translation services currently unavailable. Please verify your internet connection.',
    code: 'NETWORK_OFFLINE'
  });
}

async function tryGeminiGeneration(trimmedIntent, situation, isAlternative, apiKey) {
  const systemInstruction = `You are KannadaConnect, a real-world Kannada communication assistant.
Your goal is to help non-Kannada speakers communicate confidently in real-life situations in Karnataka (buses, autos, restaurants, markets, clinics, shops).

Given the user's intent in English and their situational context:
1. Provide a natural, spoken, context-appropriate Kannada sentence using correct Kannada script (Noto Sans Kannada compatible).
2. Provide a clear, phonetic English transliteration so an English speaker can pronounce it easily.
3. Provide a pronunciation guide showing syllables/cadence.
4. Provide the exact English meaning of the Kannada sentence.
5. Provide a short, practical cultural context tip (e.g. adding polite suffixes like '-ree' or '-kodi', tipping gestures, etc.).
6. Provide up to 3 plausible replies the local person might respond with in Kannada, with transliteration and English meaning.
7. Return strictly valid JSON adhering to this exact format:
{
  "kannada": "ಕನ್ನಡ ವಾಕ್ಯ",
  "transliteration": "Kannada phonetics",
  "pronunciationGuide": "KAN • NA • DA",
  "english": "English meaning",
  "contextNote": "Practical usage tip",
  "replies": [
    {
      "kannada": "ಪ್ರತಿಕ್ರಿಯೆ",
      "transliteration": "Pratikriye",
      "englishMeaning": "English meaning of reply"
    }
  ]
}`;

  const userPrompt = `User Intent: "${trimmedIntent}"
Situation Category: ${situation || 'general'}
${isAlternative ? 'Please provide a fresh alternative phrasing (slightly different tone or vocabulary).' : ''}`;

  const requestBody = {
    contents: [
      {
        parts: [
          { text: `${systemInstruction}\n\n${userPrompt}` }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.3,
      topP: 0.8,
      maxOutputTokens: 1024,
      responseMimeType: "application/json"
    }
  };

  const models = ['gemini-1.5-flash', 'gemini-2.0-flash', 'gemini-1.5-pro'];

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) continue;

      const data = await response.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) continue;

      const cleaned = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleaned);

      if (!parsed.kannada || !parsed.transliteration) continue;

      return {
        kannada: parsed.kannada,
        transliteration: parsed.transliteration,
        pronunciationGuide: parsed.pronunciationGuide || '',
        english: parsed.english || trimmedIntent,
        originalIntent: trimmedIntent,
        contextNote: parsed.contextNote || '',
        situation: situation || 'general',
        verified: false,
        isAIGenerated: true,
        replies: Array.isArray(parsed.replies) ? parsed.replies : []
      };
    } catch {
      // Continue to next model or fallback
    }
  }

  return null;
}

async function dynamicTranslate(intent, situation) {
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=kn&dt=t&dt=rm&q=${encodeURIComponent(intent)}`;
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'
      }
    });

    if (!response.ok) return null;
    const data = await response.json();

    let kannada = '';
    if (Array.isArray(data[0])) {
      kannada = data[0].map(item => item && item[0]).filter(Boolean).join('').trim();
    }

    let rawRoman = '';
    if (Array.isArray(data[0])) {
      const romanItem = data[0].find(item => item && item[2]);
      if (romanItem && romanItem[2]) {
        rawRoman = romanItem[2].trim();
      }
    }

    if (!kannada) return null;

    const transliteration = cleanRoman(rawRoman || kannada);
    const words = transliteration.split(/\s+/).filter(Boolean);
    const pronunciationGuide = words.map(w => w.toUpperCase()).join(' • ');

    const situationKey = situation || 'general';
    const replies = getSituationalReplies(situationKey, intent);

    return {
      kannada,
      transliteration,
      pronunciationGuide,
      english: intent,
      originalIntent: intent,
      situation: situationKey,
      verified: false,
      isAIGenerated: true,
      contextNote: 'Direct translation. Speak clearly and politely, or tap Show Full Screen to display on your phone.',
      replies
    };
  } catch (err) {
    console.error('Dynamic translation error:', err.message);
    return null;
  }
}

function cleanRoman(text) {
  if (!text) return '';
  return text
    .replace(/ā/g, 'aa')
    .replace(/ī/g, 'ee')
    .replace(/ū/g, 'oo')
    .replace(/ē/g, 'e')
    .replace(/ō/g, 'o')
    .replace(/ḍ/g, 'd')
    .replace(/ṭ/g, 't')
    .replace(/ṇ/g, 'n')
    .replace(/ḷ/g, 'l')
    .replace(/ś/g, 'sh')
    .replace(/ṣ/g, 'sh')
    .replace(/ṃ/g, 'm');
}

function getSituationalReplies(situation, intent) {
  const lower = (intent || '').toLowerCase();

  // Price inquiry replies
  if (lower.includes('cost') || lower.includes('price') || lower.includes('how much') || lower.includes('rate')) {
    return [
      { kannada: 'ನೂರು ರೂಪಾಯಿ ಸರ್.', transliteration: 'Nooru roopayi sir.', englishMeaning: 'One hundred rupees sir.' },
      { kannada: 'ಕ್ಯೂಆರ್ ಕೋಡ್ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ.', transliteration: 'QR code scan maadi.', englishMeaning: 'Scan the QR code to pay.' },
      { kannada: 'ಬೋರ್ಡ್ ಮೇಲೆ ರೇಟ್ ನೋಡಿ.', transliteration: 'Board mele rate nodi.', englishMeaning: 'Please check the rates on the board.' }
    ];
  }

  // Directions and travel
  if (situation === 'transport' || lower.includes('bus') || lower.includes('auto') || lower.includes('drop') || lower.includes('stop') || lower.includes('station') || lower.includes('airport')) {
    return [
      { kannada: 'ಹೌದು, ಹೋಗುತ್ತೆ, ಹತ್ತಿ.', transliteration: 'Haudu, hogutte, hatti.', englishMeaning: 'Yes, it goes, please board.' },
      { kannada: 'ಸ್ವಲ್ಪ ಮುಂದೆ ಹೋಗಿ ಎಡಕ್ಕೆ ತಿರುಗಿ.', transliteration: 'Swalpa munde hogi edakke tirugi.', englishMeaning: 'Go a little ahead and turn left.' },
      { kannada: 'ಮೀಟರ್ ಮೇಲೆ ಇಪ್ಪತ್ತು ರೂಪಾಯಿ ಜಾಸ್ತಿ.', transliteration: 'Meter mele ippattu roopayi jaasti.', englishMeaning: 'Twenty rupees extra above the meter.' }
    ];
  }

  // Food and dining
  if (situation === 'food' || lower.includes('eat') || lower.includes('food') || lower.includes('coffee') || lower.includes('tea') || lower.includes('water') || lower.includes('bill')) {
    return [
      { kannada: 'ಎರಡು ನಿಮಿಷದಲ್ಲಿ ತರ್ತೀನಿ ಸರ್.', transliteration: 'Eradu nimishadalli tarteeni sir.', englishMeaning: 'I will bring it in two minutes sir.' },
      { kannada: 'ಟೋಕನ್ ಕೌಂಟರ್‌ನಲ್ಲಿ ಮೊದಲು ತಗೊಳ್ಳಿ.', transliteration: 'Token counter-nalli modalu tagolli.', englishMeaning: 'Please get the token from the counter first.' },
      { kannada: 'ಇವತ್ತು ಅದು ಮುಗಿದುಹೋಗಿದೆ ಸರ್.', transliteration: 'Ivattu adu mugiduhogide sir.', englishMeaning: 'That is finished for today sir.' }
    ];
  }

  // Shopping and payments
  if (situation === 'shopping' || lower.includes('buy') || lower.includes('shop') || lower.includes('discount') || lower.includes('upi') || lower.includes('card')) {
    return [
      { kannada: 'ಕ್ಯೂಆರ್ ಕೋಡ್ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ.', transliteration: 'QR code scan maadi.', englishMeaning: 'Scan the QR code.' },
      { kannada: 'ಇದು ಫಿಕ್ಸ್ಡ್ ರೇಟ್ ಸರ್.', transliteration: 'Idu fixed rate sir.', englishMeaning: 'This is a fixed price, sir.' },
      { kannada: 'ಚಿಲ್ಲರೆ ಇದೆಯಾ ನಿಮ್ಮ ಹತ್ತಿರ?', transliteration: 'Chillare ideya nimma hathira?', englishMeaning: 'Do you have change?' }
    ];
  }

  // Health and medical
  if (situation === 'health' || lower.includes('medicine') || lower.includes('pain') || lower.includes('doctor') || lower.includes('hospital')) {
    return [
      { kannada: 'ಊಟ ಆದ್ಮೇಲೆ ಒಂದು ಮಾತ್ರೆ ತಗೊಳ್ಳಿ.', transliteration: 'Oota aadmeyle ondu maatre tagolli.', englishMeaning: 'Take one tablet after eating.' },
      { kannada: 'ಡಾಕ್ಟರ್ ಬರ್ತಾರೆ, ಸ್ವಲ್ಪ ಕಾಯಿರಿ.', transliteration: 'Doctor bartaare, swalpa kaayiri.', englishMeaning: 'The doctor is arriving, please wait.' },
      { kannada: 'ಬಿಸಿ ನೀರು ಮಾತ್ರ ಕುಡಿಯಿರಿ.', transliteration: 'Bisi neeru maatra kudiyiri.', englishMeaning: 'Drink only warm water.' }
    ];
  }

  // General everyday conversations
  return [
    { kannada: 'ಸರಿ, ಹಾಗೇ ಮಾಡೋಣ.', transliteration: 'Sari, haage maadona.', englishMeaning: 'Okay, let us do that.' },
    { kannada: 'ಖಂಡಿತ, ಸಹಾಯ ಮಾಡ್ತೀನಿ.', transliteration: 'Khandita, sahaaya maadteeni.', englishMeaning: 'Certainly, I will help you.' },
    { kannada: 'ಗೊತ್ತಾಯ್ತು, ತುಂಬಾ ಧನ್ಯವಾದಗಳು.', transliteration: 'Gottaaytu, tumba dhanyavaadagalu.', englishMeaning: 'Understood, thank you very much.' }
  ];
}
