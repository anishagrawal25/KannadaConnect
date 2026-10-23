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
  ShieldCheck
} from 'lucide-react';
import { CURATED_PHRASES } from '../data/phrases';
import { speechService } from '../utils/speech';

export default function LandingPage({ 
  onStartApp, 
  onExplore, 
  onShowFullscreen 
}) {
  const [demoSpeaking, setDemoSpeaking] = useState(false);
  const [previewSpeakingId, setPreviewSpeakingId] = useState(null);
  const navigate = useNavigate();

  const handleStart = () => {
    if (onStartApp) onStartApp();
    else navigate('/app');
  };

  const handleExplore = () => {
    if (onExplore) onExplore();
    else navigate('/explore');
  };

  const heroSample = CURATED_PHRASES[0]; // "Does this bus go to Mysuru?"

  const handleHeroSpeak = () => {
    if (demoSpeaking) {
      speechService.stop();
      setDemoSpeaking(false);
      return;
    }
    setDemoSpeaking(true);
    speechService.speak(
      heroSample.kannada,
      () => setDemoSpeaking(false),
      () => setDemoSpeaking(false)
    );
  };

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

  return (
    <div className="landing-page">
      {/* 1. HERO SECTION */}
      <section className="landing-hero-section">
        <div className="hero-badge-pill">
          <span style={{ fontFamily: 'var(--font-kannada)', fontWeight: 700, fontSize: '14px' }}>ಕ</span>
          <span>A communication companion for Karnataka</span>
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

        {/* REALISTIC INTERACTIVE PRODUCT PREVIEW */}
        <div className="landing-preview-container">
          <div className="landing-preview-card">
            {/* Window Top Bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '14px', marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="badge-source curated">
                  <ShieldCheck size={13} />
                  <span>Interactive Live Preview</span>
                </span>
                <span style={{ fontSize: '12px', color: 'var(--color-charcoal-subtle)' }}>• Transport & Directions</span>
              </div>
              <span style={{ fontSize: '12px', fontStyle: 'italic', color: 'var(--color-charcoal-muted)' }}>
                "I need to ask whether this bus goes to Mysuru"
              </span>
            </div>

            {/* Kannada Main Script Hero */}
            <div className="kannada-hero-block" style={{ margin: 0 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', marginBottom: '10px' }}>
                <div className="kannada-main-script kannada-text" style={{ fontSize: 'clamp(26px, 4vw, 36px)', marginBottom: 0 }}>
                  {heroSample.kannada}
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
                "{heroSample.transliteration}"
              </div>

              <div className="kannada-english-meaning" style={{ fontSize: '14.5px' }}>
                <strong>Meaning:</strong> {heroSample.english}
              </div>

              <div className="kannada-phonetic-tip">
                Cadence: {heroSample.pronunciationGuide}
              </div>
            </div>

            {/* Preview Action Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '18px', paddingTop: '14px', borderTop: '1px solid var(--color-border)', flexWrap: 'wrap', gap: '10px' }}>
              {onShowFullscreen && (
                <button
                  type="button"
                  className="btn-outline-forest"
                  onClick={() => onShowFullscreen(heroSample)}
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

            {/* Preview of Replies */}
            <div style={{ marginTop: '18px', padding: '14px', backgroundColor: 'var(--color-sand-light)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-forest)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MessageSquareReply size={14} />
                <span>What they might say next (Plausible replies):</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                {heroSample.replies.slice(0, 2).map((rep, idx) => (
                  <div key={idx} style={{ padding: '8px 10px', backgroundColor: 'var(--color-white)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontSize: '13px' }}>
                    <div className="kannada-text" style={{ fontWeight: 600, color: 'var(--color-forest-dark)' }}>{rep.kannada}</div>
                    <div style={{ fontSize: '11.5px', color: 'var(--color-charcoal-muted)' }}>"{rep.englishMeaning}"</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS (3 CONCISE STEPS) */}
      <section className="landing-section" id="how-it-works">
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
              Type naturally in English or tap the microphone to speak. Choose your situation (Transport, Food, Shopping, Health) for instant context.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">2</div>
            <h3 className="step-title">Get a useful Kannada phrase</h3>
            <p className="step-body">
              Receive natural Kannada script, clear phonetic English transliteration, pronunciation cadence breaks, and cultural etiquette tips.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">3</div>
            <h3 className="step-title">Listen, show it, & understand</h3>
            <p className="step-body">
              Listen aloud with speech synthesis, open high-contrast Show Mode to display to a vendor, and read predicted replies so you know what comes next.
            </p>
          </div>
        </div>
      </section>

      {/* 3. WORKING FEATURES GRID */}
      <section className="landing-section" id="features">
        <div className="section-label">Product Capabilities</div>
        <h2 className="section-heading">Built for real-world confidence</h2>
        <p className="section-description">
          Every tool is functional, practical, and designed to help you communicate immediately.
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
              <MessageSquareReply size={22} />
            </div>
            <h3 className="feature-title">Contextual Possible Replies</h3>
            <p className="feature-body">
              Never get caught off guard: see the most common responses someone might give in Kannada with English meanings and audio.
            </p>
          </div>

          <div className="feature-item">
            <div className="feature-icon-box">
              <Bookmark size={22} />
            </div>
            <h3 className="feature-title">Saved Offline Phrases</h3>
            <p className="feature-body">
              Bookmark phrases for fast offline access. Stored securely in your browser's local storage without requiring account registration.
            </p>
          </div>
        </div>
      </section>

      {/* 4. CURATED PHRASE PREVIEW SECTION */}
      <section className="landing-section" id="phrase-samples">
        <div className="section-label">Reviewed Library</div>
        <h2 className="section-heading">Everyday situations, solved</h2>
        <p className="section-description">
          Here are a few reviewed phrases from the KannadaConnect collection:
        </p>

        <div className="phrase-grid" style={{ marginTop: '28px' }}>
          {CURATED_PHRASES.slice(0, 4).map((p) => {
            const isPlaying = previewSpeakingId === p.id;
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

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--color-border)', paddingTop: '12px', marginTop: '10px' }}>
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

                  <button
                    type="button"
                    className="btn-icon-xs"
                    onClick={() => handlePreviewSpeak(p)}
                    title={isPlaying ? "Stop audio" : "Listen to pronunciation"}
                  >
                    {isPlaying ? <VolumeX size={14} color="var(--color-terracotta)" /> : <Volume2 size={14} />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <button
            type="button"
            className="btn-secondary"
            onClick={handleExplore}
            style={{ padding: '10px 24px', fontSize: '14.5px' }}
          >
            <span>View All Curated Phrases</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* 5. CLOSING CTA BANNER */}
      <section className="landing-closing-cta">
        <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--color-ivory)', letterSpacing: '-0.02em', marginBottom: '12px' }}>
            Start speaking Kannada today.
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--color-sage)', marginBottom: '28px', lineHeight: 1.55 }}>
            Describe what you need and communicate with confidence across Karnataka.
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
      </section>

      {/* 6. LANDING FOOTER */}
      <footer className="landing-footer">
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div className="brand-emblem" style={{ width: '30px', height: '30px', fontSize: '16px' }}>ಕ</div>
              <span style={{ fontWeight: 700, fontSize: '16px' }}>KannadaConnect</span>
            </div>

            <div style={{ display: 'flex', gap: '16px', fontSize: '13.5px' }}>
              <button type="button" onClick={handleStart} style={{ background: 'none', border: 'none', color: 'var(--color-forest)', cursor: 'pointer', fontWeight: 600 }}>
                Get Started
              </button>
              <button type="button" onClick={handleExplore} style={{ background: 'none', border: 'none', color: 'var(--color-forest)', cursor: 'pointer', fontWeight: 600 }}>
                Explore Phrases
              </button>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', fontSize: '12.5px', color: 'var(--color-charcoal-subtle)' }}>
            <span>Say it in Kannada. Understand what comes next.</span>
            <span>Zero third-party trackers • Stored locally in your browser</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
