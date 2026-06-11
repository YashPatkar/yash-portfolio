import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useLenis } from '../Layout/SmoothScrollProvider';
import SiteCursor from './SiteCursor';
import SiteNav from './SiteNav';
import SitePreloader from './SitePreloader';
import { INTRO_SEEN_KEY, prefersReducedMotion, RevealContext } from './siteState';
import '../../pages/aria/aria.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SiteShell = ({ children }: { children: ReactNode }) => {
  const lenis = useLenis();
  const { pathname } = useLocation();

  const reduced = useMemo(() => prefersReducedMotion(), []);
  const skipIntro = useMemo(
    () => reduced || sessionStorage.getItem(INTRO_SEEN_KEY) === '1',
    [reduced]
  );
  const [revealed, setRevealed] = useState(skipIntro);
  const firstPath = useRef(true);

  /* Lock scroll under the preloader */
  useEffect(() => {
    if (!lenis) return;
    if (revealed) lenis.start();
    else lenis.stop();
  }, [revealed, lenis]);

  /* Route change: jump to top, re-measure triggers */
  useEffect(() => {
    if (firstPath.current) {
      firstPath.current = false;
      return;
    }
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, [pathname, lenis]);

  const onReveal = () => {
    sessionStorage.setItem(INTRO_SEEN_KEY, '1');
    setRevealed(true);
  };

  return (
    <RevealContext.Provider value={revealed}>
      <div className={`aria-root${reduced ? ' aria-static' : ''}`}>
        {!skipIntro && <SitePreloader onReveal={onReveal} />}
        <SiteCursor />
        <div className="aria-grain" aria-hidden="true" />
        <SiteNav />
        <main>{children}</main>
      </div>
    </RevealContext.Provider>
  );
};

export default SiteShell;
