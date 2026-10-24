import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for active session on app boot
    const existingSession = authService.getSession();
    if (existingSession && existingSession.user) {
      setSession(existingSession);
      setUser(existingSession.user);
    }
    setIsLoading(false);
  }, []);

  const signUp = async ({ name, email, password }) => {
    setIsLoading(true);
    try {
      const newSession = await authService.signUp({ name, email, password });
      setSession(newSession);
      setUser(newSession.user);
      return newSession;
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async ({ email, password }) => {
    setIsLoading(true);
    try {
      const activeSession = await authService.signIn({ email, password });
      setSession(activeSession);
      setUser(activeSession.user);
      return activeSession;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async ({ name }) => {
    setIsLoading(true);
    try {
      const updatedUser = await authService.updateProfile({ name });
      setUser(updatedUser);
      setSession(prev => prev ? { ...prev, user: updatedUser } : prev);
      return updatedUser;
    } finally {
      setIsLoading(false);
    }
  };

  const changePassword = async ({ currentPassword, newPassword }) => {
    setIsLoading(true);
    try {
      return await authService.changePassword({ currentPassword, newPassword });
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      await authService.signOut();
      setSession(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    session,
    isAuthenticated: !!user,
    isLoading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    changePassword
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
