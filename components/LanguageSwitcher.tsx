"use client";

import {Fragment, Suspense, useEffect, useState} from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useTranslations} from "next-intl";
import type {Locale} from "@/types/project";
import styles from "./SiteChrome.module.scss";

export function LanguageSwitcher({locale, onLocaleChange}: {locale: Locale; onLocaleChange?: (href: string) => void}) {
  return <Suspense><LanguageLinks locale={locale} onLocaleChange={onLocaleChange}/></Suspense>;
}

function LanguageLinks({locale, onLocaleChange}: {locale: Locale; onLocaleChange?: (href: string) => void}) {
  const t = useTranslations("Navigation");
  const pathname = usePathname();
  const router = useRouter();
  const search = useSearchParams();
  const [hash, setHash] = useState("");
  useEffect(() => {
    const updateHash = () => setHash(window.location.hash);
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, [pathname, search]);
  const suffix = (search.size ? `?${search.toString()}` : "") + hash;
  const route = pathname.replace(/^\/(es|en)(?=\/|$)/, "");
  return <nav data-locale-switch className={styles.languages} aria-label={t("languages")}>
    {(["es", "en"] as const).map(language => <Fragment key={language}>
      {language === "en" && <span className={styles.languageSeparator} aria-hidden="true">|</span>}
      {language === locale
      ? <span aria-current="true">{language.toUpperCase()}</span>
      : <a href={`/${language}${route}${suffix}`} lang={language} hrefLang={language}
          aria-label={t(language === "es" ? "switchToSpanish" : "switchToEnglish")} onClick={event => {
            if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            event.preventDefault();
            const href = `/${language}${route}${window.location.search}${window.location.hash}`;
            onLocaleChange?.(href);
            router.push(href, {scroll: false});
          }}>{language.toUpperCase()}</a>}
    </Fragment>)}
  </nav>;
}
