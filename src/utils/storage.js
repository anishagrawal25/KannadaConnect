// LocalStorage helper for KannadaConnect saved phrases

const STORAGE_KEY = 'kannadaconnect_saved_phrases_v1';

export function getSavedPhrases() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Failed to read saved phrases from localStorage:', e);
    return [];
  }
}

export function savePhrase(phrase) {
  if (typeof window === 'undefined' || !phrase) return [];
  try {
    const current = getSavedPhrases();
    // Check if already saved (by id or kannada text)
    const exists = current.some(p => (phrase.id && p.id === phrase.id) || p.kannada === phrase.kannada);
    if (exists) return current;

    const newPhrase = {
      ...phrase,
      savedAt: new Date().toISOString()
    };
    const updated = [newPhrase, ...current];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to save phrase to localStorage:', e);
    return getSavedPhrases();
  }
}

export function removeSavedPhrase(phraseIdOrKannada) {
  if (typeof window === 'undefined') return [];
  try {
    const current = getSavedPhrases();
    const updated = current.filter(p => p.id !== phraseIdOrKannada && p.kannada !== phraseIdOrKannada);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to remove saved phrase from localStorage:', e);
    return getSavedPhrases();
  }
}

export function isPhraseSaved(phrase) {
  if (!phrase) return false;
  const current = getSavedPhrases();
  return current.some(p => (phrase.id && p.id === phrase.id) || p.kannada === phrase.kannada);
}

export function clearSavedPhrases() {
  if (typeof window === 'undefined') return [];
  try {
    localStorage.removeItem(STORAGE_KEY);
    return [];
  } catch (e) {
    console.error('Failed to clear saved phrases:', e);
    return [];
  }
}

// ==========================================
// VOCABULARY STORAGE HELPERS
// ==========================================
const VOCAB_STORAGE_KEY = 'kannadaconnect_saved_vocab_v1';

export function getSavedWords() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(VOCAB_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Failed to read saved words:', e);
    return [];
  }
}

export function saveWord(word) {
  if (typeof window === 'undefined' || !word) return [];
  try {
    const current = getSavedWords();
    const exists = current.some(w => (word.id && w.id === word.id) || w.kannada === word.kannada);
    if (exists) return current;

    const newWord = {
      ...word,
      savedAt: new Date().toISOString()
    };
    const updated = [newWord, ...current];
    localStorage.setItem(VOCAB_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to save word:', e);
    return getSavedWords();
  }
}

export function removeSavedWord(wordIdOrKannada) {
  if (typeof window === 'undefined') return [];
  try {
    const current = getSavedWords();
    const updated = current.filter(w => w.id !== wordIdOrKannada && w.kannada !== wordIdOrKannada);
    localStorage.setItem(VOCAB_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to remove saved word:', e);
    return getSavedWords();
  }
}

export function isWordSaved(word) {
  if (!word) return false;
  const current = getSavedWords();
  return current.some(w => (word.id && w.id === word.id) || w.kannada === word.kannada);
}

