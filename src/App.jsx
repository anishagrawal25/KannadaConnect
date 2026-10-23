import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Layout Shells
import PublicLayout from './components/PublicLayout';
import AppLayout from './components/AppLayout';

// Public Pages
import LandingPage from './components/LandingPage';
import PublicExplore from './pages/PublicExplore';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

// Authenticated Application Pages
import SayAndShow from './pages/SayAndShow';
import AppExplore from './pages/AppExplore';
import AppAudioGuide from './pages/AppAudioGuide';
import AppSaved from './pages/AppSaved';
import Account from './pages/Account';

// Global Overlays & Storage Utilities
import ShowMode from './components/ShowMode';
import { getSavedPhrases, savePhrase, removeSavedPhrase, isPhraseSaved } from './utils/storage';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [savedPhrases, setSavedPhrases] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);
  const [showModePhrase, setShowModePhrase] = useState(null);

  // Initialize saved phrases from local repository
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

  // Toggle saving phrases to persistent browser storage
  const handleToggleSave = (phrase) => {
    if (!phrase) return;

    if (isPhraseSaved(phrase)) {
      const updated = removeSavedPhrase(phrase.id || phrase.kannada);
      setSavedPhrases(updated);
      showToast('Phrase removed from saved collection');
    } else {
      const updated = savePhrase(phrase);
      setSavedPhrases(updated);
      showToast('Phrase saved to offline collection!');
    }
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* PUBLIC PORTAL ROUTES */}
          <Route element={<PublicLayout />}>
            <Route
              path="/"
              element={
                <LandingPage
                  onShowFullscreen={(phrase) => setShowModePhrase(phrase)}
                />
              }
            />
            <Route path="/explore" element={<PublicExplore />} />
          </Route>

          {/* STANDALONE AUTHENTICATION ROUTES */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* AUTHENTICATED APPLICATION SUITE (PROTECTED) */}
          <Route
            element={
              <ProtectedRoute>
                <AppLayout savedCount={savedPhrases.length} />
              </ProtectedRoute>
            }
          >
            <Route
              path="/app"
              element={
                <SayAndShow
                  onToggleSave={handleToggleSave}
                  savedPhrases={savedPhrases}
                  showToast={showToast}
                />
              }
            />
            <Route
              path="/app/explore"
              element={
                <AppExplore
                  onToggleSave={handleToggleSave}
                />
              }
            />
            <Route
              path="/app/audio-guide"
              element={<AppAudioGuide />}
            />
            <Route
              path="/app/saved"
              element={
                <AppSaved
                  savedPhrases={savedPhrases}
                  onRemove={handleToggleSave}
                />
              }
            />
            <Route
              path="/app/account"
              element={<Account />}
            />
          </Route>

          {/* CATCH-ALL ROUTE: Redirect to public portal */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* FULLSCREEN SHOW MODE MODAL (ACCESSIBLE GLOBALLY) */}
        {showModePhrase && (
          <ShowMode
            phrase={showModePhrase}
            onClose={() => setShowModePhrase(null)}
          />
        )}

        {/* TOAST NOTIFICATION NOTICE */}
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
