// Stable content IDs connect seed project metadata to next-intl display labels.
export const expertiseKeys = [0, 1, 2, 3, 4, 5, 6] as const;
export const serviceKeys = [0, 1, 2, 3, 4, 5, 6] as const;
export const projectExpertiseKeys: Record<string, number[]> = {
  "clima-loca": [0, 1],
  "agro-innova": [2, 0],
  "peb-la": [3, 4],
  "paisajes-resilientes": [0, 3],
};
// Only relationships represented by the supplied project seed data.
export const homePartners = ["CIAT / Bioversity", "IICA", "DGRV", "GIZ", "eu"] as const;
export const temporaryProfiles = [1, 2, 3, 4, 5] as const;

// Approved Home headline metrics supplied for TASK 8.2.1 (not project-result counts).
export const homeMetrics = {years: "25+", countries: "15", engagements: "350+"} as const;
export const homeFeaturedOrder = ["paisajes-resilientes", "agro-innova", "peb-la", "clima-loca"] as const;
