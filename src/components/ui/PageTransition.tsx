import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from '../Layout/SmoothScrollProvider';

export function PageTransitionOverlay() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isFirstRender = useRef(true);
  const lenis = useLenis();

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      gsap.set(overlay, { x: '0%' });
      gsap.to(overlay, {
        x: '100%',
        duration: 0.4,
        ease: 'power4.inOut',
        delay: 0.1,
        onStart: () => lenis?.stop(),
        onComplete: () => lenis?.start(),
      });
      return;
    }

    lenis?.stop();

    const tl = gsap.timeline({
      onComplete: () => {
        lenis?.start();
        ScrollTrigger.refresh();
      },
    });

    tl.set(overlay, { x: '-100%' })
      .to(overlay, { x: '0%', duration: 0.4, ease: 'power4.inOut' })
      .call(() => {
        window.scrollTo(0, 0);
        lenis?.scrollTo(0, { immediate: true });
      })
      .to(overlay, { x: '0%', duration: 0.15 })
      .to(overlay, { x: '100%', duration: 0.4, ease: 'power4.inOut' });

    return () => {
      tl.kill();
    };
  }, [location.pathname, lenis]);

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#FFE600',
        zIndex: 9999,
        transform: 'translateX(-100%)',
        pointerEvents: 'none',
        willChange: 'transform',
      }}
    />
  );
}

export default PageTransitionOverlay;
