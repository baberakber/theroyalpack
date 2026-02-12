'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface StatCounterProps {
  value: number;
  suffix?: string;
  label: string;
  duration?: number;
  className?: string;
}

function getPrefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export function StatCounter({
  value,
  suffix = '',
  label,
  duration = 2000,
  className,
}: StatCounterProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [showSuffix, setShowSuffix] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const animateCount = useCallback(() => {
    if (hasAnimated) return;

    // Check for reduced motion preference
    if (getPrefersReducedMotion()) {
      setCount(value);
      setShowSuffix(true);
      setHasAnimated(true);
      return;
    }

    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);

      setCount(Math.floor(easedProgress * value));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(value);
        setShowSuffix(true);
        setHasAnimated(true);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration, hasAnimated]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // If reduced motion, show immediately
    if (getPrefersReducedMotion()) {
      setCount(value);
      setShowSuffix(true);
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          animateCount();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [animateCount, hasAnimated, value]);

  // Format number with commas for large numbers
  const formattedCount = count.toLocaleString();

  return (
    <div
      ref={ref}
      className={cn('text-center', className)}
      aria-label={`${value}${suffix} ${label}`}
    >
      <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
        {formattedCount}
        <span
          className={cn(
            'transition-opacity duration-300',
            showSuffix ? 'opacity-100' : 'opacity-0'
          )}
        >
          {suffix}
        </span>
      </div>
      <div className="text-white/80 text-sm lg:text-base">{label}</div>
    </div>
  );
}
