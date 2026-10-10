'use client';

import {useEffect} from 'react';
import {useLocale} from 'next-intl';

// Next retains the root layout during client navigation between locale routes.
export function DocumentLanguage() {
  const locale = useLocale();
  useEffect(() => {document.documentElement.lang = locale;}, [locale]);
  return null;
}
