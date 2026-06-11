import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const WORDS = ['backend', 'rest apis', 'rag pipelines', 'systems', 'yash patkar'];

const SitePreloader = ({ onReveal }: { onReveal: () => void }) => {
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
              WORDS.length - 1,
              Math.floor((counter.v / 100) * WORDS.length)
            );
            word.textContent = WORDS[idx];
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
      <span className="aria-preloader-word">backend</span>
      <span className="aria-preloader-bar" />
    </div>
  );
};

export default SitePreloader;
