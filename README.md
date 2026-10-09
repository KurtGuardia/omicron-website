# OMICRON Consultores – implementation scaffold V3

Base técnica para empezar directamente la Tarea 8.2 en Codex / VS Code.

## Decisiones cerradas

- Next.js App Router
- React + TypeScript
- SCSS (`app/globals.scss`, partials y SCSS Modules cuando corresponda)
- **pnpm** como package manager
- **next-intl** para ES/EN con `messages/es.json` y `messages/en.json`
- URLs localizadas: `/es/...` y `/en/...`
- Netlify como destino de hosting
- Sin light/dark mode
- Container desktop fluido con `max-width: 1560px`
- Hero, backgrounds y secciones visuales pueden ser full-bleed
- El SVG definitivo del mapa se producirá fuera de Codex y luego se integrará en el repo
- El set visual de imágenes temporales/finales se producirá fuera de Codex y luego se integrará

## Instalación

Requiere Node 22 y pnpm 10.

```bash
corepack enable
pnpm install
pnpm dev
```

Abrir `http://localhost:3000`; `next-intl` usa español como locale por defecto y mantiene rutas explícitas `/es` y `/en`.

## Traducciones

```text
messages/
  es.json
  en.json
```

En componentes:

```tsx
import {useTranslations} from 'next-intl';

const t = useTranslations('Home');
return <h1>{t('heroTitle')}</h1>;
```

Los IDs internos, slugs y valores de filtros no deben traducirse. La UI muestra labels traducidos. Los nombres propios/proyectos solo se traducen cuando exista versión oficial o contenido bilingüe explícito.

## Validación

```bash
pnpm typecheck
pnpm build
```

## Estructura relevante

- `app/[locale]/page.tsx` – Home
- `app/[locale]/experience/page.tsx` – Experience
- `app/[locale]/layout.tsx` – locale provider
- `messages/` – traducciones
- `i18n/` – routing/request/navigation de next-intl
- `components/` – UI
- `data/` – contenido seed separado de presentación
- `styles/_tokens.scss` – tokens SCSS
- `styles/_mixins.scss` – mixins
- `app/globals.scss` – estilos globales actuales
- `netlify.toml` – configuración base de Netlify

## Estado

La base técnica está lista para Tarea 8.2. El diseño visual aprobado debe implementarse fielmente en código; no rediseñar ni introducir Tailwind/shadcn.

## Siguiente instrucción para Codex

> Read `CODEX_IMPLEMENTATION_PLAN.md`. Execute TASK 8.2 only. Build the approved Home desktop using the existing Next.js + SCSS project. Inspect the repository first, preserve all approved design decisions, run relevant checks, summarize the changes, then stop.
