import type { HTMLAttributes } from 'react';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'info';
}

export function Badge({ children, variant = 'default', className = '', style, ...props }: BadgeProps) {
  let baseColor = 'var(--color-bg-elevated)';
  let textColor = 'var(--color-text-primary)';
  let border = '1px solid var(--color-border)';

  if (variant === 'success') {
    baseColor = 'rgba(16, 185, 129, 0.1)';
    textColor = '#34d399';
    border = '1px solid rgba(16, 185, 129, 0.2)';
  } else if (variant === 'warning') {
    baseColor = 'rgba(245, 158, 11, 0.1)';
    textColor = '#fbbf24';
    border = '1px solid rgba(245, 158, 11, 0.2)';
  } else if (variant === 'info') {
    baseColor = 'rgba(56, 189, 248, 0.1)';
    textColor = 'var(--color-accent-cyan)';
    border = '1px solid rgba(56, 189, 248, 0.2)';
  }

  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '2px 8px',
        borderRadius: '9999px',
        fontSize: '0.75rem',
        fontWeight: 500,
        backgroundColor: baseColor,
        color: textColor,
        border,
        whiteSpace: 'nowrap',
        ...style
      }}
      {...props}
    >
      {children}
    </span>
  );
}
