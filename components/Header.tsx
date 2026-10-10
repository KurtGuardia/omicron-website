"use client";

import {useEffect, useRef, useState} from "react";
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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
    headerRef.current?.querySelector<HTMLElement>(`#mobile-navigation a`)?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
      if (event.key === "Tab") {
        const controls = Array.from(headerRef.current?.querySelectorAll<HTMLElement>("a[href], button") || []).filter(node => node.getClientRects().length);
        const first = controls[0], last = controls.at(-1);
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    const onResize = () => { if (window.innerWidth > 1024) setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => { document.body.style.overflow = oldOverflow; window.removeEventListener("keydown", onKey); window.removeEventListener("resize", onResize); menuRef.current?.focus(); };
  }, [menuOpen]);
  return <header ref={headerRef} role={menuOpen ? "dialog" : undefined} aria-modal={menuOpen ? true : undefined} aria-label={menuOpen ? t("menu") : undefined} className={`${styles.header} ${styles.homeHeader} ${scrolled ? styles.scrolledHeader : ""}`}>
    <a className={styles.skip} href="#main-content">{t("skip")}</a>
    <div className={`container ${styles.headerInner}`}>
      <Link href={`/${locale}`} className={styles.logoWrap} aria-label={t("logoAlt")} onClick={() => setMenuOpen(false)}>
        <BrandLogo alt={t("logoAlt")} priority light/>
      </Link>
      <nav className={styles.navigation} aria-label={t("label")}>
        <Link aria-current={active === "home" ? "page" : undefined} href={`/${locale}`}>{t("home")}</Link>
        <Link aria-current={active === "experience" ? "page" : undefined} href={`/${locale}/experience`}>{t("experience")}</Link>
        <Link href={`/${locale}#about`}>{t("about")}</Link>
        <Link href={`/${locale}#contact`}>{t("contact")}</Link>
      </nav>
      <div className={styles.headerLanguages}><LanguageSwitcher locale={locale}/></div>
      <Link className={styles.searchLink} href={`/${locale}/experience#project-search`} aria-label={t("searchProjects")}><Search size={25} aria-hidden="true"/></Link>
      <button ref={menuRef} type="button" className={styles.menuToggle} aria-label={t(menuOpen ? "closeMenu" : "openMenu")} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(open => !open)}><span className={styles.hamburger} aria-hidden="true"/></button>
    </div>
    {menuOpen && <div id="mobile-navigation" className={styles.menuPanel} onClick={event => { if ((event.target as Element).closest("a")) setMenuOpen(false); }}>
      <nav aria-label={t("label")}>
        <Link aria-current={active === "home" ? "page" : undefined} href={`/${locale}`}>{t("home")}</Link>
        <Link aria-current={active === "experience" ? "page" : undefined} href={`/${locale}/experience`}>{t("experience")}</Link>
        <Link href={`/${locale}#about`}>{t("about")}</Link>
        <Link href={`/${locale}#contact`}>{t("contact")}</Link>
        <Link href={`/${locale}/experience#project-search`}>{t("searchProjects")}</Link>
      </nav>
      <div className={styles.menuFooter}><BrandLogo alt={t("logoAlt")} light/><LanguageSwitcher locale={locale}/></div>
    </div>}
  </header>;
}
