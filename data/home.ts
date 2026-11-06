// Home columns list every project-taxonomy entry in display order; key i resolves to
// Home.expertise.items.i / Home.services.items.i and to expertiseValues[i] / serviceValues[i]
// (lib/projectLabels.ts), which is the value each row filters /experience by.
export const expertiseKeys = [0, 1, 2, 3, 4, 5, 6, 7] as const;
export const serviceKeys = [0, 1, 2, 3, 4, 5, 6, 7] as const;

// Public headline metrics; the experience claim conservatively reflects work since 1994.
export const homeMetrics = {years: "30+", countries: "15", engagements: "350+"} as const;
