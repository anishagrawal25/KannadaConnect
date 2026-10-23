import React, { useState } from 'react';
import { 
  Bookmark, 
  Trash2, 
  Maximize2, 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  Compass, 
  Sparkles,
  Search
} from 'lucide-react';
import { speechService } from '../utils/speech';

export default function SavedPhrases({
  savedPhrases,
  onRemove,
  onShowFullscreen,
  onNavigateHome,
  onNavigateExplore
}) {
  const [copiedId, setCopiedId] = useState(null);
  const [speakingId, setSpeakingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredSaved = savedPhrases.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      (p.english && p.english.toLowerCase().includes(q)) ||
      (p.kannada && p.kannada.includes(q)) ||
      (p.transliteration && p.transliteration.toLowerCase().includes(q))
    );
  });

  return (
    <div className="saved-container" id="saved-phrases-screen">
      {/* Header */}
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
          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-forest)', background: 'var(--color-forest-light)', padding: '6px 14px', borderRadius: 'var(--radius-full)', border: '1px solid var(--color-sage)' }}>
            {savedPhrases.length} {savedPhrases.length === 1 ? 'phrase' : 'phrases'} saved offline
          </div>
        )}
      </div>

      {/* If phrases exist, show search and list */}
      {savedPhrases.length > 0 ? (
        <>
          {savedPhrases.length > 3 && (
            <div className="explore-search-bar" style={{ marginBottom: '20px' }}>
              <Search size={18} color="var(--color-charcoal-subtle)" />
              <input
                type="text"
                className="search-input"
                placeholder="Search within your saved phrases..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Filter saved phrases"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setSearchQuery('')}
                  style={{ padding: '4px 10px', fontSize: '12px' }}
                >
                  Clear
                </button>
              )}
            </div>
          )}

          <div className="phrase-grid">
            {filteredSaved.map((phrase, idx) => {
              const itemKey = phrase.id || `saved-${idx}`;
              const isPlaying = speakingId === itemKey;
              return (
                <div key={itemKey} className="phrase-card">
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-charcoal-subtle)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        {phrase.situationLabel || phrase.situation || 'Saved'}
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
                      "{phrase.transliteration}"
                    </div>

                    <div style={{ fontSize: '13.5px', color: 'var(--color-charcoal-muted)' }}>
                      {phrase.english}
                    </div>

                    {phrase.pronunciationGuide && (
                      <div className="kannada-phonetic-tip" style={{ marginTop: '6px' }}>
                        Cadence: {phrase.pronunciationGuide}
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--color-border)', paddingTop: '12px', marginTop: '10px' }}>
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
                        title={isPlaying ? "Stop audio" : "Listen"}
                        aria-label="Listen"
                      >
                        {isPlaying ? <VolumeX size={14} color="var(--color-terracotta)" /> : <Volume2 size={14} />}
                      </button>

                      <button
                        type="button"
                        className="btn-icon-xs"
                        onClick={() => handleCopy(phrase.kannada, itemKey)}
                        title="Copy Kannada"
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
        </>
      ) : (
        /* INTENTIONAL & USEFUL EMPTY STATE */
        <div className="empty-state">
          <div className="empty-icon-box" style={{ width: '72px', height: '72px' }}>
            <Bookmark size={32} color="var(--color-forest)" />
          </div>
          <h3 className="empty-title" style={{ fontSize: '20px', marginBottom: '8px' }}>
            Your saved collection is empty
          </h3>
          <p className="empty-desc" style={{ maxWidth: '460px', marginBottom: '24px', lineHeight: 1.55 }}>
            Whenever you generate a Kannada phrase or browse the phrasebook, tap the bookmark icon to save it here for fast offline access.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn-primary"
              onClick={onNavigateHome}
              id="empty-saved-try-generator"
            >
              <Sparkles size={16} />
              <span>Generate in Say & Show</span>
            </button>

            {onNavigateExplore && (
              <button
                type="button"
                className="btn-secondary"
                onClick={onNavigateExplore}
                id="empty-saved-browse-explore"
              >
                <Compass size={16} />
                <span>Browse Phrasebook</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
