import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, ArrowRight, User } from 'lucide-react';

export default function PublicLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isExplore = location.pathname === '/explore';

  return (
    <div className="app-layout">
      {/* Public Header */}
      <header className="app-header">
        <div className="container header-content">
          {/* Brand Wordmark */}
          <Link to="/" className="brand-link" aria-label="KannadaConnect Home">
            <div className="brand-emblem" aria-hidden="true">ಕ</div>
            <div>
              <div className="brand-title">KannadaConnect</div>
            </div>
          </Link>

          {/* Desktop Public Navigation */}
          <nav className="nav-group desktop-nav" aria-label="Public Navigation">
            <Link
              to="/#how-it-works"
              className="nav-btn"
              onClick={(e) => {
                if (location.pathname === '/') {
                  e.preventDefault();
                  document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <span>How It Works</span>
            </Link>

            <Link
              to="/explore"
              className={`nav-btn ${isExplore ? 'active' : ''}`}
            >
              <span>Explore Phrases</span>
            </Link>

            {isAuthenticated ? (
              <button
                type="button"
                className="btn-primary"
                onClick={() => navigate('/app')}
                style={{ padding: '8px 16px', fontSize: '13.5px', marginLeft: '6px' }}
              >
                <User size={15} />
                <span>Go to App ({user?.name ? user.name.split(' ')[0] : 'Member'})</span>
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="nav-btn"
                  id="nav-public-signin"
                >
                  <span>Sign In</span>
                </Link>

                <Link
                  to="/signup"
                  className="btn-primary"
                  id="nav-public-getstarted"
                  style={{ padding: '8px 18px', fontSize: '13.5px', marginLeft: '4px' }}
                >
                  <span>Get Started</span>
                  <ArrowRight size={14} />
                </Link>
              </>
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
              to="/#how-it-works"
              className="mobile-nav-link"
              onClick={(e) => {
                setMobileMenuOpen(false);
                if (location.pathname === '/') {
                  e.preventDefault();
                  document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <span>How It Works</span>
            </Link>

            <Link
              to="/explore"
              className={`mobile-nav-link ${isExplore ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Explore Phrases</span>
            </Link>

            {isAuthenticated ? (
              <button
                type="button"
                className="mobile-nav-link active"
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/app');
                }}
              >
                <span>Go to App ({user?.name})</span>
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="mobile-nav-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>Sign In</span>
                </Link>
                <Link
                  to="/signup"
                  className="mobile-nav-link active"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>Get Started Free</span>
                </Link>
              </>
            )}
          </div>
        )}
      </header>

      {/* Main Page Body */}
      <main className={`main-content ${location.pathname === '/' ? 'landing-main-reset' : ''}`}>
        <Outlet />
      </main>
    </div>
  );
}
