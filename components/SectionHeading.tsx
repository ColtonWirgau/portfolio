'use client';

import type { ReactNode } from 'react';

interface SectionHeadingProps {
  /** Small uppercase label above the title */
  label?: string;
  /** Large heading text — can include <br /> */
  title: ReactNode;
  /** Optional subtitle below the title */
  subtitle?: ReactNode;
  /** Optional large watermark text behind the heading */
  watermark?: string;
  /** Center-align the heading */
  center?: boolean;
  /** Right-align the heading */
  right?: boolean;
}

export function SectionHeading({ label, title, subtitle, watermark, center, right }: SectionHeadingProps) {
  const align = center ? 'center' : right ? 'right' : undefined;
  return (
    <div style={{
      position: 'relative',
      marginBottom: '32px',
      overflow: 'visible',
      textAlign: align,
      display: (center || right) ? 'flex' : undefined,
      flexDirection: (center || right) ? 'column' : undefined,
      alignItems: center ? 'center' : right ? 'flex-end' : undefined,
    }}>
      {/* Watermark */}
      {watermark && (
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: '-0.15em',
            left: '-0.03em',
            fontSize: 'clamp(6rem, 12vw, 11rem)',
            fontWeight: 200,
            lineHeight: 1,
            letterSpacing: '-0.04em',
            color: 'var(--color-fg)',
            opacity: 0.04,
            pointerEvents: 'none',
            userSelect: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          {watermark}
        </div>
      )}

      {/* Label */}
      {label && (
        <div style={{
          fontSize: '10px',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--color-muted)',
          marginBottom: '12px',
        }}>
          {label}
        </div>
      )}

      {/* Title */}
      <h2 style={{
        position: 'relative',
        fontSize: 'clamp(4rem, 8vw, 7rem)',
        fontFamily: 'var(--font-display)',
        fontWeight: 400,
        lineHeight: 1.05,
        letterSpacing: '-0.1em',
        textTransform: 'uppercase',
        color: 'var(--color-accent)',
        WebkitTextStroke: '4px var(--color-accent)',
        paintOrder: 'stroke fill',
        transform: 'scaleX(0.85)',
        transformOrigin: (center ? 'center' : right ? 'right' : 'left'),
      }}>
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p style={{
          fontSize: '16px',
          fontFamily: 'var(--font-serif)',
          fontWeight: 400,
          color: 'var(--color-muted)',
          marginTop: '16px',
          lineHeight: 1.7,
          maxWidth: '520px',
          fontStyle: 'italic',
        }}>
          {subtitle}
        </p>
      )}

      {/* Accent line */}
      <div style={{
        width: '40px',
        height: '1px',
        background: 'var(--color-accent)',
        marginTop: '20px',
      }} />
    </div>
  );
}

/** Highlight a word/phrase in the subtitle with accent color + bold */
export function Em({ children }: { children: ReactNode }) {
  return (
    <span style={{
      color: 'var(--color-accent)',
      fontWeight: 600,
      fontStyle: 'italic',
    }}>
      {children}
    </span>
  );
}

/** Underlined word/phrase with accent underline */
export function Ul({ children }: { children: ReactNode }) {
  return (
    <span style={{
      borderBottom: '2px solid var(--color-accent)',
      paddingBottom: '1px',
      fontWeight: 500,
      fontStyle: 'normal',
      color: 'var(--color-fg)',
    }}>
      {children}
    </span>
  );
}
