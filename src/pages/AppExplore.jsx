import React, { useState } from 'react';
import SituationExplorer from '../components/SituationExplorer';
import ShowMode from '../components/ShowMode';
import { isPhraseSaved } from '../utils/storage';

export default function AppExplore({ onToggleSave }) {
  const [showModePhrase, setShowModePhrase] = useState(null);

  return (
    <>
      <SituationExplorer
        onShowFullscreen={(phrase) => setShowModePhrase(phrase)}
        onToggleSave={onToggleSave}
        isPhraseSavedFunc={isPhraseSaved}
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
