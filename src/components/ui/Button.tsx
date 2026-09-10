import type { ButtonHTMLAttributes, CSSProperties, MouseEvent } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  className = '', 
  style,
  ...props 
}: ButtonProps) {
  
  const getStyles = () => {
    let styles: CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      borderRadius: '8px',
      fontWeight: 500,
      cursor: 'pointer',
      transition: 'all 0.2s ease-in-out',
      border: '1px solid transparent',
      width: fullWidth ? '100%' : 'auto',
      fontFamily: 'var(--font-sans)',
    };

    if (size === 'sm') {
      styles = { ...styles, padding: '6px 12px', fontSize: '0.875rem' };
    } else if (size === 'md') {
      styles = { ...styles, padding: '10px 16px', fontSize: '1rem' };
    } else if (size === 'lg') {
      styles = { ...styles, padding: '14px 24px', fontSize: '1.125rem' };
    }

    if (variant === 'primary') {
      styles = {
        ...styles,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        color: 'var(--color-text-primary)',
        border: '1px solid rgba(255,255,255,0.2)',
        backdropFilter: 'blur(10px)',
      };
    } else if (variant === 'secondary') {
      styles = {
        ...styles,
        backgroundColor: 'var(--color-bg-elevated)',
        color: 'var(--color-text-primary)',
        border: '1px solid var(--color-border)',
      };
    } else if (variant === 'ghost') {
      styles = {
        ...styles,
        backgroundColor: 'transparent',
        color: 'var(--color-text-secondary)',
      };
    } else if (variant === 'outline') {
      styles = {
        ...styles,
        backgroundColor: 'transparent',
        color: 'var(--color-text-primary)',
        border: '1px solid var(--color-border)',
      };
    }

    return { ...styles, ...style };
  };

  return (
    <button 
      className={className} 
      style={getStyles()} 
      {...props}
      onMouseEnter={(e: MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.style.filter = 'brightness(1.2)';
        e.currentTarget.style.transform = 'translateY(-1px)';
        if (props.onMouseEnter) props.onMouseEnter(e);
      }}
      onMouseLeave={(e: MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.style.filter = 'none';
        e.currentTarget.style.transform = 'translateY(0)';
        if (props.onMouseLeave) props.onMouseLeave(e);
      }}
    >
      {children}
    </button>
  );
}
