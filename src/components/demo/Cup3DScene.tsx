'use client';

import { forwardRef, useCallback, useMemo, useRef, useState } from 'react';
import { Rotate3d } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { CupSvg, type CupFacing } from './CupSvg';
import { DEFAULT_LOGO_OFFSET, getScaledPreviewHeight, type LogoOffset } from '@/lib/cupShapes';
import type { CupMaterial, CupSize } from '@/lib/demoConstants';
import { cn } from '@/lib/utils';

export type Cup3DSceneProps = {
  material: CupMaterial;
  size: CupSize;
  color: string;
  frontLogoDataUrl?: string | null;
  backLogoDataUrl?: string | null;
  frontLogoScale?: number;
  backLogoScale?: number;
  frontLogoOffset?: LogoOffset;
  backLogoOffset?: LogoOffset;
  onFrontLogoOffsetChange?: (offset: LogoOffset) => void;
  onBackLogoOffsetChange?: (offset: LogoOffset) => void;
  viewMode: 'flat' | '3d';
  rotation: number;
  onRotationChange: (deg: number) => void;
  className?: string;
};

export type CupRotation = 0 | 180;

/** Snap rotation to front (0°) or back (180°) only — no side views. */
export function snapRotation(deg: number): CupRotation {
  const a = ((deg % 360) + 360) % 360;
  return a > 90 && a <= 270 ? 180 : 0;
}

function getFacing(rotation: number): CupFacing {
  return snapRotation(rotation) === 0 ? 'front' : 'back';
}

export const Cup3DScene = forwardRef<HTMLDivElement, Cup3DSceneProps>(function Cup3DScene(
  {
    material,
    size,
    color,
    frontLogoDataUrl,
    backLogoDataUrl,
    frontLogoScale = 1,
    backLogoScale = 1,
    frontLogoOffset = DEFAULT_LOGO_OFFSET,
    backLogoOffset = DEFAULT_LOGO_OFFSET,
    onFrontLogoOffsetChange,
    onBackLogoOffsetChange,
    viewMode,
    rotation,
    onRotationChange,
    className,
  },
  ref
) {
  const t = useTranslations('demo');
  const previewHeight = getScaledPreviewHeight(size, material);
  const previewStyle = useMemo(
    () => ({
      height: previewHeight,
      maxHeight: 'clamp(220px, 55vh, 400px)',
    }),
    [previewHeight]
  );
  const dragStart = useRef<{ x: number; rotation: CupRotation } | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const snappedRotation = useMemo(() => snapRotation(rotation), [rotation]);
  const facing = useMemo(() => getFacing(rotation), [rotation]);
  const activeLogoDataUrl = facing === 'front' ? frontLogoDataUrl : backLogoDataUrl;
  const activeLogoScale = facing === 'front' ? frontLogoScale : backLogoScale;
  const activeLogoOffset = facing === 'front' ? frontLogoOffset : backLogoOffset;
  const onActiveLogoOffsetChange =
    facing === 'front' ? onFrontLogoOffsetChange : onBackLogoOffsetChange;

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (viewMode !== '3d' || e.button !== 0) return;
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      dragStart.current = { x: e.clientX, rotation: snapRotation(rotation) };
      setIsDragging(true);
    },
    [rotation, viewMode]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragStart.current || viewMode !== '3d') return;
      const delta = e.clientX - dragStart.current.x;
      if (Math.abs(delta) >= 48) {
        onRotationChange(delta > 0 ? 180 : 0);
        dragStart.current = { x: e.clientX, rotation: delta > 0 ? 180 : 0 };
      }
    },
    [onRotationChange, viewMode]
  );

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    dragStart.current = null;
    setIsDragging(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
  }, []);

  const cupProps = {
    material,
    size,
    color,
  };

  const logoInteractionProps = {
    logoOffset: activeLogoOffset,
    logoPositionEditable: Boolean(activeLogoDataUrl),
    onLogoOffsetChange: onActiveLogoOffsetChange,
  };

  if (viewMode === 'flat') {
    return (
      <div
        ref={ref}
        className={cn('relative flex items-end justify-center w-full', className)}
        style={previewStyle}
      >
        <CupSvg
          {...cupProps}
          logoDataUrl={frontLogoDataUrl}
          logoScale={frontLogoScale}
          logoOffset={frontLogoOffset}
          logoPositionEditable={Boolean(frontLogoDataUrl)}
          onLogoOffsetChange={onFrontLogoOffsetChange}
          facing="front"
          className="h-full w-auto max-w-[min(100%,280px)]"
        />
      </div>
    );
  }

  return (
    <div ref={ref} className={cn('w-full', className)}>
      <div
        className={cn(
          'relative flex items-end justify-center select-none touch-none overflow-hidden',
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        )}
        style={previewStyle}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        role="slider"
        aria-label={t('rotateCup')}
        aria-valuemin={0}
        aria-valuemax={180}
        aria-valuenow={snappedRotation}
      >
        <div className="relative flex items-end justify-center h-full w-full max-w-[min(100%,280px)] mx-auto transition-transform duration-200 ease-out">
          <CupSvg
            {...cupProps}
            logoDataUrl={activeLogoDataUrl}
            logoScale={activeLogoScale}
            {...logoInteractionProps}
            facing={facing}
            showLogo={Boolean(activeLogoDataUrl)}
            className="h-full w-auto max-w-full"
          />
        </div>
      </div>

      <div className="mt-3 sm:mt-4 flex items-center gap-2 sm:gap-3 px-1">
        <Rotate3d className="h-4 w-4 text-text-muted shrink-0" aria-hidden />
        <input
          type="range"
          min={0}
          max={180}
          step={180}
          value={snappedRotation}
          onChange={(e) => onRotationChange(Number(e.target.value) as CupRotation)}
          className="flex-1 h-2.5 sm:h-2 accent-primary-500 cursor-pointer touch-manipulation"
          aria-label={t('rotateCup')}
        />
        <span className="text-xs font-mono text-text-muted w-10 shrink-0 text-end">
          {snappedRotation}°
        </span>
      </div>
      <p className="text-xs text-text-muted text-center mt-2 px-1">{t('dragToRotate')}</p>
      {Boolean(activeLogoDataUrl) && (
        <p className="text-xs text-text-muted text-center mt-1 px-1">{t('dragLogoPosition')}</p>
      )}
    </div>
  );
});
