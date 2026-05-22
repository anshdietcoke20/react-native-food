import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

type StoredUser = {
  name: string;
  email: string;
};

type AuthState = {
  isBootstrapping: boolean;
  isAuthenticated: boolean;
  hasSeenOnboarding: boolean;
  user: StoredUser | null;
};

type AuthActions = {
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  completeOnboarding: () => Promise<void>;
};

type AuthContextValue = AuthState & AuthActions;

const AUTH_KEY = '@fooddelivery/auth';
const ONBOARDING_KEY = '@fooddelivery/onboardingSeen';

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    isBootstrapping: true,
    isAuthenticated: false,
    hasSeenOnboarding: false,
    user: null,
  });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [rawAuth, rawOnboarding] = await Promise.all([
          AsyncStorage.getItem(AUTH_KEY),
          AsyncStorage.getItem(ONBOARDING_KEY),
        ]);
        if (cancelled) return;
        const user = rawAuth ? (JSON.parse(rawAuth) as StoredUser) : null;
        setState({
          isBootstrapping: false,
          isAuthenticated: !!user,
          hasSeenOnboarding: rawOnboarding === 'true',
          user,
        });
      } catch {
        if (cancelled) return;
        setState((prev) => ({ ...prev, isBootstrapping: false }));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const signIn = useCallback(async (email: string, _password: string) => {
    const name = email.split('@')[0] || 'Guest';
    const user: StoredUser = {
      email,
      name: name.charAt(0).toUpperCase() + name.slice(1),
    };
    await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(user));
    setState((prev) => ({ ...prev, isAuthenticated: true, user }));
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.removeItem(AUTH_KEY);
    setState((prev) => ({ ...prev, isAuthenticated: false, user: null }));
  }, []);

  const completeOnboarding = useCallback(async () => {
    await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
    setState((prev) => ({ ...prev, hasSeenOnboarding: true }));
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ ...state, signIn, signOut, completeOnboarding }),
    [state, signIn, signOut, completeOnboarding],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside an AuthProvider');
  return ctx;
}
