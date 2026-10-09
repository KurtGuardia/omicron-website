# TASK 8.2.1 — Home visual fidelity correction

## Reference and scope

Inspected every approved image in `design/reference/` before editing. `home-01-top.png`, `home-02-middle.png` and `home-03-bottom.png` guided the Home styling; the written implementation plan remains the functional and architectural brief. Experience and project-modal references were inspected for context; their feature implementations were not changed.

## Exact changes

- **Header:** transparent Home navigation over the Hero, larger real OMICRON logo, white wordmark treatment derived from the existing logo pixels, sky-blue active underline, larger language labels and the reference's circular search link to the existing Experience route. The original logo image remains unchanged.
- **Hero:** larger, heavier three-line desktop headline, reference-oriented line breaks, round orange punctuation, stronger navy overlay and image contrast, larger body copy and orange CTA with an arrow; reduced empty space below the content.
- **Metrics:** replaced pending totals with the user-approved `25+`, `15` and `350+`; translated labels include “países en América Latina”, “consultorías y asistencias técnicas” and regional/international reach. These values are also used in the map's supporting statistics.
- **Expertise/Services:** deeper navy background, substantially denser rows, larger color-coded expertise icons, blue service icons, central vertical divider and reference-sized heading/intro hierarchy. Rows remain non-clickable and have no arrows.
- **Featured Projects:** four static desktop cards ordered Paisajes Resilientes, AGRO-INNOVA, PEB-LA, Clima LoCa. Larger image share, compact translated tags, tighter card padding, clearer title/client/funder/region/period hierarchy, and visible project links with arrows. Removed the long summaries from the Home cards. The prominent projects CTA stays after the grid as required by the functional plan.
- **Decorations:** reusable overlays use both supplied contour SVGs, are limited visually to the edges, and have empty alt text, aria-hidden and pointer-events:none. Added pale blue lower-edge shapes matching the map/partner reference treatment.
- **Regional map:** larger pale composition, two-line heading, three large icon/stat rows, and green-to-blue active-country fills. All 27 canonical country path geometries, IDs, data-country and data-active attributes remain unchanged, including exactly 15 active countries. No map events, selections, tooltips or fabricated project markers were added.
- **How We Work:** enlarged blue icon on the left, larger number/title in the middle, descriptive copy on the right, vertical separators, white arrow shells and larger dots. One static step remains visible; controls remain disabled pending TASK 8.3.
- **Clients/Partners:** larger seed-backed institutional text placeholders in two generously spaced rows, stronger heading hierarchy, subtle contours and pale blue lower decoration.
- **About:** replaced the flat two-column treatment with a photographic navy-overlay composition, reference-oriented heading/copy on the left and three sustainability/collaboration/results values with icons.
- **Team:** larger two-line headline and introduction, circular portraits, centered names/roles and the reference's subtle grid separator. All five profiles remain explicitly temporary.
- **Contact:** photographic treatment with stronger title, orange dot, supporting copy and CTA grouped on the left rather than a CTA at the far right.
- **Footer:** deep navy background, larger centered real logo with white wordmark treatment, contour edges, institutional text left, LinkedIn placeholder icon/languages/legal labels right, and reference-oriented separators and spacing.

The 1560px maximum content system, Next.js/TypeScript/SCSS/next-intl architecture, locale/query-preserving selector and existing mailto destination remain in place. No dependencies or lockfiles were changed. TASK 8.3 and TASK 8.4 were not executed.

## Files

Created:
- `components/BrandLogo.tsx`
- `components/Contours.tsx`
- `components/Contours.module.scss`
- `TASK_8_2_1_NOTES.md`

Changed:
- `components/Header.tsx`
- `components/Footer.tsx`
- `components/HomeSections.tsx`
- `components/HomeSections.module.scss`
- `components/SiteChrome.module.scss`
- `components/map/OmicronMap.tsx`
- `components/map/OmicronMap.module.scss`
- `data/assets.ts`
- `data/home.ts`
- `messages/es.json`
- `messages/en.json`

## Asset/content limits

The supplied landscape, project and portrait placeholders remain in use; the reference's final photography, five distinct portraits and institutional logo files were not supplied as individual assets. Partner labels remain restricted to relationships represented in the seed data. Team identities were not copied from illustrative mockups. LinkedIn/legal destinations remain awaiting confirmation.

## Validation

- `pnpm exec tsc --noEmit`: passed.
- `pnpm build`: passed.
- Canonical-map comparison: all 27 paths and their IDs/data attributes preserved; 15 active countries.
- Browser comparison: Spanish and English desktop at 1440px, Spanish desktop at 1920px and narrow viewport at 390px; four Home cards, supplied raster/SVG assets loaded, no horizontal overflow, query-preserving locale links and no runtime/console errors. The shared container measures exactly 1560px at the 1920px viewport.

The host's pnpm 11 uses session-only `--pm-on-fail=ignore --config.verify-deps-before-run=false` flags to run the repository's existing installed dependencies without changing its pnpm 10 declaration. SWC requires running the build/preview outside the filesystem sandbox with `SWC_NATIVE_BINDING_CACHE=0`, as in the previous task.
