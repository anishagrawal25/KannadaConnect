import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  MessageSquare, 
  BookOpen, 
  Mic, 
  Bookmark, 
  Menu, 
  X,
  LogIn,
  LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AppLayout({ savedCount = 0 }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, signOut, isAuthenticated } = useAuth();

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

            {/* Auth Controls */}
            {isAuthenticated ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '8px', borderLeft: '1px solid var(--color-border)', paddingLeft: '12px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--color-forest)', color: 'var(--color-ivory)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700 }} title={user?.email}>
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <button
                  type="button"
                  onClick={() => signOut()}
                  className="nav-btn"
                  style={{ padding: '6px 10px', fontSize: '13px' }}
                  title="Sign Out"
                >
                  <LogOut size={15} />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '8px', borderLeft: '1px solid var(--color-border)', paddingLeft: '12px' }}>
                <Link to="/login" className="nav-btn" style={{ padding: '6px 12px', fontSize: '13px' }}>
                  <LogIn size={15} />
                  <span>Sign In</span>
                </Link>
                <Link to="/signup" className="btn-primary" style={{ padding: '6px 14px', fontSize: '13px' }}>
                  <span>Sign Up</span>
                </Link>
              </div>
            )}
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

            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '12px', marginTop: '6px' }}>
              {isAuthenticated ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--color-forest)', color: 'var(--color-ivory)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700 }}>
                      {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <span style={{ fontSize: '13.5px', fontWeight: 600 }}>{user?.name || user?.email}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => { signOut(); closeMobile(); }}
                    className="nav-btn"
                    style={{ padding: '6px 10px', fontSize: '12px' }}
                  >
                    <LogOut size={14} />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: '10px', padding: '6px 8px' }}>
                  <Link
                    to="/login"
                    className="nav-btn"
                    onClick={closeMobile}
                    style={{ flex: 1, justifyContent: 'center' }}
                  >
                    <LogIn size={16} />
                    <span>Sign In</span>
                  </Link>
                  <Link
                    to="/signup"
                    className="btn-primary"
                    onClick={closeMobile}
                    style={{ flex: 1, justifyContent: 'center', padding: '8px 14px', fontSize: '13.5px' }}
                  >
                    <span>Sign Up</span>
                  </Link>
                </div>
              )}
            </div>
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
