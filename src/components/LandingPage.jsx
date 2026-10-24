import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  Compass, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Bookmark, 
  MessageSquareReply, 
  ShieldCheck,
  Check,
  Copy
} from 'lucide-react';
import { CURATED_PHRASES, SITUATIONS } from '../data/phrases';
import { speechService } from '../utils/speech';

// Curated live everyday scenarios for interactive hero preview
const HERO_SCENARIOS = [
  {
    id: 'bus',
    icon: '🚌',
    tabLabel: 'Bus Route',
    situationName: 'Transport & Directions',
    userPrompt: 'I need to check if this bus goes to Mysuru',
    phrase: CURATED_PHRASES.find(p => p.id === 'trans-01') || CURATED_PHRASES[0]
  },
  {
    id: 'auto',
    icon: '🛺',
    tabLabel: 'Auto Rickshaw',
    situationName: 'Transport & Directions',
    userPrompt: 'I want to ask the auto driver to go by the meter',
    phrase: CURATED_PHRASES.find(p => p.id === 'trans-03') || CURATED_PHRASES[0]
  },
  {
    id: 'coffee',
    icon: '☕',
    tabLabel: 'Darshini Coffee',
    situationName: 'Food & Restaurants',
    userPrompt: 'I want to order two filter coffees with less sugar',
    phrase: CURATED_PHRASES.find(p => p.id === 'food-01') || CURATED_PHRASES[0]
  },
  {
    id: 'upi',
    icon: '🛍️',
    tabLabel: 'UPI & Market',
    situationName: 'Shopping & Payments',
    userPrompt: 'I want to ask the price and if they take UPI QR code',
    phrase: CURATED_PHRASES.find(p => p.id === 'shop-01') || CURATED_PHRASES[0]
  },
  {
    id: 'health',
    icon: '💊',
    tabLabel: 'Pharmacy',
    situationName: 'Health & Pharmacy',
    userPrompt: 'I want to ask the chemist for medicine for a headache',
    phrase: CURATED_PHRASES.find(p => p.id === 'health-01') || CURATED_PHRASES[0]
  }
];

export default function LandingPage({ 
  onStartApp, 
  onExplore, 
  onShowFullscreen 
}) {
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);
  const [demoSpeaking, setDemoSpeaking] = useState(false);
  const [previewSpeakingId, setPreviewSpeakingId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const navigate = useNavigate();

  const handleStart = () => {
    if (onStartApp) onStartApp();
    else navigate('/conversations');
  };

  const handleExplore = () => {
    if (onExplore) onExplore();
    else navigate('/conversations');
  };

  const activeScenario = HERO_SCENARIOS[selectedScenarioIndex];
  const activePhrase = activeScenario.phrase;

  // Hero interactive speech toggle
  const handleHeroSpeak = () => {
    if (demoSpeaking) {
      speechService.stop();
      setDemoSpeaking(false);
      return;
    }
    setDemoSpeaking(true);
    speechService.speak(
      activePhrase.kannada,
      () => setDemoSpeaking(false),
      () => setDemoSpeaking(false)
    );
  };

  // Switch active scenario
  const handleSelectScenario = (index) => {
    if (demoSpeaking) {
      speechService.stop();
      setDemoSpeaking(false);
    }
    setSelectedScenarioIndex(index);
  };

  // Audio handler for curated preview cards
  const handlePreviewSpeak = (phrase) => {
    if (previewSpeakingId === phrase.id) {
      speechService.stop();
      setPreviewSpeakingId(null);
      return;
    }
    setPreviewSpeakingId(phrase.id);
    speechService.speak(
      phrase.kannada,
      () => setPreviewSpeakingId(null),
      () => setPreviewSpeakingId(null)
    );
  };

  // Copy handler
  const handleCopyPhrase = async (phrase) => {
    try {
      await navigator.clipboard.writeText(phrase.kannada);
      setCopiedId(phrase.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      setCopiedId(null);
    }
  };

  // Filter curated phrases for interactive explorer section
  const filteredPhrases = selectedCategory === 'all'
    ? CURATED_PHRASES.slice(0, 6)
    : CURATED_PHRASES.filter(p => p.situation === selectedCategory).slice(0, 6);

  return (
    <div className="landing-page">
      {/* 1. HERO SECTION */}
      <section className="landing-hero-section">
        <div className="container">
          <div className="hero-badge-pill">
            <span style={{ fontFamily: 'var(--font-kannada)', fontWeight: 800, fontSize: '15px' }}>ಕ</span>
            <span>Real-World Communication Assistant for Karnataka</span>
          </div>

          <h1 className="landing-headline">
            A little Kannada<br />goes a long way.
          </h1>

          <p className="landing-subhead">
            Find the words you need for everyday conversations across Karnataka. Say it, show it, and understand what comes next.
          </p>

          {/* Primary CTA Group */}
          <div className="landing-cta-group">
            <button
              type="button"
              className="btn-primary"
              onClick={handleStart}
              id="landing-hero-getstarted-btn"
              style={{ padding: '13px 28px', fontSize: '16px', borderRadius: 'var(--radius-md)' }}
            >
              <span>Get Started</span>
              <ArrowRight size={18} />
            </button>

            <button
              type="button"
              className="btn-secondary"
              onClick={handleExplore}
              id="landing-hero-explore-btn"
              style={{ padding: '13px 24px', fontSize: '15px', borderRadius: 'var(--radius-md)' }}
            >
              <Compass size={17} />
              <span>Explore Phrases</span>
            </button>
          </div>

          {/* REALISTIC INTERACTIVE PRODUCT PREVIEW WITH LIVE SCENARIOS */}
          <div className="landing-preview-container">
            <div style={{ textAlign: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-charcoal-subtle)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Try everyday situations live:
              </span>
            </div>

            {/* Scenario Switcher Tabs */}
            <div className="scenario-switcher-bar">
              {HERO_SCENARIOS.map((sc, idx) => (
                <button
                  key={sc.id}
                  type="button"
                  className={`scenario-pill-btn ${selectedScenarioIndex === idx ? 'active' : ''}`}
                  onClick={() => handleSelectScenario(idx)}
                >
                  <span>{sc.icon}</span>
                  <span>{sc.tabLabel}</span>
                </button>
              ))}
            </div>

            {/* The Live Interactive Preview Card */}
            <div className="landing-preview-card">
              {/* Window Top Bar */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '14px', marginBottom: '18px', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="badge-source curated">
                    <ShieldCheck size={13} />
                    <span>Interactive Live Preview</span>
                  </span>
                  <span style={{ fontSize: '12px', color: 'var(--color-charcoal-subtle)', fontWeight: 500 }}>
                    • {activeScenario.situationName}
                  </span>
                </div>
                <span style={{ fontSize: '12.5px', fontStyle: 'italic', color: 'var(--color-charcoal-muted)' }}>
                  "{activeScenario.userPrompt}"
                </span>
              </div>

              {/* Kannada Main Script Hero */}
              <div className="kannada-hero-block" style={{ margin: 0 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', marginBottom: '12px' }}>
                  <div className="kannada-main-script kannada-text" style={{ fontSize: 'clamp(26px, 4.2vw, 36px)', marginBottom: 0 }}>
                    {activePhrase.kannada}
                  </div>

                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={handleHeroSpeak}
                    style={{
                      padding: '8px 14px',
                      fontSize: '13px',
                      flexShrink: 0,
                      backgroundColor: demoSpeaking ? 'var(--color-terracotta-light)' : 'var(--color-white)',
                      borderColor: demoSpeaking ? '#E8B9AA' : 'var(--color-border)',
                      color: demoSpeaking ? 'var(--color-terracotta)' : 'var(--color-forest)'
                    }}
                    title="Listen to authentic pronunciation"
                  >
                    {demoSpeaking ? (
                      <>
                        <VolumeX size={15} />
                        <span>Stop</span>
                      </>
                    ) : (
                      <>
                        <Volume2 size={15} />
                        <span>Listen</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="kannada-transliteration" style={{ fontSize: '16.5px' }}>
                  "{activePhrase.transliteration}"
                </div>

                <div className="kannada-english-meaning" style={{ fontSize: '14.5px' }}>
                  <strong>Meaning:</strong> {activePhrase.english}
                </div>

                {activePhrase.pronunciationGuide && (
                  <div className="kannada-phonetic-tip">
                    Cadence: {activePhrase.pronunciationGuide}
                  </div>
                )}

                {activePhrase.contextNote && (
                  <div style={{ marginTop: '8px', fontSize: '12.5px', color: 'var(--color-forest-dark)', backgroundColor: 'var(--color-forest-light)', padding: '6px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-sage)' }}>
                    💡 <strong>Etiquette tip:</strong> {activePhrase.contextNote}
                  </div>
                )}
              </div>

              {/* Preview Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '18px', paddingTop: '14px', borderTop: '1px solid var(--color-border)', flexWrap: 'wrap', gap: '10px' }}>
                {onShowFullscreen && (
                  <button
                    type="button"
                    className="btn-outline-forest"
                    onClick={() => onShowFullscreen(activePhrase)}
                    style={{ fontSize: '13px', padding: '7px 14px' }}
                  >
                    <Maximize2 size={14} />
                    <span>Test Full-Screen Show Mode</span>
                  </button>
                )}

                <button
                  type="button"
                  className="btn-primary"
                  onClick={handleStart}
                  style={{ fontSize: '13px', padding: '7px 16px', marginLeft: 'auto' }}
                >
                  <span>Launch in App</span>
                  <ArrowRight size={14} />
                </button>
              </div>

              {/* Preview of Predicted Replies */}
              {activePhrase.replies && activePhrase.replies.length > 0 && (
                <div style={{ marginTop: '18px', padding: '14px', backgroundColor: 'var(--color-sand-light)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-forest)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MessageSquareReply size={14} />
                    <span>What they might say next (Plausible replies):</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                    {activePhrase.replies.slice(0, 2).map((rep, idx) => (
                      <div key={idx} style={{ padding: '8px 10px', backgroundColor: 'var(--color-white)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontSize: '13px' }}>
                        <div className="kannada-text" style={{ fontWeight: 600, color: 'var(--color-forest-dark)' }}>{rep.kannada}</div>
                        <div style={{ fontSize: '11.5px', color: 'var(--color-charcoal-muted)', marginTop: '2px' }}>"{rep.englishMeaning}"</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS (3 CONCISE STEPS) */}
      <section className="landing-section" id="how-it-works">
        <div className="container">
          <div className="section-label">Simple 3-Step Journey</div>
          <h2 className="section-heading">How KannadaConnect works</h2>
          <p className="section-description">
            Designed specifically for real interactions on foot, in transit, at shops, or at dining tables.
          </p>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3 className="step-title">Describe what you need</h3>
              <p className="step-body">
                Type naturally in English or tap the microphone to speak. Choose your everyday situation (Transport, Food, Shopping, Health) for instant context.
              </p>
              <div className="step-badge">English Intent → Voice or Text</div>
            </div>

            <div className="step-card">
              <div className="step-number">2</div>
              <h3 className="step-title">Get a useful Kannada phrase</h3>
              <p className="step-body">
                Receive authentic Kannada script, Romanized phonetic transliteration, syllable pronunciation cadence, and local cultural etiquette tips.
              </p>
              <div className="step-badge">ಕನ್ನಡ Script + Phonetics</div>
            </div>

            <div className="step-card">
              <div className="step-number">3</div>
              <h3 className="step-title">Listen, show it, & understand</h3>
              <p className="step-body">
                Play pronunciation audio, launch high-contrast Show Mode to display to vendors across counters, and read predicted replies so you know what comes next.
              </p>
              <div className="step-badge">Show Mode + Predicted Replies</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WORKING FEATURES GRID */}
      <section className="landing-section" id="features">
        <div className="container">
          <div className="section-label">Product Capabilities</div>
          <h2 className="section-heading">Built for real-world confidence</h2>
          <p className="section-description">
            Every feature is functional, practical, and designed to help you communicate immediately.
          </p>

          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon-box">
                <Sparkles size={22} />
              </div>
              <h3 className="feature-title">AI-Assisted Show & Say</h3>
              <p className="feature-body">
                Powered by Google Gemini to translate natural English communication intents into situational Kannada, backed by an offline reviewed library.
              </p>
            </div>

            <div className="feature-item">
              <div className="feature-icon-box">
                <MessageSquareReply size={22} />
              </div>
              <h3 className="feature-title">Contextual Possible Replies</h3>
              <p className="feature-body">
                Never get caught off guard: see the most common responses a conductor, driver, or shopkeeper might give in Kannada with English meanings.
              </p>
            </div>

            <div className="feature-item">
              <div className="feature-icon-box">
                <Compass size={22} />
              </div>
              <h3 className="feature-title">Situation-Based Phrasebook</h3>
              <p className="feature-body">
                Curated phrases covering Transport, Food & Coffee, Shopping & UPI, Healthcare, and Everyday social conversations with instant multi-field search.
              </p>
            </div>

            <div className="feature-item">
              <div className="feature-icon-box">
                <Volume2 size={22} />
              </div>
              <h3 className="feature-title">Pronunciation Support</h3>
              <p className="feature-body">
                Microphone speech-to-text input in English plus audio pronunciation with syllable cadence breaks and browser Kannada voice detection.
              </p>
            </div>

            <div className="feature-item">
              <div className="feature-icon-box">
                <Maximize2 size={22} />
              </div>
              <h3 className="feature-title">Full-Screen Show Mode</h3>
              <p className="feature-body">
                A distraction-free, large-type presentation screen built to show conductors, auto drivers, and shopkeepers across counters with Daylight and OLED Night contrast.
              </p>
            </div>

            <div className="feature-item">
              <div className="feature-icon-box">
                <Bookmark size={22} />
              </div>
              <h3 className="feature-title">Saved Offline Phrases</h3>
              <p className="feature-body">
                Bookmark phrases for fast offline access. Stored securely in your browser's local sandbox without requiring third-party cloud trackers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CURATED PHRASE PREVIEW SECTION WITH CATEGORY FILTER */}
      <section className="landing-section" id="phrase-samples">
        <div className="container">
          <div className="section-label">Reviewed Library</div>
          <h2 className="section-heading">Everyday situations, solved</h2>
          <p className="section-description">
            Explore authentic phrases from the reviewed KannadaConnect collection. Tap Listen to hear pronunciation or test Show Mode:
          </p>

          {/* Category Filter Pills */}
          <div className="landing-category-pills">
            {SITUATIONS.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`scenario-pill-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          <div className="phrase-grid">
            {filteredPhrases.map((p) => {
              const isPlaying = previewSpeakingId === p.id;
              const isCopied = copiedId === p.id;

              return (
                <div key={p.id} className="phrase-card">
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-charcoal-subtle)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        {p.situationLabel}
                      </span>
                      <span className="badge-source curated" style={{ fontSize: '10.5px' }}>Reviewed</span>
                    </div>

                    <div className="kannada-text" style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-forest-dark)', lineHeight: 1.35, marginBottom: '6px' }}>
                      {p.kannada}
                    </div>

                    <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-charcoal)', marginBottom: '4px' }}>
                      "{p.transliteration}"
                    </div>

                    <div style={{ fontSize: '13.5px', color: 'var(--color-charcoal-muted)' }}>
                      {p.english}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--color-border)', paddingTop: '12px', marginTop: '12px' }}>
                    {onShowFullscreen ? (
                      <button
                        type="button"
                        className="btn-outline-forest"
                        onClick={() => onShowFullscreen(p)}
                        style={{ padding: '6px 12px', fontSize: '12.5px' }}
                      >
                        <Maximize2 size={13} />
                        <span>Show Large</span>
                      </button>
                    ) : (
                      <span style={{ fontSize: '12px', color: 'var(--color-forest)', fontWeight: 600 }}>Reviewed</span>
                    )}

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <button
                        type="button"
                        className="btn-icon-xs"
                        onClick={() => handleCopyPhrase(p)}
                        title={isCopied ? "Copied" : "Copy Kannada script"}
                      >
                        {isCopied ? <Check size={14} color="var(--color-forest)" /> : <Copy size={14} />}
                      </button>

                      <button
                        type="button"
                        className="btn-icon-xs"
                        onClick={() => handlePreviewSpeak(p)}
                        title={isPlaying ? "Stop audio" : "Listen to pronunciation"}
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

          <div style={{ textAlign: 'center', marginTop: '36px' }}>
            <button
              type="button"
              className="btn-secondary"
              onClick={handleExplore}
              style={{ padding: '10px 24px', fontSize: '14.5px' }}
            >
              <span>View All 25+ Curated Phrases</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* 5. CLOSING CTA BANNER */}
      <section className="container">
        <div className="landing-closing-cta">
          <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--color-ivory)', letterSpacing: '-0.02em', marginBottom: '12px' }}>
              Start speaking Kannada today.
            </h2>
            <p style={{ fontSize: '16px', color: 'var(--color-sage)', marginBottom: '28px', lineHeight: 1.55 }}>
              Find the words you need for everyday conversations across Karnataka. Say it, show it, and understand what comes next.
            </p>

            <button
              type="button"
              className="btn-primary"
              onClick={handleStart}
              style={{
                backgroundColor: 'var(--color-ivory)',
                color: 'var(--color-forest)',
                padding: '14px 32px',
                fontSize: '16px',
                fontWeight: 700,
                boxShadow: 'var(--shadow-md)'
              }}
            >
              <span>Get Started with KannadaConnect</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* 6. LANDING FOOTER */}
      <footer className="landing-footer">
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div className="brand-emblem" style={{ width: '32px', height: '32px', fontSize: '17px' }}>ಕ</div>
              <span style={{ fontWeight: 800, fontSize: '17px', color: 'var(--color-charcoal)' }}>KannadaConnect</span>
            </div>

            <div style={{ display: 'flex', gap: '20px', fontSize: '13.5px' }}>
              <a 
                href="#how-it-works"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                }} 
                style={{ color: 'var(--color-forest)', textDecoration: 'none', fontWeight: 600 }}
              >
                How It Works
              </a>
              <button 
                type="button" 
                onClick={handleExplore} 
                style={{ background: 'none', border: 'none', color: 'var(--color-forest)', cursor: 'pointer', fontWeight: 600, padding: 0 }}
              >
                Conversations
              </button>
              <button 
                type="button" 
                onClick={() => navigate('/vocabulary')} 
                style={{ background: 'none', border: 'none', color: 'var(--color-forest)', cursor: 'pointer', fontWeight: 600, padding: 0 }}
              >
                Vocabulary
              </button>
              <button 
                type="button" 
                onClick={() => navigate('/practice')} 
                style={{ background: 'none', border: 'none', color: 'var(--color-forest)', cursor: 'pointer', fontWeight: 600, padding: 0 }}
              >
                Guided Practice
              </button>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', fontSize: '12.5px', color: 'var(--color-charcoal-subtle)' }}>
            <span>Kannada for Everyone — Empowering real-world communication across Karnataka.</span>
            <span>Practical conversations • Everyday vocabulary • Guided speaking practice</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
