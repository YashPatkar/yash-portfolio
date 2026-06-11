import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useLenis } from '../Layout/SmoothScrollProvider';

const ITEMS: Array<[string, boolean]> = [
  ['Backend Engineering', false],
  ['ai & rag', true],
  ['REST APIs', false],
  ['system design', true],
  ['Databases', false],
  ['llm integration', true],
];

const Half = () => (
  <span className="aria-marquee-seg" aria-hidden="true">
    {ITEMS.map(([label, serif]) => (
      <span key={label} style={{ display: 'inline-flex', alignItems: 'center' }}>
        {serif ? <em>{label}</em> : <span>{label}</span>}
        <i>✺</i>
      </span>
    ))}
  </span>
);

const SiteMarquee = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  /* Velocity-reactive skew */
  useEffect(() => {
    const track = trackRef.current;
    if (!track || !lenis) return;
    const skewTo = gsap.quickTo(track, 'skewX', { duration: 0.5, ease: 'power3.out' });
    const onScroll = (e: { velocity: number }) => {
      skewTo(gsap.utils.clamp(-9, 9, e.velocity * 0.32));
    };
    lenis.on('scroll', onScroll);
    return () => lenis.off('scroll', onScroll);
  }, [lenis]);

  return (
    <div className="aria-marquee">
      <div className="aria-marquee-track" ref={trackRef}>
        <Half />
        <Half />
      </div>
    </div>
  );
};

export default SiteMarquee;
