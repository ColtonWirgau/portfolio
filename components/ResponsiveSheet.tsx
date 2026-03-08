'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  type ReactNode,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Types ──

type SheetMode = 'modal' | 'sheet';

interface ResponsiveSheetContextValue {
  mode: SheetMode;
  close: () => void;
  navigate: (page: string) => void;
  goBack: () => void;
  currentPage: string;
  canGoBack: boolean;
}

interface ResponsiveSheetProps {
  open: boolean;
  onClose: () => void;
  /** Map of page name → { header, content } */
  pages: Record<string, { header?: ReactNode; content: ReactNode }>;
  /** Which page to open to (default: 'main') */
  defaultPage?: string;
  maxWidth?: string;
}

// ── Context ──

const SheetContext = createContext<ResponsiveSheetContextValue | null>(null);

export function useSheet() {
  const ctx = useContext(SheetContext);
  if (!ctx) throw new Error('useSheet must be inside ResponsiveSheet');
  return ctx;
}

// ── Page transition variants ──

const pageVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
};

// ── Component ──

export function ResponsiveSheet({
  open,
  onClose,
  pages,
  defaultPage = 'main',
  maxWidth = 'max-w-2xl',
}: ResponsiveSheetProps) {
  const [mode, setMode] = useState<SheetMode>('sheet');
  const [currentPage, setCurrentPage] = useState(defaultPage);
  const [history, setHistory] = useState<string[]>([defaultPage]);
  const [dragging, setDragging] = useState(false);
  const startY = useRef(0);
  const currentY = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setMode(window.innerWidth >= 768 ? 'modal' : 'sheet');
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [open]);

  // Reset on open/close or defaultPage change
  useEffect(() => {
    if (open) {
      setCurrentPage(defaultPage);
      setHistory(defaultPage === 'main' ? ['main'] : ['main', defaultPage]);
    } else {
      setCurrentPage(defaultPage);
      setHistory([defaultPage]);
    }
  }, [open, defaultPage]);

  // Scroll to top on page change
  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0);
  }, [currentPage]);

  const navigate = useCallback((page: string) => {
    setHistory((prev) => [...prev, page]);
    setCurrentPage(page);
  }, []);

  const goBack = useCallback(() => {
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      setHistory(newHistory);
      setCurrentPage(newHistory[newHistory.length - 1]);
    }
  }, [history]);

  const canGoBack = history.length > 1;
  const direction = canGoBack ? 1 : -1;
  const activePage = pages[currentPage];

  const ctx: ResponsiveSheetContextValue = {
    mode,
    close: onClose,
    navigate,
    goBack,
    currentPage,
    canGoBack,
  };

  // ── Back bar ──
  const backBar = canGoBack && (
    <button
      onClick={goBack}
      style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '14px 28px', fontSize: '12px', letterSpacing: '0.05em', color: 'var(--color-muted)', transition: 'color 0.15s' }}
      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-fg)')}
      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-muted)')}
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <path d="M15 18l-6-6 6-6" />
      </svg>
      Back
    </button>
  );

  // ── Animated content ──
  const animatedContent = (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={currentPage}
        custom={direction}
        variants={pageVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ type: 'tween', ease: 'easeInOut', duration: 0.2 }}
      >
        {activePage?.content}
      </motion.div>
    </AnimatePresence>
  );

  // ── Bottom sheet (mobile) ──
  if (mode === 'sheet') {
    return (
      <SheetContext.Provider value={ctx}>
        <AnimatePresence>
          {open && (
            <div className="fixed inset-0 z-50">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/30"
                onClick={onClose}
              />
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="absolute bottom-0 left-0 right-0 max-h-[85dvh] flex flex-col bg-bg rounded-t-2xl overflow-hidden"
              >
                {/* Drag handle */}
                <div
                  className="flex justify-center pt-3 pb-1 cursor-grab active:cursor-grabbing shrink-0"
                  onPointerDown={(e) => {
                    setDragging(true);
                    startY.current = e.clientY;
                    currentY.current = 0;
                    (e.target as HTMLElement).setPointerCapture(e.pointerId);
                  }}
                  onPointerMove={(e) => {
                    if (!dragging) return;
                    currentY.current = e.clientY - startY.current;
                    const el = e.currentTarget.parentElement;
                    if (el && currentY.current > 0) {
                      el.style.transform = `translateY(${currentY.current}px)`;
                    }
                  }}
                  onPointerUp={(e) => {
                    setDragging(false);
                    const el = e.currentTarget.parentElement;
                    if (el) el.style.transform = '';
                    if (currentY.current > 100) onClose();
                  }}
                >
                  <div className="w-10 h-1 rounded-full bg-border" />
                </div>

                {/* Header */}
                {activePage?.header && <div className="shrink-0">{activePage.header}</div>}

                {/* Content */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto min-h-0">
                  {backBar}
                  {animatedContent}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </SheetContext.Provider>
    );
  }

  // ── Modal (desktop) ──
  return (
    <SheetContext.Provider value={ctx}>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/20"
              onClick={onClose}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className={`relative z-10 mx-4 flex max-h-[85vh] w-full flex-col overflow-hidden rounded-xl bg-bg shadow-2xl ${maxWidth}`}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute z-20"
                style={{
                  top: '16px',
                  right: '16px',
                  padding: '8px',
                  borderRadius: '50%',
                  background: 'rgba(0,0,0,0.3)',
                  color: 'rgba(255,255,255,0.8)',
                  backdropFilter: 'blur(8px)',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.5)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.3)')}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              {/* Header */}
              {activePage?.header && <div className="shrink-0">{activePage.header}</div>}

              {/* Content */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto min-h-0">
                {backBar}
                {animatedContent}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </SheetContext.Provider>
  );
}
