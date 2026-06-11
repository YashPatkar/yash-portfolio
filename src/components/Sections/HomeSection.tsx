import { Suspense, lazy, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import GlitchText from '../Animations/GlitchText';
import Magnetic from '../Animations/Magnetic';
import { willIntroPlay } from '../Layout/introState';
import CONTACT from '../data/resume';

const HeroObject = lazy(() => import('../Three/HeroObject'));

const HomeSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const scriptRef = useRef<HTMLSpanElement | null>(null);

  // Hero entrance — gated on the intro's `intro:complete` handoff so the hero
  // animates in as the ink-columns wipe away (no pop-in). On repeat visits /
  // reduced motion the intro is skipped, so we reveal immediately.
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const targets = gsap.utils.toArray<HTMLElement>('[data-hero-in]', root);
    if (!targets.length) return;

    const ctx = gsap.context(() => {
      const play = () => {
        gsap.to(targets, {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.09,
          ease: 'power4.out',
          clearProps: 'transform,opacity',
        });
      };

      if (willIntroPlay()) {
        gsap.set(targets, { y: 36, opacity: 0 });
        let done = false;
        const onIntro = () => {
          if (done) return;
          done = true;
          play();
        };
        window.addEventListener('intro:complete', onIntro, { once: true });
        // Fallback in case the event is missed.
        const fallback = window.setTimeout(onIntro, 6000);
        return () => {
          window.removeEventListener('intro:complete', onIntro);
          window.clearTimeout(fallback);
        };
      }
      // No intro this load — show immediately.
      gsap.set(targets, { y: 0, opacity: 1 });
    }, root);

    return () => ctx.revert();
  }, []);

  // Parallax-on-mouse for "patkar." script
  useEffect(() => {
    const el = scriptRef.current;
    if (!el) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.9, ease: 'expo.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.9, ease: 'expo.out' });

    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      xTo(((e.clientX - cx) / cx) * 18);
      yTo(((e.clientY - cy) / cy) * 12);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      data-hint="SCROLL"
      className="relative min-h-screen w-full overflow-hidden bg-[var(--color-butter)] text-[var(--color-jet)] noise"
    >
      {/* Tag row */}
      <div className="absolute left-6 right-6 top-28 md:left-10 md:right-10 lg:left-16 lg:right-16 flex items-start justify-between text-[var(--color-jet)] z-10">
        <span className="label-mono flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[var(--color-greenneon)] animate-pulse" />
          [ {CONTACT.home.status} ]
        </span>
        <span className="label-mono hidden md:inline">{CONTACT.home.level}</span>
      </div>

      {/* 3D gadget — center-screen, mouse-reactive */}
      <div data-hero-in className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="relative h-[60vh] w-[60vh] max-w-[80vw] max-h-[80vw]">
          <Suspense fallback={null}>
            <HeroObject />
          </Suspense>
        </div>
      </div>

      {/* Hero type */}
      <div className="relative z-10 flex min-h-screen flex-col justify-end px-6 md:px-10 lg:px-16 pb-16">
        <div data-hero-in className="leading-[0.82]">
          <GlitchText
            as="h1"
            text="YASH"
            className="font-display text-[clamp(96px,22vw,320px)] block"
          />
          <div className="-mt-[6vw] md:-mt-[8vw] flex items-end gap-6 flex-wrap">
            <span
              ref={scriptRef}
              className="font-script text-[clamp(72px,16vw,240px)] text-[var(--color-jet)] inline-block will-change-transform"
            >
              patkar.
            </span>
            <span className="label-mono pb-3">[2025]</span>
          </div>
        </div>

        <div data-hero-in className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <p className="max-w-xl text-sm md:text-base leading-relaxed">
            {CONTACT.home.details.bio}
          </p>
          <div className="flex flex-wrap gap-3">
            <Magnetic strength={0.35}>
              <Link
                to="/about"
                className="pill-btn pill-btn--filled"
                data-cursor="view"
                data-cursor-label="READ"
                data-magnetic
              >
                <span>FULL SUMMARY ↗</span>
              </Link>
            </Magnetic>
            <Magnetic strength={0.35}>
              <a
                href="mailto:yash.patkar2004@gmail.com"
                className="pill-btn"
                data-cursor="view"
                data-cursor-label="EMAIL"
                data-magnetic
              >
                <span>EMAIL ME</span>
              </a>
            </Magnetic>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none">
        <span className="text-label-mono opacity-60">SCROLL</span>
        <span className="block w-px h-10 bg-[var(--color-jet)] animate-pulse" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 hairline-bottom" />
    </section>
  );
};

export default HomeSection;
