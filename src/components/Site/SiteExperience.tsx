import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import CONTACT from '../data/resume';

const SiteExperience = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
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
          Where I've <em>shipped</em>
        </h2>
        <span className="aria-label">( Experience )</span>
      </div>

      <div className="aria-caps-list">
        {CONTACT.experience.map((xp) => (
          <div className="aria-cap" key={xp.company}>
            <span className="aria-cap-num">{xp.time.split('–')[0].trim()}</span>
            <div>
              <h3 className="aria-cap-name">{xp.company}</h3>
              <span className="aria-cap-role">{xp.role.toLowerCase()}</span>
            </div>
            <div className="aria-cap-body">
              <p className="aria-cap-desc">{xp.hook}</p>
              <ul className="aria-cap-points">
                {xp.details.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SiteExperience;
