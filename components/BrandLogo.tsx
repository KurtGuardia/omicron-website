import Image from "next/image";
import {assets} from "@/data/assets";
import styles from "./SiteChrome.module.scss";

// Intrinsic size of public/images/logo.png (and its derived light variant).
const LOGO_WIDTH = 1330;
const LOGO_HEIGHT = 422;

export function BrandLogo({alt, light = false, priority = false, className = ""}: {alt: string; light?: boolean; priority?: boolean; className?: string}) {
  return <span className={`${styles.brandLogo} ${className}`}>
    <Image src={light ? assets.logoLight : assets.logo} alt={alt} width={LOGO_WIDTH} height={LOGO_HEIGHT} priority={priority} sizes="(max-width: 700px) 180px, 280px"/>
  </span>;
}
