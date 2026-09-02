'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2 } from 'lucide-react';

export const BootPreloader: React.FC = () => {
  const [mounted, setMounted] = useState(true);
  const [stage, setStage] = useState<1 | 2 | 3>(1);

  useEffect(() => {
    // Check if lite version is requested in URL
    const params = new URLSearchParams(window.location.search);
    if (params.get('lite') === '1') {
      setMounted(false);
      return;
    }

    // ─── Transition Timers ─────────────────────────────────────────
    const stage2Timer = setTimeout(() => {
      setStage(2);
    }, 1000);

    const stage3Timer = setTimeout(() => {
      setStage(3);
    }, 2100);

    const dismissTimer = setTimeout(() => {
      setMounted(false);
    }, 4500);

    return () => {
      clearTimeout(stage2Timer);
      clearTimeout(stage3Timer);
      clearTimeout(dismissTimer);
    };
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {mounted && (
        <motion.div
          id="preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            filter: 'blur(10px)',
            transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-black text-white p-6 select-none overflow-hidden"
        >
          {/* Ambient Lighting shifting with each Stage */}
          <motion.div
            className="pointer-events-none absolute inset-0 transition-all duration-700"
            animate={{
              background:
                stage === 1
                  ? 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(66, 133, 244, 0.25), transparent 70%)'
                  : stage === 2
                  ? 'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(251, 188, 5, 0.22), transparent 70%)'
                  : 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(52, 168, 83, 0.38), transparent 70%)',
            }}
          />

          {/* ─── Center Visual Engine (Pure Animation Focus) ──────── */}
          <div className="relative flex flex-col items-center justify-center w-full max-w-lg z-10">
            <AnimatePresence mode="wait">
              {/* ======================================================= */}
              {/* 1: 4 Staggered Bouncing Spring Dots                     */}
              {/* ======================================================= */}
              {stage === 1 && (
                <motion.div
                  key="stage1-anim"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.3 } }}
                  className="relative flex flex-col items-center justify-center"
                >
                  {/* Radar Sonar Wave */}
                  <div className="absolute h-56 w-56 rounded-full border border-[#4285F4]/30 sonar-pulse pointer-events-none" />

                  {/* 4 Bouncing SVG Dots */}
                  <svg
                    viewBox="0 250 1728 535"
                    className="w-[min(75vw,520px)] h-auto filter drop-shadow-[0_4px_24px_rgba(66,133,244,0.5)]"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="415.5"
                      cy="516.5"
                      r="78.5"
                      fill="#4285F4"
                      className="preloader-circle"
                    />
                    <circle
                      cx="714.5"
                      cy="516.5"
                      r="78.5"
                      fill="#EA4335"
                      className="preloader-circle"
                    />
                    <circle
                      cx="1013.5"
                      cy="516.5"
                      r="78.5"
                      fill="#FBBC05"
                      className="preloader-circle"
                    />
                    <circle
                      cx="1312.5"
                      cy="516.5"
                      r="78.5"
                      fill="#34A853"
                      className="preloader-circle"
                    />
                  </svg>
                </motion.div>
              )}

              {/* ======================================================= */}
              {/* 2: 360° Orbital Swirling Code Matrix                    */}
              {/* ======================================================= */}
              {stage === 2 && (
                <motion.div
                  key="stage2-anim"
                  initial={{ opacity: 0, scale: 0.8, rotate: -45 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 1.15, transition: { duration: 0.3 } }}
                  className="relative flex items-center justify-center h-60 w-60"
                >
                  {/* Central Glowing Code Core */}
                  <div className="absolute flex flex-col items-center justify-center h-24 w-24 rounded-full bg-[#121216] border border-white/20 shadow-[0_0_30px_rgba(251,188,5,0.4)] z-20">
                    <Code2 className="h-8 w-8 text-[#FBBC05] animate-pulse" />
                    <span className="font-mono text-[9px] text-white/70 uppercase tracking-widest mt-1">
                      GDG
                    </span>
                  </div>

                  {/* Rotating Orbital Track */}
                  <motion.div
                    className="absolute inset-0 rounded-full border border-dashed border-white/20"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: 'linear' }}
                  >
                    {/* Dot 1: Blue (Top) */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 h-7 w-7 rounded-full bg-[#4285F4] shadow-[0_0_20px_#4285F4] border-2 border-white" />

                    {/* Dot 2: Red (Right) */}
                    <div className="absolute -right-3 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-[#EA4335] shadow-[0_0_20px_#EA4335] border-2 border-white" />

                    {/* Dot 3: Yellow (Bottom) */}
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 h-7 w-7 rounded-full bg-[#FBBC05] shadow-[0_0_20px_#FBBC05] border-2 border-white" />

                    {/* Dot 4: Green (Left) */}
                    <div className="absolute -left-3 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-[#34A853] shadow-[0_0_20px_#34A853] border-2 border-white" />
                  </motion.div>

                  {/* Floating Syntax Tokens Around the Vortex */}
                  <motion.span
                    animate={{ y: [-5, 5, -5], opacity: [0.6, 1, 0.6] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="absolute -top-6 -left-10 font-mono text-lg text-[#4285F4] font-bold"
                  >
                    &#123; AI &#125;
                  </motion.span>
                  <motion.span
                    animate={{ y: [5, -5, 5], opacity: [0.6, 1, 0.6] }}
                    transition={{ repeat: Infinity, duration: 1.6 }}
                    className="absolute -top-6 -right-12 font-mono text-lg text-[#EA4335] font-bold"
                  >
                    &lt; CLOUD /&gt;
                  </motion.span>
                  <motion.span
                    animate={{ y: [-4, 4, -4], opacity: [0.6, 1, 0.6] }}
                    transition={{ repeat: Infinity, duration: 1.4 }}
                    className="absolute -bottom-6 -left-12 font-mono text-lg text-[#FBBC05] font-bold"
                  >
                    [ IOT ]
                  </motion.span>
                  <motion.span
                    animate={{ y: [4, -4, 4], opacity: [0.6, 1, 0.6] }}
                    transition={{ repeat: Infinity, duration: 1.7 }}
                    className="absolute -bottom-6 -right-10 font-mono text-sm text-[#34A853] font-bold"
                  >
                    // DEV
                  </motion.span>
                </motion.div>
              )}

              {/* ======================================================= */}
              {/* 3: Official GDG < > Brackets Logo Morph & Flash         */}
              {/* ======================================================= */}
              {stage === 3 && (
                <motion.div
                  key="stage3-anim"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.25, transition: { duration: 0.4 } }}
                  className="relative flex flex-col items-center justify-center"
                >
                  {/* Radiant Neon Halo Shockwaves */}
                  <motion.div
                    initial={{ scale: 0.6, opacity: 1 }}
                    animate={{ scale: 2.2, opacity: 0 }}
                    transition={{ repeat: Infinity, duration: 1.4, ease: 'easeOut' }}
                    className="absolute h-48 w-48 rounded-full border-2 border-[#34A853] shadow-[0_0_50px_rgba(52,168,83,0.8)] pointer-events-none"
                  />
                  <motion.div
                    initial={{ scale: 0.4, opacity: 0.8 }}
                    animate={{ scale: 1.7, opacity: 0 }}
                    transition={{ repeat: Infinity, duration: 1.4, delay: 0.3, ease: 'easeOut' }}
                    className="absolute h-48 w-48 rounded-full border border-[#4285F4] shadow-[0_0_40px_rgba(66,133,244,0.6)] pointer-events-none"
                  />

                  {/* Official Google Developer Groups < > Brackets SVG with breathing pulse */}
                  <motion.div
                    animate={{ scale: [1, 1.04, 1] }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                    className="relative flex items-center justify-center p-4"
                  >
                    <svg
                      width="190"
                      height="95"
                      viewBox="2.586 66.379 250.828 124.639"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="filter drop-shadow-[0_0_40px_rgba(66,133,244,0.7)]"
                    >
                      <g fill="none" fillRule="evenodd">
                        {/* Red Upper Left Arm */}
                        <motion.path
                          initial={{ x: -40, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.4 }}
                          d="m102.907 106.981-66.897 40.034c-9.6 5.83-22.009 2.773-27.716-6.83-5.708-9.601-2.552-22.112 7.048-27.942l66.897-40.034c9.6-5.83 22.009-2.773 27.716 6.83s2.552 22.112-7.048 27.942z"
                          fill="#EA4335"
                        />
                        {/* Blue Lower Left Arm */}
                        <motion.path
                          initial={{ x: -40, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.45 }}
                          d="m82.153 185.617-66.182-38.053c-9.742-5.4-13.214-17.764-7.754-27.614s17.784-13.457 27.527-8.057l66.182 38.054c9.743 5.4 13.214 17.763 7.754 27.613s-17.784 13.458-27.527 8.057z"
                          fill="#4285F4"
                        />
                        {/* Yellow Lower Right Arm */}
                        <motion.path
                          initial={{ x: 40, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.45 }}
                          d="m173.847 185.617 66.182-38.053c9.742-5.4 13.214-17.764 7.754-27.614s-17.784-13.457-27.527-8.057l-66.182 38.054c-9.743 5.4-13.214 17.763-7.754 27.613s17.784 13.458 27.527 8.057z"
                          fill="#FBBC05"
                        />
                        {/* Green Upper Right Arm */}
                        <motion.path
                          initial={{ x: 40, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.4 }}
                          d="m153.093 106.981 66.897 40.034c9.6 5.83 22.009 2.773 27.716-6.83 5.708-9.601 2.552-22.112-7.048-27.942l-66.897-40.034c-9.6-5.83-22.009-2.773-27.716 6.83s-2.552 22.112 7.048 27.942z"
                          fill="#34A853"
                        />
                      </g>
                    </svg>
                  </motion.div>

                  {/* Monogram Brand Mark */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col items-center mt-1"
                  >
                    <span className="font-mono text-base sm:text-lg font-black tracking-widest text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.4)]">
                      GDG ON CAMPUS RMKEC
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#34A853] font-semibold mt-0.5">
                      Google Developer Groups
                    </span>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
