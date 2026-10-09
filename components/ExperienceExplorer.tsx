"use client";

import Link from "next/link";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import type { Locale, Project } from "@/types/project";
import { ProjectModal } from "./ProjectModal";

export function ExperienceExplorer({ locale, projects }: { locale: Locale; projects: Project[] }) {
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("");
  const [service, setService] = useState("");
  const [expertise, setExpertise] = useState("");
  const search = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const selected = projects.find(p => p.slug === search.get("project"));
  const countries = [...new Set(projects.flatMap(p=>p.countries))].sort();
  const services = [...new Set(projects.flatMap(p=>p.services))].sort();
  const expertiseList = [...new Set(projects.flatMap(p=>p.expertise))].sort();
  const filtered = useMemo(()=>projects.filter(p=>{
    const hay = `${p.title[locale]} ${p.client} ${p.countries.join(" ")} ${p.summary[locale]}`.toLowerCase();
    return (!query || hay.includes(query.toLowerCase())) && (!country || p.countries.includes(country)) && (!service || p.services.includes(service)) && (!expertise || p.expertise.includes(expertise));
  }),[projects,query,country,service,expertise,locale]);
  function open(slug:string){ router.push(`${pathname}?project=${slug}`, {scroll:false}); }
  function close(){ router.push(pathname, {scroll:false}); }
  function clear(){setQuery("");setCountry("");setService("");setExpertise("");}
  return <>
    <section className="experienceHero"><div className="container"><p className="eyebrow">NUESTRA EXPERIENCIA</p><h1>Proyectos que generan impacto.</h1><p>Explora nuestra experiencia por tema, servicio, territorio o institución.</p></div></section>
    <main className="section explorer"><div className="container">
      <div className="explorerHeader"><h2>Explora nuestros proyectos</h2><p>Encuentra rápidamente experiencias comparables a tu desafío.</p></div>
      <div className="searchBar"><Search/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar por proyecto, cliente, país o palabra clave…"/><button>Buscar</button></div>
      <div className="filters"><label><span>Área temática</span><select value={expertise} onChange={e=>setExpertise(e.target.value)}><option value="">Todas las áreas</option>{expertiseList.map(x=><option key={x}>{x}</option>)}</select></label><label><span>Servicio</span><select value={service} onChange={e=>setService(e.target.value)}><option value="">Todos los servicios</option>{services.map(x=><option key={x}>{x}</option>)}</select></label><label><span>País / Región</span><select value={country} onChange={e=>setCountry(e.target.value)}><option value="">Todos los países</option>{countries.map(x=><option key={x}>{x}</option>)}</select></label><button className="clearButton" onClick={clear}><X size={16}/>Limpiar filtros</button></div>
      <div className="resultsMeta"><span>{filtered.length} proyectos encontrados</span><span><SlidersHorizontal size={16}/> Ordenar: más recientes</span></div>
      <div className="projectGrid explorerGrid">{filtered.map(p=><article className="projectCard" key={p.slug}><div className="projectImage placeholderImage"/><div className="projectContent"><div className="chips">{p.expertise.slice(0,2).map(x=><span key={x}>{x}</span>)}</div><h3>{p.title[locale]}</h3><p className="meta">{p.client} · {p.region} · {p.period}</p><p>{p.summary[locale]}</p><button className="textLink" onClick={()=>open(p.slug)}>Ver proyecto</button></div></article>)}</div>
    </div></main>
    {selected && <ProjectModal locale={locale} project={selected} onClose={close}/>} 
  </>;
}
