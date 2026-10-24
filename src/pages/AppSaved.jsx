import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SavedPhrases from '../components/SavedPhrases';
import ShowMode from '../components/ShowMode';

export default function AppSaved({ savedPhrases, onRemove }) {
  const [showModePhrase, setShowModePhrase] = useState(null);
  const navigate = useNavigate();

  return (
    <>
      <SavedPhrases
        savedPhrases={savedPhrases}
        onRemove={onRemove}
        onShowFullscreen={(phrase) => setShowModePhrase(phrase)}
        onNavigateHome={() => navigate('/conversations')}
        onNavigateExplore={() => navigate('/conversations')}
      />

      {showModePhrase && (
        <ShowMode
          phrase={showModePhrase}
          onClose={() => setShowModePhrase(null)}
        />
      )}
    </>
  );
}
