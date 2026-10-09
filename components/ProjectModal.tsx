"use client";
import {useEffect, useState} from "react";
import {createPortal} from "react-dom";
import {Calendar, MapPin, X} from "lucide-react";
import type { Locale, Project } from "@/types/project";

export function ProjectModal({ locale, project, onClose }: { locale: Locale; project: Project; onClose: ()=>void }) {
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);
  useEffect(() => setPortalRoot(document.body), []);

  if (!portalRoot) return null;

  return createPortal(
    <div className="modalBackdrop" role="presentation" onMouseDown={e=>{if(e.currentTarget===e.target)onClose();}}>
      <article className="projectModal" role="dialog" aria-modal="true" aria-labelledby="project-title">
        <button className="modalClose" onClick={onClose} aria-label="Cerrar"><X/></button>
        <div className="modalHero placeholderImage"><div><div className="chips darkChips">{project.expertise.slice(0,2).map(x=><span key={x}>{x}</span>)}</div><h2 id="project-title">{project.title[locale]}</h2><p>{project.summary[locale]}</p></div></div>
        <div className="modalMeta"><div><strong>Cliente</strong><span>{project.client}{project.funder ? ` · ${project.funder}`:""}</span></div><div><MapPin/><strong>País</strong><span>{project.countries.join(", ")}</span></div><div><Calendar/><strong>Periodo</strong><span>{project.period}</span></div></div>
        <div className="modalBody"><div><h3>Resumen</h3><p>{project.summary[locale]}</p><h3>Contexto y desafío</h3><p>{project.context?.[locale] ?? "Contenido detallado a completar desde el CV y la documentación del proyecto en Task 9."}</p><h3>Acciones / servicios prestados</h3><ul>{(project.actions?.[locale] ?? project.services).map(x=><li key={x}>{x}</li>)}</ul><h3>Impacto y resultados</h3><p>{project.impact?.[locale] ?? "Resultados y métricas a incorporar únicamente cuando estén respaldados por documentación de OMICRON."}</p></div><aside><h3>Áreas temáticas</h3><div className="chips stack">{project.expertise.map(x=><span key={x}>{x}</span>)}</div><h3>Servicios relacionados</h3><div className="serviceList">{project.services.map(x=><span key={x}>{x}</span>)}</div><a className="button primary modalCta" href="mailto:omicron@entel.bo">Escríbenos</a></aside></div>
      </article>
    </div>,
    portalRoot,
  );
}
