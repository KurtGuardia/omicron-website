import {assets} from "@/data/assets";
import styles from "./Contours.module.scss";

export function Contours({tone = "dark"}: {tone?: "light" | "dark"}) {
  return <img className={styles.contours} src={tone === "dark" ? assets.contoursDark : assets.contoursLight} alt="" aria-hidden="true"/>;
}
