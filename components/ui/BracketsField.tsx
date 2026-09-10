'use client';

import React, { useEffect, useRef } from 'react';
import { useLiteMode } from '@/context/LiteModeContext';

export const BracketsField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { isLiteMode } = useLiteMode();

  useEffect(() => {
    if (isLiteMode) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const symbols = ['{', '}', '[', ']', '<', '>', '//', '+', '•', '01', ';'];
    const colors = [
      'rgba(251, 188, 5, 0.45)', // yellow
      'rgba(66, 133, 244, 0.45)', // blue
      'rgba(234, 67, 53, 0.35)',  // red
      'rgba(52, 168, 83, 0.4)',   // green
      'rgba(240, 240, 242, 0.25)', // white
    ];

    interface Particle {
      x: number;
      y: number;
      char: string;
      size: number;
      fontStr: string;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;
      rotation: number;
      rotSpeed: number;
    }

    const count = Math.min(28, Math.floor((width * height) / 40000));
    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      const size = Math.round(Math.random() * 18 + 16);
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        char: symbols[Math.floor(Math.random() * symbols.length)],
        size,
        fontStr: `600 ${size}px monospace`,
        speedX: (Math.random() - 0.5) * 0.35,
        speedY: (Math.random() - 0.5) * 0.35,
        opacity: Math.random() * 0.5 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: (Math.random() - 0.5) * 0.5,
        rotSpeed: (Math.random() - 0.5) * 0.004,
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 2;
    let isVisible = !document.hidden;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible && !animationFrameId) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cache font alignments once
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const render = () => {
      if (!isVisible) {
        animationFrameId = 0;
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Render floating code bracket particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotSpeed;

        if (p.x < -50) p.x = width + 50;
        else if (p.x > width + 50) p.x = -50;
        if (p.y < -50) p.y = height + 50;
        else if (p.y > height + 50) p.y = -50;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.font = p.fontStr;
        ctx.fillStyle = p.color;
        ctx.fillText(p.char, 0, 0);
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isLiteMode]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-page-bg opacity-90" />
      <div className="absolute inset-0 bg-devfest-grid opacity-40" />
      {!isLiteMode && (
        <canvas ref={canvasRef} className="brackets-canvas absolute inset-0 h-full w-full opacity-70" />
      )}
    </div>
  );
};
