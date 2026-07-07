'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight, Box, Download, ImagePlus, Minus, Plus, Rotate3d, Sparkles, Trash2, Upload } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { SiteContainer } from '@/components/layout/SiteContainer';
import { Cup3DScene, snapRotation } from './Cup3DScene';
import { CupSvg, type CupFacing } from './CupSvg';
import { cn } from '@/lib/utils';
import { clampLogoOffset, DEFAULT_LOGO_OFFSET, getCupShape, type LogoOffset } from '@/lib/cupShapes';
import {
  ACCEPTED_LOGO_TYPES,
  LOGO_SCALE_DEFAULT,
  LOGO_SCALE_MAX,
  LOGO_SCALE_MIN,
  MAX_LOGO_BYTES,
  PAPER_COLOR_SWATCHES,
  getSizesForMaterial,
  getValidSize,
  type ColorSwatchKey,
  type CupMaterial,
  type CupSize,
} from '@/lib/demoConstants';

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-sm font-semibold uppercase tracking-wider text-text-secondary mb-3">
      {children}
    </h3>
  );
}

type LogoSizeControlProps = {
  logoScale: number;
  onLogoScaleChange: (scale: number) => void;
  sizeLabel: string;
  decreaseLabel: string;
  increaseLabel: string;
};

function LogoSizeControl({
  logoScale,
  onLogoScaleChange,
  sizeLabel,
  decreaseLabel,
  increaseLabel,
}: LogoSizeControlProps) {
  return (
    <div className="mt-3 pt-3 border-t border-border-light">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-text-secondary">{sizeLabel}</span>
        <span className="text-xs font-mono text-text-muted">{Math.round(logoScale * 100)}%</span>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() =>
            onLogoScaleChange(
              Math.max(LOGO_SCALE_MIN, Math.round((logoScale - 0.05) * 100) / 100)
            )
          }
          disabled={logoScale <= LOGO_SCALE_MIN}
          className={cn(
            'flex h-9 w-9 items-center justify-center rounded-lg border border-border-light',
            'hover:bg-bg-secondary transition-colors disabled:opacity-40',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500'
          )}
          aria-label={decreaseLabel}
        >
          <Minus className="h-4 w-4" />
        </button>
        <input
          type="range"
          min={LOGO_SCALE_MIN}
          max={LOGO_SCALE_MAX}
          step={0.05}
          value={logoScale}
          onChange={(e) => onLogoScaleChange(Number(e.target.value))}
          className="flex-1 h-2 accent-primary-500 cursor-pointer"
          aria-label={sizeLabel}
        />
        <button
          type="button"
          onClick={() =>
            onLogoScaleChange(
              Math.min(LOGO_SCALE_MAX, Math.round((logoScale + 0.05) * 100) / 100)
            )
          }
          disabled={logoScale >= LOGO_SCALE_MAX}
          className={cn(
            'flex h-9 w-9 items-center justify-center rounded-lg border border-border-light',
            'hover:bg-bg-secondary transition-colors disabled:opacity-40',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500'
          )}
          aria-label={increaseLabel}
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

type LogoUploadSlotProps = {
  id: string;
  label: string;
  logoDataUrl: string | null;
  logoScale: number;
  onLogoScaleChange: (scale: number) => void;
  uploadError: string | null;
  isDragging: boolean;
  onDragStateChange: (dragging: boolean) => void;
  onFileSelect: (file: File) => void;
  onRemove: () => void;
  dragDropLabel: string;
  formatsLabel: string;
  removeLabel: string;
  logoSizeLabel: string;
  logoSizeDecreaseLabel: string;
  logoSizeIncreaseLabel: string;
};

function LogoUploadSlot({
  id,
  label,
  logoDataUrl,
  logoScale,
  onLogoScaleChange,
  uploadError,
  isDragging,
  onDragStateChange,
  onFileSelect,
  onRemove,
  dragDropLabel,
  formatsLabel,
  removeLabel,
  logoSizeLabel,
  logoSizeDecreaseLabel,
  logoSizeIncreaseLabel,
}: LogoUploadSlotProps) {
  return (
    <div>
      <p className="text-xs font-medium text-text-secondary mb-2">{label}</p>
      <label
        htmlFor={id}
        onDragOver={(e) => {
          e.preventDefault();
          onDragStateChange(true);
        }}
        onDragLeave={() => onDragStateChange(false)}
        onDrop={(e) => {
          e.preventDefault();
          onDragStateChange(false);
          const file = e.dataTransfer.files?.[0];
          if (file) onFileSelect(file);
        }}
        className={cn(
          'relative flex flex-col items-center justify-center gap-2 sm:gap-3 rounded-xl border-2 border-dashed p-4 sm:p-6 cursor-pointer transition-all duration-300',
          'focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-500',
          isDragging
            ? 'border-primary-500 bg-primary-50'
            : 'border-border-default bg-bg-secondary hover:border-primary-300 hover:bg-primary-50/50'
        )}
      >
        <input
          id={id}
          type="file"
          accept=".png,.jpg,.jpeg,.svg,image/png,image/jpeg,image/svg+xml"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onFileSelect(file);
            e.target.value = '';
          }}
          className="sr-only"
          aria-label={label}
        />
        {logoDataUrl ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logoDataUrl} alt="" className="max-h-14 max-w-[120px] object-contain" />
            <p className="text-xs text-text-muted">{dragDropLabel}</p>
          </>
        ) : (
          <>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100">
              <Upload className="h-4 w-4 text-primary-600" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-text-primary">{dragDropLabel}</p>
              <p className="text-xs text-text-muted mt-1">{formatsLabel}</p>
            </div>
          </>
        )}
      </label>
      {uploadError && (
        <p className="mt-2 text-xs text-error" role="alert">
          {uploadError}
        </p>
      )}
      {logoDataUrl && (
        <>
          <LogoSizeControl
            logoScale={logoScale}
            onLogoScaleChange={onLogoScaleChange}
            sizeLabel={logoSizeLabel}
            decreaseLabel={logoSizeDecreaseLabel}
            increaseLabel={logoSizeIncreaseLabel}
          />
          <Button
            variant="ghost"
            size="sm"
            className="mt-2 w-full text-text-secondary"
            leftIcon={<Trash2 className="h-4 w-4" />}
            onClick={onRemove}
          >
            {removeLabel}
          </Button>
        </>
      )}
    </div>
  );
}

async function downloadSvgAsPng(svgElement: SVGSVGElement, filename: string) {
  const clone = svgElement.cloneNode(true) as SVGSVGElement;
  const viewBox = clone.viewBox.baseVal;
  const width = viewBox.width || 320;
  const height = viewBox.height || 440;
  const scale = 4;

  clone.setAttribute('width', String(width * scale));
  clone.setAttribute('height', String(height * scale));

  const svgData = new XMLSerializer().serializeToString(clone);
  const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);

  await new Promise<void>((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = width * scale;
      canvas.height = height * scale;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas not supported'));
        return;
      }
      ctx.fillStyle = '#E5E7EB';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Failed to create image'));
          return;
        }
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
        URL.revokeObjectURL(link.href);
        resolve();
      }, 'image/png');
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load SVG'));
    };
    img.src = url;
  });
}

export function CupVisualizer() {
  const t = useTranslations('demo');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const [material, setMaterial] = useState<CupMaterial>('paper');
  const [size, setSize] = useState<CupSize>('8oz');
  const [selectedSwatch, setSelectedSwatch] = useState<ColorSwatchKey | 'custom'>('white');
  const [customColor, setCustomColor] = useState('#0D9488');
  const [frontLogoDataUrl, setFrontLogoDataUrl] = useState<string | null>(null);
  const [backLogoDataUrl, setBackLogoDataUrl] = useState<string | null>(null);
  const [frontUploadError, setFrontUploadError] = useState<string | null>(null);
  const [backUploadError, setBackUploadError] = useState<string | null>(null);
  const [isDraggingFront, setIsDraggingFront] = useState(false);
  const [isDraggingBack, setIsDraggingBack] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [viewMode, setViewMode] = useState<'flat' | '3d'>('flat');
  const [rotation, setRotation] = useState(0);
  const [frontLogoScale, setFrontLogoScale] = useState(LOGO_SCALE_DEFAULT);
  const [backLogoScale, setBackLogoScale] = useState(LOGO_SCALE_DEFAULT);
  const [frontLogoOffset, setFrontLogoOffset] = useState<LogoOffset>(DEFAULT_LOGO_OFFSET);
  const [backLogoOffset, setBackLogoOffset] = useState<LogoOffset>(DEFAULT_LOGO_OFFSET);

  const svgRef = useRef<SVGSVGElement>(null);
  const frontFileInputId = 'demo-front-logo-upload';
  const backFileInputId = 'demo-back-logo-upload';

  const sizes = getSizesForMaterial(material);

  useEffect(() => {
    const shape = getCupShape(material, size);
    setFrontLogoOffset((current) => clampLogoOffset(shape, current, frontLogoScale));
    setBackLogoOffset((current) => clampLogoOffset(shape, current, backLogoScale));
  }, [material, size, frontLogoScale, backLogoScale]);

  const activeColor =
    material === 'plastic'
      ? '#E8F4FC'
      : selectedSwatch === 'custom'
        ? customColor
        : PAPER_COLOR_SWATCHES.find((s) => s.key === selectedSwatch)?.hex ?? '#FFFFFF';

  const handleMaterialChange = (next: CupMaterial) => {
    setMaterial(next);
    setSize((current) => getValidSize(next, current));
    if (next === 'plastic') {
      setSelectedSwatch('white');
    }
  };

  const processFile = useCallback(
    (
      file: File,
      setLogo: (url: string) => void,
      setError: (message: string | null) => void,
      resetScale: () => void,
      resetOffset: () => void
    ) => {
      setError(null);
      const isValidType =
        ACCEPTED_LOGO_TYPES.includes(file.type) ||
        file.name.toLowerCase().endsWith('.svg');
      if (!isValidType) {
        setError(t('uploadError'));
        return;
      }
      if (file.size > MAX_LOGO_BYTES) {
        setError(t('uploadError'));
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setLogo(reader.result as string);
        resetScale();
        resetOffset();
      };
      reader.readAsDataURL(file);
    },
    [t]
  );

  const handleDownload = async () => {
    if (!svgRef.current) return;
    setIsDownloading(true);
    try {
      await downloadSvgAsPng(
        svgRef.current,
        `royal-pack-cup-${material}-${size}.png`
      );
    } finally {
      setIsDownloading(false);
    }
  };

  const quoteHref = `/get-a-quote?cupType=single-wall&size=${encodeURIComponent(size)}`;

  const exportFacing: CupFacing =
    viewMode === 'flat' ? 'front' : snapRotation(rotation) === 0 ? 'front' : 'back';

  const exportLogoDataUrl = exportFacing === 'front' ? frontLogoDataUrl : backLogoDataUrl;
  const exportLogoScale = exportFacing === 'front' ? frontLogoScale : backLogoScale;
  const exportLogoOffset = exportFacing === 'front' ? frontLogoOffset : backLogoOffset;
  const exportShowLogo = Boolean(exportLogoDataUrl);
  const showLogoDragHint = Boolean(frontLogoDataUrl || backLogoDataUrl);

  return (
    <SiteContainer className="min-w-0 px-3 sm:px-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-10 items-start">
        {/* Controls */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-5 sm:space-y-8 order-2 lg:order-1 min-w-0">
          {/* Cup type */}
          <div className="rounded-xl border border-border-light bg-white p-4 sm:p-5 shadow-sm">
            <SectionLabel>{t('cupType')}</SectionLabel>
            <div className="grid grid-cols-2 gap-2">
              {(['paper', 'plastic'] as CupMaterial[]).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleMaterialChange(type)}
                  className={cn(
                    'rounded-lg px-4 py-3 text-sm font-medium transition-all duration-300',
                    'border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
                    material === type
                      ? 'bg-primary-500 text-white border-primary-500 shadow-sm'
                      : 'bg-bg-secondary text-text-secondary border-border-light hover:border-primary-300 hover:bg-primary-50'
                  )}
                >
                  {type === 'paper' ? t('paper') : t('plastic')}
                </button>
              ))}
            </div>
            {material === 'plastic' && (
              <p className="mt-3 text-xs text-text-muted leading-relaxed">{t('plasticNote')}</p>
            )}
          </div>

          {/* Size */}
          <div className="rounded-xl border border-border-light bg-white p-4 sm:p-5 shadow-sm">
            <SectionLabel>{t('size')}</SectionLabel>
            <div className="flex flex-wrap gap-2">
              {sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={cn(
                    'min-w-[3.5rem] rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300',
                    'border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
                    size === s
                      ? 'bg-primary-500 text-white border-primary-500'
                      : 'bg-white text-text-secondary border-border-light hover:border-primary-300 hover:bg-primary-50'
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Color */}
          <div className="rounded-xl border border-border-light bg-white p-4 sm:p-5 shadow-sm">
            <SectionLabel>{t('color')}</SectionLabel>
            {material === 'paper' ? (
              <div className="space-y-4">
                <div className="grid grid-cols-3 min-[400px]:grid-cols-4 gap-2">
                  {PAPER_COLOR_SWATCHES.map((swatch) => (
                    <button
                      key={swatch.key}
                      type="button"
                      title={t(`colors.${swatch.key}`)}
                      onClick={() => setSelectedSwatch(swatch.key)}
                      className={cn(
                        'group flex flex-col items-center gap-1.5 rounded-lg p-2 transition-all duration-300',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
                        selectedSwatch === swatch.key
                          ? 'bg-primary-50 ring-2 ring-primary-500'
                          : 'hover:bg-bg-secondary'
                      )}
                    >
                      <span
                        className={cn(
                          'h-8 w-8 rounded-full border shadow-sm transition-transform group-hover:scale-105',
                          swatch.key === 'white' ? 'border-border-default' : 'border-transparent'
                        )}
                        style={{ backgroundColor: swatch.hex }}
                      />
                      <span className="text-[10px] text-text-muted text-center leading-tight">
                        {t(`colors.${swatch.key}`)}
                      </span>
                    </button>
                  ))}
                </div>
                <div>
                  <label className="text-xs font-medium text-text-secondary mb-2 block">
                    {t('customColor')}
                  </label>
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <input
                      type="color"
                      value={customColor}
                      onChange={(e) => {
                        setCustomColor(e.target.value);
                        setSelectedSwatch('custom');
                      }}
                      className="h-10 w-12 sm:w-14 shrink-0 cursor-pointer rounded-lg border border-border-light bg-white p-1"
                      aria-label={t('customColor')}
                    />
                    <input
                      type="text"
                      value={customColor}
                      onChange={(e) => {
                        const value = e.target.value;
                        setCustomColor(value);
                        if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
                          setSelectedSwatch('custom');
                        }
                      }}
                      className="min-w-0 flex-1 h-10 rounded-lg border border-border-light px-3 text-sm font-mono uppercase focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="#0D9488"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 rounded-lg bg-bg-secondary border border-border-light px-4 py-3">
                <span className="h-10 w-10 rounded-full border-2 border-dashed border-primary-300 bg-gradient-to-br from-white/80 to-primary-100/50" />
                <span className="text-sm font-medium text-text-secondary">{t('colors.clear')}</span>
              </div>
            )}
          </div>

          {/* Logo upload */}
          <div className="rounded-xl border border-border-light bg-white p-4 sm:p-5 shadow-sm space-y-4">
            <SectionLabel>{t('logoUpload')}</SectionLabel>
            <LogoUploadSlot
              id={frontFileInputId}
              label={t('frontLogoUpload')}
              logoDataUrl={frontLogoDataUrl}
              logoScale={frontLogoScale}
              onLogoScaleChange={setFrontLogoScale}
              uploadError={frontUploadError}
              isDragging={isDraggingFront}
              onDragStateChange={setIsDraggingFront}
              onFileSelect={(file) =>
                processFile(
                  file,
                  setFrontLogoDataUrl,
                  setFrontUploadError,
                  () => setFrontLogoScale(LOGO_SCALE_DEFAULT),
                  () => setFrontLogoOffset(DEFAULT_LOGO_OFFSET)
                )
              }
              onRemove={() => {
                setFrontLogoDataUrl(null);
                setFrontUploadError(null);
                setFrontLogoScale(LOGO_SCALE_DEFAULT);
                setFrontLogoOffset(DEFAULT_LOGO_OFFSET);
              }}
              dragDropLabel={t('dragDrop')}
              formatsLabel={t('logoFormats')}
              removeLabel={t('removeLogo')}
              logoSizeLabel={t('logoSize')}
              logoSizeDecreaseLabel={t('logoSizeDecrease')}
              logoSizeIncreaseLabel={t('logoSizeIncrease')}
            />
            <LogoUploadSlot
              id={backFileInputId}
              label={t('backLogoUpload')}
              logoDataUrl={backLogoDataUrl}
              logoScale={backLogoScale}
              onLogoScaleChange={setBackLogoScale}
              uploadError={backUploadError}
              isDragging={isDraggingBack}
              onDragStateChange={setIsDraggingBack}
              onFileSelect={(file) =>
                processFile(
                  file,
                  setBackLogoDataUrl,
                  setBackUploadError,
                  () => setBackLogoScale(LOGO_SCALE_DEFAULT),
                  () => setBackLogoOffset(DEFAULT_LOGO_OFFSET)
                )
              }
              onRemove={() => {
                setBackLogoDataUrl(null);
                setBackUploadError(null);
                setBackLogoScale(LOGO_SCALE_DEFAULT);
                setBackLogoOffset(DEFAULT_LOGO_OFFSET);
              }}
              dragDropLabel={t('dragDrop')}
              formatsLabel={t('logoFormats')}
              removeLabel={t('removeLogo')}
              logoSizeLabel={t('logoSize')}
              logoSizeDecreaseLabel={t('logoSizeDecrease')}
              logoSizeIncreaseLabel={t('logoSizeIncrease')}
            />
          </div>
        </div>

        {/* Preview */}
        <div className="lg:col-span-7 xl:col-span-5 order-1 lg:order-2 min-w-0">
          <div className="lg:sticky lg:top-24 xl:top-28 rounded-2xl border border-border-light bg-gradient-to-b from-bg-secondary to-white p-4 sm:p-6 lg:p-8 xl:p-10 shadow-md">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between mb-4">
              <h2 className="text-base sm:text-lg font-semibold text-text-primary flex items-center gap-2 shrink-0">
                <ImagePlus className="h-5 w-5 text-primary-500 shrink-0" />
                {t('previewLabel')}
              </h2>
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto sm:justify-end">
                <div className="flex rounded-lg border border-border-light p-0.5 bg-bg-secondary w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setViewMode('flat')}
                    className={cn(
                      'flex flex-1 sm:flex-initial items-center justify-center gap-1.5 rounded-md px-3 py-2 sm:py-1.5 text-xs font-medium transition-all',
                      viewMode === 'flat'
                        ? 'bg-white text-text-primary shadow-sm'
                        : 'text-text-muted hover:text-text-secondary'
                    )}
                  >
                    <Box className="h-3.5 w-3.5 shrink-0" />
                    {t('viewFlat')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('3d')}
                    className={cn(
                      'flex flex-1 sm:flex-initial items-center justify-center gap-1.5 rounded-md px-3 py-2 sm:py-1.5 text-xs font-medium transition-all',
                      viewMode === '3d'
                        ? 'bg-white text-text-primary shadow-sm'
                        : 'text-text-muted hover:text-text-secondary'
                    )}
                  >
                    <Rotate3d className="h-3.5 w-3.5 shrink-0" />
                    {t('view3d')}
                  </button>
                </div>
                <span className="text-xs font-medium text-primary-600 bg-primary-50 px-3 py-1.5 sm:py-1 rounded-full whitespace-nowrap">
                  {material === 'paper' ? t('paper') : t('plastic')} · {size}
                </span>
              </div>
            </div>
            <div className="relative mx-auto flex flex-col items-center justify-end rounded-xl overflow-hidden bg-[#E5E7EB] transition-all duration-300 px-3 sm:px-4 py-6 sm:py-8 min-h-[240px] sm:min-h-[280px] lg:min-h-[320px]">
              <Cup3DScene
                material={material}
                size={size}
                color={activeColor}
                frontLogoDataUrl={frontLogoDataUrl}
                backLogoDataUrl={backLogoDataUrl}
                frontLogoScale={frontLogoScale}
                backLogoScale={backLogoScale}
                frontLogoOffset={frontLogoOffset}
                backLogoOffset={backLogoOffset}
                onFrontLogoOffsetChange={setFrontLogoOffset}
                onBackLogoOffsetChange={setBackLogoOffset}
                viewMode={viewMode}
                rotation={rotation}
                onRotationChange={(deg) => setRotation(snapRotation(deg))}
                className="w-full"
              />
              {showLogoDragHint && viewMode === 'flat' && (
                <p className="text-xs text-text-muted text-center mt-3 px-1">{t('dragLogoPosition')}</p>
              )}
              {/* Hidden SVG for accurate PNG export (front or back based on rotation) */}
              <div className="sr-only" aria-hidden>
                <CupSvg
                  ref={svgRef}
                  material={material}
                  size={size}
                  color={activeColor}
                  logoDataUrl={exportLogoDataUrl}
                  logoScale={exportLogoScale}
                  logoOffset={exportLogoOffset}
                  facing={exportFacing}
                  showLogo={exportShowLogo}
                />
              </div>
            </div>
          </div>
        </div>

        {/* CTA sidebar */}
        <div className="lg:col-span-12 xl:col-span-3 order-3 min-w-0">
          <div className="xl:sticky xl:top-28 rounded-2xl border border-border-light bg-white p-4 sm:p-6 shadow-md space-y-5 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0 xl:block xl:space-y-5">
            <div className="flex items-start gap-4 lg:col-span-2 xl:col-span-1">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-100">
                <Sparkles className="h-5 w-5 text-accent-600" />
              </div>
              <div className="min-w-0">
                <h2 className="text-lg sm:text-xl font-bold text-text-primary mb-2">{t('loveDesign')}</h2>
                <p className="text-sm text-text-secondary leading-relaxed">{t('loveDesignDesc')}</p>
              </div>
            </div>
            <div className="space-y-3 lg:col-span-1 xl:pt-0">
              <Button
                variant="accent"
                size="lg"
                className="w-full"
                rightIcon={<ArrowRight className={cn('h-5 w-5', isRTL && 'rotate-180')} />}
                asChild
              >
                <Link href={quoteHref}>{t('getQuote')}</Link>
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="w-full"
                leftIcon={<Download className="h-5 w-5" />}
                onClick={handleDownload}
                isLoading={isDownloading}
              >
                {t('downloadPreview')}
              </Button>
            </div>
            <div className="rounded-lg bg-bg-secondary border border-border-light p-4 text-xs text-text-muted space-y-1 lg:col-span-1 xl:col-span-1">
              <p>
                <span className="font-medium text-text-secondary">{t('cupType')}:</span>{' '}
                {material === 'paper' ? t('paper') : t('plastic')}
              </p>
              <p>
                <span className="font-medium text-text-secondary">{t('size')}:</span> {size}
              </p>
              <p>
                <span className="font-medium text-text-secondary">{t('color')}:</span>{' '}
                {material === 'plastic'
                  ? t('colors.clear')
                  : selectedSwatch === 'custom'
                    ? customColor
                    : t(`colors.${selectedSwatch}`)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </SiteContainer>
  );
}
