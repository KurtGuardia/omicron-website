import Image from "next/image";
import {assets} from "@/data/assets";
import styles from "./SiteChrome.module.scss";

export function BrandLogo({alt, light = false, priority = false}: {alt: string; light?: boolean; priority?: boolean}) {
  return <span className={styles.brandLogo}>
    <Image src={assets.logo} alt={alt} width={2172} height={724} priority={priority} sizes="(max-width: 700px) 180px, 280px"/>
    {/* Reuse the actual wordmark pixels for the reference's white-on-navy treatment.
        Only the wordmark is filtered; the original multicolour emblem stays intact. */}
    {light && <Image src={assets.logo} alt="" aria-hidden="true" width={2172} height={724} priority={priority} sizes="(max-width: 700px) 180px, 280px" className={styles.lightWordmark}/>}
  </span>;
}
