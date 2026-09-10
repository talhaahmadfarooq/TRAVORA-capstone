import React from 'react';
import type { ButtonHTMLAttributes } from 'react';

interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'solid';
  icon?: React.ReactNode;
}

export function GlassButton({ 
  children, 
  variant = 'secondary', 
  icon,
  className = '', 
  style,
  ...props 
}: GlassButtonProps) {
  
  let background = 'rgba(255, 255, 255, 0.05)';
  let backdropFilter = 'blur(8px)';
  let border = '1px solid var(--glass-border-secondary)';
  let color = 'var(--color-text-primary)';
  let hoverFilter = 'brightness(1.2)';

  if (variant === 'primary') {
    background = 'rgba(20, 20, 20, 0.6)';
    backdropFilter = 'blur(12px)';
    border = '1px solid var(--glass-border-primary)';
  } else if (variant === 'solid') {
    background = 'linear-gradient(180deg, rgba(40, 45, 55, 0.8) 0%, rgba(20, 25, 35, 0.9) 100%)';
    backdropFilter = 'blur(12px)';
    border = '1px solid rgba(255, 255, 255, 0.15)';
    color = 'var(--color-text-primary)';
    hoverFilter = 'brightness(1.15)';
  }

  return (
    <button
      className={`glass-button ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        padding: '12px 24px',
        borderRadius: '999px',
        fontFamily: 'var(--font-sans)',
        fontSize: '0.9rem',
        fontWeight: 500,
        color,
        background,
        backdropFilter,
        border,
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
        boxShadow: variant === 'solid' ? '0 8px 24px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.1)' : '0 4px 12px rgba(0,0,0,0.1)',
        ...style
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.filter = hoverFilter;
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = variant === 'solid' ? '0 12px 32px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.2)' : '0 8px 16px rgba(0,0,0,0.2)';
        if (props.onMouseEnter) props.onMouseEnter(e);
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.filter = 'none';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = variant === 'solid' ? '0 8px 24px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.1)' : '0 4px 12px rgba(0,0,0,0.1)';
        if (props.onMouseLeave) props.onMouseLeave(e);
      }}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
