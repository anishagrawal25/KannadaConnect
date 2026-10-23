// AI Service to interact with /api/generate with robust curated fallback
import { findMatchingCuratedPhrase } from '../data/phrases.js';

export async function generateKannadaPhrase({ intent, situation = 'all', isAlternative = false }) {
  if (!intent || !intent.trim()) {
    throw new Error('Please describe what you want to say in English.');
  }

  const trimmed = intent.trim();

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000); // 12s timeout

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
          situationLabel: getSituationLabel(situation)
        };
      }
    }

    // If server returned an error (such as missing API key or upstream error),
    // we inspect the error code and use intelligent curated fallback
    const errData = await response.json().catch(() => null);
    const code = errData?.code;
    const errorMsg = errData?.error || 'AI generation encountered an issue';

    console.warn('API returned non-200 status, activating curated fallback:', code, errorMsg);
    return getCuratedFallback(trimmed, situation, code);

  } catch (netErr) {
    console.warn('Network or timeout calling /api/generate, activating curated fallback:', netErr.message);
    return getCuratedFallback(trimmed, situation, 'NETWORK_OFFLINE');
  }
}

function getCuratedFallback(intent, situation, reasonCode) {
  const match = findMatchingCuratedPhrase(intent, situation);

  if (match) {
    let note = match.contextNote || '';
    if (reasonCode === 'API_KEY_MISSING') {
      note = (note ? note + ' • ' : '') + 'Loaded from reviewed phrasebook (Configure GEMINI_API_KEY in .env for custom dynamic translations).';
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

  // Extreme fallback if no curated phrase matched
  return {
    id: 'fallback-generic',
    kannada: 'ದಯವಿಟ್ಟು ನನಗೆ ಸ್ವಲ್ಪ ಸಹಾಯ ಮಾಡಿ.',
    transliteration: 'Dayavittu nanage swalpa sahaaya maadi.',
    pronunciationGuide: 'da-ya-VIT-tu na-na-ge SWAL-pa sa-HAA-ya maa-di.',
    english: 'Please help me a little.',
    originalIntent: intent,
    verified: true,
    situation: situation || 'conversation',
    situationLabel: 'Everyday Conversations',
    isFallback: true,
    contextNote: 'Loaded emergency assistance phrase from verified offline library.',
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
    all: 'General'
  };
  return labels[situationId] || 'General';
}
