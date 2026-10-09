"use client";

import {useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {useTranslations} from "next-intl";
import {ArrowRight} from "lucide-react";
import type {Locale, Project} from "@/types/project";
import {assets} from "@/data/assets";
import {homeFeaturedOrder} from "@/data/home";
import {ProjectModal} from "./ProjectModal";
import styles from "./HomeSections.module.scss";

const countryCodes: Record<string, string> = {
  Colombia: "CO", Ecuador: "EC", Perú: "PE", "Costa Rica": "CR", Panamá: "PA",
  "El Salvador": "SV", Honduras: "HN", Guatemala: "GT", "República Dominicana": "DO", Bolivia: "BO",
};

export function HomeFeaturedProjects({locale, featured}: {locale: Locale; featured: Project[]}) {
  const t = useTranslations("Home");
  const common = useTranslations("Common");
  const countries = useTranslations("Countries");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const cards = homeFeaturedOrder.map(slug => featured.find(project => project.slug === slug)).filter((project): project is Project => Boolean(project));

  return <>
    <div className="container">
      <div className={styles.sectionHeading}><h2 id="featured-title">{t("featured.title")}</h2><p>{t("featured.intro")}</p></div>
      <div className={styles.projectGrid}>{cards.map(project => <article className={styles.projectCard} key={project.slug}>
        <div className={styles.projectImage}><Image src={project.image || assets.project} alt={t("featured.imageAlt")} fill sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 25vw"/></div>
        <div className={styles.projectContent}>
          <ul className={styles.tags}>{[0, 1].map(key => <li key={key}>{t(`featured.tags.${project.slug}.${key}`)}</li>)}</ul>
          <h3>{t(`projects.${project.slug}.title`)}</h3>
          <p className={styles.client}>{project.client}{project.funder && <> · {project.funder === "Unión Europea" ? t("clients.eu") : project.funder}</>}</p>
          <p className={styles.projectMeta}>{project.countries.length > 1 ? t(`featured.regions.${project.region === "Centroamérica" ? "centroamerica" : "andina"}`) : countries(countryCodes[project.countries[0]])} · {project.period}</p>
          <button className={styles.projectLink} type="button" onClick={() => setSelectedProject(project)}>{common("viewProject")}<ArrowRight size={17} aria-hidden="true"/></button>
        </div>
      </article>)}</div>
      <div className={styles.projectsAction}><Link className={styles.outlineButton} href={`/${locale}/experience`}>{t("projectsCta")}<ArrowRight size={19} aria-hidden="true"/></Link></div>
    </div>
    {selectedProject && <ProjectModal locale={locale} project={selectedProject} onClose={() => setSelectedProject(null)}/>}
  </>;
}
