import React, { useState } from 'react';
import { 
  Volume2, 
  Copy, 
  Check, 
  Maximize2, 
  Bookmark, 
  BookmarkCheck, 
  RefreshCw, 
  Sparkles, 
  Info,
  ShieldCheck
} from 'lucide-react';
import { speechService } from '../utils/speech';

export default function PhraseResult({
  result,
  onShowFullscreen,
  onToggleSave,
  isSaved,
  onRephrase,
  isLoading
}) {
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
      // Fallback
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
      (_err) => {
        setIsSpeaking(false);
        setAudioNotice('Kannada audio voice not installed on this browser. Refer to the phonetic pronunciation guide above.');
        setTimeout(() => setAudioNotice(null), 5000);
      }
    );

    if (!success) {
      setIsSpeaking(false);
      setAudioNotice('Speech synthesis unavailable on this device.');
      setTimeout(() => setAudioNotice(null), 5000);
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
                  <span>Curated & Reviewed</span>
                </>
              ) : (
                <>
                  <Sparkles size={13} />
                  <span>AI Generated Phrase</span>
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
        </div>

        {/* Kannada Script Hero Box */}
        <div className="kannada-hero-block">
          <div className="kannada-main-script kannada-text" id="kannada-phrase-text">
            {result.kannada}
          </div>

          <div className="kannada-transliteration">
            {result.transliteration}
          </div>

          <div className="kannada-english-meaning">
            <strong>Meaning:</strong> {result.english}
          </div>

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
            padding: '8px 12px',
            backgroundColor: 'var(--color-gold-light)',
            border: '1px solid #E8D39E',
            borderRadius: 'var(--radius-md)',
            color: 'var(--color-gold)',
            fontSize: '12.5px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Info size={15} />
            <span>{audioNotice}</span>
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

          {/* Listen Button */}
          <button
            type="button"
            className="btn-secondary"
            onClick={handleSpeak}
            id="btn-speak-phrase"
            title="Listen to pronunciation"
          >
            <Volume2 size={16} color={isSpeaking ? 'var(--color-forest)' : 'currentColor'} />
            <span>{isSpeaking ? 'Playing...' : 'Pronounce'}</span>
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
