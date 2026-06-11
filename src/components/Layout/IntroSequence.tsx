import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Noise from '../Animations/Noise';
import { useLenis } from './SmoothScrollProvider';
import { INTRO_SESSION_KEY, fireHandoff, willIntroPlay } from './introState';

/**
 * Signature page-load intro — "Type Stampede".
 *
 *   AUTOMATE. → BUILD. → SHIP.   (3-word thesis, screen-filling)
 *        ↓ collapse
 *   YASH / patkar.               (identity assembles)
 *        ↓ ink-column wipe
 *   → hero revealed, scroll unlocks, `intro:complete` fired.
 *
 * Replaces the old timer-based Curtain. Plays once per session.
 * Load-gated (waits for fonts + min duration before the reveal), scroll-locked,
 * skippable, and reduced-motion aware.
 */

const COLUMN_COUNT = 6;
const STAMPEDE = ['AUTOMATE.', 'BUILD.', 'SHIP.'];

const IntroSequence = () => {
  const lenis = useLenis();

  // Decide synchronously whether the intro should play at all.
  const [active, setActive] = useState<boolean>(() => willIntroPlay());

  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const statusRef = useRef<HTMLSpanElement>(null);
  const readyRef = useRef(false);
  const finishedRef = useRef(false);

  // If we're not playing the intro, make sure scroll is free and the hero
  // gets its handoff signal immediately (repeat visits / reduced motion).
  useEffect(() => {
    if (active) return;
    sessionStorage.setItem(INTRO_SESSION_KEY, '1');
    document.body.style.overflow = '';
    lenis?.start();
    fireHandoff();
  }, [active, lenis]);

  // Lock scroll while the intro is on screen (covers the null-lenis window too).
  useEffect(() => {
    if (!active) return;
    document.body.style.overflow = 'hidden';
    lenis?.stop();
  }, [active, lenis]);

  useLayoutEffect(() => {
    if (!active) return;

    const ctx = gsap.context(() => {
      const root = rootRef.current;
      if (!root) return;

      const ease = 'power4.out';
      const counter = { v: 0 };

      const finish = () => {
        if (finishedRef.current) return;
        finishedRef.current = true;
        sessionStorage.setItem(INTRO_SESSION_KEY, '1');
        document.body.style.overflow = '';
        lenis?.start();
        fireHandoff();
        setActive(false);
      };

      const tl = gsap.timeline({ defaults: { ease }, onComplete: finish });

      // ── Phase A: boot in ───────────────────────────────────────────────
      tl.from(statusRef.current, { opacity: 0, x: -16, duration: 0.5 }, 0);
      tl.to(
        counter,
        {
          v: 100,
          duration: 1.9,
          ease: 'power2.inOut',
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.textContent = String(Math.round(counter.v)).padStart(3, '0');
            }
          },
        },
        0
      );

      // ── Phase B: the 3-word stampede ───────────────────────────────────
      const words = gsap.utils.toArray<HTMLElement>('.intro-word', root);
      gsap.set(words, { opacity: 0, scale: 1.35, filter: 'blur(14px)' });
      words.forEach((word, i) => {
        const at = 0.25 + i * 0.5;
        tl.to(word, { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.42 }, at);
        tl.to(
          word,
          { opacity: 0, scale: 0.82, filter: 'blur(10px)', duration: 0.34, ease: 'power2.in' },
          at + 0.4
        );
      });

      // ── Phase C: identity assembles ────────────────────────────────────
      const chars = gsap.utils.toArray<HTMLElement>('.intro-char', root);
      const script = root.querySelector('.intro-script');
      tl.set('.intro-identity', { opacity: 1 }, 1.78);
      tl.from(
        chars,
        {
          yPercent: 120,
          rotateX: -90,
          opacity: 0,
          duration: 0.7,
          stagger: 0.07,
          ease: 'back.out(1.7)',
        },
        1.8
      );
      if (script) {
        tl.from(
          script,
          { yPercent: 110, opacity: 0, duration: 0.7, ease: 'expo.out' },
          2.05
        );
      }

      // ── Gate: hold here until the load promise resolves ────────────────
      tl.addPause('+=0.35', () => {
        if (readyRef.current) tl.play();
      });

      // ── Phase D: stage fades, ink columns wipe up to reveal the hero ───
      tl.to('.intro-stage-content', { opacity: 0, duration: 0.4, ease: 'power2.in' });
      tl.to(
        '.intro-col',
        {
          yPercent: -100,
          duration: 0.9,
          ease: 'expo.inOut',
          stagger: { each: 0.07, from: 'start' },
        },
        '>-0.1'
      );

      // ── Load gate ──────────────────────────────────────────────────────
      const minDelay = new Promise<void>((res) => gsap.delayedCall(1.1, res));
      const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
      Promise.all([minDelay, fontsReady]).then(() => {
        readyRef.current = true;
        if (tl.paused()) tl.play();
      });

      // Hard cap so a slow asset never traps the visitor.
      gsap.delayedCall(5, () => {
        readyRef.current = true;
        if (tl.paused()) tl.play();
      });

      // ── Skip: click / key / wheel / touch jumps straight to the reveal ─
      const skip = () => {
        readyRef.current = true;
        if (finishedRef.current) return;
        // Jump to ~1.1s before the end (the column-wipe) and let it play out.
        tl.seek(Math.max(0, tl.totalDuration() - 1.1));
        tl.play();
      };
      window.addEventListener('pointerdown', skip);
      window.addEventListener('keydown', skip);
      window.addEventListener('wheel', skip, { passive: true });
      window.addEventListener('touchmove', skip, { passive: true });

      return () => {
        window.removeEventListener('pointerdown', skip);
        window.removeEventListener('keydown', skip);
        window.removeEventListener('wheel', skip);
        window.removeEventListener('touchmove', skip);
      };
    }, rootRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  if (!active) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[9998] overflow-hidden text-[var(--color-butter)]"
      aria-hidden="true"
    >
      {/* Ink columns — together they form the jet cover; they wipe up to reveal. */}
      <div className="absolute inset-0 flex">
        {Array.from({ length: COLUMN_COUNT }).map((_, i) => (
          <div
            key={i}
            className="intro-col h-full flex-1 bg-[var(--color-jet)]"
            style={{ willChange: 'transform' }}
          />
        ))}
      </div>

      {/* Stage — grain, grid, labels and type. Sits above the columns. */}
      <div ref={stageRef} className="intro-stage-content absolute inset-0">
        <Noise patternAlpha={10} patternRefreshInterval={3} />

        {/* Grid backdrop */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              'linear-gradient(var(--color-butter) 1px, transparent 1px), linear-gradient(90deg, var(--color-butter) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />

        {/* Status label */}
        <span
          ref={statusRef}
          className="label-mono absolute left-6 top-6 md:left-10 md:top-10 opacity-80"
        >
          PORTFOLIO_OS // BOOT_v.04
        </span>

        {/* Load counter */}
        <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 flex items-end gap-2">
          <span ref={counterRef} className="font-display text-[clamp(40px,7vw,96px)] leading-none">
            000
          </span>
          <span className="label-mono pb-2 opacity-60">LOADING</span>
        </div>

        {/* Center stage — stampede words + identity, stacked */}
        <div className="absolute inset-0 flex items-center justify-center px-6">
          {STAMPEDE.map((w) => (
            <span
              key={w}
              className="intro-word absolute font-display text-[clamp(48px,15vw,200px)] leading-none whitespace-nowrap"
            >
              {w}
            </span>
          ))}

          <div className="intro-identity absolute inset-0 flex flex-col items-center justify-center opacity-0">
            <div className="flex leading-[0.82]" style={{ perspective: 600 }}>
              {['Y', 'A', 'S', 'H'].map((c, i) => (
                <span
                  key={i}
                  className="intro-char inline-block font-display text-[clamp(72px,18vw,260px)]"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {c}
                </span>
              ))}
            </div>
            <div className="overflow-hidden">
              <span className="intro-script font-script text-[clamp(48px,11vw,160px)] leading-[0.9] -mt-[2vw] inline-block">
                patkar.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroSequence;
