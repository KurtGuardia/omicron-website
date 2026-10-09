// Documented OMICRON experience counts. Query names match the project's
// canonical Spanish country values; display names come from next-intl.
export const mapCountries = {
  AR: {count: 1, queryCountry: "Argentina"},
  BO: {count: 216, queryCountry: "Bolivia"},
  BR: {count: 1, queryCountry: "Brasil"},
  CL: {count: 1, queryCountry: "Chile"},
  CO: {count: 7, queryCountry: "Colombia"},
  CR: {count: 8, queryCountry: "Costa Rica"},
  DO: {count: 18, queryCountry: "República Dominicana"},
  EC: {count: 7, queryCountry: "Ecuador"},
  SV: {count: 19, queryCountry: "El Salvador"},
  GT: {count: 6, queryCountry: "Guatemala"},
  HN: {count: 14, queryCountry: "Honduras"},
  MX: {count: 3, queryCountry: "México"},
  NI: {count: 14, queryCountry: "Nicaragua"},
  PA: {count: 3, queryCountry: "Panamá"},
  PE: {count: 91, queryCountry: "Perú"},
} as const;

export type ActiveMapCountryCode = keyof typeof mapCountries;

export function isActiveMapCountryCode(value: string): value is ActiveMapCountryCode {
  return Object.prototype.hasOwnProperty.call(mapCountries, value);
}
