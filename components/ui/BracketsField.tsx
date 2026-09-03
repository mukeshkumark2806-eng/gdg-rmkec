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
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;
      rotation: number;
      rotSpeed: number;
    }

    const count = Math.min(32, Math.floor((width * height) / 35000));
    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        char: symbols[Math.floor(Math.random() * symbols.length)],
        size: Math.random() * 20 + 16,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.5 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: (Math.random() - 0.5) * 0.5,
        rotSpeed: (Math.random() - 0.5) * 0.005,
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle ambient radial glow around center/mouse
      const radialGradient = ctx.createRadialGradient(
        mouseX,
        mouseY,
        0,
        mouseX,
        mouseY,
        Math.max(width, height) * 0.6
      );
      radialGradient.addColorStop(0, 'rgba(66, 133, 244, 0.05)');
      radialGradient.addColorStop(0.5, 'rgba(251, 188, 5, 0.02)');
      radialGradient.addColorStop(1, 'transparent');
      ctx.fillStyle = radialGradient;
      ctx.fillRect(0, 0, width, height);

      // Render floating code bracket particles
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotSpeed;

        if (p.x < -50) p.x = width + 50;
        if (p.x > width + 50) p.x = -50;
        if (p.y < -50) p.y = height + 50;
        if (p.y > height + 50) p.y = -50;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.font = `600 ${p.size}px monospace`;
        ctx.fillStyle = p.color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(p.char, 0, 0);
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
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
