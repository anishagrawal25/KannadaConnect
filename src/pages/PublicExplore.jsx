import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SituationExplorer from '../components/SituationExplorer';
import ShowMode from '../components/ShowMode';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function PublicExplore() {
  const [showModePhrase, setShowModePhrase] = useState(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="container" style={{ paddingTop: '20px' }}>
      {/* Public Banner */}
      {!isAuthenticated && (
        <div style={{
          padding: '14px 20px',
          backgroundColor: 'var(--color-forest-light)',
          border: '1px solid var(--color-sage)',
          borderRadius: 'var(--radius-lg)',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Sparkles size={18} color="var(--color-forest)" />
            <span style={{ fontSize: '13.5px', color: 'var(--color-forest)', fontWeight: 600 }}>
              Viewing the public phrasebook. Sign in or get started to generate custom phrases and bookmark your favorites.
            </span>
          </div>

          <Link
            to="/signup"
            className="btn-primary"
            style={{ padding: '6px 14px', fontSize: '12.5px' }}
          >
            <span>Create Free Account</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      )}

      {/* Embedded Situation Explorer */}
      <SituationExplorer
        onShowFullscreen={(phrase) => setShowModePhrase(phrase)}
        onToggleSave={() => {
          if (!isAuthenticated) {
            navigate('/signup');
          }
        }}
        isPhraseSavedFunc={() => false}
      />

      {/* Show Mode Modal */}
      {showModePhrase && (
        <ShowMode
          phrase={showModePhrase}
          onClose={() => setShowModePhrase(null)}
        />
      )}
    </div>
  );
}
