"use client";

import {useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type TransitionEvent} from "react";
import {BookOpen, ChevronLeft, ChevronRight, Compass, Search, Wrench} from "lucide-react";
import {useTranslations} from "next-intl";
import Image from "next/image";
import {howStepImages, howStepImagePositions} from "@/data/assets";
import styles from "./HomeSections.module.scss";

const stepNumbers = ["01", "02", "03", "04"] as const;
const stepKeys = ["0", "1", "2", "3"] as const;
const stepIcons = [Search, Compass, Wrench, BookOpen] as const;
const autoplayDelay = 2500;
const wrap = (index: number) => (index + stepNumbers.length) % stepNumbers.length;

type PendingTransition = {target: number; direction: -1 | 1};

export function HomeHowCarousel() {
  const t = useTranslations("Home");
  const carouselRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<{x: number; y: number} | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [pendingTransition, setPendingTransition] = useState<PendingTransition | null>(null);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [touching, setTouching] = useState(false);
  const [visible, setVisible] = useState(false);
  const [documentVisible, setDocumentVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [interactionVersion, setInteractionVersion] = useState(0);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => {
      setReducedMotion(preference.matches);
    };
    const updateVisibility = () => setDocumentVisible(document.visibilityState === "visible");
    updateMotion();
    updateVisibility();
    preference.addEventListener("change", updateMotion);
    document.addEventListener("visibilitychange", updateVisibility);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting && entry.intersectionRatio >= .3), {threshold: [0, .3]});
    if (carouselRef.current) observer.observe(carouselRef.current);
    return () => {
      preference.removeEventListener("change", updateMotion);
      document.removeEventListener("visibilitychange", updateVisibility);
      observer.disconnect();
    };
  }, []);

  const steps = stepKeys.map((key, index) => ({
    number: stepNumbers[index],
    title: t(`how.steps.${key}.title`),
    text: t(`how.steps.${key}.text`),
    Icon: stepIcons[index],
  }));
  const slideIndices = pendingTransition
    ? pendingTransition.direction === 1
      ? [wrap(currentStep - 1), currentStep, pendingTransition.target]
      : [pendingTransition.target, currentStep, wrap(currentStep + 1)]
    : [wrap(currentStep - 1), currentStep, wrap(currentStep + 1)];
  const trackPosition = pendingTransition ? 1 + pendingTransition.direction : 1;

  const goToStep = useCallback((target: number) => {
    if (target === currentStep || pendingTransition) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCurrentStep(target);
      return;
    }
    const forwardDistance = wrap(target - currentStep);
    const direction: -1 | 1 = forwardDistance <= stepNumbers.length / 2 ? 1 : -1;
    setPendingTransition({target, direction});
  }, [currentStep, pendingTransition]);

  const canAutoplay = visible && documentVisible && !hovered && !focused && !touching && !reducedMotion;
  useEffect(() => {
    if (!canAutoplay || pendingTransition) return;
    const timer = window.setTimeout(() => goToStep(wrap(currentStep + 1)), autoplayDelay);
    return () => window.clearTimeout(timer);
  }, [canAutoplay, currentStep, pendingTransition, interactionVersion, goToStep]);

  // Also settle transitions cancelled by a preference change or an inactive tab.
  useEffect(() => {
    if (!pendingTransition) return;
    const timer = window.setTimeout(() => {
      setCurrentStep(pendingTransition.target);
      setPendingTransition(null);
    }, reducedMotion ? 0 : 560);
    return () => window.clearTimeout(timer);
  }, [pendingTransition, reducedMotion]);

  const navigateManually = (target: number) => {
    setInteractionVersion(version => version + 1);
    goToStep(target);
  };

  const move = (direction: -1 | 1) => navigateManually(wrap(currentStep + direction));
  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      move(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      move(1);
    }
  };

  const finishTransition = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget || event.propertyName !== "transform" || !pendingTransition) return;
    setCurrentStep(pendingTransition.target);
    setPendingTransition(null);
  };

  const trackStyle = {
    transform: `translate3d(-${trackPosition * (100 / 3)}%, 0, 0)`,
    transition: pendingTransition ? undefined : "none",
  } as CSSProperties;

  return <>{howStepImages.map((src, index) => <div key={index} aria-hidden="true" className={styles.howStepBackground} style={{opacity: index === currentStep ? 1 : 0, '--how-image': `url("${src}")`, '--how-image-position': howStepImagePositions[index]} as CSSProperties}><Image src={src} alt="" fill sizes="100vw" className={styles.howStepImage}/></div>)}<div className={`container ${styles.howContent}`}>
    <h2 id="how-title">{t("how.title")}</h2>
    <p className={styles.howIntro}>{t("how.intro")}</p>
    <div
      ref={carouselRef}
      className={styles.howCarousel}
      role="region"
      aria-roledescription={t("how.carouselDescription")}
      aria-label={t("how.title")}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onPointerEnter={event => { if (event.pointerType !== "touch") setHovered(true); }}
      onPointerLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
      onTouchStart={event => { setTouching(true); const touch = event.touches[0]; touchStart.current = {x: touch.clientX, y: touch.clientY}; }}
      onTouchEnd={event => { setTouching(false); setInteractionVersion(version => version + 1); const start = touchStart.current; touchStart.current = null; if (!start) return; const touch = event.changedTouches[0]; const dx = touch.clientX - start.x, dy = touch.clientY - start.y; if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.3) move(dx < 0 ? 1 : -1); }}
      onTouchCancel={() => { setTouching(false); touchStart.current = null; }}
    >
      <div className={styles.howViewport}>
        <div className={styles.howTrack} style={trackStyle} onTransitionEnd={finishTransition}>
          {slideIndices.map((stepIndex, trackIndex) => {
            const step = steps[stepIndex];
            const isCurrent = trackIndex === 1;
            return <div
              className={styles.howSlide}
              key={`${trackIndex}-${step.number}`}
              role="group"
              aria-roledescription={t("how.slideDescription")}
              aria-label={`${step.number} ${step.title}`}
              aria-hidden={!isCurrent}
              aria-current={isCurrent ? "step" : undefined}
              aria-live={isCurrent && !canAutoplay ? "polite" : "off"}
            >
              <div className={styles.howStepHeading}><div className={styles.howIcon} aria-hidden="true"><step.Icon/></div>
              <div className={styles.howTitle}>
                <span>{step.number}</span><h3>{step.title}</h3>
              </div>
              </div><p className={styles.howDescription}>{step.text}</p>
            </div>;
          })}
        </div>
      </div>
        <button type="button" className={`${styles.shellArrow} ${styles.previousArrow}`} aria-label={t("how.previous")} onClick={() => move(-1)}>
          <ChevronLeft size={30} aria-hidden="true"/>
        </button>
      <div className={styles.howControls}>
        <div className={styles.dots} role="group" aria-label={t("how.stepsNavigation")}>
          {steps.map((step, index) => <button
            type="button"
            key={step.number}
            className={`${styles.dot} ${index === currentStep ? styles.currentDot : ""}`}
            aria-label={t("how.goToStep", {number: index + 1, title: step.title})}
            aria-current={index === currentStep ? "step" : undefined}
            onClick={() => navigateManually(index)}
          />)}
        </div>

      </div>
        <button type="button" className={`${styles.shellArrow} ${styles.nextArrow}`} aria-label={t("how.next")} onClick={() => move(1)}>
          <ChevronRight size={30} aria-hidden="true"/>
        </button>
    </div>
  </div></>;
}
