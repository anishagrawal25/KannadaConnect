import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Lock, Mail, User, ArrowRight, AlertCircle, ShieldCheck } from 'lucide-react';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { signUp, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/app', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please verify your password confirmation.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setIsSubmitting(true);

    try {
      await signUp({ name, email, password });
      navigate('/app', { replace: true });
    } catch (err) {
      setError(err.message || 'Could not complete registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        {/* Brand Header */}
        <div className="auth-brand-header">
          <Link to="/" className="brand-link" style={{ justifyContent: 'center' }}>
            <div className="brand-emblem" aria-hidden="true">ಕ</div>
            <div style={{ textAlign: 'left' }}>
              <div className="brand-title">KannadaConnect</div>
              <div className="brand-tag-small">Account Portal</div>
            </div>
          </Link>
          <h1 className="auth-title">Create your account</h1>
          <p className="auth-subtitle">Join KannadaConnect to access real-world Kannada communication tools.</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="auth-error-alert" role="alert">
            <AlertCircle size={17} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label" htmlFor="signup-name">
              Full Name
            </label>
            <div className="input-with-icon">
              <User size={17} className="input-icon" />
              <input
                id="signup-name"
                type="text"
                className="form-input"
                placeholder="Ananya Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="signup-email">
              Email Address
            </label>
            <div className="input-with-icon">
              <Mail size={17} className="input-icon" />
              <input
                id="signup-email"
                type="email"
                className="form-input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="signup-password">
              Password
            </label>
            <div className="input-with-icon">
              <Lock size={17} className="input-icon" />
              <input
                id="signup-password"
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                autoComplete="new-password"
                disabled={isSubmitting}
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="signup-confirm-password">
              Confirm Password
            </label>
            <div className="input-with-icon">
              <Lock size={17} className="input-icon" />
              <input
                id="signup-confirm-password"
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                autoComplete="new-password"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary auth-submit-btn"
            disabled={isSubmitting || !name.trim() || !email.trim() || !password || !confirmPassword}
          >
            {isSubmitting ? (
              <>
                <div className="spinner" aria-hidden="true" />
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <span>Get Started</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Footer Links & Privacy */}
        <div className="auth-footer-links">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="auth-link">
              Sign in here
            </Link>
          </p>

          <div className="auth-privacy-badge">
            <ShieldCheck size={14} color="var(--color-forest)" />
            <span>Cryptographic PBKDF2 vault • Password is never stored in plaintext</span>
          </div>

          <div style={{ marginTop: '16px' }}>
            <Link to="/" style={{ fontSize: '13px', color: 'var(--color-charcoal-subtle)', textDecoration: 'none' }}>
              ← Return to public website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
