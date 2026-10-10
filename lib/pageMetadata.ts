import type {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';
import type {Locale} from '@/types/project';

export async function projectPageMetadata(locale: Locale, page: 'home' | 'experience'): Promise<Metadata> {
  const t = await getTranslations({locale, namespace: 'Metadata'});
  const title = t(`${page}Title`);
  const description = t(`${page}Description`);
  const path = page === 'home' ? '' : '/experience';
  return {
    title,
    description,
    alternates: {languages: {es: `/es${path}`, en: `/en${path}`}},
    openGraph: {title, description, type: 'website', siteName: 'OMICRON Consultores SRL', locale: locale === 'es' ? 'es_ES' : 'en_US', alternateLocale: locale === 'es' ? 'en_US' : 'es_ES'}
  };
}
