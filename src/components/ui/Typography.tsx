import React from 'react';

type TypographyProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  as?: React.ElementType;
};

export function Display({ children, className = '', style, as: Component = 'h1' }: TypographyProps) {
  const Comp = Component as any;
  return (
    <Comp 
      className={className} 
      style={{
        fontFamily: 'var(--font-serif)',
        fontSize: 'clamp(3rem, 8vw, 6rem)',
        fontWeight: 500,
        lineHeight: 1.1,
        letterSpacing: '-0.03em',
        color: 'var(--color-text-primary)',
        ...style
      }}
    >
      {children}
    </Comp>
  );
}

export function Heading({ children, className = '', style, as: Component = 'h2' }: TypographyProps) {
  const Comp = Component as any;
  return (
    <Comp 
      className={className} 
      style={{
        fontFamily: 'var(--font-serif)',
        fontSize: 'clamp(2rem, 4vw, 3rem)',
        fontWeight: 500,
        lineHeight: 1.2,
        letterSpacing: '-0.02em',
        color: 'var(--color-text-primary)',
        ...style
      }}
    >
      {children}
    </Comp>
  );
}

export function Body({ children, className = '', style, as: Component = 'p' }: TypographyProps) {
  const Comp = Component as any;
  return (
    <Comp 
      className={className} 
      style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '1rem',
        lineHeight: 1.6,
        fontWeight: 400,
        color: 'var(--color-text-secondary)',
        ...style
      }}
    >
      {children}
    </Comp>
  );
}

export function Meta({ children, className = '', style, as: Component = 'span' }: TypographyProps) {
  const Comp = Component as any;
  return (
    <Comp 
      className={className} 
      style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '0.875rem',
        fontWeight: 500,
        letterSpacing: '0.02em',
        color: 'var(--color-text-muted)',
        ...style
      }}
    >
      {children}
    </Comp>
  );
}

export function Label({ children, className = '', style, as: Component = 'span' }: TypographyProps) {
  const Comp = Component as any;
  return (
    <Comp 
      className={className} 
      style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '0.75rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        color: 'var(--color-text-primary)',
        ...style
      }}
    >
      {children}
    </Comp>
  );
}
