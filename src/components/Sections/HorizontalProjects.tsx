import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CONTACT from '../data/resume';
import Magnetic from '../Animations/Magnetic';
import ProjectImageFrame from '../ui/ProjectImageFrame';

gsap.registerPlugin(ScrollTrigger);

const HorizontalProjects = () => {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLSpanElement | null>(null);
  const counterRef = useRef<HTMLSpanElement | null>(null);

  const projects = CONTACT.projects;
  // panels: intro + N projects + outro
  const panels = projects.length + 2;

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    const TRIGGER_ID = 'horizontal-projects-trigger';
    // Kill any prior instance (StrictMode double-mount, HMR, route remount)
    ScrollTrigger.getById(TRIGGER_ID)?.kill(true);

    // The pin spacer already reserves the horizontal travel distance —
    // the wrap itself must stay at its natural 100vh (the .h-scroll-pin),
    // otherwise the extra height shows up as a blank gap after the pin.
    wrap.style.height = '';

    const tween = gsap.to(track, {
      x: () => -(track.scrollWidth - window.innerWidth),
      ease: 'none',
      scrollTrigger: {
        id: TRIGGER_ID,
        trigger: wrap,
        start: 'top top',
        end: () => `+=${track.scrollWidth - window.innerWidth}`,
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (progressRef.current) {
            progressRef.current.style.width = `${self.progress * 100}%`;
          }
          if (counterRef.current) {
            const idx = Math.min(
              projects.length,
              Math.max(1, Math.ceil(self.progress * projects.length))
            );
            counterRef.current.textContent = `${String(idx).padStart(2, '0')} / ${String(projects.length).padStart(2, '0')}`;
          }
        },
      },
    });

    const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 300);

    return () => {
      window.clearTimeout(refreshId);
      ScrollTrigger.getById(TRIGGER_ID)?.kill(true);
      tween.kill();
    };
  }, [panels, projects.length]);

  return (
    <section
      ref={wrapRef}
      data-hint="DRAG · CLICK"
      className="h-scroll-wrap bg-[var(--color-butter)] text-[var(--color-jet)]"
      aria-label="Selected works"
    >
      <div className="h-scroll-pin brutal-border-b">
        <div ref={trackRef} className="h-scroll-track">
          {/* Intro panel */}
          <div className="h-scroll-panel flex items-center px-6 md:px-16">
            <div className="max-w-3xl">
              <span className="text-label-mono">/ SELECTED WORK — 01</span>
              <h2 className="text-h-xl mt-4 leading-[0.85]">
                SCROLL <span className="font-script lowercase">sideways.</span>
              </h2>
              <p className="text-body-lg mt-6 max-w-xl">
                Keep scrolling. The page locks and pans through every shipped
                system before releasing back to vertical flow.
              </p>
              <div className="mt-8 flex items-center gap-4">
                <span className="text-label-mono">SCROLL</span>
                <div className="h-px w-24 bg-[var(--color-jet)]" />
                <span className="text-4xl font-display">→</span>
              </div>
            </div>
          </div>

          {/* Project panels */}
          {projects.map((p, i) => (
            <div
              key={p.name}
              className="h-scroll-panel grid grid-cols-1 md:grid-cols-2 items-stretch"
              data-cursor="drag"
              data-cursor-label="DRAG"
            >
              <div className="flex flex-col justify-center p-6 md:p-16 gap-6 border-r-0 md:border-r-4 border-[var(--color-jet)]">
                <div className="flex items-center gap-3">
                  <span className="chip text-[var(--color-jet)]">
                    <span>{String(i + 1).padStart(2, '0')}</span>
                  </span>
                  <span className="text-label-mono">{p.category || 'CASE STUDY'}</span>
                  <span className="text-label-mono opacity-60">{p.year}</span>
                </div>
                <h3 className="text-h-lg leading-[0.9]">{p.name.toUpperCase()}</h3>
                <p className="font-script text-3xl md:text-4xl">{p.hook.toLowerCase()}.</p>
                <p className="text-body-lg max-w-xl">{p.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {(p.tags || p.tech.split(',').slice(0, 4)).map((t) => (
                    <span key={t} className="chip text-[var(--color-jet)]">
                      <span>{t.toString().trim()}</span>
                    </span>
                  ))}
                </div>
                {p.link && (
                  <Magnetic strength={0.4}>
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="brutal-btn"
                      data-cursor="view"
                      data-cursor-label="OPEN"
                      data-magnetic
                    >
                      OPEN REPO ↗
                    </a>
                  </Magnetic>
                )}
              </div>

              <div className="relative w-full h-full min-h-[60vh] md:min-h-full p-6 md:p-10">
                <ProjectImageFrame project={p} index={i} />
              </div>
            </div>
          ))}

          {/* Outro panel */}
          <div className="h-scroll-panel flex flex-col items-center justify-center px-6 md:px-16 text-center">
            <span className="text-label-mono">/ END OF REEL</span>
            <h3 className="font-display text-[clamp(64px,12vw,200px)] leading-[0.85] mt-4">
              MORE <span className="font-script lowercase">soon.</span>
            </h3>
            <p className="max-w-xl mt-6 text-body-lg">
              Pipeline updates ship monthly. Keep scrolling — vertical flow
              resumes below.
            </p>
          </div>
        </div>

        {/* Pinned UI overlay */}
        <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20 pointer-events-none">
          <span className="text-label-mono">/ WORKS · HORIZONTAL</span>
          <span ref={counterRef} className="text-label-mono">
            01 / {String(projects.length).padStart(2, '0')}
          </span>
        </div>
        <div className="h-scroll-progress">
          <span ref={progressRef} />
        </div>
      </div>
    </section>
  );
};

export default HorizontalProjects;
