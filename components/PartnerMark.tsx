'use client';

import Image from 'next/image';
import {useState} from 'react';
import type {Locale} from '@/types/project';
import type {Partner} from '@/data/partners';
import styles from './PartnerCarousel.module.scss';

export function PartnerMark({partner, locale}: {partner: Partner; locale: Locale}) {
  const [failed, setFailed] = useState(false);
  const src = partner.localizedImage?.[locale] ?? partner.image;

  return <span className={styles.mark} data-surface={partner.darkSurface ? 'dark' : 'light'}>
    {src && !failed
      ? <span className={styles.image}><Image src={src} alt={partner.name[locale]} fill sizes="(max-width: 700px) 42vw, (max-width: 1200px) 22vw, 15vw" onError={() => setFailed(true)}/></span>
      : <span className={styles.wordmark}>{partner.name[locale]}</span>}
  </span>;
}
