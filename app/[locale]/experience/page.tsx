import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ExperienceExplorer } from "@/components/ExperienceExplorer";
import { projects } from "@/data/projects";
import type { Locale } from "@/types/project";

export default async function Experience({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (raw !== "es" && raw !== "en") notFound();
  const locale = raw as Locale;
  return <><Header locale={locale} active="experience"/><Suspense><ExperienceExplorer locale={locale} projects={projects}/></Suspense><Footer locale={locale}/></>;
}
