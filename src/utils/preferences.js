// User Preferences Manager for KannadaConnect
// Persisted in localStorage and broadcasted for reactive UI updates across screens

const PREFERENCES_STORAGE_KEY = 'kannadaconnect_preferences_v1';

export const DEFAULT_PREFERENCES = {
  showTransliteration: true,
  showEnglishMeaning: true,
  speechRate: 0.85, // 1.0 (Normal), 0.85 (Clear / Default), 0.7 (Gentle)
  theme: 'light'
};

export function getPreferences() {
  if (typeof window === 'undefined') return DEFAULT_PREFERENCES;
  try {
    const raw = localStorage.getItem(PREFERENCES_STORAGE_KEY);
    if (!raw) return DEFAULT_PREFERENCES;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_PREFERENCES, ...parsed };
  } catch (e) {
    console.error('Failed to load preferences from localStorage:', e);
    return DEFAULT_PREFERENCES;
  }
}

export function savePreferences(updates) {
  if (typeof window === 'undefined' || !updates) return DEFAULT_PREFERENCES;
  try {
    const current = getPreferences();
    const updated = { ...current, ...updates };
    localStorage.setItem(PREFERENCES_STORAGE_KEY, JSON.stringify(updated));

    // Dispatch custom event for real-time reactive sync across components
    window.dispatchEvent(
      new CustomEvent('kannadaconnect_preferences_updated', { detail: updated })
    );

    return updated;
  } catch (e) {
    console.error('Failed to save preferences to localStorage:', e);
    return getPreferences();
  }
}
