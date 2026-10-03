'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { MotionConfig } from 'framer-motion';

interface LiteModeContextType {
  isLiteMode: boolean;
  toggleLiteMode: (explicitValue?: boolean) => void;
  isLoaded: boolean;
}

const LiteModeContext = createContext<LiteModeContextType>({
  isLiteMode: false,
  toggleLiteMode: () => {},
  isLoaded: false,
});

export const STORAGE_KEYS = {
  PRIMARY: 'gdg-lite',
  LEGACY: 'devfest-lite',
} as const;

export const LiteModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLiteMode, setIsLiteMode] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Helper to determine lite mode from URL and localStorage
  const detectLiteMode = useCallback((): boolean => {
    if (typeof window === 'undefined') return false;
    try {
      const params = new URLSearchParams(window.location.search);
      const liteParam = params.get('lite');
      if (liteParam === '1') return true;
      if (liteParam === '0') return false;

      const storedPrimary = localStorage.getItem(STORAGE_KEYS.PRIMARY);
      if (storedPrimary === '1') return true;
      if (storedPrimary === '0') return false;

      const storedLegacy = localStorage.getItem(STORAGE_KEYS.LEGACY);
      if (storedLegacy === '1') return true;
      if (storedLegacy === '0') return false;

      if (document.documentElement.classList.contains('lite-mode')) return true;
    } catch {
      // ignore security / storage restrictions
    }
    return false;
  }, []);

  const applyLiteMode = useCallback((enabled: boolean, updateUrl: boolean = false) => {
    setIsLiteMode(enabled);

    try {
      localStorage.setItem(STORAGE_KEYS.PRIMARY, enabled ? '1' : '0');
      localStorage.setItem(STORAGE_KEYS.LEGACY, enabled ? '1' : '0');
    } catch {
      // ignore
    }

    if (typeof document !== 'undefined') {
      if (enabled) {
        document.documentElement.classList.add('lite-mode');
        document.documentElement.setAttribute('data-lite', '1');
      } else {
        document.documentElement.classList.remove('lite-mode');
        document.documentElement.removeAttribute('data-lite');
      }
    }

    if (updateUrl && typeof window !== 'undefined') {
      try {
        const url = new URL(window.location.href);
        if (enabled) {
          url.searchParams.set('lite', '1');
        } else {
          url.searchParams.delete('lite');
        }
        window.history.replaceState({}, '', url.toString());
      } catch {
        // ignore
      }
    }
  }, []);

  useEffect(() => {
    const initial = detectLiteMode();
    applyLiteMode(initial, false);
    setIsLoaded(true);

    // Sync across browser tabs
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEYS.PRIMARY || e.key === STORAGE_KEYS.LEGACY) {
        const newMode = e.newValue === '1';
        applyLiteMode(newMode, false);
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [detectLiteMode, applyLiteMode]);

  const toggleLiteMode = useCallback((explicitValue?: boolean) => {
    const next = explicitValue !== undefined ? explicitValue : !isLiteMode;
    applyLiteMode(next, true);
  }, [isLiteMode, applyLiteMode]);

  return (
    <LiteModeContext.Provider value={{ isLiteMode, toggleLiteMode, isLoaded }}>
      <MotionConfig reducedMotion={isLiteMode ? 'always' : 'user'}>
        {children}
      </MotionConfig>
    </LiteModeContext.Provider>
  );
};

export const useLiteMode = () => useContext(LiteModeContext);
