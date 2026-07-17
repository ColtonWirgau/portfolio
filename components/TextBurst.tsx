import type { CSSProperties } from 'react';

/**
 * A soft, feathered light burst that sits *behind* hero copy to lift its
 * legibility where the text crosses the photo (his arm / shirt shadows).
 * Two overlapping radial glows keep the edge organic rather than a perfect
 * circle, and a heavy blur guarantees there's no hard box. Purely
 * decorative: it lightens the area under the text without reading as a
 * card. Position it with `style` (inset / zIndex) from the caller.
 */
export function TextBurst({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      aria-hidden
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        background: [
          'radial-gradient(58% 64% at 30% 44%, rgba(240,237,229,0.80), rgba(240,237,229,0.42) 48%, transparent 75%)',
          'radial-gradient(48% 56% at 64% 60%, rgba(240,237,229,0.58), transparent 72%)',
        ].join(', '),
        filter: 'blur(18px)',
        ...style,
      }}
    />
  );
}
