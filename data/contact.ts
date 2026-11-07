export const contactEmail = "contacto@omicron-consultores.com";

export function contactMailto(subject: string, body: string): string {
  return `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
