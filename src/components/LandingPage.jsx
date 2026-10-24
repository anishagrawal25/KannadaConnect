import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  MessageSquareReply, 
  ShieldCheck,
  MessageSquare,
  BookOpen,
  Mic,
  LogIn,
  CheckCircle2
} from 'lucide-react';
import { CURATED_PHRASES } from '../data/phrases';
import { speechService } from '../utils/speech';

// Curated live everyday scenarios for interactive hero preview
const HERO_SCENARIOS = [
  {
    id: 'bus',
    icon: '🚌',
    tabLabel: 'Bus Route',
    situationName: 'Transport & Directions',
    userPrompt: 'I need to ask whether this bus goes to Mysuru',
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

export default function LandingPage({ onShowFullscreen }) {
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);
  const [demoSpeaking, setDemoSpeaking] = useState(false);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/signup');
  };

  const handleSignIn = () => {
    navigate('/login');
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

  const handleSelectScenario = (index) => {
    if (demoSpeaking) {
      speechService.stop();
      setDemoSpeaking(false);
    }
    setSelectedScenarioIndex(index);
  };

  return (
    <div className="landing-page">
      {/* 1. HERO SECTION */}
      <section className="landing-hero-section" style={{ paddingBottom: '32px' }}>
        <div className="container">
          <div className="hero-badge-pill">
            <span style={{ fontFamily: 'var(--font-kannada)', fontWeight: 800, fontSize: '15px' }}>ಕ</span>
            <span>Kannada for Everyone • Practical Communication for Karnataka</span>
          </div>

          <h1 className="landing-headline">
            Learn practical Kannada<br />for everyday life.
          </h1>

          <p className="landing-subhead">
            Communicate with confidence when talking to bus conductors, auto drivers, shopkeepers, and doctors. Master authentic conversations, explore everyday vocabulary, and practice speaking aloud.
          </p>

          {/* Clean Primary CTA Group: Get Started -> Sign Up, Sign In -> Login */}
          <div className="landing-cta-group" style={{ marginBottom: '14px' }}>
            <button
              type="button"
              className="btn-primary"
              onClick={handleGetStarted}
              id="landing-hero-getstarted-btn"
              style={{ padding: '14px 32px', fontSize: '16px', borderRadius: 'var(--radius-md)' }}
            >
              <span>Get Started</span>
              <ArrowRight size={18} />
            </button>

            <button
              type="button"
              className="btn-secondary"
              onClick={handleSignIn}
              id="landing-hero-signin-btn"
              style={{ padding: '14px 28px', fontSize: '15px', borderRadius: 'var(--radius-md)' }}
            >
              <LogIn size={17} />
              <span>Sign In</span>
            </button>
          </div>

          <div style={{ fontSize: '13px', color: 'var(--color-charcoal-subtle)', marginBottom: '36px' }}>
            Free account • Immediate access to Conversations, Vocabulary & Guided Practice
          </div>

          {/* 2. REALISTIC INTERACTIVE PRODUCT PREVIEW */}
          <div className="landing-preview-container" style={{ marginTop: '0' }}>
            <div style={{ textAlign: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-charcoal-subtle)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Preview everyday situations in action:
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
                    <span>Real-Life Situation</span>
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
                  onClick={handleGetStarted}
                  style={{ fontSize: '13px', padding: '7px 18px', marginLeft: 'auto' }}
                >
                  <span>Sign Up to Practice</span>
                  <ArrowRight size={14} />
                </button>
              </div>

              {/* Preview of Predicted Replies */}
              {activePhrase.replies && activePhrase.replies.length > 0 && (
                <div style={{ marginTop: '18px', padding: '14px', backgroundColor: 'var(--color-sand-light)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-forest)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MessageSquareReply size={14} />
                    <span>What they might say next (Predicted replies):</span>
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

      {/* 3. THE THREE CORE LEARNING PILLARS */}
      <section className="landing-section" style={{ backgroundColor: 'var(--color-white)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div className="section-label">Core Learning Experience</div>
          <h2 className="section-heading">Three practical ways to master everyday Kannada</h2>
          <p className="section-description">
            Focused strictly on helping non-Kannada speakers communicate confidently in realistic situations.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginTop: '36px' }}>
            {/* Pillar 1: Everyday Conversations */}
            <div style={{ padding: '28px', backgroundColor: 'var(--color-warm-ivory)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-forest-light)', color: 'var(--color-forest)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                  <MessageSquare size={22} />
                </div>
                <h3 style={{ fontSize: '19px', fontWeight: 700, marginBottom: '8px', color: 'var(--color-charcoal)' }}>
                  Everyday Conversations
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--color-charcoal-muted)', lineHeight: 1.6, marginBottom: '16px' }}>
                  Communicate in realistic situations: buses, autos, restaurants, and pharmacy. Shows Kannada script, phonetic transliteration, audio, and predicted replies so you know what they might say back.
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: 'var(--color-charcoal)' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={15} color="var(--color-forest)" />
                    <span>English intent to authentic Kannada</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={15} color="var(--color-forest)" />
                    <span>High-contrast full-screen Show Mode</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={15} color="var(--color-forest)" />
                    <span>Contextual etiquette & polite suffixes</span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                className="btn-secondary"
                onClick={handleGetStarted}
                style={{ width: '100%', justifyContent: 'center', padding: '10px' }}
              >
                <span>Get Started</span>
                <ArrowRight size={15} />
              </button>
            </div>

            {/* Pillar 2: Practical Vocabulary */}
            <div style={{ padding: '28px', backgroundColor: 'var(--color-warm-ivory)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-forest-light)', color: 'var(--color-forest)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                  <BookOpen size={22} />
                </div>
                <h3 style={{ fontSize: '19px', fontWeight: 700, marginBottom: '8px', color: 'var(--color-charcoal)' }}>
                  Practical Vocabulary
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--color-charcoal-muted)', lineHeight: 1.6, marginBottom: '16px' }}>
                  A focused library of words you actually need in everyday life. Curated across Transport, Food, Shopping, Health, and Everyday Life with audio and bookmarking.
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: 'var(--color-charcoal)' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={15} color="var(--color-forest)" />
                    <span>Kannada script + English transliteration</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={15} color="var(--color-forest)" />
                    <span>Real-world example sentences</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={15} color="var(--color-forest)" />
                    <span>Bookmark words for fast offline revision</span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                className="btn-secondary"
                onClick={handleGetStarted}
                style={{ width: '100%', justifyContent: 'center', padding: '10px' }}
              >
                <span>Get Started</span>
                <ArrowRight size={15} />
              </button>
            </div>

            {/* Pillar 3: Guided Practice */}
            <div style={{ padding: '28px', backgroundColor: 'var(--color-warm-ivory)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-forest-light)', color: 'var(--color-forest)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                  <Mic size={22} />
                </div>
                <h3 style={{ fontSize: '19px', fontWeight: 700, marginBottom: '8px', color: 'var(--color-charcoal)' }}>
                  Guided Practice
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--color-charcoal-muted)', lineHeight: 1.6, marginBottom: '16px' }}>
                  Step into real-life scenarios, see what you need to express, and practice saying it aloud. Get honest feedback using Kannada speech recognition and pronunciation cadence.
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: 'var(--color-charcoal)' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={15} color="var(--color-forest)" />
                    <span>Realistic situational speaking challenges</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={15} color="var(--color-forest)" />
                    <span>Objective analysis without fake scores</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={15} color="var(--color-forest)" />
                    <span>Self-Check fallback for all browsers</span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                className="btn-secondary"
                onClick={handleGetStarted}
                style={{ width: '100%', justifyContent: 'center', padding: '10px' }}
              >
                <span>Get Started</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CLOSING CTA BANNER */}
      <section className="container" style={{ padding: '48px 20px' }}>
        <div className="landing-closing-cta">
          <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--color-ivory)', letterSpacing: '-0.02em', marginBottom: '12px' }}>
              Start speaking Kannada today.
            </h2>
            <p style={{ fontSize: '16px', color: 'var(--color-sage)', marginBottom: '28px', lineHeight: 1.55 }}>
              Join KannadaConnect to learn practical everyday expressions, vocabulary, and guided practice for real-world interactions.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="btn-primary"
                onClick={handleGetStarted}
                style={{
                  backgroundColor: 'var(--color-ivory)',
                  color: 'var(--color-forest)',
                  padding: '14px 32px',
                  fontSize: '16px',
                  fontWeight: 700,
                  boxShadow: 'var(--shadow-md)'
                }}
              >
                <span>Create Free Account</span>
                <ArrowRight size={18} />
              </button>

              <button
                type="button"
                className="btn-secondary"
                onClick={handleSignIn}
                style={{
                  backgroundColor: 'transparent',
                  color: 'var(--color-ivory)',
                  borderColor: 'rgba(255,255,255,0.3)',
                  padding: '14px 28px',
                  fontSize: '15px'
                }}
              >
                <LogIn size={16} />
                <span>Sign In</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. MINIMAL LANDING FOOTER */}
      <footer className="landing-footer">
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div className="brand-emblem" style={{ width: '32px', height: '32px', fontSize: '17px' }}>ಕ</div>
              <span style={{ fontWeight: 800, fontSize: '17px', color: 'var(--color-charcoal)' }}>KannadaConnect</span>
            </div>

            <div style={{ display: 'flex', gap: '20px', fontSize: '13.5px', alignItems: 'center' }}>
              <button 
                type="button" 
                onClick={handleGetStarted} 
                style={{ background: 'none', border: 'none', color: 'var(--color-forest)', cursor: 'pointer', fontWeight: 600, padding: 0 }}
              >
                Get Started
              </button>
              <button 
                type="button" 
                onClick={handleSignIn} 
                style={{ background: 'none', border: 'none', color: 'var(--color-forest)', cursor: 'pointer', fontWeight: 600, padding: 0 }}
              >
                Sign In
              </button>
              <button 
                type="button" 
                onClick={() => navigate('/conversations')} 
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
            <span>Kannada for Everyone — Practical Kannada for everyday communication across Karnataka.</span>
            <span>Everyday conversations • Practical vocabulary • Guided speaking practice</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
