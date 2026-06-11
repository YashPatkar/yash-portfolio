import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const CAPS: Array<{ name: string; desc: string; tags: string[] }> = [
  {
    name: 'Product Design',
    desc: 'End-to-end product thinking — research, flows, wireframes and high-fidelity interfaces that ship.',
    tags: ['Research', 'UX Flows', 'UI Design', 'Testing'],
  },
  {
    name: 'Design Systems',
    desc: 'Token-driven systems that scale across teams and platforms without losing their soul.',
    tags: ['Tokens', 'Components', 'Documentation'],
  },
  {
    name: 'Motion & Interaction',
    desc: 'Choreography that guides attention — micro-interactions that make products feel alive.',
    tags: ['Prototyping', 'GSAP', 'Micro-interactions'],
  },
  {
    name: 'Art Direction',
    desc: 'Distinct visual languages — typography, color and imagery that make brands unmistakable.',
    tags: ['Identity', 'Typography', 'Campaigns'],
  },
];

const Capabilities = ({ reduced }: { reduced: boolean }) => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reduced) return;
      gsap.fromTo(
        '.aria-cap',
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: '.aria-caps-list', start: 'top 85%', once: true },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section className="aria-section" ref={sectionRef}>
      <div className="aria-section-head">
        <h2 className="aria-section-title">
          What I <em>do</em>
        </h2>
        <span className="aria-label">( Capabilities )</span>
      </div>

      <div className="aria-caps-list">
        {CAPS.map((cap, i) => (
          <div className="aria-cap" key={cap.name} data-cursor="link">
            <span className="aria-cap-num">({String(i + 1).padStart(2, '0')})</span>
            <h3 className="aria-cap-name">{cap.name}</h3>
            <div className="aria-cap-body">
              <p className="aria-cap-desc">{cap.desc}</p>
              <div className="aria-cap-tags">
                {cap.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Capabilities;
