import React, { useState } from 'react';
import { 
  Sparkles, 
  Compass, 
  Bookmark, 
  Headphones, 
  BookOpen, 
  Menu, 
  X,
  ArrowRight
} from 'lucide-react';

export default function Header({ activeTab, setActiveTab, savedCount }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="app-header">
      <div className="container header-content">
        {/* Brand Wordmark */}
        <button 
          className="brand-link" 
          onClick={() => handleNavClick('landing')}
          aria-label="KannadaConnect Home"
        >
          <div className="brand-emblem" aria-hidden="true">ಕ</div>
          <div>
            <div className="brand-title">KannadaConnect</div>
            <div className="brand-tag-small">Real-world Kannada companion</div>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="nav-group desktop-nav" aria-label="Main Navigation">
          <button
            className={`nav-btn ${activeTab === 'landing' ? 'active' : ''}`}
            onClick={() => handleNavClick('landing')}
            id="nav-landing-btn"
          >
            <BookOpen size={16} />
            <span>Overview</span>
          </button>

          <button
            className={`nav-btn ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => handleNavClick('home')}
            id="nav-home-btn"
          >
            <Sparkles size={16} />
            <span>Say & Show</span>
          </button>

          <button
            className={`nav-btn ${activeTab === 'explore' ? 'active' : ''}`}
            onClick={() => handleNavClick('explore')}
            id="nav-explore-btn"
          >
            <Compass size={16} />
            <span>Explore</span>
          </button>

          <button
            className={`nav-btn ${activeTab === 'audio' ? 'active' : ''}`}
            onClick={() => handleNavClick('audio')}
            id="nav-audio-btn"
          >
            <Headphones size={16} />
            <span>Audio Guide</span>
          </button>

          <button
            className={`nav-btn ${activeTab === 'saved' ? 'active' : ''}`}
            onClick={() => handleNavClick('saved')}
            id="nav-saved-btn"
            aria-label={`Saved phrases: ${savedCount}`}
          >
            <Bookmark size={16} />
            <span>Saved</span>
            {savedCount > 0 && <span className="nav-badge">{savedCount}</span>}
          </button>

          {activeTab === 'landing' && (
            <button
              type="button"
              className="btn-primary"
              onClick={() => handleNavClick('home')}
              style={{ padding: '7px 16px', fontSize: '13px', marginLeft: '6px' }}
            >
              <span>Launch App</span>
              <ArrowRight size={14} />
            </button>
          )}
        </nav>

        {/* Mobile Hamburger Toggle Button */}
        <button
          type="button"
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer" role="dialog" aria-modal="true">
          <button
            className={`mobile-nav-link ${activeTab === 'landing' ? 'active' : ''}`}
            onClick={() => handleNavClick('landing')}
          >
            <BookOpen size={18} />
            <span>Overview & Introduction</span>
          </button>

          <button
            className={`mobile-nav-link ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => handleNavClick('home')}
          >
            <Sparkles size={18} />
            <span>Say & Show (Translator)</span>
          </button>

          <button
            className={`mobile-nav-link ${activeTab === 'explore' ? 'active' : ''}`}
            onClick={() => handleNavClick('explore')}
          >
            <Compass size={18} />
            <span>Explore Phrasebook</span>
          </button>

          <button
            className={`mobile-nav-link ${activeTab === 'audio' ? 'active' : ''}`}
            onClick={() => handleNavClick('audio')}
          >
            <Headphones size={18} />
            <span>Audio Pronunciation Guide</span>
          </button>

          <button
            className={`mobile-nav-link ${activeTab === 'saved' ? 'active' : ''}`}
            onClick={() => handleNavClick('saved')}
          >
            <Bookmark size={18} />
            <span>Saved Offline Phrases {savedCount > 0 ? `(${savedCount})` : ''}</span>
          </button>
        </div>
      )}
    </header>
  );
}
