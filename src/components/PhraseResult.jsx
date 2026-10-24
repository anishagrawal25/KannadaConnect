import React, { useState } from 'react';
import { 
  Volume2, 
  VolumeX,
  Copy, 
  Check, 
  Maximize2, 
  Bookmark, 
  BookmarkCheck, 
  RefreshCw, 
  Sparkles, 
  Info,
  ShieldCheck,
  X
} from 'lucide-react';
import { speechService } from '../utils/speech';
import { usePreferences } from '../hooks/usePreferences';

export default function PhraseResult({
  result,
  onShowFullscreen,
  onToggleSave,
  isSaved,
  onRephrase,
  isLoading
}) {
  const { preferences } = usePreferences();
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [audioNotice, setAudioNotice] = useState(null);

  if (!result) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result.kannada);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleSpeak = () => {
    if (isSpeaking) {
      speechService.stop();
      setIsSpeaking(false);
      return;
    }

    setIsSpeaking(true);
    setAudioNotice(null);

    const success = speechService.speak(
      result.kannada,
      () => setIsSpeaking(false),
      (err) => {
        setIsSpeaking(false);
        setAudioNotice(
          err?.message || 
          'A native Kannada voice is not installed on this browser. Please refer to the phonetic pronunciation guide and Show Mode.'
        );
      }
    );

    if (!success && !audioNotice) {
      setIsSpeaking(false);
    }
  };

  return (
    <div className="result-container" id="phrase-result-section">
      <div className="result-card">
        {/* Result Header */}
        <div className="result-header">
          <div className="intent-badge-row">
            <span className={`badge-source ${result.verified ? 'curated' : ''}`}>
              {result.verified ? (
                <>
                  <ShieldCheck size={13} />
                  <span>{result.id === 'fallback-generic' ? 'Offline Assistance' : 'Curated & Reviewed'}</span>
                </>
              ) : (
                <>
                  <Sparkles size={13} />
                  <span>AI Dynamic Translation</span>
                </>
              )}
            </span>

            {result.situationLabel && (
              <span style={{ fontSize: '12px', color: 'var(--color-charcoal-subtle)', fontWeight: 500 }}>
                • {result.situationLabel}
              </span>
            )}
          </div>

          <div className="result-original-intent">
            "{result.originalIntent || result.english}"
          </div>

          {result.id === 'fallback-generic' && (
            <div style={{
              marginTop: '8px',
              padding: '6px 10px',
              backgroundColor: 'var(--color-gold-light)',
              borderRadius: 'var(--radius-sm)',
              fontSize: '12px',
              color: 'var(--color-gold)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              border: '1px solid #E8D39E'
            }}>
              <Info size={13} style={{ flexShrink: 0 }} />
              <span>Exact offline match not found. Showing a general polite Kannada phrase you can use right away.</span>
            </div>
          )}
        </div>

        {/* Kannada Script Hero Box with Inline Listen Action */}
        <div className="kannada-hero-block">
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', marginBottom: '12px' }}>
            <div className="kannada-main-script kannada-text" id="kannada-phrase-text" style={{ marginBottom: 0 }}>
              {result.kannada}
            </div>

            {/* Direct Listen Button beside Kannada sentence */}
            <button
              type="button"
              className="btn-secondary"
              onClick={handleSpeak}
              id="btn-speak-inline"
              title={isSpeaking ? "Stop audio playback" : "Listen to Kannada pronunciation"}
              style={{
                flexShrink: 0,
                padding: '8px 14px',
                fontSize: '13px',
                backgroundColor: isSpeaking ? 'var(--color-terracotta-light)' : 'var(--color-white)',
                borderColor: isSpeaking ? '#E8B9AA' : 'var(--color-border)',
                color: isSpeaking ? 'var(--color-terracotta)' : 'var(--color-forest)'
              }}
            >
              {isSpeaking ? (
                <>
                  <VolumeX size={15} />
                  <span>Stop</span>
                </>
              ) : (
                <>
                  <Volume2 size={15} />
                  <span>Listen</span>
                </>
              )}
            </button>
          </div>

          {preferences.showTransliteration !== false && result.transliteration && (
            <div className="kannada-transliteration">
              {result.transliteration}
            </div>
          )}

          {preferences.showEnglishMeaning !== false && result.english && (
            <div className="kannada-english-meaning">
              <strong>Meaning:</strong> {result.english}
            </div>
          )}

          {result.pronunciationGuide && (
            <div className="kannada-phonetic-tip">
              Phonetic syllables: {result.pronunciationGuide}
            </div>
          )}
        </div>

        {/* Audio notice alert if any */}
        {audioNotice && (
          <div style={{
            margin: '8px 0 16px',
            padding: '10px 14px',
            backgroundColor: 'var(--color-gold-light)',
            border: '1px solid #E8D39E',
            borderRadius: 'var(--radius-md)',
            color: 'var(--color-gold)',
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Info size={16} style={{ flexShrink: 0 }} />
              <span>{audioNotice}</span>
            </div>
            <button
              type="button"
              onClick={() => setAudioNotice(null)}
              style={{ background: 'none', border: 'none', color: 'var(--color-gold)', cursor: 'pointer', padding: '2px' }}
              title="Dismiss notice"
            >
              <X size={14} />
            </button>
          </div>
        )}

        {/* Action Toolbar */}
        <div className="result-toolbar">
          {/* Show Mode - High Priority Action */}
          <button
            type="button"
            className="btn-primary"
            onClick={() => onShowFullscreen(result)}
            id="btn-show-fullscreen"
            title="Open distraction-free large text mode to show someone"
          >
            <Maximize2 size={16} />
            <span>Show Full Screen</span>
          </button>

          {/* Listen Button in Toolbar */}
          <button
            type="button"
            className="btn-secondary"
            onClick={handleSpeak}
            id="btn-speak-phrase"
            title={isSpeaking ? "Stop audio playback" : "Listen to pronunciation"}
          >
            {isSpeaking ? (
              <>
                <VolumeX size={16} color="var(--color-terracotta)" />
                <span style={{ color: 'var(--color-terracotta)' }}>Stop Audio</span>
              </>
            ) : (
              <>
                <Volume2 size={16} color="var(--color-forest)" />
                <span>Listen Audio</span>
              </>
            )}
          </button>

          {/* Copy Button */}
          <button
            type="button"
            className="btn-secondary"
            onClick={handleCopy}
            id="btn-copy-kannada"
            title="Copy Kannada text"
          >
            {copied ? (
              <>
                <Check size={16} color="var(--color-forest)" />
                <span style={{ color: 'var(--color-forest)' }}>Copied!</span>
              </>
            ) : (
              <>
                <Copy size={16} />
                <span>Copy Kannada</span>
              </>
            )}
          </button>

          {/* Save / Bookmark Button */}
          <button
            type="button"
            className={isSaved ? "btn-outline-forest" : "btn-secondary"}
            onClick={() => onToggleSave(result)}
            id="btn-save-phrase"
            title={isSaved ? "Remove from saved" : "Save for later"}
          >
            {isSaved ? (
              <>
                <BookmarkCheck size={16} />
                <span>Saved</span>
              </>
            ) : (
              <>
                <Bookmark size={16} />
                <span>Save</span>
              </>
            )}
          </button>

          {/* Rephrase Button */}
          {onRephrase && (
            <button
              type="button"
              className="btn-secondary"
              onClick={onRephrase}
              disabled={isLoading}
              title="Get another phrasing"
              style={{ marginLeft: 'auto' }}
            >
              <RefreshCw size={14} className={isLoading ? 'spinner' : ''} />
              <span>Alternative Phrasing</span>
            </button>
          )}
        </div>

        {/* Context Note / Cultural Etiquette */}
        {result.contextNote && (
          <div className="context-tip-box">
            <Info size={16} style={{ flexShrink: 0, marginTop: '2px', color: 'var(--color-forest)' }} />
            <div>
              <strong>Cultural context & tip:</strong> {result.contextNote}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
