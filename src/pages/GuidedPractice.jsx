import React, { useState } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight, 
  Bus, 
  Utensils, 
  ShoppingBag, 
  HeartPulse, 
  MessageCircle, 
  Info 
} from 'lucide-react';
import { PRACTICE_SCENARIOS } from '../data/practiceScenarios';
import { speechService } from '../utils/speech';
import { speechRecognitionService } from '../utils/speechRecognition';

export default function GuidedPractice() {
  const [selectedScenarioId, setSelectedScenarioId] = useState(PRACTICE_SCENARIOS[0].id);
  const [isListening, setIsListening] = useState(false);
  const [speechError, setSpeechError] = useState(null);
  const [recognizedTranscript, setRecognizedTranscript] = useState('');
  const [practiceFeedback, setPracticeFeedback] = useState(null);
  const [isSpeakingAudio, setIsSpeakingAudio] = useState(false);

  const scenario = PRACTICE_SCENARIOS.find(s => s.id === selectedScenarioId) || PRACTICE_SCENARIOS[0];
  const isSpeechSupported = speechRecognitionService.isSupported();

  // Listen to the target pronunciation
  const handlePlayAudio = (text) => {
    if (isSpeakingAudio) {
      speechService.stop();
      setIsSpeakingAudio(false);
      return;
    }

    setIsSpeakingAudio(true);
    speechService.speak(
      text || scenario.targetKannada,
      () => setIsSpeakingAudio(false),
      () => setIsSpeakingAudio(false)
    );
  };

  // Start Voice Practice
  const handleStartListening = () => {
    setSpeechError(null);
    setRecognizedTranscript('');
    setPracticeFeedback(null);

    if (!isSpeechSupported) {
      setSpeechError('Speech recognition is not supported in this browser. Please use Chrome or Edge, or listen to native audio and practice speaking aloud.');
      return;
    }

    const started = speechRecognitionService.start({
      lang: 'kn-IN', // Kannada recognition
      onResult: ({ transcript, isFinal }) => {
        setRecognizedTranscript(transcript);
        if (isFinal) {
          evaluateSpeech(transcript);
        }
      },
      onError: (err) => {
        setIsListening(false);
        // If Kannada language model is missing or fails, suggest self-check
        if (err.code === 'not-allowed') {
          setSpeechError('Microphone permission was denied. Please allow microphone access in your browser.');
        } else {
          setSpeechError(err.message || 'Speech recognition encountered an issue. You can also use self-evaluation mode.');
        }
      },
      onEnd: () => {
        setIsListening(false);
      }
    });

    if (started) {
      setIsListening(true);
    }
  };

  const handleStopListening = () => {
    speechRecognitionService.stop();
    setIsListening(false);
    if (recognizedTranscript) {
      evaluateSpeech(recognizedTranscript);
    }
  };

  // Evaluate recognized speech against expected keywords
  const evaluateSpeech = (spokenText) => {
    if (!spokenText || !spokenText.trim()) return;

    const cleanSpoken = spokenText.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()?]/g, ' ').trim();
    const cleanTarget = scenario.targetKannada.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()?]/g, ' ').trim();
    const cleanTranslit = scenario.transliteration.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()?]/g, ' ').trim();

    // Check keyword matches
    const matchedKeywords = scenario.keywords.filter(kw => {
      const cleanKw = kw.toLowerCase();
      return cleanSpoken.includes(cleanKw);
    });

    const isDirectMatch = cleanSpoken.includes(cleanTarget) || cleanTarget.includes(cleanSpoken) || cleanSpoken.includes(cleanTranslit);

    let status = 'needs_practice';
    let assessment = '';
    let tips = '';

    if (isDirectMatch || matchedKeywords.length >= 3) {
      status = 'success';
      assessment = 'Excellent! Your pronunciation was clearly recognized and matches what locals expect to hear.';
      tips = 'You are ready to use this expression in real life across Karnataka.';
    } else if (matchedKeywords.length >= 1) {
      status = 'partial';
      assessment = `Recognized key words: "${matchedKeywords.join(', ')}". Good effort!`;
      tips = `Try connecting the entire expression smoothly: "${scenario.transliteration}".`;
    } else {
      status = 'needs_practice';
      assessment = `Heard: "${spokenText}". This differs from the expected Kannada expression.`;
      tips = `Tap "Listen" to hear the native rhythm, then tap the mic to retry speaking clearly.`;
    }

    setPracticeFeedback({
      status,
      assessment,
      tips,
      spokenText,
      matchedKeywords
    });
  };

  // Self-evaluation mode (practice speaking aloud and comparing rhythm)
  const handleSelfCheck = () => {
    if (isListening) handleStopListening();
    setSpeechError(null);
    setPracticeFeedback({
      status: 'success',
      assessment: 'Self-check complete! Compare your rhythm and cadence against the native audio pronunciation above.',
      tips: `Pay attention to the syllable breaks: ${scenario.pronunciationGuide}. Repeat 2–3 times until comfortable.`
    });
  };

  // Reset practice for current scenario
  const handleReset = () => {
    if (isListening) handleStopListening();
    setRecognizedTranscript('');
    setPracticeFeedback(null);
    setSpeechError(null);
  };

  // Switch scenario
  const handleSelectScenario = (id) => {
    handleReset();
    setSelectedScenarioId(id);
  };

  const getSituationIcon = (situation) => {
    switch (situation) {
      case 'transport': return <Bus size={15} />;
      case 'food': return <Utensils size={15} />;
      case 'shopping': return <ShoppingBag size={15} />;
      case 'health': return <HeartPulse size={15} />;
      default: return <MessageCircle size={15} />;
    }
  };

  return (
    <div className="practice-page" style={{ paddingTop: '20px', maxWidth: '960px', margin: '0 auto' }}>
      {/* Header */}
      <section className="hero-section" style={{ paddingTop: '10px', paddingBottom: '24px' }}>
        <div className="hero-tag">
          <Mic size={14} />
          <span>Interactive Speaking Practice</span>
        </div>
        <h1 className="hero-title" style={{ fontSize: '32px' }}>
          Speak Real-World Kannada.
        </h1>
        <p className="hero-subtitle">
          Practice speaking aloud in real-life situations with speech feedback and native pronunciation.
        </p>
      </section>

      {/* Main Practice Container Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', alignItems: 'start' }}>
        
        {/* Left: Scenario Selector Sidebar */}
        <div style={{ backgroundColor: 'var(--color-white)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', padding: '16px' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-charcoal-subtle)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
            Choose a Real-Life Situation
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {PRACTICE_SCENARIOS.map((s) => {
              const isSelected = s.id === scenario.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => handleSelectScenario(s.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: isSelected ? '1px solid var(--color-forest)' : '1px solid var(--color-border)',
                    backgroundColor: isSelected ? 'var(--color-forest-light)' : 'var(--color-warm-ivory)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ color: isSelected ? 'var(--color-forest)' : 'var(--color-charcoal-subtle)' }}>
                      {getSituationIcon(s.situation)}
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: isSelected ? 'var(--color-forest-dark)' : 'var(--color-charcoal)' }}>
                        {s.title}
                      </div>
                      <div style={{ fontSize: '11.5px', color: 'var(--color-charcoal-subtle)' }}>
                        {s.situationLabel}
                      </div>
                    </div>
                  </div>
                  <ChevronRight size={16} color={isSelected ? 'var(--color-forest)' : 'var(--color-charcoal-subtle)'} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Active Interactive Practice Card */}
        <div style={{ backgroundColor: 'var(--color-white)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', padding: '24px' }}>
          {/* Situation Badge */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-forest)', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: '6px' }}>
              {getSituationIcon(scenario.situation)}
              <span>{scenario.situationLabel}</span>
            </span>
            <span style={{ fontSize: '12px', color: 'var(--color-charcoal-subtle)' }}>
              Scenario Challenge
            </span>
          </div>

          {/* Goal Description in English */}
          <div style={{ marginBottom: '20px', padding: '14px 16px', backgroundColor: 'var(--color-warm-ivory)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-charcoal-subtle)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '4px' }}>
              What you need to say in English
            </div>
            <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-charcoal)', lineHeight: 1.4 }}>
              "{scenario.promptEnglish}"
            </div>
          </div>

          {/* Expected Kannada Target Display */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-charcoal-subtle)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Appropriate Kannada Expression
              </div>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => handlePlayAudio(scenario.targetKannada)}
                style={{ padding: '4px 10px', fontSize: '12px', gap: '4px' }}
                title="Listen to native pronunciation"
              >
                {isSpeakingAudio ? <VolumeX size={13} color="var(--color-terracotta)" /> : <Volume2 size={13} color="var(--color-forest)" />}
                <span>{isSpeakingAudio ? 'Stop' : 'Listen Native Audio'}</span>
              </button>
            </div>

            <div className="kannada-text" style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-forest-dark)', lineHeight: 1.3, marginBottom: '6px' }}>
              {scenario.targetKannada}
            </div>

            <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-forest)', marginBottom: '4px' }}>
              "{scenario.transliteration}"
            </div>

            <div style={{ fontSize: '13px', color: 'var(--color-charcoal-muted)' }}>
              Phonetics: <span style={{ fontWeight: 600 }}>{scenario.pronunciationGuide}</span>
            </div>
          </div>

          {/* Interactive Speech Action Panel */}
          <div style={{ padding: '20px', backgroundColor: 'var(--color-warm-ivory)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', textAlign: 'center', marginBottom: '20px' }}>
            <div style={{ marginBottom: '14px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: isListening ? 'var(--color-forest)' : 'var(--color-charcoal)' }}>
                {isListening ? "Listening... Speak the Kannada phrase aloud now..." : "Step up to the mic and practice saying it aloud:"}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <button
                type="button"
                className={`btn-primary ${isListening ? 'listening' : ''}`}
                onClick={isListening ? handleStopListening : handleStartListening}
                style={{
                  padding: '12px 24px',
                  fontSize: '15px',
                  backgroundColor: isListening ? 'var(--color-terracotta)' : 'var(--color-forest)',
                  gap: '8px'
                }}
              >
                {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                <span>{isListening ? 'Stop Speaking' : 'Try Saying It Aloud'}</span>
              </button>

              <button
                type="button"
                className="btn-secondary"
                onClick={handleSelfCheck}
                title="Practice without microphone"
                style={{ padding: '12px 18px', fontSize: '14px' }}
              >
                <span>Self-Check Practice</span>
              </button>

              <button
                type="button"
                className="btn-secondary"
                onClick={handleReset}
                title="Reset scenario"
                style={{ padding: '12px 16px' }}
              >
                <RotateCcw size={16} />
                <span>Reset</span>
              </button>
            </div>

            {/* Error or Browser Notice */}
            {speechError && (
              <div style={{ marginTop: '14px', padding: '10px', backgroundColor: 'var(--color-gold-light)', borderRadius: 'var(--radius-sm)', border: '1px solid #E8D39E', color: 'var(--color-gold)', fontSize: '12.5px', textAlign: 'left', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <AlertCircle size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{speechError}</span>
              </div>
            )}

            {!isSpeechSupported && (
              <div style={{ marginTop: '14px', padding: '10px', backgroundColor: 'var(--color-forest-light)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-sage)', color: 'var(--color-forest)', fontSize: '12.5px', textAlign: 'left', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <Info size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Speech recognition is not supported in this browser. You can listen to native audio and practice speaking aloud in self-check mode.</span>
              </div>
            )}
          </div>

          {/* Practice Feedback Report */}
          {practiceFeedback && (
            <div style={{
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              border: `1px solid ${practiceFeedback.status === 'success' ? '#A3D9A5' : practiceFeedback.status === 'partial' ? '#E8D39E' : '#E8B9AA'}`,
              backgroundColor: practiceFeedback.status === 'success' ? '#F0F9F1' : practiceFeedback.status === 'partial' ? '#FFFBEF' : '#FDF4F2',
              marginBottom: '20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                {practiceFeedback.status === 'success' ? (
                  <CheckCircle2 size={18} color="var(--color-forest)" />
                ) : (
                  <AlertCircle size={18} color={practiceFeedback.status === 'partial' ? 'var(--color-gold)' : 'var(--color-terracotta)'} />
                )}
                <span style={{ fontWeight: 700, fontSize: '14px', color: practiceFeedback.status === 'success' ? 'var(--color-forest)' : 'var(--color-charcoal)' }}>
                  Practice Analysis
                </span>
              </div>

              <div style={{ fontSize: '13.5px', color: 'var(--color-charcoal)', marginBottom: '8px' }}>
                {practiceFeedback.assessment}
              </div>

              <div style={{ fontSize: '13px', color: 'var(--color-charcoal-muted)', borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '8px' }}>
                <strong>Tip:</strong> {practiceFeedback.tips}
              </div>
            </div>
          )}

          {/* Contextual Etiquette & Tip */}
          <div style={{ marginBottom: '20px', padding: '12px 14px', backgroundColor: 'var(--color-forest-light)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-sage)' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-forest)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '2px' }}>
              Cultural Etiquette & Context
            </div>
            <div style={{ fontSize: '13px', color: 'var(--color-forest-dark)' }}>
              {scenario.contextNote} • {scenario.tips}
            </div>
          </div>

          {/* What they might say back */}
          {scenario.replies && scenario.replies.length > 0 && (
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--color-charcoal-subtle)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px' }}>
                What you might hear back in this situation
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {scenario.replies.map((reply, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', backgroundColor: 'var(--color-warm-ivory)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
                    <div>
                      <div className="kannada-text" style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-forest-dark)' }}>
                        {reply.kannada}
                      </div>
                      <div style={{ fontSize: '12.5px', color: 'var(--color-charcoal-muted)' }}>
                        "{reply.transliteration}" • {reply.englishMeaning}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn-icon-xs"
                      onClick={() => handlePlayAudio(reply.kannada)}
                      title="Listen to reply pronunciation"
                    >
                      <Volume2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
