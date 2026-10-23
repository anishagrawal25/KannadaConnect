import React, { useState, useMemo } from 'react';
import { Search, Bus, Utensils, ShoppingBag, HeartPulse, MessageCircle, Sparkles } from 'lucide-react';
import { SITUATIONS, CURATED_PHRASES } from '../data/phrases';
import PhraseCard from './PhraseCard';

export default function SituationExplorer({
  onShowFullscreen,
  onToggleSave,
  isPhraseSavedFunc
}) {
  const [selectedSituation, setSelectedSituation] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredPhrases = useMemo(() => {
    return CURATED_PHRASES.filter((phrase) => {
      // Category filter
      if (selectedSituation !== 'all' && phrase.situation !== selectedSituation) {
        return false;
      }
      // Search query filter
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      const inEnglish = phrase.english.toLowerCase().includes(q);
      const inKannada = phrase.kannada.includes(q);
      const inTranslit = phrase.transliteration.toLowerCase().includes(q);
      const inKeywords = phrase.intentMatch && phrase.intentMatch.some(m => m.toLowerCase().includes(q));
      return inEnglish || inKannada || inTranslit || inKeywords;
    });
  }, [selectedSituation, searchQuery]);

  return (
    <div className="explore-container">
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-charcoal)', letterSpacing: '-0.02em', marginBottom: '6px' }}>
          Situation Phrasebook
        </h2>
        <p style={{ fontSize: '15px', color: 'var(--color-charcoal-muted)' }}>
          Curated, reviewed Karnataka phrases ready to speak or show across everyday situations.
        </p>
      </div>

      {/* Search Input Bar */}
      <div className="explore-search-bar">
        <Search size={20} color="var(--color-charcoal-subtle)" />
        <input
          type="text"
          id="explore-search-input"
          className="search-input"
          placeholder="Search phrases by English meaning, Kannada script, or transliteration..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search curated phrases"
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

      {/* Situation Category Filter Pills */}
      <div className="situation-selector" role="group" aria-label="Filter by situation">
        {SITUATIONS.map((sit) => (
          <button
            key={sit.id}
            type="button"
            className={`situation-pill ${selectedSituation === sit.id ? 'active' : ''}`}
            onClick={() => setSelectedSituation(sit.id)}
            id={`explore-filter-${sit.id}`}
          >
            {getSituationIcon(sit.icon)}
            <span>{sit.label}</span>
          </button>
        ))}
      </div>

      {/* Results Count & Grid */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '18px', fontSize: '13px', color: 'var(--color-charcoal-subtle)' }}>
        <span>Showing {filteredPhrases.length} reviewed {filteredPhrases.length === 1 ? 'phrase' : 'phrases'}</span>
        <span>Click "Show" to present large full-screen text</span>
      </div>

      {filteredPhrases.length > 0 ? (
        <div className="phrase-grid">
          {filteredPhrases.map((phrase) => (
            <PhraseCard
              key={phrase.id}
              phrase={phrase}
              onShowFullscreen={onShowFullscreen}
              onToggleSave={onToggleSave}
              isSaved={isPhraseSavedFunc(phrase)}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon-box">
            <Search size={28} />
          </div>
          <h3 className="empty-title">No matching phrases found</h3>
          <p className="empty-desc">
            We couldn't find a curated phrase matching "{searchQuery}". Try a different keyword or describe what you want in the Say & Show tab to generate it!
          </p>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => { setSearchQuery(''); setSelectedSituation('all'); }}
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
