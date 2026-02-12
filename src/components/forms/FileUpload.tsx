'use client';

import { useState, useCallback, useRef } from 'react';
import { Upload, X, File, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const ALLOWED_TYPES = [
  'application/pdf',
  'application/postscript', // AI, EPS
  'image/png',
  'image/jpeg',
  'image/tiff',
  'image/vnd.adobe.photoshop', // PSD
];

const ALLOWED_EXTENSIONS = ['.pdf', '.ai', '.eps', '.psd', '.png', '.jpg', '.jpeg', '.tiff'];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  accept?: string;
  maxSize?: number;
  error?: string;
  disabled?: boolean;
  className?: string;
}

export function FileUpload({
  onFileSelect,
  accept = ALLOWED_EXTENSIONS.join(','),
  maxSize = MAX_FILE_SIZE,
  error,
  disabled = false,
  className,
}: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateFile = useCallback((file: File): string | null => {
    // Check file size
    if (file.size > maxSize) {
      return `File must be under ${Math.round(maxSize / (1024 * 1024))}MB`;
    }

    // Check file type
    const extension = '.' + file.name.split('.').pop()?.toLowerCase();
    const isValidExtension = ALLOWED_EXTENSIONS.includes(extension);
    const isValidType = ALLOWED_TYPES.includes(file.type) || file.type === '';

    if (!isValidExtension && !isValidType) {
      return `Accepted formats: ${ALLOWED_EXTENSIONS.map(e => e.replace('.', '').toUpperCase()).join(', ')}`;
    }

    return null;
  }, [maxSize]);

  const handleFile = useCallback((file: File) => {
    const validationResult = validateFile(file);
    if (validationResult) {
      setValidationError(validationResult);
      setSelectedFile(null);
      onFileSelect(null);
      return;
    }

    setValidationError(null);
    setSelectedFile(file);
    onFileSelect(file);
  }, [validateFile, onFileSelect]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, [disabled]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, [disabled, handleFile]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  }, [handleFile]);

  const handleRemove = useCallback(() => {
    setSelectedFile(null);
    setValidationError(null);
    onFileSelect(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }, [onFileSelect]);

  const handleClick = useCallback(() => {
    if (!disabled) {
      inputRef.current?.click();
    }
  }, [disabled]);

  const displayError = error || validationError;

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className={cn('w-full', className)}>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        disabled={disabled}
        className="sr-only"
        aria-label="Upload design file"
      />

      {!selectedFile ? (
        <div
          onClick={handleClick}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={cn(
            'relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer',
            'transition-colors duration-200',
            dragActive
              ? 'border-primary-500 bg-primary-50'
              : displayError
                ? 'border-error bg-red-50'
                : 'border-border-default hover:border-primary-400 hover:bg-bg-secondary',
            disabled && 'opacity-50 cursor-not-allowed hover:border-border-default hover:bg-transparent'
          )}
          role="button"
          tabIndex={disabled ? -1 : 0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleClick();
            }
          }}
          aria-disabled={disabled}
        >
          <Upload
            className={cn(
              'mx-auto h-12 w-12 mb-4',
              dragActive ? 'text-primary-500' : 'text-text-muted'
            )}
            aria-hidden="true"
          />
          <p className="text-sm font-medium text-text-primary mb-1">
            {dragActive ? 'Drop your file here' : 'Drag and drop your design file here'}
          </p>
          <p className="text-sm text-text-muted mb-3">or click to browse</p>
          <p className="text-xs text-text-muted">
            AI, PDF, EPS, PSD, PNG, JPG (max 10MB)
          </p>
        </div>
      ) : (
        <div className="border rounded-lg p-4 bg-bg-secondary animate-in fade-in duration-200">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 p-2 bg-primary-100 rounded-lg">
              <File className="h-6 w-6 text-primary-600" aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary truncate">
                {selectedFile.name}
              </p>
              <p className="text-xs text-text-muted">
                {formatFileSize(selectedFile.size)}
              </p>
            </div>
            <button
              type="button"
              onClick={handleRemove}
              className={cn(
                'flex-shrink-0 p-2 rounded-full',
                'text-text-muted hover:text-error hover:bg-red-50',
                'transition-colors duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500'
              )}
              aria-label="Remove file"
              disabled={disabled}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {displayError && (
        <div className="mt-2 flex items-center gap-1.5 text-sm text-error">
          <AlertCircle className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
          <span>{displayError}</span>
        </div>
      )}
    </div>
  );
}
