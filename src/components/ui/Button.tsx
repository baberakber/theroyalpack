'use client';

import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';
import { Spinner } from './Spinner';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  asChild?: boolean;
}

const variantClasses = {
  primary:
    'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 active:scale-[0.98] focus-visible:ring-primary-500 shadow-sm hover:shadow-md',
  secondary:
    'bg-white text-text-primary border border-border-default hover:bg-bg-secondary hover:border-border-dark active:bg-bg-tertiary active:scale-[0.98] focus-visible:ring-primary-500',
  accent:
    'bg-accent-500 text-white hover:bg-accent-600 active:bg-accent-700 active:scale-[0.98] focus-visible:ring-accent-500 shadow-sm hover:shadow-md',
  ghost:
    'bg-transparent text-text-primary hover:bg-bg-secondary active:bg-bg-tertiary active:scale-[0.98] focus-visible:ring-primary-500',
  danger:
    'bg-error text-white hover:bg-red-600 active:bg-red-700 active:scale-[0.98] focus-visible:ring-error shadow-sm hover:shadow-md',
};

const sizeClasses = {
  sm: 'h-9 px-3 text-sm gap-1.5',
  md: 'h-11 px-4 text-base gap-2',
  lg: 'h-12 px-6 text-lg gap-2.5',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled,
      leftIcon,
      rightIcon,
      children,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    const buttonClasses = cn(
      'inline-flex items-center justify-center font-medium rounded-lg',
      'transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      variantClasses[variant],
      sizeClasses[size],
      className
    );

    if (asChild) {
      return (
        <Slot ref={ref} className={buttonClasses} {...props}>
          {children}
        </Slot>
      );
    }

    return (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={isDisabled}
        {...props}
      >
        {isLoading ? (
          <Spinner size={size === 'lg' ? 'md' : 'sm'} className="mr-2" />
        ) : (
          leftIcon && <span className="flex-shrink-0">{leftIcon}</span>
        )}
        {children}
        {!isLoading && rightIcon && (
          <span className="flex-shrink-0">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
