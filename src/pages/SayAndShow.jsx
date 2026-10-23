import React, { useState } from 'react';
import IntentInput from '../components/IntentInput';
import PhraseResult from '../components/PhraseResult';
import ReplyList from '../components/ReplyList';
import ShowMode from '../components/ShowMode';
import { generateKannadaPhrase } from '../services/aiService';
import { isPhraseSaved } from '../utils/storage';

export default function SayAndShow({
  onToggleSave
}) {
  const [intent, setIntent] = useState('');
  const [selectedSituation, setSelectedSituation] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentResult, setCurrentResult] = useState(null);
  const [showModePhrase, setShowModePhrase] = useState(null);

  const handleGenerate = async (isAlternative = false) => {
    if (!intent.trim()) {
      setError('Please describe what you want to say in English.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await generateKannadaPhrase({
        intent: intent.trim(),
        situation: selectedSituation,
        isAlternative
      });

      setCurrentResult(result);

      // Smooth scroll down to result card on mobile
      setTimeout(() => {
        const el = document.getElementById('phrase-result-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);

    } catch (err) {
      setError(err.message || 'Could not generate translation. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Hero Header */}
      <section className="hero-section" style={{ paddingTop: '20px' }}>
        <div className="hero-tag">
          <span style={{ fontSize: '13px' }}>ಕ</span>
          <span>Communication Assistant</span>
        </div>
        <h1 className="hero-title">
          Know what to say.<br />Even when it’s Kannada.
        </h1>
        <p className="hero-subtitle">
          Describe what you need in English. Get authentic Kannada you can say, hear, or show to bus conductors, auto drivers, shopkeepers, and doctors.
        </p>

        {/* Primary Input Panel */}
        <IntentInput
          intent={intent}
          setIntent={setIntent}
          selectedSituation={selectedSituation}
          setSelectedSituation={setSelectedSituation}
          onGenerate={() => handleGenerate(false)}
          isLoading={isLoading}
          error={error}
        />
      </section>

      {/* Generated Phrase Result & Replies */}
      {currentResult && (
        <>
          <PhraseResult
            result={currentResult}
            onShowFullscreen={(p) => setShowModePhrase(p)}
            onToggleSave={onToggleSave}
            isSaved={isPhraseSaved(currentResult)}
            onRephrase={() => handleGenerate(true)}
            isLoading={isLoading}
          />

          {/* "What they might say" - Contextual Replies */}
          <ReplyList
            replies={currentResult.replies}
          />
        </>
      )}

      {/* How KannadaConnect Works (Shown when no result yet) */}
      {!currentResult && (
        <section style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid var(--color-border)' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-charcoal-subtle)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '16px' }}>
            The KannadaConnect Journey
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            <div style={{ padding: '20px', background: 'var(--color-white)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-full)', background: 'var(--color-forest-light)', color: 'var(--color-forest)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, marginBottom: '12px' }}>
                1
              </div>
              <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '6px' }}>Describe in English</h4>
              <p style={{ fontSize: '13.5px', color: 'var(--color-charcoal-muted)' }}>
                Type naturally or tap the microphone to dictate your English intent.
              </p>
            </div>

            <div style={{ padding: '20px', background: 'var(--color-white)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-full)', background: 'var(--color-forest-light)', color: 'var(--color-forest)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, marginBottom: '12px' }}>
                2
              </div>
              <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '6px' }}>Say, Hear, or Show</h4>
              <p style={{ fontSize: '13.5px', color: 'var(--color-charcoal-muted)' }}>
                Pronounce it with phonetic guidance, play crisp audio, or open high-contrast Show Mode to display on your screen.
              </p>
            </div>

            <div style={{ padding: '20px', background: 'var(--color-white)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-full)', background: 'var(--color-forest-light)', color: 'var(--color-forest)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, marginBottom: '12px' }}>
                3
              </div>
              <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '6px' }}>Understand What's Next</h4>
              <p style={{ fontSize: '13.5px', color: 'var(--color-charcoal-muted)' }}>
                Read predicted responses you might hear back in Kannada so you are never caught off guard.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Show Mode Modal */}
      {showModePhrase && (
        <ShowMode
          phrase={showModePhrase}
          onClose={() => setShowModePhrase(null)}
        />
      )}
    </>
  );
}
