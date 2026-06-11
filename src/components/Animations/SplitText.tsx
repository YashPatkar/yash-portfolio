import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type TagName = 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'div';

interface Props {
  text: string;
  as?: TagName;
  className?: string;
  stagger?: number;
  delay?: number;
}

const SplitText = ({ text, as = 'span', className = '', stagger = 0.05, delay = 0 }: Props) => {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const inners = el.querySelectorAll<HTMLElement>('.split-word > span');
    if (!inners.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        inners,
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 0.9,
          ease: 'expo.out',
          stagger,
          delay,
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [text, stagger, delay]);

  const words = text.split(' ');
  const inner: ReactNode = words.map((w, i) => (
    <span key={`${w}-${i}`} className="split-word">
      <span>
        {w}
        {i < words.length - 1 ? ' ' : ''}
      </span>
    </span>
  ));

  const refProps = { ref: ref as React.RefObject<never>, className };

  if (as === 'h1') return <h1 {...refProps}>{inner}</h1>;
  if (as === 'h2') return <h2 {...refProps}>{inner}</h2>;
  if (as === 'h3') return <h3 {...refProps}>{inner}</h3>;
  if (as === 'h4') return <h4 {...refProps}>{inner}</h4>;
  if (as === 'p') return <p {...refProps}>{inner}</p>;
  if (as === 'div') return <div {...refProps}>{inner}</div>;
  return <span {...refProps}>{inner}</span>;
};

export default SplitText;
