import { useEffect, useRef, useState } from 'react';
import type { ProjectEntry } from '../data/resume';

interface Props {
  project: ProjectEntry;
  index: number;
}

const ProjectImageFrame = ({ project, index }: Props) => {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);

  const images = project.images && project.images.length ? project.images : [];
  const hasImages = images.length > 0;

  // Auto-cycle while hovering
  useEffect(() => {
    if (!hovered || images.length < 2) return;
    const id = window.setInterval(() => {
      setActive((a) => (a + 1) % images.length);
    }, 1400);
    return () => window.clearInterval(id);
  }, [hovered, images.length]);

  // Mouse-driven 3D tilt
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const wrap = wrapRef.current;
    const img = imgRef.current;
    if (!wrap || !img) return;
    const r = wrap.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    img.style.transform = `perspective(1200px) rotateY(${x * 9}deg) rotateX(${-y * 9}deg) translateZ(20px) scale(1.04)`;
    wrap.style.setProperty('--mx', `${e.clientX - r.left}px`);
    wrap.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  const onLeave = () => {
    const img = imgRef.current;
    if (img) img.style.transform = '';
    setHovered(false);
    setActive(0);
  };

  const repoLabel = project.link ? 'OPEN REPO' : 'CASE FILE';

  const inner = (
    <div
      ref={wrapRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      onMouseMove={onMove}
      className="project-frame relative w-full h-full"
      data-cursor="media"
      data-cursor-label={repoLabel}
    >
      {/* Index badge */}
      <span className="absolute top-4 left-4 z-20 text-label-mono bg-[var(--color-butter)] text-[var(--color-jet)] px-2 py-1">
        {String(index + 1).padStart(2, '0')} / {project.name.toUpperCase()}
      </span>

      {/* Slide indicator (dots) */}
      {images.length > 1 && (
        <div className="absolute top-4 right-4 z-20 flex gap-1">
          {images.map((_, i) => (
            <span
              key={i}
              className={`h-1 transition-all duration-300 ${i === active ? 'w-6 bg-[var(--color-butter)]' : 'w-2 bg-[var(--color-butter)]/40'}`}
            />
          ))}
        </div>
      )}

      {/* Image stack OR fallback */}
      <div
        ref={imgRef}
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
      >
        {hasImages ? (
          images.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={`${project.name} screenshot ${i + 1}`}
              loading="lazy"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${i === active ? 'opacity-100' : 'opacity-0'}`}
              style={{
                filter: hovered ? 'contrast(1.05) saturate(1.1)' : 'grayscale(0.4) contrast(1.1)',
                transition: 'opacity 500ms ease, filter 400ms ease',
              }}
            />
          ))
        ) : (
          /* Typographic fallback when no screenshots provided */
          <div className="absolute inset-0 bg-[var(--color-jet)] text-[var(--color-butter)] flex items-center justify-center p-8 overflow-hidden">
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  'linear-gradient(var(--color-butter) 1px, transparent 1px), linear-gradient(90deg, var(--color-butter) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />
            <div className="relative z-10 text-center">
              <span className="text-label-mono opacity-70">{project.status || 'CASE_FILE'}</span>
              <p className="font-display text-[clamp(48px,8vw,140px)] leading-[0.85] mt-2">
                {project.name.toUpperCase()}
              </p>
              <span className="text-label-mono mt-3 inline-block opacity-80">
                {project.tech.toUpperCase()}
              </span>
            </div>
          </div>
        )}

        {/* Chromatic shift overlay — visible on hover */}
        {hasImages && (
          <>
            <div
              className="absolute inset-0 pointer-events-none mix-blend-screen"
              style={{
                background: hovered
                  ? 'radial-gradient(60% 60% at var(--mx,50%) var(--my,50%), rgba(0,245,255,0.18), transparent 70%)'
                  : 'transparent',
                transition: 'background 280ms ease',
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none mix-blend-multiply"
              style={{
                background: hovered
                  ? 'radial-gradient(60% 60% at var(--mx,50%) var(--my,50%), rgba(255,0,204,0.12), transparent 70%)'
                  : 'transparent',
                transition: 'background 280ms ease',
              }}
            />
          </>
        )}
      </div>

      {/* Bottom hover bar */}
      <div
        className="absolute left-0 right-0 bottom-0 z-20 px-4 py-3 flex items-center justify-between text-label-mono bg-[var(--color-jet)] text-[var(--color-butter)]"
        style={{
          transform: hovered ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 380ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <span>{project.category || 'CASE STUDY'}</span>
        <span className="flex items-center gap-2">
          {project.link ? 'CLICK TO OPEN REPO' : 'NO PUBLIC REPO'} <span>↗</span>
        </span>
      </div>

      {/* Scanline overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(0,0,0,0.6) 0 1px, transparent 1px 3px)',
          mixBlendMode: 'multiply',
        }}
      />
    </div>
  );

  // Wrap in <a> if link present so the whole frame is clickable
  if (project.link) {
    return (
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${project.name} on GitHub`}
        className="block w-full h-full"
      >
        {inner}
      </a>
    );
  }
  return inner;
};

export default ProjectImageFrame;
