'use client';
import {useEffect, useRef, useState} from 'react';
import {CalendarDays, FileText, Globe2, MapPin} from 'lucide-react';
import {useTranslations} from 'next-intl';
import {homeMetrics} from '@/data/home';
import {Contours} from './Contours';
import styles from './HomeSections.module.scss';

export function HomeStats() {
  const t = useTranslations('Home');
  const ref = useRef<HTMLDListElement>(null);
  const [progress, setProgress] = useState(1);
  const [animated, setAnimated] = useState(false);
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    if (preference.matches) return;
    setAnimated(true); setProgress(0);
    let frame = 0;
    const finish = () => { if (preference.matches) { cancelAnimationFrame(frame); observer.disconnect(); setProgress(1); setRevealed(true); } };
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect(); setRevealed(true);
      const start = performance.now();
      const tick = (now: number) => {
        const elapsed = Math.min(1, (now - start) / 3000);
        setProgress(1 - Math.pow(1 - elapsed, 3));
        if (elapsed < 1 && !preference.matches) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, {threshold: .2});
    if (ref.current) observer.observe(ref.current);
    preference.addEventListener('change', finish);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); preference.removeEventListener('change', finish); };
  }, []);
  const number = (value: string) => <><span aria-hidden="true">{Math.round(parseInt(value) * progress)}{value.endsWith('+') ? '+' : ''}</span><span className={styles.metricAccessible}>{value}</span></>;
  return <section className={styles.statsStrip}><Contours/><dl ref={ref} className={`container ${styles.statsGrid}`} data-animated={animated} data-revealed={revealed}>
    <div><CalendarDays aria-hidden="true"/><dt>{t('stats.years')}</dt><dd>{number(homeMetrics.years)}</dd></div>
    <div><Globe2 aria-hidden="true"/><dt>{t('stats.countries')}</dt><dd>{number(homeMetrics.countries)}</dd></div>
    <div><FileText aria-hidden="true"/><dt>{t('stats.projects')}</dt><dd>{number(homeMetrics.engagements)}</dd></div>
    <div><MapPin aria-hidden="true"/><dt>{t('stats.reachDetail')}</dt><dd className={styles.reachValue}>{t('stats.reach')}</dd></div>
  </dl></section>;
}
