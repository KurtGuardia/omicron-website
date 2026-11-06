// Countries with documented OMICRON experience (highlighted on the Home map). Query names
// match the projects' canonical Spanish country values; display names come from next-intl.
// Per-country counts are derived from the published projects, never hardcoded here.
export const mapCountries = {
  AR: {queryCountry: "Argentina"},
  BO: {queryCountry: "Bolivia"},
  BR: {queryCountry: "Brasil"},
  CL: {queryCountry: "Chile"},
  CO: {queryCountry: "Colombia"},
  CR: {queryCountry: "Costa Rica"},
  DO: {queryCountry: "República Dominicana"},
  EC: {queryCountry: "Ecuador"},
  SV: {queryCountry: "El Salvador"},
  GT: {queryCountry: "Guatemala"},
  HN: {queryCountry: "Honduras"},
  MX: {queryCountry: "México"},
  NI: {queryCountry: "Nicaragua"},
  PA: {queryCountry: "Panamá"},
  PE: {queryCountry: "Perú"},
} as const;

export type ActiveMapCountryCode = keyof typeof mapCountries;

export function isActiveMapCountryCode(value: string): value is ActiveMapCountryCode {
  return Object.prototype.hasOwnProperty.call(mapCountries, value);
}
