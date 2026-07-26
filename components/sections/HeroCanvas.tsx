'use client';

import React, { useEffect, useRef } from 'react';

/* ── GDG Brand Palette ─────────────────────────────────────── */
const PALETTE = ['#4285F4', '#EA4335', '#FBBC05', '#34A853'];

/* ── Smooth layered noise (no Math.random in render) ──────── */
const sn = (x: number, t: number) =>
  Math.sin(x * 1.90 + t * 0.82) * 0.46
  + Math.sin(x * 3.30 - t * 0.50) * 0.30
  + Math.cos(x * 0.80 + t * 1.22) * 0.24;

/* ── Types ─────────────────────────────────────────────────── */
interface Node {
  t:     number;   // position [0,1] along curve
  spd:   number;   // travel speed (very slow — nodes drift)
  r:     number;   // solid circle radius (4–18 px)
  bloom: number;   // glow multiplier (3–5)
}

interface Spline {
  x0: number; y0: number;
  x1: number; y1: number;
  x2: number; y2: number;
  x3: number; y3: number;
  s1: number; s2: number; s3: number; s4: number;
  wAmp: number; wFreq: number; wPhase: number;
  spd:  number;
  color:   string;
  opacity: number;
  width:   number;
  overrun: boolean;
  nodes:   Node[];
}

interface BgSpline {
  x0: number; y0: number;
  x1: number; y1: number;
  x2: number; y2: number;
  x3: number; y3: number;
  s1: number;
  wAmp: number; wFreq: number; wPhase: number; spd: number;
  opacity: number;
  width:   number;
}

interface Star {
  x: number; y: number;
  r: number; alpha: number;
  vx: number; vy: number;
  phase: number;
}

/* ═══════════════════════════════════════════════════════════════
   HeroCanvas — Google I/O-style spline fan with glowing nodes

   Exact match to reference image:
   • Bright blue origin at ~48% W, 55% H
   • 24 primary bezier curves fan outward to the right
   • Each curve carries 2–3 large glowing colored nodes
   • 50 ultra-thin background curves (5–10 % opacity)
   • 65 drifting star particles (scattered, mostly left side)
   • Mouse: CPs bend, nodes drift faster near cursor
   ═══════════════════════════════════════════════════════════════ */
export const HeroCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true })!;

    let raf: number;
    let W = 0, H = 0, dpr = 1;
    let OX = 0, OY = 0;  // bright origin

    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
    const onMove  = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.tx = e.clientX - r.left;
      mouse.ty = e.clientY - r.top;
    };
    const onLeave = () => { mouse.tx = -9999; mouse.ty = -9999; };
    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);

    let splines:   Spline[]   = [];
    let bgSplines: BgSpline[] = [];
    let stars:     Star[]     = [];

    /* ── Cubic bezier point ─────────────────────────────────── */
    const bpt = (
      x0: number, y0: number, x1: number, y1: number,
      x2: number, y2: number, x3: number, y3: number, t: number,
    ) => {
      const u = 1 - t, u2 = u * u, t2 = t * t;
      return {
        x: u2 * u * x0 + 3 * u2 * t * x1 + 3 * u * t2 * x2 + t2 * t * x3,
        y: u2 * u * y0 + 3 * u2 * t * y1 + 3 * u * t2 * y2 + t2 * t * y3,
      };
    };

    /* ── Animated control points ────────────────────────────── */
    const acp = (s: Spline, T: number) => {
      const w1 = Math.sin(T * s.wFreq + s.wPhase)              * s.wAmp;
      const w2 = Math.cos(T * s.wFreq * 0.70 + s.wPhase + 1.2) * s.wAmp * 0.55;

      let cp1x = s.x1 + (w1 + sn(s.s1, T) * 0.008) * W;
      let cp1y = s.y1 + (w2 + sn(s.s3, T) * 0.006) * H;
      let cp2x = s.x2 + (-w1 * 0.55 + sn(s.s2, T) * 0.007) * W;
      let cp2y = s.y2 + (-w2 * 0.42 + sn(s.s4, T) * 0.005) * H;

      if (mouse.x > -100) {
        const inf = W * 0.45;
        const r1  = Math.hypot(mouse.x - cp1x, mouse.y - cp1y);
        const r2  = Math.hypot(mouse.x - cp2x, mouse.y - cp2y);
        if (r1 < inf) { const mf = (1 - r1/inf)**1.8 * 0.12; cp1x += (mouse.x - cp1x) * mf; cp1y += (mouse.y - cp1y) * mf; }
        if (r2 < inf) { const mf = (1 - r2/inf)**1.8 * 0.08; cp2x += (mouse.x - cp2x) * mf; cp2y += (mouse.y - cp2y) * mf; }
      }

      return { cp1x, cp1y, cp2x, cp2y };
    };

    /* ── Init ───────────────────────────────────────────────── */
    const init = () => {
      const rect = canvas.getBoundingClientRect();
      W = rect.width; H = rect.height;
      dpr = Math.min(window.devicePixelRatio ?? 1, 2);
      canvas.width  = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      /* Origin: left-center of the animation area.
         In the reference this is at ~48% viewport W, ~55% H. */
      OX = W * 0.483;
      OY = H * 0.550;

      /* ── Primary splines: 29 curves (increased by ~20%) fanning organically ── */
      const N = 29;
      splines = [];
      for (let i = 0; i < N; i++) {
        const frac  = i / (N - 1);
        const color = PALETTE[i % PALETTE.length];

        /* All curves originate from the bright point with tiny jitter */
        const x0 = OX + (Math.random() - 0.5) * W * 0.010;
        const y0 = OY + (Math.random() - 0.5) * H * 0.012;

        /* Endpoints are distributed organically and can cross each other */
        const overrun = Math.random() < 0.18;
        const x3 = overrun
          ? W * (1.02 + Math.random() * 0.10)
          : W * (0.75 + Math.random() * 0.25);
        
        const y3 = H * (0.10 + frac * 0.80) + (Math.random() - 0.5) * H * 0.45;

        /* Control points define upward/downward or straight arcs */
        const arcDir = Math.random() > 0.5 ? 1 : -1;
        const arcMag = Math.random() * H * 0.55; 

        const x1 = OX + (x3 - OX) * (0.2 + Math.random() * 0.3);
        const y1 = y0 + (y3 - y0) * 0.3 + arcDir * arcMag * (0.3 + Math.random() * 0.4);

        const x2 = OX + (x3 - OX) * (0.5 + Math.random() * 0.3);
        const y2 = y0 + (y3 - y0) * 0.7 + arcDir * arcMag * (0.3 + Math.random() * 0.4);

        /* 4-6 small glowing nodes per curve, distributed randomly */
        const nCount = 4 + Math.floor(Math.random() * 3);
        const nodes: Node[] = Array.from({ length: nCount }, () => ({
          t:     Math.random(),
          spd:   (0.00004 + Math.random() * 0.00008) * (Math.random() < 0.3 ? -1 : 1),
          r:     Math.random() > 0.85 ? 3.0 + Math.random() * 3.0 : 1.5 + Math.random() * 1.5,
          bloom: 1.0 + Math.random() * 0.5,
        }));

        splines.push({
          x0, y0, x1, y1, x2, y2, x3, y3,
          s1: Math.random() * 12, s2: Math.random() * 12,
          s3: Math.random() * 12, s4: Math.random() * 12,
          wAmp:   0.005 + Math.random() * 0.025, // different amplitudes
          wFreq:  0.15  + Math.random() * 0.65,  // different frequencies
          wPhase: Math.random() * Math.PI * 2,
          spd:    0.30  + Math.random() * 0.50,  // smooth and slow motion
          color,
          opacity: 0.20 + Math.random() * 0.30,  // slightly reduced to prevent brightening
          width:   0.65 + Math.random() * 1.25,
          overrun,
          nodes,
        });
      }

      /* ── Background splines: 60 ultra-thin curves for depth ──────── */
      const NB = 60;
      bgSplines = [];
      for (let i = 0; i < NB; i++) {
        const frac = i / (NB - 1);
        const x0 = OX + (Math.random() - 0.5) * W * 0.022;
        const y0 = OY + (Math.random() - 0.5) * H * 0.025;
        const x3 = W * (0.68 + Math.random() * 0.34);
        
        const y3 = H * (0.05 + frac * 0.90) + (Math.random() - 0.5) * H * 0.35;
        
        const arcDir = Math.random() > 0.5 ? 1 : -1;
        const arcMag = Math.random() * H * 0.40;
        
        const x1 = OX + (x3 - OX) * (0.2 + Math.random() * 0.3);
        const y1 = y0 + (y3 - y0) * 0.25 + arcDir * arcMag * Math.random();
        
        const x2 = OX + (x3 - OX) * (0.6 + Math.random() * 0.3);
        const y2 = y0 + (y3 - y0) * 0.75 + arcDir * arcMag * Math.random();

        bgSplines.push({
          x0, y0, x1, y1, x2, y2, x3, y3,
          s1:      Math.random() * 18,
          wAmp:    0.003 + Math.random() * 0.015,
          wFreq:   0.10  + Math.random() * 0.30,
          wPhase:  Math.random() * Math.PI * 2,
          spd:     0.20  + Math.random() * 0.40,
          opacity: 0.10  + Math.random() * 0.05, // 10-15% opacity for depth
          width:   0.20  + Math.random() * 0.30,
        });
      }

      /* ── Star particles: 65 drifting background dots ────────── */
      stars = Array.from({ length: 65 }, () => ({
        x:     Math.random() * W,
        y:     Math.random() * H,
        r:     0.5 + Math.random() * 1.8,
        alpha: 0.12 + Math.random() * 0.42,
        vx:    (Math.random() - 0.5) * 0.04,
        vy:    (Math.random() - 0.5) * 0.03,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    window.addEventListener('resize', init);
    init();

    let time = 0;

    /* ── Render loop ─────────────────────────────────────────── */
    const render = () => {
      time += 0.007; // smooth and slow motion

      mouse.x += (mouse.tx - mouse.x) * 0.055;
      mouse.y += (mouse.ty - mouse.y) * 0.055;

      ctx.clearRect(0, 0, W, H);

      /* ══ L0 – Origin ambient glow ══════════════════════════════ */
      {
        const pulse = Math.sin(time * 1.4) * 0.05 + 1;
        const g0 = ctx.createRadialGradient(OX, OY, 0, OX, OY, W * 0.30 * pulse);
        g0.addColorStop(0,    'rgba(66,133,244,0.13)');
        g0.addColorStop(0.45, 'rgba(50,100,210,0.05)');
        g0.addColorStop(1,    'rgba(11,15,23,0)');
        ctx.fillStyle = g0;
        ctx.beginPath(); ctx.arc(OX, OY, W * 0.30 * pulse, 0, Math.PI * 2); ctx.fill();

        const g1 = ctx.createRadialGradient(OX, OY, 0, OX, OY, W * 0.10);
        g1.addColorStop(0,    'rgba(130,190,255,0.24)');
        g1.addColorStop(0.55, 'rgba(66,133,244,0.09)');
        g1.addColorStop(1,    'transparent');
        ctx.fillStyle = g1;
        ctx.beginPath(); ctx.arc(OX, OY, W * 0.10, 0, Math.PI * 2); ctx.fill();
      }

      /* ══ L1 – Drifting star particles ══════════════════════════ */
      stars.forEach((s) => {
        s.x += s.vx; s.y += s.vy;
        if (s.x < 0) s.x = W; if (s.x > W) s.x = 0;
        if (s.y < 0) s.y = H; if (s.y > H) s.y = 0;
        const blink = 0.70 + Math.sin(time * 1.3 + s.phase) * 0.30;
        ctx.save();
        ctx.fillStyle   = '#4a9eff';
        ctx.globalAlpha = s.alpha * blink;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
      });

      /* ══ L2 – Background splines ════════════════════════════════ */
      bgSplines.forEach((b) => {
        const T  = time * b.spd;
        const w  = Math.sin(T * b.wFreq + b.wPhase) * b.wAmp;
        const x1 = b.x1 + w * W;
        const y1 = b.y1 + Math.cos(T * b.wFreq + b.wPhase) * b.wAmp * H * 0.5;
        const x2 = b.x2 - w * W * 0.40 + sn(b.s1, T) * 0.003 * W;
        const y2 = b.y2 + sn(b.s1 + 4, T) * 0.004 * H;
        ctx.save();
        ctx.beginPath(); ctx.moveTo(b.x0, b.y0);
        ctx.bezierCurveTo(x1, y1, x2, y2, b.x3, b.y3);
        ctx.strokeStyle = '#ffffff';
        ctx.globalAlpha = b.opacity;
        ctx.lineWidth   = b.width;
        ctx.stroke();
        ctx.restore();
      });

      /* ══ L3 – Primary splines ════════════════════════════════════ */
      splines.forEach((s) => {
        const T = time * s.spd;
        const { cp1x, cp1y, cp2x, cp2y } = acp(s, T);
        const endOp = s.overrun ? Math.max(0, 1 - (s.x3 - W) / (W * 0.08)) : 1;

        /* Depth shadow */
        ctx.save();
        ctx.beginPath(); ctx.moveTo(s.x0, s.y0 + 2);
        ctx.bezierCurveTo(cp1x + 1, cp1y + 2, cp2x + 1, cp2y + 2, s.x3, s.y3);
        ctx.strokeStyle = s.color;
        ctx.globalAlpha = s.opacity * 0.12 * endOp;
        ctx.lineWidth   = s.width * 3;
        ctx.stroke(); ctx.restore();

        /* Main colored line */
        ctx.save();
        ctx.beginPath(); ctx.moveTo(s.x0, s.y0);
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, s.x3, s.y3);
        ctx.strokeStyle = s.color;
        ctx.globalAlpha = s.opacity * endOp;
        ctx.lineWidth   = s.width;
        ctx.shadowColor = s.color;
        ctx.shadowBlur  = 5;
        ctx.stroke(); ctx.restore();

        /* Volumetric glow pass */
        ctx.save();
        ctx.beginPath(); ctx.moveTo(s.x0, s.y0);
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, s.x3, s.y3);
        ctx.strokeStyle = s.color;
        ctx.globalAlpha = s.opacity * 0.18 * endOp;
        ctx.lineWidth   = s.width * 5.5;
        ctx.stroke(); ctx.restore();

        /* ── Glowing nodes traveling slowly along the curve ──────
           Each node is a solid filled circle with a soft outer glow,
           matching the large colored dots from the reference image.
        ─────────────────────────────────────────────────────────── */
        s.nodes.forEach((n) => {
          n.t += n.spd;
          if (n.t > 1) n.t = 0;
          if (n.t < 0) n.t = 1;

          /* Mouse: nodes accelerate near cursor */
          const ptPos = bpt(s.x0, s.y0, cp1x, cp1y, cp2x, cp2y, s.x3, s.y3, n.t);
          const dm    = Math.hypot(mouse.x - ptPos.x, mouse.y - ptPos.y);
          if (dm < 200 && mouse.x > -100) {
            n.t += n.spd * (1 - dm / 200) * 1.8;
          }

          const pt = bpt(s.x0, s.y0, cp1x, cp1y, cp2x, cp2y, s.x3, s.y3, n.t);

          /* 1. Outer bloom glow (additive blending) */
          ctx.save();
          ctx.globalCompositeOperation = 'lighter';
          const ng = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, n.r * n.bloom);
          ng.addColorStop(0,    s.color + '99'); // Softer colors
          ng.addColorStop(0.35, s.color + '33');
          ng.addColorStop(1,    'transparent');
          ctx.fillStyle   = ng;
          ctx.globalAlpha = 0.24; // reduced intensity by 70%
          ctx.beginPath(); ctx.arc(pt.x, pt.y, n.r * n.bloom, 0, Math.PI * 2); ctx.fill();
          ctx.restore();

          /* 2. Solid colored circle (the visible "node dot") */
          ctx.save();
          ctx.fillStyle  = s.color;
          ctx.shadowColor = s.color;
          ctx.shadowBlur  = 6; // reduced blur
          ctx.globalAlpha = 0.45; // reduced brightness by 50%
          ctx.beginPath(); ctx.arc(pt.x, pt.y, n.r, 0, Math.PI * 2); ctx.fill();
          ctx.restore();

          /* 3. Bright white highlight center */
          ctx.save();
          ctx.globalCompositeOperation = 'lighter';
          ctx.fillStyle   = '#ffffff';
          ctx.globalAlpha = 0.40; // reduced brightness by 50%
          ctx.beginPath(); ctx.arc(pt.x, pt.y, n.r * 0.38, 0, Math.PI * 2); ctx.fill();
          ctx.restore();
        });
      });

      /* ══ L4 – Origin flare: bright white core with blue bloom ═══ */
      {
        const b = 1 + Math.sin(time * 1.55) * 0.07;

        ctx.save();
        ctx.globalCompositeOperation = 'lighter';

        /* Radial bloom halo */
        const gf = ctx.createRadialGradient(OX, OY, 0, OX, OY, 42 * b);
        gf.addColorStop(0,    '#ffffff');
        gf.addColorStop(0.18, 'rgba(130,195,255,0.95)');
        gf.addColorStop(0.50, 'rgba(66,133,244,0.42)');
        gf.addColorStop(0.85, 'rgba(66,133,244,0.10)');
        gf.addColorStop(1,    'transparent');
        ctx.fillStyle = gf;
        ctx.beginPath(); ctx.arc(OX, OY, 42 * b, 0, Math.PI * 2); ctx.fill();

        /* Bright white core dot */
        ctx.fillStyle   = '#ffffff';
        ctx.shadowColor = '#a0c8ff';
        ctx.shadowBlur  = 26;
        ctx.beginPath(); ctx.arc(OX, OY, 4.2, 0, Math.PI * 2); ctx.fill();

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
      {/* <-- Adjust translateX here */}
      <canvas ref={canvasRef} className="w-full h-full translate-x-[20px]" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.07]" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0B0F17] to-transparent" />
    </div>
  );
};
