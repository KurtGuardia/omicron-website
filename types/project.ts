export type Locale = "es" | "en";

export type LocalizedProjectValue<T> = T | Record<Locale, T>;

export type ProjectMetric = {
  label: string;
  value: string;
};

export type Project = {
  id: string;
  slug: string;
  title: Record<Locale, string>;
  summary: Record<Locale, string>;
  client: string;
  funder?: string;
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
