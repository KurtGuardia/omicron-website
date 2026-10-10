import dataset from './omicron-projects-v4-app-ready.json';
import type {Project} from '@/types/project';

// Lossless content adapter: the curated JSON is the only project content source.
export const projects: Project[] = dataset.map(record => ({
  id: record.project_id,
  project_id: record.project_id,
  slug: record.slug,
  title: {es: record.title_es, en: record.title_en},
  summary: {es: record.summary_es, en: record.summary_en},
  context: {es: record.context_es, en: record.context_en},
  actions: {es: record.actions_es, en: record.actions_en},
  results: {es: record.results_es, en: record.results_en},
  client: record.client_display,
  funder: record.funder_display,
  geographyType: record.geography_type,
  geographyNote: record.geography_note,
  countryIso: record.country_iso,
  countries: record.countries,
  regions: record.regions ? record.regions.split(';').map(region => region.trim()) : [],
  region: record.regions,
  startYear: record.start_year,
  endYear: record.end_year,
  period: record.start_year === record.end_year ? String(record.start_year || '') : [record.start_year, record.end_year].filter(Boolean).join('–'),
  expertise: record.expertise,
  services: record.services,
  featured: record.featured,
  image: record.image,
  gallery: record.gallery,
  relatedProjectIds: record.related_project_ids,
  sourceEngagementIds: record.source_engagement_ids,
  publishStatus: record.publish_status,
}));
