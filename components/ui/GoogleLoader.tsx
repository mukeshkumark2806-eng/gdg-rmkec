'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Moon, Sun, FastForward, CheckCircle2 } from 'lucide-react';

interface GoogleLoaderProps {
  /** Initial visibility */
  isOpen?: boolean;
  /** Callback when full loading animation finishes */
  onComplete?: () => void;
  /** Auto-close overlay on completion */
  autoClose?: boolean;
  /** Enable interactive control toolbar for previewing/testing */
  showControls?: boolean;
}

export type LoaderStage = 'dots' | 'circle' | 'logo' | 'complete';
export type LoaderTheme = 'dark' | 'light';

export const GoogleLoader: React.FC<GoogleLoaderProps> = ({
  isOpen = true,
  onComplete,
  autoClose = true,
  showControls = true,
}) => {
  const pathname = usePathname();
  const prevPathname = useRef(pathname);
  const [active, setActive] = useState(isOpen);
  const [stage, setStage] = useState<LoaderStage>('dots');
  const [theme, setTheme] = useState<LoaderTheme>('dark');
  const [speed, setSpeed] = useState<number>(1); // 1x, 0.5x, 1.5x
  const [progress, setProgress] = useState(0);

  // Main animation timeline sequence
  const runAnimationSequence = useCallback(() => {
    setStage('dots');
    setProgress(0);

    const baseDuration = 600 / speed;

    // Stage 1: 4 Dots Wave & Orbit (0ms to 900ms)
    const p1 = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 40) {
          clearInterval(p1);
          return 40;
        }
        return prev + 4;
      });
    }, baseDuration / 20);

    // Stage 2: Morph into Circle (900ms)
    const tCircle = setTimeout(() => {
      setStage('circle');
    }, 900 / speed);

    const p2 = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 80) {
          clearInterval(p2);
          return 80;
        }
        return Math.min(80, prev + 3);
      });
    }, baseDuration / 20);

    // Stage 3: Reveal Google Logo (1800ms)
    const tLogo = setTimeout(() => {
      setStage('logo');
      setProgress(100);
    }, 1800 / speed);

    // Stage 4: Complete / Auto close (3600ms) - Gives 1.8s display time for Google Logo
    const tComplete = setTimeout(() => {
      setStage('complete');
      if (onComplete) onComplete();
      if (autoClose) {
        setTimeout(() => setActive(false), 300 / speed);
      }
    }, 3600 / speed);

    return () => {
      clearInterval(p1);
      clearInterval(p2);
      clearTimeout(tCircle);
      clearTimeout(tLogo);
      clearTimeout(tComplete);
    };
  }, [speed, autoClose, onComplete]);

  // Trigger loader when navigating to home page
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      if (pathname === '/') {
        setActive(true);
        runAnimationSequence();
      }
      prevPathname.current = pathname;
    }
  }, [pathname, runAnimationSequence]);

  // Sync external isOpen prop
  useEffect(() => {
    setActive(isOpen);
    if (isOpen) {
      runAnimationSequence();
    }
  }, [isOpen, runAnimationSequence]);

  // Listen for custom trigger events from anywhere in the app
  useEffect(() => {
    const handleTrigger = () => {
      setActive(true);
      runAnimationSequence();
    };

    window.addEventListener('trigger-google-loader', handleTrigger);
    return () => window.removeEventListener('trigger-google-loader', handleTrigger);
  }, [runAnimationSequence]);

  // Trigger sequence on initial mount
  useEffect(() => {
    if (active) {
      const cleanup = runAnimationSequence();
      return cleanup;
    }
  }, [active, runAnimationSequence]);

  const restartAnimation = () => {
    setActive(true);
    runAnimationSequence();
  };

  const jumpToStage = (targetStage: LoaderStage) => {
    setStage(targetStage);
    if (targetStage === 'dots') setProgress(25);
    if (targetStage === 'circle') setProgress(65);
    if (targetStage === 'logo') setProgress(100);
    if (targetStage === 'complete') {
      setProgress(100);
      if (autoClose) setActive(false);
    }
  };

  if (!active && !showControls) return null;

  return (
    <>
      <AnimatePresence mode="wait">
        {active && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3, ease: 'easeOut' } }}
            className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center select-none overflow-hidden ${
              theme === 'dark' ? 'bg-[#0B0F19] text-white' : 'bg-white text-[#1A1A2E]'
            }`}
          >
            {/* Ambient Background Gradient Mesh */}
            <div className="absolute inset-0 pointer-events-none opacity-40">
              <div
                className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[140px] transition-all duration-700 ${
                  stage === 'dots'
                    ? 'bg-gradient-to-tr from-[#4285F4]/30 via-[#EA4335]/20 to-[#FBBC05]/30'
                    : stage === 'circle'
                    ? 'bg-gradient-to-r from-[#34A853]/30 via-[#4285F4]/30 to-[#EA4335]/30'
                    : 'bg-gradient-to-b from-[#4285F4]/35 via-[#EA4335]/25 to-[#FBBC05]/30'
                }`}
              />
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px]" />
            </div>

            {/* Central Animation Sandbox Container */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-[320px] w-full max-w-md px-6">
              <AnimatePresence mode="wait">
                {/* ============================================================ */}
                {/* STAGE 1: 4 GOOGLE COLORED DOTS (Bounce & Orbit)             */}
                {/* ============================================================ */}
                {stage === 'dots' && (
                  <motion.div
                    key="stage-dots"
                    initial={{ opacity: 1, scale: 1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                    className="flex flex-col items-center gap-10"
                  >
                    {/* 4 Dots Container */}
                    <div className="flex items-center justify-center gap-4 h-24">
                      {/* Dot 1: Blue */}
                      <motion.div
                        className="w-5 h-5 rounded-full bg-[#4285F4] shadow-[0_0_20px_rgba(66,133,244,0.6)]"
                        animate={{
                          y: [-16, 16, -16],
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 1.1 / speed,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: 0,
                        }}
                      />
                      {/* Dot 2: Red */}
                      <motion.div
                        className="w-5 h-5 rounded-full bg-[#EA4335] shadow-[0_0_20px_rgba(234,67,53,0.6)]"
                        animate={{
                          y: [-16, 16, -16],
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 1.1 / speed,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: 0.15,
                        }}
                      />
                      {/* Dot 3: Yellow */}
                      <motion.div
                        className="w-5 h-5 rounded-full bg-[#FBBC05] shadow-[0_0_20px_rgba(251,188,5,0.6)]"
                        animate={{
                          y: [-16, 16, -16],
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 1.1 / speed,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: 0.3,
                        }}
                      />
                      {/* Dot 4: Green */}
                      <motion.div
                        className="w-5 h-5 rounded-full bg-[#34A853] shadow-[0_0_20px_rgba(52,168,83,0.6)]"
                        animate={{
                          y: [-16, 16, -16],
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 1.1 / speed,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: 0.45,
                        }}
                      />
                    </div>
                  </motion.div>
                )}

                {/* ============================================================ */}
                {/* STAGE 2: ROTATING CIRCLE SPINNER                              */}
                {/* ============================================================ */}
                {stage === 'circle' && (
                  <motion.div
                    key="stage-circle"
                    initial={{ opacity: 0, scale: 0.6, rotate: -90 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 1.3, transition: { duration: 0.4 } }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    className="flex flex-col items-center gap-8"
                  >
                    {/* SVG Multi-Color Circle Spinner */}
                    <div className="relative w-28 h-28 flex items-center justify-center">
                      {/* Outer Glow Ring */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#34A853] opacity-30 blur-xl animate-pulse" />

                      {/* Rotating Multi-Color Arc Spinner */}
                      <motion.svg
                        className="w-full h-full"
                        viewBox="0 0 100 100"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1.6 / speed,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                      >
                        {/* Blue Arc */}
                        <motion.circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="#4285F4"
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray="60 190"
                          strokeDashoffset="0"
                        />
                        {/* Red Arc */}
                        <motion.circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="#EA4335"
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray="60 190"
                          strokeDashoffset="-62"
                        />
                        {/* Yellow Arc */}
                        <motion.circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="#FBBC05"
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray="60 190"
                          strokeDashoffset="-124"
                        />
                        {/* Green Arc */}
                        <motion.circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="#34A853"
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray="60 190"
                          strokeDashoffset="-186"
                        />
                      </motion.svg>

                      {/* Center Pulsing Nucleus */}
                      <motion.div
                        animate={{ scale: [0.8, 1.2, 0.8] }}
                        transition={{ duration: 1 / speed, repeat: Infinity }}
                        className="absolute w-4 h-4 rounded-full bg-[#4285F4] shadow-[0_0_12px_#4285F4]"
                      />
                    </div>
                  </motion.div>
                )}

                {/* ============================================================ */}
                {/* STAGE 3: GOOGLE LOGO REVEAL                                  */}
                {/* ============================================================ */}
                {(stage === 'logo' || stage === 'complete') && (
                  <motion.div
                    key="stage-logo"
                    initial={{ opacity: 0, scale: 0.3 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{
                      type: 'spring',
                      stiffness: 260,
                      damping: 18,
                    }}
                    className="flex flex-col items-center gap-8"
                  >
                    {/* Glowing Burst Aura behind Logo */}
                    <div className="relative flex items-center justify-center">
                      <motion.div
                        initial={{ scale: 0, opacity: 0.8 }}
                        animate={{ scale: [0, 1.8, 1.4], opacity: [0.9, 0.3, 0.15] }}
                        transition={{ duration: 1.2 / speed, ease: 'easeOut' }}
                        className="absolute w-40 h-40 rounded-full bg-gradient-to-tr from-[#4285F4] via-[#EA4335] to-[#FBBC05] blur-2xl pointer-events-none"
                      />

                      {/* Official High-Res Google G Mark & Text */}
                      <div className="relative z-10 flex flex-col items-center gap-5">
                        <motion.div
                          initial={{ rotate: -180, scale: 0 }}
                          animate={{ rotate: 0, scale: 1 }}
                          transition={{
                            type: 'spring',
                            stiffness: 280,
                            damping: 16,
                            delay: 0.1,
                          }}
                          className="p-5 rounded-3xl backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] bg-white/05 flex items-center justify-center"
                        >
                          <svg className="w-20 h-20" viewBox="0 0 24 24">
                            <path
                              fill="#4285F4"
                              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                              fill="#34A853"
                              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                              fill="#FBBC05"
                              d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.62z"
                            />
                            <path
                              fill="#EA4335"
                              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                            />
                          </svg>
                        </motion.div>

                        {/* Google Brand Colored Typography */}
                        <div className="flex items-center gap-1 text-4xl sm:text-5xl font-bold tracking-tight select-none">
                          <motion.span
                            initial={{ y: 16, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1, duration: 0.3 }}
                            className="text-[#4285F4]"
                          >
                            G
                          </motion.span>
                          <motion.span
                            initial={{ y: 16, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.16, duration: 0.3 }}
                            className="text-[#EA4335]"
                          >
                            o
                          </motion.span>
                          <motion.span
                            initial={{ y: 16, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.22, duration: 0.3 }}
                            className="text-[#FBBC05]"
                          >
                            o
                          </motion.span>
                          <motion.span
                            initial={{ y: 16, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.28, duration: 0.3 }}
                            className="text-[#4285F4]"
                          >
                            g
                          </motion.span>
                          <motion.span
                            initial={{ y: 16, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.34, duration: 0.3 }}
                            className="text-[#34A853]"
                          >
                            l
                          </motion.span>
                          <motion.span
                            initial={{ y: 16, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.3 }}
                            className="text-[#EA4335]"
                          >
                            e
                          </motion.span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Progress Bar */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-64 flex flex-col items-center gap-2">
              <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden relative">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#34A853] rounded-full"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              </div>
              <div className="text-xs font-mono font-medium opacity-75">
                {progress}%
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================================================ */}
      {/* FLOATING INTERACTIVE CONTROLLER HUB (For previewing/testing) */}
      {/* ============================================================ */}
      {showControls && (
        <div className="fixed bottom-6 right-6 z-[100000] flex flex-col items-end gap-3 pointer-events-auto">
          <div className="flex items-center gap-2 p-2 rounded-2xl bg-[#0D1117]/90 text-white backdrop-blur-xl border border-white/15 shadow-2xl">
            {/* Replay Button */}
            <button
              onClick={restartAnimation}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#4285F4] hover:bg-[#3367D6] text-white text-xs font-semibold transition-all shadow-lg active:scale-95"
              title="Replay Loading Effect"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Replay Google Effect</span>
            </button>

            {/* Stage Selector Dropdown/Buttons */}
            <div className="hidden sm:flex items-center gap-1 bg-white/06 p-1 rounded-xl border border-white/10">
              <button
                onClick={() => jumpToStage('dots')}
                className={`px-2 py-1 rounded-lg text-[11px] font-medium transition-all ${
                  active && stage === 'dots'
                    ? 'bg-[#4285F4] text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                1. Dots
              </button>
              <button
                onClick={() => jumpToStage('circle')}
                className={`px-2 py-1 rounded-lg text-[11px] font-medium transition-all ${
                  active && stage === 'circle'
                    ? 'bg-[#EA4335] text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                2. Circle
              </button>
              <button
                onClick={() => jumpToStage('logo')}
                className={`px-2 py-1 rounded-lg text-[11px] font-medium transition-all ${
                  active && stage === 'logo'
                    ? 'bg-[#34A853] text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                3. Logo
              </button>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-xl bg-white/08 hover:bg-white/15 text-white/80 transition-colors"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Speed Switcher */}
            <button
              onClick={() => setSpeed(speed === 1 ? 0.5 : speed === 0.5 ? 1.5 : 1)}
              className="px-2.5 py-1.5 rounded-xl bg-white/08 hover:bg-white/15 text-white/90 text-xs font-mono font-semibold transition-colors flex items-center gap-1"
              title="Change Speed"
            >
              <FastForward className="w-3 h-3 text-[#FBBC05]" />
              {speed}x
            </button>

            {/* Toggle Visibility */}
            <button
              onClick={() => setActive(!active)}
              className={`p-2 rounded-xl transition-colors ${
                active ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
              }`}
              title={active ? 'Close Overlay' : 'Open Overlay'}
            >
              {active ? <CheckCircle2 className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
