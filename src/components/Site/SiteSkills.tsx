import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import CONTACT from '../data/resume';

const SiteSkills = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '.aria-skill-group',
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.06,
          scrollTrigger: { trigger: '.aria-skills-grid', start: 'top 85%', once: true },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section className="aria-section" ref={sectionRef}>
      <div className="aria-section-head">
        <h2 className="aria-section-title">
          The <em>arsenal</em>
        </h2>
        <span className="aria-label">( Skills — Tools )</span>
      </div>

      <div className="aria-skills-grid">
        {CONTACT.skills.details.map((group, i) => (
          <div className="aria-skill-group" key={group.cat}>
            <h3>
              <i>({String(i + 1).padStart(2, '0')})</i>
              {group.cat}
            </h3>
            <div className="aria-cap-tags">
              {group.items.split(',').map((item) => (
                <span key={item.trim()}>{item.trim()}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SiteSkills;
