import type { CSSProperties } from 'react';

/**
 * The site's squid-ink burst: a flat cluster of overlapping circles.
 * Same art as the Personal Projects "Back" squirt on the home page;
 * also used for the /squid click-splats and the footer's dive transition.
 */
export function InkBurst({
  width = 140,
  fill = 'var(--color-fg)',
  style,
}: {
  width?: number;
  fill?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      width={width}
      height={width * (96 / 140)}
      viewBox="0 0 140 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <g fill={fill}>
        <circle cx="68" cy="48" r="28" />
        <circle cx="40" cy="36" r="17" />
        <circle cx="94" cy="40" r="20" />
        <circle cx="54" cy="70" r="15" />
        <circle cx="92" cy="68" r="14" />
        <circle cx="20" cy="52" r="8" />
        <circle cx="118" cy="54" r="7" />
        <circle cx="74" cy="16" r="7" />
        <circle cx="108" cy="78" r="6" />
        <circle cx="30" cy="74" r="5" />
      </g>
    </svg>
  );
}
