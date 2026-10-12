import type { Locale } from "@/types/project";

export const expertise = [
  "Clima, Recursos Naturales y Agua",
  "Comercio Sostenible y Cadenas de Valor",
  "Desarrollo Rural y Territorial",
  "Finanzas Sostenibles",
  "Minería y Energía Responsable",
  "Infraestructura y Servicios Básicos",
  "Gobernanza y Desarrollo Institucional",
];

export const services = [
  "Estrategia y Diseño de Proyectos",
  "Monitoreo, Evaluación y Aprendizaje",
  "Desarrollo Institucional y Organizacional",
  "Asistencia Técnica e Implementación",
  "Facilitación y Procesos Participativos",
  "Gestión del Conocimiento y Capacidades",
  "Transformación Digital y Soluciones",
];

export const stats = [
  { value: "25+", label: "años de experiencia" },
  { value: "15+", label: "países" }, // TODO Task 9: verify from CV dataset
  { value: "200+", label: "proyectos" }, // TODO Task 9: verify from CV dataset
  { value: "América Latina", label: "y otros mercados internacionales" },
];

type TeamMember = {name: string; role: 'ceo' | 'businessDevelopment' | 'energy' | 'technology'; image?: string};
export const team: readonly TeamMember[] = [
  { name: "Gastón Mendez", role: "ceo" },
  { name: "Marco Antonio", role: "businessDevelopment" },
  { name: "Luis Iporre", role: "energy" },
  { name: "Arturo", role: "energy" },
  { name: "Kurt Guardia", role: "technology" },
];

export const copy: Record<Locale, Record<string, string>> = {
  es: {
    heroEyebrow: "CONSULTORÍA PARA EL DESARROLLO SOSTENIBLE",
    heroTitle: "Soluciones para desafíos complejos de desarrollo.",
    heroBody: "Acompañamos a gobiernos, organismos de cooperación, instituciones financieras y organizaciones públicas y privadas en el diseño, implementación y evaluación de soluciones sostenibles en América Latina.",
    experienceCta: "Conoce nuestra experiencia",
    projectsCta: "Ver proyectos",
    emailCta: "Escríbenos",
  },
  en: {
    heroEyebrow: "CONSULTING FOR SUSTAINABLE DEVELOPMENT",
    heroTitle: "Solutions for complex development challenges.",
    heroBody: "We support governments, development partners, financial institutions and public and private organizations in designing, implementing and evaluating sustainable solutions across Latin America.",
    experienceCta: "Explore our experience",
    projectsCta: "View projects",
    emailCta: "Email us",
  },
};
