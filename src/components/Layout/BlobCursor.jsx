import { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';

import './BlobCursor.css';

export default function BlobCursor({
  blobType = 'circle',
  fillColor = '#63e7ff',
  trailCount = 3,
  sizes = [56, 118, 80],
  innerSizes = [0, 0, 0],
  innerColor = 'rgba(255,255,255,0)',
  opacities = [0.2, 0.14, 0.1],
  shadowColor = 'rgba(88,228,255,0.28)',
  shadowBlur = 26,
  shadowOffsetX = 0,
  shadowOffsetY = 0,
  filterId = 'blob',
  filterStdDeviation = 24,
  filterColorMatrixValues = '1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 35 -10',
  useFilter = true,
  fastDuration = 0.16,
  slowDuration = 0.58,
  fastEase = 'power3.out',
  slowEase = 'sine.out',
  zIndex = 9999
}) {
  const containerRef = useRef(null);
  const blobsRef = useRef([]);

  const updateOffset = useCallback(() => {
    if (!containerRef.current) return { left: 0, top: 0 };
    const rect = containerRef.current.getBoundingClientRect();
    return { left: rect.left, top: rect.top };
  }, []);

  const handleMove = useCallback(
    e => {
      const { left, top } = updateOffset();
      const x = 'clientX' in e ? e.clientX : e.touches?.[0]?.clientX;
      const y = 'clientY' in e ? e.clientY : e.touches?.[0]?.clientY;
      if (x == null || y == null) return;

      blobsRef.current.forEach((el, i) => {
        if (!el) return;
        const isLead = i === 0;
        gsap.to(el, {
          x: x - left,
          y: y - top,
          duration: isLead ? fastDuration : slowDuration,
          ease: isLead ? fastEase : slowEase
        });
      });
    },
    [updateOffset, fastDuration, slowDuration, fastEase, slowEase]
  );

  useEffect(() => {
    const onResize = () => updateOffset();
    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('touchmove', handleMove, { passive: true });

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
    };
  }, [updateOffset, handleMove]);

  return (
    <div ref={containerRef} className="blob-container hidden md:block" style={{ zIndex }}>
      {useFilter && (
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
          <filter id={filterId}>
            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation={filterStdDeviation} />
            <feColorMatrix in="blur" values={filterColorMatrixValues} />
          </filter>
        </svg>
      )}

      <div className="blob-main" style={{ filter: useFilter ? `url(#${filterId})` : undefined }}>
        {Array.from({ length: trailCount }).map((_, i) => (
          <div
            key={i}
            ref={el => {
              blobsRef.current[i] = el;
            }}
            className={`blob ${i === 0 ? 'blob--lead' : ''}`}
            style={{
              width: sizes[i],
              height: sizes[i],
              borderRadius: blobType === 'circle' ? '50%' : '0%',
              backgroundColor: fillColor,
              opacity: opacities[i],
              boxShadow: `${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px 0 ${shadowColor}`
            }}
          >
            {innerSizes[i] > 0 && (
              <div
                className="inner-dot"
                style={{
                  width: innerSizes[i],
                  height: innerSizes[i],
                  top: (sizes[i] - innerSizes[i]) / 2,
                  left: (sizes[i] - innerSizes[i]) / 2,
                  backgroundColor: innerColor,
                  borderRadius: blobType === 'circle' ? '50%' : '0%'
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
