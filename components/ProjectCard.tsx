'use client';
import Image from 'next/image';
import {ArrowRight, MapPin} from 'lucide-react';
import {useTranslations} from 'next-intl';
import type {Locale, Project} from '@/types/project';
import {assets} from '@/data/assets';
import {countryCode,regionKey} from '@/lib/projectLabels';
import styles from './ProjectCard.module.scss';
export function ProjectCard({project,locale,onOpen,variant='home'}: {project:Project;locale:Locale;onOpen:(project:Project)=>void;variant?:'home'|'experience'}) {
  const common=useTranslations('Common'); const home=useTranslations('Home'); const countries=useTranslations('Countries'); const experience=useTranslations('Experience');
  const location=project.countries.length>1 ? (regionKey[project.region] ? experience(regionKey[project.region]) : project.region) : (countryCode(project.countries[0]) ? countries(countryCode(project.countries[0])!) : project.countries[0]);
  return <article className={`${styles.projectCard} ${variant==='experience' ? styles.experience : ''}`}>
    <div className={styles.projectImage}><Image src={project.image || assets.project} alt={home('featured.imageAlt')} fill sizes={variant==='home' ? '(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 25vw' : '(max-width: 600px) 100vw, (max-width: 1024px) 50vw, (min-width: 1700px) 25vw, 33vw'}/></div>
    <div className={styles.projectContent}>
      <ul className={styles.tags}>{(project.tags?.[locale] || project.expertise).slice(0,2).map(tag=><li key={tag}>{tag}</li>)}</ul>
      <h3>{project.title[locale]}</h3>
      <p className={styles.client}>{project.client}{project.funder && <> · {project.funder==='Unión Europea' ? home('clients.eu') : project.funder}</>}</p>
      <p className={styles.projectMeta}>{variant==='experience' && <MapPin size={16} aria-hidden='true'/>}{location} · {project.period}</p>
      {variant==='experience' && <p className={styles.summary}>{project.summary[locale]}</p>}
      <button className={styles.projectLink} type='button' aria-label={`${common('viewProject')}: ${project.title[locale]}`} onClick={()=>onOpen(project)}>{common('viewProject')}<ArrowRight size={17} aria-hidden='true'/></button>
    </div>
  </article>;
}
