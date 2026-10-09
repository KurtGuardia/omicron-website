export type Locale = "es" | "en";

export type Project = {
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
  featured?: boolean;
  image?: string;
  context?: Record<Locale, string>;
  actions?: Record<Locale, string[]>;
  impact?: Record<Locale, string>;
};
