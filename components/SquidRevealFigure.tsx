'use client';

import { useEffect, useRef } from 'react';

/* Mouse-trail reveal for the hero figure. Swirling the cursor over the
   portrait paints a soft mask that blends it into an aligned squid variant,
   then the trail fades and he returns to normal. Until a real squid image is
   supplied, the shader fakes one: an ink-duotone, tentacle-wobbled version of
   the base portrait, so the trail feel can be tuned before the art exists.

   Falls back to the plain <img> (which always renders underneath) when WebGL
   is unavailable or the user prefers reduced motion. */

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

  /* Placeholder squid: ink-duotone of the base (textures arrive
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

/* Trail feel knobs */
const TRAIL_DECAY = 0.05; // per-frame fade of the mask (higher = returns faster)
const BLOB_RADIUS = 26; // base brush radius in mask pixels
const BLOB_SPEED_BOOST = 90; // extra radius from fast swirling
const IDLE_STOP_MS = 1800; // stop the render loop this long after the last move
const PULSE_MS = 1600; // how long the full-reveal pulse takes to flood the figure
const PULSE_HOLD_MS = 0; // extra dwell at full squid before the wipe starts
const PULSE_OUT_MS = 1200; // how long the bottom-up wipe back to human takes

type Props = {
  baseSrc: string;
  squidSrc?: string;
  width: number;
  height: number;
  alt: string;
  className?: string;
};

export default function SquidRevealFigure({
  baseSrc,
  squidSrc,
  width,
  height,
  alt,
  className,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: true });
    if (!gl) return;

    let disposed = false;
    let raf = 0;
    let running = false;
    let lastMove = 0;
    let hasPointer = false;
    // rFrac caps the reveal radius if the pulse was click-closed mid-flood
    let pulse: { x: number; y: number; start: number; rFrac?: number } | null =
      null;
    const pointer = { x: 0.5, y: 0.5, px: 0.5, py: 0.5 };

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

    // Offscreen mask canvas the pointer paints into (same aspect as figure)
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

    if (squidSrc) {
      const squidImg = new Image();
      squidImg.onload = () => {
        if (disposed) return;
        uploadImage(squidTex, squidImg);
        gl.uniform1f(uHasSquid, 1);
      };
      squidImg.src = squidSrc;
    }

    const paint = () => {
      // fade the whole trail, then stamp new blobs along the pointer segment
      mctx.globalCompositeOperation = 'destination-out';
      mctx.fillStyle = `rgba(0,0,0,${TRAIL_DECAY})`;
      mctx.fillRect(0, 0, maskW, maskH);

      /* Full-reveal pulse: a soft-edged disc slowly floods the mask from its
         origin (ease-in-out radius, long feathered front), holds, then eases
         back down by stamping at a falling alpha so the per-frame decay can
         gently win. */
      if (pulse) {
        const elapsed = performance.now() - pulse.start;
        lastMove = performance.now(); // keep the loop alive through the pulse
        if (elapsed >= PULSE_MS + PULSE_HOLD_MS + PULSE_OUT_MS) {
          pulse = null;
        } else {
          const px = pulse.x * maskW;
          const py = pulse.y * maskH;
          const maxR = Math.hypot(
            Math.max(px, maskW - px),
            Math.max(py, maskH - py)
          );
          let r = (pulse.rFrac ?? 1) * maxR;
          if (elapsed < PULSE_MS) {
            // ease-out: the flood starts moving instantly, then glides to a stop
            const easeOut = 1 - Math.pow(1 - elapsed / PULSE_MS, 3);
            r = Math.max(easeOut * maxR, 8);
          }
          // gentle per-frame stamp (builds over ~10 frames); also holds the
          // reveal solid ahead of the exit wipe
          mctx.globalCompositeOperation = 'source-over';
          const g = mctx.createRadialGradient(px, py, 0, px, py, r);
          g.addColorStop(0, 'rgba(255,255,255,0.6)');
          g.addColorStop(0.35, 'rgba(255,255,255,0.6)');
          g.addColorStop(1, 'rgba(255,255,255,0)');
          mctx.fillStyle = g;
          mctx.fillRect(px - r, py - r, r * 2, r * 2);

          if (elapsed > PULSE_MS + PULSE_HOLD_MS) {
            /* Exit: a soft-edged front rises from the bottom, wiping the
               squid away and bringing him back as it climbs. Ease-out so it
               gets moving right away instead of dwelling at the (already
               page-faded) bottom of the figure. */
            const kRaw = Math.min(
              (elapsed - PULSE_MS - PULSE_HOLD_MS) / PULSE_OUT_MS,
              1
            );
            const k = 1 - Math.pow(1 - kRaw, 4);
            const feather = maskH * 0.12;
            const front = maskH + feather - k * (maskH + 2 * feather);
            const wipe = mctx.createLinearGradient(0, front - feather, 0, front);
            wipe.addColorStop(0, 'rgba(0,0,0,0)');
            wipe.addColorStop(1, 'rgba(0,0,0,1)');
            mctx.globalCompositeOperation = 'destination-out';
            mctx.fillStyle = wipe;
            mctx.fillRect(0, front - feather, maskW, maskH - front + feather);
          }
        }
      }

      if (!hasPointer) return;
      const dx = pointer.x - pointer.px;
      const dy = pointer.y - pointer.py;
      const speed = Math.hypot(dx, dy);
      if (speed < 0.0005) return;

      const radius = Math.min(BLOB_RADIUS + speed * BLOB_SPEED_BOOST, 64);
      const steps = Math.max(1, Math.ceil((speed * maskW) / (radius * 0.4)));
      mctx.globalCompositeOperation = 'source-over';
      for (let i = 1; i <= steps; i++) {
        const x = (pointer.px + (dx * i) / steps) * maskW;
        const y = (pointer.py + (dy * i) / steps) * maskH;
        const g = mctx.createRadialGradient(x, y, 0, x, y, radius);
        g.addColorStop(0, 'rgba(255,255,255,0.5)');
        g.addColorStop(1, 'rgba(255,255,255,0)');
        mctx.fillStyle = g;
        mctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
      }
      pointer.px = pointer.x;
      pointer.py = pointer.y;
    };

    const frame = (now: number) => {
      if (disposed) return;
      if (now - lastMove > IDLE_STOP_MS) {
        // trail has fully faded; park the loop until the pointer moves again
        running = false;
        return;
      }
      paint();

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
      raf = requestAnimationFrame(frame);
    };

    const wake = () => {
      lastMove = performance.now();
      if (!running) {
        running = true;
        raf = requestAnimationFrame(frame);
      }
    };

    const startPulse = (x: number, y: number) => {
      pulse = { x, y, start: performance.now() };
      wake();
    };

    /* The figure's ancestors are pointer-events-none, so track globally and
       map into the canvas rect ourselves. */
    const toLocal = (e: { clientX: number; clientY: number }) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };
    const inside = (p: { x: number; y: number }) =>
      p.x > -0.05 && p.x < 1.05 && p.y > -0.05 && p.y < 1.05;

    const onMove = (e: PointerEvent) => {
      const p = toLocal(e);
      if (!inside(p)) {
        hasPointer = false;
        return;
      }
      if (!hasPointer) {
        pointer.px = p.x;
        pointer.py = p.y;
        hasPointer = true;
      }
      pointer.x = p.x;
      pointer.y = p.y;
      wake();
    };
    const onClick = (e: MouseEvent) => {
      const p = toLocal(e);
      if (!inside(p)) return;
      const now = performance.now();
      const openPhase = PULSE_MS + PULSE_HOLD_MS;
      if (pulse && now - pulse.start < openPhase) {
        // squid is opening or open: jump straight to the wipe, capping the
        // reveal at however far the flood actually got
        const elapsed = now - pulse.start;
        if (elapsed < PULSE_MS) {
          pulse.rFrac = 1 - Math.pow(1 - elapsed / PULSE_MS, 3);
        }
        pulse.start = now - openPhase;
        wake();
      } else {
        startPulse(p.x, p.y);
      }
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('click', onClick, { passive: true });

    return () => {
      disposed = true;
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('click', onClick);
      cancelAnimationFrame(raf);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [baseSrc, squidSrc, width, height]);

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
    </div>
  );
}
