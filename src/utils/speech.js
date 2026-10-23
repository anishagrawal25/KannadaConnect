// Speech Synthesis utility with Kannada voice detection and graceful degradation

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
      // Look for Kannada voice: kn-IN, kn_IN, or containing Kannada
      this.kannadaVoice = this.voices.find(v => 
        (v.lang && (v.lang.toLowerCase() === 'kn-in' || v.lang.toLowerCase() === 'kn_in' || v.lang.startsWith('kn'))) ||
        (v.name && v.name.toLowerCase().includes('kannada'))
      ) || null;
      this.initialized = true;
    } catch {
      this.kannadaVoice = null;
    }
  }

  hasKannadaVoice() {
    if (!this.synth) return false;
    if (!this.initialized) this.initVoices();
    return !!this.kannadaVoice;
  }

  isSupported() {
    return !!this.synth;
  }

  speak(text, onEndCallback = null, onErrorCallback = null) {
    if (!this.synth) {
      if (onErrorCallback) onErrorCallback('Speech synthesis not supported in this browser.');
      return false;
    }

    try {
      this.synth.cancel(); // Stop any pending speech

      const utterance = new SpeechSynthesisUtterance(text);
      if (this.kannadaVoice) {
        utterance.voice = this.kannadaVoice;
        utterance.lang = this.kannadaVoice.lang || 'kn-IN';
      } else {
        utterance.lang = 'kn-IN';
      }

      utterance.rate = 0.85; // Slightly slower for crisp pronunciation clarity
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
        if (onErrorCallback) onErrorCallback(e);
      };

      this.synth.speak(utterance);
      return true;
    } catch (err) {
      if (onErrorCallback) onErrorCallback(err);
      return false;
    }
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
      this.isSpeaking = false;
      if (this.onStateChange) this.onStateChange(false);
    }
  }
}

export const speechService = new SpeechService();
