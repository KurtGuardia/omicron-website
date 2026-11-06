// Countries with documented OMICRON experience (highlighted on the Home map), by ISO code.
// Experience links filter by these codes; display names come from next-intl (Countries.*).
// Per-country counts are derived from the published projects, never hardcoded here.
export const mapCountryCodes = ["AR", "BO", "BR", "CL", "CO", "CR", "DO", "EC", "SV", "GT", "HN", "MX", "NI", "PA", "PE"] as const;

export type ActiveMapCountryCode = (typeof mapCountryCodes)[number];

export function isActiveMapCountryCode(value: string): value is ActiveMapCountryCode {
  return (mapCountryCodes as readonly string[]).includes(value);
}
