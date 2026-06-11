import {
  createElement,
  useEffect,
  useRef,
  type ElementType,
  type ReactNode,
  type ComponentPropsWithoutRef,
} from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Props<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  duration?: number;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>;

const ScrollReveal = <T extends ElementType = 'div'>({
  as,
  children,
  className = '',
  y = 40,
  delay = 0,
  duration = 0.8,
  ...rest
}: Props<T>) => {
  const ref = useRef<HTMLElement | null>(null);
  const Tag: ElementType = as ?? 'div';

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration,
          delay,
          ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [delay, duration, y]);

  return createElement(Tag, { ref, className, ...rest }, children);
};

export default ScrollReveal;
