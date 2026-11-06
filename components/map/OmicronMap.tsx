"use client";

import {useCallback, useEffect, useRef, useState, type FocusEvent, type KeyboardEvent, type MouseEvent, type PointerEvent} from "react";
import geometry from "@/data/mapGeometry.json";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {ArrowUpRight} from "lucide-react";
import {useTranslations} from "next-intl";
import {isActiveMapCountryCode, mapCountries, type ActiveMapCountryCode} from "@/data/mapCountries";
import type {Locale} from "@/types/project";
import styles from "./OmicronMap.module.scss";

// Geometry is prepared from public/images/map/omicron-latin-america-map.svg
// with scripts/prepare-map-geometry.mjs; country metadata remains separate.
type TooltipPosition = {code: ActiveMapCountryCode; x: number; y: number};

function activePathFromTarget(target: EventTarget | null): SVGPathElement | null {
  if (!(target instanceof Element)) return null;
  const path = target.closest("path[data-active='true']");
  return path instanceof SVGPathElement && isActiveMapCountryCode(path.id) ? path : null;
}

// projectCounts are published projects per country, computed on the server with the same
// filter as /experience?country=…, so the tooltip always matches the listing it links to.
export function OmicronMap({locale, projectCounts}: {locale: Locale; projectCounts: Record<ActiveMapCountryCode, number>}) {
  const t = useTranslations("Home.map");
  const countries = useTranslations("Countries");
  const router = useRouter();
  const frameRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastPointerType = useRef("mouse");
  const [hoveredCode, setHoveredCode] = useState<ActiveMapCountryCode | null>(null);
  const [focusedCode, setFocusedCode] = useState<ActiveMapCountryCode | null>(null);
  const [selectedCode, setSelectedCode] = useState<ActiveMapCountryCode | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<TooltipPosition | null>(null);
  const visibleCode = focusedCode ?? hoveredCode ?? selectedCode;

  const countryHref = (code: ActiveMapCountryCode) =>
    `/${locale}/experience?country=${encodeURIComponent(mapCountries[code].queryCountry)}`;
  const hasProjects = (code: ActiveMapCountryCode) => projectCounts[code] > 0;
  const countryActionLabel = (code: ActiveMapCountryCode) => hasProjects(code)
    ? t("countryAccessibleName", {country: countries(code), count: projectCounts[code]})
    : `${countries(code)}, ${t("noPublishedProjects")}`;

  const positionTooltip = useCallback((code: ActiveMapCountryCode) => {
    const frame = frameRef.current;
    const path = svgRef.current?.querySelector<SVGPathElement>(`path[id="${code}"]`);
    if (!frame || !path) return;
    const frameBounds = frame.getBoundingClientRect();
    const pathBounds = path.getBoundingClientRect();
    const halfTooltipWidth = Math.min(130, (frameBounds.width - 16) / 2);
    const center = pathBounds.left + pathBounds.width / 2 - frameBounds.left;
    const x = Math.max(halfTooltipWidth, Math.min(frameBounds.width - halfTooltipWidth, center));
    const y = Math.max(72, pathBounds.top - frameBounds.top + Math.min(36, pathBounds.height / 2));
    setTooltipPosition({code, x, y});
  }, []);

  useEffect(() => {
    if (!visibleCode) return;
    positionTooltip(visibleCode);
    const onResize = () => positionTooltip(visibleCode);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [visibleCode, positionTooltip]);

  const scheduleHide = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setHoveredCode(null), 250);
  };
  useEffect(() => {
    const dismiss = (event: globalThis.PointerEvent) => {
      if (frameRef.current?.contains(event.target as Node)) return;
      setHoveredCode(null); setFocusedCode(null); setSelectedCode(null);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
    const escape = (event: globalThis.KeyboardEvent) => { if (event.key === 'Escape') { setHoveredCode(null); setFocusedCode(null); setSelectedCode(null); } };
    document.addEventListener('pointerdown', dismiss);
    document.addEventListener('keydown', escape);
    return () => { document.removeEventListener('pointerdown', dismiss); document.removeEventListener('keydown', escape); if (hideTimer.current) clearTimeout(hideTimer.current); };
  }, []);

  const handlePointerOver = (event: PointerEvent<SVGSVGElement>) => {
    if (event.pointerType === "touch") return;
    const path = activePathFromTarget(event.target);
    if (path) { if (hideTimer.current) clearTimeout(hideTimer.current); setHoveredCode(path.id as ActiveMapCountryCode); }
    else scheduleHide();
  };

  const handleFocus = (event: FocusEvent<SVGSVGElement>) => {
    const path = activePathFromTarget(event.target);
    if (path) setFocusedCode(path.id as ActiveMapCountryCode);
  };

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!(event.relatedTarget instanceof Node) || !event.currentTarget.contains(event.relatedTarget)) {
      setFocusedCode(null);
    }
  };

  const handleClick = (event: MouseEvent<SVGSVGElement>) => {
    const path = activePathFromTarget(event.target);
    if (!path) return;
    const code = path.id as ActiveMapCountryCode;
    const touch = lastPointerType.current === "touch";
    lastPointerType.current = "mouse";
    if ((touch && selectedCode !== code) || !hasProjects(code)) {
      setSelectedCode(code);
      return;
    }
    router.push(countryHref(code));
  };

  const handleKeyDown = (event: KeyboardEvent<SVGSVGElement>) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const path = activePathFromTarget(event.target);
    if (!path) return;
    event.preventDefault();
    const code = path.id as ActiveMapCountryCode;
    if (hasProjects(code)) router.push(countryHref(code));
    else setSelectedCode(code);
  };

  return (
    <div ref={frameRef} className={styles.frame} onPointerLeave={scheduleHide} onBlur={handleBlur}>
    <svg ref={svgRef} className={styles.map} xmlns="http://www.w3.org/2000/svg" viewBox={geometry.viewBox}
      role="group" aria-labelledby="map-title map-desc" preserveAspectRatio="xMidYMid meet"
      onPointerOver={handlePointerOver}
      onPointerDown={event => { lastPointerType.current = event.pointerType; }}
      onFocus={handleFocus}
      onClick={handleClick}
      onKeyDown={handleKeyDown}>
      <title id="map-title">{t("titleAlt")}</title>
      <desc id="map-desc">{t("description")}</desc>
      <defs>
        <linearGradient id="regionalCountryFill" x1="0" y1="0" x2="1" y2=".6">
          <stop offset="0" stopColor="#83ad6a"/>
          <stop offset=".55" stopColor="#347b60"/>
          <stop offset="1" stopColor="#135574"/>
        </linearGradient>
        <linearGradient id="regionalCountryFillReverse" x1="0" y1="0" x2="1" y2=".6"><stop offset="0" stopColor="#135574"/><stop offset=".45" stopColor="#347b60"/><stop offset="1" stopColor="#83ad6a"/></linearGradient>
        <filter id="countryGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="0" stdDeviation="5.6" floodColor="#fff" floodOpacity=".95" />
          <feDropShadow dx="0" dy="0" stdDeviation="11.6" floodColor="#FB8A42" floodOpacity=".84" />
        </filter>
      </defs>
      {geometry.paths.map(path => {
        const active = isActiveMapCountryCode(path.id);
        return <path {...path} key={path.id} className={`country country--${active ? 'active' : 'inactive'}`} tabIndex={active ? 0 : undefined} role={active ? 'button' : undefined} aria-hidden={!active || undefined} aria-label={active ? countryActionLabel(path.id as ActiveMapCountryCode) : undefined} data-selected={selectedCode === path.id ? 'true' : undefined} data-hovered={hoveredCode === path.id ? 'true' : undefined}><title>{active ? countries(path.id) : path['data-country']}</title></path>;
      })}
    </svg>
    {visibleCode && tooltipPosition?.code === visibleCode && <div className={styles.tooltip} onPointerEnter={() => { if (hideTimer.current) clearTimeout(hideTimer.current); }} onPointerLeave={scheduleHide} style={{left: tooltipPosition.x, top: tooltipPosition.y}}>
      <strong>{countries(visibleCode)}</strong>
      {hasProjects(visibleCode) ? <>
        <span>{t("engagementCount", {count: projectCounts[visibleCode]})}</span>
        <Link href={countryHref(visibleCode)}>{t("view")}<ArrowUpRight size={15} aria-hidden="true"/></Link>
      </> : <span>{t("noPublishedProjects")}</span>}
    </div>}
    <p className={styles.touchHint}>{t("tapHint")}</p>
    </div>
  );
}
