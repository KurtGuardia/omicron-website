'use client';
import {ContentImage} from './ContentImage';
import {useProjectLabels} from './useProjectLabels';
import {useEffect,useRef,useState} from 'react';
import {createPortal} from 'react-dom';
import {ArrowRight, BarChart3, BookOpenCheck, CalendarDays, Check, Image as ImageIcon, Leaf, Link as LinkIcon, Mail, MapPin, Settings2, Target, Users, X} from 'lucide-react';
import {useTranslations} from 'next-intl';
import type {Locale,Project,LocalizedProjectValue} from '@/types/project';
import styles from './ProjectModal.module.scss';
const sectionIcons=[Target,BookOpenCheck,Settings2,BarChart3];
const localized=<T,>(value:LocalizedProjectValue<T>|undefined,locale:Locale):T|undefined => value===undefined ? undefined : typeof value==='string' || Array.isArray(value) ? value as T : (value as Record<Locale,T>)[locale];
export function ProjectModal({locale,project,projects=[],onClose,onSelect}: {locale:Locale;project:Project;projects?:Project[];onClose:()=>void;onSelect?:(project:Project)=>void}) {
  const [portalRoot,setPortalRoot]=useState<HTMLElement|null>(null); const closeRef=useRef<HTMLButtonElement>(null); const closeAction=useRef(onClose); closeAction.current=onClose; const t=useTranslations('ProjectModal'); const labels=useProjectLabels();
  useEffect(()=>{setPortalRoot(document.body);},[]);
  useEffect(()=>{
    if(!portalRoot)return;
    const previous=document.activeElement as HTMLElement|null;
    const oldOverflow=document.body.style.overflow;
    const modalRoot=closeRef.current?.closest('[role=dialog]')?.parentElement;
    const isolated=Array.from(document.body.children).filter((node):node is HTMLElement=>node instanceof HTMLElement&&node!==modalRoot).map(element=>({element,inert:element.inert,ariaHidden:element.getAttribute('aria-hidden')}));
    document.body.style.overflow='hidden';
    for(const {element} of isolated){element.inert=true;element.setAttribute('aria-hidden','true');}
    closeRef.current?.focus({preventScroll:true});
    const onKey=(event:KeyboardEvent)=>{if(event.key==='Escape')closeAction.current();};
    window.addEventListener('keydown',onKey);
    return()=>{
      document.body.style.overflow=oldOverflow;
      window.removeEventListener('keydown',onKey);
      for(const {element,inert,ariaHidden} of isolated){element.inert=inert;if(ariaHidden===null)element.removeAttribute('aria-hidden');else element.setAttribute('aria-hidden',ariaHidden);}
      if(previous?.isConnected)previous.focus({preventScroll:true});
    };
  },[portalRoot]);
  if(!portalRoot)return null;
  const related=(project.relatedProjectIds||[]).map(id=>projects.find(item=>item.id===id)).filter((item):item is Project=>item!==undefined&&item.id!==project.id).slice(0,3);
  const image=project.image; const context=localized(project.context,locale); const actions=localized(project.actions,locale); const results=localized(project.results,locale);
  const detailBlocks=[
    ...(project.summary[locale]?[{title:t('summary'),text:project.summary[locale],icon:sectionIcons[0]}]:[]),
    ...(context?[{title:t('context'),text:context,icon:sectionIcons[1]}]:[]),
    ...(actions?.length?[{title:t('actions'),items:actions,icon:sectionIcons[2]}]:[]),
    ...(results||project.metrics?.length?[{title:t('impact'),text:results,metrics:project.metrics,icon:sectionIcons[3]}]:[]),
  ];
  const meta=[
    ...(project.client?[{icon:Users,label:t('client'),value:<>{project.client}{project.funder&&<> · {project.funder==='Unión Europea'?t('eu'):project.funder}</>}</>}]:[]),
    ...(labels.location(project)?[{icon:MapPin,label:t('country'),value:labels.location(project)}]:[]),
    ...(project.period?[{icon:CalendarDays,label:t('period'),value:project.period}]:[]),
  ];
  const tags=project.tags?.[locale]?.length?project.tags[locale]:project.expertise.map(labels.expertise);
  return createPortal(<div className={styles.backdrop} role='presentation' onMouseDown={event=>{if(event.target===event.currentTarget)onClose();}}>
    <article className={styles.dialog} role='dialog' aria-modal='true' aria-labelledby='project-modal-title' aria-describedby={project.summary[locale]?"project-modal-summary":undefined} onKeyDown={event=>{if(event.key==='Tab'){const nodes=event.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled),a[href]');const first=nodes[0],last=nodes[nodes.length-1],active=document.activeElement;if(!event.currentTarget.contains(active)){event.preventDefault();first?.focus();}else if(event.shiftKey&&active===first){event.preventDefault();last?.focus();}else if(!event.shiftKey&&active===last){event.preventDefault();first?.focus();}}}}>
      <button ref={closeRef} className={styles.close} onClick={onClose} aria-label={t('close')}><X size={24}/></button>
      <div className={styles.scrollBody}>
      <header className={styles.hero}><ContentImage src={image} alt='' fill sizes='(max-width: 1024px) 100vw, (max-width: 1636px) calc(100vw - 96px), 1440px' className={styles.heroImage}/><div className={styles.heroShade}/><div className={styles.heroContent}>{tags.length>0&&<div className={styles.heroTags}>{tags.slice(0,2).map((tag,index)=><span className={index===0?styles.greenTag:styles.blueTag} key={tag}><Leaf size={16}/>{tag}</span>)}</div>}<h2 id='project-modal-title'>{project.title[locale]}</h2>{project.summary[locale]&&<p id='project-modal-summary'>{project.summary[locale]}</p>}</div></header>
      {meta.length>0&&<div className={styles.meta}>{meta.map(({icon:Icon,label,value})=><div className={styles.metaItem} key={label}><span className={styles.metaIcon}><Icon size={23}/></span><div><strong>{label}</strong><span>{value}</span></div></div>)}</div>}
      <div className={styles.body}><div className={styles.details}>{detailBlocks.map(({title,text,items,metrics,icon:Icon})=><section className={styles.detail} key={title}><span className={styles.detailIcon}><Icon size={24}/></span><div><h3>{title}</h3>{items?<ul className={styles.actions}>{items.map(item=><li key={item}><Check size={17}/>{item}</li>)}</ul>:text&&<p>{text}</p>}{metrics?.length&&<dl className={styles.metrics}>{metrics.map(metric=><div key={`${metric.label}-${metric.value}`}><dt>{metric.label}</dt><dd>{metric.value}</dd></div>)}</dl>}</div></section>)}
        <div className={styles.cta}><span className={styles.ctaIcon}><Mail size={24}/></span><div><strong>{t('similarTitle')}</strong><p>{t('similarBody')}</p></div><a href='mailto:omicron@entel.bo'>{t('writeUs')}<ArrowRight size={18}/></a></div>
      </div><aside className={styles.sidebar}>
        {project.expertise.length>0&&<section className={styles.sideSection}><h3><Leaf size={21}/>{t('areas')}</h3><div className={styles.areaTags}>{project.expertise.map((tag,index)=><span className={styles[`area${index%4}`]} key={tag}><Leaf size={16}/>{labels.expertise(tag)}</span>)}</div></section>}
        {project.services.length>0&&<section className={styles.sideSection}><h3><Settings2 size={22}/>{t('services')}</h3><div className={styles.services}>{project.services.map(item=><span key={item}>{labels.service(item)}</span>)}</div></section>}
        {Boolean(project.gallery?.length)&&<section className={styles.sideSection}><h3><ImageIcon size={22}/>{t('gallery')}</h3><div className={styles.gallery}>{project.gallery!.slice(0,3).map((src,index)=><div className={styles.galleryImage} key={`${src}-${index}`}><ContentImage src={src} alt={t('galleryAlt',{title:project.title[locale]})} fill sizes='(max-width: 800px) calc(100vw - 40px), (max-width: 1024px) 40vw, 440px'/></div>)}</div></section>}
        {related.length>0&&<section className={styles.sideSection}><h3><LinkIcon size={21}/>{t('related')}</h3><div className={styles.related}>{related.map(item=><button type='button' key={item.id} onClick={()=>onSelect?.(item)} disabled={!onSelect}><span className={styles.relatedImage}><ContentImage src={item.image} alt='' fill sizes='80px'/></span><span className={styles.relatedCopy}><strong>{item.title[locale]}</strong><small>{item.tags?.[locale]?.[0]||labels.expertise(item.expertise[0])}</small><small>{[labels.location(item),item.period].filter(Boolean).join(' · ')}</small></span><ArrowRight size={17}/></button>)}</div></section>}
      </aside></div>
      </div>
    </article>
  </div>,portalRoot);
}
