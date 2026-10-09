import {Linkedin} from "lucide-react";
import {BrandLogo} from "./BrandLogo";
import {Contours} from "./Contours";
import {useTranslations} from "next-intl";
import type {Locale} from "@/types/project";
import {LanguageSwitcher} from "./LanguageSwitcher";
import styles from "./SiteChrome.module.scss";

export function Footer({locale}: {locale: Locale}) {
  const t = useTranslations("Footer");
  const n = useTranslations("Navigation");
  return <footer className={styles.footer}>
    <Contours/>
    <div className={`container ${styles.footerGrid}`}>
      <div className={styles.institution}><p>{t("description")}</p><small>{t("copyright", {year: 2026})}<br/>{t("rights")}</small></div>
      <div className={styles.footerLogo}><BrandLogo alt={n("logoAlt")} light/></div>
      <div className={styles.footerRight}>
        {/* Destinations have not been supplied. Text preserves the layout without fake links. */}
        <span className={styles.pending} title={t("pending")} aria-label={t("linkedin")}><Linkedin size={30} aria-hidden="true"/></span>
        <LanguageSwitcher locale={locale}/>
        <div className={styles.legal}><span title={t("pending")}>{t("terms")}</span><span title={t("pending")}>{t("privacy")}</span></div>
      </div>
    </div>
  </footer>;
}
