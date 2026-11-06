// Site-side additions layered on top of data/experience.json, keyed by slug, so a fresh
// export of the experience database can replace that file without losing them.

// Slugs with an approved cover at /images/projects/<slug>/cover.webp (sources: docs/image-sources.md).
export const projectCovers = new Set([
  'agro-innova', 'aguasan-peru', 'apemin-ii', 'arco', 'bermejo-gef', 'bgi-responsible-mining',
  'biotrade-iv', 'caf-biodiversity-finance', 'ciao-organic-agriculture', 'clima-loca',
  'cosude-nicaragua-strategy', 'emagua', 'fautapo-social-enterprise', 'fomilenio', 'funriego',
  'gama-peru', 'gestion-ambiental-municipal', 'innova-af', 'itc-bol-61-80', 'lake-poopo',
  'mexico-water-policy', 'misicuni-nexo', 'mosquitia-governance', 'northern-zone-el-salvador',
  'paisajes-resilientes', 'papa-andina', 'peb-la', 'periurban-water', 'peru-bosques',
  'peru-sanitation-sector', 'pghtr13gf', 'pgl-apim', 'priica', 'proagro', 'procacao-procacaho',
  'proeib-andes', 'redsicta', 'sanbasur', 'usaid-colombia-sustainability',
  'water-performance-framework',
]);

// English titles the export left in Spanish. Fold these back into the database on its next revision.
export const englishTitles: Record<string, string> = {
  'bgi-responsible-mining': '2018 Regional Meeting and 2017 Report',
  'plan-estrategico-institucional-2013-2017-exp-070': 'Institutional Strategic Plan 2013–2017',
  'encuentro-andino-amazonico-exp-094': 'Andean-Amazonian Meeting',
  'modelo-de-innovacion-continua-pic-cosude-exp-109': 'PIC Continuous Innovation Model – SDC',
  'proyecto-fortalecimiento-de-la-fedecacc-exp-123': 'FEDECACC Strengthening Project',
  'analisis-legal-y-gestion-cesat-exp-188': 'CESAT Legal and Management Review',
  'apemin-ii': 'APEMIN II Proposal Preparation',
  'reingenieria-y-plan-estrategico-de-basfor-exp-260': 'BASFOR Re-engineering and Strategic Plan',
  'moderacion-del-taller-fanpe-en-lima-peru-exp-341': 'FANPE Workshop Facilitation in Lima, Peru',
};
