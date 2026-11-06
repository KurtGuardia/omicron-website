export type Locale = "es" | "en";

export type LocalizedProjectValue<T> = T | Record<Locale, T>;

export type ProjectMetric = {
  label: string;
  value: string;
};

export type Project = {
  id: string;
  project_id: string;
  geographyType: string;
  geographyNote?: string;
  countryIso: string[];
  startYear?: number;
  endYear?: number;
  sourceEngagementIds: string[];
  publishStatus: string;
  slug: string;
  title: Record<Locale, string>;
  summary: Record<Locale, string>;
  client: string;
  funder?: string;
  /** Normalized client, funder and partner entities, used by the client filter. */
  organizations: string[];
  originalTitle?: string;
  sourceRole?: string;
  countries: string[];
  region: string;
  period: string;
  expertise: string[];
  services: string[];
  featured: boolean;
  regions?: string[];
  startDate?: string;
  endDate?: string;
  gallery?: string[];
  tags?: Record<Locale, string[]>;
  image?: string;
  context?: LocalizedProjectValue<string>;
  actions?: LocalizedProjectValue<string[]>;
  results?: LocalizedProjectValue<string>;
  metrics?: ProjectMetric[];
  relatedProjectIds?: string[];
};
