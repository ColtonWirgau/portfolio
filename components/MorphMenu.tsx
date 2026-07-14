'use client';

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';

// A single glass surface that MORPHS between the trigger and the menu: closed
// it's a small circle showing the trigger icon; opening grows that same element
// into the menu panel (icon parks in the corner, items reveal inside). One
// element, iOS-style. Ported from Church Hub's @church/nextjs-ui MorphMenu,
// re-styled with inline styles + the portfolio's dark header glass.

const SPRING = 'cubic-bezier(0.34, 1.56, 0.64, 1)';

interface MorphMenuContextValue {
  close: () => void;
}
const MorphMenuContext = createContext<MorphMenuContextValue | null>(null);

/** Prevents the click that follows an outside dismiss press from acting on
 *  whatever sat under the cursor (e.g. the sheet backdrop). */
function swallowNextClick() {
  const onClick = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };
  document.addEventListener('click', onClick, { capture: true, once: true });
}

export interface MorphMenuProps {
  /** Trigger icon; receives the open state so it can swirl (dots ↔ X). */
  trigger: (open: boolean) => ReactNode;
  children: ReactNode;
  /** Small label shown in the panel's header row (reveals on open). */
  header?: ReactNode;
  /** Diameter of the closed circle, in px. */
  triggerSize?: number;
  label?: string;
  /** Which edge the surface anchors to as it morphs. 'end' (default) grows
   *  from the top-right (a right-aligned kebab); 'start' from the top-left. */
  align?: 'start' | 'end';
}

export function MorphMenu({
  trigger,
  children,
  header,
  triggerSize = 34,
  label,
  align = 'end',
}: MorphMenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);

  // Measure the content's natural (open) size so width/height can transition
  // from the circle to the full panel.
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const measure = () => setSize({ w: el.offsetWidth, h: el.offsetHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Dismiss on outside pointer + Escape. Escape is caught in the capture phase
  // and stopped so it closes the menu before the sheet beneath it reacts.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
        swallowNextClick();
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        setOpen(false);
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown, true);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown, true);
    };
  }, [open]);

  const edge = align === 'start' ? { left: 0 } : { right: 0 };
  const dims =
    open && size ? { width: size.w, height: size.h } : { width: triggerSize, height: triggerSize };
  const revealed: React.CSSProperties = {
    opacity: open ? 1 : 0,
    transition: 'opacity 0.2s ease',
    transitionDelay: open ? '0.1s' : '0s',
  };

  return (
    <div
      ref={rootRef}
      style={{ position: 'relative', display: 'inline-block', width: triggerSize, height: triggerSize }}
    >
      {/* The single morphing surface — circle when closed, panel when open. */}
      <div
        role="menu"
        data-state={open ? 'open' : 'closed'}
        style={{
          position: 'absolute',
          top: 0,
          ...edge,
          zIndex: 50,
          overflow: 'hidden',
          ...dims,
          background: 'rgba(24, 22, 20, 0.72)',
          color: '#fff',
          border: '1px solid rgba(255,255,255,0.12)',
          boxShadow: '0 16px 44px rgba(0,0,0,0.42)',
          backdropFilter: 'blur(24px) saturate(1.5)',
          WebkitBackdropFilter: 'blur(24px) saturate(1.5)',
          borderRadius: open ? '14px' : '999px',
          transition: `width 0.3s ${SPRING}, height 0.3s ${SPRING}, border-radius 0.3s ${SPRING}`,
        }}
      >
        {/* Natural-size content, anchored to the same edge so the closed circle
            frames the icon in that corner. */}
        <div ref={contentRef} style={{ position: 'absolute', top: 0, ...edge, width: 'max-content' }}>
          {/* Header row: title (reveals on open) + the trigger/close icon. */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '24px',
              flexDirection: align === 'start' ? 'row-reverse' : 'row',
            }}
          >
            <span
              style={{
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                color: 'rgba(255,255,255,0.5)',
                padding: align === 'start' ? '0 12px 0 0' : '0 0 0 12px',
                ...revealed,
              }}
            >
              {header}
            </span>
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={open}
              aria-label={label}
              onClick={() => setOpen((o) => !o)}
              style={{
                width: triggerSize,
                height: triggerSize,
                display: 'grid',
                placeItems: 'center',
                flexShrink: 0,
                color: 'rgba(255,255,255,0.78)',
                transition: 'color 0.15s',
              }}
            >
              {trigger(open)}
            </button>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', ...revealed }} />

          <MorphMenuContext.Provider value={{ close: () => setOpen(false) }}>
            <div
              style={{
                minWidth: '11rem',
                paddingBottom: '4px',
                pointerEvents: open ? 'auto' : 'none',
                ...revealed,
              }}
            >
              {children}
            </div>
          </MorphMenuContext.Provider>
        </div>
      </div>
    </div>
  );
}

export interface MorphMenuItemProps {
  icon?: ReactNode;
  children: ReactNode;
  /** Renders the row as a link. */
  href?: string;
  /** Open in a new tab (for external links / inline PDF view). */
  external?: boolean;
  /** Force a file download. */
  download?: boolean;
  onSelect?: () => void;
}

export function MorphMenuItem({
  icon,
  children,
  href,
  external,
  download,
  onSelect,
}: MorphMenuItemProps) {
  const ctx = useContext(MorphMenuContext);
  const base: React.CSSProperties = {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    gap: '10px',
    padding: '9px 14px',
    fontSize: '13.5px',
    fontWeight: 500,
    color: '#fff',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'background 0.12s',
  };
  const handlers = {
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) =>
      (e.currentTarget.style.background = 'rgba(255,255,255,0.1)'),
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) =>
      (e.currentTarget.style.background = 'transparent'),
    onClick: () => {
      onSelect?.();
      ctx?.close();
    },
  };
  const inner = (
    <>
      {icon && <span style={{ display: 'flex', color: 'rgba(255,255,255,0.62)' }}>{icon}</span>}
      {children}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        role="menuitem"
        style={base}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...(download ? { download: '', target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...handlers}
      >
        {inner}
      </a>
    );
  }
  return (
    <button type="button" role="menuitem" style={base} {...handlers}>
      {inner}
    </button>
  );
}
