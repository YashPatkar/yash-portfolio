import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import CONTACT from '../components/data/resume';
import SiteFooter from '../components/Site/SiteFooter';

const EMAIL = 'yash.patkar2004@gmail.com';

const THEMES: Record<string, { theme: string; tag: string }> = {
  ClassAccess: { theme: 'lumen', tag: 'Classrooms, supercharged' },
  Karzo: { theme: 'nocturne', tag: 'Rides, routed right' },
  SpeakUp: { theme: 'halo', tag: 'Spin, speak, review' },
  'Likho Hub': { theme: 'field', tag: 'Agents, coordinated' },
};

const Works = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '.aria-section-head',
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.1 }
      );
      gsap.utils.toArray<HTMLElement>('.aria-case').forEach((block) => {
        gsap.fromTo(
          block,
          { autoAlpha: 0, y: 50 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: block, start: 'top 88%', once: true },
          }
        );
      });
    },
    { scope: pageRef }
  );

  return (
    <div ref={pageRef}>
      <section className="aria-section aria-page-head">
        <div className="aria-section-head">
          <h2 className="aria-section-title">
            Selected <em>works</em>
          </h2>
          <span className="aria-label">( Case files — 2024 to 2025 )</span>
        </div>

        <div>
          {CONTACT.projects.map((p, i) => {
            const t = THEMES[p.name] ?? { theme: 'field', tag: p.hook };
            return (
              <article className="aria-case" key={p.name}>
                <div className="aria-case-art">
                  <div className={`aria-art aria-art--${t.theme}`}>
                    <div className="aria-art-ui" aria-hidden="true">
                      <i />
                      <i />
                      <i />
                      <i />
                    </div>
                    <span className="aria-art-tag">{t.tag}</span>
                  </div>
                </div>

                <div className="aria-case-body">
                  <div className="aria-case-head">
                    <h3 className="aria-case-title">{p.name}</h3>
                    <span className="aria-label">
                      /{String(i + 1).padStart(2, '0')} — {p.year}
                      {p.status ? ` — ${p.status}` : ''}
                    </span>
                  </div>
                  <span className="aria-case-hook">{p.hook.toLowerCase()}</span>
                  <p className="aria-case-desc">{p.fullDetails}</p>
                  <div className="aria-cap-tags">
                    {(p.tags ?? p.tech.split(',')).map((tag) => (
                      <span key={tag.trim()}>{tag.trim()}</span>
                    ))}
                  </div>
                  <div className="aria-case-actions">
                    {p.liveUrl && (
                      <a
                        className="aria-pill"
                        href={p.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        data-cursor="link"
                      >
                        View live ↗
                      </a>
                    )}
                    {p.link && (
                      <a
                        className="aria-pill"
                        href={p.link}
                        target="_blank"
                        rel="noreferrer"
                        data-cursor="link"
                      >
                        Open repo ↗
                      </a>
                    )}
                    <a
                      className="aria-pill"
                      href={`mailto:${EMAIL}?subject=About ${p.name}`}
                      data-cursor="link"
                    >
                      Ask me about it
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
      <SiteFooter />
    </div>
  );
};

export default Works;
