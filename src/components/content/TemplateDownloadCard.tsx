import { Download } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TemplateFormat {
  label: string;
  href: string;
  size: string;
}

interface TemplateDownloadCardProps {
  cupSize: string;
  formats: TemplateFormat[];
  className?: string;
}

export function TemplateDownloadCard({
  cupSize,
  formats,
  className,
}: TemplateDownloadCardProps) {
  return (
    <div
      className={cn(
        'bg-bg-secondary rounded-lg p-4',
        'hover:shadow-sm transition-shadow duration-200',
        className
      )}
    >
      {/* Cup size title */}
      <div className="flex items-center gap-2 mb-3">
        <Download className="w-5 h-5 text-primary-500" aria-hidden="true" />
        <h3 className="text-lg font-semibold text-text-primary">{cupSize}</h3>
      </div>

      {/* Format download buttons */}
      <div className="flex flex-wrap gap-2">
        {formats.map((format) => (
          <a
            key={format.label}
            href={format.href}
            download
            className={cn(
              'inline-flex items-center gap-1.5 px-3 py-1.5',
              'text-sm font-medium rounded-md',
              'bg-white border border-border-light',
              'text-primary-600 hover:bg-primary-50',
              'transition-colors duration-200',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500'
            )}
            aria-label={`Download ${cupSize} template in ${format.label} format (${format.size})`}
          >
            {format.label}
          </a>
        ))}
      </div>

      {/* File size info */}
      {formats.length > 0 && (
        <p className="text-xs text-text-muted mt-2">
          ~{formats[0].size}
        </p>
      )}
    </div>
  );
}
