'use client';

import { useEffect, useRef } from 'react';

/* Self-playing reveal for the hero figure. Each time the rolling title
   ticks, the portrait blends into that title's costume variant with a
   themed entrance, holds for a blip, then animates back off. The
   choreography is drawn per-frame into an offscreen mask canvas; the shader
   blends base -> variant wherever the mask is painted. With no variant
   image, the blend target is an ink-duotone of the base portrait.

   Design note: every painter uses feathered, organic edges. Hard geometric
   fronts read as slideshow transitions.

   Falls back to the plain <img> (which always renders underneath) when
   WebGL is unavailable or the user prefers reduced motion. */

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

const FRAG = `
precision mediump float;
varying vec2 vUv;
uniform sampler2D uBase;
uniform sampler2D uSquid;
uniform sampler2D uMask;
uniform float uHasSquid;

void main() {
  float m = texture2D(uMask, vUv).a;

  vec4 base = texture2D(uBase, vUv);
  vec4 squidTex = texture2D(uSquid, vUv);

  /* Placeholder variant: ink-duotone of the base (textures arrive
     premultiplied, so un-premultiply before grading). */
  vec3 un = base.rgb / max(base.a, 0.001);
  float lum = dot(un, vec3(0.299, 0.587, 0.114));
  vec3 ink = mix(vec3(0.07, 0.05, 0.12), vec3(0.58, 0.50, 0.66), lum);
  vec4 placeholder = vec4(ink * base.a, base.a);

  vec4 squid = mix(placeholder, squidTex, uHasSquid);
  float blend = smoothstep(0.12, 0.7, m);
  gl_FragColor = mix(base, squid, blend);
}
`;

/* Choreography timing. Total must finish inside the 3s title tick. */
const IN_MS = 750;
const HOLD_MS = 1050;
const OUT_MS = 650;

export type RevealFx =
  | 'develop'
  | 'blinds'
  | 'scan'
  | 'layers'
  | 'forge'
  | 'hatch'
  | 'routes'
  | 'rings';

type Props = {
  baseSrc: string;
  variantSrc?: string;
  fx?: RevealFx;
  width: number;
  height: number;
  alt: string;
  className?: string;
};

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const outCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const outQuart = (t: number) => 1 - Math.pow(1 - t, 4);
const inQuart = (t: number) => t * t * t * t;

/* Deterministic PRNG so pattern layouts are stable frame-to-frame. */
const mulberry32 = (seed: number) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

/* An effect draws colored garnish (sparks, rings, glyphs) onto the overlay
   canvas each frame, in figure-pixel coordinates, on the same clock as the
   reveal painter. Instantiated fresh per reveal so particle state never
   leaks between titles. */
type EffectDraw = (
  ctx: CanvasRenderingContext2D,
  el: number,
  v: number,
  phase: 'in' | 'hold' | 'out',
  now: number,
  dt: number
) => void;

export default function SquidRevealFigure({
  baseSrc,
  variantSrc,
  fx,
  width,
  height,
  alt,
  className,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fxCanvasRef = useRef<HTMLCanvasElement | null>(null);
  /* The GL effect installs the real trigger; role ticks call it through this
     ref so a variant swap never rebuilds the GL context. */
  const playRef = useRef<(src: string | undefined, fx: RevealFx | undefined) => void>(
    () => {}
  );
  const latestRef = useRef<{ src?: string; fx?: RevealFx }>({ src: variantSrc, fx });

  useEffect(() => {
    latestRef.current = { src: variantSrc, fx };
    playRef.current(variantSrc, fx);
  }, [variantSrc, fx]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: true });
    if (!gl) return;

    let disposed = false;
    let raf = 0;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const quad = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );
    const aPos = gl.getAttribLocation(prog, 'aPos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const makeTexture = () => {
      const t = gl.createTexture()!;
      gl.bindTexture(gl.TEXTURE_2D, t);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      return t;
    };

    const baseTex = makeTexture();
    const squidTex = makeTexture();
    const maskTex = makeTexture();

    // 1x1 transparent placeholders so sampling is valid before images load
    for (const t of [baseTex, squidTex, maskTex]) {
      gl.bindTexture(gl.TEXTURE_2D, t);
      gl.texImage2D(
        gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
        new Uint8Array([0, 0, 0, 0])
      );
    }

    const uploadImage = (tex: WebGLTexture, img: HTMLImageElement) => {
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    };

    const uBase = gl.getUniformLocation(prog, 'uBase');
    const uSquid = gl.getUniformLocation(prog, 'uSquid');
    const uMask = gl.getUniformLocation(prog, 'uMask');
    const uHasSquid = gl.getUniformLocation(prog, 'uHasSquid');
    gl.uniform1i(uBase, 0);
    gl.uniform1i(uSquid, 1);
    gl.uniform1i(uMask, 2);
    gl.uniform1f(uHasSquid, 0);

    // Offscreen mask canvas the choreography paints into (figure aspect)
    const maskW = 128;
    const maskH = Math.round((maskW * height) / width);
    const maskCanvas = document.createElement('canvas');
    maskCanvas.width = maskW;
    maskCanvas.height = maskH;
    const mctx = maskCanvas.getContext('2d')!;

    let baseReady = false;
    const baseImg = new Image();
    baseImg.onload = () => {
      if (disposed) return;
      uploadImage(baseTex, baseImg);
      baseReady = true;
    };
    baseImg.src = baseSrc;

    /* Colored garnish layer: full-resolution 2D canvas over the GL canvas,
       sharing the figure's pixel coordinate space (width x height). */
    const fctx = fxCanvasRef.current?.getContext('2d') ?? null;
    const accentCss =
      getComputedStyle(document.documentElement)
        .getPropertyValue('--color-accent')
        .trim() || '#d9502f';
    const accentRgb = (() => {
      const m = /^#?([0-9a-f]{6})$/i.exec(accentCss);
      if (!m) return [217, 80, 47];
      const n = parseInt(m[1], 16);
      return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    })();

    /* ---------------- fx effects (colored overlay garnish) ------------- */

    const EFFECT_FACTORIES: Partial<Record<RevealFx, () => EffectDraw>> = {
      /* Broadcast rings pulse outward from the headset ear. Every third
         ring carries the accent color. */
      rings: () => {
        const born: number[] = [];
        let lastSpawn = -1e9;
        let count = 0;
        return (ctx, _el, v, phase, now) => {
          if (phase !== 'out' && now - lastSpawn > 340) {
            born.push(now);
            lastSpawn = now;
            count++;
          }
          const cx = width * 0.52;
          const cy = height * 0.24;
          const maxR = height * 0.32;
          for (let i = born.length - 1; i >= 0; i--) {
            const age = (now - born[i]) / 1500;
            if (age >= 1) {
              born.splice(i, 1);
              continue;
            }
            const r = outCubic(age) * maxR;
            const a = 0.85 * (1 - age) * v;
            const idx = count - born.length + i;
            /* Cream halo behind every ring keeps it legible on the dark
               backdrop panel; alternating accent rings carry the color. */
            ctx.strokeStyle = `rgba(240,234,222,${a * 0.9})`;
            ctx.lineWidth = 16;
            ctx.beginPath();
            ctx.arc(cx, cy, r, 0, Math.PI * 2);
            ctx.stroke();
            ctx.strokeStyle =
              idx % 2 === 0
                ? `rgba(${accentRgb[0]},${accentRgb[1]},${accentRgb[2]},${a})`
                : `rgba(46,40,34,${a})`;
            ctx.lineWidth = 7;
            ctx.beginPath();
            ctx.arc(cx, cy, r, 0, Math.PI * 2);
            ctx.stroke();
          }
        };
      },

      /* Forge embers burst up from below the frame, twinkling and cooling
         from bright orange to deep red as they die. */
      forge: () => {
        type P = {
          x: number; y: number; vx: number; vy: number;
          r: number; born: number; life: number; seed: number;
        };
        const ps: P[] = [];
        return (ctx, _el, v, phase, now, dt) => {
          /* Spawn around the waist: the hero crops/fades the bottom third
             of the canvas, so "the forge below" has to live mid-figure to
             ever be seen. */
          const spawns = phase === 'in' ? 5 : phase === 'hold' ? 2 : 0;
          for (let i = 0; i < spawns && ps.length < 90; i++) {
            ps.push({
              x: width * (0.18 + Math.random() * 0.64),
              y: height * (0.52 + Math.random() * 0.18),
              vx: (Math.random() - 0.5) * 0.9,
              vy: -(2.6 + Math.random() * 3.8),
              r: 7 + Math.random() * 9,
              born: now,
              life: 1300 + Math.random() * 1300,
              seed: Math.random() * 10,
            });
          }
          const k = dt / 16;
          for (let i = ps.length - 1; i >= 0; i--) {
            const p = ps[i];
            const age = (now - p.born) / p.life;
            if (age >= 1) {
              ps.splice(i, 1);
              continue;
            }
            p.x += (p.vx + 0.9 * Math.sin(now * 0.003 + p.seed)) * k;
            p.y += p.vy * k;
            const twinkle = 0.7 + 0.3 * Math.sin(now * 0.02 + p.seed * 7);
            const a = (1 - age) * twinkle * v;
            const rC = Math.round(255 - 70 * age);
            const gC = Math.round(160 - 95 * age);
            const bC = Math.round(74 - 42 * age);
            const rad = p.r * (1 - age * 0.5);
            // soft glow halo + hot core so embers read at display scale
            ctx.fillStyle = `rgba(${rC},${gC},${bC},${a * 0.35})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, rad * 2.2, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = `rgba(${rC},${gC},${bC},${a})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, rad, 0, Math.PI * 2);
            ctx.fill();
          }
        };
      },

      /* Campfire sparks drift up around the pioneer; look closely and
         they're tiny tokens. */
      develop: () => {
        type P = {
          x: number; y: number; vy: number; ch: string;
          size: number; born: number; life: number; seed: number;
        };
        const GLYPHS = ['0', '1', '{', '}', ';', 'λ', '</>', '&&', '=>'];
        const ps: P[] = [];
        return (ctx, _el, v, phase, now, dt) => {
          /* Spawn chest-height and drift past the head; the canvas bottom
             is cropped/faded by the hero layout. */
          const spawns = phase === 'in' ? 3 : phase === 'hold' ? 1 : 0;
          for (let i = 0; i < spawns && ps.length < 30; i++) {
            ps.push({
              x: width * (0.12 + Math.random() * 0.76),
              y: height * (0.38 + Math.random() * 0.28),
              vy: -(1.1 + Math.random() * 1.9),
              ch: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
              size: 34 + Math.random() * 22,
              born: now,
              life: 1700 + Math.random() * 1400,
              seed: Math.random() * 10,
            });
          }
          const k = dt / 16;
          for (let i = ps.length - 1; i >= 0; i--) {
            const p = ps[i];
            const age = (now - p.born) / p.life;
            if (age >= 1) {
              ps.splice(i, 1);
              continue;
            }
            p.y += p.vy * k;
            const sway = 16 * Math.sin(now * 0.0016 + p.seed * 3);
            const flick = 0.72 + 0.28 * Math.sin(now * 0.013 + p.seed * 5);
            const a = Math.sin(Math.PI * age) * flick * v;
            ctx.save();
            ctx.translate(p.x + sway, p.y);
            ctx.rotate(0.14 * Math.sin(now * 0.002 + p.seed));
            ctx.font = `600 ${p.size}px ui-monospace, monospace`;
            ctx.fillStyle = `rgba(222,158,74,${a})`;
            ctx.fillText(p.ch, 0, 0);
            ctx.restore();
          }
        };
      },
    };

    /* ---------------- fx painters ----------------
       Each paints the full mask for a visibility v in [0..1] (always
       clamped by the engine). Entrances run v 0->1, exits 1->0; `phase`
       lets a painter do an asymmetric exit. */

    const fill = (alpha: number) => {
      mctx.fillStyle = `rgba(255,255,255,${alpha})`;
      mctx.fillRect(0, 0, maskW, maskH);
    };

    /* Soft-edged blob */
    const blob = (x: number, y: number, r: number, alpha: number) => {
      if (r <= 0.5) return;
      const g = mctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, `rgba(255,255,255,${alpha})`);
      g.addColorStop(0.6, `rgba(255,255,255,${alpha * 0.85})`);
      g.addColorStop(1, 'rgba(255,255,255,0)');
      mctx.fillStyle = g;
      mctx.fillRect(x - r, y - r, r * 2, r * 2);
    };

    const developBlobs = (() => {
      const rand = mulberry32(1873);
      return Array.from({ length: 26 }, (_, i) => ({
        x: rand() * maskW,
        y: rand() * maskH,
        r: 16 + rand() * 34,
        at: (i / 26) * 0.65,
      }));
    })();

    const hatchStrokes = (() => {
      const rand = mulberry32(4127);
      return Array.from({ length: 44 }, (_, i) => ({
        x: rand() * maskW,
        y: rand() * maskH,
        len: 26 + rand() * 44,
        ang: -Math.PI / 4 + (rand() - 0.5) * 0.3,
        w: 8 + rand() * 8,
        at: (i / 44) * 0.7,
      }));
    })();

    const stackCols = (() => {
      const rand = mulberry32(9316);
      const order = Array.from({ length: 10 }, (_, i) => i).sort(() => rand() - 0.5);
      return order.map((slot, i) => ({ slot, at: (i / 10) * 0.55 }));
    })();

    const embers = (() => {
      const rand = mulberry32(552);
      return Array.from({ length: 12 }, () => ({
        x: rand() * maskW,
        speed: 0.02 + rand() * 0.03,
        phase: rand() * 1000,
        r: 1.5 + rand() * 2,
      }));
    })();

    const PAINTERS: Record<
      RevealFx,
      (v: number, phase: 'in' | 'out', now: number) => void
    > = {
      /* Tintype develop: soft chemical blotches bloom in; bleaches out
         with an exposure flicker. */
      develop: (v, phase, now) => {
        if (phase === 'out') {
          fill(v * (0.82 + 0.18 * Math.abs(Math.sin(now * 0.025))));
          return;
        }
        for (const b of developBlobs) {
          const local = outCubic(clamp01((v - b.at) / 0.35));
          if (local <= 0) continue;
          blob(b.x, b.y, b.r * (0.35 + 0.65 * local), 0.9 * local);
        }
        if (v > 0.8) fill(clamp01((v - 0.8) / 0.2) * 0.95);
      },

      /* Noir blinds: five slightly-tilted slats sweep in alternating
         directions behind feathered light edges. */
      blinds: (v) => {
        const S = 5;
        const tilt = -0.055;
        const L = maskW + maskH;
        mctx.save();
        mctx.translate(maskW / 2, maskH / 2);
        mctx.rotate(tilt);
        const slatH = (maskH * 1.3) / S;
        for (let i = 0; i < S; i++) {
          const p = outCubic(clamp01(v * 1.3 - i * 0.075));
          if (p <= 0) continue;
          const wSlat = L * p;
          const y = -maskH * 0.65 + i * slatH;
          const dir = i % 2 === 0;
          const x0 = dir ? -L / 2 : L / 2 - wSlat;
          const featherX = dir ? x0 + wSlat : x0;
          const g = mctx.createLinearGradient(
            featherX - (dir ? 26 : -26), 0, featherX, 0
          );
          g.addColorStop(0, 'rgba(255,255,255,0.95)');
          g.addColorStop(1, 'rgba(255,255,255,0)');
          mctx.fillStyle = 'rgba(255,255,255,0.95)';
          if (dir) {
            mctx.fillRect(x0, y, Math.max(0, wSlat - 26), slatH + 1);
            mctx.fillStyle = g;
            mctx.fillRect(featherX - 26, y, 26, slatH + 1);
          } else {
            mctx.fillRect(x0 + 26, y, Math.max(0, wSlat - 26), slatH + 1);
            mctx.fillStyle = g;
            mctx.fillRect(featherX, y, 26, slatH + 1);
          }
        }
        mctx.restore();
      },

      /* Screen redraw: soft top-down sweep with a feathered front. */
      scan: (v) => {
        const F = 22;
        const front = (maskH + F) * v;
        mctx.fillStyle = 'rgba(255,255,255,0.92)';
        mctx.fillRect(0, 0, maskW, Math.max(0, front - F));
        const g = mctx.createLinearGradient(0, front - F, 0, front);
        g.addColorStop(0, 'rgba(255,255,255,0.92)');
        g.addColorStop(1, 'rgba(255,255,255,0)');
        mctx.fillStyle = g;
        mctx.fillRect(0, Math.max(0, front - F), maskW, F);
      },

      /* Full-stack skyline: soft columns rise from the bottom in a
         shuffled stagger, like the stack assembling. */
      layers: (v) => {
        const colW = maskW / stackCols.length;
        for (const c of stackCols) {
          const local = outCubic(clamp01((v - c.at) / 0.45));
          if (local <= 0) continue;
          const hCol = maskH * local;
          const x = c.slot * colW;
          const top = maskH - hCol;
          mctx.fillStyle = 'rgba(255,255,255,0.93)';
          mctx.fillRect(x, top + 16, colW + 0.5, Math.max(0, hCol - 16));
          const g = mctx.createLinearGradient(0, top, 0, top + 16);
          g.addColorStop(0, 'rgba(255,255,255,0)');
          g.addColorStop(1, 'rgba(255,255,255,0.93)');
          mctx.fillStyle = g;
          mctx.fillRect(x, top, colW + 0.5, 16);
        }
      },

      /* Forge heat: ragged shimmering front floods bottom-up, embers
         drifting above it. */
      forge: (v, _phase, now) => {
        const front = (maskH + 40) * (1 - v) - 20;
        for (let x = 0; x < maskW; x += 3) {
          const edge =
            front +
            9 * Math.sin(x * 0.32 + now * 0.005) +
            6 * Math.sin(x * 0.11 - now * 0.003);
          const g = mctx.createLinearGradient(0, edge - 18, 0, edge + 6);
          g.addColorStop(0, 'rgba(255,255,255,0)');
          g.addColorStop(1, 'rgba(255,255,255,0.95)');
          mctx.fillStyle = g;
          mctx.fillRect(x, edge - 18, 3, 24);
          mctx.fillStyle = 'rgba(255,255,255,0.95)';
          mctx.fillRect(x, edge + 6, 3, Math.max(0, maskH - edge - 6));
        }
        if (v > 0.02 && v < 0.98) {
          for (const e of embers) {
            const y = front - 8 - ((now * e.speed + e.phase) % 46);
            if (y > 0) blob(e.x, y, e.r * 2.4, 0.45);
          }
        }
      },

      /* Patent sketch: hatch strokes accumulate like the drawing being
         shaded in, then a wash completes it. */
      hatch: (v) => {
        mctx.lineCap = 'round';
        for (const s of hatchStrokes) {
          const local = outCubic(clamp01((v - s.at) / 0.3));
          if (local <= 0) continue;
          const dx = Math.cos(s.ang) * s.len * local;
          const dy = Math.sin(s.ang) * s.len * local;
          mctx.strokeStyle = `rgba(255,255,255,${0.55 * local})`;
          mctx.lineWidth = s.w;
          mctx.beginPath();
          mctx.moveTo(s.x - dx / 2, s.y - dy / 2);
          mctx.lineTo(s.x + dx / 2, s.y + dy / 2);
          mctx.stroke();
        }
        if (v > 0.72) fill(clamp01((v - 0.72) / 0.28) * 0.95);
      },

      /* Playbook: a fat marker stroke draws itself along a zig-zag route,
         then a wash completes the reveal. */
      routes: (v) => {
        const pts = [
          [maskW * 0.1, maskH * 0.06],
          [maskW * 0.9, maskH * 0.24],
          [maskW * 0.1, maskH * 0.46],
          [maskW * 0.9, maskH * 0.66],
          [maskW * 0.1, maskH * 0.88],
          [maskW * 0.95, maskH * 1.02],
        ];
        let L = 0;
        for (let i = 1; i < pts.length; i++) {
          L += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
        }
        const drawn = clamp01(v / 0.85);
        mctx.save();
        mctx.lineCap = 'round';
        mctx.lineJoin = 'round';
        mctx.strokeStyle = 'rgba(255,255,255,0.92)';
        mctx.lineWidth = maskW * 0.5;
        mctx.setLineDash([L, L]);
        mctx.lineDashOffset = L * (1 - outCubic(drawn));
        mctx.beginPath();
        mctx.moveTo(pts[0][0], pts[0][1]);
        for (let i = 1; i < pts.length; i++) mctx.lineTo(pts[i][0], pts[i][1]);
        mctx.stroke();
        mctx.restore();
        if (v > 0.8) fill(clamp01((v - 0.8) / 0.2) * 0.95);
      },

      /* Broadcast: a feathered wavefront expands from the headset with
         soft trailing rings. */
      rings: (v, _phase, now) => {
        const cx = maskW * 0.47;
        const cy = maskH * 0.14;
        const maxR = Math.hypot(maskW, maskH * 0.92);
        const core = Math.max(0, maxR * v);
        if (core > 0.5) {
          const g = mctx.createRadialGradient(
            cx, cy, Math.max(0, core - 22), cx, cy, core + 6
          );
          g.addColorStop(0, 'rgba(255,255,255,0.95)');
          g.addColorStop(0.75, 'rgba(255,255,255,0.85)');
          g.addColorStop(1, 'rgba(255,255,255,0)');
          mctx.fillStyle = 'rgba(255,255,255,0.95)';
          mctx.beginPath();
          mctx.arc(cx, cy, Math.max(0, core - 22), 0, Math.PI * 2);
          mctx.fill();
          mctx.fillStyle = g;
          mctx.beginPath();
          mctx.arc(cx, cy, core + 6, 0, Math.PI * 2);
          mctx.fill();
        }
        for (let i = 1; i <= 3; i++) {
          const r = core + i * 16 + 3 * Math.sin(now * 0.008 + i * 2);
          if (r <= 0) continue;
          mctx.strokeStyle = `rgba(255,255,255,${0.4 / i})`;
          mctx.lineWidth = 7;
          mctx.beginPath();
          mctx.arc(cx, cy, r, 0, Math.PI * 2);
          mctx.stroke();
        }
      },
    };

    /* ---------------- engine ---------------- */

    let active: {
      painter: (typeof PAINTERS)[RevealFx];
      effect: EffectDraw | undefined;
      start: number;
    } | null = null;
    let lastNow = 0;

    const frame = (now: number) => {
      if (disposed) return;
      const dt = lastNow ? Math.min(now - lastNow, 64) : 16;
      lastNow = now;
      mctx.clearRect(0, 0, maskW, maskH);
      fctx?.clearRect(0, 0, width, height);

      if (active) {
        /* rAF timestamps can trail the performance.now() captured in
           start(), so elapsed must be clamped before easing. */
        const el = Math.max(0, now - active.start);
        try {
          if (el >= IN_MS + HOLD_MS + OUT_MS) {
            active = null; // cleared canvases this frame; park after drawing
          } else {
            let v: number;
            let phase: 'in' | 'hold' | 'out';
            if (el < IN_MS) {
              v = outQuart(clamp01(el / IN_MS));
              phase = 'in';
            } else if (el < IN_MS + HOLD_MS) {
              v = 1;
              phase = 'hold';
            } else {
              const x = clamp01((el - IN_MS - HOLD_MS) / OUT_MS);
              v = clamp01(1 - inQuart(x));
              phase = 'out';
            }
            active.painter(v, phase === 'out' ? 'out' : 'in', now);
            if (fctx && active.effect) active.effect(fctx, el, v, phase, now, dt);
          }
        } catch {
          // A painter/effect bug must never kill the loop; fall back to base.
          active = null;
          mctx.clearRect(0, 0, maskW, maskH);
          fctx?.clearRect(0, 0, width, height);
        }
      }

      gl.bindTexture(gl.TEXTURE_2D, maskTex);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, maskCanvas);

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, baseTex);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, squidTex);
      gl.activeTexture(gl.TEXTURE2);
      gl.bindTexture(gl.TEXTURE_2D, maskTex);

      if (baseReady) gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      if (active) raf = requestAnimationFrame(frame);
      else lastNow = 0;
    };

    const start = (fxName: RevealFx | undefined) => {
      active = {
        painter: PAINTERS[fxName ?? 'scan'] ?? PAINTERS.scan,
        effect: fxName ? EFFECT_FACTORIES[fxName]?.() : undefined,
        start: performance.now(),
      };
      // Always re-arm: never trust a stale loop to still be alive.
      cancelAnimationFrame(raf);
      lastNow = 0;
      raf = requestAnimationFrame(frame);
    };

    /* Loads the variant texture (if any) then plays that title's entrance.
       A token guards against a slow load landing after a newer tick. */
    let token = 0;
    playRef.current = (src, fxName) => {
      const mine = ++token;
      if (!src) {
        gl.uniform1f(uHasSquid, 0);
        start(fxName);
        return;
      }
      const img = new Image();
      img.onload = () => {
        if (disposed || mine !== token) return;
        uploadImage(squidTex, img);
        gl.uniform1f(uHasSquid, 1);
        start(fxName);
      };
      img.src = src;
    };
    playRef.current(latestRef.current.src, latestRef.current.fx);

    return () => {
      disposed = true;
      playRef.current = () => {};
      cancelAnimationFrame(raf);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [baseSrc, width, height]);

  return (
    <div className={className ? `relative ${className}` : 'relative'}>
      <img
        src={baseSrc}
        alt={alt}
        className="h-full w-auto max-w-none object-contain object-top"
      />
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        aria-hidden
        className="absolute inset-0 h-full w-full"
      />
      {/* Colored garnish (sparks, rings, glyphs) rides above the reveal. */}
      <canvas
        ref={fxCanvasRef}
        width={width}
        height={height}
        aria-hidden
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}
