export const contactEmail = "omicron@entel.bo";

export function contactMailto(subject: string, body: string): string {
  return `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
