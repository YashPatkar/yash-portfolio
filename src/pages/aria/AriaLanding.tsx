import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
import HeroScene from './HeroScene';
import Works from './Works';
import Manifesto from './Manifesto';
import Capabilities from './Capabilities';
import AriaFooter from './AriaFooter';
import './aria.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PRELOAD_WORDS = ['strategy', 'interface', 'motion', 'systems', 'aria sato'];

const useMedia = (query: string) => {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [query]);
  return matches;
};

const useTokyoTime = () => {
  const [time, setTime] = useState('');
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Tokyo',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);
  return time;
};

/* ── Preloader ───────────────────────────────────────────── */
const Preloader = ({ onReveal }: { onReveal: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const num = el.querySelector<HTMLElement>('.aria-preloader-num');
      const word = el.querySelector<HTMLElement>('.aria-preloader-word');
      const counter = { v: 0 };

      const tl = gsap.timeline();
      tl.to(counter, {
        v: 100,
        duration: 1.9,
        ease: 'power2.inOut',
        onUpdate: () => {
          if (num) num.textContent = String(Math.round(counter.v)).padStart(3, '0');
          if (word) {
            const idx = Math.min(
              PRELOAD_WORDS.length - 1,
              Math.floor((counter.v / 100) * PRELOAD_WORDS.length)
            );
            word.textContent = PRELOAD_WORDS[idx];
          }
        },
      })
        .to('.aria-preloader-bar', { scaleX: 1, duration: 1.9, ease: 'power2.inOut' }, 0)
        .add(onReveal, '+=0.1')
        .to(el, { yPercent: -100, duration: 0.95, ease: 'power4.inOut' }, '<')
        .set(el, { display: 'none' });
    },
    { scope: ref }
  );

  return (
    <div className="aria-preloader" ref={ref} aria-hidden="true">
      <div className="aria-preloader-count">
        <span className="aria-preloader-num">000</span>
        <sup>%</sup>
      </div>
      <span className="aria-preloader-word">strategy</span>
      <span className="aria-preloader-bar" />
    </div>
  );
};

/* ── Custom cursor (desktop only) ────────────────────────── */
const Cursor = () => {
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

/* ── Marquee ─────────────────────────────────────────────── */
const MarqueeHalf = () => (
  <span className="aria-marquee-seg" aria-hidden="true">
    <span>UI/UX Design</span>
    <i>✺</i>
    <em>art direction</em>
    <i>✺</i>
    <span>Design Systems</span>
    <i>✺</i>
    <em>motion</em>
    <i>✺</i>
    <span>Prototyping</span>
    <i>✺</i>
    <em>brand identity</em>
    <i>✺</i>
  </span>
);

/* ── Page root ───────────────────────────────────────────── */
const AriaLanding = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  const reduced = useMemo(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );
  const isMobile = useMedia('(max-width: 860px)');
  const time = useTokyoTime();

  const [revealed, setRevealed] = useState(reduced);

  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'Aria Sato® — Digital Designer & Art Director';
    return () => {
      document.title = prevTitle;
    };
  }, []);

  /* Local smooth-scroll instance (the page renders outside the host app chrome) */
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    const onRaf = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(onRaf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onRaf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  /* Lock scroll under the preloader */
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    if (revealed) lenis.start();
    else lenis.stop();
  }, [revealed]);

  /* Hero intro choreography — kicked off as the preloader wipes away */
  useGSAP(
    () => {
      if (!revealed || reduced) return;

      gsap
        .timeline({ defaults: { ease: 'power4.out' } })
        .fromTo(
          '.aria-hero-name .aria-line > span',
          { yPercent: 112 },
          { yPercent: 0, duration: 1.3, stagger: 0.1 },
          0.05
        )
        .fromTo(
          '.aria-hero-canvas',
          { autoAlpha: 0, scale: 0.86 },
          { autoAlpha: 1, scale: 1, duration: 1.7, ease: 'power3.out' },
          0.25
        )
        .fromTo(
          ['.aria-nav', '.aria-hero-eyebrow', '.aria-hero-row', '.aria-hero-meta'],
          { autoAlpha: 0, y: 26 },
          { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.09 },
          0.55
        );

      requestAnimationFrame(() => ScrollTrigger.refresh());
    },
    { scope: rootRef, dependencies: [revealed, reduced] }
  );

  /* Scroll choreography: hero parallax + velocity-reactive marquee */
  useGSAP(
    () => {
      if (reduced) return;

      gsap.to('.aria-hero-canvas', {
        yPercent: 22,
        ease: 'none',
        scrollTrigger: { trigger: '.aria-hero', start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to('.aria-hero-type', {
        yPercent: -14,
        autoAlpha: 0.15,
        ease: 'none',
        scrollTrigger: { trigger: '.aria-hero', start: 'top top', end: 'bottom 30%', scrub: true },
      });

      const track = rootRef.current?.querySelector('.aria-marquee-track');
      const lenis = lenisRef.current;
      if (track && lenis) {
        const skewTo = gsap.quickTo(track, 'skewX', { duration: 0.5, ease: 'power3.out' });
        lenis.on('scroll', (e: { velocity: number }) => {
          skewTo(gsap.utils.clamp(-9, 9, e.velocity * 0.32));
        });
      }
    },
    { scope: rootRef }
  );

  const scrollTo = (target: string) => {
    lenisRef.current?.scrollTo(target, { duration: 1.4 });
  };

  return (
    <div className={`aria-root${reduced ? ' aria-static' : ''}`} ref={rootRef}>
      {!reduced && <Preloader onReveal={() => setRevealed(true)} />}
      <Cursor />
      <div className="aria-grain" aria-hidden="true" />

      <header className="aria-nav aria-io">
        <a
          className="aria-nav-logo"
          href="#aria-top"
          data-cursor="link"
          onClick={(e) => {
            e.preventDefault();
            scrollTo('#aria-top');
          }}
        >
          A.Sato<sup>®</sup>
        </a>
        <nav className="aria-nav-links">
          {(
            [
              ['Work', '#aria-work'],
              ['About', '#aria-about'],
              ['Contact', '#aria-contact'],
            ] as const
          ).map(([label, href]) => (
            <a
              key={href}
              className="aria-nav-link"
              href={href}
              data-cursor="link"
              onClick={(e) => {
                e.preventDefault();
                scrollTo(href);
              }}
            >
              {label}
            </a>
          ))}
        </nav>
        <span className="aria-nav-clock">Tokyo — {time} JST</span>
      </header>

      <main>
        <section className="aria-hero" id="aria-top">
          <div className="aria-hero-canvas">
            <HeroScene isMobile={isMobile} />
          </div>

          <div className="aria-hero-type">
            <div className="aria-hero-eyebrow aria-io">
              <span className="aria-hero-dot" />
              <span className="aria-label aria-label--lit">
                Available for select projects — Summer 2026
              </span>
            </div>

            <h1 className="aria-hero-name">
              <span className="aria-line">
                <span>Aria</span>
              </span>
              <span className="aria-line">
                <span>
                  <span className="aria-outline">Sato</span>
                  <sup>®</sup>
                </span>
              </span>
            </h1>

            <div className="aria-hero-row aria-io">
              <p className="aria-hero-role">
                ( digital designer <span className="acc">&amp;</span> art director )
              </p>
              <p className="aria-hero-intro">
                I design interfaces that feel inevitable — products people don't just use, but
                remember. Independent since 2022, previously lead designer at Studio Mono.
              </p>
            </div>
          </div>

          <div className="aria-hero-meta aria-io">
            <span className="aria-label">Based in Tokyo, JP</span>
            <span className="aria-hero-scroll aria-label">
              Scroll
              <svg width="10" height="14" viewBox="0 0 10 14" fill="none" aria-hidden="true">
                <path
                  d="M5 1v11m0 0L1 8m4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="aria-label">Portfolio — Vol. 04</span>
          </div>
        </section>

        <div className="aria-marquee">
          <div className="aria-marquee-track">
            <MarqueeHalf />
            <MarqueeHalf />
          </div>
        </div>

        <Works reduced={reduced} />
        <Manifesto reduced={reduced} />
        <Capabilities reduced={reduced} />
      </main>

      <AriaFooter reduced={reduced} onTop={() => scrollTo('#aria-top')} />
    </div>
  );
};

export default AriaLanding;
