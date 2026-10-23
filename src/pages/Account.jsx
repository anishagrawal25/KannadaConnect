import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Calendar, LogOut, Bookmark, HardDrive, ArrowLeft } from 'lucide-react';
import { getSavedPhrases } from '../utils/storage';

export default function Account() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const savedCount = getSavedPhrases().length;

  const handleLogout = async () => {
    await signOut();
    navigate('/', { replace: true });
  };

  if (!user) return null;

  const formattedDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'Active Member';

  return (
    <div className="account-container" style={{ maxWidth: '680px', margin: '0 auto', paddingTop: '20px' }}>
      {/* Back button */}
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

      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-charcoal)', letterSpacing: '-0.02em', marginBottom: '6px' }}>
          Account & Preferences
        </h1>
        <p style={{ fontSize: '15px', color: 'var(--color-charcoal-muted)' }}>
          Manage your authenticated profile and review your storage settings.
        </p>
      </div>

      {/* Profile Card */}
      <div className="phrase-card" style={{ padding: '28px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px', paddingBottom: '20px', borderBottom: '1px solid var(--color-border)' }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--color-forest)',
            color: 'var(--color-ivory)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            fontWeight: 700
          }}>
            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>

          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-charcoal)', marginBottom: '3px' }}>
              {user.name}
            </h2>
            <div style={{ fontSize: '14px', color: 'var(--color-charcoal-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Mail size={14} />
              <span>{user.email}</span>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <div style={{ padding: '14px', backgroundColor: 'var(--color-sand-light)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-charcoal-subtle)', textTransform: 'uppercase', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Calendar size={13} />
              <span>Member Since</span>
            </div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-charcoal)' }}>
              {formattedDate}
            </div>
          </div>

          <div style={{ padding: '14px', backgroundColor: 'var(--color-sand-light)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-charcoal-subtle)', textTransform: 'uppercase', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Bookmark size={13} />
              <span>Saved Phrases</span>
            </div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-forest)' }}>
              {savedCount} {savedCount === 1 ? 'phrase' : 'phrases'} offline
            </div>
          </div>
        </div>

        {/* Storage Architecture Explanation */}
        <div style={{ marginTop: '24px', padding: '16px', backgroundColor: 'var(--color-ivory)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <HardDrive size={18} color="var(--color-forest)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <div style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--color-charcoal)', marginBottom: '4px' }}>
                Local Data Storage Model
              </div>
              <p style={{ fontSize: '13px', color: 'var(--color-charcoal-muted)', lineHeight: 1.5 }}>
                Your saved phrasebook is persisted in your browser sandbox on this device. Multi-device cloud sync will be introduced in an upcoming release.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Action Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', backgroundColor: 'var(--color-white)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
        <div>
          <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-charcoal)' }}>
            Sign out of KannadaConnect
          </div>
          <div style={{ fontSize: '13px', color: 'var(--color-charcoal-muted)' }}>
            End your authenticated session and return to the public website.
          </div>
        </div>

        <button
          type="button"
          className="btn-secondary"
          onClick={handleLogout}
          id="btn-account-logout"
          style={{
            borderColor: 'var(--color-border)',
            color: 'var(--color-terracotta)',
            backgroundColor: 'var(--color-terracotta-light)',
            padding: '9px 18px'
          }}
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}
