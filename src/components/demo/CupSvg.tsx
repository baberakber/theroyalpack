'use client';

import { forwardRef, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import {
  clampLogoOffset,
  DEFAULT_LOGO_OFFSET,
  getCupBodyPath,
  getCupShape,
  getHalfWidthAtY,
  getLogoRect,
  getPaperSleevePath,
  getPlasticCupImageLayout,
  PLASTIC_CUP_IMAGE_PATH,
  type LogoOffset,
} from '@/lib/cupShapes';
import type { CupMaterial, CupSize } from '@/lib/demoConstants';
import { cn } from '@/lib/utils';

export type CupFacing = 'front' | 'back' | 'side';

export type CupSvgProps = {
  material: CupMaterial;
  size: CupSize;
  color: string;
  logoDataUrl?: string | null;
  logoScale?: number;
  logoOffset?: LogoOffset;
  logoPositionEditable?: boolean;
  onLogoOffsetChange?: (offset: LogoOffset) => void;
  facing?: CupFacing;
  showLogo?: boolean;
  className?: string;
};

function darkenHex(hex: string, amount: number): string {
  const normalized = hex.replace('#', '');
  if (normalized.length !== 6) return hex;
  const r = Math.max(0, parseInt(normalized.slice(0, 2), 16) - amount);
  const g = Math.max(0, parseInt(normalized.slice(2, 4), 16) - amount);
  const b = Math.max(0, parseInt(normalized.slice(4, 6), 16) - amount);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

function lighten(hex: string, amount: number): string {
  const normalized = hex.replace('#', '');
  if (normalized.length !== 6) return hex;
  const r = Math.min(255, parseInt(normalized.slice(0, 2), 16) + amount);
  const g = Math.min(255, parseInt(normalized.slice(2, 4), 16) + amount);
  const b = Math.min(255, parseInt(normalized.slice(4, 6), 16) + amount);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

function isLightColor(hex: string): boolean {
  const normalized = hex.replace('#', '');
  if (normalized.length !== 6) return true;
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 200;
}

export const CupSvg = forwardRef<SVGSVGElement, CupSvgProps>(function CupSvg(
  {
    material,
    size,
    color,
    logoDataUrl,
    logoScale = 1,
    logoOffset = DEFAULT_LOGO_OFFSET,
    logoPositionEditable = false,
    onLogoOffsetChange,
    facing = 'front',
    showLogo = true,
    className,
  },
  ref
) {
  const clipId = useId();
  const shadowId = useId();
  const textureId = useId();
  const bodyLightId = useId();
  const bodyShadeId = useId();
  const sleeveClipId = useId();
  const openingGradId = useId();

  const [plasticCupDataUrl, setPlasticCupDataUrl] = useState<string | null>(null);
  const [isLogoDragging, setIsLogoDragging] = useState(false);
  const logoDragRef = useRef<{
    startClientX: number;
    startClientY: number;
    startOffset: LogoOffset;
  } | null>(null);
  const internalSvgRef = useRef<SVGSVGElement>(null);

  const setSvgRef = useCallback(
    (node: SVGSVGElement | null) => {
      internalSvgRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    },
    [ref]
  );

  const shape = useMemo(() => getCupShape(material, size), [material, size]);
  const logoRect = useMemo(
    () => getLogoRect(shape, logoScale, logoOffset),
    [shape, logoScale, logoOffset]
  );

  const clientToOffset = useCallback(
    (clientX: number, clientY: number, startClientX: number, startClientY: number, startOffset: LogoOffset) => {
      const svg = internalSvgRef.current;
      if (!svg) return startOffset;
      const rect = svg.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return startOffset;
      const scaleX = shape.viewWidth / rect.width;
      const scaleY = shape.viewHeight / rect.height;
      const deltaX = (clientX - startClientX) * scaleX;
      const deltaY = (clientY - startClientY) * scaleY;
      return clampLogoOffset(
        shape,
        { x: startOffset.x + deltaX, y: startOffset.y + deltaY },
        logoScale
      );
    },
    [logoScale, shape]
  );

  const onLogoPointerDown = useCallback(
    (e: React.PointerEvent<SVGImageElement>) => {
      if (!logoPositionEditable || !onLogoOffsetChange || e.button !== 0) return;
      e.preventDefault();
      e.stopPropagation();
      e.currentTarget.setPointerCapture(e.pointerId);
      logoDragRef.current = {
        startClientX: e.clientX,
        startClientY: e.clientY,
        startOffset: logoOffset,
      };
      setIsLogoDragging(true);
    },
    [logoOffset, logoPositionEditable, onLogoOffsetChange]
  );

  const onLogoPointerMove = useCallback(
    (e: React.PointerEvent<SVGImageElement>) => {
      if (!logoDragRef.current || !onLogoOffsetChange) return;
      e.preventDefault();
      e.stopPropagation();
      const next = clientToOffset(
        e.clientX,
        e.clientY,
        logoDragRef.current.startClientX,
        logoDragRef.current.startClientY,
        logoDragRef.current.startOffset
      );
      onLogoOffsetChange(next);
    },
    [clientToOffset, onLogoOffsetChange]
  );

  const onLogoPointerUp = useCallback((e: React.PointerEvent<SVGImageElement>) => {
    if (!logoDragRef.current) return;
    e.preventDefault();
    e.stopPropagation();
    logoDragRef.current = null;
    setIsLogoDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
  }, []);

  const isPlastic = material === 'plastic';

  useEffect(() => {
    if (!isPlastic) return;
    let cancelled = false;
    fetch(PLASTIC_CUP_IMAGE_PATH, { cache: 'no-store' })
      .then((res) => res.blob())
      .then(
        (blob) =>
          new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          })
      )
      .then((dataUrl) => {
        if (!cancelled) setPlasticCupDataUrl(dataUrl);
      })
      .catch(() => {
        if (!cancelled) setPlasticCupDataUrl(null);
      });
    return () => {
      cancelled = true;
    };
  }, [isPlastic]);
  const isBack = facing === 'back';
  const isSide = facing === 'side';

  const sideScale = isSide ? 0.38 : 1;
  const displayShape = useMemo(() => {
    if (!isSide) return shape;
    const cx = shape.viewWidth / 2;
    const narrow = shape.topHalfWidth * sideScale;
    return {
      ...shape,
      topHalfWidth: narrow,
      bottomHalfWidth: narrow * 0.85,
      rimRx: narrow,
    };
  }, [shape, isSide, sideScale]);

  const cx = displayShape.viewWidth / 2;
  const { topY, bottomY, topHalfWidth, bottomHalfWidth, rimRx, rimRy, rimBandHeight } = displayShape;
  const sideBodyPath = useMemo(() => getCupBodyPath(displayShape), [displayShape]);
  const paperSleevePath = useMemo(
    () => (!isPlastic ? getPaperSleevePath(displayShape) : ''),
    [displayShape, isPlastic]
  );

  // White exterior rim band: white trapezoid drawn ON TOP of sleeve on the cup walls
  const rimBandBottomW = useMemo(
    () => (!isPlastic ? getHalfWidthAtY(displayShape, topY + rimBandHeight) : 0),
    [displayShape, isPlastic, topY, rimBandHeight]
  );
  const rimBandPath = !isPlastic
    ? `M ${cx - topHalfWidth} ${topY} L ${cx - rimBandBottomW} ${topY + rimBandHeight} L ${cx + rimBandBottomW} ${topY + rimBandHeight} L ${cx + topHalfWidth} ${topY} Z`
    : '';

  const baseBody = isPlastic ? '#E8F4FC' : color;
  const bodyLight = isPlastic ? '#F0FAFF' : isLightColor(color) ? '#FFFFFF' : lighten(color, 40);
  const bodyMid = baseBody;
  const bodyDark = isPlastic ? '#A0C8DC' : darkenHex(color, isLightColor(color) ? 18 : 28);

  const paperBaseLight = '#FFFFFF';
  const paperBaseMid = '#FAFAF8';
  const paperBaseDark = '#F0F0EE';

  const gradientDirection = isBack ? '100%' : '0%';
  const gradientEnd = isBack ? '0%' : '100%';

  const strokeColor = isPlastic ? '#8BB8D0' : darkenHex(isLightColor(color) ? '#E0E0DC' : color, 12);
  const paperStroke = '#D4D4D0';
  const rimFill = isPlastic ? '#D0E8F4' : '#FFFFFF';
  const rimStroke = isPlastic ? '#7EB0C8' : '#E0E0DC';
  const bottomFill = isPlastic ? '#B8D8E8' : '#FFFFFF';

  const displayLogo = showLogo && logoDataUrl && !isSide;
  const plasticImageLayout = useMemo(
    () => (isPlastic ? getPlasticCupImageLayout(displayShape) : null),
    [displayShape, isPlastic]
  );
  const usePlasticPhoto = isPlastic && plasticCupDataUrl && plasticImageLayout && !isSide;

  return (
    <svg
      ref={setSvgRef}
      viewBox={`0 0 ${displayShape.viewWidth} ${displayShape.viewHeight}`}
      className={cn(
        'w-full h-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
        className
      )}
      role="img"
      aria-label={`${material} cup ${size}${isBack ? ' back' : ''}`}
    >
      <defs>
        <clipPath id={clipId}>
          <path d={sideBodyPath} />
        </clipPath>
        {!isPlastic && (
          <clipPath id={sleeveClipId}>
            <path d={paperSleevePath} />
          </clipPath>
        )}
        <linearGradient id={bodyLightId} x1={gradientDirection} y1="0%" x2={gradientEnd} y2="0%">
          {isPlastic ? (
            <>
              <stop offset="0%" stopColor={bodyLight} stopOpacity={0.5} />
              <stop offset="38%" stopColor={bodyMid} stopOpacity={0.35} />
              <stop offset="100%" stopColor={bodyDark} stopOpacity={0.4} />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor={paperBaseLight} stopOpacity={1} />
              <stop offset="50%" stopColor={paperBaseMid} stopOpacity={1} />
              <stop offset="100%" stopColor={paperBaseDark} stopOpacity={1} />
            </>
          )}
        </linearGradient>
        {!isPlastic && (
          <linearGradient id={`${bodyLightId}-sleeve`} x1={gradientDirection} y1="0%" x2={gradientEnd} y2="0%">
            <stop offset="0%" stopColor={bodyLight} stopOpacity={0.95} />
            <stop offset="38%" stopColor={bodyMid} stopOpacity={1} />
            <stop offset="100%" stopColor={bodyDark} stopOpacity={0.9} />
          </linearGradient>
        )}
        <linearGradient id={bodyShadeId} x1={gradientDirection} y1="0%" x2={gradientEnd} y2="0%">
          <stop offset="0%" stopColor="#000" stopOpacity={0} />
          <stop offset="72%" stopColor="#000" stopOpacity={isPlastic ? 0.05 : 0.08} />
          <stop offset="100%" stopColor="#000" stopOpacity={isPlastic ? 0.12 : 0.16} />
        </linearGradient>
        <filter id={shadowId} x="-30%" y="-10%" width="160%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="6" floodOpacity={isSide ? 0.06 : 0.12} />
        </filter>
        {/* Radial gradient for cup opening: slightly dark at centre → white at rim edge */}
        <radialGradient id={openingGradId} cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#C8C8C6" stopOpacity={isPlastic ? 0.4 : 0.55} />
          <stop offset="55%" stopColor="#E2E2E0" stopOpacity={isPlastic ? 0.3 : 0.4} />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0} />
        </radialGradient>
        {!isPlastic && (
          <filter id={textureId}>
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.04" />
            </feComponentTransfer>
          </filter>
        )}
      </defs>

      {!isSide && (
        <ellipse
          cx={cx}
          cy={bottomY + 28}
          rx={topHalfWidth * 0.9}
          ry={10}
          fill="#000"
          opacity={0.06}
        />
      )}

      <g filter={`url(#${shadowId})`}>
        {usePlasticPhoto ? (
          <image
            href={plasticCupDataUrl}
            x={plasticImageLayout.x}
            y={plasticImageLayout.y}
            width={plasticImageLayout.width}
            height={plasticImageLayout.height}
            preserveAspectRatio="xMidYMid meet"
            transform={
              isBack
                ? `translate(${cx}, 0) scale(-1, 1) translate(${-cx}, 0)`
                : undefined
            }
            className="transition-all duration-300"
          />
        ) : (
          <path
            d={sideBodyPath}
            fill={`url(#${bodyLightId})`}
            stroke={isPlastic ? strokeColor : paperStroke}
            strokeWidth={isSide ? 1 : 1.2}
            className="transition-all duration-300"
          />
        )}

        {!isPlastic && (
          <path
            d={paperSleevePath}
            fill={`url(#${bodyLightId}-sleeve)`}
            clipPath={`url(#${clipId})`}
            className="transition-all duration-300"
          />
        )}

        {!isPlastic && !isSide && (
          <rect
            x={0}
            y={topY}
            width={displayShape.viewWidth}
            height={bottomY - topY + 20}
            fill="#888"
            filter={`url(#${textureId})`}
            clipPath={`url(#${sleeveClipId})`}
            opacity={0.4}
          />
        )}

        {/* White exterior rim band — painted on top of sleeve so color shows below it */}
        {!isPlastic && (
          <path
            d={rimBandPath}
            fill="#FFFFFF"
            clipPath={`url(#${clipId})`}
            className="transition-all duration-300"
          />
        )}
        {/* Fold ellipse — thin arc at lower edge of rim band for 3-D roll */}
        {!isPlastic && !isSide && (
          <ellipse
            cx={cx}
            cy={topY + rimBandHeight}
            rx={rimBandBottomW}
            ry={Math.max(3, Math.round(rimBandBottomW * 0.035))}
            fill="#EFEFED"
            stroke={paperStroke}
            strokeWidth={0.7}
          />
        )}

        {!usePlasticPhoto && (
          <path d={sideBodyPath} fill={`url(#${bodyShadeId})`} clipPath={`url(#${clipId})`} />
        )}

        {isPlastic && !isSide && !usePlasticPhoto && (
          <path
            d={`M ${cx - topHalfWidth * 0.5} ${topY + 20} Q ${cx - topHalfWidth * 0.3} ${topY + (bottomY - topY) * 0.45} ${cx - bottomHalfWidth * 0.45} ${bottomY - 24}`}
            fill="none"
            stroke="#fff"
            strokeWidth={3}
            strokeLinecap="round"
            opacity={0.45}
            clipPath={`url(#${clipId})`}
          />
        )}

        {displayLogo && (
          <image
            href={logoDataUrl}
            x={logoRect.x}
            y={logoRect.y}
            width={logoRect.width}
            height={logoRect.height}
            preserveAspectRatio="xMidYMid meet"
            clipPath={`url(#${clipId})`}
            style={{
              cursor: logoPositionEditable
                ? isLogoDragging
                  ? 'grabbing'
                  : 'grab'
                : undefined,
            }}
            onPointerDown={onLogoPointerDown}
            onPointerMove={onLogoPointerMove}
            onPointerUp={onLogoPointerUp}
            onPointerCancel={onLogoPointerUp}
          />
        )}

        {!usePlasticPhoto && (
          <>
            <ellipse
              cx={cx}
              cy={bottomY + 2}
              rx={bottomHalfWidth}
              ry={isSide ? 6 : 13}
              fill={bottomFill}
              stroke={isPlastic ? strokeColor : paperStroke}
              strokeWidth={isSide ? 1 : 1.5}
              opacity={isPlastic ? 0.6 : 1}
            />

            {/* Cup opening — white base ellipse */}
            <ellipse
              cx={cx}
              cy={topY}
              rx={rimRx}
              ry={rimRy}
              fill={rimFill}
              stroke={rimStroke}
              strokeWidth={isSide ? 1 : 1.5}
            />
            {/* Depth overlay: darkens the centre so it looks like you're looking INTO the cup */}
            {!isSide && (
              <ellipse
                cx={cx}
                cy={topY}
                rx={rimRx}
                ry={rimRy}
                fill={`url(#${openingGradId})`}
              />
            )}
          </>
        )}
      </g>
    </svg>
  );
});
