import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Volume2, 
  VolumeX, 
  Bookmark, 
  BookmarkCheck, 
  Copy, 
  Check, 
  Bus, 
  Utensils, 
  ShoppingBag, 
  HeartPulse, 
  MessageCircle, 
  Sparkles,
  BookOpen
} from 'lucide-react';
import { VOCAB_CATEGORIES, VOCABULARY_LIST } from '../data/vocabulary';
import { speechService } from '../utils/speech';
import { getSavedWords, saveWord, removeSavedWord, isWordSaved } from '../utils/storage';

export default function Vocabulary() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [speakingId, setSpeakingId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [savedWords, setSavedWords] = useState(() => getSavedWords());
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Bus': return <Bus size={14} />;
      case 'Utensils': return <Utensils size={14} />;
      case 'ShoppingBag': return <ShoppingBag size={14} />;
      case 'HeartPulse': return <HeartPulse size={14} />;
      case 'MessageCircle': return <MessageCircle size={14} />;
      default: return <Sparkles size={14} />;
    }
  };

  // Audio Playback
  const handleSpeak = (word) => {
    if (speakingId === word.id) {
      speechService.stop();
      setSpeakingId(null);
      return;
    }

    setSpeakingId(word.id);
    speechService.speak(
      word.kannada,
      () => setSpeakingId(null),
      () => setSpeakingId(null)
    );
  };

  // Toggle Save Word for Revision
  const handleToggleSave = (word) => {
    if (isWordSaved(word)) {
      const updated = removeSavedWord(word.id || word.kannada);
      setSavedWords(updated);
    } else {
      const updated = saveWord(word);
      setSavedWords(updated);
    }
  };

  // Copy Word Script
  const handleCopy = async (word) => {
    try {
      await navigator.clipboard.writeText(word.kannada);
      setCopiedId(word.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      setCopiedId(null);
    }
  };

  // Filtered Vocabulary List
  const filteredWords = useMemo(() => {
    return VOCABULARY_LIST.filter((w) => {
      // Saved filter
      if (showSavedOnly && !savedWords.some(sw => sw.id === w.id || sw.kannada === w.kannada)) {
        return false;
      }
      // Category filter
      if (selectedCategory !== 'all' && w.category !== selectedCategory) {
        return false;
      }
      // Search filter
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      const inKannada = w.kannada.includes(q);
      const inTranslit = w.transliteration.toLowerCase().includes(q);
      const inEnglish = w.english.toLowerCase().includes(q);
      const inExample = w.example && (
        w.example.kannada.includes(q) || 
        w.example.transliteration.toLowerCase().includes(q) ||
        w.example.english.toLowerCase().includes(q)
      );
      return inKannada || inTranslit || inEnglish || inExample;
    });
  }, [selectedCategory, searchQuery, showSavedOnly, savedWords]);

  return (
    <div className="vocabulary-page" style={{ paddingTop: '20px' }}>
      {/* Header */}
      <section className="hero-section" style={{ paddingTop: '10px', paddingBottom: '20px' }}>
        <div className="hero-tag">
          <BookOpen size={14} />
          <span>Practical Vocabulary</span>
        </div>
        <h1 className="hero-title">
          Everyday Words for Karnataka.
        </h1>
        <p className="hero-subtitle">
          Essential vocabulary you actually hear and speak across transport, markets, restaurants, and health.
        </p>

        {/* Search & Saved Toggle Row */}
        <div style={{ maxWidth: '640px', margin: '20px auto 0', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <div className="explore-search-bar" style={{ flex: 1, minWidth: '260px' }}>
            <Search size={18} color="var(--color-charcoal-subtle)" />
            <input
              type="text"
              id="vocab-search-input"
              className="search-input"
              placeholder="Search by word, transliteration, or English meaning..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search practical vocabulary"
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

          <button
            type="button"
            className={`btn-secondary ${showSavedOnly ? 'active' : ''}`}
            onClick={() => setShowSavedOnly(!showSavedOnly)}
            style={{
              padding: '10px 16px',
              backgroundColor: showSavedOnly ? 'var(--color-forest-light)' : 'var(--color-white)',
              borderColor: showSavedOnly ? 'var(--color-forest)' : 'var(--color-border)',
              color: showSavedOnly ? 'var(--color-forest)' : 'var(--color-charcoal)',
              fontWeight: 600
            }}
          >
            <Bookmark size={15} />
            <span>Saved Words ({savedWords.length})</span>
          </button>
        </div>

        {/* Category Pills */}
        <div className="situation-selector" role="group" aria-label="Filter vocabulary by category" style={{ marginTop: '16px' }}>
          {VOCAB_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`situation-pill ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
              id={`vocab-cat-${cat.id}`}
            >
              {getCategoryIcon(cat.icon)}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Results Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px 0 16px', fontSize: '13px', color: 'var(--color-charcoal-subtle)' }}>
        <span>Showing {filteredWords.length} practical {filteredWords.length === 1 ? 'word' : 'words'}</span>
        <span>Tap Listen to practice native pronunciation</span>
      </div>

      {/* Vocabulary Cards Grid */}
      {filteredWords.length > 0 ? (
        <div className="phrase-grid">
          {filteredWords.map((word) => {
            const isPlaying = speakingId === word.id;
            const isSaved = savedWords.some(sw => sw.id === word.id || sw.kannada === word.kannada);
            const isCopied = copiedId === word.id;

            return (
              <div key={word.id} className="phrase-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  {/* Category and Save button */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-charcoal-subtle)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      {word.categoryLabel}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleToggleSave(word)}
                      className="btn-icon-xs"
                      title={isSaved ? "Remove from saved words" : "Save word for revision"}
                      style={{
                        backgroundColor: isSaved ? 'var(--color-gold-light)' : 'transparent',
                        borderColor: isSaved ? '#E8D39E' : 'var(--color-border)',
                        color: isSaved ? 'var(--color-gold)' : 'var(--color-charcoal-subtle)'
                      }}
                    >
                      {isSaved ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
                    </button>
                  </div>

                  {/* Kannada Script Hero */}
                  <div className="kannada-text" style={{ fontSize: '26px', fontWeight: 700, color: 'var(--color-forest-dark)', lineHeight: 1.25, marginBottom: '4px' }}>
                    {word.kannada}
                  </div>

                  {/* Transliteration */}
                  <div style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--color-forest)', marginBottom: '4px' }}>
                    "{word.transliteration}"
                  </div>

                  {/* English Meaning */}
                  <div style={{ fontSize: '14px', color: 'var(--color-charcoal)', fontWeight: 500, marginBottom: '14px' }}>
                    {word.english}
                  </div>

                  {/* Practical Example Box */}
                  {word.example && (
                    <div style={{
                      padding: '10px 12px',
                      backgroundColor: 'var(--color-warm-ivory)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '12.5px'
                    }}>
                      <div style={{ fontWeight: 700, color: 'var(--color-charcoal-subtle)', fontSize: '10.5px', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '4px' }}>
                        Practical Example
                      </div>
                      <div className="kannada-text" style={{ fontWeight: 600, color: 'var(--color-forest-dark)', fontSize: '14px', marginBottom: '2px' }}>
                        {word.example.kannada}
                      </div>
                      <div style={{ color: 'var(--color-charcoal)', fontWeight: 500, marginBottom: '2px' }}>
                        "{word.example.transliteration}"
                      </div>
                      <div style={{ color: 'var(--color-charcoal-muted)' }}>
                        {word.example.english}
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Action Footer */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--color-border)', paddingTop: '12px', marginTop: '14px' }}>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => handleSpeak(word)}
                    style={{
                      padding: '6px 12px',
                      fontSize: '12.5px',
                      backgroundColor: isPlaying ? 'var(--color-terracotta-light)' : 'var(--color-white)',
                      borderColor: isPlaying ? '#E8B9AA' : 'var(--color-border)',
                      color: isPlaying ? 'var(--color-terracotta)' : 'var(--color-forest)'
                    }}
                  >
                    {isPlaying ? <VolumeX size={14} /> : <Volume2 size={14} />}
                    <span>{isPlaying ? 'Stop' : 'Listen'}</span>
                  </button>

                  <button
                    type="button"
                    className="btn-icon-xs"
                    onClick={() => handleCopy(word)}
                    title={isCopied ? "Copied" : "Copy Kannada word"}
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
          <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '6px' }}>No vocabulary words found</h3>
          <p style={{ fontSize: '14px', color: 'var(--color-charcoal-muted)', maxWidth: '420px', margin: '0 auto 16px' }}>
            {showSavedOnly 
              ? "You haven't saved any vocabulary words yet. Click the bookmark icon on any word to save it for revision."
              : "Try adjusting your search terms or selecting a different category filter above."}
          </p>
          {(searchQuery || selectedCategory !== 'all' || showSavedOnly) && (
            <button
              type="button"
              className="btn-secondary"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setShowSavedOnly(false);
              }}
            >
              Reset Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}
