import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Magnetic from '../Animations/Magnetic';

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const { pathname } = useLocation();

  const items = useMemo(
    () => [
      { label: 'HOME', to: '/', meta: '01', tag: 'Index' },
      { label: 'WORKS', to: '/works', meta: '02', tag: 'Case studies' },
      { label: 'ABOUT', to: '/about', meta: '03', tag: 'Story & stack' },
      { label: 'CONTACT', to: '/contact', meta: '04', tag: 'Let’s talk' },
    ],
    []
  );

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while menu is open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-20 flex justify-between items-center px-4 md:px-8 bg-[var(--color-butter)] text-[var(--color-jet)] brutal-border-b">
        <div className="flex items-center gap-3 md:gap-4">
          <button
            type="button"
            onClick={() => setOpen((s) => !s)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid h-10 w-10 place-items-center border-[3px] border-[var(--color-jet)] hover:bg-[var(--color-jet)] hover:text-[var(--color-butter)] transition-colors relative z-[60]"
            data-cursor="view"
            data-cursor-label={open ? 'CLOSE' : 'MENU'}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
          <Link
            to="/"
            className="font-headline italic text-xl md:text-2xl tracking-tighter relative z-[60]"
            data-cursor="view"
            data-cursor-label="HOME"
          >
            YASH_PATKAR
          </Link>
        </div>

        <nav className="hidden md:flex gap-2 items-center">
          {items.map((item) => {
            const isActive = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                data-cursor="view"
                data-cursor-label="GO"
                className={`font-headline font-bold uppercase px-3 py-1 transition-colors duration-100 hover:bg-[var(--color-jet)] hover:text-[var(--color-butter)] ${
                  isActive ? 'underline decoration-4 underline-offset-4 font-black' : ''
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Magnetic strength={0.3}>
          <Link
            to="/contact"
            className="brutal-btn !py-2 !px-4 md:!px-6 text-xs md:text-sm relative z-[60]"
            data-cursor="view"
            data-cursor-label="HIRE"
            data-magnetic
          >
            HIRE_ME
          </Link>
        </Magnetic>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-[var(--color-jet)] text-[var(--color-butter)] overflow-y-auto overflow-x-hidden custom-scroll"
          >
            {/* Grid backdrop */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage:
                  'linear-gradient(var(--color-butter) 1px, transparent 1px), linear-gradient(90deg, var(--color-butter) 1px, transparent 1px)',
                backgroundSize: '64px 64px',
              }}
            />

            {/* Inner column — always tall enough to scroll if needed */}
            <div className="relative z-10 min-h-screen flex flex-col">
            {/* Top meta row */}
            <div className="flex items-center justify-between px-4 md:px-8 pt-24 md:pt-28 text-label-mono opacity-80">
              <span>/ MENU · 04 ROUTES</span>
              <span className="hidden md:inline">PRESS ESC OR ☰ TO CLOSE</span>
            </div>

            {/* Center: big nav list */}
            <nav
              className="flex-1 flex flex-col justify-center px-4 md:px-8 py-10"
              onMouseLeave={() => setHovered(null)}
            >
              <ul>
                {items.map((item, i) => {
                  const isActive = pathname === item.to;
                  const isHover = hovered === i;
                  const dim = hovered !== null && !isHover;
                  return (
                    <motion.li
                      key={item.to}
                      initial={{ y: 80, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 40, opacity: 0 }}
                      transition={{
                        duration: 0.6,
                        delay: 0.15 + i * 0.07,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      onMouseEnter={() => setHovered(i)}
                      className="border-b border-[var(--color-butter)]/30"
                    >
                      <Link
                        to={item.to}
                        onClick={() => setOpen(false)}
                        data-cursor="view"
                        data-cursor-label={item.label}
                        className="group relative flex items-baseline gap-6 md:gap-10 py-4 md:py-6"
                        style={{
                          opacity: dim ? 0.35 : 1,
                          transition: 'opacity 320ms ease',
                        }}
                      >
                        <span className="text-label-mono opacity-60 w-10 md:w-14 shrink-0">
                          {item.meta}
                        </span>

                        <span
                          className="font-display leading-[0.85] text-[clamp(56px,13vw,200px)] tracking-tight"
                          style={{
                            transform: isHover ? 'translateX(28px)' : 'translateX(0)',
                            color: isHover ? 'var(--color-paper)' : 'var(--color-butter)',
                            transition: 'transform 380ms cubic-bezier(0.16,1,0.3,1), color 280ms ease',
                          }}
                        >
                          {item.label}
                          {isActive && (
                            <sup className="ml-3 text-xs align-super font-mono">●</sup>
                          )}
                        </span>

                        <span
                          className="hidden md:inline-block ml-auto text-label-mono opacity-70 italic"
                          style={{
                            transform: isHover ? 'translateX(-12px)' : 'translateX(0)',
                            opacity: isHover ? 1 : 0.5,
                            transition: 'all 320ms ease',
                          }}
                        >
                          ↗ {item.tag}
                        </span>
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            {/* Bottom: socials + meta */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="px-4 md:px-8 pb-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 border-t border-[var(--color-butter)]/30 pt-6 text-label-mono"
            >
              <div className="flex flex-col gap-1">
                <span className="opacity-60">/ ELSEWHERE</span>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                  <a
                    href="https://github.com/yashpatkar"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="view"
                    data-cursor-label="GH"
                    className="hover:text-[var(--color-paper)] transition-colors"
                  >
                    GITHUB ↗
                  </a>
                  <a
                    href="https://www.linkedin.com/in/yash-patkar"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="view"
                    data-cursor-label="IN"
                    className="hover:text-[var(--color-paper)] transition-colors"
                  >
                    LINKEDIN ↗
                  </a>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span className="opacity-60">/ BASED IN</span>
                <span>MUMBAI, IN · UTC+5:30</span>
              </div>

              <div className="flex flex-col gap-1 md:items-end">
                <span className="opacity-60">/ EMAIL</span>
                <a
                  href="mailto:yash.patkar2004@gmail.com"
                  data-cursor="view"
                  data-cursor-label="@"
                  className="hover:text-[var(--color-paper)] transition-colors"
                >
                  YASH.PATKAR2004@GMAIL.COM
                </a>
              </div>
            </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
