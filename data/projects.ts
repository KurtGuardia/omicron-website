import type { Project } from "@/types/project";

// V1 seed data for implementation. This is replaced/expanded from the curated CV in Task 9.
export const projects: Project[] = [
  {
    id: "clima-loca",
    slug: "clima-loca",
    startDate: "2026",
    endDate: "2026",
    tags: {"es": ["Clima", "Cadenas de valor"], "en": ["Climate", "Value chains"]},
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
    id: "agro-innova",
    slug: "agro-innova",
    startDate: "2025",
    endDate: "2025",
    tags: {"es": ["Desarrollo rural", "Competitividad"], "en": ["Rural development", "Competitiveness"]},
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
    id: "peb-la",
    slug: "peb-la",
    startDate: "2024",
    endDate: "2024",
    tags: {"es": ["Energía", "Finanzas sostenibles"], "en": ["Energy", "Sustainable finance"]},
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
    id: "paisajes-resilientes",
    slug: "paisajes-resilientes",
    startDate: "2023",
    endDate: "2024",
    tags: {"es": ["Clima", "Finanzas sostenibles"], "en": ["Climate", "Sustainable finance"]},
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
