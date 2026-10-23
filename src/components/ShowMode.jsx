import React, { useState, useEffect } from 'react';
import { X, Volume2, Sun, Moon, Type } from 'lucide-react';
import { speechService } from '../utils/speech';

export default function ShowMode({ phrase, onClose }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showTranslit, setShowTranslit] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    // Escape key listener to close Show mode
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!phrase) return null;

  const handleSpeak = () => {
    if (isSpeaking) {
      speechService.stop();
      setIsSpeaking(false);
      return;
    }
    setIsSpeaking(true);
    speechService.speak(
      phrase.kannada,
      () => setIsSpeaking(false),
      () => setIsSpeaking(false)
    );
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
            onClick={onClose}
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
          <Volume2 size={16} />
          <span>{isSpeaking ? 'Playing...' : 'Tap to Listen'}</span>
        </button>
      </div>
    </div>
  );
}
