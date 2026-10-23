import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Sparkles, 
  Compass, 
  Bookmark, 
  Headphones, 
  User, 
  LogOut, 
  Menu, 
  X,
  ChevronDown
} from 'lucide-react';

export default function AppLayout({ savedCount }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setProfileDropdownOpen(false);
    setMobileMenuOpen(false);
    await signOut();
    navigate('/', { replace: true });
  };

  const isActive = (path) => {
    if (path === '/app') {
      return location.pathname === '/app';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="app-layout">
      {/* Authenticated Application Header */}
      <header className="app-header">
        <div className="container header-content">
          {/* Brand Wordmark */}
          <Link to="/app" className="brand-link" aria-label="KannadaConnect App">
            <div className="brand-emblem" aria-hidden="true">ಕ</div>
            <div>
              <div className="brand-title">KannadaConnect</div>
            </div>
          </Link>

          {/* Desktop Application Navigation Tabs */}
          <nav className="nav-group desktop-nav" aria-label="Application Navigation">
            <Link
              to="/app"
              className={`nav-btn ${isActive('/app') ? 'active' : ''}`}
              id="nav-app-say"
            >
              <Sparkles size={16} />
              <span>Say & Show</span>
            </Link>

            <Link
              to="/app/explore"
              className={`nav-btn ${isActive('/app/explore') ? 'active' : ''}`}
              id="nav-app-explore"
            >
              <Compass size={16} />
              <span>Explore</span>
            </Link>

            <Link
              to="/app/audio-guide"
              className={`nav-btn ${isActive('/app/audio-guide') ? 'active' : ''}`}
              id="nav-app-audio"
            >
              <Headphones size={16} />
              <span>Audio Guide</span>
            </Link>

            <Link
              to="/app/saved"
              className={`nav-btn ${isActive('/app/saved') ? 'active' : ''}`}
              id="nav-app-saved"
              aria-label={`Saved phrases: ${savedCount}`}
            >
              <Bookmark size={16} />
              <span>Saved</span>
              {savedCount > 0 && <span className="nav-badge">{savedCount}</span>}
            </Link>

            {/* User Profile & Account Dropdown */}
            <div style={{ position: 'relative', marginLeft: '6px' }}>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                id="btn-user-profile-menu"
                style={{ padding: '6px 12px', fontSize: '13px', gap: '6px' }}
                aria-expanded={profileDropdownOpen}
              >
                <div style={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-forest)',
                  color: 'var(--color-ivory)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  fontWeight: 700
                }}>
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <span>{user?.name ? user.name.split(' ')[0] : 'Account'}</span>
                <ChevronDown size={13} />
              </button>

              {/* Profile Dropdown Menu */}
              {profileDropdownOpen && (
                <div 
                  className="auth-dropdown-menu"
                  onMouseLeave={() => setProfileDropdownOpen(false)}
                >
                  <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--color-border)', fontSize: '12px' }}>
                    <div style={{ fontWeight: 700, color: 'var(--color-charcoal)' }}>{user?.name}</div>
                    <div style={{ color: 'var(--color-charcoal-subtle)', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.email}</div>
                  </div>

                  <Link
                    to="/app/account"
                    className="dropdown-item"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    <User size={15} />
                    <span>Account Settings</span>
                  </Link>

                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={handleLogout}
                    style={{ color: 'var(--color-terracotta)', width: '100%', textAlign: 'left', background: 'none', border: 'none' }}
                  >
                    <LogOut size={15} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
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
              to="/app"
              className={`mobile-nav-link ${isActive('/app') ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Sparkles size={18} />
              <span>Say & Show (Generator)</span>
            </Link>

            <Link
              to="/app/explore"
              className={`mobile-nav-link ${isActive('/app/explore') ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Compass size={18} />
              <span>Explore Phrasebook</span>
            </Link>

            <Link
              to="/app/audio-guide"
              className={`mobile-nav-link ${isActive('/app/audio-guide') ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Headphones size={18} />
              <span>Audio Guide</span>
            </Link>

            <Link
              to="/app/saved"
              className={`mobile-nav-link ${isActive('/app/saved') ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Bookmark size={18} />
              <span>Saved Phrases {savedCount > 0 ? `(${savedCount})` : ''}</span>
            </Link>

            <Link
              to="/app/account"
              className={`mobile-nav-link ${isActive('/app/account') ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <User size={18} />
              <span>Account & Storage</span>
            </Link>

            <button
              type="button"
              className="mobile-nav-link"
              onClick={handleLogout}
              style={{ color: 'var(--color-terracotta)' }}
            >
              <LogOut size={18} />
              <span>Sign Out</span>
            </button>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="main-content">
        <div className="container">
          <Outlet />
        </div>
      </main>

      {/* Standardized Application Footer */}
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
    </div>
  );
}
