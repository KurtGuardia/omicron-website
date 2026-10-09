"use client";

import {useEffect, useState} from "react";
import {Search} from "lucide-react";
import {BrandLogo} from "./BrandLogo";
import Link from "next/link";
import {useTranslations} from "next-intl";
import type {Locale} from "@/types/project";
import {LanguageSwitcher} from "./LanguageSwitcher";
import styles from "./SiteChrome.module.scss";

export function Header({locale, active = "home"}: {locale: Locale; active?: "home" | "experience"}) {
  const t = useTranslations("Navigation");
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    if (active !== "home") return;
    const updateScrollState = () => setScrolled(window.scrollY > 24);
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, {passive: true});
    return () => window.removeEventListener("scroll", updateScrollState);
  }, [active]);
  return <header className={`${styles.header} ${active === "home" ? styles.homeHeader : ""} ${active === "home" && scrolled ? styles.scrolledHeader : ""}`}>
    <a className={styles.skip} href="#main-content">{t("skip")}</a>
    <div className={`container ${styles.headerInner}`}>
      <Link href={`/${locale}`} className={styles.logoWrap} aria-label={t("logoAlt")}>
        <BrandLogo alt={t("logoAlt")} priority light={active === "home"}/>
      </Link>
      <nav className={styles.navigation} aria-label={t("label")}>
        <Link aria-current={active === "home" ? "page" : undefined} href={`/${locale}`}>{t("home")}</Link>
        <Link aria-current={active === "experience" ? "page" : undefined} href={`/${locale}/experience`}>{t("experience")}</Link>
        <Link href={`/${locale}#about`}>{t("about")}</Link>
        <Link href={`/${locale}#contact`}>{t("contact")}</Link>
      </nav>
      <LanguageSwitcher locale={locale}/>
      {active === "home" && <Link className={styles.searchLink} href={`/${locale}/experience`} aria-label={t("searchProjects")}><Search size={25} aria-hidden="true"/></Link>}
    </div>
  </header>;
}
