import { useEffect, useRef } from 'react';
import Magnetic from '../Animations/Magnetic';

const Footer = () => {
  const ctaRef = useRef<HTMLAnchorElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const envelopeRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / r.width;
      const dy = (e.clientY - cy) / r.height;
      el.style.transform = `translate(${dx * 14}px, ${dy * 8}px)`;
      // Envelope orbits ahead of cursor
      const env = envelopeRef.current;
      if (env) {
        env.style.transform = `translate(${dx * 36}px, ${dy * 22}px) rotate(${dx * 12}deg)`;
      }
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // SVG draw on intersection
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) svg.classList.add('is-drawn');
        });
      },
      { threshold: 0.4 }
    );
    obs.observe(svg);
    return () => obs.disconnect();
  }, []);

  return (
    <footer
      data-hint="LET'S TALK"
      className="relative w-full bg-[var(--color-jet)] text-[var(--color-butter)] brutal-border-t overflow-hidden noise"
    >
      {/* Massive CTA band */}
      <div className="relative px-4 md:px-12 pt-20 pb-10 flex flex-col items-center justify-center text-center">
        <span className="text-label-mono opacity-70">/ LET&apos;S BUILD</span>

        {/* Floating envelope that orbits with the cursor */}
        <svg
          ref={envelopeRef}
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="absolute right-8 md:right-16 top-12 w-10 h-10 md:w-14 md:h-14 text-[var(--color-butter)] transition-transform duration-300 ease-out"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect x="2" y="5" width="20" height="14" rx="1" />
          <path d="M2 7l10 7 10-7" />
        </svg>

        <div className="relative inline-block">
          <a
            ref={ctaRef}
            href="mailto:yash.patkar2004@gmail.com"
            className="big-cta mt-6 inline-block"
            data-cursor="view"
            data-cursor-label="EMAIL"
            data-magnetic
          >
            LET&apos;S TALK ↗
          </a>
          {/* SVG draw underline */}
          <svg
            ref={svgRef}
            className="svg-draw absolute left-0 right-0 -bottom-4 md:-bottom-8 w-full h-6 md:h-10 pointer-events-none"
            viewBox="0 0 600 40"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M5 28 C 120 10, 280 38, 420 18 S 590 30, 595 22"
              stroke="var(--color-butter)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <p className="mt-10 max-w-xl text-sm md:text-base opacity-80 uppercase font-bold tracking-wider">
          Available for backend-heavy product work, integrations, and reliability deep-dives.
        </p>
      </div>

      {/* Meta row */}
      <div className="px-4 md:px-8 py-8 brutal-border-t flex flex-col md:flex-row justify-between items-start gap-6">
        <div className="flex flex-col gap-2">
          <span className="font-headline font-black text-xl italic">YASH_PATKAR</span>
          <span className="font-headline font-bold text-xs uppercase tracking-widest opacity-90">
            ©{new Date().getFullYear()}_BACKEND_ARCHITECT_ALL_RIGHTS_RESERVED
          </span>
          <span className="font-headline font-black text-sm uppercase tracking-tighter mt-2 text-[var(--color-paper)]">
            BUILT × SHIP
          </span>
        </div>
        <div className="flex flex-wrap gap-4 md:gap-6">
          <Magnetic strength={0.4}>
            <a
              href="https://github.com/yashpatkar"
              target="_blank"
              rel="noopener noreferrer"
              className="font-headline font-bold text-xs uppercase tracking-widest border-r-2 border-[var(--color-butter)] pr-4 md:pr-6 hover:text-[var(--color-paper)] transition-colors"
              data-cursor="view"
              data-cursor-label="GH"
              data-magnetic
            >
              GITHUB
            </a>
          </Magnetic>
          <Magnetic strength={0.4}>
            <a
              href="https://www.linkedin.com/in/yash-patkar"
              target="_blank"
              rel="noopener noreferrer"
              className="font-headline font-bold text-xs uppercase tracking-widest border-r-2 border-[var(--color-butter)] pr-4 md:pr-6 hover:text-[var(--color-paper)] transition-colors"
              data-cursor="view"
              data-cursor-label="IN"
              data-magnetic
            >
              LINKEDIN
            </a>
          </Magnetic>
          <Magnetic strength={0.4}>
            <a
              href="mailto:yash.patkar2004@gmail.com"
              className="font-headline font-bold text-xs uppercase tracking-widest hover:text-[var(--color-paper)] transition-colors"
              data-cursor="view"
              data-cursor-label="@"
              data-magnetic
            >
              EMAIL
            </a>
          </Magnetic>
        </div>
      </div>

      <div className="px-4 md:px-8 pb-6 overflow-hidden">
        <p className="font-headline text-[clamp(72px,18vw,280px)] leading-[0.82] whitespace-nowrap text-[var(--color-butter)]/80 select-none">
          BUILT × SHIPPED.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
