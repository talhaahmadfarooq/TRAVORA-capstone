import React from 'react';
import type { InputHTMLAttributes } from 'react';

interface GlassInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export function GlassInput({ className = '', icon, style, ...props }: GlassInputProps) {
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {icon && (
        <div style={{
          position: 'absolute',
          left: '16px',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          alignItems: 'center',
          color: 'var(--color-text-muted)',
          pointerEvents: 'none'
        }}>
          {icon}
        </div>
      )}
      <input
        className={`glass-input ${className}`}
        style={{
          width: '100%',
          padding: `14px 16px 14px ${icon ? '48px' : '16px'}`,
          borderRadius: '12px',
          background: 'rgba(20, 20, 20, 0.4)',
          backdropFilter: 'blur(8px)',
          border: '1px solid var(--glass-border-secondary)',
          color: 'var(--color-text-primary)',
          fontFamily: 'var(--font-sans)',
          fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
          outline: 'none',
          transition: 'all 0.3s ease',
          ...style
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = 'var(--glass-border-highlight)';
          e.currentTarget.style.background = 'rgba(30, 30, 30, 0.6)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = 'var(--glass-border-secondary)';
          e.currentTarget.style.background = 'rgba(20, 20, 20, 0.4)';
        }}
        {...props}
      />
    </div>
  );
}


