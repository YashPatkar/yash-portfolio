import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { lazy, Suspense, useMemo, useRef } from 'react';
import { prefersReducedMotion, useMedia, useRevealed } from './siteState';

// Three.js scene stays in its own chunk so the home page paints immediately
const HeroScene = lazy(() => import('../../pages/aria/HeroScene'));

const SiteHero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const revealed = useRevealed();
  const reduced = useMemo(() => prefersReducedMotion(), []);
  const isMobile = useMedia('(max-width: 860px)');

  /* Intro choreography — kicked off as the preloader wipes away */
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
    { dependencies: [revealed, reduced] }
  );

  /* Scroll parallax */
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
    },
    { scope: sectionRef }
  );

  return (
    <section className="aria-hero" id="top" ref={sectionRef}>
      <div className="aria-hero-canvas">
        <Suspense fallback={null}>
          <HeroScene isMobile={isMobile} />
        </Suspense>
      </div>

      <div className="aria-hero-type">
        <div className="aria-hero-eyebrow aria-io">
          <span className="aria-hero-dot" />
          <span className="aria-label aria-label--lit">Open to work — Backend & AI Engineer</span>
        </div>

        <h1 className="aria-hero-name">
          <span className="aria-line">
            <span>Yash</span>
          </span>
          <span className="aria-line">
            <span>
              <span className="aria-outline">Patkar</span>
              <sup>®</sup>
            </span>
          </span>
        </h1>

        <div className="aria-hero-row aria-io">
          <p className="aria-hero-role">
            ( backend engineer <span className="acc">&amp;</span> ai systems builder )
          </p>
          <p className="aria-hero-intro">
            I build backend systems that stay fast under load — REST APIs, queues and RAG
            pipelines that answer in milliseconds. Previously at Kuvaka Tech and Levaze Digital.
          </p>
        </div>
      </div>

      <div className="aria-hero-meta aria-io">
        <span className="aria-label">Based in Mumbai, IN</span>
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
        <span className="aria-label">Portfolio — Vol. 02</span>
      </div>
    </section>
  );
};

export default SiteHero;
