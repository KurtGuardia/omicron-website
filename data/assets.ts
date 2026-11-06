// Repository assets; replace imagery here without changing section layouts.
export const assets = {
  logo: "/images/logo.png",
  // Dark-background variant generated from logo.png by scripts/prepare-logo-variants.mjs.
  logoLight: "/images/logo-light.png",
  hero: "/images/parallax/hero-parallax-tall.png",
  project: "/images/placeholders/project-placeholder.png",
  avatar: "/images/team/team-placeholder.png",
  contoursLight: "/images/decor/contours-light.svg",
  contoursDark: "/images/decor/contours-dark.svg",
  map: "/images/map/omicron-latin-america-map.svg",
} as const;

export const howStepImages = [
  "/images/how-we-work/step-01-entender.png",
  "/images/how-we-work/step-02-disenar.png",
  "/images/how-we-work/step-03-implementar.png",
  "/images/how-we-work/step-04-evaluar-aprender.png",
] as const;

// Desktop focal points keep the people visible in the wide section crop.
export const howStepImagePositions = ['center 22%', 'center 22%', 'center 32%', 'center 10%'] as const;
