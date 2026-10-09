import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "OMICRON Consultores SRL",
  icons: {icon: "/favicon.png"},
  description: "Consultoría para el desarrollo sostenible en América Latina.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
