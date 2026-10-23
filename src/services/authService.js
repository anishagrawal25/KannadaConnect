// Secure Authentication Service for KannadaConnect
// Implements client-side cryptographic hashing via Web Crypto API (PBKDF2 + SHA-256)
// Raw passwords are NEVER stored in plaintext.
// Pluggable with Supabase Auth when VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY are provided.

const AUTH_STORAGE_KEY = 'kannadaconnect_auth_vault_v1';
const SESSION_STORAGE_KEY = 'kannadaconnect_session_v1';

// Helper for Web Crypto PBKDF2 hashing
async function hashPassword(password, salt) {
  const enc = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey']
  );

  const derivedKey = await window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: enc.encode(salt),
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'HMAC', hash: 'SHA-256', length: 256 },
    true,
    ['sign', 'verify']
  );

  const exported = await window.crypto.subtle.exportKey('raw', derivedKey);
  const hashArray = Array.from(new Uint8Array(exported));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function generateRandomToken(length = 32) {
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  return Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('');
}

class AuthService {
  constructor() {
    this.supabaseClient = null;
    this.initSupabaseIfConfigured();
  }

  initSupabaseIfConfigured() {
    try {
      const url = import.meta.env.VITE_SUPABASE_URL;
      const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
      if (url && key && url !== 'your_supabase_url_here') {
        // Ready for Supabase plug-in
        this.hasSupabase = true;
      }
    } catch {
      this.hasSupabase = false;
    }
  }

  getVault() {
    try {
      const raw = localStorage.getItem(AUTH_STORAGE_KEY);
      return raw ? JSON.parse(raw) : { users: [] };
    } catch {
      return { users: [] };
    }
  }

  saveVault(vault) {
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(vault));
    } catch (e) {
      console.error('Failed to update auth vault:', e);
    }
  }

  getSession() {
    try {
      const raw = localStorage.getItem(SESSION_STORAGE_KEY);
      if (!raw) return null;
      const session = JSON.parse(raw);
      // Check expiration (7 days)
      if (session.expiresAt && new Date(session.expiresAt) < new Date()) {
        this.clearSession();
        return null;
      }
      return session;
    } catch {
      return null;
    }
  }

  saveSession(session) {
    try {
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
    } catch (e) {
      console.error('Failed to save session:', e);
    }
  }

  clearSession() {
    try {
      localStorage.removeItem(SESSION_STORAGE_KEY);
    } catch (e) {
      console.error('Failed to clear session:', e);
    }
  }

  async signUp({ name, email, password }) {
    if (!name || !name.trim()) {
      throw new Error('Please enter your full name.');
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      throw new Error('Please provide a valid email address.');
    }
    if (!password || password.length < 6) {
      throw new Error('Password must be at least 6 characters long.');
    }

    const cleanEmail = email.trim().toLowerCase();
    const vault = this.getVault();

    // Check if user already exists
    const exists = vault.users.some(u => u.email === cleanEmail);
    if (exists) {
      throw new Error('An account with this email address already exists. Please sign in instead.');
    }

    // Generate cryptographic salt and hash
    const salt = generateRandomToken(16);
    const passwordHash = await hashPassword(password, salt);

    const newUser = {
      id: 'usr_' + generateRandomToken(8),
      name: name.trim(),
      email: cleanEmail,
      salt,
      passwordHash,
      createdAt: new Date().toISOString()
    };

    vault.users.push(newUser);
    this.saveVault(vault);

    // Create session (expires in 7 days)
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
    const session = {
      token: 'sess_' + generateRandomToken(24),
      expiresAt,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        createdAt: newUser.createdAt
      }
    };

    this.saveSession(session);
    return session;
  }

  async signIn({ email, password }) {
    if (!email || !email.trim()) {
      throw new Error('Please enter your email address.');
    }
    if (!password) {
      throw new Error('Please enter your password.');
    }

    const cleanEmail = email.trim().toLowerCase();
    const vault = this.getVault();
    const user = vault.users.find(u => u.email === cleanEmail);

    if (!user) {
      throw new Error('Invalid email or password. Please check your credentials.');
    }

    // Compute hash with user's stored salt
    const computedHash = await hashPassword(password, user.salt);
    if (computedHash !== user.passwordHash) {
      throw new Error('Invalid email or password. Please check your credentials.');
    }

    // Create session
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
    const session = {
      token: 'sess_' + generateRandomToken(24),
      expiresAt,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
      }
    };

    this.saveSession(session);
    return session;
  }

  async signOut() {
    this.clearSession();
    return true;
  }
}

export const authService = new AuthService();
