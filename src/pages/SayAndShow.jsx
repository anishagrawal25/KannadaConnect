import React, { useState } from 'react';
import IntentInput from '../components/IntentInput';
import PhraseResult from '../components/PhraseResult';
import ReplyList from '../components/ReplyList';
import SituationExplorer from '../components/SituationExplorer';
import ShowMode from '../components/ShowMode';
import { generateKannadaPhrase } from '../services/aiService';
import { isPhraseSaved } from '../utils/storage';
import { MessageSquare } from 'lucide-react';

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

      // Smooth scroll down to result card
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
    <div className="conversations-hub" style={{ paddingTop: '10px' }}>
      {/* Hero Header */}
      <section className="hero-section" style={{ paddingTop: '10px', paddingBottom: '20px' }}>
        <div className="hero-tag">
          <MessageSquare size={14} />
          <span>Everyday Conversations</span>
        </div>
        <h1 className="hero-title">
          Everyday Kannada Conversations.
        </h1>
        <p className="hero-subtitle">
          Describe what you need in English to get natural Kannada, or explore reviewed expressions for transport, food, shopping, and everyday life.
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
        <section style={{ marginBottom: '40px' }}>
          <PhraseResult
            result={currentResult}
            onShowFullscreen={(p) => setShowModePhrase(p)}
            onToggleSave={onToggleSave}
            isSaved={isPhraseSaved(currentResult)}
            onRephrase={() => handleGenerate(true)}
            isLoading={isLoading}
          />

          {/* Contextual Predicted Replies */}
          <ReplyList
            replies={currentResult.replies}
          />
        </section>
      )}

      {/* Reviewed Situational Expressions Phrasebook */}
      <section style={{ marginTop: '36px', paddingTop: '32px', borderTop: '1px solid var(--color-border)' }}>
        <SituationExplorer
          onShowFullscreen={(phrase) => setShowModePhrase(phrase)}
          onToggleSave={onToggleSave}
          isPhraseSavedFunc={isPhraseSaved}
        />
      </section>

      {/* Show Mode Fullscreen Modal */}
      {showModePhrase && (
        <ShowMode
          phrase={showModePhrase}
          onClose={() => setShowModePhrase(null)}
        />
      )}
    </div>
  );
}
