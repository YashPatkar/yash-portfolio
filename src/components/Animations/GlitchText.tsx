import { createElement, type ElementType, type ComponentPropsWithoutRef } from 'react';

type Props<T extends ElementType> = {
  as?: T;
  text: string;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'text' | 'className'>;

const GlitchText = <T extends ElementType = 'span'>({
  as,
  text,
  className = '',
  ...rest
}: Props<T>) => {
  const Tag: ElementType = as ?? 'span';
  return createElement(
    Tag,
    { className: `glitch ${className}`, 'data-text': text, ...rest },
    text
  );
};

export default GlitchText;
