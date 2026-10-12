"use client";

import {useEffect, useRef, useState} from "react";
import {useMobileMenuState} from "./MobileMenuState";
import {Search} from "lucide-react";
import {BrandLogo} from "./BrandLogo";
import Link from "next/link";
import {useTranslations} from "next-intl";
import type {Locale} from "@/types/project";
import {LanguageSwitcher} from "./LanguageSwitcher";
import styles from "./SiteChrome.module.scss";

export function Header({locale, active = "home"}: {locale: Locale; active?: "home" | "experience"}) {
  const t = useTranslations("Navigation");
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  const {menuOpen, setMenuOpen} = useMobileMenuState();
  const [homeSection, setHomeSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    let observer: IntersectionObserver | undefined;
    const update = () => {
      const height = headerRef.current?.getBoundingClientRect().height || 112;
      document.documentElement.style.setProperty("--header-height", `${height}px`);
      observer?.disconnect();
      if (active !== "home") return;
      // Watch the reading area below the sticky header, including intervening sections.
      const visibleSections = new Set<Element>();
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => { if (entry.isIntersecting) visibleSections.add(entry.target); else visibleSections.delete(entry.target); });
        const sections = Array.from(document.querySelectorAll("#main-content > section"));
        const current = sections.filter(section => visibleSections.has(section)).at(-1);
        if (!current) return;
        const index = sections.indexOf(current);
        const about = sections.findIndex(section => section.id === "about");
        const contact = sections.findIndex(section => section.id === "contact");
        setHomeSection(index >= contact ? "contact" : index >= about ? "about" : "home");
      }, {rootMargin: `-${height + 16}px 0px -${Math.round(window.innerHeight * .35)}px 0px`, threshold: 0});
      document.querySelectorAll("#main-content > section").forEach(section => observer?.observe(section));
    };
    update();
    window.addEventListener("resize", update);
    return () => { observer?.disconnect(); window.removeEventListener("resize", update); };
  }, [active, locale]);
  useEffect(() => {
    const updateScrollState = () => setScrolled(window.scrollY > 24);
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, {passive: true});
    return () => window.removeEventListener("scroll", updateScrollState);
  }, [active]);
  useEffect(() => {
    if (!menuOpen) return;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    headerRef.current?.querySelector<HTMLElement>(`#mobile-navigation a`)?.focus({preventScroll: true});
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
      if (event.key === "Tab") {
        const controls = Array.from(headerRef.current?.querySelectorAll<HTMLElement>("a[href], button") || []).filter(node => node.getClientRects().length);
        const first = controls[0], last = controls.at(-1);
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus({preventScroll: true}); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus({preventScroll: true}); }
      }
    };
    const onResize = () => { if (window.innerWidth > 1024) setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => { document.body.style.overflow = oldOverflow; window.removeEventListener("keydown", onKey); window.removeEventListener("resize", onResize); menuRef.current?.focus({preventScroll: true}); };
  }, [menuOpen]);
  return <header ref={headerRef} role={menuOpen ? "dialog" : undefined} aria-modal={menuOpen ? true : undefined} aria-label={menuOpen ? t("menu") : undefined} className={`${styles.header} ${styles.homeHeader} ${scrolled ? styles.scrolledHeader : ""}`}>
    <a className={styles.skip} href="#main-content">{t("skip")}</a>
    <div className={`container ${styles.headerInner}`}>
      <Link href={`/${locale}`} className={styles.logoWrap} aria-label={t("logoAlt")} onClick={() => setMenuOpen(false)}>
        <BrandLogo alt={t("logoAlt")} priority light/>
      </Link>
      <nav className={styles.navigation} aria-label={t("label")}>
        <Link aria-current={active === "home" && homeSection === "home" ? "page" : undefined} href={`/${locale}`}>{t("home")}</Link>
        <Link aria-current={active === "experience" ? "page" : undefined} href={`/${locale}/experience`}>{t("experience")}</Link>
        <Link aria-current={active === "home" && homeSection === "about" ? "location" : undefined} href={`/${locale}#about`}>{t("about")}</Link>
        <Link aria-current={active === "home" && homeSection === "contact" ? "location" : undefined} href={`/${locale}#contact`}>{t("contact")}</Link>
      </nav>
      <div className={styles.headerLanguages}><LanguageSwitcher locale={locale}/></div>
      <Link className={styles.searchLink} href={`/${locale}/experience#project-search`} aria-label={t("searchProjects")}><Search size={25} aria-hidden="true"/></Link>
      <button ref={menuRef} type="button" className={styles.menuToggle} aria-label={t(menuOpen ? "closeMenu" : "openMenu")} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(open => !open)}><span className={styles.hamburger} aria-hidden="true"/></button>
    </div>
    {menuOpen && <div id="mobile-navigation" className={styles.menuPanel} onClick={event => { if (event.target === event.currentTarget || ((event.target as Element).closest("a") && !(event.target as Element).closest("[data-locale-switch]"))) setMenuOpen(false); }}>
      <nav aria-label={t("label")}>
        <Link aria-current={active === "home" && homeSection === "home" ? "page" : undefined} href={`/${locale}`}>{t("home")}</Link>
        <Link aria-current={active === "experience" ? "page" : undefined} href={`/${locale}/experience`}>{t("experience")}</Link>
        <Link aria-current={active === "home" && homeSection === "about" ? "location" : undefined} href={`/${locale}#about`}>{t("about")}</Link>
        <Link aria-current={active === "home" && homeSection === "contact" ? "location" : undefined} href={`/${locale}#contact`}>{t("contact")}</Link>
        <Link href={`/${locale}/experience#project-search`}>{t("searchProjects")}</Link>
      </nav>
      <div className={styles.menuFooter}><LanguageSwitcher locale={locale}/></div>
    </div>}
  </header>;
}
