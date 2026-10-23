import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usePreferences } from '../hooks/usePreferences';
import { 
  User, 
  Mail, 
  Calendar, 
  Bookmark, 
  HardDrive, 
  ArrowLeft, 
  ArrowRight,
  Volume2, 
  VolumeX, 
  KeyRound, 
  LogOut, 
  Check, 
  AlertCircle, 
  ShieldCheck, 
  Trash2,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';
import { getSavedPhrases, clearSavedPhrases } from '../utils/storage';
import { speechService } from '../utils/speech';

export default function Account() {
  const { user, signOut, updateProfile, changePassword } = useAuth();
  const { preferences, updatePreference } = usePreferences();
  const navigate = useNavigate();

  // Profile Edit State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileName, setProfileName] = useState(user?.name || '');
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(null);
  const [profileError, setProfileError] = useState(null);

  // Saved Phrases Count & Clear Confirmation
  const [savedCount, setSavedCount] = useState(0);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [storageNotice, setStorageNotice] = useState(null);

  // Speech Test State
  const [isTestingSpeech, setIsTestingSpeech] = useState(false);
  const [speechNotice, setSpeechNotice] = useState(null);

  // Security / Change Password State
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswordText, setShowPasswordText] = useState(false);
  const [passwordUpdating, setPasswordUpdating] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  // Logout Confirmation State
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  useEffect(() => {
    setSavedCount(getSavedPhrases().length);
    if (user?.name) {
      setProfileName(user.name);
    }
  }, [user]);

  if (!user) return null;

  // Format member since date
  const formattedDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : null;

  // Generate initials (e.g. DP for Dhruv Patil)
  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  // Profile Save Handler
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setProfileError(null);
    setProfileSuccess(null);

    if (!profileName.trim() || profileName.trim().length < 2) {
      setProfileError('Display name must be at least 2 characters.');
      return;
    }

    setProfileSaving(true);
    try {
      await updateProfile({ name: profileName.trim() });
      setProfileSuccess('Display name updated successfully.');
      setIsEditingProfile(false);
      setTimeout(() => setProfileSuccess(null), 3500);
    } catch (err) {
      setProfileError(err.message || 'Failed to update profile name.');
    } finally {
      setProfileSaving(false);
    }
  };

  // Speech Synthesis Test
  const handleTestSpeech = () => {
    if (isTestingSpeech) {
      speechService.stop();
      setIsTestingSpeech(false);
      return;
    }

    setIsTestingSpeech(true);
    setSpeechNotice(null);

    const testPhrase = 'ನಮಸ್ಕಾರ, ಹೇಗಿದ್ದೀರಾ?'; // "Hello, how are you?"
    const success = speechService.speak(
      testPhrase,
      () => setIsTestingSpeech(false),
      (err) => {
        setIsTestingSpeech(false);
        setSpeechNotice(
          err?.message ||
          'A native Kannada voice is not installed on this browser or operating system. Phonetic guides and Show Mode remain available.'
        );
      },
      { rate: preferences.speechRate }
    );

    if (!success && !speechNotice) {
      setIsTestingSpeech(false);
      if (!speechService.hasKannadaVoice()) {
        setSpeechNotice('A native Kannada voice is not installed on this browser. Phonetic transliteration and Show Mode are recommended.');
      }
    }
  };

  // Clear Saved Phrases Handler
  const handleClearSavedPhrases = () => {
    clearSavedPhrases();
    setSavedCount(0);
    setShowClearConfirm(false);
    setStorageNotice('All saved phrases have been cleared from this browser.');
    setTimeout(() => setStorageNotice(null), 4000);
  };

  // Change Password Handler
  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);

    if (!currentPassword) {
      setPasswordError('Please enter your current password.');
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match. Please verify.');
      return;
    }

    setPasswordUpdating(true);
    try {
      await changePassword({ currentPassword, newPassword });
      setPasswordSuccess('Password updated successfully.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setShowPasswordForm(false);
      setTimeout(() => setPasswordSuccess(null), 4000);
    } catch (err) {
      setPasswordError(err.message || 'Could not update password. Please check your current password.');
    } finally {
      setPasswordUpdating(false);
    }
  };

  // Sign Out Handler
  const handleConfirmLogout = async () => {
    setLogoutLoading(true);
    try {
      await signOut();
      navigate('/', { replace: true });
    } catch (err) {
      console.error('Error signing out:', err);
      navigate('/', { replace: true });
    } finally {
      setLogoutLoading(false);
    }
  };

  return (
    <div className="settings-container">
      {/* Return to App Bar */}
      <div style={{ marginBottom: '20px' }}>
        <button
          type="button"
          className="btn-secondary"
          onClick={() => navigate('/app')}
          style={{ padding: '6px 14px', fontSize: '13px' }}
        >
          <ArrowLeft size={14} />
          <span>Back to Say & Show</span>
        </button>
      </div>

      {/* Page Header */}
      <div className="settings-header">
        <h1 className="settings-title">Account & Preferences</h1>
        <p className="settings-subtitle">
          Manage your profile and personalize your KannadaConnect experience.
        </p>
      </div>

      {/* Global Alerts if any */}
      {profileSuccess && (
        <div className="toast-notice" style={{ position: 'static', margin: '0 0 16px', borderRadius: 'var(--radius-md)' }}>
          <Check size={16} />
          <span>{profileSuccess}</span>
        </div>
      )}

      {storageNotice && (
        <div className="toast-notice" style={{ position: 'static', margin: '0 0 16px', borderRadius: 'var(--radius-md)' }}>
          <Check size={16} />
          <span>{storageNotice}</span>
        </div>
      )}

      {passwordSuccess && (
        <div className="toast-notice" style={{ position: 'static', margin: '0 0 16px', borderRadius: 'var(--radius-md)' }}>
          <Check size={16} />
          <span>{passwordSuccess}</span>
        </div>
      )}

      {/* SECTION 1: PROFILE SUMMARY */}
      <section className="settings-section" style={{ borderTop: 'none', paddingTop: 0 }}>
        <div className="settings-section-title">
          <User size={18} color="var(--color-forest)" />
          <span>Profile</span>
        </div>
        <p className="settings-section-desc">
          Your personal information and authenticated member identity.
        </p>

        <div className="settings-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-forest)',
                color: 'var(--color-ivory)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                fontWeight: 800,
                flexShrink: 0,
                letterSpacing: '0.02em'
              }}>
                {getInitials(user.name)}
              </div>

              <div>
                <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-charcoal)' }}>
                  {user.name}
                </div>
                <div style={{ fontSize: '13.5px', color: 'var(--color-charcoal-muted)', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                  <Mail size={13} />
                  <span>{user.email}</span>
                </div>
                {formattedDate && (
                  <div style={{ fontSize: '12px', color: 'var(--color-charcoal-subtle)', display: 'flex', alignItems: 'center', gap: '5px', marginTop: '4px' }}>
                    <Calendar size={12} />
                    <span>Member since {formattedDate}</span>
                  </div>
                )}
              </div>
            </div>

            {!isEditingProfile && (
              <button
                type="button"
                className="btn-secondary"
                onClick={() => {
                  setProfileName(user.name);
                  setIsEditingProfile(true);
                }}
                style={{ fontSize: '13px', padding: '6px 14px' }}
              >
                <span>Edit Profile</span>
              </button>
            )}
          </div>

          {/* Inline Edit Profile Form */}
          {isEditingProfile && (
            <form onSubmit={handleSaveProfile} style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--color-border)' }}>
              {profileError && (
                <div className="auth-error-alert" style={{ marginBottom: '14px' }}>
                  <AlertCircle size={15} />
                  <span>{profileError}</span>
                </div>
              )}

              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label className="form-label" htmlFor="settings-edit-name">
                  Full Display Name
                </label>
                <input
                  id="settings-edit-name"
                  type="text"
                  className="form-input"
                  style={{ padding: '0 14px' }}
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  disabled={profileSaving}
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={profileSaving || !profileName.trim()}
                  style={{ padding: '8px 18px', fontSize: '13.5px' }}
                >
                  {profileSaving ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setIsEditingProfile(false)}
                  disabled={profileSaving}
                  style={{ padding: '8px 16px', fontSize: '13.5px' }}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* SECTION 2: PREFERENCES */}
      <section className="settings-section">
        <div className="settings-section-title">
          <Volume2 size={18} color="var(--color-forest)" />
          <span>Language & Pronunciation Preferences</span>
        </div>
        <p className="settings-section-desc">
          Customize how Kannada phrases, phonetic guides, and audio playback behave.
        </p>

        <div className="settings-card">
          {/* Transliteration Display Toggle */}
          <div className="settings-row">
            <div className="settings-row-info">
              <span className="settings-row-label">Phonetic Romanized Transliteration</span>
              <span className="settings-row-sub">
                Display English phonetic guidance beneath Kannada script (e.g. "Namaskāra")
              </span>
            </div>
            <button
              type="button"
              className={`toggle-switch ${preferences.showTransliteration !== false ? 'active' : ''}`}
              onClick={() => updatePreference('showTransliteration', !preferences.showTransliteration)}
              aria-label="Toggle transliteration display"
              role="switch"
              aria-checked={preferences.showTransliteration !== false}
            >
              <div className="toggle-knob" />
            </button>
          </div>

          {/* English Meaning Display Toggle */}
          <div className="settings-row">
            <div className="settings-row-info">
              <span className="settings-row-label">Show English Meaning</span>
              <span className="settings-row-sub">
                Display literal English translations and intent definitions
              </span>
            </div>
            <button
              type="button"
              className={`toggle-switch ${preferences.showEnglishMeaning !== false ? 'active' : ''}`}
              onClick={() => updatePreference('showEnglishMeaning', !preferences.showEnglishMeaning)}
              aria-label="Toggle English meaning display"
              role="switch"
              aria-checked={preferences.showEnglishMeaning !== false}
            >
              <div className="toggle-knob" />
            </button>
          </div>

          {/* Speech Playback Speed */}
          <div className="settings-row">
            <div className="settings-row-info">
              <span className="settings-row-label">Audio Pronunciation Pace</span>
              <span className="settings-row-sub">
                Adjust playback speed for clear listening and syllable comprehension
              </span>
            </div>

            <div className="segmented-control" role="group" aria-label="Playback Speed">
              <button
                type="button"
                className={`segment-btn ${preferences.speechRate === 1.0 ? 'active' : ''}`}
                onClick={() => updatePreference('speechRate', 1.0)}
              >
                1.0x Normal
              </button>
              <button
                type="button"
                className={`segment-btn ${preferences.speechRate === 0.85 ? 'active' : ''}`}
                onClick={() => updatePreference('speechRate', 0.85)}
              >
                0.85x Clear
              </button>
              <button
                type="button"
                className={`segment-btn ${preferences.speechRate === 0.7 ? 'active' : ''}`}
                onClick={() => updatePreference('speechRate', 0.7)}
              >
                0.7x Gentle
              </button>
            </div>
          </div>

          {/* Audio Test Row */}
          <div className="settings-row" style={{ alignItems: 'flex-start' }}>
            <div className="settings-row-info">
              <span className="settings-row-label">Audio Synthesis Validation</span>
              <span className="settings-row-sub">
                Test whether your browser and operating system have Kannada voice synthesis installed
              </span>
            </div>

            <button
              type="button"
              className="btn-secondary"
              onClick={handleTestSpeech}
              style={{
                fontSize: '13px',
                padding: '6px 14px',
                backgroundColor: isTestingSpeech ? 'var(--color-terracotta-light)' : 'transparent',
                borderColor: isTestingSpeech ? 'var(--color-terracotta)' : 'var(--color-border)',
                color: isTestingSpeech ? 'var(--color-terracotta)' : 'var(--color-forest)',
                flexShrink: 0
              }}
            >
              {isTestingSpeech ? (
                <>
                  <VolumeX size={14} />
                  <span>Stop Test</span>
                </>
              ) : (
                <>
                  <Volume2 size={14} />
                  <span>Test Audio</span>
                </>
              )}
            </button>
          </div>

          {/* Speech Notice if any */}
          {speechNotice && (
            <div style={{
              marginTop: '12px',
              padding: '10px 14px',
              backgroundColor: 'var(--color-gold-light)',
              border: '1px solid #E8D39E',
              borderRadius: 'var(--radius-md)',
              fontSize: '13px',
              color: 'var(--color-gold)',
              lineHeight: 1.45
            }}>
              {speechNotice}
            </div>
          )}

          {/* Appearance Information */}
          <div className="settings-row">
            <div className="settings-row-info">
              <span className="settings-row-label">Application Theme</span>
              <span className="settings-row-sub">
                Warm Ivory & Forest Green — calibrated for daytime and high-contrast street readability
              </span>
            </div>
            <span style={{
              fontSize: '12.5px',
              fontWeight: 600,
              color: 'var(--color-forest)',
              backgroundColor: 'var(--color-forest-light)',
              padding: '4px 10px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-sage)'
            }}>
              Light (Warm Ivory)
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 3: SAVED PHRASES & STORAGE */}
      <section className="settings-section">
        <div className="settings-section-title">
          <HardDrive size={18} color="var(--color-forest)" />
          <span>Saved Phrases & Storage</span>
        </div>
        <p className="settings-section-desc">
          Review your offline saved phrases and manage locally persisted data.
        </p>

        <div className="settings-card">
          <div className="settings-row">
            <div className="settings-row-info">
              <span className="settings-row-label">Offline Saved Phrases</span>
              <span className="settings-row-sub">
                {savedCount} {savedCount === 1 ? 'phrase' : 'phrases'} stored locally in this browser sandbox
              </span>
            </div>

            <Link
              to="/app/saved"
              className="btn-secondary"
              style={{ fontSize: '13px', padding: '6px 14px', flexShrink: 0 }}
            >
              <Bookmark size={14} />
              <span>View Saved</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          {/* Storage Model Explanation */}
          <div style={{ padding: '12px 14px', backgroundColor: 'var(--color-sand-light)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', margin: '14px 0', fontSize: '13px', color: 'var(--color-charcoal-muted)', lineHeight: 1.5 }}>
            <strong style={{ color: 'var(--color-charcoal)' }}>Local Storage Model:</strong> Your saved phrases are stored strictly within this browser's local sandbox on this device. They are not relayed to third-party databases and do not automatically synchronize across other devices.
          </div>

          {/* Clear Local Phrases */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '4px' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-charcoal)' }}>
                Clear Saved Phrases
              </div>
              <div style={{ fontSize: '12.5px', color: 'var(--color-charcoal-subtle)' }}>
                Permanently delete all saved phrases from this browser
              </div>
            </div>

            <button
              type="button"
              className="btn-secondary"
              onClick={() => setShowClearConfirm(true)}
              disabled={savedCount === 0}
              style={{
                fontSize: '12.5px',
                padding: '6px 12px',
                color: savedCount === 0 ? 'var(--color-charcoal-subtle)' : 'var(--color-terracotta)',
                borderColor: savedCount === 0 ? 'var(--color-border)' : 'var(--color-border)'
              }}
            >
              <Trash2 size={13} />
              <span>Clear Data</span>
            </button>
          </div>

          {/* Clear Confirmation Prompt */}
          {showClearConfirm && (
            <div className="inline-confirm-box">
              <div style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--color-terracotta)', marginBottom: '4px' }}>
                Confirm Deletion of Saved Phrases
              </div>
              <p style={{ fontSize: '13px', color: 'var(--color-charcoal-muted)', lineHeight: 1.45, marginBottom: '12px' }}>
                Are you sure you want to delete all {savedCount} saved phrases from this browser? This action cannot be undone. Your user profile, security credentials, and preferences will remain untouched.
              </p>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={handleClearSavedPhrases}
                  style={{
                    backgroundColor: 'var(--color-terracotta)',
                    borderColor: 'var(--color-terracotta)',
                    fontSize: '12.5px',
                    padding: '6px 14px'
                  }}
                >
                  Yes, Clear Saved Phrases
                </button>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setShowClearConfirm(false)}
                  style={{ fontSize: '12.5px', padding: '6px 12px' }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 4: SECURITY */}
      <section className="settings-section">
        <div className="settings-section-title">
          <ShieldCheck size={18} color="var(--color-forest)" />
          <span>Security</span>
        </div>
        <p className="settings-section-desc">
          Manage your password and inspect cryptographic credential protections.
        </p>

        <div className="settings-card">
          <div className="settings-row">
            <div className="settings-row-info">
              <span className="settings-row-label">Active Session</span>
              <span className="settings-row-sub">
                Authenticated session active on this device • Expires automatically after 7 days
              </span>
            </div>
            <span style={{
              fontSize: '11.5px',
              fontWeight: 700,
              color: 'var(--color-forest)',
              backgroundColor: 'var(--color-forest-light)',
              padding: '3px 8px',
              borderRadius: 'var(--radius-full)'
            }}>
              Active
            </span>
          </div>

          <div className="settings-row">
            <div className="settings-row-info">
              <span className="settings-row-label">Password Protection</span>
              <span className="settings-row-sub">
                Protected by client-side PBKDF2 hashing (100,000 iterations of SHA-256)
              </span>
            </div>

            {!showPasswordForm && (
              <button
                type="button"
                className="btn-secondary"
                onClick={() => {
                  setShowPasswordForm(true);
                  setPasswordError(null);
                }}
                style={{ fontSize: '13px', padding: '6px 14px' }}
              >
                <KeyRound size={14} />
                <span>Change Password</span>
              </button>
            )}
          </div>

          {/* Change Password Form */}
          {showPasswordForm && (
            <form onSubmit={handleChangePassword} style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--color-border)' }}>
              {passwordError && (
                <div className="auth-error-alert" style={{ marginBottom: '14px' }}>
                  <AlertCircle size={15} />
                  <span>{passwordError}</span>
                </div>
              )}

              <div className="form-group" style={{ marginBottom: '12px' }}>
                <label className="form-label" htmlFor="settings-current-pwd">
                  Current Password
                </label>
                <div className="input-with-icon">
                  <Lock size={15} className="input-icon" />
                  <input
                    id="settings-current-pwd"
                    type={showPasswordText ? 'text' : 'password'}
                    className="form-input"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                    disabled={passwordUpdating}
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowPasswordText(!showPasswordText)}
                    aria-label="Toggle password view"
                  >
                    {showPasswordText ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '12px' }}>
                <label className="form-label" htmlFor="settings-new-pwd">
                  New Password (min 6 characters)
                </label>
                <div className="input-with-icon">
                  <Lock size={15} className="input-icon" />
                  <input
                    id="settings-new-pwd"
                    type={showPasswordText ? 'text' : 'password'}
                    className="form-input"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    minLength={6}
                    disabled={passwordUpdating}
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label className="form-label" htmlFor="settings-confirm-pwd">
                  Confirm New Password
                </label>
                <div className="input-with-icon">
                  <Lock size={15} className="input-icon" />
                  <input
                    id="settings-confirm-pwd"
                    type={showPasswordText ? 'text' : 'password'}
                    className="form-input"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                    disabled={passwordUpdating}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={passwordUpdating || !currentPassword || !newPassword || !confirmPassword}
                  style={{ padding: '8px 18px', fontSize: '13.5px' }}
                >
                  {passwordUpdating ? 'Updating...' : 'Update Password'}
                </button>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    setShowPasswordForm(false);
                    setCurrentPassword('');
                    setNewPassword('');
                    setConfirmPassword('');
                  }}
                  disabled={passwordUpdating}
                  style={{ padding: '8px 16px', fontSize: '13.5px' }}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* SECTION 5: SIGN OUT */}
      <section className="settings-section" style={{ paddingBottom: '20px' }}>
        <div className="settings-section-title">
          <LogOut size={18} color="var(--color-terracotta)" />
          <span>Sign Out</span>
        </div>
        <p className="settings-section-desc">
          Sign out of KannadaConnect on this device.
        </p>

        <div className="settings-card" style={{ borderColor: '#F5C6BA' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-charcoal)' }}>
                Terminate active session
              </div>
              <div style={{ fontSize: '13px', color: 'var(--color-charcoal-muted)' }}>
                End your authenticated session on this browser and return to the public landing page.
              </div>
            </div>

            {!showLogoutConfirm && (
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setShowLogoutConfirm(true)}
                id="btn-account-signout"
                style={{
                  color: 'var(--color-terracotta)',
                  backgroundColor: 'var(--color-terracotta-light)',
                  borderColor: '#E8B9AA',
                  padding: '8px 18px',
                  fontSize: '13.5px'
                }}
              >
                <LogOut size={15} />
                <span>Sign Out</span>
              </button>
            )}
          </div>

          {/* Logout Confirmation Prompt */}
          {showLogoutConfirm && (
            <div className="inline-confirm-box" style={{ marginTop: '16px' }}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-charcoal)', marginBottom: '4px' }}>
                Are you sure you want to sign out?
              </div>
              <p style={{ fontSize: '13px', color: 'var(--color-charcoal-muted)', marginBottom: '12px' }}>
                Your local saved phrases will remain in this browser, but you will need to sign in again to access the application suite.
              </p>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={handleConfirmLogout}
                  disabled={logoutLoading}
                  style={{
                    backgroundColor: 'var(--color-terracotta)',
                    borderColor: 'var(--color-terracotta)',
                    padding: '7px 16px',
                    fontSize: '13px'
                  }}
                >
                  {logoutLoading ? 'Signing Out...' : 'Confirm Sign Out'}
                </button>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setShowLogoutConfirm(false)}
                  disabled={logoutLoading}
                  style={{ padding: '7px 14px', fontSize: '13px' }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
