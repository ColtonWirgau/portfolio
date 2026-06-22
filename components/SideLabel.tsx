'use client';

import { motion } from 'framer-motion';

/**
 * Sticky vertical label for section gutters.
 * 24px wide to match the header logo SVG width.
 * Place as a direct flex child of a section with padding: 0 24px.
 */

interface SideLabelProps {
  label: string;
  endLabel?: string;
  mirrorLabel?: boolean;
  side?: 'left' | 'right';
  delay?: number;
  /**
   * By default the label stretches to the full height of its (flex) section.
   * For sections whose visible content is centered and shorter than the
   * section (e.g. the full-screen hero), pass an explicit height so the line
   * matches the content instead of the section, plus align="center".
   */
  matchHeight?: string;
  align?: 'stretch' | 'center';
}

export function SideLabel({ label, endLabel, mirrorLabel, side = 'left', delay = 0.8, matchHeight, align = 'stretch' }: SideLabelProps) {
  return (
    <div
      className="hidden lg:flex"
      style={{
        flexDirection: 'column',
        alignItems: 'center',
        width: '24px',
        flexShrink: 0,
        alignSelf: align,
        height: matchHeight,
        marginRight: side === 'left' ? '20px' : '0',
        marginLeft: side === 'right' ? '20px' : '0',
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', flex: 1 }}
      >
        <span
          style={{
            fontSize: '10px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--color-muted)',
            whiteSpace: 'nowrap',
            writingMode: 'vertical-rl',
            transform: side === 'left' ? 'rotate(180deg)' : 'none',
          }}
        >
          {label}
        </span>
        <div style={{ flex: 1, width: '1px', background: 'var(--color-border)' }} />
      </motion.div>

      {endLabel && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.2 }}
          style={{ marginTop: '16px' }}
        >
          <span
            style={{
              fontSize: '10px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              color: 'var(--color-muted)',
              writingMode: 'vertical-rl',
              transform: side === 'left' ? 'rotate(180deg)' : 'none',
            }}
          >
            {endLabel}
          </span>
        </motion.div>
      )}

      {mirrorLabel && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.2 }}
          style={{ marginTop: '16px' }}
        >
          <span
            style={{
              fontSize: '10px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--color-muted)',
              whiteSpace: 'nowrap',
              writingMode: 'vertical-rl',
              transform: side === 'left' ? 'none' : 'rotate(180deg)',
            }}
          >
            {label}
          </span>
        </motion.div>
      )}
    </div>
  );
}
