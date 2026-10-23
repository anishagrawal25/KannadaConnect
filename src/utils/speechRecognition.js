// Speech Recognition utility using browser Web Speech API
// Pure client-side speech-to-text with graceful error handling and no external audio transmission.

class SpeechRecognitionService {
  constructor() {
    this.SpeechRecognition = typeof window !== 'undefined'
      ? (window.SpeechRecognition || window.webkitSpeechRecognition || null)
      : null;
    this.recognition = null;
    this.isListening = false;
  }

  isSupported() {
    return !!this.SpeechRecognition;
  }

  start({ onResult, onError, onEnd, lang = 'en-IN' }) {
    if (!this.isSupported()) {
      if (onError) {
        onError({
          code: 'UNSUPPORTED',
          message: 'Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.'
        });
      }
      return false;
    }

    // Stop any existing instance
    this.stop();

    try {
      this.recognition = new this.SpeechRecognition();
      this.recognition.lang = lang;
      this.recognition.continuous = false; // Turn off continuous for crisp command recognition
      this.recognition.interimResults = true;
      this.recognition.maxAlternatives = 1;

      this.recognition.onstart = () => {
        this.isListening = true;
      };

      this.recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const item = event.results[i];
          if (item.isFinal) {
            finalTranscript += item[0].transcript;
          } else {
            interimTranscript += item[0].transcript;
          }
        }

        if (onResult) {
          onResult({
            transcript: finalTranscript || interimTranscript,
            isFinal: !!finalTranscript
          });
        }
      };

      this.recognition.onerror = (event) => {
        this.isListening = false;
        let userMessage = 'Speech recognition encountered an issue.';

        switch (event.error) {
          case 'not-allowed':
          case 'service-not-allowed':
            userMessage = 'Microphone access was denied. Please allow microphone permissions in your browser address bar.';
            break;
          case 'no-speech':
            userMessage = 'No speech was detected. Please tap the microphone and speak again.';
            break;
          case 'network':
            userMessage = 'Speech recognition network error. Please check your internet connection.';
            break;
          case 'audio-capture':
            userMessage = 'No microphone was found on this device.';
            break;
          case 'aborted':
            // Ignored when explicitly cancelled by user
            return;
          default:
            userMessage = `Voice input error (${event.error}). Please try again or type manually.`;
        }

        if (onError) {
          onError({
            code: event.error,
            message: userMessage
          });
        }
      };

      this.recognition.onend = () => {
        this.isListening = false;
        if (onEnd) onEnd();
      };

      this.recognition.start();
      return true;
    } catch (err) {
      this.isListening = false;
      if (onError) {
        onError({
          code: 'EXCEPTION',
          message: err.message || 'Could not start microphone.'
        });
      }
      return false;
    }
  }

  stop() {
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch {
        // Ignore errors if already stopped
      }
      this.recognition = null;
    }
    this.isListening = false;
  }

  abort() {
    if (this.recognition) {
      try {
        this.recognition.abort();
      } catch {
        // Ignore
      }
      this.recognition = null;
    }
    this.isListening = false;
  }
}

export const speechRecognitionService = new SpeechRecognitionService();
