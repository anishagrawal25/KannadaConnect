import React, { useState, useEffect } from 'react';
import { Sparkles, Compass, Bookmark, Volume2 } from 'lucide-react';
import { speechService } from '../utils/speech';

export default function Header({ activeTab, setActiveTab, savedCount }) {
  const [hasVoice, setHasVoice] = useState(false);

  useEffect(() => {
    // Check speech voice availability
    const checkVoice = () => {
      setHasVoice(speechService.hasKannadaVoice());
    };
    checkVoice();
    const timer = setTimeout(checkVoice, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <header className="app-header">
      <div className="container header-content">
        {/* Brand Wordmark */}
        <button 
          className="brand-link" 
          onClick={() => setActiveTab('home')}
          aria-label="KannadaConnect Home"
        >
          <div className="brand-emblem" aria-hidden="true">ಕ</div>
          <div>
            <div className="brand-title">KannadaConnect</div>
            <div className="brand-tag-small">Real-world Kannada companion</div>
          </div>
        </button>

        {/* Navigation Tabs & Voice Status */}
        <nav className="nav-group" aria-label="Main Navigation">
          <button
            className={`nav-btn ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab('home')}
            id="nav-home-btn"
          >
            <Sparkles size={16} />
            <span>Say & Show</span>
          </button>

          <button
            className={`nav-btn ${activeTab === 'explore' ? 'active' : ''}`}
            onClick={() => setActiveTab('explore')}
            id="nav-explore-btn"
          >
            <Compass size={16} />
            <span>Explore</span>
          </button>

          <button
            className={`nav-btn ${activeTab === 'saved' ? 'active' : ''}`}
            onClick={() => setActiveTab('saved')}
            id="nav-saved-btn"
            aria-label={`Saved phrases: ${savedCount}`}
          >
            <Bookmark size={16} />
            <span>Saved</span>
            {savedCount > 0 && <span className="nav-badge">{savedCount}</span>}
          </button>

          {/* Voice indicator badge */}
          <div 
            style={{ 
              alignItems: 'center', 
              gap: '4px', 
              fontSize: '11px', 
              padding: '4px 8px', 
              borderRadius: 'var(--radius-full)',
              backgroundColor: hasVoice ? 'var(--color-forest-light)' : 'var(--color-sand)',
              color: hasVoice ? 'var(--color-forest)' : 'var(--color-charcoal-subtle)',
              marginLeft: '4px'
            }}
            className="voice-status-pill"
            title={hasVoice ? "Kannada text-to-speech voice detected" : "Speech synthesis in text/phonetic mode"}
          >
            <Volume2 size={12} />
            <span style={{ fontWeight: 600 }}>{hasVoice ? 'Voice Ready' : 'Audio Guide'}</span>
          </div>
        </nav>
      </div>
    </header>
  );
}
