import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from '../Animations/SplitText';
import CONTACT from '../data/resume';

gsap.registerPlugin(ScrollTrigger);

const ExperienceSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const fillRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const fill = fillRef.current;
    if (!section || !fill) return;

    const dots = section.querySelectorAll<HTMLElement>('.timeline-dot');
    const companies = section.querySelectorAll<HTMLElement>('.timeline-company');
    let lastIdx = -1;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 75%',
        end: 'bottom 70%',
        scrub: 0.5,
        onUpdate: (self) => {
          fill.style.height = `${self.progress * 100}%`;
          const idx = Math.floor(self.progress * dots.length + 0.05);
          dots.forEach((d, i) => d.classList.toggle('is-active', i < idx));
          // Trigger glitch flash on the newly activated company
          if (idx !== lastIdx && idx > 0) {
            const target = companies[idx - 1];
            if (target) {
              target.classList.remove('is-glitch');
              // Force reflow to restart animation
              void target.offsetWidth;
              target.classList.add('is-glitch');
            }
            lastIdx = idx;
          }
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      data-hint="TIMELINE"
      className="relative w-full bg-[var(--color-jet)] text-[var(--color-butter)]"
    >
      <div className="px-6 md:px-10 lg:px-16 pt-24 pb-24">
        <span className="label-mono">/ 04 · EXPERIENCE</span>
        <SplitText
          as="h2"
          text="FIELD NOTES."
          className="font-display text-[clamp(56px,12vw,220px)] leading-[0.85] mt-4 block"
        />

        <div className="relative mt-16 pl-8 md:pl-14">
          {/* Track + fill */}
          <div className="timeline-line" />
          <div ref={fillRef} className="timeline-line-fill" />

          {CONTACT.experience.map((exp) => (
            <div
              key={exp.company}
              className="relative py-10 md:py-14 grid md:grid-cols-[180px_1fr] gap-6 md:gap-12 items-start"
              data-cursor="view"
              data-cursor-label="ROLE"
            >
              {/* Dot on track */}
              <span className="timeline-dot absolute -left-[7px] md:-left-[7px] top-12" />

              <span className="label-mono opacity-90 mt-2">{exp.time}</span>
              <div>
                <h3 className="timeline-company font-display text-[clamp(36px,6vw,96px)] leading-[0.9]">
                  {exp.company}
                </h3>
                <p className="font-script lowercase text-2xl md:text-3xl mt-1">{exp.role}</p>
                <p className="mt-4 max-w-2xl text-sm md:text-base leading-relaxed opacity-90">
                  {exp.hook}
                </p>
                {exp.details && exp.details.length > 0 && (
                  <ul className="mt-6 space-y-2 max-w-2xl">
                    {exp.details.map((point) => (
                      <li key={point} className="flex gap-3 text-sm md:text-base opacity-80">
                        <span className="font-display">▹</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
