'use client';

import React, { useEffect, useRef } from 'react';

/* ─── GDG Brand Palette ──────────────────────────────── */
const PALETTE = ['#4285F4', '#EA4335', '#FBBC05', '#34A853'];

/* ─── Pseudo-noise: layered harmonics give organic drift ─ */
const noise = (x: number, y: number, t: number) =>
  Math.sin(x * 1.3 + t * 0.7) * 0.4
  + Math.sin(y * 0.9 - t * 0.5) * 0.3
  + Math.cos((x + y) * 0.6 + t * 1.1) * 0.2
  + Math.sin(x * 2.2 - y * 1.4 + t * 0.3) * 0.1;

/* ─── Data types ─────────────────────────────────────── */
interface Stream {
  color: string;
  endX: number; endY: number;
  // four layers of CP noise seeds
  sx1: number; sy1: number;
  sx2: number; sy2: number;
  nx1: number; ny1: number;
  nx2: number; ny2: number;
  // visual personality
  baseWidth: number;
  baseOpacity: number;
  phaseOffset: number;
  speedMult: number;
  // terminal node
  hasNode: boolean;
  nodeR: number;
  nodePulse: number;
  // energy particles
  particles: { t: number; speed: number; r: number; trail: { x: number; y: number; a: number }[] }[];
}

interface Dust {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  alpha: number;
  color: string;
}

export const HeroCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true })!;

    let raf: number;
    let W = 0, H = 0, dpr = 1;
    let OX = 0, OY = 0; // origin

    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
    const onMove = (e: MouseEvent) => { const r = canvas.getBoundingClientRect(); mouse.tx = e.clientX - r.left; mouse.ty = e.clientY - r.top; };
    const onLeave = () => { mouse.tx = -9999; mouse.ty = -9999; };
    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);

    let streams: Stream[] = [];
    let dust: Dust[] = [];

    /* ─── Scene initialisation ─────────────────────────── */
    const init = () => {
      const rect = canvas.getBoundingClientRect();
      W = rect.width; H = rect.height;
      dpr = Math.min(window.devicePixelRatio ?? 1, 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      OX = W * 0.455;
      OY = H * 0.485;

      streams = [];

      /* 30 streams – each with unique personality */
      const N = 30;
      for (let i = 0; i < N; i++) {
        const frac = i / (N - 1); // 0→1

        /* Endpoints spread across right edge with slight randomness */
        const endX = W * (0.78 + Math.random() * 0.18);
        const endY = H * (0.03 + frac * 0.94) + (Math.random() - 0.5) * H * 0.02;

        /* CP seeds – random offsets baked in so each curve is truly unique */
        const sx1 = Math.random() * 6.28;
        const sy1 = Math.random() * 6.28;
        const sx2 = Math.random() * 6.28;
        const sy2 = Math.random() * 6.28;
        // secondary noise seeds for deeper variation
        const nx1 = Math.random() * 12.56;
        const ny1 = Math.random() * 12.56;
        const nx2 = Math.random() * 12.56;
        const ny2 = Math.random() * 12.56;

        const color = PALETTE[i % PALETTE.length];

        const hasNode = Math.random() < 0.40;
        const pCount = Math.random() < 0.45 ? 2 : 1;

        streams.push({
          color, endX, endY,
          sx1, sy1, sx2, sy2,
          nx1, ny1, nx2, ny2,
          baseWidth: 0.55 + Math.random() * 0.90,
          baseOpacity: 0.22 + Math.random() * 0.32,
          phaseOffset: Math.random() * Math.PI * 2,
          speedMult: 0.55 + Math.random() * 0.90,
          hasNode,
          nodeR: hasNode ? (2.0 + Math.random() * 2.2) : 0,
          nodePulse: Math.random() * Math.PI * 2,
          particles: Array.from({ length: pCount }, () => ({
            t: Math.random(),
            speed: (0.00025 + Math.random() * 0.00040),
            r: 1.4 + Math.random() * 1.0,
            trail: [],
          })),
        });
      }

      /* Ambient dust – 60 tiny floating specks in the right zone */
      dust = Array.from({ length: 60 }, () => spawnDust());
    };

    const spawnDust = (): Dust => ({
      x: W * (0.46 + Math.random() * 0.52),
      y: H * (0.03 + Math.random() * 0.94),
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.08,
      r: 0.5 + Math.random() * 1.0,
      alpha: 0.08 + Math.random() * 0.18,
      color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
    });

    window.addEventListener('resize', init);
    init();

    /* ─── Bezier point helper ─────────────────────────── */
    const bpt = (
      p0x: number, p0y: number,
      c1x: number, c1y: number,
      c2x: number, c2y: number,
      p3x: number, p3y: number,
      t: number
    ) => {
      const u = 1 - t, t2 = t * t, u2 = u * u;
      return {
        x: u2 * u * p0x + 3 * u2 * t * c1x + 3 * u * t2 * c2x + t2 * t * p3x,
        y: u2 * u * p0y + 3 * u2 * t * c1y + 3 * u * t2 * c2y + t2 * t * p3y,
      };
    };

    /* ─── Soft radial glow helper ─────────────────────── */
    const radialGlow = (
      cx: number, cy: number, r: number,
      inner: string, outer: string,
      alpha = 1.0
    ) => {
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      g.addColorStop(0, inner);
      g.addColorStop(1, outer);
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    let time = 0;

    /* ─── Render loop ────────────────────────────────── */
    const render = () => {
      time += 0.009; // very slow – cinematic pace

      /* Smooth mouse */
      mouse.x += (mouse.tx - mouse.x) * 0.055;
      mouse.y += (mouse.ty - mouse.y) * 0.055;

      ctx.clearRect(0, 0, W, H);

      /* ══ LAYER 0 – Volumetric origin ambiance ══ */
      {
        // Three pulsing soft halos at different radii
        const pulse = Math.sin(time * 1.4) * 0.05;
        radialGlow(OX, OY, W * 0.32,
          'rgba(66,133,244,0.06)',
          'rgba(255,255,255,0)', 1);
        radialGlow(OX, OY, W * 0.16,
          'rgba(66,133,244,0.09)',
          'rgba(255,255,255,0)', 1);
        radialGlow(OX, OY, W * 0.07 * (1 + pulse),
          'rgba(100,160,255,0.12)',
          'rgba(255,255,255,0)', 1);
      }

      /* ══ LAYER 1 – Ambient floating dust ══ */
      dust.forEach((d) => {
        d.x += d.vx;
        d.y += d.vy;
        // wrap around right zone
        if (d.x < W * 0.45 || d.x > W * 0.99) d.vx *= -1;
        if (d.y < 0 || d.y > H) d.vy *= -1;

        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        const dg = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.r * 3);
        dg.addColorStop(0, '#ffffff');
        dg.addColorStop(0.5, d.color);
        dg.addColorStop(1, 'transparent');
        ctx.fillStyle = dg;
        ctx.globalAlpha = d.alpha * (0.7 + Math.sin(time * 2 + d.x) * 0.3);
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r * 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      /* ══ LAYER 2 – Shadow/depth ghost curves (drawn first, darker) ══ */
      streams.forEach((s) => {
        const T = time * s.speedMult;

        // CP1 – organic harmonic drift
        const cp1x = OX + (s.endX - OX) * 0.30
          + noise(s.sx1, s.sy1, T) * W * 0.045
          + Math.sin(T * 0.7 + s.phaseOffset) * W * 0.022;
        const cp1y = OY + (s.endY - OY) * 0.08
          + noise(s.sx1 + 1, s.sy1 + 1, T) * H * 0.065
          + Math.cos(T * 0.5 + s.phaseOffset) * H * 0.028;

        // CP2
        const cp2x = OX + (s.endX - OX) * 0.70
          + noise(s.sx2, s.sy2, T) * W * 0.038
          + Math.cos(T * 0.6 + s.phaseOffset + 1) * W * 0.018;
        const cp2y = OY + (s.endY - OY) * 0.88
          + noise(s.sx2 + 2, s.sy2 + 2, T) * H * 0.055
          + Math.sin(T * 0.4 + s.phaseOffset + 1) * H * 0.022;

        // Store for later layers (re-computed below per stream)
        // We'll use the same logic inline below

        // Ghost underline (darker, slightly offset) for depth illusion
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(OX, OY + 1.5);
        ctx.bezierCurveTo(cp1x + 1.5, cp1y + 2, cp2x + 1.5, cp2y + 1.5, s.endX, s.endY);
        ctx.strokeStyle = s.color;
        ctx.globalAlpha = s.baseOpacity * 0.18;
        ctx.lineWidth = s.baseWidth * 2.8;
        ctx.stroke();
        ctx.restore();
      });

      /* ══ LAYER 3 – Main glowing streams + particles ══ */
      streams.forEach((s) => {
        const T = time * s.speedMult;

        // Mouse influence factor (0–1)
        let mf = 0;

        // Organic multi-harmonic CP positions
        let cp1x = OX + (s.endX - OX) * 0.30
          + noise(s.sx1, s.sy1, T) * W * 0.045
          + Math.sin(T * 0.7 + s.phaseOffset) * W * 0.022;
        let cp1y = OY + (s.endY - OY) * 0.08
          + noise(s.sx1 + 1, s.sy1 + 1, T) * H * 0.065
          + Math.cos(T * 0.5 + s.phaseOffset) * H * 0.028;

        let cp2x = OX + (s.endX - OX) * 0.70
          + noise(s.sx2, s.sy2, T) * W * 0.038
          + Math.cos(T * 0.6 + s.phaseOffset + 1) * W * 0.018;
        let cp2y = OY + (s.endY - OY) * 0.88
          + noise(s.sx2 + 2, s.sy2 + 2, T) * H * 0.055
          + Math.sin(T * 0.4 + s.phaseOffset + 1) * H * 0.022;

        // Gentle mouse bending only on right side
        if (mouse.x > W * 0.44) {
          const mx = (OX + cp1x + cp2x + s.endX) / 4;
          const my = (OY + cp1y + cp2y + s.endY) / 4;
          const d = Math.hypot(mouse.x - mx, mouse.y - my);
          if (d < 210) {
            mf = (1 - d / 210) ** 1.5;
            const bend = mf * 0.16;
            cp1x += (mouse.x - cp1x) * bend;
            cp1y += (mouse.y - cp1y) * bend;
            cp2x += (mouse.x - cp2x) * bend;
            cp2y += (mouse.y - cp2y) * bend;
          }
        }

        // ── Main curve ──
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(OX, OY);
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, s.endX, s.endY);
        ctx.strokeStyle = s.color;
        ctx.globalAlpha = s.baseOpacity + mf * 0.14;
        ctx.lineWidth = s.baseWidth + mf * 0.6;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 7 + mf * 8;
        ctx.stroke();
        ctx.restore();

        // ── Secondary glow pass (wider, more transparent – volumetric effect) ──
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(OX, OY);
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, s.endX, s.endY);
        ctx.strokeStyle = s.color;
        ctx.globalAlpha = s.baseOpacity * 0.25;
        ctx.lineWidth = s.baseWidth * 4.5;
        ctx.stroke();
        ctx.restore();

        // ── Energy particles with trailing tail ──
        s.nodePulse += 0.016;
        s.particles.forEach((p) => {
          // Speed up near mouse
          const ptPos = bpt(OX, OY, cp1x, cp1y, cp2x, cp2y, s.endX, s.endY, p.t);
          const dm = Math.hypot(mouse.x - ptPos.x, mouse.y - ptPos.y);
          const speedBoost = mouse.x > W * 0.44 && dm < 200 ? 1 + (1 - dm / 200) * 1.8 : 1;

          p.t += p.speed * speedBoost;
          if (p.t > 1) { p.t = 0; p.trail = []; }

          const pt = bpt(OX, OY, cp1x, cp1y, cp2x, cp2y, s.endX, s.endY, p.t);

          // Record trail (last 8 positions)
          p.trail.push({ x: pt.x, y: pt.y, a: 0.75 });
          if (p.trail.length > 8) p.trail.shift();

          // Draw fading trail
          p.trail.forEach((tp, ti) => {
            const fa = (ti / p.trail.length) * 0.45;
            ctx.save();
            ctx.globalCompositeOperation = 'lighter';
            ctx.fillStyle = s.color;
            ctx.globalAlpha = fa;
            ctx.beginPath();
            ctx.arc(tp.x, tp.y, p.r * 0.6 * (ti / p.trail.length), 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          });

          // Particle head glow
          ctx.save();
          ctx.globalCompositeOperation = 'lighter';
          const pg = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, p.r * 3.5);
          pg.addColorStop(0, '#ffffff');
          pg.addColorStop(0.35, s.color);
          pg.addColorStop(1, 'transparent');
          ctx.fillStyle = pg;
          ctx.globalAlpha = 0.95;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, p.r * 3.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });

        // ── Terminal glowing node ──
        if (s.hasNode) {
          const pulse = 1 + Math.sin(s.nodePulse) * 0.22;
          const nr = s.nodeR * pulse;

          ctx.save();
          ctx.globalCompositeOperation = 'lighter';
          const ng = ctx.createRadialGradient(s.endX, s.endY, 0, s.endX, s.endY, nr * 5);
          ng.addColorStop(0, '#ffffff');
          ng.addColorStop(0.25, s.color);
          ng.addColorStop(0.65, s.color + '55');
          ng.addColorStop(1, 'transparent');
          ctx.fillStyle = ng;
          ctx.globalAlpha = 0.88;
          ctx.beginPath();
          ctx.arc(s.endX, s.endY, nr * 5, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });

      /* ══ LAYER 4 – Sparse mid-curve landmark nodes ══ */
      const landmarks = [3, 8, 12, 17, 22, 27];
      landmarks.forEach((idx) => {
        if (idx >= streams.length) return;
        const s = streams[idx];
        const T = time * s.speedMult;
        const tPos = 0.46 + Math.sin(time * 0.28 + idx) * 0.05;

        const cp1x = OX + (s.endX - OX) * 0.30 + noise(s.sx1, s.sy1, T) * W * 0.045 + Math.sin(T * 0.7 + s.phaseOffset) * W * 0.022;
        const cp1y = OY + (s.endY - OY) * 0.08 + noise(s.sx1 + 1, s.sy1 + 1, T) * H * 0.065 + Math.cos(T * 0.5 + s.phaseOffset) * H * 0.028;
        const cp2x = OX + (s.endX - OX) * 0.70 + noise(s.sx2, s.sy2, T) * W * 0.038 + Math.cos(T * 0.6 + s.phaseOffset + 1) * W * 0.018;
        const cp2y = OY + (s.endY - OY) * 0.88 + noise(s.sx2 + 2, s.sy2 + 2, T) * H * 0.055 + Math.sin(T * 0.4 + s.phaseOffset + 1) * H * 0.022;

        const pt = bpt(OX, OY, cp1x, cp1y, cp2x, cp2y, s.endX, s.endY, tPos);
        const nr = 2.5 + Math.sin(time * 0.45 + idx * 0.7) * 0.4;

        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        const mg = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, nr * 5);
        mg.addColorStop(0, '#ffffff');
        mg.addColorStop(0.3, s.color);
        mg.addColorStop(0.7, s.color + '44');
        mg.addColorStop(1, 'transparent');
        ctx.fillStyle = mg;
        ctx.globalAlpha = 0.85;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, nr * 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      /* ══ LAYER 5 – Cinematic origin flare ══ */
      {
        const breathe = 1 + Math.sin(time * 1.2) * 0.08;

        ctx.save();
        ctx.globalCompositeOperation = 'lighter';

        // Large soft halo
        const halo = ctx.createRadialGradient(OX, OY, 0, OX, OY, 52 * breathe);
        halo.addColorStop(0, '#ffffff');
        halo.addColorStop(0.18, 'rgba(100,170,255,0.9)');
        halo.addColorStop(0.45, 'rgba(66,133,244,0.4)');
        halo.addColorStop(0.75, 'rgba(66,133,244,0.12)');
        halo.addColorStop(1, 'transparent');
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(OX, OY, 52 * breathe, 0, Math.PI * 2);
        ctx.fill();

        // Tiny bright core
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#8ab8ff';
        ctx.shadowBlur = 22;
        ctx.beginPath();
        ctx.arc(OX, OY, 4.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      raf = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', init);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.07]" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0B0F17] to-transparent" />
    </div>
  );
};
