'use client';

import {
  MessageCircle,
  PenTool,
  CheckCircle,
  Factory,
  Truck,
  type LucideIcon,
} from 'lucide-react';
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const steps: ProcessStep[] = [
  {
    number: '01',
    title: 'Inquiry',
    description: 'Tell us your cup type, size, quantity, and share your logo or artwork.',
    icon: MessageCircle,
  },
  {
    number: '02',
    title: 'Design',
    description: 'Our team creates a print-ready mockup. We offer free design support.',
    icon: PenTool,
  },
  {
    number: '03',
    title: 'Approval',
    description: 'Review the digital proof. Request revisions until you\'re satisfied.',
    icon: CheckCircle,
  },
  {
    number: '04',
    title: 'Production',
    description: 'Cups are printed and quality-checked in our facility.',
    icon: Factory,
  },
  {
    number: '05',
    title: 'Delivery',
    description: 'Packed and shipped to your location. Track your order online.',
    icon: Truck,
  },
];

function ProcessStepItem({
  step,
  index,
  isLast,
  isVisible,
}: {
  step: ProcessStep;
  index: number;
  isLast: boolean;
  isVisible: boolean;
}) {
  const Icon = step.icon;

  return (
    <li
      className={cn(
        'relative flex flex-col items-center',
        'lg:flex-1',
        'animate-fade-in-up',
        isVisible && 'is-visible'
      )}
      style={{ animationDelay: `${index * 200}ms` }}
    >
      {/* Connector Line (desktop) */}
      {!isLast && (
        <div
          className="hidden lg:block absolute top-7 left-[calc(50%+28px)] w-[calc(100%-56px)] h-0.5 border-t-2 border-dashed border-border-default"
          aria-hidden="true"
        />
      )}

      {/* Step Circle */}
      <div
        className={cn(
          'relative z-10 w-14 h-14 rounded-full bg-primary-500 flex items-center justify-center',
          'shadow-md transition-transform duration-300 hover:scale-110'
        )}
      >
        <span className="text-white font-bold text-lg">{step.number}</span>
      </div>

      {/* Icon */}
      <div className="mt-3 w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
        <Icon className="w-5 h-5 text-primary-600" />
      </div>

      {/* Content */}
      <div className="mt-3 text-center max-w-[200px]">
        <h4 className="text-lg font-semibold text-text-primary">{step.title}</h4>
        <p className="mt-1 text-sm text-text-secondary">{step.description}</p>
      </div>

      {/* Connector Line (mobile) */}
      {!isLast && (
        <div
          className="lg:hidden w-0.5 h-8 border-l-2 border-dashed border-border-default my-4"
          aria-hidden="true"
        />
      )}
    </li>
  );
}

export function ProcessTimeline() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2
          className={cn(
            'text-2xl lg:text-3xl font-bold text-text-primary mb-12 text-center',
            'animate-fade-in-up',
            isVisible && 'is-visible'
          )}
        >
          From Design to Delivery in 5 Steps
        </h2>

        <nav aria-label="Printing process steps">
          <ol className="flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-between gap-4 lg:gap-0">
            {steps.map((step, index) => (
              <ProcessStepItem
                key={step.number}
                step={step}
                index={index}
                isLast={index === steps.length - 1}
                isVisible={isVisible}
              />
            ))}
          </ol>
        </nav>
      </div>
    </section>
  );
}
