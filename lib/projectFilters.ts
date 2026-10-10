import type {Locale, Project} from '@/types/project';
export const PAGE_SIZE = 9;
export type ProjectFilters = {q: string; expertise: string; service: string; country: string; client: string; year: string; sort: string};
export const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase().trim();
export function projectYears(project: Project): number[] {
  const years = project.period.match(/\d{4}/g)?.map(Number) || [];
  const start = project.startYear || Number(project.startDate?.slice(0,4)) || years[0];
  const end = project.endYear || Number(project.endDate?.slice(0,4)) || years.at(-1) || start;
  return start && end >= start ? Array.from({length: end-start+1}, (_,i) => start+i) : [];
}
export function filterProjects(projects: Project[], filters: ProjectFilters, locale: Locale, searchLabels?: (project: Project) => string[]) {
  const matches = projects.filter(project => {
    const haystack = [project.title[locale], project.summary[locale], project.client, project.funder || '', ...project.countries, project.region, ...project.expertise, ...project.services, ...(project.tags?.[locale] || []), ...(searchLabels?.(project) || [])].join(' ');
    return normalize(haystack).includes(normalize(filters.q)) &&
      (!filters.expertise || project.expertise.includes(filters.expertise)) &&
      (!filters.service || project.services.includes(filters.service)) &&
      (!filters.country || [...project.countries, ...(project.regions || [project.region])].some(value => normalize(value) === normalize(filters.country))) &&
      (!filters.client || project.client === filters.client || project.funder === filters.client) &&
      (!filters.year || projectYears(project).includes(Number(filters.year)));
  });
  return matches.sort((a,b) => filters.sort === 'title' ? a.title[locale].localeCompare(b.title[locale],locale) : (Math.max(0,...projectYears(a))-Math.max(0,...projectYears(b))) * (filters.sort === 'oldest' ? 1 : -1) || a.slug.localeCompare(b.slug));
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
