'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';

export interface LightboxShot {
  src: string;
  caption?: string;
}

// Full-screen viewer for a screenshot carousel. Rendered through a portal so
// the fixed overlay escapes any transformed ancestor (the sheets animate with
// transforms, which would otherwise re-anchor position: fixed).
// Mount inside <AnimatePresence> to get the exit fade.
export function ScreenshotLightbox({
  shots,
  index,
  onNavigate,
  onClose,
}: {
  shots: LightboxShot[];
  index: number;
  onNavigate: (index: number) => void;
  onClose: () => void;
}) {
  // Capture phase + stopPropagation: the sheets close themselves on a
  // document-level Escape listener, and Escape here should only close the
  // lightbox on top.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      } else if (e.key === 'ArrowRight' && index < shots.length - 1) {
        onNavigate(index + 1);
      } else if (e.key === 'ArrowLeft' && index > 0) {
        onNavigate(index - 1);
      }
    };
    document.addEventListener('keydown', onKey, true);
    return () => document.removeEventListener('keydown', onKey, true);
  }, [index, shots.length, onNavigate, onClose]);

  const shot = shots[index];

  const controlStyle = (enabled: boolean): React.CSSProperties => ({
    width: '38px',
    height: '38px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    border: '1px solid rgba(255,255,255,0.25)',
    borderRadius: '100px',
    background: 'rgba(255,255,255,0.06)',
    color: 'rgba(255,255,255,0.85)',
    cursor: enabled ? 'pointer' : 'default',
    opacity: enabled ? 1 : 0.3,
    transition: 'background 0.15s, opacity 0.2s',
    padding: 0,
  });

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Screenshot viewer"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9500,
        background: 'rgba(18, 16, 13, 0.95)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '56px clamp(16px, 7vw, 84px)',
        overscrollBehavior: 'contain',
      }}
    >
      <button
        type="button"
        aria-label="Close screenshot viewer"
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        style={{ ...controlStyle(true), position: 'absolute', top: '18px', right: '18px' }}
        onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.16)')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
      </button>

      {shots.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous screenshot"
            disabled={index === 0}
            onClick={(e) => { e.stopPropagation(); if (index > 0) onNavigate(index - 1); }}
            style={{ ...controlStyle(index > 0), position: 'absolute', left: 'clamp(10px, 2.5vw, 28px)', top: '50%', transform: 'translateY(-50%)' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.16)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <button
            type="button"
            aria-label="Next screenshot"
            disabled={index === shots.length - 1}
            onClick={(e) => { e.stopPropagation(); if (index < shots.length - 1) onNavigate(index + 1); }}
            style={{ ...controlStyle(index < shots.length - 1), position: 'absolute', right: 'clamp(10px, 2.5vw, 28px)', top: '50%', transform: 'translateY(-50%)' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.16)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </>
      )}

      {/* Keyed on src so switching shots crossfades in place */}
      <motion.img
        key={shot.src}
        src={shot.src}
        alt={shot.caption ?? ''}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
        style={{
          display: 'block',
          maxWidth: '100%',
          maxHeight: '76vh',
          width: 'auto',
          height: 'auto',
          boxShadow: '0 30px 90px rgba(0,0,0,0.6)',
        }}
      />

      <div onClick={(e) => e.stopPropagation()} style={{ textAlign: 'center', marginTop: '16px', maxWidth: '640px' }}>
        {shot.caption && (
          <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'rgba(255,255,255,0.75)' }}>
            {shot.caption}
          </p>
        )}
        {shots.length > 1 && (
          <p style={{ fontSize: '11px', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)', marginTop: '6px' }}>
            {index + 1} / {shots.length}
          </p>
        )}
      </div>
    </motion.div>,
    document.body
  );
}
