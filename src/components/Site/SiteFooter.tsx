import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useLenis } from '../Layout/SmoothScrollProvider';

const EMAIL = 'yash.patkar2004@gmail.com';

const SOCIALS: Array<{ name: string; href: string; download?: boolean }> = [
  { name: 'GitHub', href: 'https://github.com/yashpatkar' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/yash-patkar' },
  { name: 'Résumé', href: '/resume.pdf', download: true },
];

const SiteFooter = () => {
  const footerRef = useRef<HTMLElement>(null);
  const magnetRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useGSAP(
    () => {
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
        if (dist < r.width * 1.1) {
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
    <footer className="aria-footer" id="contact" ref={footerRef}>
      <span className="aria-label aria-label--lit aria-footer-kicker">
        ( Got a backend problem? )
      </span>

      <h2 className="aria-footer-title">
        <span className="aria-line">
          <span>Let's build</span>
        </span>
        <span className="aria-line">
          <span>
            something <em>that scales</em>
          </span>
        </span>
      </h2>

      <div className="aria-footer-cta">
        <div className="aria-magnet" ref={magnetRef}>
          <a className="aria-cta-btn" href={`mailto:${EMAIL}`} data-cursor="link">
            <span>
              Say hi
              <br />→
            </span>
          </a>
        </div>
        <a className="aria-footer-mail" href={`mailto:${EMAIL}`} data-cursor="link">
          {EMAIL}
        </a>
      </div>

      <div className="aria-footer-bar">
        <span className="aria-label">© 2026 Yash Patkar — Mumbai, IN</span>
        <div className="aria-footer-socials">
          {SOCIALS.map((s) => (
            <a
              key={s.name}
              href={s.href}
              data-cursor="link"
              {...(s.download
                ? { download: 'Yash_Patkar_Resume.pdf' }
                : { target: '_blank', rel: 'noreferrer' })}
            >
              {s.name}
            </a>
          ))}
        </div>
        <button
          className="aria-top-btn"
          onClick={() => lenis?.scrollTo(0, { duration: 1.4 })}
          data-cursor="link"
        >
          Back to top ↑
        </button>
      </div>

      <span className="aria-watermark" aria-hidden="true">
        Yash Patkar
      </span>
    </footer>
  );
};

export default SiteFooter;
