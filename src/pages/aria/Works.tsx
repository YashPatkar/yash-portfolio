import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface Project {
  id: string;
  title: string;
  cat: string;
  year: string;
  tag: string;
}

const PROJECTS: Project[] = [
  { id: 'lumen', title: 'Lumen', cat: 'Fintech — Product Design', year: '2026', tag: 'Banking, reimagined' },
  { id: 'halo', title: 'Halo Health', cat: 'Health — Care OS', year: '2025', tag: 'Care that follows you' },
  { id: 'nocturne', title: 'Nocturne', cat: 'Music — Brand & App', year: '2025', tag: 'Sound after dark' },
  { id: 'field', title: 'Field', cat: 'Climate — Data Platform', year: '2024', tag: 'Earth, quantified' },
];

const Art = ({ project }: { project: Project }) => (
  <div className={`aria-art aria-art--${project.id}`}>
    <div className="aria-art-ui" aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </div>
    <span className="aria-art-tag">{project.tag}</span>
  </div>
);

const Works = ({ reduced }: { reduced: boolean }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* Row reveals */
  useGSAP(
    () => {
      if (reduced) return;
      gsap.utils.toArray<HTMLElement>('.aria-work').forEach((row) => {
        gsap.fromTo(
          row,
          { autoAlpha: 0, y: 44 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: row, start: 'top 90%', once: true },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  /* Cursor-following preview (desktop only) */
  useGSAP(
    () => {
      const preview = previewRef.current;
      if (!preview || !canHover) return;

      gsap.set(preview, { xPercent: -50, yPercent: -55, scale: 0, rotate: -4 });
      const xTo = gsap.quickTo(preview, 'x', { duration: 0.5, ease: 'power3.out' });
      const yTo = gsap.quickTo(preview, 'y', { duration: 0.5, ease: 'power3.out' });

      const onMove = (e: MouseEvent) => {
        xTo(e.clientX);
        yTo(e.clientY);
      };
      window.addEventListener('mousemove', onMove);
      return () => window.removeEventListener('mousemove', onMove);
    },
    { scope: sectionRef }
  );

  const showPreview = (id: string) => {
    setActive(id);
    if (canHover && previewRef.current) {
      gsap.to(previewRef.current, { scale: 1, rotate: 0, duration: 0.45, ease: 'power3.out' });
    }
  };

  const hidePreview = () => {
    setActive(null);
    if (canHover && previewRef.current) {
      gsap.to(previewRef.current, { scale: 0, rotate: -4, duration: 0.35, ease: 'power3.in' });
    }
  };

  return (
    <section className="aria-section" id="aria-work" ref={sectionRef}>
      <div className="aria-section-head">
        <h2 className="aria-section-title">
          Selected <em>works</em>
        </h2>
        <span className="aria-label">( 2024 — 2026 )</span>
      </div>

      <div className="aria-works-list" onMouseLeave={hidePreview}>
        {PROJECTS.map((p, i) => (
          <article
            key={p.id}
            className="aria-work"
            data-cursor="view"
            data-cursor-label="View"
            onMouseEnter={() => showPreview(p.id)}
          >
            <div className="aria-work-art-inline">
              <Art project={p} />
            </div>
            <span className="aria-work-idx">/{String(i + 1).padStart(2, '0')}</span>
            <h3 className="aria-work-title">{p.title}</h3>
            <span className="aria-work-cat aria-work-cat--col">{p.cat}</span>
            <span className="aria-work-year aria-work-year--col">{p.year}</span>
            <div className="aria-work-meta-mobile">
              <span className="aria-work-cat">{p.cat}</span>
              <span className="aria-work-year">{p.year}</span>
            </div>
          </article>
        ))}
      </div>

      {canHover && (
        <div className="aria-work-preview" ref={previewRef} aria-hidden="true">
          {PROJECTS.map((p) => (
            <div
              key={p.id}
              className={`aria-art aria-art--${p.id}${active === p.id ? ' is-active' : ''}`}
            >
              <div className="aria-art-ui" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
              </div>
              <span className="aria-art-tag">{p.tag}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Works;
