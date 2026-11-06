# OMICRON Consultores – sitio web

Sitio bilingüe (ES/EN) de OMICRON Consultores: Home y catálogo de experiencia.

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
pnpm check       # auditoría ES/EN + invariantes del dataset
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
- `data/experience.json` – base de experiencia (una tarjeta por engagement del CV)
- `data/projects.ts` – adaptador del dataset a la UI
- `data/projectOverrides.ts` – portadas y títulos EN que no vienen en la exportación
- `data/` – resto de contenido separado de presentación
- `styles/_tokens.scss` – tokens SCSS
- `app/globals.scss` – estilos globales actuales
- `netlify.toml` – configuración base de Netlify

## Base de experiencia

`data/experience.json` es la exportación del Excel de revisión (*OMICRON Experience Database*). Para publicar correcciones se reemplaza ese archivo con la nueva exportación, manteniendo el nombre; editar el Excel no cambia el sitio por sí solo.

- Solo se publican los registros con `publish_status: "Publish"`.
- Los Featured de Home son los registros con `featured: true`.
- `results_*`, `context_*` y galerías vacíos ocultan su sección; no se rellenan.
- El inglés de la mayoría de registros es un resumen editorial conciso, no una traducción integral.
- Las portadas y correcciones de títulos EN viven en `data/projectOverrides.ts` (por slug) para sobrevivir a nuevas exportaciones.
- Tras reemplazar el JSON, ejecutar `pnpm check` y `pnpm build`.
