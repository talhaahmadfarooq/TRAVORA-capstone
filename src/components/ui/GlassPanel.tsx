import type { HTMLAttributes } from 'react';

interface GlassPanelProps extends HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export function GlassPanel({ children, className = '', hoverEffect = false, ...props }: GlassPanelProps) {
  const baseClass = 'glass-panel';
  const hoverClass = hoverEffect ? 'glass-panel-hover' : '';
  const combinedClassName = `${baseClass} ${hoverClass} ${className}`.trim();

  return (
    <div className={combinedClassName} {...props} style={{ borderRadius: '12px', ...props.style }}>
      {children}
    </div>
  );
}
