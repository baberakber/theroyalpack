'use client';

import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md';
}

const variantClasses = {
  default: 'bg-bg-tertiary text-text-primary',
  primary: 'bg-primary-100 text-primary-700',
  secondary: 'bg-bg-secondary text-text-secondary border border-border-light',
  accent: 'bg-accent-100 text-accent-700',
  success: 'bg-eco-100 text-eco-700',
  warning: 'bg-accent-100 text-accent-700',
  error: 'bg-red-100 text-red-700',
};

const sizeClasses = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-2.5 py-1',
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center font-medium rounded-full',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';
