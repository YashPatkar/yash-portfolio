import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const SiteCursor = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia('(pointer: fine)').matches) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.35, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.35, ease: 'power3.out' });

    const onMove = (e: MouseEvent) => {
      el.style.opacity = '1';
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest<HTMLElement>('[data-cursor]');
      const mode = target?.dataset.cursor ?? '';
      el.dataset.mode = mode;
      const label = el.querySelector<HTMLElement>('.aria-cursor-label');
      if (label) label.textContent = mode === 'view' ? target?.dataset.cursorLabel ?? 'View' : '';
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
    };
  }, []);

  return (
    <div className="aria-cursor" ref={ref} aria-hidden="true" style={{ opacity: 0 }}>
      <span className="aria-cursor-label" />
    </div>
  );
};

export default SiteCursor;
