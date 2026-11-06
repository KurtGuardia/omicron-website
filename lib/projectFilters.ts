import type {Locale, Project} from '@/types/project';
export const PAGE_SIZE = 9;
export type ProjectFilters = {q: string; expertise: string; service: string; country: string; client: string; year: string; sort: string};
export const normalize = (value: string) => value.normalize('NFD').replace(/[̀-ͯ]/g, '').toLocaleLowerCase().trim();
// Punctuation-insensitive form, so "GTZ-PROAGRO", "GTZ – PROAGRO" and "gtz proagro" compare equal.
export const entityKey = (value: string) => normalize(value).replace(/[^a-z0-9]+/g, ' ').trim();
const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// Matches only from the start of a word: "bid" finds BID but not "debido"; "agua" not "Nicaragua".
const startsWord = (haystack: string, needle: string) => !needle || new RegExp(`(?:^|[^a-z0-9])${escapeRegExp(needle)}`).test(haystack);
// Whole-entity match: "SECO" matches "IBCE/SECO COSUDE" but never a longer word such as "SECOND".
const hasEntity = (organizations: string[], entity: string) => {
  const key = ` ${entityKey(entity)} `;
  return organizations.some(organization => ` ${entityKey(organization)} `.includes(key));
};
export function projectYears(project: Project): number[] {
  const years = project.period.match(/\d{4}/g)?.map(Number) || [];
  const start = project.startYear || Number(project.startDate?.slice(0,4)) || years[0];
  const end = project.endYear || Number(project.endDate?.slice(0,4)) || years.at(-1) || start;
  return start && end >= start ? Array.from({length: end-start+1}, (_,i) => start+i) : [];
}
// Country filter values are ISO codes (or region names for regional work). Older links used
// Spanish country names (?country=Perú); they resolve to the matching code.
export function countryFilterValue(projects: Project[], value: string) {
  if (!value || projects.some(project => project.countryIso.includes(value))) return value;
  for (const project of projects) {
    const index = project.countries.findIndex(name => normalize(name) === normalize(value));
    if (index >= 0 && project.countryIso[index]) return project.countryIso[index];
  }
  return value;
}
const matchesCountry = (project: Project, value: string) =>
  project.countryIso.includes(value) || (project.regions || []).some(region => normalize(region) === normalize(value));
export function filterProjects(projects: Project[], filters: ProjectFilters, locale: Locale, searchLabels?: (project: Project) => string[]) {
  const query = normalize(filters.q);
  const matches = projects.filter(project => {
    const haystack = query ? normalize([project.title.es, project.title.en, project.summary.es, project.summary.en, project.originalTitle || '', project.sourceRole || '', project.client, project.funder || '', ...project.organizations, ...project.countries, project.region, ...project.expertise, ...project.services, ...(project.tags?.[locale] || []), ...(searchLabels?.(project) || [])].join(' ')) : '';
    return startsWord(haystack, query) &&
      (!filters.expertise || project.expertise.includes(filters.expertise)) &&
      (!filters.service || project.services.includes(filters.service)) &&
      (!filters.country || matchesCountry(project, filters.country)) &&
      (!filters.client || hasEntity(project.organizations, filters.client)) &&
      (!filters.year || projectYears(project).includes(Number(filters.year)));
  });
  return matches.sort((a,b) => filters.sort === 'title' ? a.title[locale].localeCompare(b.title[locale],locale) : (Math.max(0,...projectYears(a))-Math.max(0,...projectYears(b))) * (filters.sort === 'oldest' ? 1 : -1) || a.slug.localeCompare(b.slug));
}
// One option per distinct organization; spelling variants that differ only in case,
// accents or punctuation collapse to the most frequent spelling.
export function organizationOptions(projects: Project[]) {
  const variants = new Map<string, Map<string, number>>();
  for (const name of projects.flatMap(project => project.organizations)) {
    const key = entityKey(name);
    if (!key) continue;
    const counts = variants.get(key) || new Map<string, number>();
    counts.set(name, (counts.get(name) || 0) + 1);
    variants.set(key, counts);
  }
  return [...variants.values()].map(counts => [...counts].sort((a,b) => b[1]-a[1] || a[0].localeCompare(b[0]))[0][0]);
}
export function paginateProjects(projects: Project[], requestedPage: number, pageSize = PAGE_SIZE) {
  const totalPages = Math.max(1,Math.ceil(projects.length/pageSize));
  const page = Math.min(totalPages,Math.max(1,Number.isFinite(requestedPage) ? Math.floor(requestedPage) : 1));
  return {page,totalPages,items:projects.slice((page-1)*pageSize,page*pageSize)};
}
export function paginationPages(page: number,total: number): (number|'ellipsis')[] {
  return Array.from({length:total},(_,i)=>i+1).reduce<(number|'ellipsis')[]>((items,value) => {
    if(value===1 || value===total || Math.abs(value-page)<=1) items.push(value);
    else if(items.at(-1)!=='ellipsis') items.push('ellipsis');
    return items;
  },[]);
}
