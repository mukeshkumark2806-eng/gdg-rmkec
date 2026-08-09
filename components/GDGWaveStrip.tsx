'use client';

import React from 'react';

/**
 * ══════════════════════════════════════════════════════════════════════════════
 * GDGWaveStrip — Complementary Fluid Wave Geometry (Dark 4-Layer GDG Palette)
 * 
 * Specifically designed with diverse orientations, sizes, and positions:
 * • Layer 1 (Dark Green):  Massive, deep backdrop swell (high amplitude, 1440px swell).
 * • Layer 2 (Dark Amber):  Inverted counter-wave sweeping diagonally in opposing phase.
 * • Layer 3 (Dark Crimson): Rhythmic offset wave weaving through the mid-ground.
 * • Layer 4 (Dark Cobalt): Commanding foreground wave grounding the composition.
 * 
 * Features:
 * • Sizing and orientations designed to intersect and complement each other in 3D space.
 * • Blends smoothly into the dark section background (#0D1117) below with zero gap.
 * • 60fps compositor-accelerated CSS transforms (translate3d, scaleY, translateY).
 * • 14–22s duration, infinite seamless looping, and subtle shape morphing.
 * ══════════════════════════════════════════════════════════════════════════════
 */
export const GDGWaveStrip: React.FC = () => {
  return (
    <div className="gdg-wave-strip-wrapper" aria-hidden="true" role="presentation">
      <svg
        className="gdg-wave-svg"
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* ── Gradient 1: Dark GDG Green (Furthest Back Wave) ── */}
          <linearGradient id="wave-gdg-green" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(52, 168, 83, 0.45)" />  {/* #34A853 official GDG green */}
            <stop offset="40%" stopColor="rgba(24, 128, 56, 0.70)" /> {/* #188038 dark Google green */}
            <stop offset="75%" stopColor="#0D3118" />                   {/* Deep dark forest green */}
            <stop offset="100%" stopColor="#0D1117" />                  {/* Dark section background below */}
          </linearGradient>

          {/* ── Gradient 2: Dark GDG Yellow/Amber (Third Wave from Front) ── */}
          <linearGradient id="wave-gdg-yellow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(251, 188, 5, 0.50)" />  {/* #FBBC05 official GDG yellow */}
            <stop offset="40%" stopColor="rgba(249, 171, 0, 0.75)" /> {/* #F9AB00 dark Google amber */}
            <stop offset="75%" stopColor="#523600" />                   {/* Deep dark bronze shade */}
            <stop offset="100%" stopColor="#0D1117" />                  {/* Dark section background below */}
          </linearGradient>

          {/* ── Gradient 3: Dark GDG Red/Crimson (Second Wave from Front) ── */}
          <linearGradient id="wave-gdg-red" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(234, 67, 53, 0.60)" />  {/* #EA4335 official GDG red */}
            <stop offset="40%" stopColor="rgba(197, 34, 31, 0.85)" /> {/* #C5221F dark Google crimson */}
            <stop offset="75%" stopColor="#5C130D" />                   {/* Deep dark burgundy shade */}
            <stop offset="100%" stopColor="#0D1117" />                  {/* Dark section background below */}
          </linearGradient>

          {/* ── Gradient 4: Dark GDG Blue/Cobalt (Foreground Wave) ── */}
          <linearGradient id="wave-gdg-blue" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(66, 133, 244, 0.80)" /> {/* #4285F4 official GDG blue */}
            <stop offset="30%" stopColor="#1A73E8" />                   {/* #1A73E8 dark Google cobalt blue */}
            <stop offset="60%" stopColor="#174EA6" />                   {/* #174EA6 deep Google brand blue */}
            <stop offset="85%" stopColor="#0D204A" />                   {/* Ultra-deep dark navy shade */}
            <stop offset="100%" stopColor="#0D1117" />                  {/* Dark section background below */}
          </linearGradient>
        </defs>

        {/* ══════════════════════════════════════════════════════════════════════
            LAYER 1 — Massive Rolling Backdrop Swell (Dark GDG Green #188038, Left drift, 22s)
            High amplitude (y=35 to y=140) creating a grand background horizon.
        ══════════════════════════════════════════════════════════════════════ */}
        <g className="gdg-gpu-layer gdg-scroll-left-22s gdg-blur-mid" style={{ opacity: 0.80 }}>
          <g className="gdg-gpu-layer gdg-morph-layer-1">
            <path
              d="M 0,90 C 360,35 360,140 720,90 C 1080,35 1080,140 1440,90 C 1800,35 1800,140 2160,90 C 2520,35 2520,140 2880,90 L 2880,250 L 0,250 Z"
              fill="url(#wave-gdg-green)"
              stroke="#188038"
              strokeWidth="1.5"
              strokeOpacity="0.75"
            />
          </g>
        </g>

        {/* ══════════════════════════════════════════════════════════════════════
            LAYER 2 — Counter-Sweeping Inverted Wave (Dark GDG Amber #F9AB00, Right drift, 19s)
            Inverted phase orientation (y=155 to y=60) emerging from the green valleys.
        ══════════════════════════════════════════════════════════════════════ */}
        <g className="gdg-gpu-layer gdg-scroll-right-19s gdg-blur-soft" style={{ opacity: 0.88 }}>
          <g className="gdg-gpu-layer gdg-morph-layer-2">
            <path
              d="M 0,110 C 280,155 440,60 720,110 C 1000,155 1160,60 1440,110 C 1720,155 1880,60 2160,110 C 2440,155 2600,60 2880,110 L 2880,250 L 0,250 Z"
              fill="url(#wave-gdg-yellow)"
              stroke="#F9AB00"
              strokeWidth="1.5"
              strokeOpacity="0.80"
            />
          </g>
        </g>

        {/* ══════════════════════════════════════════════════════════════════════
            LAYER 3 — Rhythmic Mid-Ground Swell (Dark GDG Crimson #C5221F, Left drift, 16s)
            Phase shifted by 90 degrees (y=65 to y=145) weaving cleanly through the center.
        ══════════════════════════════════════════════════════════════════════ */}
        <g className="gdg-gpu-layer gdg-scroll-left-16s" style={{ opacity: 0.95 }}>
          <g className="gdg-gpu-layer gdg-morph-layer-3">
            <path
              d="M 0,105 C 240,65 480,145 720,105 C 960,65 1200,145 1440,105 C 1680,65 1920,145 2160,105 C 2400,65 2640,145 2880,105 L 2880,250 L 0,250 Z"
              fill="url(#wave-gdg-red)"
              stroke="#C5221F"
              strokeWidth="1.5"
              strokeOpacity="0.90"
            />
          </g>
        </g>

        {/* ══════════════════════════════════════════════════════════════════════
            LAYER 4 — Bold Grounding Foreground Wave (Dark GDG Cobalt #1A73E8, Right drift, 14s)
            Commanding foreground curve (y=165 to y=85) that binds the 4 layers together.
        ══════════════════════════════════════════════════════════════════════ */}
        <g className="gdg-gpu-layer gdg-scroll-right-14s" style={{ opacity: 1.0 }}>
          <g className="gdg-gpu-layer gdg-morph-layer-4">
            <path
              d="M 0,125 C 320,165 400,85 720,125 C 1040,165 1120,85 1440,125 C 1760,165 1840,85 2160,125 C 2480,165 2560,85 2880,125 L 2880,250 L 0,250 Z"
              fill="url(#wave-gdg-blue)"
              stroke="#1A73E8"
              strokeWidth="2"
              strokeOpacity="0.95"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};
