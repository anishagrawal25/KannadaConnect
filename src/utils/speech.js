// Speech Synthesis utility with Kannada voice detection, stop support, and graceful degradation
import { getPreferences } from './preferences';

class SpeechService {
  constructor() {
    this.synth = typeof window !== 'undefined' && 'speechSynthesis' in window ? window.speechSynthesis : null;
    this.voices = [];
    this.kannadaVoice = null;
    this.initialized = false;
    this.isSpeaking = false;
    this.onStateChange = null;

    if (this.synth) {
      this.initVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.initVoices();
      }
    }
  }

  initVoices() {
    if (!this.synth) return;
    try {
      this.voices = this.synth.getVoices() || [];
      // Look strictly for Kannada voice: kn-IN, kn_IN, or name containing Kannada
      this.kannadaVoice = this.voices.find(v => 
        (v.lang && (v.lang.toLowerCase() === 'kn-in' || v.lang.toLowerCase() === 'kn_in' || v.lang.toLowerCase().startsWith('kn'))) ||
        (v.name && v.name.toLowerCase().includes('kannada'))
      ) || null;
      this.initialized = true;
    } catch {
      this.kannadaVoice = null;
    }
  }

  hasKannadaVoice() {
    if (!this.synth) return false;
    if (!this.initialized || !this.kannadaVoice) this.initVoices();
    return !!this.kannadaVoice;
  }

  isSupported() {
    return !!this.synth;
  }

  speak(text, onEndCallback = null, onErrorCallback = null) {
    if (!this.synth) {
      if (onErrorCallback) {
        onErrorCallback({
          code: 'UNSUPPORTED',
          message: 'Speech synthesis is not supported in this browser.'
        });
      }
      return false;
    }

    // Cancel any previous speech playback
    this.stop();

    // Check if system has a Kannada voice
    this.initVoices();
    if (!this.kannadaVoice) {
      if (onErrorCallback) {
        onErrorCallback({
          code: 'NO_KANNADA_VOICE',
          message: 'A native Kannada voice is not installed on this browser/operating system. The phonetic pronunciation guide and full-screen Show Mode are available.'
        });
      }
      return false;
    }

    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = this.kannadaVoice;
      utterance.lang = this.kannadaVoice.lang || 'kn-IN';
      const prefs = getPreferences();
      const preferredRate = options?.rate || prefs?.speechRate || 0.85;
      utterance.rate = preferredRate; // Tuned pace for phonetic clarity
      utterance.pitch = 1.0;

      utterance.onstart = () => {
        this.isSpeaking = true;
        if (this.onStateChange) this.onStateChange(true);
      };

      utterance.onend = () => {
        this.isSpeaking = false;
        if (this.onStateChange) this.onStateChange(false);
        if (onEndCallback) onEndCallback();
      };

      utterance.onerror = (e) => {
        this.isSpeaking = false;
        if (this.onStateChange) this.onStateChange(false);
        if (onErrorCallback) {
          onErrorCallback({
            code: 'PLAYBACK_ERROR',
            message: e?.error || 'Speech playback failed.'
          });
        }
      };

      this.synth.speak(utterance);
      return true;
    } catch (err) {
      this.isSpeaking = false;
      if (onErrorCallback) {
        onErrorCallback({
          code: 'EXCEPTION',
          message: err?.message || 'Error executing speech synthesis.'
        });
      }
      return false;
    }
  }

  stop() {
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch {
        // Ignore
      }
      this.isSpeaking = false;
      if (this.onStateChange) this.onStateChange(false);
    }
  }
}

export const speechService = new SpeechService();
