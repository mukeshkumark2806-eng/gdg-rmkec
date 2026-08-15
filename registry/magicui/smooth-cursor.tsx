'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useVelocity,
  useTransform,
  SpringOptions,
} from 'framer-motion';

const GOOGLE_COLORS = ['#4285F4', '#EA4335', '#FBBC05', '#34A853'];

interface TrailPoint {
  x: number;
  y: number;
  color: string;
  age: number;
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

export interface SmoothCursorProps {
  cursor?: React.ReactNode;
  springConfig?: SpringOptions;
  showTrail?: boolean;
  className?: string;
}

const subscribeTouch = (callback: () => void) => {
  if (typeof window === 'undefined') return () => {};
  const mql = window.matchMedia('(pointer: coarse)');
  mql.addEventListener('change', callback);
  return () => mql.removeEventListener('change', callback);
};

const getTouchSnapshot = () => {
  if (typeof window === 'undefined') return false;
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia('(pointer: coarse)').matches
  );
};

const getTouchServerSnapshot = () => false;

export function SmoothCursor({
  cursor,
  springConfig = { damping: 30, stiffness: 450, mass: 0.1 },
  showTrail = true,
  className = '',
}: SmoothCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isTouchDevice = React.useSyncExternalStore(subscribeTouch, getTouchSnapshot, getTouchServerSnapshot);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const prevMouseRef = useRef({ x: -100, y: -100 });
  const trailPointsRef = useRef<TrailPoint[]>([]);
  const sparksRef = useRef<Spark[]>([]);
  const colorIndexRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const velocityX = useVelocity(smoothX);
  const velocityY = useVelocity(smoothY);

  const rotation = useTransform([velocityX, velocityY], (values: (number | string)[]) => {
    const vx = Number(values[0]) || 0;
    const vy = Number(values[1]) || 0;
    const speed = Math.hypot(vx, vy);
    if (speed < 25) return 0;
    const angle = (Math.atan2(vy, vx) * 180) / Math.PI;
    return Math.min(Math.max(angle - 90, -35), 35) * 0.2;
  });

  const speedScale = useTransform([velocityX, velocityY], (values: (number | string)[]) => {
    const vx = Number(values[0]) || 0;
    const vy = Number(values[1]) || 0;
    const speed = Math.hypot(vx, vy);
    return Math.min(1 + speed / 4000, 1.15);
  });

  useEffect(() => {
    if (isTouchDevice) return;

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      if (!isVisible) setIsVisible(true);
      mouseX.set(x);
      mouseY.set(y);

      if (showTrail) {
        const dx = x - prevMouseRef.current.x;
        const dy = y - prevMouseRef.current.y;
        const dist = Math.hypot(dx, dy);

        if (dist > 1.5) {
          const currentColor = GOOGLE_COLORS[colorIndexRef.current % GOOGLE_COLORS.length];
          colorIndexRef.current += 1;

          // Tail offset: calculate position of the bottom-right tail of the cursor
          const tailX = x + 11;
          const tailY = y + 17;

          trailPointsRef.current.unshift({
            x: tailX,
            y: tailY,
            color: currentColor,
            age: 1.0,
          });

          if (trailPointsRef.current.length > 26) {
            trailPointsRef.current.pop();
          }

          if (Math.random() > 0.45) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 0.4 + Math.random() * 1.2;
            sparksRef.current.push({
              x: tailX + (Math.random() - 0.5) * 4,
              y: tailY + (Math.random() - 0.5) * 4,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              size: 1.6 + Math.random() * 2,
              color: currentColor,
              life: 1.0,
              maxLife: 14 + Math.random() * 10,
            });
          }

          prevMouseRef.current = { x, y };
        }
      }

      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = !!target.closest(
          'a, button, input, textarea, select, [role="button"], [data-cursor="pointer"], .interactive-hover'
        );
        setIsHovered(interactive);
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

    // 60FPS Canvas Render Loop for smooth trailing line & particles
    const render = () => {
      const cvs = canvasRef.current;
      if (cvs) {
        const ctx = cvs.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, cvs.width, cvs.height);

          // 1. Decay and render smooth ribbon line trail
          const trail = trailPointsRef.current;
          for (let i = trail.length - 1; i >= 0; i--) {
            trail[i].age -= 0.038;
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
                ctx.lineWidth = Math.max(1, 3.5 * alpha);
                ctx.globalAlpha = alpha;
                ctx.stroke();
              }
            }
            ctx.restore();
          }

          // 2. Micro color sparks
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
        }
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    if (showTrail) {
      animFrameRef.current = requestAnimationFrame(render);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [mouseX, mouseY, isVisible, showTrail, isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Smooth Multi-Color Trail Line & Sparks Canvas */}
      {showTrail && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none z-[999998]"
          style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.2s ease' }}
        />
      )}

      {/* Physics-Based Smooth Cursor Pointer */}
      <motion.div
        className={`pointer-events-none fixed left-0 top-0 z-[999999] select-none ${className}`}
        style={{
          x: smoothX,
          y: smoothY,
          opacity: isVisible ? 1 : 0,
          rotate: isHovered ? 0 : rotation,
          scale: isPressed ? 0.85 : isHovered ? 1.12 : speedScale,
        }}
      >
        {cursor || (
          <div className="relative -left-1 -top-1 flex items-center justify-center">
            <svg
              width="34"
              height="34"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`h-8.5 w-8.5 transition-colors duration-200 ${
                isHovered ? 'text-blue-500' : ''
              }`}
            >
              <path
                d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
                fill={isHovered ? '#4285F4' : '#1A1A2E'}
                stroke="#ffffff"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </motion.div>
    </>
  );
}
