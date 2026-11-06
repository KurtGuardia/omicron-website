'use client';
import {ParallaxImage} from './ParallaxImage';
import {contactMailto} from '@/data/contact';
import Image from 'next/image';
import {assets} from '@/data/assets';
import {ArrowRight, Search, Leaf, FileText, MapPin, Users, CalendarDays, RotateCcw, ChevronLeft, ChevronRight, Mail} from 'lucide-react';
import {useEffect,useMemo,useState} from 'react';
import {useSearchParams,useRouter,usePathname} from 'next/navigation';
import {useTranslations} from 'next-intl';
import type {Locale,Project} from '@/types/project';
import {useProjectLabels} from './useProjectLabels';
import {expertiseValues, serviceValues} from '@/lib/projectLabels';
import {mapCountries} from '@/data/mapCountries';
import {filterProjects,paginateProjects,paginationPages,projectYears,type ProjectFilters} from '@/lib/projectFilters';
import {ProjectModal} from './ProjectModal';
import {ProjectCard} from './ProjectCard';
import {Contours} from './Contours';
import styles from './ExperienceExplorer.module.scss';
const filterKeys=['expertise','service','country','client','year'] as const;
const icons=[Leaf,FileText,MapPin,Users,CalendarDays];
const unique=(values:string[])=>[...new Set(values.filter(Boolean))].sort();
// Taxonomy options follow the Home order and only list values some project uses.
const inTaxonomyOrder=(taxonomy:string[],used:string[])=>taxonomy.filter(value=>used.includes(value));
export function ExperienceExplorer({locale,projects}:{locale:Locale;projects:Project[]}) {
  const t=useTranslations('Experience'); const emailCopy = useTranslations("ContactEmail"); const home=useTranslations('Home'); const labels=useProjectLabels();
  const search=useSearchParams(); const router=useRouter(); const pathname=usePathname();
  const query=search.get('q')||''; const [draft,setDraft]=useState(query);
  useEffect(()=>setDraft(query),[query]);
  // Unknown taxonomy values (e.g. stale links) are ignored rather than breaking the labels.
  const taxonomyParam=(key:'expertise'|'service',values:string[])=>{const value=search.get(key)||'';return values.includes(value)?value:'';};
  const filters:ProjectFilters={q:query,expertise:taxonomyParam('expertise',expertiseValues),service:taxonomyParam('service',serviceValues),country:search.get('country')||'',client:search.get('client')||'',year:search.get('year')||'',sort:search.get('sort')||'recent'};
  const filtered=filterProjects(projects,filters,locale,project=>[...project.expertise.map(labels.expertise),...project.services.map(labels.service),labels.location(project),project.funder==='Unión Europea'?home('clients.eu'):'']);
  const {items,page,totalPages}=paginateProjects(filtered,Number(search.get('page')||1));
  const selected=projects.find(project=>project.slug===search.get('project'));
  const options=useMemo(()=>({expertise:inTaxonomyOrder(expertiseValues,projects.flatMap(p=>p.expertise)),service:inTaxonomyOrder(serviceValues,projects.flatMap(p=>p.services)),country:unique([...Object.values(mapCountries).map(c=>c.queryCountry),...projects.flatMap(p=>[...p.countries,...(p.regions||[p.region])])]),client:unique(projects.flatMap(p=>[p.client,...(p.funder?[p.funder]:[])])),year:unique(projects.flatMap(p=>projectYears(p).map(String))).reverse()}),[projects]);
  function update(values:Record<string,string>,resetPage=true) {
    const params=new URLSearchParams(search.toString());
    if(resetPage) params.delete('page');
    for(const [key,value] of Object.entries(values)) { if(value) params.set(key,value); else params.delete(key); }
    router.push(`${pathname}${params.size?'?'+params.toString():''}`,{scroll:false});
  }
  function clear(){setDraft('');update({q:'',expertise:'',service:'',country:'',client:'',year:''});}
  function label(key:typeof filterKeys[number],value:string) {
    if(key==='expertise')return labels.expertise(value);
    if(key==='service')return labels.service(value);
    if(key==='country')return labels.geography(value);
    return value==='Unión Europea'?home('clients.eu'):value;
  }
  return <>
    <section className={styles.hero} aria-labelledby='experience-title'><ParallaxImage src={assets.hero} className={styles.heroPhoto}/><Contours tone='light'/><div className='container'>
      <p className={styles.eyebrow}>{t('eyebrow')}</p><h1 id='experience-title'>{t('title')}<span>.</span></h1><p className={styles.intro}>{t('intro')}</p>
    </div></section>
    <main id='main-content' tabIndex={-1} className={styles.explorer}><Contours tone='dark'/><div className='container'>
      <div className={styles.heading}><h2>{t('heading')}</h2><p>{t('support')}</p></div>
      <form className={styles.search} role='search' onSubmit={event=>{event.preventDefault();update({q:draft.trim()});}}>
        <div className={styles.searchInput}><Search size={25} aria-hidden='true'/><input id='project-search' type='search' aria-label={t('searchPlaceholder')} placeholder={t('searchPlaceholder')} value={draft} onChange={event=>setDraft(event.target.value)}/></div>
        <button className={styles.primary} type='submit'>{t('search')}<ArrowRight size={22} aria-hidden='true'/></button>
      </form>
      <div className={styles.filters}>{filterKeys.map((key,index)=>{const Icon=icons[index];const allKeys=['allExpertise','allServices','allCountries','allClients','allYears'];return <label key={key}><span><Icon size={26} aria-hidden='true'/>{t(key)}</span><select value={filters[key]} onChange={event=>update({[key]:event.target.value})}><option value=''>{t(allKeys[index])}</option>{filters[key]&&!options[key].includes(filters[key])&&<option value={filters[key]}>{label(key,filters[key])}</option>}{options[key].map(value=><option key={value} value={value}>{label(key,value)}</option>)}</select></label>;})}</div>
      <div className={styles.results}><p role='status' aria-live='polite'>{t('count',{count:filtered.length})}</p><div className={styles.controls}><button className={styles.clear} type='button' onClick={clear}><RotateCcw size={18} aria-hidden='true'/>{t('clear')}</button><label className={styles.sort}>{t('sort')}<select value={filters.sort} onChange={event=>update({sort:event.target.value==='recent'?'':event.target.value})}><option value='recent'>{t('recent')}</option><option value='oldest'>{t('oldest')}</option><option value='title'>{t('titleSort')}</option></select></label></div></div>
      {items.length ? <div className={styles.grid}>{items.map(project=><ProjectCard key={project.id} project={project} locale={locale} variant='experience' onOpen={project=>update({project:project.slug},false)}/>)}</div> : <div className={styles.empty}><p>{t('empty')}</p><button className={styles.clear} type="button" onClick={clear}>{t('clear')}</button></div>}
      {items.length>0&&<nav className={styles.pagination} aria-label={t('pagination')}><button aria-label={t('previous')} disabled={page===1} onClick={()=>update({page:String(page-1)},false)}><ChevronLeft size={20}/></button>{paginationPages(page,totalPages).map((value,index)=>value==='ellipsis'?<span key={`gap-${index}`}>…</span>:<button key={value} aria-label={t('page',{page:value})} aria-current={value===page?'page':undefined} onClick={()=>update({page:value===1?'':String(value)},false)}>{value}</button>)}<button aria-label={t('next')} disabled={page===totalPages} onClick={()=>update({page:String(page+1)},false)}><ChevronRight size={20}/></button></nav>}
    </div></main>
    <section className={styles.contact}><Image src={assets.hero} alt='' fill sizes='100vw' className={styles.contactPhoto}/><Contours tone='light'/><div className={`container ${styles.contactInner}`}><div className={styles.mail}><Mail size={44} aria-hidden='true'/></div><div><h2>{t('contactTitle')}</h2><p>{t('contactBody')}</p></div><a className={styles.primary} href={contactMailto(emailCopy("subject"), emailCopy("body"))} target="_blank" rel="noopener noreferrer">{t('contactCta')}<ArrowRight size={24} aria-hidden='true'/></a></div></section>
    {selected&&<ProjectModal locale={locale} project={selected} projects={projects} onClose={()=>update({project:''},false)} onSelect={project=>update({project:project.slug},false)}/>}
  </>;
}
