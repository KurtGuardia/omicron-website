import type {Locale} from '@/types/project';

export type Partner = {
  id: string;
  name: Record<Locale, string>;
  image?: string;
  localizedImage?: Partial<Record<Locale, string>>;
  darkSurface?: boolean;
};

// One entry per parent organization. Legacy/program variants in the project
// data (for example GTZ and IICA/REDSICTA) are represented by their parent.
export const partners: readonly Partner[] = [
  {id: 'chemonics', name: {es: 'Chemonics', en: 'Chemonics'}, image: '/images/partners/chemonics.webp', darkSurface: true},
  {id: 'european-union', name: {es: 'Unión Europea', en: 'European Union'}},
  {id: 'caf', name: {es: 'CAF', en: 'CAF'}, image: '/images/partners/caf.webp'},
  {id: 'iica', name: {es: 'IICA', en: 'IICA'}, image: '/images/partners/iica.webp'},
  {id: 'idb', name: {es: 'BID', en: 'IDB'}, image: '/images/partners/bid.webp'},
  {id: 'giz', name: {es: 'GIZ', en: 'GIZ'}, image: '/images/partners/giz.webp'},
  {id: 'kfw', name: {es: 'KfW', en: 'KfW'}, image: '/images/partners/kfw.svg'},
  {id: 'sdc', name: {es: 'COSUDE', en: 'SDC'}, image: '/images/partners/sdc.webp'},
  {id: 'unctad', name: {es: 'ONU Comercio y Desarrollo', en: 'UN Trade and Development'}, localizedImage: {es: '/images/partners/unctad-es.webp', en: '/images/partners/unctad-en.webp'}},
  {id: 'dgrv', name: {es: 'DGRV', en: 'DGRV'}, image: '/images/partners/dgrv.svg'},
  {id: 'alliance-bioversity-ciat', name: {es: 'Alianza Bioversity International–CIAT', en: 'Alliance Bioversity International–CIAT'}, image: '/images/partners/alliance-bioversity-ciat.webp'},
  {id: 'usaid', name: {es: 'USAID', en: 'USAID'}, image: '/images/partners/usaid.webp'},
  {id: 'gef', name: {es: 'Fondo para el Medio Ambiente Mundial (GEF)', en: 'Global Environment Facility (GEF)'}, image: '/images/partners/gef.webp'},
  {id: 'gfa', name: {es: 'GFA Consulting Group', en: 'GFA Consulting Group'}, image: '/images/partners/gfa.webp'},
  {id: 'itc', name: {es: 'Centro de Comercio Internacional (ITC)', en: 'International Trade Centre (ITC)'}, image: '/images/partners/itc.webp'},
  {id: 'fautapo', name: {es: 'FAUTAPO', en: 'FAUTAPO'}, image: '/images/partners/fautapo.webp'},
];
