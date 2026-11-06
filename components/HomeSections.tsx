import { HomeStats } from './HomeStats'
import { ParallaxImage } from './ParallaxImage'
import { SectionWaves } from './SectionWaves'
import { contactMailto } from '@/data/contact'
import type { CSSProperties, ReactNode } from 'react'
import { ContentImage } from './ContentImage'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import {
  ArrowRight,
  ArrowUpRight,
  FileText,
  Leaf,
  Mail,
  Globe2,
  Sprout,
  Landmark,
  Pickaxe,
  Sun,
  HandCoins,
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
  type LucideIcon,
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
import { ScrollWord } from './ScrollWord'
import { reveal } from '@/lib/reveal'
import { mapCountryCodes, type ActiveMapCountryCode } from '@/data/mapCountries'
import { filterProjects } from '@/lib/projectFilters'
import { expertiseValues, serviceValues } from '@/lib/projectLabels'
import styles from './HomeSections.module.scss'

// Indexed like expertiseKeys / serviceKeys (see data/home.ts).
const expertiseIcons: LucideIcon[] = [
  Leaf,
  Network,
  Sprout,
  Coins,
  Pickaxe,
  Sun,
  Building2,
  Landmark,
]
const serviceIcons: LucideIcon[] = [
  Compass,
  ChartNoAxesCombined,
  Building2,
  Wrench,
  Handshake,
  BookOpen,
  Monitor,
  HandCoins,
]
// A Home list row linking to /experience filtered by that area or service.
function FilterRow({
  className,
  href,
  icon: Icon,
  label,
  index,
}: {
  className: string
  href: string
  icon: LucideIcon
  label: string
  index: number
}) {
  return (
    <li className={className} {...reveal(index + 1)}>
      <Link className={styles.rowLink} href={href}>
        <span className={styles.rowIcon}>
          <Icon size={28} aria-hidden='true' />
        </span>
        <span>{label}</span>
        <ArrowUpRight
          className={styles.rowArrow}
          size={22}
          aria-hidden='true'
        />
      </Link>
    </li>
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
  // Home only opens featured cards (and their related links), so only those reach the client.
  const relatedIds = new Set(featured.flatMap((project) => project.relatedProjectIds || []))
  const homeProjects = projects.filter(
    (project) => project.featured || relatedIds.has(project.id),
  )
  // Same filter as /experience?country=…, so the map always matches the listing.
  const countryProjectCounts = Object.fromEntries(
    mapCountryCodes.map((code) => [
      code,
      filterProjects(
        projects,
        { q: '', expertise: '', service: '', country: code, client: '', year: '', sort: '' },
        locale,
      ).length,
    ]),
  ) as Record<ActiveMapCountryCode, number>
  const t = useTranslations('Home')
  const emailCopy = useTranslations('ContactEmail')
  const headline = {
    line: (children: ReactNode) => (
      <span className={styles.headlineLine}>
        <span className={styles.headlineInner}>{children}</span>
      </span>
    ),
    last: (children: ReactNode) => (
      <span className={styles.headlineLine}>
        <span className={styles.headlineInner}>
          {children}
          <span
            className={styles.accentDot}
            aria-hidden='true'
          />
        </span>
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
          <p className={styles.eyebrow} style={{ '--reveal-i': 0 } as CSSProperties}>
            {t('heroEyebrow')}
          </p>
          <h1 id='hero-title' style={{ '--reveal-i': 1 } as CSSProperties}>
            {t.rich('heroTitleLayout', headline)}
          </h1>
          <p className={styles.heroBody} style={{ '--reveal-i': 4 } as CSSProperties}>{t('heroBody')}</p>
          <Link
            className={styles.primaryButton}
            href={`/${locale}/experience`}
            style={{ '--reveal-i': 5 } as CSSProperties}
          >
            {t('experienceCta')}
            <ArrowRight size={24} aria-hidden='true' />
          </Link>
        </div>
        {/* Inside the hero so hero + stats share the first viewport (see .hero). */}
        <HomeStats />
      </section>

      <section className={styles.expertiseSection}>
        <Contours />
        <div className={`container ${styles.dualList}`}>
          <div {...reveal(0)}>
            <h2>{t('expertise.title')}</h2>
            <p className={styles.listIntro}>
              {t('expertise.intro')}
            </p>
            <ul className={styles.rows}>
              {expertiseKeys.map((key) => (
                <FilterRow
                  key={key}
                  className={styles.expertiseRow}
                  href={`/${locale}/experience?expertise=${encodeURIComponent(expertiseValues[key])}`}
                  icon={expertiseIcons[key]}
                  label={t(`expertise.items.${key}`)}
                  index={key}
                />
              ))}
            </ul>
          </div>
          <div {...reveal(1)}>
            <h2>{t('services.title')}</h2>
            <p className={styles.listIntro}>
              {t('services.intro')}
            </p>
            <ul className={styles.rows}>
              {serviceKeys.map((key) => (
                <FilterRow
                  key={key}
                  className={styles.serviceRow}
                  href={`/${locale}/experience?service=${encodeURIComponent(serviceValues[key])}`}
                  icon={serviceIcons[key]}
                  label={t(`services.items.${key}`)}
                  index={key}
                />
              ))}
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
          projects={homeProjects}
        />
      </section>

      <section
        className={styles.mapSection}
        aria-labelledby='regional-title'
      >
        <SectionWaves />
        <div className={`container ${styles.mapLayout}`}>
          <div className={styles.mapCopy} {...reveal(0, 'left')}>
            <p className={styles.eyebrow}>
              {t('map.eyebrow')}
            </p>
            <h2 id='regional-title' {...reveal(1, 'lines')}>
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
          <div className={styles.mapVisual} {...reveal(2, 'scale')}>
            <OmicronMap
              locale={locale}
              projectCounts={countryProjectCounts}
            />
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
        <ScrollWord text='OMICRON' />
        <div className='container'>
          <div className={styles.sectionHeading}>
            {/* <h2 id='clients-title'>{t('clients.title')}</h2>
            <p>{t('clients.intro')}</p> */}
          </div>
          <div {...reveal(0)}>
            <PartnerCarousel />
          </div>
        </div>
      </section>

      <section
        className={styles.aboutSection}
        id='about'
        aria-labelledby='about-title'
      >
        <ParallaxImage src={assets.about} className={styles.background} />
        <Contours />
        <div className={`container ${styles.aboutLayout}`}>
          <p className={styles.eyebrow} {...reveal(0)}>
            {t('about.eyebrow')}
          </p>
          <h2 id='about-title' {...reveal(1, 'lines')}>
            {t.rich('about.titleLayout', headline)}
          </h2>
          <p className={styles.aboutCopy} {...reveal(4)}>
            {t('about.body')}
          </p>
          <ul className={styles.aboutValues}>
            <li {...reveal(2, 'right')}>
              <Leaf size={42} aria-hidden='true' />
              <span>
                {t('about.values.sustainability')}
              </span>
            </li>
            <li {...reveal(3, 'right')}>
              <Users size={42} aria-hidden='true' />
              <span>{t('about.values.collaboration')}</span>
            </li>
            <li {...reveal(4, 'right')}>
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
            <p className={styles.eyebrow} {...reveal(0)}>
              {t('team.eyebrow')}
            </p>
            <h2 id='team-title' {...reveal(1, 'lines')}>
              {t.rich('team.titleLayout', headline)}
            </h2>
            <p {...reveal(3)}>{t('team.intro')}</p>
          </div>
          <div className={styles.teamGrid}>
            {team.map((member, index) => (
              <article
                className={styles.teamMember}
                key={member.name}
                {...reveal(index, 'scale')}
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
        <ParallaxImage src={assets.contact} className={styles.background} />
        <Contours />
        <div className={`container ${styles.contactInner}`}>
          <div>
            <p className={styles.eyebrow} {...reveal(0)}>
              {t('contact.eyebrow')}
            </p>
            <h2 id='contact-title' {...reveal(1, 'lines')}>
              {t.rich('contact.titleLayout', headline)}
            </h2>
          </div>
          <div className={styles.contactAction} {...reveal(3, 'right')}>
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
