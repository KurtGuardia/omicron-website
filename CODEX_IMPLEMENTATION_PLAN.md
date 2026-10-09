# OMICRON Website — Codex Implementation Plan

## Purpose

This file is the implementation brief for Codex inside VS Code.

The repository is already initialized as a Next.js + React + TypeScript project using SCSS, `next-intl`, `pnpm`, and Netlify-oriented configuration.

The information architecture, visual direction, Home layout, Experience layout, project modal direction, responsive direction, logo direction, placeholder strategy, and interactive map concept have already been approved.

Codex should implement those decisions faithfully instead of redesigning the product.

---

# 0. Start every task this way

Before changing code for any task:

1. Read this entire file.
2. Inspect the existing repository structure.
3. Inspect `package.json`, routing, SCSS structure, locale setup, existing components, and current data files.
4. Inspect the existing assets under:
   - `public/images/`
   - `public/images/placeholders/`
   - `public/images/map/`
5. Reuse the existing implementation where sensible.
6. Do not replace working architecture simply because another pattern is personally preferred.
7. Use **pnpm only**.
8. After the requested task, run the relevant checks, summarize changed files, list assumptions, and stop.

Do not execute later tasks unless explicitly requested.

---

# 1. Fixed technical decisions

## Stack

- Next.js
- React
- TypeScript
- SCSS
- SCSS Modules for component-level styling where practical
- `next-intl`
- `pnpm`
- Netlify deployment target
- `next/image` for raster images where appropriate

Do **not** introduce:
- Tailwind
- shadcn
- Bootstrap
- Material UI
- another component framework
- dark mode

The site has one approved visual theme.

---

# 2. Package manager

Use **pnpm only**.

Expected commands:

```bash
pnpm install
pnpm dev
pnpm build
pnpm exec tsc --noEmit
```

If a `typecheck` script exists:

```bash
pnpm typecheck
```

Do not create:
- `package-lock.json`
- `yarn.lock`

Keep `pnpm-lock.yaml` authoritative.

---

# 3. Internationalization architecture

The project uses `next-intl`.

Expected structure:

```text
messages/
  es.json
  en.json
```

Routes are locale-prefixed:

```text
/es
/es/experience
/en
/en/experience
```

All newly implemented user-facing interface copy should go through translation keys rather than being hard-coded into JSX.

Example:

```tsx
const t = useTranslations('Home');

<h1>{t('hero.title')}</h1>
```

The ES/EN selector must preserve:
- current route
- current query parameters

Example:

```text
/es/experience?country=Bolivia
→
/en/experience?country=Bolivia
```

Do not translate:
- internal IDs
- technical slugs
- ISO country codes
- project names unless an official translation exists

Task 8.9 will harden and complete bilingual content, but Task 8.2 should already respect the i18n architecture so there is no later refactor.

---

# 4. Asset locations — IMPORTANT

These assets already exist in the repository.

Do not invent replacements unless explicitly requested.

## Logo

The approved OMICRON logo asset is stored directly in:

```text
/public/images/
```

Before implementing the Header/Footer:
- inspect this directory
- identify the actual OMICRON logo filename
- use the existing image asset
- do not recreate the wordmark in HTML/CSS
- do not generate another logo
- do not substitute a text-only fake logo

Use the real image in Header and Footer.

A favicon/icon may exist separately in the app or public structure. Preserve it if present.

---

## Placeholder images

Temporary images live in:

```text
/public/images/placeholders/
```

Expected placeholder files:

```text
hero-placeholder.png
project-placeholder.png
avatar-placeholder.png
```

These are deliberately generic temporary assets.

Use them as follows:

### `hero-placeholder.png`
Reuse for wide photographic areas until final imagery is produced:
- Home Hero
- Contact CTA
- How We Work background if needed

Do not create separate temporary files just because the same placeholder is reused.

### `project-placeholder.png`
Use for:
- Featured Project cards
- Experience cards
- project modal hero/gallery placeholders where needed

### `avatar-placeholder.png`
Use for:
- temporary Team portraits

Important:
- centralize image references where practical
- avoid scattering literal paths across many unrelated files
- later replacement of real images should not require layout/component rewrites
- use `next/image` for raster card/team imagery where appropriate
- for full-bleed backgrounds, either use an absolutely positioned `Image` with `fill` or a deliberate CSS background strategy

Do not waste time sourcing/generating final photography inside Codex. Final imagery will be prepared outside Codex and swapped in later.

---

# 5. Interactive map asset — IMPORTANT

The final approved map SVG is stored in:

```text
/public/images/map/
```

Inspect the directory and identify the actual SVG filename.

This is **not a normal geographic map**. It is an intentionally interaction-optimized cartogram:

- USA removed
- Canada removed
- Greenland removed
- Falklands removed
- Central America visually enlarged
- Caribbean visually enlarged
- Mexico and South America visually reduced relative to those small regions
- transparent SVG background
- country paths remain individually addressable

The distortion is intentional. Do not “correct” it back to a conventional projection.

## Confirmed active OMICRON countries

Only these countries currently have documented OMICRON experience and should be interactive:

- Argentina — `AR`
- Bolivia — `BO`
- Brazil — `BR`
- Chile — `CL`
- Colombia — `CO`
- Costa Rica — `CR`
- Dominican Republic — `DO`
- Ecuador — `EC`
- El Salvador — `SV`
- Guatemala — `GT`
- Honduras — `HN`
- Mexico — `MX`
- Nicaragua — `NI`
- Panama — `PA`
- Peru — `PE`

Countries without documented OMICRON experience remain visible only where included in the SVG but are:
- muted
- non-interactive
- not keyboard-focusable
- not linked

Do not activate Paraguay, Uruguay, Venezuela, Belize, Guyana, Suriname, or other countries unless later project data explicitly supports them.

## Existing SVG semantics

The prepared SVG already includes/was designed around:

- one `<path>` per country
- country ISO IDs such as `id="BO"`
- `data-country`
- `data-active`
- active/inactive classes
- transparent background
- hover/focus visual styling
- green active state
- subtle white/orange glow
- slight scale emphasis
- reduced-motion handling

Preserve these IDs and data attributes.

## Very important implementation rule

For the final interactive map, **do not render the SVG only as a normal `<img>` or `next/image`**.

Doing so would make its internal country `<path>` elements inaccessible to React interaction logic.

Instead, create an inline React SVG component from the existing SVG asset while preserving the original geometry, IDs and data attributes.

Recommended architecture:

```text
components/
  map/
    OmicronMap.tsx
    OmicronMap.module.scss
```

The file in `public/images/map/` remains the canonical source asset/reference.

The React component may contain the equivalent inline SVG markup so React can handle:
- hover state
- focus state
- selected country
- tooltip
- click
- mobile tap
- navigation

Do not redraw or regenerate the geometry in Codex.

## Final map behavior (Task 8.4)

Default:
- muted inactive countries
- slightly stronger active countries
- no selected country
- no tooltip visible

Hover/focus on active country:
- country becomes OMICRON green
- subtle white/orange glow
- tiny scale emphasis
- tooltip appears

Tooltip:

```text
Bolivia
18 proyectos
Ver →
```

Project count must come from data, not be hard-coded into SVG geometry.

Country click / `Ver`:
- navigate to locale-aware Experience URL
- preserve locale
- filter by country

Example:

```text
/es/experience?country=Bolivia
```

Mobile:
- first tap selects/reveals compact country information
- CTA/tap then navigates
- avoid hover-only UX

Task 8.2 only needs the map visually placed and architected correctly.
Task 8.4 implements the complete interaction logic.

---

# 6. Visual system

## Colors

Primary:
- Navy: `#07216C`
- Sky: `#73A8F6`
- Orange: `#FB8A42`
- Green: `#668B43`
- Accessible green: `#456A2C`

Neutrals:
- Ink: `#172033`
- Muted: `#5D6878`
- Surface: `#F7F8F5`
- Pale blue: `#EEF5FF`
- Pale green: `#F2F7ED`
- Pale orange: `#FFF4EA`
- Border: `#DDE4EC`

## Typography

Prefer:
- Manrope
- fallback: Inter, Arial, sans-serif

Use a strong editorial hierarchy.
Avoid unnecessary uppercase text.

---

# 7. Layout system

The old 1280px content limit is rejected.

Use a wider, contemporary fluid layout.

Recommended global values:

```scss
$content-max: 1560px;
$page-padding: clamp(20px, 4vw, 72px);
```

Conceptually:

```scss
.container {
  width: min(calc(100% - (2 * var(--page-padding))), 1560px);
  margin-inline: auto;
}
```

Guidance:
- full-bleed backgrounds remain full viewport width
- content within sections aligns to the shared wide container
- large visual sections such as map/projects may breathe toward the wider edge
- do not allow text measures to become excessively wide just because the container is wide
- section spacing desktop: approximately 96–128px

Avoid building the site as a narrow centered 1200/1280px corporate template.

---

# 8. General visual direction

The site should feel:
- institutional
- contemporary
- confident
- development-sector oriented
- visually alive without looking like a SaaS dashboard

Use:
- strong navy sections
- selected lighter resting sections
- orange primarily for CTA emphasis
- green as a supporting brand/accent color
- subtle topographic contour-line motifs where appropriate
- generous vertical rhythm
- restrained shadows
- modest radii

Avoid:
- all-white page design
- “card soup”
- fake affordances
- unnecessary arrows
- overly animated UI
- dashboard aesthetics

---

# 9. Approved Home structure

Home order is fixed:

1. Header / Navbar
2. Hero
3. Data strip
4. Expertise + Services
5. Featured Projects
6. Regional Map
7. How We Work
8. Clients & Partners
9. About OMICRON
10. Team
11. Contact CTA
12. Footer

---

## Header

Desktop navigation:

- Inicio
- Experience
- About
- Contacto
- ES / EN

`Experience` navigates to the locale-aware Experience page.

Do not add redundant navigation links for every nearby Home section.

Use the actual OMICRON logo asset from `/public/images/`.

---

## Hero

- full-width photographic background
- use `hero-placeholder.png` for now
- dark/navy overlay
- strong white headline
- one primary orange CTA
- CTA: `Conoce nuestra experiencia`
- target: locale-aware `/experience`

No redundant secondary CTA.

---

## Data strip

Directly below Hero.

The previously pale/dead green direction is rejected.

Use:
- stronger/darker muted green background
- white text/icons
- elegant contrast

Current content:
- `25+` years of experience
- country count placeholder until verified
- project count placeholder until verified
- Latin America / international reach

Do not invent final numeric project/country totals if not verified.

---

## Expertise + Services

Two-column desktop layout.

### Expertise

1. Climate, Natural Resources & Water
2. Sustainable Trade, Competitiveness & Value Chains
3. Rural & Territorial Development
4. Sustainable Finance
5. Responsible Mining & Energy
6. Infrastructure & Basic Services
7. Governance & Institutional Development

### Services

1. Strategy & Project Design
2. Monitoring, Evaluation & Learning
3. Institutional & Organizational Development
4. Technical Assistance & Implementation
5. Facilitation & Participatory Processes
6. Knowledge Management & Capacity Building
7. Digital Transformation & Solutions

Behavior:
- rows, not cards
- no arrows
- no click behavior
- hover is visual only
- right-to-left background wipe
- text/icon contrast changes
- mobile must not depend on hover

---

## Featured Projects

Desktop:
- 3–4 visually strong project cards
- use `project-placeholder.png` temporarily

Cards include:
- image
- tags
- title
- client
- country / period
- short summary when appropriate
- visible `Ver proyecto`

After cards:
- prominent `Ver proyectos` CTA
- locale-aware `/experience`

Do not make the section CTA a tiny text link.

---

## Regional Map

- no photographic background
- use a clean pale/light field
- subtle topographic decoration allowed
- supporting text/stats on left
- large map on right
- use the prepared cartogram from `/public/images/map/`
- transparent map background
- no tooltip by default
- no selected country by default

Task 8.2:
- place and size map correctly
- use architecture compatible with later inline path interaction

Task 8.4:
- implement final interactivity described above

---

## How We Work

A true carousel.

Steps:
1. Entender
2. Diseñar
3. Implementar
4. Aprender

Only **one step** is prominently visible at a time.

Critical layout rule:
Do **not** stack:

```text
icon
number
title
paragraph
```

Instead use the available horizontal space.

Preferred desktop composition:

```text
[ large icon ]   [ 01 + title ]   [ descriptive text ]
```

or another equally strong horizontal composition.

Visual:
- wide background
- `hero-placeholder.png` may temporarily be reused
- dark/navy overlay
- large arrows left/right
- dots below
- no `1 / 4` counter

Task 8.2 may implement the static visual shell.
Task 8.3 adds final carousel behavior.

---

## Clients & Partners

- generous whitespace
- large logo area
- no tiny cramped logo cards
- temporary text/logo placeholders acceptable until real partner assets are supplied

Do not invent institutional relationships not present in data.

---

## About + Team

### About
- concise institutional content
- visually strong section
- no CTA if no dedicated destination exists

### Team
- 5 visible profiles
- use `avatar-placeholder.png` temporarily
- image + name + role
- clean balanced desktop grid

Do not invent real staff identities when data is unavailable.
Use explicit temporary placeholder labels if necessary.

---

## Contact CTA

A strong visual section, almost a secondary hero.

- wide/full-bleed treatment
- `hero-placeholder.png` reused temporarily
- navy overlay
- strong headline
- concise copy
- prominent orange `Escríbenos`
- `mailto:` link

No contact form in V1.

---

## Footer

Do not duplicate the navbar.

Desktop:
- institutional text / copyright left
- real OMICRON logo visually centered
- LinkedIn + ES/EN + legal links right

Do not repeat the email if the Contact CTA directly above already provides it.

---

# 10. Approved `/experience` page

## Hero

Consistent with Home visual language.

## Search + filters

Search:
- wide primary search field
- polished visual treatment

Filters:
- Area temática
- Servicio
- País / Región
- Cliente / Socio
- Año / periodo
- Sort
- Clear filters

Requirements:
- aligned and aesthetic desktop system
- compact/collapsible mobile behavior if useful
- synchronize filters with URL query parameters
- `/experience?country=Bolivia` pre-filters correctly

## Results

- result count
- sort
- project grid
- pagination preferred initially
- `Ver proyecto` always visible

---

# 11. Approved project modal / drawer

Open from `Ver proyecto`.

Desktop:
- large modal/drawer
- strong image hierarchy
- close button
- Escape closes
- focus trap
- body scroll lock
- backdrop click may close if safe
- shareable URL state

Content:
- hero image
- title
- tags
- client
- country
- period
- summary
- context/challenge
- services/actions
- documented results
- thematic areas
- related services
- gallery
- related projects
- contact CTA

Do not invent impact metrics.

Mobile:
- full-screen or near-full-screen sheet.

---

# 12. Responsive Home

Mobile is not just “desktop stacked”.

Key rules:
- hero keeps image background
- hamburger menu
- compact data strip, likely 2x2
- Expertise / Services single-column
- no hover dependency
- Featured Projects one-column or horizontal swipe
- map full width
- How We Work supports swipe
- team compact 2-column/grid treatment
- strong Contact CTA remains
- footer stacks cleanly

---

# 13. Task execution order

Execute one task only unless explicitly asked otherwise.

---

## TASK 8.2 — Implement the real Home desktop

### Goal

Convert the approved Home design into production-quality React + SCSS code using the existing repository and the real assets already present.

### Before coding

Inspect:
- current repo
- `package.json`
- SCSS/tokens
- next-intl setup
- `messages/es.json`
- `messages/en.json`
- `public/images/`
- `public/images/placeholders/`
- `public/images/map/`

Identify actual filenames rather than inventing them.

### Implement

- Header with real OMICRON logo
- Hero using `hero-placeholder.png`
- green Data Strip
- Expertise / Services
- Featured Projects using `project-placeholder.png`
- Regional Map section using the prepared cartogram asset/geometry
- How We Work visual shell
- Clients & Partners
- About
- Team using `avatar-placeholder.png`
- Contact CTA using `hero-placeholder.png`
- Footer with real OMICRON logo

### Map requirement during 8.2

Do not lock the map into a non-interactive architecture.

Prefer creating the initial `OmicronMap` React SVG component now from the prepared SVG geometry, preserving:
- path IDs
- `data-country`
- `data-active`
- active/inactive semantics

It does not yet need full tooltip/state logic; that belongs to Task 8.4.

### I18n requirement during 8.2

All new visible UI strings should use the existing `next-intl` message system.

Expand `messages/es.json` and `messages/en.json` as needed.

### At this stage

Allowed:
- placeholder imagery
- seed project content
- temporary team names explicitly marked as temporary if necessary
- static/non-functional How We Work slide shell
- map without final tooltip

Not allowed:
- dark mode
- fake final metrics
- new logo concept
- new map geometry
- random stock image sourcing
- Tailwind/shadcn
- a narrow 1280px global layout

### Acceptance criteria

- visually close to approved mockups
- wide 1560px-based layout
- correct section rhythm
- no obvious generic scaffold appearance
- real logo used
- correct placeholders used
- map uses approved cartogram geometry
- no fake arrows on non-clickable Expertise/Services rows
- SCSS structure is clean
- responsive foundations are sensible even before Task 8.7
- page renders without runtime errors
- no npm/yarn artifacts created

### Checks

At minimum:

```bash
pnpm exec tsc --noEmit
pnpm build
```

If build cost is excessive during iteration, typecheck first, but run build before declaring Task 8.2 complete.

Then summarize:
- files created
- files changed
- assumptions
- anything intentionally deferred to 8.3/8.4/8.7

Then stop.

---

## TASK 8.3 — Home interactions

Implement:
- Expertise/Services wipe hover
- real How We Work carousel
- arrows
- dots
- keyboard controls
- CTA states
- hover/focus states
- smooth restrained transitions
- reduced-motion support

Acceptance:
- one How We Work step visible at a time
- horizontal content composition
- arrows work
- dots work
- no `1 / 4` counter

---

## TASK 8.4 — Interactive SVG map

Use the already prepared `OmicronMap` geometry.

Implement:
- hovered country state
- focused country state
- selected country state
- project-count mapping from data
- tooltip
- tooltip CTA `Ver`
- locale-aware navigation
- active country only interaction
- no default tooltip
- no default selection
- mobile tap behavior
- keyboard accessibility
- reduced-motion compatibility

Do not regenerate/reproject/redraw the map.

---

## TASK 8.5 — Experience page

Implement:
- hero
- search
- filter system
- URL-synchronized filters
- sort
- result count
- project grid
- pagination
- contact/footer continuity

Use clean TypeScript filter utilities.
Keep data separate from UI.

---

## TASK 8.6 — Project modal / drawer

Implement:
- open from project card
- shareable URL state
- close button
- Escape
- focus management
- focus trap
- body scroll lock
- desktop/mobile layout
- related projects
- contact CTA

---

## TASK 8.7 — Responsive pass

Review at minimum:
- 1440
- 1280
- 1024
- 768
- 390

Implement:
- mobile navigation
- mobile grids
- type scaling
- touch-safe controls
- map mobile behavior
- How We Work swipe
- full-screen mobile modal
- team grid
- footer stacking

### Mobile menu

Hamburger opens a mobile sheet/overlay containing:
- Inicio
- Experience
- About
- Contacto
- ES / EN

Requirements:
- close button
- Escape
- body scroll lock
- accessible focus behavior

---

## TASK 8.8 — Final temporary/production-quality image integration

Final creative image generation happens outside Codex.

Codex should:
- wire supplied assets
- optimize delivery
- maintain stable aspect ratios
- centralize references
- make later image replacement safe

Do not generate/source imagery independently.

---

## TASK 8.9 — Complete ES / EN

Harden:
- navigation
- Home
- Experience
- filters
- buttons
- modal labels
- empty states
- validation messages

Maintain locale and query parameters correctly.

---

## TASK 8.10 — Accessibility / UX hardening

Check:
- semantic landmarks
- heading hierarchy
- keyboard navigation
- focus visible
- alt text
- form labels
- ARIA only where useful
- focus trap
- reduced motion
- contrast
- empty/no-results states
- loading states if needed

---

## TASK 8.11 — Build validation

Run:

```bash
pnpm exec tsc --noEmit
pnpm build
```

Also inspect:
- browser console
- hydration warnings
- broken links
- query params
- modal URL behavior
- locale routing
- responsive rendering

Fix blocking errors.

---

## TASK 8.12 — Netlify readiness

Prepare/verify:
- `netlify.toml`
- Node version
- pnpm build command
- framework configuration
- environment variables if any
- staging deployment notes

Verify production build on Netlify.

---

# 14. Data architecture

Project data must stay separate from UI.

Suggested shape:

```ts
export type Project = {
  id: string;
  slug: string;

  title: string;
  summary: string;
  description?: string;

  client: string;
  funder?: string;

  countries: string[];
  region?: string;

  startDate?: string;
  endDate?: string;

  expertise: string[];
  services: string[];

  image: string;
  gallery?: string[];

  featured: boolean;
};
```

Preserve raw/source-derived information separately where appropriate.

---

# 15. Non-negotiable constraints

- Do not redesign approved UX without a concrete implementation reason.
- Do not invent OMICRON metrics or impact claims.
- Do not reintroduce dark mode.
- Do not introduce unnecessary dependencies.
- Do not use Tailwind/shadcn.
- Do not add arrows to non-clickable Expertise/Services rows.
- Do not add a contact form.
- Do not create separate Expertise/Services pages in V1.
- Do not use a generic SaaS-dashboard aesthetic.
- Do not regenerate the approved logo.
- Do not regenerate or “fix” the approved map geometry.
- Do not activate unconfirmed countries.
- Do not source random final images; use repository placeholders until supplied assets replace them.
- Do not shrink the main site back to a 1280px global container.

---

# 16. Standard Codex prompt pattern

For every task:

> Read `CODEX_IMPLEMENTATION_PLAN.md`. Inspect the existing repository and the asset directories first. Execute TASK 8.X only. Preserve all approved decisions and existing working architecture. Use pnpm only. Run the relevant checks, summarize changed files and assumptions, then stop.

For the next task specifically:

> Read `CODEX_IMPLEMENTATION_PLAN.md`. Inspect the existing repository, the next-intl setup, SCSS architecture, and all assets under `public/images/`, `public/images/placeholders/`, and `public/images/map/`. Then execute TASK 8.2 only. Build the approved Home desktop using the existing Next.js + TypeScript + SCSS project. Use the real OMICRON logo already in `public/images/`, the supplied placeholder assets, and the prepared cartogram SVG geometry. Preserve path IDs/data attributes when preparing the map component. Use next-intl for visible copy, pnpm only, and the 1560px wide layout system. Run typecheck and build, summarize changes and assumptions, then stop.
