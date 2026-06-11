import { useEffect, useRef, useState } from 'react';

/**
 * Floating bottom-right hint label that announces the current section's
 * interaction mode: scroll · drag · click · explore.
 * Reads `data-hint` from the nearest <section data-hint="…"> in viewport.
 */
const SectionHint = () => {
  const [hint, setHint] = useState('SCROLL');
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const detect = () => {
      const mid = window.innerHeight / 2;
      const candidates = document.querySelectorAll<HTMLElement>('section[data-hint]');
      let best: HTMLElement | null = null;
      let bestDist = Infinity;
      candidates.forEach((s) => {
        const r = s.getBoundingClientRect();
        const center = r.top + r.height / 2;
        const dist = Math.abs(center - mid);
        if (r.top < window.innerHeight && r.bottom > 0 && dist < bestDist) {
          bestDist = dist;
          best = s;
        }
      });
      if (best) {
        const next = (best as HTMLElement).getAttribute('data-hint') || 'SCROLL';
        setHint((cur) => (cur === next ? cur : next));
      }
    };

    detect();
    window.addEventListener('scroll', detect, { passive: true });
    window.addEventListener('resize', detect);
    return () => {
      window.removeEventListener('scroll', detect);
      window.removeEventListener('resize', detect);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="section-hint pointer-events-none fixed bottom-5 right-5 z-40 flex items-center gap-2 text-label-mono mix-blend-difference"
      style={{ filter: 'invert(1)' }}
    >
      <span className="opacity-70">↳</span>
      <span key={hint} className="section-hint-text">{hint}</span>
    </div>
  );
};

export default SectionHint;
