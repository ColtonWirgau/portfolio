'use client';

import type { ReactNode } from 'react';

interface SectionHeadingProps {
  /** Small uppercase label above the title */
  label: string;
  /** Large heading text — can include <br /> */
  title: ReactNode;
  /** Optional subtitle below the title */
  subtitle?: string;
  /** Optional large watermark text behind the heading */
  watermark?: string;
}

export function SectionHeading({ label, title, subtitle, watermark }: SectionHeadingProps) {
  return (
    <div style={{ position: 'relative', marginBottom: '48px', overflow: 'visible' }}>
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
      <div style={{
        fontSize: '10px',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: 'var(--color-muted)',
        marginBottom: '12px',
      }}>
        {label}
      </div>

      {/* Title */}
      <h2 style={{
        position: 'relative',
        fontSize: 'clamp(2rem, 4vw, 3.25rem)',
        fontWeight: 200,
        lineHeight: 1.1,
        letterSpacing: '-0.02em',
        color: 'var(--color-fg)',
      }}>
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p style={{
          fontSize: '14px',
          fontWeight: 300,
          color: 'var(--color-muted)',
          marginTop: '12px',
          lineHeight: 1.6,
          maxWidth: '480px',
        }}>
          {subtitle}
        </p>
      )}

      {/* Accent line */}
      <div style={{
        width: '40px',
        height: '1px',
        background: 'var(--color-border)',
        marginTop: '20px',
      }} />
    </div>
  );
}
