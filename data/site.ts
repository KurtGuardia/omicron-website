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

export const team = [
  { name: "Gastón Méndez", role: "Gerente General" },
  { name: "Tereza Larraín", role: "Gerencia Administrativa" },
  { name: "Perfil 3", role: "Especialista" },
  { name: "Perfil 4", role: "Especialista" },
  { name: "Perfil 5", role: "Especialista" },
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
