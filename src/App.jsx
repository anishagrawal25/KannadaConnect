import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import IntentInput from './components/IntentInput';
import PhraseResult from './components/PhraseResult';
import ReplyList from './components/ReplyList';
import SituationExplorer from './components/SituationExplorer';
import AudioGuide from './components/AudioGuide';
import SavedPhrases from './components/SavedPhrases';
import ShowMode from './components/ShowMode';
import { generateKannadaPhrase } from './services/aiService';
import { getSavedPhrases, savePhrase, removeSavedPhrase, isPhraseSaved } from './utils/storage';
import { Sparkles } from 'lucide-react';

export default function App() {
  // Navigation & Screen routing state
  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.replace('#', '');
      if (['landing', 'home', 'explore', 'audio', 'saved'].includes(hash)) {
        return hash;
      }
    }
    return 'landing';
  });

  // Intent & Input State
  const [intent, setIntent] = useState('');
  const [selectedSituation, setSelectedSituation] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Result State
  const [currentResult, setCurrentResult] = useState(null);

  // Saved Phrases
  const [savedPhrases, setSavedPhrases] = useState([]);

  // Full-Screen Show Mode State
  const [showModePhrase, setShowModePhrase] = useState(null);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState(null);

  // Load saved phrases on startup & sync hash
  useEffect(() => {
    const loaded = getSavedPhrases();
    setSavedPhrases(loaded);

    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['landing', 'home', 'explore', 'audio', 'saved'].includes(hash)) {
        setActiveTab(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update hash when activeTab changes
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (typeof window !== 'undefined') {
      window.location.hash = tab;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Main Generation Handler (Describe -> Translate -> Show -> Understand)
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

  // Save / Bookmark Toggle
  const handleToggleSave = (phrase) => {
    if (!phrase) return;

    if (isPhraseSaved(phrase)) {
      const updated = removeSavedPhrase(phrase.id || phrase.kannada);
      setSavedPhrases(updated);
      showToast('Phrase removed from saved collection');
    } else {
      const updated = savePhrase(phrase);
      setSavedPhrases(updated);
      showToast('Phrase saved to offline collection!');
    }
  };

  // Fullscreen Show Mode Handlers
  const handleOpenShowMode = (phrase) => {
    setShowModePhrase(phrase);
  };

  const handleCloseShowMode = () => {
    setShowModePhrase(null);
  };

  return (
    <div className="app-layout">
      {/* Unified Navigation Header across all screens */}
      <Header
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        savedCount={savedPhrases.length}
      />

      <main className="main-content">
        <div className="container">
          {/* SCREEN 1: DEDICATED PUBLIC LANDING PAGE */}
          {activeTab === 'landing' && (
            <LandingPage
              onStartApp={() => handleTabChange('home')}
              onExplore={() => handleTabChange('explore')}
              onOpenAudioGuide={() => handleTabChange('audio')}
              onShowFullscreen={handleOpenShowMode}
            />
          )}

          {/* SCREEN 2: SAY & SHOW (APPLICATION GENERATOR) */}
          {activeTab === 'home' && (
            <>
              {/* Intent Input Hero Section */}
              <section className="hero-section">
                <div className="hero-tag">
                  <span style={{ fontSize: '13px' }}>ಕ</span>
                  <span>Karnataka Communication Assistant</span>
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
                    onShowFullscreen={handleOpenShowMode}
                    onToggleSave={handleToggleSave}
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

              {/* How KannadaConnect Works (Shown when no result generated yet) */}
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
            </>
          )}

          {/* SCREEN 3: SITUATION EXPLORER */}
          {activeTab === 'explore' && (
            <SituationExplorer
              onShowFullscreen={handleOpenShowMode}
              onToggleSave={handleToggleSave}
              isPhraseSavedFunc={isPhraseSaved}
            />
          )}

          {/* SCREEN 4: AUDIO GUIDE */}
          {activeTab === 'audio' && (
            <AudioGuide
              onShowFullscreen={handleOpenShowMode}
              onNavigateHome={() => handleTabChange('home')}
            />
          )}

          {/* SCREEN 5: SAVED PHRASES */}
          {activeTab === 'saved' && (
            <SavedPhrases
              savedPhrases={savedPhrases}
              onRemove={handleToggleSave}
              onShowFullscreen={handleOpenShowMode}
              onNavigateHome={() => handleTabChange('home')}
              onNavigateExplore={() => handleTabChange('explore')}
            />
          )}
        </div>
      </main>

      {/* FULL-SCREEN SHOW MODE MODAL (ACCESSIBLE FROM ANY TAB) */}
      {showModePhrase && (
        <ShowMode
          phrase={showModePhrase}
          onClose={handleCloseShowMode}
        />
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-notice" role="alert">
          <Sparkles size={16} color="var(--color-sage)" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Footer (Standardized across app views) */}
      {activeTab !== 'landing' && (
        <footer className="app-footer">
          <div className="container">
            <p>
              <strong>KannadaConnect</strong> — Empowering real-world communication across Karnataka.
            </p>
            <p style={{ fontSize: '12px', marginTop: '6px', color: 'var(--color-charcoal-subtle)' }}>
              Say it in Kannada. Understand what comes next. Built for residents, students, and travelers.
            </p>
          </div>
        </footer>
      )}
    </div>
  );
}
