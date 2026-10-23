import React, { useState } from 'react';
import { Maximize2, Volume2, Copy, Check, Bookmark, BookmarkCheck } from 'lucide-react';
import { speechService } from '../utils/speech';
import { usePreferences } from '../hooks/usePreferences';

export default function PhraseCard({
  phrase,
  onShowFullscreen,
  onToggleSave,
  isSaved
}) {
  const { preferences } = usePreferences();
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(phrase.kannada);
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
    speechService.speak(
      phrase.kannada,
      () => setIsSpeaking(false),
      () => setIsSpeaking(false)
    );
  };

  return (
    <div className="phrase-card">
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-charcoal-subtle)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            {phrase.situationLabel || phrase.situation}
          </span>
          {phrase.verified && (
            <span style={{ fontSize: '11px', color: 'var(--color-forest)', fontWeight: 600, background: 'var(--color-forest-light)', padding: '2px 6px', borderRadius: '4px' }}>
              Reviewed
            </span>
          )}
        </div>

        <div className="kannada-text" style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-forest-dark)', lineHeight: 1.35, marginBottom: '6px' }}>
          {phrase.kannada}
        </div>

        {preferences.showTransliteration !== false && phrase.transliteration && (
          <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-charcoal)', marginBottom: '4px' }}>
            {phrase.transliteration}
          </div>
        )}

        {preferences.showEnglishMeaning !== false && phrase.english && (
          <div style={{ fontSize: '13.5px', color: 'var(--color-charcoal-muted)' }}>
            {phrase.english}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--color-border)', paddingTop: '12px', marginTop: '8px' }}>
        <button
          type="button"
          className="btn-outline-forest"
          onClick={() => onShowFullscreen(phrase)}
          style={{ padding: '6px 12px', fontSize: '13px' }}
          title="Show large text full-screen"
        >
          <Maximize2 size={13} />
          <span>Show</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            type="button"
            className="btn-icon-xs"
            onClick={handleSpeak}
            title="Listen to pronunciation"
            aria-label="Listen"
          >
            <Volume2 size={14} color={isSpeaking ? 'var(--color-forest)' : 'currentColor'} />
          </button>

          <button
            type="button"
            className="btn-icon-xs"
            onClick={handleCopy}
            title="Copy Kannada"
            aria-label="Copy"
          >
            {copied ? <Check size={14} color="var(--color-forest)" /> : <Copy size={14} />}
          </button>

          <button
            type="button"
            className="btn-icon-xs"
            onClick={() => onToggleSave(phrase)}
            title={isSaved ? "Saved" : "Save phrase"}
            aria-label="Save"
          >
            {isSaved ? <BookmarkCheck size={14} color="var(--color-forest)" /> : <Bookmark size={14} />}
          </button>
        </div>
      </div>
    </div>
  );
}
