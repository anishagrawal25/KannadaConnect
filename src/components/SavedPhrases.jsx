import React, { useState } from 'react';
import { 
  Bookmark, 
  Trash2, 
  Maximize2, 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  Search,
  MessageSquare,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { speechService } from '../utils/speech';
import { getSavedWords, removeSavedWord } from '../utils/storage';
import { useNavigate } from 'react-router-dom';

export default function SavedPhrases({
  savedPhrases = [],
  onRemove,
  onShowFullscreen
}) {
  const [activeTab, setActiveTab] = useState('phrases'); // 'phrases' | 'words'
  const [savedWords, setSavedWords] = useState(() => getSavedWords());
  const [copiedId, setCopiedId] = useState(null);
  const [speakingId, setSpeakingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

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

  const handleRemoveWord = (word) => {
    const updated = removeSavedWord(word.id || word.kannada);
    setSavedWords(updated);
  };

  const filteredPhrases = savedPhrases.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      (p.english && p.english.toLowerCase().includes(q)) ||
      (p.kannada && p.kannada.includes(q)) ||
      (p.transliteration && p.transliteration.toLowerCase().includes(q))
    );
  });

  const filteredWords = savedWords.filter((w) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      (w.english && w.english.toLowerCase().includes(q)) ||
      (w.kannada && w.kannada.includes(q)) ||
      (w.transliteration && w.transliteration.toLowerCase().includes(q))
    );
  });

  return (
    <div className="saved-container" id="saved-phrases-screen" style={{ paddingTop: '20px' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div className="hero-tag">
            <Bookmark size={14} />
            <span>Saved Collection</span>
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-charcoal)', letterSpacing: '-0.02em', marginBottom: '6px' }}>
            Saved for Revision
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--color-charcoal-muted)' }}>
            Your bookmarked everyday expressions and vocabulary stored offline for revision.
          </p>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', gap: '8px', background: 'var(--color-warm-ivory)', padding: '4px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
          <button
            type="button"
            className={`btn-secondary ${activeTab === 'phrases' ? 'active' : ''}`}
            onClick={() => setActiveTab('phrases')}
            style={{
              padding: '6px 14px',
              fontSize: '13px',
              backgroundColor: activeTab === 'phrases' ? 'var(--color-white)' : 'transparent',
              borderColor: activeTab === 'phrases' ? 'var(--color-forest)' : 'transparent',
              color: activeTab === 'phrases' ? 'var(--color-forest)' : 'var(--color-charcoal)'
            }}
          >
            <MessageSquare size={14} />
            <span>Conversations ({savedPhrases.length})</span>
          </button>

          <button
            type="button"
            className={`btn-secondary ${activeTab === 'words' ? 'active' : ''}`}
            onClick={() => setActiveTab('words')}
            style={{
              padding: '6px 14px',
              fontSize: '13px',
              backgroundColor: activeTab === 'words' ? 'var(--color-white)' : 'transparent',
              borderColor: activeTab === 'words' ? 'var(--color-forest)' : 'transparent',
              color: activeTab === 'words' ? 'var(--color-forest)' : 'var(--color-charcoal)'
            }}
          >
            <BookOpen size={14} />
            <span>Vocabulary ({savedWords.length})</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      {(savedPhrases.length > 2 || savedWords.length > 2) && (
        <div className="explore-search-bar" style={{ marginBottom: '20px' }}>
          <Search size={18} color="var(--color-charcoal-subtle)" />
          <input
            type="text"
            className="search-input"
            placeholder={`Search within saved ${activeTab === 'phrases' ? 'conversations' : 'vocabulary'}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Filter saved collection"
          />
          {searchQuery && (
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setSearchQuery('')}
              style={{ padding: '3px 8px', fontSize: '12px' }}
            >
              Clear
            </button>
          )}
        </div>
      )}

      {/* Tab: Saved Conversation Phrases */}
      {activeTab === 'phrases' && (
        <>
          {filteredPhrases.length > 0 ? (
            <div className="phrase-grid">
              {filteredPhrases.map((phrase, idx) => {
                const itemKey = phrase.id || `saved-${idx}`;
                const isPlaying = speakingId === itemKey;
                const isCopied = copiedId === itemKey;

                return (
                  <div key={itemKey} className="phrase-card">
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-charcoal-subtle)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          {phrase.situationLabel || phrase.situation || 'Conversation'}
                        </span>
                        <button
                          type="button"
                          className="btn-icon-xs"
                          onClick={() => onRemove(phrase)}
                          title="Remove from saved"
                          style={{ color: 'var(--color-charcoal-subtle)' }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>

                      <div className="kannada-text" style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-forest-dark)', lineHeight: 1.35, marginBottom: '6px' }}>
                        {phrase.kannada}
                      </div>

                      {phrase.transliteration && (
                        <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-charcoal)', marginBottom: '4px' }}>
                          "{phrase.transliteration}"
                        </div>
                      )}

                      <div style={{ fontSize: '13.5px', color: 'var(--color-charcoal-muted)' }}>
                        {phrase.english || phrase.originalIntent}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--color-border)', paddingTop: '12px', marginTop: '12px' }}>
                      {onShowFullscreen && (
                        <button
                          type="button"
                          className="btn-outline-forest"
                          onClick={() => onShowFullscreen(phrase)}
                          style={{ padding: '5px 12px', fontSize: '12px' }}
                        >
                          <Maximize2 size={13} />
                          <span>Show</span>
                        </button>
                      )}

                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <button
                          type="button"
                          className="btn-icon-xs"
                          onClick={() => handleCopy(phrase.kannada, itemKey)}
                          title={isCopied ? "Copied" : "Copy Kannada"}
                        >
                          {isCopied ? <Check size={14} color="var(--color-forest)" /> : <Copy size={14} />}
                        </button>

                        <button
                          type="button"
                          className="btn-icon-xs"
                          onClick={() => handleSpeak(phrase.kannada, itemKey)}
                          title={isPlaying ? "Stop audio" : "Listen audio"}
                          style={{
                            backgroundColor: isPlaying ? 'var(--color-terracotta-light)' : 'transparent',
                            borderColor: isPlaying ? 'var(--color-terracotta)' : 'var(--color-border)'
                          }}
                        >
                          {isPlaying ? <VolumeX size={14} color="var(--color-terracotta)" /> : <Volume2 size={14} />}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="empty-state-box" style={{ textAlign: 'center', padding: '48px 20px', background: 'var(--color-white)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
              <Bookmark size={36} color="var(--color-charcoal-subtle)" style={{ margin: '0 auto 12px' }} />
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '6px' }}>No saved conversations</h3>
              <p style={{ fontSize: '14px', color: 'var(--color-charcoal-muted)', maxWidth: '420px', margin: '0 auto 20px' }}>
                Tap the bookmark icon on any conversation expression in the Conversations hub to save it for quick revision.
              </p>
              <button
                type="button"
                className="btn-primary"
                onClick={() => navigate('/conversations')}
                style={{ padding: '10px 22px', fontSize: '14px' }}
              >
                <span>Browse Conversations</span>
                <ArrowRight size={15} />
              </button>
            </div>
          )}
        </>
      )}

      {/* Tab: Saved Vocabulary Words */}
      {activeTab === 'words' && (
        <>
          {filteredWords.length > 0 ? (
            <div className="phrase-grid">
              {filteredWords.map((word) => {
                const isPlaying = speakingId === word.id;
                const isCopied = copiedId === word.id;

                return (
                  <div key={word.id} className="phrase-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-charcoal-subtle)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          {word.categoryLabel || 'Vocabulary'}
                        </span>
                        <button
                          type="button"
                          className="btn-icon-xs"
                          onClick={() => handleRemoveWord(word)}
                          title="Remove from saved words"
                          style={{ color: 'var(--color-charcoal-subtle)' }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>

                      <div className="kannada-text" style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-forest-dark)', lineHeight: 1.3, marginBottom: '4px' }}>
                        {word.kannada}
                      </div>

                      <div style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--color-forest)', marginBottom: '4px' }}>
                        "{word.transliteration}"
                      </div>

                      <div style={{ fontSize: '13.5px', color: 'var(--color-charcoal)', fontWeight: 500, marginBottom: '10px' }}>
                        {word.english}
                      </div>

                      {word.example && (
                        <div style={{ padding: '8px 10px', backgroundColor: 'var(--color-warm-ivory)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontSize: '12px' }}>
                          <div className="kannada-text" style={{ fontWeight: 600, color: 'var(--color-forest-dark)' }}>
                            {word.example.kannada}
                          </div>
                          <div style={{ color: 'var(--color-charcoal-muted)' }}>
                            "{word.example.transliteration}" • {word.example.english}
                          </div>
                        </div>
                      )}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--color-border)', paddingTop: '10px', marginTop: '12px' }}>
                      <button
                        type="button"
                        className="btn-secondary"
                        onClick={() => handleSpeak(word.kannada, word.id)}
                        style={{ padding: '5px 12px', fontSize: '12px' }}
                      >
                        {isPlaying ? <VolumeX size={13} /> : <Volume2 size={13} />}
                        <span>{isPlaying ? 'Stop' : 'Listen'}</span>
                      </button>

                      <button
                        type="button"
                        className="btn-icon-xs"
                        onClick={() => handleCopy(word.kannada, word.id)}
                        title={isCopied ? "Copied" : "Copy word"}
                      >
                        {isCopied ? <Check size={14} color="var(--color-forest)" /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="empty-state-box" style={{ textAlign: 'center', padding: '48px 20px', background: 'var(--color-white)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
              <BookOpen size={36} color="var(--color-charcoal-subtle)" style={{ margin: '0 auto 12px' }} />
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '6px' }}>No saved vocabulary words</h3>
              <p style={{ fontSize: '14px', color: 'var(--color-charcoal-muted)', maxWidth: '420px', margin: '0 auto 20px' }}>
                Tap the bookmark icon on any vocabulary word in the Vocabulary Explorer to save it for quick revision.
              </p>
              <button
                type="button"
                className="btn-primary"
                onClick={() => navigate('/vocabulary')}
                style={{ padding: '10px 22px', fontSize: '14px' }}
              >
                <span>Browse Vocabulary</span>
                <ArrowRight size={15} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
