import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const SOCIALS: Array<[string, string]> = [
  ['Dribbble', 'https://dribbble.com'],
  ['Behance', 'https://behance.net'],
  ['Instagram', 'https://instagram.com'],
  ['LinkedIn', 'https://linkedin.com'],
];

interface Props {
  reduced: boolean;
  onTop: () => void;
}

const AriaFooter = ({ reduced, onTop }: Props) => {
  const footerRef = useRef<HTMLElement>(null);
  const magnetRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (reduced) return;

      gsap.fromTo(
        '.aria-footer-title .aria-line > span',
        { yPercent: 112 },
        {
          yPercent: 0,
          duration: 1.1,
          ease: 'power4.out',
          stagger: 0.09,
          scrollTrigger: { trigger: '.aria-footer-title', start: 'top 85%', once: true },
        }
      );

      gsap.fromTo(
        '.aria-watermark',
        { xPercent: -4 },
        {
          xPercent: 4,
          ease: 'none',
          scrollTrigger: {
            trigger: '.aria-watermark',
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: true,
          },
        }
      );
    },
    { scope: footerRef }
  );

  /* Magnetic CTA button */
  useGSAP(
    () => {
      const wrap = magnetRef.current;
      if (!wrap || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

      const xTo = gsap.quickTo(wrap, 'x', { duration: 0.4, ease: 'power3.out' });
      const yTo = gsap.quickTo(wrap, 'y', { duration: 0.4, ease: 'power3.out' });

      const onMove = (e: MouseEvent) => {
        const r = wrap.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        const dist = Math.hypot(dx, dy);
        const range = r.width * 1.1;
        if (dist < range) {
          xTo(dx * 0.32);
          yTo(dy * 0.32);
        } else {
          xTo(0);
          yTo(0);
        }
      };

      window.addEventListener('mousemove', onMove);
      return () => window.removeEventListener('mousemove', onMove);
    },
    { scope: footerRef }
  );

  return (
    <footer className="aria-footer" id="aria-contact" ref={footerRef}>
      <span className="aria-label aria-label--lit aria-footer-kicker">
        ( Got a project in mind? )
      </span>

      <h2 className="aria-footer-title">
        <span className="aria-line">
          <span>Let's make</span>
        </span>
        <span className="aria-line">
          <span>
            something <em>unforgettable</em>
          </span>
        </span>
      </h2>

      <div className="aria-footer-cta">
        <div className="aria-magnet" ref={magnetRef}>
          <a className="aria-cta-btn" href="mailto:hello@ariasato.design" data-cursor="link">
            <span>
              Say hi
              <br />→
            </span>
          </a>
        </div>
        <a className="aria-footer-mail" href="mailto:hello@ariasato.design" data-cursor="link">
          hello@ariasato.design
        </a>
      </div>

      <div className="aria-footer-bar">
        <span className="aria-label">© 2026 Aria Sato — Tokyo, JP</span>
        <div className="aria-footer-socials">
          {SOCIALS.map(([name, href]) => (
            <a key={name} href={href} target="_blank" rel="noreferrer" data-cursor="link">
              {name}
            </a>
          ))}
        </div>
        <button className="aria-top-btn" onClick={onTop} data-cursor="link">
          Back to top ↑
        </button>
      </div>

      <span className="aria-watermark" aria-hidden="true">
        Aria Sato
      </span>
    </footer>
  );
};

export default AriaFooter;
