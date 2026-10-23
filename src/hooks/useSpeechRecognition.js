import { useState, useEffect, useCallback } from 'react';
import { speechRecognitionService } from '../utils/speechRecognition';

export function useSpeechRecognition() {
  const [isSupported, setIsSupported] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceError, setVoiceError] = useState(null);

  useEffect(() => {
    setIsSupported(speechRecognitionService.isSupported());
  }, []);

  const clearVoiceError = useCallback(() => {
    setVoiceError(null);
  }, []);

  const startListening = useCallback((onTranscript) => {
    setVoiceError(null);

    const started = speechRecognitionService.start({
      lang: 'en-IN', // Defaults to Indian English accents for natural recognition
      onResult: ({ transcript }) => {
        if (onTranscript && transcript) {
          onTranscript(transcript);
        }
      },
      onError: (err) => {
        setIsListening(false);
        setVoiceError(err.message);
      },
      onEnd: () => {
        setIsListening(false);
      }
    });

    if (started) {
      setIsListening(true);
    }
  }, []);

  const stopListening = useCallback(() => {
    speechRecognitionService.stop();
    setIsListening(false);
  }, []);

  return {
    isSupported,
    isListening,
    voiceError,
    clearVoiceError,
    startListening,
    stopListening
  };
}
