'use client';
import {ContentImage} from './ContentImage';
import {useProjectLabels} from './useProjectLabels';
import {ArrowRight, MapPin} from 'lucide-react';
import {useTranslations} from 'next-intl';
import type {Locale, Project} from '@/types/project';
import styles from './ProjectCard.module.scss';
import {reveal} from '@/lib/reveal';
export function ProjectCard({project,locale,onOpen,variant='home',revealIndex}: {project:Project;locale:Locale;onOpen:(project:Project)=>void;variant?:'home'|'experience';revealIndex?:number}) {
  const common=useTranslations('Common'); const home=useTranslations('Home'); const labels=useProjectLabels();
  const location=labels.location(project);
  return <article className={`${styles.projectCard} ${variant==='experience' ? styles.experience : ''}`} {...(revealIndex === undefined ? {} : reveal(revealIndex))}>
    <div className={styles.projectImage}><ContentImage src={project.image} alt={project.image ? project.title[locale] : home('featured.imageAlt')} fill sizes={variant==='home' ? '(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 25vw' : '(max-width: 600px) 100vw, (max-width: 1024px) 50vw, (min-width: 1700px) 25vw, 33vw'}/></div>
    <div className={styles.projectContent}>
      <ul className={styles.tags}>{(project.tags?.[locale] || project.expertise.map(labels.expertise)).slice(0,2).map(tag=><li key={tag}>{tag}</li>)}</ul>
      <h3>{project.title[locale]}</h3>
      <p className={styles.client}>{project.client}{project.funder && <> · {project.funder==='Unión Europea' ? home('clients.eu') : project.funder}</>}</p>
      <p className={styles.projectMeta}>{variant==='experience' && <MapPin size={16} aria-hidden='true'/>}{[location,project.period].filter(Boolean).join(' · ')}</p>
      {variant==='experience' && project.summary[locale] && <p className={styles.summary}>{project.summary[locale]}</p>}
      <button className={styles.projectLink} type='button' aria-label={`${common('viewProject')}: ${project.title[locale]}`} onClick={()=>onOpen(project)}>{common('viewProject')}<ArrowRight size={17} aria-hidden='true'/></button>
    </div>
  </article>;
}
