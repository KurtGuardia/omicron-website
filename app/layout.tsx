import type { Metadata } from "next";
import {getLocale} from "next-intl/server";
import "./globals.scss";

export const metadata: Metadata = {
  title: "OMICRON Consultores SRL",
  icons: {icon: "/favicon.png"},
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}
