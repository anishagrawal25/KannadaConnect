import React, { useRef } from 'react';
import { Send, Sparkles, Bus, Utensils, ShoppingBag, HeartPulse, MessageCircle, Mic, MicOff, AlertCircle } from 'lucide-react';
import { SITUATIONS } from '../data/phrases';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';

const EXAMPLE_PROMPTS = [
  { label: 'Bus to Mysuru', text: 'I need to ask whether this bus goes to Mysuru', situation: 'transport' },
  { label: 'Indiranagar Auto Meter', text: 'Will you go to Indiranagar by meter?', situation: 'transport' },
  { label: 'Filter Coffee', text: 'Two filter coffees, less sugar please', situation: 'food' },
  { label: 'Vegetable & UPI', text: 'How much for 1 kg tomatoes and do you accept UPI?', situation: 'shopping' },
  { label: 'Headache Medicine', text: 'I have a severe headache, please give medicine', situation: 'health' },
  { label: 'Speak Slowly', text: 'I do not know Kannada well, please speak slowly', situation: 'conversation' }
];

export default function IntentInput({
  intent,
  setIntent,
  selectedSituation,
  setSelectedSituation,
  onGenerate,
  isLoading,
  error
}) {
  const textareaRef = useRef(null);
  const {
    isSupported: isVoiceSupported,
    isListening,
    voiceError,
    clearVoiceError,
    startListening,
    stopListening
  } = useSpeechRecognition();

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      if (!isLoading && intent.trim()) {
        if (isListening) stopListening();
        onGenerate();
      }
    }
  };

  const handleToggleVoice = () => {
    clearVoiceError();
    if (isListening) {
      stopListening();
    } else {
      startListening((transcript) => {
        setIntent(transcript);
        if (textareaRef.current) {
          textareaRef.current.focus();
        }
      });
    }
  };

  const handleSelectExample = (example) => {
    if (isListening) stopListening();
    setIntent(example.text);
    if (example.situation) {
      setSelectedSituation(example.situation);
    }
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const getSituationIcon = (iconName) => {
    switch (iconName) {
      case 'Bus': return <Bus size={14} />;
      case 'Utensils': return <Utensils size={14} />;
      case 'ShoppingBag': return <ShoppingBag size={14} />;
      case 'HeartPulse': return <HeartPulse size={14} />;
      case 'MessageCircle': return <MessageCircle size={14} />;
      default: return <Sparkles size={14} />;
    }
  };

  return (
    <div className="input-panel">
      {/* Situation Picker Pills */}
      <div className="situation-selector" role="group" aria-label="Select situation">
        {SITUATIONS.map((sit) => (
          <button
            key={sit.id}
            type="button"
            className={`situation-pill ${selectedSituation === sit.id ? 'active' : ''}`}
            onClick={() => setSelectedSituation(sit.id)}
            id={`sit-pill-${sit.id}`}
          >
            {getSituationIcon(sit.icon)}
            <span>{sit.label}</span>
          </button>
        ))}
      </div>

      {/* Textarea Input with Voice Button */}
      <div className="intent-textarea-wrap">
        <textarea
          ref={textareaRef}
          id="intent-input-field"
          className="intent-textarea"
          placeholder={isListening ? "Listening... Speak your request clearly in English..." : "Describe what you want to say in English (or tap the microphone to speak)..."}
          value={intent}
          onChange={(e) => setIntent(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={3}
          maxLength={300}
          disabled={isLoading}
          aria-label="What would you like to say in Kannada?"
        />
      </div>

      {/* Active Listening State Banner */}
      {isListening && (
        <div className="voice-listening-banner" role="status" aria-live="polite">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="voice-wave-dot" aria-hidden="true" />
            <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--color-forest)' }}>
              Listening in English... Speak your request now
            </span>
          </div>
          <button
            type="button"
            className="btn-secondary"
            onClick={stopListening}
            style={{ padding: '4px 12px', fontSize: '12.5px', borderColor: 'var(--color-sage)' }}
          >
            Done Speaking
          </button>
        </div>
      )}

      {/* Voice Error Notice */}
      {voiceError && (
        <div style={{
          marginTop: '12px',
          padding: '10px 14px',
          backgroundColor: 'var(--color-terracotta-light)',
          border: '1px solid #E8B9AA',
          borderRadius: 'var(--radius-md)',
          color: 'var(--color-terracotta)',
          fontSize: '13px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '10px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertCircle size={16} style={{ flexShrink: 0 }} />
            <span>{voiceError}</span>
          </div>
          <button
            type="button"
            onClick={clearVoiceError}
            style={{ background: 'none', border: 'none', color: 'var(--color-terracotta)', cursor: 'pointer', fontWeight: 600, fontSize: '12px' }}
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Input Footer: Meta & Action */}
      <div className="input-footer">
        <div className="input-meta">
          <span>{intent.length} / 300 characters</span>
          <span>•</span>
          <span>Press <kbd style={{ padding: '1px 5px', background: 'var(--color-sand)', borderRadius: '4px', fontSize: '11px' }}>⌘+Enter</kbd></span>
        </div>

        <div className="input-actions">
          {/* Microphone Voice Button */}
          <button
            type="button"
            className={`btn-mic ${isListening ? 'listening' : ''}`}
            onClick={handleToggleVoice}
            disabled={isLoading}
            id="btn-voice-input"
            title={
              !isVoiceSupported
                ? "Voice recognition is not supported in this browser (supported in Chrome, Edge, Safari)"
                : isListening
                ? "Stop listening"
                : "Speak your request in English"
            }
          >
            {isListening ? (
              <>
                <MicOff size={16} />
                <span>Stop Listening</span>
              </>
            ) : (
              <>
                <Mic size={16} />
                <span>Speak</span>
              </>
            )}
          </button>

          {intent && (
            <button
              type="button"
              className="btn-secondary"
              onClick={() => {
                if (isListening) stopListening();
                setIntent('');
              }}
              disabled={isLoading}
            >
              Clear
            </button>
          )}

          <button
            type="button"
            className="btn-primary"
            onClick={() => {
              if (isListening) stopListening();
              onGenerate();
            }}
            disabled={isLoading || !intent.trim()}
            id="generate-kannada-btn"
          >
            {isLoading ? (
              <>
                <div className="spinner" aria-hidden="true" />
                <span>Translating...</span>
              </>
            ) : (
              <>
                <Send size={16} />
                <span>Generate Kannada</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Validation or API error display */}
      {error && (
        <div style={{
          marginTop: '14px',
          padding: '10px 14px',
          backgroundColor: 'var(--color-terracotta-light)',
          border: '1px solid #E8B9AA',
          borderRadius: 'var(--radius-md)',
          color: 'var(--color-terracotta)',
          fontSize: '13.5px'
        }}>
          {error}
        </div>
      )}

      {/* Clickable Example Prompts */}
      <div className="example-prompts">
        <div className="example-prompts-label">Try these real-life examples:</div>
        <div className="example-chips">
          {EXAMPLE_PROMPTS.map((ex, idx) => (
            <button
              key={idx}
              type="button"
              className="example-chip"
              onClick={() => handleSelectExample(ex)}
              title={ex.text}
            >
              <span style={{ fontWeight: 600 }}>{ex.label}:</span> "{ex.text}"
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
