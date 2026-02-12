'use client';

import { forwardRef, type InputHTMLAttributes } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const checkboxId = id || label?.toLowerCase().replace(/\s+/g, '-');
    const hasError = !!error;

    return (
      <div className="flex flex-col">
        <label className="inline-flex items-center gap-3 cursor-pointer">
          <div className="relative">
            <input
              ref={ref}
              type="checkbox"
              id={checkboxId}
              className={cn(
                'peer sr-only',
                className
              )}
              aria-invalid={hasError}
              aria-describedby={hasError ? `${checkboxId}-error` : undefined}
              {...props}
            />
            <div
              className={cn(
                'w-5 h-5 rounded border-2 transition-colors duration-200',
                'flex items-center justify-center',
                'peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-primary-500',
                'peer-checked:bg-primary-500 peer-checked:border-primary-500',
                'peer-disabled:opacity-50 peer-disabled:cursor-not-allowed',
                hasError
                  ? 'border-error'
                  : 'border-border-default peer-checked:border-primary-500'
              )}
            >
              <Check
                className="w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                strokeWidth={3}
              />
            </div>
          </div>
          {label && (
            <span className="text-sm text-text-primary select-none">{label}</span>
          )}
        </label>
        {error && (
          <p id={`${checkboxId}-error`} className="mt-1.5 text-sm text-error ml-8">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
