'use client';
import {useEffect, useRef} from 'react';
import styles from './HomeSections.module.scss';

// Oversized outlined word that drifts sideways as its section scrolls past (decorative, aria-hidden).
export function ScrollWord({text}: {text: string}) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const word = ref.current;
    const section = word?.closest('section');
    if (!word || !section) return;
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    const paint = () => {
      frame = 0;
      if (preference.matches) { word.style.transform = 'none'; return; }
      const bounds = section.getBoundingClientRect();
      if (bounds.bottom < 0 || bounds.top > innerHeight) return;
      // 0 when the section enters at the bottom, 1 when it leaves at the top.
      const progress = Math.min(1, Math.max(0, (innerHeight - bounds.top) / (innerHeight + bounds.height)));
      word.style.transform = `translate3d(${(10 - progress * 45).toFixed(2)}%,0,0)`;
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(paint); };
    paint();
    addEventListener('scroll', schedule, {passive: true});
    addEventListener('resize', schedule);
    preference.addEventListener('change', schedule);
    return () => { cancelAnimationFrame(frame); removeEventListener('scroll', schedule); removeEventListener('resize', schedule); preference.removeEventListener('change', schedule); };
  }, []);
  return <div className={styles.scrollWord} aria-hidden="true"><span ref={ref}>{text}</span></div>;
}
