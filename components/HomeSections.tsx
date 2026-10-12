import { HomeStats } from './HomeStats'
import { ParallaxImage } from './ParallaxImage'
import { SectionWaves } from './SectionWaves'
import { contactMailto } from '@/data/contact'
import type { ReactNode } from 'react'
import Image from 'next/image'
import { ContentImage } from './ContentImage'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import {
  ArrowRight,
  FileText,
  Leaf,
  Mail,
  Globe2,
  Sprout,
  Landmark,
  Zap,
  Building2,
  Users,
  Compass,
  ChartNoAxesCombined,
  Handshake,
  BookOpen,
  Monitor,
  Wrench,
  Coins,
  Network,
} from 'lucide-react'
import type { Locale, Project } from '@/types/project'
import { assets } from '@/data/assets'
import {
  expertiseKeys,
  serviceKeys,
  homeMetrics,
} from '@/data/home'
import { team } from '@/data/site'
import { PartnerCarousel } from './PartnerCarousel'
import { Contours } from './Contours'
import { HomeFeaturedProjects } from './HomeFeaturedProjects'
import { HomeHowCarousel } from './HomeHowCarousel'
import { OmicronMap } from './map/OmicronMap'
import styles from './HomeSections.module.scss'

const expertiseIcons = [
  Leaf,
  Network,
  Sprout,
  Coins,
  Zap,
  Building2,
  Landmark,
]
const serviceIcons = [
  Compass,
  ChartNoAxesCombined,
  Building2,
  Wrench,
  Handshake,
  BookOpen,
  Monitor,
]
function PhotoBackground({
  priority = false,
}: {
  priority?: boolean
}) {
  return (
    <Image
      src={assets.hero}
      alt=''
      fill
      priority={priority}
      sizes='100vw'
      className={styles.background}
    />
  )
}

export function HomeSections({
  locale,
  projects,
}: {
  locale: Locale
  projects: Project[]
}) {
  const featured = projects.filter(
    (project) => project.featured,
  )
  const t = useTranslations('Home')
  const emailCopy = useTranslations('ContactEmail')
  const headline = {
    line: (children: ReactNode) => (
      <span className={styles.headlineLine}>
        {children}
      </span>
    ),
    last: (children: ReactNode) => (
      <span className={styles.headlineLine}>
        {children}
        <span
          className={styles.accentDot}
          aria-hidden='true'
        />
      </span>
    ),
  }
  const teamRoles = {
    ceo: t('team.roles.ceo'),
    businessDevelopment: t(
      'team.roles.businessDevelopment',
    ),
    energy: t('team.roles.energy'),
    technology: t('team.roles.technology'),
  }
  return (
    <main id='main-content' tabIndex={-1}>
      <section
        className={styles.hero}
        aria-labelledby='hero-title'
      >
        <ParallaxImage
          src={assets.hero}
          className={styles.background}
        />
        <Contours />
        <div className={`container ${styles.heroContent}`}>
          <p className={styles.eyebrow}>
            {t('heroEyebrow')}
          </p>
          <h1 id='hero-title'>
            {t.rich('heroTitleLayout', headline)}
          </h1>
          <p className={styles.heroBody}>{t('heroBody')}</p>
          <Link
            className={styles.primaryButton}
            href={`/${locale}/experience`}
          >
            {t('experienceCta')}
            <ArrowRight size={24} aria-hidden='true' />
          </Link>
        </div>
      </section>

      <HomeStats />

      <section className={styles.expertiseSection}>
        <Contours />
        <div className={`container ${styles.dualList}`}>
          <div>
            <h2>{t('expertise.title')}</h2>
            <p className={styles.listIntro}>
              {t('expertise.intro')}
            </p>
            <ul className={styles.rows}>
              {expertiseKeys.map((key) => {
                const Icon = expertiseIcons[key]
                return (
                  <li
                    className={styles.expertiseRow}
                    key={key}
                    tabIndex={0}
                  >
                    <span className={styles.rowIcon}>
                      <Icon size={28} aria-hidden='true' />
                    </span>
                    <span>
                      {t(`expertise.items.${key}`)}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
          <div>
            <h2>{t('services.title')}</h2>
            <p className={styles.listIntro}>
              {t('services.intro')}
            </p>
            <ul className={styles.rows}>
              {serviceKeys.map((key) => {
                const Icon = serviceIcons[key]
                return (
                  <li
                    className={styles.serviceRow}
                    key={key}
                    tabIndex={0}
                  >
                    <span className={styles.rowIcon}>
                      <Icon size={28} aria-hidden='true' />
                    </span>
                    <span>
                      {t(`services.items.${key}`)}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </section>

      <section
        className={styles.projectsSection}
        aria-labelledby='featured-title'
      >
        <Contours tone='light' />
        <HomeFeaturedProjects
          locale={locale}
          featured={featured}
          projects={projects}
        />
      </section>

      <section
        className={styles.mapSection}
        aria-labelledby='regional-title'
      >
        <SectionWaves />
        <div className={`container ${styles.mapLayout}`}>
          <div className={styles.mapCopy}>
            <p className={styles.eyebrow}>
              {t('map.eyebrow')}
            </p>
            <h2 id='regional-title'>
              {t.rich('map.titleLayout', headline)}
            </h2>
            <p>{t('map.body')}</p>
            <dl className={styles.mapMetrics}>
              <div>
                <span className={styles.metricIcon}>
                  <Globe2 size={44} aria-hidden='true' />
                </span>
                <dt>{t('map.countryLabel')}</dt>
                <dd>{homeMetrics.countries}</dd>
              </div>
              <div>
                <span className={styles.metricIcon}>
                  <FileText size={42} aria-hidden='true' />
                </span>
                <dt>{t('map.engagementLabel')}</dt>
                <dd>{homeMetrics.engagements}</dd>
              </div>
              <div className={styles.internationalMetric}>
                <span className={styles.metricIcon}>
                  <Users size={44} aria-hidden='true' />
                </span>
                <dt>{t('map.international')}</dt>
              </div>
            </dl>
          </div>
          <div className={styles.mapVisual}>
            <OmicronMap locale={locale} />
          </div>
        </div>
      </section>

      <section
        className={styles.howSection}
        aria-labelledby='how-title'
      >
        <Contours />
        <HomeHowCarousel />
      </section>

      <section
        className={styles.clientsSection}
        aria-labelledby='clients-title'
      >
        <SectionWaves />
        <div className='container'>
          <div className={styles.sectionHeading}>
            {/* <h2 id='clients-title'>{t('clients.title')}</h2>
            <p>{t('clients.intro')}</p> */}
          </div>
          <PartnerCarousel />
        </div>
      </section>

      <section
        className={styles.aboutSection}
        id='about'
        aria-labelledby='about-title'
      >
        <PhotoBackground />
        <Contours />
        <div className={`container ${styles.aboutLayout}`}>
          <p className={styles.eyebrow}>
            {t('about.eyebrow')}
          </p>
          <h2 id='about-title'>
            {t.rich('about.titleLayout', headline)}
          </h2>
          <p className={styles.aboutCopy}>
            {t('about.body')}
          </p>
          <ul className={styles.aboutValues}>
            <li>
              <Leaf size={42} aria-hidden='true' />
              <span>
                {t('about.values.sustainability')}
              </span>
            </li>
            <li>
              <Users size={42} aria-hidden='true' />
              <span>{t('about.values.collaboration')}</span>
            </li>
            <li>
              <ChartNoAxesCombined
                size={42}
                aria-hidden='true'
              />
              <span>{t('about.values.results')}</span>
            </li>
          </ul>
        </div>
      </section>

      <section
        className={styles.teamSection}
        aria-labelledby='team-title'
      >
        <Contours tone='light' />
        <div className='container'>
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>
              {t('team.eyebrow')}
            </p>
            <h2 id='team-title'>
              {t.rich('team.titleLayout', headline)}
            </h2>
            <p>{t('team.intro')}</p>
          </div>
          <div className={styles.teamGrid}>
            {team.map((member) => (
              <article
                className={styles.teamMember}
                key={member.name}
              >
                <div className={styles.avatar}>
                  <ContentImage
                    src={member.image}
                    fallback={assets.avatar}
                    alt={
                      member.image
                        ? t('team.portraitAlt', {
                            name: member.name,
                          })
                        : t('team.imageAlt')
                    }
                    fill
                    sizes='(max-width: 380px) 160px, (max-width: 800px) 40vw, (max-width: 1024px) 28vw, 20vw'
                  />
                </div>
                <h3>{member.name}</h3>
                <p>{teamRoles[member.role]}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className={styles.contactSection}
        id='contact'
        aria-labelledby='contact-title'
      >
        <PhotoBackground />
        <Contours />
        <div className={`container ${styles.contactInner}`}>
          <div>
            <p className={styles.eyebrow}>
              {t('contact.eyebrow')}
            </p>
            <h2 id='contact-title'>
              {t.rich('contact.titleLayout', headline)}
            </h2>
          </div>
          <div className={styles.contactAction}>
            <p>{t('contact.body')}</p>
            <a
              className={styles.primaryButton}
              href={contactMailto(
                emailCopy('subject'),
                emailCopy('body'),
              )}
              target='_blank'
              rel='noopener noreferrer'
            >
              <Mail size={21} aria-hidden='true' />
              {t('emailCta')}
              <ArrowRight size={24} aria-hidden='true' />
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
