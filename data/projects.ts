import type { Project } from "@/types/project";

// V1 seed data for implementation. This is replaced/expanded from the curated CV in Task 9.
export const projects: Project[] = [
  {
    slug: "clima-loca",
    title: { es: "Clima LoCa", en: "Clima LoCa" },
    summary: {
      es: "Evaluación regional de una iniciativa para fortalecer la cadena de cacao frente al cadmio y el cambio climático.",
      en: "Regional evaluation of an initiative strengthening the cocoa value chain amid cadmium and climate challenges."
    },
    client: "CIAT / Bioversity",
    funder: "Unión Europea",
    countries: ["Colombia", "Ecuador", "Perú"],
    region: "Región Andina",
    period: "2026",
    expertise: ["Clima, Recursos Naturales y Agua", "Comercio Sostenible y Cadenas de Valor"],
    services: ["Monitoreo, Evaluación y Aprendizaje"],
    featured: true,
  },
  {
    slug: "agro-innova",
    title: { es: "AGRO-INNOVA", en: "AGRO-INNOVA" },
    summary: {
      es: "Evaluación técnica final de sistemas agroforestales adaptados para el Corredor Seco Centroamericano.",
      en: "Final technical evaluation of adapted agroforestry systems in the Central American Dry Corridor."
    },
    client: "IICA",
    funder: "Unión Europea",
    countries: ["Costa Rica", "Panamá", "El Salvador", "Honduras", "Guatemala"],
    region: "Centroamérica",
    period: "2025",
    expertise: ["Desarrollo Rural y Territorial", "Clima, Recursos Naturales y Agua"],
    services: ["Monitoreo, Evaluación y Aprendizaje"],
    featured: true,
  },
  {
    slug: "peb-la",
    title: { es: "PEB-LA", en: "PEB-LA" },
    summary: {
      es: "Evaluación de medio término de una iniciativa sobre finanzas sostenibles, participación, energía y bienestar.",
      en: "Mid-term evaluation of a sustainable finance, participation, energy and wellbeing initiative."
    },
    client: "DGRV",
    countries: ["República Dominicana"],
    region: "Caribe",
    period: "2024",
    expertise: ["Finanzas Sostenibles", "Minería y Energía Responsable"],
    services: ["Monitoreo, Evaluación y Aprendizaje"],
    featured: true,
  },
  {
    slug: "paisajes-resilientes",
    title: { es: "Paisajes Resilientes", en: "Resilient Landscapes" },
    summary: {
      es: "Financiamiento verde y asistencia técnica para modelos de ganadería sostenible y cadenas de valor.",
      en: "Green finance and technical assistance for sustainable livestock and value-chain models."
    },
    client: "GIZ",
    funder: "Unión Europea",
    countries: ["Bolivia"],
    region: "Región Andina",
    period: "2023–2024",
    expertise: ["Clima, Recursos Naturales y Agua", "Finanzas Sostenibles"],
    services: ["Estrategia y Diseño de Proyectos", "Asistencia Técnica e Implementación"],
    featured: true,
  }
];
