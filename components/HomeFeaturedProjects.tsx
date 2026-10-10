"use client";

import {useCallback,useEffect,useState} from "react";
import Link from "next/link";
import {useTranslations} from "next-intl";
import {ArrowRight} from "lucide-react";
import type {Locale, Project} from "@/types/project";
import {ProjectCard} from "./ProjectCard";
import {ProjectModal} from "./ProjectModal";
import styles from "./HomeSections.module.scss";

export function HomeFeaturedProjects({locale, featured, projects}: {locale: Locale; featured: Project[]; projects: Project[]}) {
  const t = useTranslations("Home");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const projectFromUrl = useCallback(() => new URLSearchParams(window.location.search).get("project"), []);
  useEffect(() => {
    const syncProject = () => setSelectedProject(projects.find(project => project.slug === projectFromUrl()) || null);
    syncProject();
    window.addEventListener("popstate", syncProject);
    return () => window.removeEventListener("popstate", syncProject);
  }, [projectFromUrl, projects]);
  const setProjectUrl = (project: Project | null, mode: "push" | "replace" = "push") => {
    const url = new URL(window.location.href);
    if (project) url.searchParams.set("project", project.slug);
    else url.searchParams.delete("project");
    window.history[mode === "push" ? "pushState" : "replaceState"](null, "", `${url.pathname}${url.search}${url.hash}`);
    setSelectedProject(project);
  };
  const openProject = (project: Project) => setProjectUrl(project);
  const selectRelatedProject = (project: Project) => setProjectUrl(project);
  const cards = featured;

  return <>
    <div className="container">
      <div className={styles.sectionHeading}><h2 id="featured-title">{t("featured.title")}</h2><p>{t("featured.intro")}</p></div>
      <div className={styles.projectGrid}>{cards.map(project => <ProjectCard key={project.id} project={project} locale={locale} onOpen={openProject}/>)}</div>
      <div className={styles.projectsAction}><Link className={styles.outlineButton} href={`/${locale}/experience`}>{t("projectsCta")}<ArrowRight size={19} aria-hidden="true"/></Link></div>
    </div>
    {selectedProject && <ProjectModal locale={locale} project={selectedProject} projects={projects} onClose={() => setProjectUrl(null, "replace")} onSelect={selectRelatedProject}/>}
  </>;
}
