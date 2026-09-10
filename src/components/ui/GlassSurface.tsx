import type { HTMLAttributes } from 'react';

interface GlassSurfaceProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'secondary' | 'tertiary';
  hoverEffect?: boolean;
}

export function GlassSurface({ 
  children, 
  variant = 'secondary', 
  hoverEffect = false,
  className = '', 
  ...props 
}: GlassSurfaceProps) {
  const baseClass = `glass-${variant}`;
  const hoverClass = hoverEffect ? 'glass-hover-effect' : '';
  const combinedClassName = `${baseClass} ${hoverClass} ${className}`.trim();

  return (
    <div className={combinedClassName} {...props} style={{ borderRadius: '16px', ...props.style }}>
      {children}
    </div>
  );
}

