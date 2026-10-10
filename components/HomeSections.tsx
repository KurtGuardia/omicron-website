import type {ReactNode} from "react";
import Image from "next/image";
import {ContentImage} from "./ContentImage";
import Link from "next/link";
import {useTranslations} from "next-intl";
import {ArrowRight, FileText, MapPin, Leaf, Mail, Globe2, CalendarDays, Sprout, Landmark, Zap, Building2, Users, Compass, ChartNoAxesCombined, Handshake, BookOpen, Monitor, Wrench} from "lucide-react";
import type {Locale, Project} from "@/types/project";
import {assets} from "@/data/assets";
import {expertiseKeys, serviceKeys, homeMetrics, homePartners, temporaryProfiles} from "@/data/home";
import {Contours} from "./Contours";
import {HomeFeaturedProjects} from "./HomeFeaturedProjects";
import {HomeHowCarousel} from "./HomeHowCarousel";
import {OmicronMap} from "./map/OmicronMap";
import styles from "./HomeSections.module.scss";

const expertiseIcons = [Leaf, ChartNoAxesCombined, Sprout, Landmark, Zap, Building2, Users];
const serviceIcons = [Compass, ChartNoAxesCombined, Building2, Wrench, Handshake, BookOpen, Monitor];
function PhotoBackground({priority = false}: {priority?: boolean}) {
  return <Image src={assets.hero} alt="" fill priority={priority} sizes="100vw" className={styles.background}/>;
}

export function HomeSections({locale, projects}: {locale: Locale; projects: Project[]}) {
  const featured = projects.filter(project => project.featured);
  const t = useTranslations("Home");
  const headline = {
    line: (children: ReactNode) => <span className={styles.headlineLine}>{children}</span>,
    last: (children: ReactNode) => <span className={styles.headlineLine}>{children}<span className={styles.accentDot} aria-hidden="true"/></span>,
  };
  return <main id="main-content" tabIndex={-1}>
    <section className={styles.hero} aria-labelledby="hero-title">
      <PhotoBackground priority/>
      <Contours/>
      <div className={`container ${styles.heroContent}`}>
        <p className={styles.eyebrow}>{t("heroEyebrow")}</p>
        <h1 id="hero-title">{t.rich("heroTitleLayout", headline)}</h1>
        <p className={styles.heroBody}>{t("heroBody")}</p>
        <Link className={styles.primaryButton} href={`/${locale}/experience`}>{t("experienceCta")}<ArrowRight size={24} aria-hidden="true"/></Link>
      </div>
    </section>

    <section className={styles.statsStrip}>
      <Contours/>
      <dl className={`container ${styles.statsGrid}`}>
        <div><CalendarDays aria-hidden="true"/><dt>{t("stats.years")}</dt><dd>{homeMetrics.years}</dd></div>
        <div><Globe2 aria-hidden="true"/><dt>{t("stats.countries")}</dt><dd>{homeMetrics.countries}</dd></div>
        <div><FileText aria-hidden="true"/><dt>{t("stats.projects")}</dt><dd>{homeMetrics.engagements}</dd></div>
        <div><MapPin aria-hidden="true"/><dt>{t("stats.reachDetail")}</dt><dd className={styles.reachValue}>{t("stats.reach")}</dd></div>
      </dl>
    </section>

    <section className={styles.expertiseSection}>
      <Contours/>
      <div className={`container ${styles.dualList}`}>
        <div><h2>{t("expertise.title")}</h2><p className={styles.listIntro}>{t("expertise.intro")}</p>
          <ul className={styles.rows}>{expertiseKeys.map(key => {const Icon = expertiseIcons[key]; return <li className={styles.expertiseRow} key={key} tabIndex={0}><span className={styles.rowIcon}><Icon size={28} aria-hidden="true"/></span><span>{t(`expertise.items.${key}`)}</span></li>;})}</ul>
        </div>
        <div><h2>{t("services.title")}</h2><p className={styles.listIntro}>{t("services.intro")}</p>
          <ul className={styles.rows}>{serviceKeys.map(key => {const Icon = serviceIcons[key]; return <li className={styles.serviceRow} key={key} tabIndex={0}><span className={styles.rowIcon}><Icon size={28} aria-hidden="true"/></span><span>{t(`services.items.${key}`)}</span></li>;})}</ul>
        </div>
      </div>
    </section>

    <section className={styles.projectsSection} aria-labelledby="featured-title">
      <Contours tone="light"/>
      <HomeFeaturedProjects locale={locale} featured={featured} projects={projects}/>
    </section>

    <section className={styles.mapSection} aria-labelledby="regional-title">
      <Contours tone="light"/>
      <div className={`container ${styles.mapLayout}`}>
        <div className={styles.mapCopy}><p className={styles.eyebrow}>{t("map.eyebrow")}</p><h2 id="regional-title">{t.rich("map.titleLayout", headline)}</h2><p>{t("map.body")}</p>
          <dl className={styles.mapMetrics}>
            <div><span className={styles.metricIcon}><Globe2 size={44} aria-hidden="true"/></span><dt>{t("map.countryLabel")}</dt><dd>{homeMetrics.countries}</dd></div>
            <div><span className={styles.metricIcon}><FileText size={42} aria-hidden="true"/></span><dt>{t("map.engagementLabel")}</dt><dd>{homeMetrics.engagements}</dd></div>
            <div className={styles.internationalMetric}><span className={styles.metricIcon}><Users size={44} aria-hidden="true"/></span><dt>{t("map.international")}</dt></div>
          </dl>
        </div>
        <div className={styles.mapVisual}><OmicronMap locale={locale}/></div>
      </div>
    </section>

    <section className={styles.howSection} aria-labelledby="how-title">
      <PhotoBackground/>
      <Contours/>
      <HomeHowCarousel/>
    </section>

    <section className={styles.clientsSection} aria-labelledby="clients-title"><Contours tone="light"/><div className="container">
      <div className={styles.sectionHeading}><h2 id="clients-title">{t("clients.title")}</h2><p>{t("clients.intro")}</p></div>
      <ul className={styles.partnerLogos}>{homePartners.map(partner => <li key={partner}>{partner === "eu" ? t("clients.eu") : partner}</li>)}</ul>
    </div></section>

    <section className={styles.aboutSection} id="about" aria-labelledby="about-title">
      <PhotoBackground/><Contours/>
      <div className={`container ${styles.aboutLayout}`}>
        <p className={styles.eyebrow}>{t("about.eyebrow")}</p><h2 id="about-title">{t.rich("about.titleLayout", headline)}</h2>
        <p className={styles.aboutCopy}>{t("about.body")}</p>
        <ul className={styles.aboutValues}>
          <li><Leaf size={42} aria-hidden="true"/><span>{t("about.values.sustainability")}</span></li>
          <li><Users size={42} aria-hidden="true"/><span>{t("about.values.collaboration")}</span></li>
          <li><ChartNoAxesCombined size={42} aria-hidden="true"/><span>{t("about.values.results")}</span></li>
        </ul>
      </div>
    </section>

    <section className={styles.teamSection} aria-labelledby="team-title"><Contours tone="light"/><div className="container">
      <div className={styles.sectionHeading}><p className={styles.eyebrow}>{t("team.eyebrow")}</p><h2 id="team-title">{t.rich("team.titleLayout", headline)}</h2><p>{t("team.intro")}</p></div>
      <div className={styles.teamGrid}>{temporaryProfiles.map(number => <article className={styles.teamMember} key={number}>
        <div className={styles.avatar}><ContentImage src={assets.avatar} fallback={assets.avatar} alt={t("team.imageAlt")} fill sizes="(max-width: 380px) 160px, (max-width: 800px) 40vw, (max-width: 1024px) 28vw, 20vw"/></div>
        <h3>{t("team.name", {number})}</h3><p>{t("team.role")}</p>
      </article>)}</div>
    </div></section>

    <section className={styles.contactSection} id="contact" aria-labelledby="contact-title">
      <PhotoBackground/>
      <Contours/>
      <div className={`container ${styles.contactInner}`}><div><p className={styles.eyebrow}>{t("contact.eyebrow")}</p><h2 id="contact-title">{t.rich("contact.titleLayout", headline)}</h2><p>{t("contact.body")}</p></div>
        <a className={styles.primaryButton} href="mailto:omicron@entel.bo"><Mail size={21} aria-hidden="true"/>{t("emailCta")}<ArrowRight size={24} aria-hidden="true"/></a>
      </div>
    </section>
  </main>;
}
