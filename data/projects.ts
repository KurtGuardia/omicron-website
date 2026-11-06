import dataset from './experience.json'
import { englishTitles, projectCovers } from './projectOverrides'
import { entityKey } from '@/lib/projectFilters'
import type { Project } from '@/types/project'

// Lossless adapter over the experience database export (one record per engagement).
// Empty context/results/gallery stay empty so the UI hides those sections.
const text = (value: string | null | undefined) => value?.trim() || ''
// Drops spelling variants that differ only in case, accents or punctuation.
const unique = (values: (string | null | undefined)[]) => {
  const seen = new Map<string, string>()
  for (const value of values.map(text).filter(Boolean))
    if (!seen.has(entityKey(value))) seen.set(entityKey(value), value)
  return [...seen.values()]
}

// Only records marked "Publish" in the database reach the site.
export const projects: Project[] = dataset
  .filter((record) => record.publish_status === 'Publish')
  .map((record) => {
  const summary = { es: text(record.summary_es), en: text(record.summary_en) }
  // The export repeats the summary as context when it has nothing more; the modal
  // already leads with the summary, so a verbatim copy is dropped.
  const context = {
    es: text(record.context_es) === summary.es ? '' : text(record.context_es),
    en: text(record.context_en) === summary.en ? '' : text(record.context_en),
  }
  return {
    id: record.project_id,
    project_id: record.project_id,
    slug: record.slug,
    title: {
      es: record.title_es,
      en: englishTitles[record.slug] ?? record.title_en,
    },
    summary,
    context,
    actions: { es: record.actions_es ?? [], en: record.actions_en ?? [] },
    results: { es: text(record.results_es), en: text(record.results_en) },
    client: text(record.client_display),
    funder: text(record.funder_display) || undefined,
    organizations: unique([
      ...record.organizations,
      record.client_display,
      record.funder_display,
    ]),
    originalTitle: text(record.original_title_es) || undefined,
    sourceRole: text(record.source_role_es) || undefined,
    geographyType: record.geography_type,
    geographyNote: record.geography_note ?? undefined,
    countryIso: record.country_iso,
    countries: record.countries,
    regions: record.regions
      ? record.regions.split(';').map((region) => region.trim())
      : [],
    region: record.regions ?? '',
    startYear: record.start_year ?? undefined,
    endYear: record.end_year ?? undefined,
    period:
      record.start_year === record.end_year
        ? String(record.start_year || '')
        : [record.start_year, record.end_year].filter(Boolean).join('–'),
    expertise: record.expertise,
    services: record.services,
    featured: record.featured,
    image:
      record.image ??
      (projectCovers.has(record.slug)
        ? `/images/projects/${record.slug}/cover.webp`
        : undefined),
    gallery: record.gallery?.length ? record.gallery : undefined,
    relatedProjectIds: record.related_project_ids?.length
      ? record.related_project_ids
      : undefined,
    sourceEngagementIds: record.source_engagement_ids,
    publishStatus: record.publish_status,
  }
})
