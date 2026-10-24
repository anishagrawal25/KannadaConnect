// AI Service to interact with /api/generate with robust dynamic translation and curated fallback
import { findMatchingCuratedPhrase } from '../data/phrases.js';

export async function generateKannadaPhrase({ intent, situation = 'all', isAlternative = false }) {
  if (!intent || !intent.trim()) {
    throw new Error('Please describe what you want to say in English.');
  }

  const trimmed = intent.trim();

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        intent: trimmed,
        situation,
        isAlternative
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const result = await response.json();
      if (result && result.success && result.data) {
        return {
          ...result.data,
          isAIGenerated: true,
          situationLabel: getSituationLabel(result.data.situation || situation)
        };
      }
    }

    // If server returned non-200, try direct client dynamic translation
    const clientTranslation = await dynamicTranslateClient(trimmed, situation);
    if (clientTranslation) return clientTranslation;

    return getCuratedFallback(trimmed, situation, 'SERVER_FALLBACK');

  } catch (netErr) {
    console.warn('Network or timeout calling /api/generate, trying direct client translation:', netErr.message);
    const clientTranslation = await dynamicTranslateClient(trimmed, situation);
    if (clientTranslation) return clientTranslation;

    return getCuratedFallback(trimmed, situation, 'NETWORK_OFFLINE');
  }
}

async function dynamicTranslateClient(intent, situation) {
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=kn&dt=t&dt=rm&q=${encodeURIComponent(intent)}`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();

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

    const situationKey = situation && situation !== 'all' ? situation : 'general';
    const replies = getSituationalReplies(situationKey, intent);

    return {
      kannada,
      transliteration,
      pronunciationGuide,
      english: intent,
      originalIntent: intent,
      situation: situationKey,
      situationLabel: getSituationLabel(situationKey),
      verified: false,
      isAIGenerated: true,
      contextNote: 'Direct translation. Speak clearly and politely, or tap Show Full Screen to display on your phone.',
      replies
    };
  } catch {
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

  if (lower.includes('cost') || lower.includes('price') || lower.includes('how much') || lower.includes('rate')) {
    return [
      { kannada: 'ನೂರು ರೂಪಾಯಿ ಸರ್.', transliteration: 'Nooru roopayi sir.', englishMeaning: 'One hundred rupees sir.' },
      { kannada: 'ಕ್ಯೂಆರ್ ಕೋಡ್ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ.', transliteration: 'QR code scan maadi.', englishMeaning: 'Scan the QR code to pay.' },
      { kannada: 'ಬೋರ್ಡ್ ಮೇಲೆ ರೇಟ್ ನೋಡಿ.', transliteration: 'Board mele rate nodi.', englishMeaning: 'Please check the rates on the board.' }
    ];
  }

  if (situation === 'transport' || lower.includes('bus') || lower.includes('auto') || lower.includes('drop') || lower.includes('stop') || lower.includes('station') || lower.includes('airport')) {
    return [
      { kannada: 'ಹೌದು, ಹೋಗುತ್ತೆ, ಹತ್ತಿ.', transliteration: 'Haudu, hogutte, hatti.', englishMeaning: 'Yes, it goes, please board.' },
      { kannada: 'ಸ್ವಲ್ಪ ಮುಂದೆ ಹೋಗಿ ಎಡಕ್ಕೆ ತಿರುಗಿ.', transliteration: 'Swalpa munde hogi edakke tirugi.', englishMeaning: 'Go a little ahead and turn left.' },
      { kannada: 'ಮೀಟರ್ ಮೇಲೆ ಇಪ್ಪತ್ತು ರೂಪಾಯಿ ಜಾಸ್ತಿ.', transliteration: 'Meter mele ippattu roopayi jaasti.', englishMeaning: 'Twenty rupees extra above the meter.' }
    ];
  }

  if (situation === 'food' || lower.includes('eat') || lower.includes('food') || lower.includes('coffee') || lower.includes('tea') || lower.includes('water') || lower.includes('bill')) {
    return [
      { kannada: 'ಎರಡು ನಿಮಿಷದಲ್ಲಿ ತರ್ತೀನಿ ಸರ್.', transliteration: 'Eradu nimishadalli tarteeni sir.', englishMeaning: 'I will bring it in two minutes sir.' },
      { kannada: 'ಟೋಕನ್ ಕೌಂಟರ್‌ನಲ್ಲಿ ಮೊದಲು ತಗೊಳ್ಳಿ.', transliteration: 'Token counter-nalli modalu tagolli.', englishMeaning: 'Please get the token from the counter first.' },
      { kannada: 'ಇವತ್ತು ಅದು ಮುಗಿದುಹೋಗಿದೆ ಸರ್.', transliteration: 'Ivattu adu mugiduhogide sir.', englishMeaning: 'That is finished for today sir.' }
    ];
  }

  if (situation === 'shopping' || lower.includes('buy') || lower.includes('shop') || lower.includes('discount') || lower.includes('upi') || lower.includes('card')) {
    return [
      { kannada: 'ಕ್ಯೂಆರ್ ಕೋಡ್ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ.', transliteration: 'QR code scan maadi.', englishMeaning: 'Scan the QR code.' },
      { kannada: 'ಇದು ಫಿಕ್ಸ್ಡ್ ರೇಟ್ ಸರ್.', transliteration: 'Idu fixed rate sir.', englishMeaning: 'This is a fixed price, sir.' },
      { kannada: 'ಚಿಲ್ಲರೆ ಇದೆಯಾ ನಿಮ್ಮ ಹತ್ತಿರ?', transliteration: 'Chillare ideya nimma hathira?', englishMeaning: 'Do you have change?' }
    ];
  }

  if (situation === 'health' || lower.includes('medicine') || lower.includes('pain') || lower.includes('doctor') || lower.includes('hospital')) {
    return [
      { kannada: 'ಊಟ ಆದ್ಮೇಲೆ ಒಂದು ಮಾತ್ರೆ ತಗೊಳ್ಳಿ.', transliteration: 'Oota aadmeyle ondu maatre tagolli.', englishMeaning: 'Take one tablet after eating.' },
      { kannada: 'ಡಾಕ್ಟರ್ ಬರ್ತಾರೆ, ಸ್ವಲ್ಪ ಕಾಯಿರಿ.', transliteration: 'Doctor bartaare, swalpa kaayiri.', englishMeaning: 'The doctor is arriving, please wait.' },
      { kannada: 'ಬಿಸಿ ನೀರು ಮಾತ್ರ ಕುಡಿಯಿರಿ.', transliteration: 'Bisi neeru maatra kudiyiri.', englishMeaning: 'Drink only warm water.' }
    ];
  }

  return [
    { kannada: 'ಸರಿ, ಹಾಗೇ ಮಾಡೋಣ.', transliteration: 'Sari, haage maadona.', englishMeaning: 'Okay, let us do that.' },
    { kannada: 'ಖಂಡಿತ, ಸಹಾಯ ಮಾಡ್ತೀನಿ.', transliteration: 'Khandita, sahaaya maadteeni.', englishMeaning: 'Certainly, I will help you.' },
    { kannada: 'ಗೊತ್ತಾಯ್ತು, ತುಂಬಾ ಧನ್ಯವಾದಗಳು.', transliteration: 'Gottaaytu, tumba dhanyavaadagalu.', englishMeaning: 'Understood, thank you very much.' }
  ];
}

function getCuratedFallback(intent, situation, reasonCode) {
  const match = findMatchingCuratedPhrase(intent, situation);

  if (match) {
    let note = match.contextNote || '';
    if (reasonCode === 'API_KEY_MISSING') {
      note = (note ? note + ' • ' : '') + 'Verified phrasebook match.';
    } else if (reasonCode === 'NETWORK_OFFLINE') {
      note = (note ? note + ' • ' : '') + 'Loaded from offline verified phrasebook.';
    }

    return {
      ...match,
      originalIntent: intent,
      isFallback: true,
      verified: true,
      situationLabel: match.situationLabel || getSituationLabel(match.situation),
      contextNote: note
    };
  }

  return {
    id: 'fallback-generic',
    kannada: 'ದಯವಿಟ್ಟು ನನಗೆ ಸ್ವಲ್ಪ ಸಹಾಯ ಮಾಡಿ.',
    transliteration: 'Dayavittu nanage swalpa sahaaya maadi.',
    pronunciationGuide: 'da-ya-VIT-tu na-na-ge SWAL-pa sa-HAA-ya maa-di.',
    english: 'Please help me a little.',
    originalIntent: intent,
    verified: true,
    situation: situation && situation !== 'all' ? situation : 'conversation',
    situationLabel: 'Everyday Conversations',
    isFallback: true,
    contextNote: 'No exact offline phrase found for this query. Showing general assistance phrase.',
    replies: [
      {
        kannada: 'ಹೌದು, ಏನು ಸಹಾಯ ಬೇಕು?',
        transliteration: 'Haudu, enu sahaaya beku?',
        englishMeaning: 'Yes, what help do you need?'
      },
      {
        kannada: 'ಖಂಡಿತ, ಹೇಳಿ.',
        transliteration: 'Khandita, heli.',
        englishMeaning: 'Certainly, please tell me.'
      }
    ]
  };
}

function getSituationLabel(situationId) {
  const labels = {
    transport: 'Transport & Directions',
    food: 'Food & Restaurants',
    shopping: 'Shopping & Payments',
    health: 'Health & Pharmacy',
    conversation: 'Everyday Conversations',
    general: 'General',
    all: 'General'
  };
  return labels[situationId] || 'General';
}
