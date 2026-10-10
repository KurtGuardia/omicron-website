"use client";

import {useRef, useState, type CSSProperties, type KeyboardEvent, type TransitionEvent} from "react";
import {BookOpen, ChevronLeft, ChevronRight, Compass, Search, Wrench} from "lucide-react";
import {useTranslations} from "next-intl";
import styles from "./HomeSections.module.scss";

const stepNumbers = ["01", "02", "03", "04"] as const;
const stepKeys = ["0", "1", "2", "3"] as const;
const stepIcons = [Search, Compass, Wrench, BookOpen] as const;

type PendingTransition = {target: number; direction: -1 | 1};

export function HomeHowCarousel() {
  const t = useTranslations("Home");
  const touchStart = useRef<{x: number; y: number} | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [pendingTransition, setPendingTransition] = useState<PendingTransition | null>(null);
  const steps = stepKeys.map((key, index) => ({
    number: stepNumbers[index],
    title: t(`how.steps.${key}.title`),
    text: t(`how.steps.${key}.text`),
    Icon: stepIcons[index],
  }));
  const wrap = (index: number) => (index + steps.length) % steps.length;
  const slideIndices = pendingTransition
    ? pendingTransition.direction === 1
      ? [wrap(currentStep - 1), currentStep, pendingTransition.target]
      : [pendingTransition.target, currentStep, wrap(currentStep + 1)]
    : [wrap(currentStep - 1), currentStep, wrap(currentStep + 1)];
  const trackPosition = pendingTransition ? 1 + pendingTransition.direction : 1;

  const goToStep = (target: number) => {
    if (target === currentStep || pendingTransition) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCurrentStep(target);
      return;
    }
    const forwardDistance = wrap(target - currentStep);
    const direction: -1 | 1 = forwardDistance <= steps.length / 2 ? 1 : -1;
    setPendingTransition({target, direction});
  };

  const move = (direction: -1 | 1) => goToStep(wrap(currentStep + direction));
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

  return <div className={`container ${styles.howContent}`}>
    <h2 id="how-title">{t("how.title")}</h2>
    <p className={styles.howIntro}>{t("how.intro")}</p>
    <div
      className={styles.howCarousel}
      role="region"
      aria-roledescription={t("how.carouselDescription")}
      aria-label={t("how.title")}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onTouchStart={event => { const touch = event.touches[0]; touchStart.current = {x: touch.clientX, y: touch.clientY}; }}
      onTouchEnd={event => { const start = touchStart.current; touchStart.current = null; if (!start) return; const touch = event.changedTouches[0]; const dx = touch.clientX - start.x, dy = touch.clientY - start.y; if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.3) move(dx < 0 ? 1 : -1); }}
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
              aria-live={isCurrent ? "polite" : "off"}
            >
              <div className={styles.howIcon} aria-hidden="true"><step.Icon/></div>
              <div className={styles.howTitle}>
                <span>{step.number}</span><h3>{step.title}</h3>
              </div>
              <p className={styles.howDescription}>{step.text}</p>
            </div>;
          })}
        </div>
        <button type="button" className={`${styles.shellArrow} ${styles.previousArrow}`} aria-label={t("how.previous")} onClick={() => move(-1)}>
          <ChevronLeft size={30} aria-hidden="true"/>
        </button>
        <button type="button" className={`${styles.shellArrow} ${styles.nextArrow}`} aria-label={t("how.next")} onClick={() => move(1)}>
          <ChevronRight size={30} aria-hidden="true"/>
        </button>
      </div>
      <div className={styles.dots} role="group" aria-label={t("how.stepsNavigation")}>
        {steps.map((step, index) => <button
          type="button"
          key={step.number}
          className={`${styles.dot} ${index === currentStep ? styles.currentDot : ""}`}
          aria-label={t("how.goToStep", {number: index + 1, title: step.title})}
          aria-current={index === currentStep ? "step" : undefined}
          onClick={() => goToStep(index)}
        />)}
      </div>
    </div>
  </div>;
}
