import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  MessageSquare, 
  BookOpen, 
  Mic, 
  Bookmark, 
  Menu, 
  X 
} from 'lucide-react';

export default function AppLayout({ savedCount = 0 }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/conversations') {
      return location.pathname === '/conversations' || location.pathname === '/app';
    }
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <div className="app-layout">
      {/* Primary Application Header */}
      <header className="app-header">
        <div className="container header-content">
          {/* Brand Wordmark */}
          <Link to="/" className="brand-link" aria-label="KannadaConnect Home" onClick={closeMobile}>
            <div className="brand-emblem" aria-hidden="true">ಕ</div>
            <div>
              <div className="brand-title">KannadaConnect</div>
              <div className="brand-tag-small">Kannada for Everyone</div>
            </div>
          </Link>

          {/* Desktop Core Navigation */}
          <nav className="nav-group desktop-nav" aria-label="Main Navigation">
            <Link
              to="/conversations"
              className={`nav-btn ${isActive('/conversations') ? 'active' : ''}`}
              id="nav-conversations"
            >
              <MessageSquare size={16} />
              <span>Conversations</span>
            </Link>

            <Link
              to="/vocabulary"
              className={`nav-btn ${isActive('/vocabulary') ? 'active' : ''}`}
              id="nav-vocabulary"
            >
              <BookOpen size={16} />
              <span>Vocabulary</span>
            </Link>

            <Link
              to="/practice"
              className={`nav-btn ${isActive('/practice') ? 'active' : ''}`}
              id="nav-practice"
            >
              <Mic size={16} />
              <span>Guided Practice</span>
            </Link>

            <Link
              to="/saved"
              className={`nav-btn ${isActive('/saved') ? 'active' : ''}`}
              id="nav-saved"
              aria-label={`Saved collection: ${savedCount}`}
            >
              <Bookmark size={16} />
              <span>Saved</span>
              {savedCount > 0 && <span className="nav-badge">{savedCount}</span>}
            </Link>
          </nav>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="mobile-nav-drawer" role="dialog" aria-modal="true">
            <Link
              to="/conversations"
              className={`mobile-nav-link ${isActive('/conversations') ? 'active' : ''}`}
              onClick={closeMobile}
            >
              <MessageSquare size={18} />
              <span>Conversations</span>
            </Link>

            <Link
              to="/vocabulary"
              className={`mobile-nav-link ${isActive('/vocabulary') ? 'active' : ''}`}
              onClick={closeMobile}
            >
              <BookOpen size={18} />
              <span>Vocabulary</span>
            </Link>

            <Link
              to="/practice"
              className={`mobile-nav-link ${isActive('/practice') ? 'active' : ''}`}
              onClick={closeMobile}
            >
              <Mic size={18} />
              <span>Guided Practice</span>
            </Link>

            <Link
              to="/saved"
              className={`mobile-nav-link ${isActive('/saved') ? 'active' : ''}`}
              onClick={closeMobile}
            >
              <Bookmark size={18} />
              <span>Saved</span>
              {savedCount > 0 && <span className="nav-badge" style={{ marginLeft: '6px' }}>{savedCount}</span>}
            </Link>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="app-main-content">
        <div className="container app-content-inner">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
