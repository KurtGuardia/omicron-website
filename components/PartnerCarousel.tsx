'use client';

import {useCallback, useEffect, useRef, useState, type TouchEvent, type TransitionEvent} from 'react';
import {useLocale, useTranslations} from 'next-intl';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import type {Locale} from '@/types/project';
import {partners} from '@/data/partners';
import {PartnerMark} from './PartnerMark';
import styles from './PartnerCarousel.module.scss';

const autoplayDelay = 2500;
const slides = [...partners, ...partners, ...partners];

export function PartnerCarousel() {
  const locale = useLocale() as Locale;
  const t = useTranslations('Home.clients');
  const rootRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const touchStart = useRef<{x: number; y: number} | null>(null);
  const [index, setIndex] = useState(0);
  const [stepWidth, setStepWidth] = useState(0);
  const [measured, setMeasured] = useState(false);
  const [snap, setSnap] = useState(false);
  const [visible, setVisible] = useState(false);
  const [documentVisible, setDocumentVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(true);

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      const first = track?.firstElementChild as HTMLElement | null;
      if (!track || !first) return;
      const style = window.getComputedStyle(track);
      const gap = Number.parseFloat(style.columnGap || style.gap) || 0;
      const nextStep = first.getBoundingClientRect().width + gap;
      setStepWidth(nextStep);
      if (!measured) {
        setIndex(partners.length);
        setMeasured(true);
      }
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (viewportRef.current) observer.observe(viewportRef.current);
    return () => observer.disconnect();
  }, [measured]);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReducedMotion(preference.matches);
    const updateVisibility = () => setDocumentVisible(document.visibilityState === 'visible');
    updateMotion();
    updateVisibility();
    preference.addEventListener('change', updateMotion);
    document.addEventListener('visibilitychange', updateVisibility);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting && entry.intersectionRatio >= .25), {threshold: [0, .25]});
    if (rootRef.current) observer.observe(rootRef.current);
    return () => {
      preference.removeEventListener('change', updateMotion);
      document.removeEventListener('visibilitychange', updateVisibility);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!snap) return;
    const frame = window.requestAnimationFrame(() => setSnap(false));
    return () => window.cancelAnimationFrame(frame);
  }, [snap]);

  const move = useCallback((direction: -1 | 1) => {
    if (!measured) return;
    setIndex(current => {
      const next = current + direction;
      if (reducedMotion && next >= partners.length * 2) return next - partners.length;
      if (reducedMotion && next < partners.length) return next + partners.length;
      return Math.min(partners.length * 2, Math.max(partners.length - 1, next));
    });
  }, [measured, reducedMotion]);

  const canAutoplay = measured && visible && documentVisible && !reducedMotion;
  useEffect(() => {
    if (!canAutoplay) return;
    const timer = window.setTimeout(() => move(1), autoplayDelay);
    return () => window.clearTimeout(timer);
  }, [canAutoplay, index, move]);

  const finishTransition = (event: TransitionEvent<HTMLUListElement>) => {
    if (event.target !== event.currentTarget || event.propertyName !== 'transform') return;
    if (index >= partners.length * 2) {
      setSnap(true);
      setIndex(index - partners.length);
    } else if (index < partners.length) {
      setSnap(true);
      setIndex(index + partners.length);
    }
  };

  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    touchStart.current = {x: touch.clientX, y: touch.clientY};
  };
  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) > 38 && Math.abs(dx) > Math.abs(dy) * 1.25) {
      move(dx < 0 ? 1 : -1);
    }
  };

  return <div
    ref={rootRef}
    className={styles.carousel}
    role="region"
    aria-roledescription={t('carouselDescription')}
    aria-label={t('title')}
  >
    <div ref={viewportRef} className={styles.viewport} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} onTouchCancel={() => {touchStart.current = null;}}>
      <ul
        ref={trackRef}
        className={styles.track}
        aria-label={t('listLabel', {count: partners.length})}
        onTransitionEnd={finishTransition}
        style={{transform: `translate3d(-${index * stepWidth}px, 0, 0)`, transition: snap || !measured ? 'none' : undefined}}
      >
        {slides.map((partner, slideIndex) => {
          const clone = slideIndex < partners.length || slideIndex >= partners.length * 2;
          return <li key={`${slideIndex}-${partner.id}`} className={styles.slide} aria-hidden={clone}>
            <PartnerMark key={`${partner.id}-${locale}`} partner={partner} locale={locale}/>
          </li>;
        })}
      </ul>
    </div>
    <div className={styles.controls}>
      <button type="button" aria-label={t('previous')} onClick={() => move(-1)}><ChevronLeft aria-hidden="true"/></button>
      <button type="button" aria-label={t('next')} onClick={() => move(1)}><ChevronRight aria-hidden="true"/></button>
    </div>
  </div>;
}
