import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AudioGuide from '../components/AudioGuide';
import ShowMode from '../components/ShowMode';

export default function AppAudioGuide() {
  const [showModePhrase, setShowModePhrase] = useState(null);
  const navigate = useNavigate();

  return (
    <>
      <AudioGuide
        onShowFullscreen={(phrase) => setShowModePhrase(phrase)}
        onNavigateHome={() => navigate('/app')}
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
