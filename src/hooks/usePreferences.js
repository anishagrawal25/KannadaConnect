import { useState, useEffect, useCallback } from 'react';
import { getPreferences, savePreferences } from '../utils/preferences';

export function usePreferences() {
  const [preferences, setPreferences] = useState(getPreferences);

  useEffect(() => {
    const handleUpdate = (e) => {
      if (e.detail) {
        setPreferences(e.detail);
      } else {
        setPreferences(getPreferences());
      }
    };

    window.addEventListener('kannadaconnect_preferences_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('kannadaconnect_preferences_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const updatePreference = useCallback((key, value) => {
    const updated = savePreferences({ [key]: value });
    setPreferences(updated);
  }, []);

  return { preferences, updatePreference, savePreferences };
}
