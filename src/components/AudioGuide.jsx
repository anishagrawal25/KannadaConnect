import React, { useState, useEffect, useMemo } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Info, 
  Sparkles, 
  Bus, 
  Utensils, 
  ShoppingBag, 
  HeartPulse, 
  MessageCircle, 
  Maximize2, 
  ArrowRight,
  Search,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { SITUATIONS, CURATED_PHRASES } from '../data/phrases';
import { speechService } from '../utils/speech';

export default function AudioGuide({ onShowFullscreen, onNavigateHome }) {
  const [selectedSituation, setSelectedSituation] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [speakingId, setSpeakingId] = useState(null);
  const [hasVoice, setHasVoice] = useState(false);
  const [voiceNotice, setVoiceNotice] = useState(null);

  useEffect(() => {
    // Check Kannada voice availability
    const check = () => {
      setHasVoice(speechService.hasKannadaVoice());
    };
    check();
    const timer = setTimeout(check, 600);
    return () => {
      clearTimeout(timer);
      speechService.stop();
    };
  }, []);

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

  const handleToggleSpeak = (phrase) => {
    if (speakingId === phrase.id) {
      speechService.stop();
      setSpeakingId(null);
      return;
    }

    setSpeakingId(phrase.id);
    setVoiceNotice(null);

    const success = speechService.speak(
      phrase.kannada,
      () => setSpeakingId(null),
      (err) => {
        setSpeakingId(null);
        setVoiceNotice(err?.message || 'Native Kannada audio voice is not installed on this browser.');
      }
    );

    if (!success) {
      setSpeakingId(null);
    }
  };

  const filteredPhrases = useMemo(() => {
    return CURATED_PHRASES.filter((phrase) => {
      if (selectedSituation !== 'all' && phrase.situation !== selectedSituation) {
        return false;
      }
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        phrase.english.toLowerCase().includes(q) ||
        phrase.kannada.includes(q) ||
        phrase.transliteration.toLowerCase().includes(q) ||
        (phrase.pronunciationGuide && phrase.pronunciationGuide.toLowerCase().includes(q))
      );
    });
  }, [selectedSituation, searchQuery]);

  return (
    <div className="audio-guide-container" id="audio-guide-screen">
      {/* Header & Pronunciation Explanation */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span className="badge-source">
            <Volume2 size={13} />
            <span>Pronunciation Studio</span>
          </span>
          <span style={{ fontSize: '13px', color: 'var(--color-charcoal-subtle)' }}>• Audio & Cadence Guide</span>
        </div>

        <h2 style={{ fontSize: '30px', fontWeight: 800, color: 'var(--color-charcoal)', letterSpacing: '-0.02em', marginBottom: '8px' }}>
          Kannada Spoken Audio Guide
        </h2>
        <p style={{ fontSize: '16px', color: 'var(--color-charcoal-muted)', maxWidth: '720px', lineHeight: 1.55 }}>
          Master the cadence and phonetic pronunciation of everyday Kannada. Listen to authentic pronunciations, study syllable breaks, and practice saying each sentence naturally.
        </p>
      </div>

      {/* Voice Engine Status Banner */}
      <div style={{
        padding: '16px 20px',
        backgroundColor: hasVoice ? 'var(--color-forest-light)' : 'var(--color-sand)',
        border: `1px solid ${hasVoice ? 'var(--color-sage)' : 'var(--color-border)'}`,
        borderRadius: 'var(--radius-lg)',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: '16px',
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          {hasVoice ? (
            <CheckCircle2 size={20} color="var(--color-forest)" style={{ flexShrink: 0, marginTop: '2px' }} />
          ) : (
            <AlertCircle size={20} color="var(--color-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
          )}
          <div>
            <div style={{ fontSize: '14.5px', fontWeight: 700, color: hasVoice ? 'var(--color-forest)' : 'var(--color-charcoal)', marginBottom: '3px' }}>
              {hasVoice ? 'Kannada Voice Engine Ready (kn-IN)' : 'Voice Notice: Phonetic Syllables Available'}
            </div>
            <div style={{ fontSize: '13.5px', color: 'var(--color-charcoal-muted)', lineHeight: 1.45 }}>
              {hasVoice
                ? 'Your device supports Kannada text-to-speech. Tap "Listen" on any phrase below to hear natural pronunciation.'
                : 'A native Kannada TTS voice was not detected in this browser. Refer to the capitalized syllable guides (e.g. "MY-soo-ri-gay") or open Show Mode to display text to locals.'}
            </div>
          </div>
        </div>

        <button
          type="button"
          className="btn-secondary"
          onClick={onNavigateHome}
          style={{ fontSize: '13px', padding: '7px 14px', whiteSpace: 'nowrap' }}
        >
          <span>Try Say & Show</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Audio Error Alert Notice if triggered */}
      {voiceNotice && (
        <div style={{
          marginBottom: '20px',
          padding: '12px 16px',
          backgroundColor: 'var(--color-gold-light)',
          border: '1px solid #E8D39E',
          borderRadius: 'var(--radius-md)',
          color: 'var(--color-gold)',
          fontSize: '13.5px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Info size={16} />
            <span>{voiceNotice}</span>
          </div>
          <button
            type="button"
            onClick={() => setVoiceNotice(null)}
            style={{ background: 'none', border: 'none', color: 'var(--color-gold)', cursor: 'pointer', fontWeight: 600, fontSize: '12px' }}
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Search Input Filter */}
      <div className="explore-search-bar" style={{ marginBottom: '18px' }}>
        <Search size={18} color="var(--color-charcoal-subtle)" />
        <input
          type="text"
          id="audio-search-input"
          className="search-input"
          placeholder="Filter audio phrases by English intent, syllables, or Kannada..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Filter audio guide phrases"
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

      {/* Situation Filter Pills */}
      <div className="situation-selector" role="group" aria-label="Filter audio phrases by category">
        {SITUATIONS.map((sit) => (
          <button
            key={sit.id}
            type="button"
            className={`situation-pill ${selectedSituation === sit.id ? 'active' : ''}`}
            onClick={() => setSelectedSituation(sit.id)}
            id={`audio-sit-${sit.id}`}
          >
            {getSituationIcon(sit.icon)}
            <span>{sit.label}</span>
          </button>
        ))}
      </div>

      {/* Phrases List with Audio Controls */}
      <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {filteredPhrases.length > 0 ? (
          filteredPhrases.map((phrase) => {
            const isPlaying = speakingId === phrase.id;
            return (
              <div 
                key={phrase.id} 
                className="phrase-card"
                style={{
                  padding: '20px 24px',
                  borderLeft: isPlaying ? '4px solid var(--color-forest)' : '1px solid var(--color-border)',
                  backgroundColor: isPlaying ? 'var(--color-sage-light)' : 'var(--color-white)',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-charcoal-subtle)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {phrase.situationLabel || phrase.situation}
                    </span>

                    {phrase.pronunciationGuide && (
                      <span className="kannada-phonetic-tip" style={{ margin: 0 }}>
                        Cadence: {phrase.pronunciationGuide}
                      </span>
                    )}
                  </div>

                  <div className="kannada-text" style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-forest-dark)', lineHeight: 1.35 }}>
                    {phrase.kannada}
                  </div>

                  <div style={{ fontSize: '15.5px', fontWeight: 600, color: 'var(--color-charcoal)' }}>
                    "{phrase.transliteration}"
                  </div>

                  <div style={{ fontSize: '14px', color: 'var(--color-charcoal-muted)' }}>
                    <strong>English:</strong> {phrase.english}
                  </div>

                  {phrase.contextNote && (
                    <div style={{ fontSize: '12.5px', color: 'var(--color-charcoal-subtle)', fontStyle: 'italic', marginTop: '2px' }}>
                      💡 {phrase.contextNote}
                    </div>
                  )}
                </div>

                {/* Actions Toolbar */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--color-border)', paddingTop: '14px', marginTop: '12px' }}>
                  <button
                    type="button"
                    className={`btn-secondary ${isPlaying ? 'active' : ''}`}
                    onClick={() => handleToggleSpeak(phrase)}
                    id={`btn-audio-speak-${phrase.id}`}
                    style={{
                      padding: '8px 16px',
                      fontSize: '13.5px',
                      backgroundColor: isPlaying ? 'var(--color-terracotta-light)' : 'var(--color-forest-light)',
                      color: isPlaying ? 'var(--color-terracotta)' : 'var(--color-forest)',
                      borderColor: isPlaying ? '#E8B9AA' : 'var(--color-sage)'
                    }}
                  >
                    {isPlaying ? (
                      <>
                        <VolumeX size={16} />
                        <span>Stop Audio</span>
                      </>
                    ) : (
                      <>
                        <Volume2 size={16} />
                        <span>Listen Aloud</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => onShowFullscreen(phrase)}
                    style={{ padding: '8px 14px', fontSize: '13px' }}
                    title="Open large full-screen show mode"
                  >
                    <Maximize2 size={14} />
                    <span>Show Large</span>
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="empty-state">
            <Search size={32} color="var(--color-charcoal-subtle)" style={{ margin: '0 auto 12px' }} />
            <h3 className="empty-title">No phrases matched your search</h3>
            <p className="empty-desc">
              Try searching for common words like "bus", "coffee", "ticket", or "slowly".
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
    </div>
  );
}
