'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// Google Brand Colors (Color Wheel sequence: Blue -> Red -> Yellow -> Green)
const GOOGLE_COLORS = ['#4285F4', '#EA4335', '#FBBC05', '#34A853'];

interface TrailPoint {
  x: number;
  y: number;
  color: string;
  age: number; // 1.0 to 0 (decay over time)
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
}

export const CustomCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const prevMouseRef = useRef({ x: -100, y: -100 });
  const trailPointsRef = useRef<TrailPoint[]>([]);
  const sparksRef = useRef<Spark[]>([]);
  const colorIndexRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      if (!isVisible) setIsVisible(true);
      setMousePos({ x, y });

      const dx = x - prevMouseRef.current.x;
      const dy = y - prevMouseRef.current.y;
      const dist = Math.hypot(dx, dy);

      // Only push new trail points if mouse actually moves > 1.5px
      if (dist > 1.5) {
        const currentColor = GOOGLE_COLORS[colorIndexRef.current % GOOGLE_COLORS.length];
        colorIndexRef.current += 1;

        trailPointsRef.current.unshift({
          x,
          y,
          color: currentColor,
          age: 1.0,
        });

        // Slightly increased trail length (up to 28 points)
        if (trailPointsRef.current.length > 28) {
          trailPointsRef.current.pop();
        }

        // Spawn micro crisp color sparks on movement
        if (Math.random() > 0.4) {
          const angle = Math.random() * Math.PI * 2;
          const speed = 0.4 + Math.random() * 1.3;
          sparksRef.current.push({
            x: x + (Math.random() - 0.5) * 3,
            y: y + (Math.random() - 0.5) * 3,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            size: 1.8 + Math.random() * 2,
            color: currentColor,
            life: 1.0,
            maxLife: 15 + Math.random() * 10,
          });
        }

        prevMouseRef.current = { x, y };
      }

      // Check interactive element hover
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = !!target.closest(
          'a, button, input, textarea, select, [role="button"], [data-cursor="pointer"], .interactive-hover'
        );
        setIsHovered(isInteractive);
      }
    };

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    document.body.classList.add('gdg-custom-cursor-active');

    // 60FPS Render Loop: Time-decaying Google Color Ribbon + Sparks
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Decay and render trail points
      const trail = trailPointsRef.current;
      for (let i = trail.length - 1; i >= 0; i--) {
        trail[i].age -= 0.035; // Decays over ~450ms
        if (trail[i].age <= 0) {
          trail.splice(i, 1);
        }
      }

      if (trail.length > 1) {
        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        for (let i = 0; i < trail.length - 1; i++) {
          const pt = trail[i];
          const nextPt = trail[i + 1];
          const positionRatio = 1 - i / trail.length;
          const alpha = Math.max(0, pt.age * positionRatio * 0.85);

          if (alpha > 0.02) {
            ctx.beginPath();
            ctx.moveTo(pt.x, pt.y);
            ctx.lineTo(nextPt.x, nextPt.y);

            ctx.strokeStyle = pt.color;
            ctx.lineWidth = Math.max(1, 3.8 * alpha);
            ctx.globalAlpha = alpha;
            ctx.stroke();
          }
        }
        ctx.restore();
      }

      // 2. Micro Crisp Google Color Sparks
      const sparks = sparksRef.current;
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.life -= 1 / s.maxLife;

        if (s.life <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 0.92;
        s.vy *= 0.92;

        ctx.save();
        ctx.fillStyle = s.color;
        ctx.globalAlpha = Math.max(0, s.life * 0.85);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * s.life, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.body.classList.remove('gdg-custom-cursor-active');
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isVisible]);

  return (
    <>
      {/* 60FPS Hardware-Accelerated Canvas Trail */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9999998]"
        style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.2s ease' }}
      />

      {/* Sleek Precision Black Cursor Dot with Google Color Wheel Border */}
      <div
        className="fixed inset-0 pointer-events-none z-[9999999] overflow-hidden"
        style={{ opacity: isVisible && mousePos.x >= 0 ? 1 : 0, transition: 'opacity 0.15s ease' }}
      >
        <motion.div
          className="absolute top-0 left-0 flex items-center justify-center pointer-events-none rounded-full"
          style={{
            x: mousePos.x - (isHovered ? 14 : isPressed ? 8 : 10),
            y: mousePos.y - (isHovered ? 14 : isPressed ? 8 : 10),
            width: isHovered ? 28 : isPressed ? 16 : 20,
            height: isHovered ? 28 : isPressed ? 16 : 20,
          }}
          transition={{ type: 'spring', stiffness: 800, damping: 35 }}
        >
          {/* Rotating 4-Color Google Conical Gradient Ring */}
          <div
            className="w-full h-full rounded-full p-[2px] flex items-center justify-center transition-all duration-200"
            style={{
              background: 'conic-gradient(from 0deg, #4285F4, #EA4335, #FBBC05, #34A853, #4285F4)',
              animation: 'spin 5s linear infinite',
              boxShadow: isHovered
                ? '0 0 12px rgba(66, 133, 244, 0.5), 0 0 6px rgba(234, 67, 53, 0.4)'
                : '0 1px 6px rgba(0, 0, 0, 0.3)',
            }}
          >
            {/* Precision Solid Black Core Dot */}
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center border border-white/40">
              {isHovered && (
                <span className="text-[8px] font-bold text-white font-mono tracking-tighter opacity-90 animate-pulse">
                  &lt;&gt;
                </span>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};
