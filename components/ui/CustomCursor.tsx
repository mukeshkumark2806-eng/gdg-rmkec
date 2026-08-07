'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// Google Brand Colors (Color Wheel sequence: Blue -> Red -> Yellow -> Green)
const GOOGLE_COLORS = ['#4285F4', '#EA4335', '#FBBC05', '#34A853'];

interface TrailPoint {
  x: number;
  y: number;
  color: string;
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
  const [followerPos, setFollowerPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

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

      // Cycle through Google color wheel sequence
      const currentColor = GOOGLE_COLORS[colorIndexRef.current % GOOGLE_COLORS.length];
      colorIndexRef.current += 1;

      // Push trail point
      trailPointsRef.current.unshift({
        x,
        y,
        color: currentColor,
      });

      // Keep maximum 20 trail points for a sleek color-wheel ribbon
      if (trailPointsRef.current.length > 20) {
        trailPointsRef.current.pop();
      }

      // Spawn micro crisp color sparks on mouse move
      if (Math.random() > 0.35) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.5 + Math.random() * 1.5;
        sparksRef.current.push({
          x: x + (Math.random() - 0.5) * 4,
          y: y + (Math.random() - 0.5) * 4,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 2 + Math.random() * 2.5,
          color: currentColor,
          life: 1.0,
          maxLife: 16 + Math.random() * 14,
        });
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

    // 60FPS Render Loop: Sleek Google Color Wheel Ribbon + Crisp Stardust Sparks
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const trail = trailPointsRef.current;

      // 1. Draw Crisp Google Color Wheel Ribbon Stream
      if (trail.length > 1) {
        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        for (let i = 0; i < trail.length - 1; i++) {
          const pt = trail[i];
          const nextPt = trail[i + 1];
          const progress = 1 - i / trail.length; // 1 at head, 0 at tail

          ctx.beginPath();
          ctx.moveTo(pt.x, pt.y);
          ctx.lineTo(nextPt.x, nextPt.y);

          ctx.strokeStyle = pt.color;
          ctx.lineWidth = Math.max(1, 4 * progress);
          ctx.globalAlpha = progress * 0.85;
          ctx.stroke();
        }
        ctx.restore();
      }

      // 2. Draw Micro Crisp Google Color Sparks
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
        s.vx *= 0.93;
        s.vy *= 0.93;

        const currentOpacity = Math.max(0, s.life);
        const currentSize = s.size * s.life;

        ctx.save();
        ctx.fillStyle = s.color;
        ctx.globalAlpha = currentOpacity * 0.9;
        ctx.beginPath();
        ctx.arc(s.x, s.y, currentSize, 0, Math.PI * 2);
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

  // Smooth lerp follower for black cursor ring
  useEffect(() => {
    let animId: number;
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const updateFollower = () => {
      setFollowerPos((prev) => ({
        x: lerp(prev.x, mousePos.x, 0.28),
        y: lerp(prev.y, mousePos.y, 0.28),
      }));
      animId = requestAnimationFrame(updateFollower);
    };

    animId = requestAnimationFrame(updateFollower);
    return () => cancelAnimationFrame(animId);
  }, [mousePos]);

  return (
    <>
      {/* 60FPS Hardware-Accelerated Canvas Trail */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9999998]"
        style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.2s ease' }}
      />

      {/* Black Custom Pointer Dot with Rotating Google Color Wheel Ring */}
      <div
        className="fixed inset-0 pointer-events-none z-[9999999] overflow-hidden"
        style={{ opacity: isVisible && mousePos.x >= 0 ? 1 : 0, transition: 'opacity 0.15s ease' }}
      >
        {/* Outer Ring: Rotating 4-Color Google Wheel around Black Center */}
        <motion.div
          className="absolute top-0 left-0 rounded-full flex items-center justify-center pointer-events-none"
          style={{
            width: isHovered ? 52 : isPressed ? 26 : 36,
            height: isHovered ? 52 : isPressed ? 26 : 36,
            x: followerPos.x - (isHovered ? 26 : isPressed ? 13 : 18),
            y: followerPos.y - (isHovered ? 26 : isPressed ? 13 : 18),
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 28 }}
        >
          {/* Rotating 4-Color Conical Gradient Wheel */}
          <div
            className="w-full h-full rounded-full p-[2px] transition-transform duration-200"
            style={{
              background: 'conic-gradient(from 0deg, #4285F4, #EA4335, #FBBC05, #34A853, #4285F4)',
              boxShadow: isHovered
                ? '0 0 16px rgba(66, 133, 244, 0.6), 0 0 8px rgba(234, 67, 53, 0.5)'
                : '0 0 10px rgba(0, 0, 0, 0.4)',
              animation: 'spin 6s linear infinite',
            }}
          >
            {/* Inner Black Core of Ring */}
            <div className="w-full h-full bg-black/90 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
              {isHovered && (
                <span className="text-[10px] font-bold text-white font-mono tracking-tighter animate-pulse">
                  &lt;&gt;
                </span>
              )}
            </div>
          </div>
        </motion.div>

        {/* Central Core Pointer Dot - Solid Black with Crisp White Outline */}
        <motion.div
          className="absolute top-0 left-0 rounded-full pointer-events-none bg-black border-2 border-white shadow-[0_0_10px_rgba(0,0,0,0.8)]"
          style={{
            width: isHovered ? 12 : 9,
            height: isHovered ? 12 : 9,
            x: mousePos.x - (isHovered ? 6 : 4.5),
            y: mousePos.y - (isHovered ? 6 : 4.5),
          }}
          transition={{ type: 'spring', stiffness: 750, damping: 35 }}
        />
      </div>
    </>
  );
};
