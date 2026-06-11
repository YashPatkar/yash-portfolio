import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import CONTACT from '../data/resume';

interface Row {
  id: string;
  title: string;
  cat: string;
  year: string;
  tag: string;
  theme: string;
  href?: string;
}

const THEMES: Record<string, { theme: string; tag: string }> = {
  ClassAccess: { theme: 'lumen', tag: 'Classrooms, supercharged' },
  Karzo: { theme: 'nocturne', tag: 'Rides, routed right' },
};

const ROWS: Row[] = CONTACT.projects.map((p) => ({
  id: p.name.toLowerCase(),
  title: p.name,
  cat: `${p.category ?? 'Case study'} — ${p.hook}`,
  year: p.year ?? '',
  tag: THEMES[p.name]?.tag ?? p.hook,
  theme: THEMES[p.name]?.theme ?? 'field',
  href: p.link || undefined,
}));

const Art = ({ row }: { row: Row }) => (
  <div className={`aria-art aria-art--${row.theme}`}>
    <div className="aria-art-ui" aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </div>
    <span className="aria-art-tag">{row.tag}</span>
  </div>
);

const SiteWorks = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  useGSAP(
    () => {
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

  const rowInner = (row: Row, i: number) => (
    <>
      <div className="aria-work-art-inline">
        <Art row={row} />
      </div>
      <span className="aria-work-idx">/{String(i + 1).padStart(2, '0')}</span>
      <h3 className="aria-work-title">{row.title}</h3>
      <span className="aria-work-cat aria-work-cat--col">{row.cat}</span>
      <span className="aria-work-year aria-work-year--col">{row.year}</span>
      <div className="aria-work-meta-mobile">
        <span className="aria-work-cat">{row.cat}</span>
        <span className="aria-work-year">{row.year}</span>
      </div>
    </>
  );

  return (
    <section className="aria-section" id="work" ref={sectionRef}>
      <div className="aria-section-head">
        <h2 className="aria-section-title">
          Selected <em>works</em>
        </h2>
        <span className="aria-label">( 2024 — 2025 )</span>
      </div>

      <div className="aria-works-list" onMouseLeave={hidePreview}>
        {ROWS.map((row, i) => (
          <Link
            key={row.id}
            to="/works"
            className="aria-work"
            data-cursor="view"
            data-cursor-label="View"
            onMouseEnter={() => showPreview(row.id)}
          >
            {rowInner(row, i)}
          </Link>
        ))}
      </div>

      {canHover && (
        <div className="aria-work-preview" ref={previewRef} aria-hidden="true">
          {ROWS.map((row) => (
            <div
              key={row.id}
              className={`aria-art aria-art--${row.theme}${active === row.id ? ' is-active' : ''}`}
            >
              <div className="aria-art-ui" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
              </div>
              <span className="aria-art-tag">{row.tag}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default SiteWorks;
