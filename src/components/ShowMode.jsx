import React, { useState, useEffect } from 'react';
import { X, Volume2, VolumeX, Sun, Moon, Type, Info } from 'lucide-react';
import { speechService } from '../utils/speech';

export default function ShowMode({ phrase, onClose }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showTranslit, setShowTranslit] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceNotice, setVoiceNotice] = useState(null);

  useEffect(() => {
    // Escape key listener to close Show mode
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        speechService.stop();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      speechService.stop();
    };
  }, [onClose]);

  if (!phrase) return null;

  const handleSpeak = () => {
    if (isSpeaking) {
      speechService.stop();
      setIsSpeaking(false);
      return;
    }
    setVoiceNotice(null);
    setIsSpeaking(true);
    speechService.speak(
      phrase.kannada,
      () => setIsSpeaking(false),
      (err) => {
        setIsSpeaking(false);
        setVoiceNotice(err?.message || 'Kannada audio voice not available on this device.');
      }
    );
  };

  const handleClose = () => {
    speechService.stop();
    onClose();
  };

  return (
    <div 
      className={`show-mode-overlay ${isDarkMode ? 'dark-mode' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Full-screen Kannada display mode"
    >
      {/* Header with dismiss & controls */}
      <div className="show-mode-header">
        <div className="show-mode-title-badge">
          <span>Show to another person</span>
        </div>

        <div className="show-mode-controls">
          {/* Toggle transliteration */}
          <button
            type="button"
            className="btn-icon-xs"
            onClick={() => setShowTranslit(!showTranslit)}
            title={showTranslit ? "Hide English pronunciation" : "Show English pronunciation"}
            style={{ width: '38px', height: '38px' }}
          >
            <Type size={18} />
          </button>

          {/* Contrast Mode Toggle */}
          <button
            type="button"
            className="btn-icon-xs"
            onClick={() => setIsDarkMode(!isDarkMode)}
            title={isDarkMode ? "Switch to daylight mode" : "Switch to high-contrast night mode"}
            style={{ width: '38px', height: '38px' }}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Close Button */}
          <button
            type="button"
            className="btn-secondary"
            onClick={handleClose}
            id="btn-close-show-mode"
            style={{ fontWeight: 700 }}
          >
            <X size={18} />
            <span>Close (Esc)</span>
          </button>
        </div>
      </div>

      {/* Hero Display Body */}
      <div className="show-mode-body">
        <div className="show-mode-kannada kannada-text" id="show-mode-kannada-text">
          {phrase.kannada}
        </div>

        {showTranslit && phrase.transliteration && (
          <div className="show-mode-translit">
            "{phrase.transliteration}"
          </div>
        )}

        <div className="show-mode-meaning">
          {phrase.english}
        </div>

        {voiceNotice && (
          <div style={{
            marginTop: '20px',
            padding: '8px 14px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: isDarkMode ? '#23322B' : 'var(--color-sand)',
            color: isDarkMode ? '#DCE8DD' : 'var(--color-charcoal)',
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Info size={15} />
            <span>{voiceNotice}</span>
          </div>
        )}
      </div>

      {/* Footer toolbar */}
      <div className="show-mode-footer">
        <div style={{ fontSize: '13px', opacity: 0.7 }}>
          Tip: Hold up your phone so the other person can read clearly.
        </div>

        <button
          type="button"
          className="btn-primary"
          onClick={handleSpeak}
          style={{ padding: '8px 16px', fontSize: '14px' }}
        >
          {isSpeaking ? (
            <>
              <VolumeX size={16} />
              <span>Stop Audio</span>
            </>
          ) : (
            <>
              <Volume2 size={16} />
              <span>Tap to Listen</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
