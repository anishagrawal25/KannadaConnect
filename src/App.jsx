import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layout Shell
import AppLayout from './components/AppLayout';

// Core Learning Pages
import LandingPage from './components/LandingPage';
import SayAndShow from './pages/SayAndShow';
import Vocabulary from './pages/Vocabulary';
import GuidedPractice from './pages/GuidedPractice';
import AppSaved from './pages/AppSaved';

// Auth Context & Auth Pages
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

// Global Overlays & Storage Utilities
import ShowMode from './components/ShowMode';
import { getSavedPhrases, savePhrase, removeSavedPhrase, isPhraseSaved } from './utils/storage';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [savedPhrases, setSavedPhrases] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);
  const [showModePhrase, setShowModePhrase] = useState(null);

  // Initialize saved phrases from local storage
  useEffect(() => {
    const loaded = getSavedPhrases();
    setSavedPhrases(loaded);
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Toggle saving phrases to persistent storage
  const handleToggleSave = (phrase) => {
    if (!phrase) return;

    if (isPhraseSaved(phrase)) {
      const updated = removeSavedPhrase(phrase.id || phrase.kannada);
      setSavedPhrases(updated);
      showToast('Removed from saved collection');
    } else {
      const updated = savePhrase(phrase);
      setSavedPhrases(updated);
      showToast('Saved to your collection!');
    }
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Authentication Pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          <Route element={<AppLayout savedCount={savedPhrases.length} />}>
            {/* Landing / Overview */}
            <Route
              path="/"
              element={
                <LandingPage
                  onShowFullscreen={(phrase) => setShowModePhrase(phrase)}
                />
              }
            />

            {/* Core Feature A: Everyday Kannada Conversations */}
            <Route
              path="/conversations"
              element={
                <SayAndShow
                  onToggleSave={handleToggleSave}
                  savedPhrases={savedPhrases}
                  showToast={showToast}
                />
              }
            />
            {/* Backward compatibility route */}
            <Route
              path="/app"
              element={<Navigate to="/conversations" replace />}
            />

            {/* Core Feature B: Practical Vocabulary */}
            <Route
              path="/vocabulary"
              element={<Vocabulary />}
            />

            {/* Core Feature C: Guided Speaking Practice */}
            <Route
              path="/practice"
              element={<GuidedPractice />}
            />

            {/* Saved Collection for revision */}
            <Route
              path="/saved"
              element={
                <AppSaved
                  savedPhrases={savedPhrases}
                  onRemove={handleToggleSave}
                />
              }
            />
            {/* Backward compatibility */}
            <Route
              path="/app/saved"
              element={<Navigate to="/saved" replace />}
            />
          </Route>

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Fullscreen Show Mode Modal */}
        {showModePhrase && (
          <ShowMode
            phrase={showModePhrase}
            onClose={() => setShowModePhrase(null)}
          />
        )}

        {/* Toast Notification */}
        {toastMessage && (
          <div className="toast-notice" role="alert">
            <Sparkles size={16} color="var(--color-sage)" />
            <span>{toastMessage}</span>
          </div>
        )}
      </BrowserRouter>
    </AuthProvider>
  );
}
