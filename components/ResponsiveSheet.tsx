'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  Children,
  isValidElement,
  type ReactNode,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, X, ChevronDown } from 'lucide-react';

// ── Types ──

type SheetMode = 'modal' | 'sheet';

interface ResponsiveSheetContextValue {
  mode: SheetMode;
  navigate: (page: string) => void;
  goBack: () => void;
  currentPage: string;
  canGoBack: boolean;
}

export interface SheetPageProps {
  name: string;
  title?: string;
  children: ReactNode;
}

interface ResponsiveSheetProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  header?: ReactNode | ((context: ResponsiveSheetContextValue) => ReactNode);
  defaultPage?: string;
  maxWidth?: string;
  modalBreakpoint?: number;
  className?: string;
  panelClassName?: string;
  panelStyle?: React.CSSProperties;
  scrollBg?: string;
  sheetMaxHeight?: string;
}

// ── Context ──

const ResponsiveSheetContext = createContext<ResponsiveSheetContextValue | null>(null);

export function useResponsiveSheet() {
  const context = useContext(ResponsiveSheetContext);
  if (!context) throw new Error('useResponsiveSheet must be used within a ResponsiveSheet');
  return context;
}

// keep old name working
export const useSheet = useResponsiveSheet;

// ── SheetPage ──

export function SheetPage({ children }: SheetPageProps) {
  return <>{children}</>;
}

// ── Animation Variants ──

const pageVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
};

const pageTransition = { type: 'tween' as const, ease: 'easeInOut' as const, duration: 0.25 };

// ── SheetContent (shared between mobile & desktop) ──

function SheetContent({
  pages,
  currentPage,
  canGoBack,
  onBack,
  hasHeader,
}: {
  pages: { name: string; title?: string; content: ReactNode }[];
  currentPage: string;
  canGoBack: boolean;
  onBack: () => void;
  hasHeader?: boolean;
}) {
  const activePage = pages.find((p) => p.name === currentPage);
  const direction = currentPage === 'main' ? -1 : 1;

  const topPadding = !hasHeader ? 'pt-2' : '';

  return (
    <div className={`relative overflow-hidden ${topPadding}`}>
      {/* Back header */}
      <AnimatePresence>
        {canGoBack && activePage?.title && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{ padding: '20px 28px 16px' }}
            className="flex items-center gap-3"
          >
            <button
              onClick={onBack}
              className="-ml-2 flex items-center gap-1 rounded-md px-2 py-1 text-sm font-medium transition-colors"
              style={{ color: 'var(--color-muted)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-fg)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-muted)')}
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </button>
            <span style={{ color: 'var(--color-border)' }}>|</span>
            <span className="text-sm font-semibold tracking-wide uppercase" style={{ color: 'var(--color-fg)' }}>
              {activePage.title}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page content with slide animation */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentPage}
          custom={direction}
          variants={pageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={pageTransition}
        >
          {activePage?.content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ── ResponsiveSheet ──

export function ResponsiveSheet({
  open,
  onClose,
  children,
  header,
  defaultPage = 'main',
  maxWidth = 'max-w-2xl',
  modalBreakpoint = 768,
  className = '',
  panelClassName = '',
  panelStyle,
  scrollBg,
  sheetMaxHeight = '90dvh',
}: ResponsiveSheetProps) {
  const [mode, setMode] = useState<SheetMode>('sheet');
  const [currentPage, setCurrentPage] = useState(defaultPage);
  const [history, setHistory] = useState<string[]>([defaultPage]);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Drag state for mobile sheet
  const dragAreaRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number | null>(null);
  const touchStartTime = useRef<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Detect viewport mode
  useEffect(() => {
    const check = () => setMode(window.innerWidth >= modalBreakpoint ? 'modal' : 'sheet');
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [modalBreakpoint]);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      const scrollY = window.scrollY;
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';

      return () => {
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [open]);

  // Reset on open/close
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
    scrollContainerRef.current?.scrollTo(0, 0);
  }, [currentPage]);

  // Escape key to close
  useEffect(() => {
    if (!open) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, onClose]);

  // Navigation
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

  // Scroll indicator
  const checkScrollIndicator = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const hasMore = container.scrollHeight > container.clientHeight + 5;
    const atBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 20;
    setShowScrollIndicator(hasMore && !atBottom);
  }, []);

  useEffect(() => {
    if (!open) return;
    const container = scrollContainerRef.current;
    if (!container) return;

    checkScrollIndicator();
    const timeouts = [
      setTimeout(checkScrollIndicator, 50),
      setTimeout(checkScrollIndicator, 150),
      setTimeout(checkScrollIndicator, 300),
    ];

    container.addEventListener('scroll', checkScrollIndicator);
    window.addEventListener('resize', checkScrollIndicator);
    const ro = new ResizeObserver(checkScrollIndicator);
    ro.observe(container);
    if (container.firstElementChild) ro.observe(container.firstElementChild);

    return () => {
      timeouts.forEach(clearTimeout);
      container.removeEventListener('scroll', checkScrollIndicator);
      window.removeEventListener('resize', checkScrollIndicator);
      ro.disconnect();
    };
  }, [open, currentPage, checkScrollIndicator]);

  // Mobile drag-to-close
  useEffect(() => {
    if (!open) { setDragOffset(0); setIsDragging(false); }
  }, [open]);

  useEffect(() => {
    const dragArea = dragAreaRef.current;
    if (!dragArea || !open || mode !== 'sheet') return;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
      touchStartTime.current = Date.now();
      setIsDragging(true);
    };
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (touchStartY.current === null) return;
      const delta = e.touches[0].clientY - touchStartY.current;
      setDragOffset(Math.max(0, delta));
    };
    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartY.current === null || touchStartTime.current === null) {
        setIsDragging(false);
        return;
      }
      const delta = e.changedTouches[0].clientY - touchStartY.current;
      const dt = Date.now() - touchStartTime.current;
      const velocity = dt > 0 ? delta / dt : 0;
      if (delta > 100 || velocity > 0.5) {
        onClose();
      } else {
        setDragOffset(0);
      }
      touchStartY.current = null;
      touchStartTime.current = null;
      setIsDragging(false);
    };

    dragArea.addEventListener('touchstart', handleTouchStart, { passive: true });
    dragArea.addEventListener('touchmove', handleTouchMove, { passive: false });
    dragArea.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      dragArea.removeEventListener('touchstart', handleTouchStart);
      dragArea.removeEventListener('touchmove', handleTouchMove);
      dragArea.removeEventListener('touchend', handleTouchEnd);
    };
  }, [open, mode, onClose]);

  // Prevent scroll propagation at boundaries (iOS)
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !open || mode !== 'sheet') return;
    let startY = 0;
    const onTouchStart = (e: TouchEvent) => { startY = e.touches[0].clientY; };
    const onTouchMove = (e: TouchEvent) => {
      const delta = e.touches[0].clientY - startY;
      const { scrollTop, scrollHeight, clientHeight } = container;
      if ((scrollTop <= 0 && delta > 0) || (scrollTop + clientHeight >= scrollHeight - 1 && delta < 0)) {
        e.preventDefault();
      }
    };
    container.addEventListener('touchstart', onTouchStart, { passive: true });
    container.addEventListener('touchmove', onTouchMove, { passive: false });
    return () => {
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchmove', onTouchMove);
    };
  }, [open, mode]);

  // Extract SheetPage children
  const pages: { name: string; title?: string; content: ReactNode }[] = [];
  Children.forEach(children, (child) => {
    if (isValidElement(child) && child.type === SheetPage) {
      const { name, title, children: pageChildren } = child.props as SheetPageProps;
      pages.push({ name, title, content: pageChildren });
    }
  });

  // Context
  const contextValue: ResponsiveSheetContextValue = { mode, navigate, goBack, currentPage, canGoBack };

  const resolvedHeader = typeof header === 'function' ? header(contextValue) : header;

  const panelTransform = open ? `translateY(${dragOffset}px)` : 'translateY(100%)';

  // Scroll indicator element
  const scrollIndicator = (
    <AnimatePresence>
      {showScrollIndicator && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20"
          style={{
            background: `linear-gradient(to top, ${scrollBg || 'var(--color-bg)'} 0%, ${scrollBg || 'var(--color-bg)'} 30%, transparent 100%)`,
          }}
        >
          <div className="absolute inset-x-0 bottom-2 flex flex-col items-center gap-0.5" style={{ color: 'var(--color-muted)' }}>
            <span className="text-[10px] font-medium tracking-wider uppercase">Scroll for more</span>
            <motion.div animate={{ y: [0, 3, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
              <ChevronDown className="h-3 w-3" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // ── Sheet mode (mobile) ──
  if (mode === 'sheet') {
    return (
      <ResponsiveSheetContext.Provider value={contextValue}>
        <div
          className={`fixed inset-0 z-[60] transition-opacity duration-300 ${open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
        >
          {/* Backdrop */}
          <div
            className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
            style={{ touchAction: 'none' }}
            onClick={onClose}
          />

          {/* Panel */}
          <div
            className={`absolute inset-x-0 bottom-0 flex flex-col rounded-t-[2rem] bg-bg shadow-2xl ${isDragging ? '' : 'transition-transform duration-300 ease-out'} ${panelClassName}`}
            style={{ transform: panelTransform, maxHeight: sheetMaxHeight, overscrollBehavior: 'contain', ...panelStyle }}
          >
            {/* Drag area: handle + header */}
            <div
              ref={dragAreaRef}
              className="relative shrink-0 cursor-grab overflow-hidden rounded-t-[2rem]"
              style={{ touchAction: 'none' }}
            >
              {resolvedHeader}
              <div className="absolute inset-x-0 top-0 z-10 flex justify-center pt-3 pb-2">
                <div className="h-1.5 w-14 rounded-full bg-black/20" />
              </div>
            </div>

            {/* Scrollable content */}
            <div ref={scrollContainerRef} className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
              <SheetContent
                pages={pages}
                currentPage={currentPage}
                canGoBack={canGoBack}
                onBack={goBack}
                hasHeader={!!resolvedHeader}
              />
            </div>

            {scrollIndicator}
          </div>
        </div>
      </ResponsiveSheetContext.Provider>
    );
  }

  // ── Modal mode (desktop) ──
  return (
    <ResponsiveSheetContext.Provider value={contextValue}>
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
              className={`relative z-10 mx-4 flex max-h-[85vh] w-full flex-col overflow-hidden bg-bg shadow-2xl ${maxWidth} ${panelClassName} ${className}`}
              style={panelStyle}
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
                <X className="h-3.5 w-3.5" />
              </button>

              {/* Header */}
              {resolvedHeader && <div className="shrink-0">{resolvedHeader}</div>}

              {/* Scrollable content */}
              <div ref={scrollContainerRef} className="min-h-0 flex-1 overflow-y-auto">
                <SheetContent
                  pages={pages}
                  currentPage={currentPage}
                  canGoBack={canGoBack}
                  onBack={goBack}
                  hasHeader={!!resolvedHeader}
                />
              </div>

              {scrollIndicator}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </ResponsiveSheetContext.Provider>
  );
}
