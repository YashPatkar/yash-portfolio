import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export interface Stat {
  value: string;
  accent: string;
  label: string;
}

interface Props {
  id?: string;
  kicker: string;
  /* Words wrapped in *asterisks* render as italic serif accent words */
  statement: string;
  stats: Stat[];
}

const SiteManifesto = ({ id, kicker, statement, stats }: Props) => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
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
    <section className="aria-section aria-manifesto" id={id} ref={sectionRef}>
      <span className="aria-label aria-footer-kicker">{kicker}</span>
      <p className="aria-manifesto-text">
        {statement.split(' ').map((raw, i) => {
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
        {stats.map((s) => (
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

export default SiteManifesto;
