import { useEffect, useRef } from 'react';

type CursorMode = 'default' | 'interactive' | 'text' | 'drag' | 'media' | 'view';

const findCursorTarget = (target: EventTarget | null): HTMLElement | null => {
  if (!(target instanceof Element)) return null;
  const el = target.closest<HTMLElement>(
    'a, button, [role="button"], input, textarea, select, [data-cursor], [data-cursor-label]'
  );
  return el;
};

const modeFromTarget = (el: HTMLElement | null, fallbackTarget: EventTarget | null): CursorMode => {
  if (el) {
    const explicit = el.getAttribute('data-cursor') as CursorMode | null;
    if (explicit === 'drag' || explicit === 'media' || explicit === 'view' || explicit === 'text') {
      return explicit;
    }
    return 'interactive';
  }
  if (fallbackTarget instanceof Element) {
    if (fallbackTarget.closest('p, h1, h2, h3, h4, li, span[data-cursor="text"]')) {
      // Text-only when not over an interactive element
      return 'text';
    }
  }
  return 'default';
};

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    document.body.classList.add('cursor-active');
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let dotX = mouseX;
    let dotY = mouseY;
    let ringX = mouseX;
    let ringY = mouseY;

    // Magnetic snap target rect (when hovering [data-magnetic])
    let magneticEl: HTMLElement | null = null;
    let currentMode: CursorMode = 'default';

    const setMode = (mode: CursorMode, text?: string) => {
      if (mode !== currentMode) {
        ring.dataset.mode = mode;
        dot.dataset.mode = mode;
        currentMode = mode;
      }
      if (text !== undefined) {
        label.textContent = text;
        ring.dataset.hasLabel = text ? 'true' : 'false';
      }
    };

    const handleMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      const el = findCursorTarget(e.target);
      const mode = modeFromTarget(el, e.target);
      const labelText = el?.getAttribute('data-cursor-label') ?? '';

      magneticEl = el?.hasAttribute('data-magnetic') ? el : null;
      setMode(mode, labelText);
    };

    const handleDown = () => ring.classList.add('is-pressed');
    const handleUp = () => ring.classList.remove('is-pressed');
    const handleLeave = () => {
      ring.style.opacity = '0';
      dot.style.opacity = '0';
    };
    const handleEnter = () => {
      ring.style.opacity = '';
      dot.style.opacity = '';
    };

    const tick = () => {
      // Magnetic pull: snap ring toward target center
      let targetRingX = mouseX;
      let targetRingY = mouseY;
      if (magneticEl) {
        const r = magneticEl.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        // Pull ring 55% of the way toward center
        targetRingX = mouseX + (cx - mouseX) * 0.5;
        targetRingY = mouseY + (cy - mouseY) * 0.5;
      }

      dotX += (mouseX - dotX) * 0.55;
      dotY += (mouseY - dotY) * 0.55;
      ringX += (targetRingX - ringX) * 0.18;
      ringY += (targetRingY - ringY) * 0.18;

      dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;

      rafId = requestAnimationFrame(tick);
    };

    let rafId = requestAnimationFrame(tick);
    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mouseup', handleUp);
    document.addEventListener('mouseleave', handleLeave);
    document.addEventListener('mouseenter', handleEnter);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
      document.removeEventListener('mouseleave', handleLeave);
      document.removeEventListener('mouseenter', handleEnter);
      document.body.classList.remove('cursor-active');
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true">
        <span ref={labelRef} className="cursor-label" />
      </div>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
};

export default CustomCursor;
