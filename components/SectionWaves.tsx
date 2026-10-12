import styles from './HomeSections.module.scss';
export function SectionWaves() {
  return <><img className={styles.sectionContours} src="/images/decor/contours-pale.svg" alt="" aria-hidden="true"/><svg className={styles.sectionWaves} viewBox="0 0 1440 300" preserveAspectRatio="none" aria-hidden="true" focusable="false">
    <path fill="#e3f2f9" d="M0 170 C160 255 240 55 410 160 S620 255 800 155 S1040 290 1220 130 S1350 30 1440 60 V300 H0Z"/>
    <path fill="#d2eaf6" opacity=".65" d="M0 255 C160 160 280 260 450 235 S620 125 790 230 S1030 250 1200 210 S1340 120 1440 145 V300 H0Z"/>
  </svg></>;
}
