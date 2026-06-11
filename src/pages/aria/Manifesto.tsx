import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

/* Words wrapped in *asterisks* render as italic serif accent words */
const STATEMENT =
  "I design digital products people don't just use — they *remember.* Every pixel earns its " +
  'place, every transition tells you where you are. Good design is invisible. Great design ' +
  'is *inevitable.*';

const STATS: Array<{ value: string; accent: string; label: string }> = [
  { value: '8', accent: 'yrs', label: 'Designing digital products' },
  { value: '40', accent: '+', label: 'Products shipped worldwide' },
  { value: '06', accent: '×', label: 'Awwwards Site of the Day' },
];

const Manifesto = ({ reduced }: { reduced: boolean }) => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reduced) return;

      gsap.to('.aria-manifesto-text .w', {
        opacity: 1,
        ease: 'none',
        stagger: 0.06,
        scrollTrigger: {
          trigger: '.aria-manifesto-text',
          start: 'top 78%',
          end: 'bottom 45%',
          scrub: true,
        },
      });

      gsap.fromTo(
        '.aria-stat',
        { autoAlpha: 0, y: 36 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: '.aria-manifesto-foot', start: 'top 88%', once: true },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section className="aria-section aria-manifesto" id="aria-about" ref={sectionRef}>
      <span className="aria-label aria-footer-kicker">( About — Philosophy )</span>
      <p className="aria-manifesto-text">
        {STATEMENT.split(' ').map((raw, i) => {
          const isAccent = raw.startsWith('*');
          const word = raw.replaceAll('*', '');
          return (
            <span className="w" key={i}>
              {isAccent ? <em>{word}</em> : word}
              {' '}
            </span>
          );
        })}
      </p>

      <div className="aria-manifesto-foot">
        {STATS.map((s) => (
          <div className="aria-stat" key={s.label}>
            <b>
              {s.value}
              <i>{s.accent}</i>
            </b>
            <span className="aria-label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Manifesto;
