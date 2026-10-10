"use client";

import {Suspense, useEffect, useState} from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useTranslations} from "next-intl";
import type {Locale} from "@/types/project";
import styles from "./SiteChrome.module.scss";

export function LanguageSwitcher({locale}: {locale: Locale}) {
  return <Suspense><LanguageLinks locale={locale}/></Suspense>;
}

function LanguageLinks({locale}: {locale: Locale}) {
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
  return <nav className={styles.languages} aria-label={t("languages")}>
    {(["es", "en"] as const).map(language => language === locale
      ? <span key={language} aria-current="true">{language.toUpperCase()}</span>
      : <a key={language} href={`/${language}${route}${suffix}`} lang={language} hrefLang={language}
          aria-label={t(language === "es" ? "switchToSpanish" : "switchToEnglish")} onClick={event => {
            if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            event.preventDefault();
            router.push(`/${language}${route}${window.location.search}${window.location.hash}`, {scroll: false});
          }}>{language.toUpperCase()}</a>)}
  </nav>;
}
