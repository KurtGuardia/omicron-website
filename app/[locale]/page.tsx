import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { HomeSections } from "@/components/HomeSections";
import { Footer } from "@/components/Footer";
import { projects } from "@/data/projects";
import type { Locale } from "@/types/project";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (raw !== "es" && raw !== "en") notFound();
  const locale = raw as Locale;
  return <><Header locale={locale}/><HomeSections locale={locale} projects={projects}/><Footer locale={locale}/></>;
}
