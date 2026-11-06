import {MobileMenuState} from "@/components/MobileMenuState";
import type { Metadata } from "next";
import {getLocale} from "next-intl/server";
import {Manrope} from "next/font/google";
import "./globals.scss";

// Self-hosted at build time by next/font (no runtime request to Google).
const manrope = Manrope({subsets: ["latin", "latin-ext"], variable: "--font-manrope", display: "swap"});

export const metadata: Metadata = {
  title: "OMICRON Consultores SRL",
  icons: {icon: "/favicon.png"},
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  return (
    <html lang={locale} className={manrope.variable} suppressHydrationWarning>
      {/* Sets html[data-js] before first paint to enable scroll-reveal start states (an attribute, not a
          class: React re-renders className and would drop it). Falls back to fully visible after 3s if
          the reveal script never runs (see components/ScrollReveal.tsx). */}
      <head><script dangerouslySetInnerHTML={{__html: "document.documentElement.setAttribute('data-js','');setTimeout(function(){if(!window.__revealReady)document.documentElement.removeAttribute('data-js')},3000)"}}/></head>
      <body><MobileMenuState>{children}</MobileMenuState></body>
    </html>
  );
}
