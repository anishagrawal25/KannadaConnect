import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  MessageSquare, 
  BookOpen, 
  Mic, 
  Bookmark, 
  Menu, 
  X,
  LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AppLayout({ savedCount = 0 }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut, isAuthenticated } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/', { replace: true });
  };

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

          {/* Desktop Navigation */}
          <nav className="nav-group desktop-nav" aria-label="Main Navigation">
            {isAuthenticated ? (
              <>
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

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '8px', borderLeft: '1px solid var(--color-border)', paddingLeft: '12px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--color-forest)', color: 'var(--color-ivory)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700 }} title={user?.email}>
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="nav-btn"
                    style={{ padding: '6px 10px', fontSize: '13px' }}
                    title="Sign Out"
                  >
                    <LogOut size={15} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <a
                  href="/#how-it-works"
                  className="nav-btn"
                  style={{ textDecoration: 'none' }}
                >
                  <span>How It Works</span>
                </a>
                <Link
                  to="/login"
                  className="nav-btn"
                  id="nav-signin"
                >
                  <span>Sign In</span>
                </Link>
                <Link
                  to="/signup"
                  className="btn-primary"
                  id="nav-getstarted"
                  style={{ padding: '7px 18px', fontSize: '13.5px' }}
                >
                  <span>Get Started</span>
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
            {isAuthenticated ? (
              <>
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
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--color-forest)', color: 'var(--color-ivory)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700 }}>
                        {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                      </div>
                      <span style={{ fontSize: '13.5px', fontWeight: 600 }}>{user?.name || user?.email}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => { closeMobile(); handleSignOut(); }}
                      className="nav-btn"
                      style={{ padding: '6px 10px', fontSize: '12px' }}
                    >
                      <LogOut size={14} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '10px 4px' }}>
                <a
                  href="/#how-it-works"
                  className="mobile-nav-link"
                  onClick={closeMobile}
                >
                  <span>How It Works</span>
                </a>
                <Link
                  to="/login"
                  className="mobile-nav-link"
                  onClick={closeMobile}
                >
                  <span>Sign In</span>
                </Link>
                <Link
                  to="/signup"
                  className="btn-primary"
                  onClick={closeMobile}
                  style={{ width: '100%', justifyContent: 'center', padding: '10px 14px', fontSize: '14px', marginTop: '6px' }}
                >
                  <span>Get Started</span>
                </Link>
              </div>
            )}
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
