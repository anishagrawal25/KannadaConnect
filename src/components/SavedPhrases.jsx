import React from 'react';
import { Bookmark, Trash2, Maximize2, Volume2, Copy, Check, ArrowRight } from 'lucide-react';
import { speechService } from '../utils/speech';

export default function SavedPhrases({
  savedPhrases,
  onRemove,
  onShowFullscreen,
  onNavigateHome
}) {
  const [copiedId, setCopiedId] = React.useState(null);
  const [speakingId, setSpeakingId] = React.useState(null);

  const handleCopy = async (kannadaText, id) => {
    try {
      await navigator.clipboard.writeText(kannadaText);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      setCopiedId(null);
    }
  };

  const handleSpeak = (kannadaText, id) => {
    if (speakingId === id) {
      speechService.stop();
      setSpeakingId(null);
      return;
    }
    setSpeakingId(id);
    speechService.speak(
      kannadaText,
      () => setSpeakingId(null),
      () => setSpeakingId(null)
    );
  };

  return (
    <div className="explore-container">
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-charcoal)', letterSpacing: '-0.02em', marginBottom: '6px' }}>
            Saved Phrases
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--color-charcoal-muted)' }}>
            Your personal collection of handy Kannada sentences stored offline in your browser.
          </p>
        </div>

        {savedPhrases.length > 0 && (
          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-forest)', background: 'var(--color-forest-light)', padding: '6px 14px', borderRadius: 'var(--radius-full)' }}>
            {savedPhrases.length} {savedPhrases.length === 1 ? 'phrase' : 'phrases'} saved
          </div>
        )}
      </div>

      {savedPhrases.length > 0 ? (
        <div className="phrase-grid">
          {savedPhrases.map((phrase, idx) => {
            const itemKey = phrase.id || `saved-${idx}`;
            return (
              <div key={itemKey} className="phrase-card">
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-charcoal-subtle)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      {phrase.situationLabel || phrase.situation || 'Custom'}
                    </span>
                    <button
                      type="button"
                      className="btn-icon-xs"
                      onClick={() => onRemove(phrase.id || phrase.kannada)}
                      title="Remove from saved"
                      style={{ color: 'var(--color-terracotta)', borderColor: '#F2D3C8' }}
                      aria-label="Remove phrase"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>

                  <div className="kannada-text" style={{ fontSize: '22px', fontWeight: 700, color: 'var(--color-forest-dark)', lineHeight: 1.35, marginBottom: '6px' }}>
                    {phrase.kannada}
                  </div>

                  <div style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--color-charcoal)', marginBottom: '4px' }}>
                    {phrase.transliteration}
                  </div>

                  <div style={{ fontSize: '13.5px', color: 'var(--color-charcoal-muted)' }}>
                    {phrase.english}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--color-border)', paddingTop: '12px', marginTop: '8px' }}>
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => onShowFullscreen(phrase)}
                    style={{ padding: '6px 14px', fontSize: '13px' }}
                    title="Show large full-screen text"
                  >
                    <Maximize2 size={13} />
                    <span>Show</span>
                  </button>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <button
                      type="button"
                      className="btn-icon-xs"
                      onClick={() => handleSpeak(phrase.kannada, itemKey)}
                      title="Listen"
                      aria-label="Listen"
                    >
                      <Volume2 size={14} color={speakingId === itemKey ? 'var(--color-forest)' : 'currentColor'} />
                    </button>

                    <button
                      type="button"
                      className="btn-icon-xs"
                      onClick={() => handleCopy(phrase.kannada, itemKey)}
                      title="Copy"
                      aria-label="Copy"
                    >
                      {copiedId === itemKey ? <Check size={14} color="var(--color-forest)" /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon-box">
            <Bookmark size={28} />
          </div>
          <h3 className="empty-title">No saved phrases yet</h3>
          <p className="empty-desc">
            Whenever you generate a Kannada phrase or browse the phrasebook, tap the bookmark icon to save it here for fast offline access.
          </p>
          <button
            type="button"
            className="btn-primary"
            onClick={onNavigateHome}
          >
            <span>Try Generating a Phrase</span>
            <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
