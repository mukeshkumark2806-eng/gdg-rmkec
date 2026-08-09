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

export type LoaderStage = 'dots' | 'circle' | 'converge' | 'complete';
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
  const [speed, setSpeed] = useState<number>(1);
  const [progress, setProgress] = useState(0);

  // Main 3-Step Animation Sequence:
  // Step 1: 4 Google Dots (0ms - 750ms)
  // Step 2: Multi-color Rotating Circle Spinner (750ms - 1650ms)
  // Step 3: Two Pieces Converge & Snap at Center (1650ms - 3200ms)
  const runAnimationSequence = useCallback(() => {
    setStage('dots');
    setProgress(0);

    const baseDuration = 600 / speed;

    // Stage 1: 4 Dots Pulse & Orbit (0ms to 750ms)
    const p1 = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 35) {
          clearInterval(p1);
          return 35;
        }
        return prev + 5;
      });
    }, baseDuration / 15);

    // Stage 2: Rotating Multi-Color Circle Spinner (750ms)
    const tCircle = setTimeout(() => {
      setStage('circle');
    }, 750 / speed);

    const p2 = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 70) {
          clearInterval(p2);
          return 70;
        }
        return Math.min(70, prev + 4);
      });
    }, baseDuration / 20);

    // Stage 3: Two GDG Pieces Converge from opposite sides and snap in center (1650ms)
    const tConverge = setTimeout(() => {
      setStage('converge');
    }, 1650 / speed);

    const p3 = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(p3);
          return 100;
        }
        return Math.min(100, prev + 4);
      });
    }, baseDuration / 20);

    // Complete / Auto close (3200ms)
    const tComplete = setTimeout(() => {
      setStage('complete');
      if (onComplete) onComplete();
      if (autoClose) {
        setTimeout(() => setActive(false), 350 / speed);
      }
    }, 3200 / speed);

    return () => {
      clearInterval(p1);
      clearInterval(p2);
      clearInterval(p3);
      clearTimeout(tCircle);
      clearTimeout(tConverge);
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
    if (targetStage === 'circle') setProgress(55);
    if (targetStage === 'converge') setProgress(85);
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
            exit={{ opacity: 0, transition: { duration: 0.35, ease: 'easeOut' } }}
            className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center select-none overflow-hidden ${
              theme === 'dark' ? 'bg-[#0B0F19] text-white' : 'bg-white text-[#1A1A2E]'
            }`}
          >
            {/* Ambient Dynamic Background Glow */}
            <div className="absolute inset-0 pointer-events-none opacity-50">
              <motion.div
                animate={{
                  scale: stage === 'converge' ? [1, 1.4, 1.2] : [0.9, 1.1, 0.9],
                  opacity: stage === 'converge' ? [0.4, 0.8, 0.5] : 0.35,
                }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] bg-gradient-to-tr from-[#4285F4]/30 via-[#EA4335]/25 to-[#34A853]/30 pointer-events-none"
              />
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px]" />
            </div>

            {/* Central Animation Container */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-[320px] w-full max-w-lg px-6">
              <AnimatePresence mode="wait">
                {/* ============================================================ */}
                {/* STAGE 1: 4 GOOGLE COLORED INTRO DOTS                        */}
                {/* ============================================================ */}
                {stage === 'dots' && (
                  <motion.div
                    key="stage-dots"
                    initial={{ opacity: 1, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.3, transition: { duration: 0.25 } }}
                    className="flex flex-col items-center gap-8"
                  >
                    <div className="flex items-center justify-center gap-4 h-24">
                      {/* Dot 1: Blue */}
                      <motion.div
                        className="w-5 h-5 rounded-full bg-[#4285F4] shadow-[0_0_25px_rgba(66,133,244,0.8)]"
                        animate={{
                          y: [-14, 14, -14],
                          scale: [1, 1.25, 1],
                        }}
                        transition={{
                          duration: 0.9 / speed,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: 0,
                        }}
                      />
                      {/* Dot 2: Red */}
                      <motion.div
                        className="w-5 h-5 rounded-full bg-[#EA4335] shadow-[0_0_25px_rgba(234,67,53,0.8)]"
                        animate={{
                          y: [-14, 14, -14],
                          scale: [1, 1.25, 1],
                        }}
                        transition={{
                          duration: 0.9 / speed,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: 0.12,
                        }}
                      />
                      {/* Dot 3: Yellow */}
                      <motion.div
                        className="w-5 h-5 rounded-full bg-[#FBBC05] shadow-[0_0_25px_rgba(251,188,5,0.8)]"
                        animate={{
                          y: [-14, 14, -14],
                          scale: [1, 1.25, 1],
                        }}
                        transition={{
                          duration: 0.9 / speed,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: 0.24,
                        }}
                      />
                      {/* Dot 4: Green */}
                      <motion.div
                        className="w-5 h-5 rounded-full bg-[#34A853] shadow-[0_0_25px_rgba(52,168,83,0.8)]"
                        animate={{
                          y: [-14, 14, -14],
                          scale: [1, 1.25, 1],
                        }}
                        transition={{
                          duration: 0.9 / speed,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: 0.36,
                        }}
                      />
                    </div>
                  </motion.div>
                )}

                {/* ============================================================ */}
                {/* STAGE 2: MULTI-COLOR CIRCLE SPINNER                         */}
                {/* ============================================================ */}
                {stage === 'circle' && (
                  <motion.div
                    key="stage-circle"
                    initial={{ opacity: 0, scale: 0.7, rotate: -60 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 1.3, transition: { duration: 0.3 } }}
                    transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                    className="flex flex-col items-center gap-8"
                  >
                    {/* SVG Multi-Color Circle Spinner */}
                    <div className="relative w-28 h-28 flex items-center justify-center">
                      {/* Outer Glow Ring */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#34A853] opacity-35 blur-xl animate-pulse" />

                      {/* Rotating Multi-Color Arc Spinner */}
                      <motion.svg
                        className="w-full h-full"
                        viewBox="0 0 100 100"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1.5 / speed,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                      >
                        {/* Blue Arc */}
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="#4285F4"
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray="56 195"
                          strokeDashoffset="0"
                        />
                        {/* Red Arc */}
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="#EA4335"
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray="56 195"
                          strokeDashoffset="-63"
                        />
                        {/* Yellow Arc */}
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="#FBBC05"
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray="56 195"
                          strokeDashoffset="-126"
                        />
                        {/* Green Arc */}
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="#34A853"
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray="56 195"
                          strokeDashoffset="-189"
                        />
                      </motion.svg>

                      {/* Center Pulsing Nucleus */}
                      <motion.div
                        animate={{ scale: [0.8, 1.25, 0.8] }}
                        transition={{ duration: 1 / speed, repeat: Infinity }}
                        className="absolute w-4 h-4 rounded-full bg-[#4285F4] shadow-[0_0_15px_#4285F4]"
                      />
                    </div>
                  </motion.div>
                )}

                {/* ============================================================ */}
                {/* STAGE 3: 2 PIECES CONVERGING FROM OPPOSITE DIRECTIONS & SNAP */}
                {/* ============================================================ */}
                {(stage === 'converge' || stage === 'complete') && (
                  <motion.div
                    key="stage-converge"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.15, transition: { duration: 0.35 } }}
                    className="relative flex items-center justify-center"
                  >
                    {/* Shockwave Burst upon impact in the center */}
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        scale: [0, 1.6, 2.2],
                        opacity: [0, 0.9, 0],
                      }}
                      transition={{
                        delay: 0.45 / speed,
                        duration: 0.75 / speed,
                        ease: 'easeOut',
                      }}
                      className="absolute w-52 h-52 rounded-full bg-gradient-to-r from-[#4285F4]/40 via-[#EA4335]/40 to-[#34A853]/40 blur-2xl pointer-events-none"
                    />

                    {/* Central Energy Glow Aura */}
                    <motion.div
                      animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.3, 0.6, 0.4],
                      }}
                      transition={{
                        duration: 1.8 / speed,
                        repeat: Infinity,
                        repeatType: 'reverse',
                      }}
                      className="absolute w-44 h-44 rounded-full bg-gradient-to-tr from-[#4285F4] via-[#FBBC05] to-[#34A853] blur-3xl pointer-events-none opacity-40"
                    />

                    {/* Split GDG Logo SVG Container */}
                    <div className="relative z-10 flex items-center justify-center">
                      <svg
                        viewBox="2.586 66.379 250.828 124.639"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-36 h-18 sm:w-52 sm:h-26 overflow-visible shrink-0 drop-shadow-[0_0_35px_rgba(66,133,244,0.5)]"
                        aria-hidden="true"
                      >
                        {/* ======================================================= */}
                        {/* PIECE 1: LEFT CHEVRON (<) (Red Top + Blue Bottom)       */}
                        {/* Flies in from left (-350px) to meet at center (0)       */}
                        {/* ======================================================= */}
                        <motion.g
                          initial={{ x: -350, opacity: 0, rotate: -35, scale: 0.7 }}
                          animate={{ x: 0, opacity: 1, rotate: 0, scale: 1 }}
                          transition={{
                            type: 'spring',
                            stiffness: 140 * speed,
                            damping: 15,
                            mass: 0.9,
                            delay: 0.05 / speed,
                          }}
                        >
                          {/* Red Top Left Arm */}
                          <path
                            d="m102.907 106.981-66.897 40.034c-9.6 5.83-22.009 2.773-27.716-6.83-5.708-9.601-2.552-22.112 7.048-27.942l66.897-40.034c9.6-5.83 22.009-2.773 27.716 6.83s2.552 22.112-7.048 27.942z"
                            fill="#EA4335"
                          />
                          {/* Blue Bottom Left Arm */}
                          <path
                            d="m82.153 185.617-66.182-38.053c-9.742-5.4-13.214-17.764-7.754-27.614s17.784-13.457 27.527-8.057l66.182 38.054c9.743 5.4 13.214 17.763 7.754 27.613s-17.784 13.458-27.527 8.057z"
                            fill="#4285F4"
                          />
                        </motion.g>

                        {/* ======================================================= */}
                        {/* PIECE 2: RIGHT CHEVRON (>) (Green Top + Yellow Bottom)  */}
                        {/* Flies in from right (+350px) to meet at center (0)      */}
                        {/* ======================================================= */}
                        <motion.g
                          initial={{ x: 350, opacity: 0, rotate: 35, scale: 0.7 }}
                          animate={{ x: 0, opacity: 1, rotate: 0, scale: 1 }}
                          transition={{
                            type: 'spring',
                            stiffness: 140 * speed,
                            damping: 15,
                            mass: 0.9,
                            delay: 0.05 / speed,
                          }}
                        >
                          {/* Yellow Bottom Right Arm */}
                          <path
                            d="m173.847 185.617 66.182-38.053c9.742-5.4 13.214-17.764 7.754-27.614s-17.784-13.457-27.527-8.057l-66.182 38.054c-9.743 5.4-13.214 17.763-7.754 27.613s17.784 13.458 27.527 8.057z"
                            fill="#FBBC04"
                          />
                          {/* Green Top Right Arm */}
                          <path
                            d="m153.093 106.981 66.897 40.034c9.6 5.83 22.009 2.773 27.716-6.83 5.708-9.601 2.552-22.112-7.048-27.942l-66.897-40.034c-9.6-5.83-22.009-2.773-27.716 6.83s-2.552 22.112 7.048 27.942z"
                            fill="#0F9D58"
                          />
                        </motion.g>
                      </svg>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Subtle Progress Indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-56 flex flex-col items-center gap-2">
              <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden relative">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#34A853] rounded-full"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                />
              </div>
              <div className="text-[11px] font-mono font-medium opacity-60">
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
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#4285F4] hover:bg-[#3367D6] text-white text-xs font-semibold transition-all shadow-lg active:scale-95 cursor-pointer"
              title="Replay Loading Effect"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Replay 3-Step</span>
            </button>

            {/* Stage Selector Dropdown/Buttons */}
            <div className="hidden sm:flex items-center gap-1 bg-white/06 p-1 rounded-xl border border-white/10">
              <button
                onClick={() => jumpToStage('dots')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                  active && stage === 'dots'
                    ? 'bg-[#4285F4] text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                1. Dots
              </button>
              <button
                onClick={() => jumpToStage('circle')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                  active && stage === 'circle'
                    ? 'bg-[#EA4335] text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                2. Circle
              </button>
              <button
                onClick={() => jumpToStage('converge')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                  active && stage === 'converge'
                    ? 'bg-[#34A853] text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                3. 2-Piece Snap
              </button>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-xl bg-white/08 hover:bg-white/15 text-white/80 transition-colors cursor-pointer"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Speed Switcher */}
            <button
              onClick={() => setSpeed(speed === 1 ? 0.5 : speed === 0.5 ? 1.5 : 1)}
              className="px-2.5 py-1.5 rounded-xl bg-white/08 hover:bg-white/15 text-white/90 text-xs font-mono font-semibold transition-colors flex items-center gap-1 cursor-pointer"
              title="Change Speed"
            >
              <FastForward className="w-3 h-3 text-[#FBBC05]" />
              {speed}x
            </button>

            {/* Toggle Visibility */}
            <button
              onClick={() => setActive(!active)}
              className={`p-2 rounded-xl transition-colors cursor-pointer ${
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
