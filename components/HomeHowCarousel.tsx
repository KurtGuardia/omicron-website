"use client";

import {useState, type KeyboardEvent} from "react";
import {BookOpen, ChevronLeft, ChevronRight, Compass, Search, Wrench} from "lucide-react";
import {useTranslations} from "next-intl";
import styles from "./HomeSections.module.scss";

const stepNumbers = ["01", "02", "03", "04"] as const;
const stepKeys = ["0", "1", "2", "3"] as const;
const stepIcons = [Search, Compass, Wrench, BookOpen] as const;

export function HomeHowCarousel() {
  const t = useTranslations("Home");
  const [currentStep, setCurrentStep] = useState(0);
  const steps = stepKeys.map((key, index) => ({
    number: stepNumbers[index],
    title: t(`how.steps.${key}.title`),
    text: t(`how.steps.${key}.text`),
    Icon: stepIcons[index],
  }));
  const step = steps[currentStep];

  const move = (direction: -1 | 1) => {
    setCurrentStep(index => (index + direction + steps.length) % steps.length);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      move(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      move(1);
    }
  };

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
    >
      <div className={styles.howSlide}>
        <button type="button" className={styles.shellArrow} aria-label={t("how.previous")} onClick={() => move(-1)}>
          <ChevronLeft size={30} aria-hidden="true"/>
        </button>
        <div className={styles.howIcon} aria-hidden="true"><step.Icon/></div>
        <div className={styles.howTitle} key={currentStep} aria-live="polite" aria-atomic="true">
          <span>{step.number}</span><h3>{step.title}</h3>
        </div>
        <p key={`description-${currentStep}`} className={styles.howDescription} aria-live="polite">{step.text}</p>
        <button type="button" className={styles.shellArrow} aria-label={t("how.next")} onClick={() => move(1)}>
          <ChevronRight size={30} aria-hidden="true"/>
        </button>
      </div>
      <div className={styles.dots} role="group" aria-label={t("how.stepsNavigation")}>
        {steps.map((item, index) => <button
          type="button"
          key={item.number}
          className={`${styles.dot} ${index === currentStep ? styles.currentDot : ""}`}
          aria-label={t("how.goToStep", {number: index + 1, title: item.title})}
          aria-current={index === currentStep ? "step" : undefined}
          onClick={() => setCurrentStep(index)}
        />)}
      </div>
    </div>
  </div>;
}
