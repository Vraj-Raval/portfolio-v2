import type { Metadata } from "next";
import { person } from "../content/portfolio";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const title = `${person.name} | ${person.role}`;
const description = person.intro;
const shareImage = { url: "/portfolio-og.png", width: 1200, height: 630, alt: title };

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || person.website),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: "/", title, description, siteName: person.name, images: [shareImage] },
  twitter: { card: "summary_large_image", title, description, images: [shareImage] },
};

const initializeTheme = `try {
  const theme = localStorage.getItem("portfolio-theme");
  document.documentElement.dataset.theme = theme === "light" || theme === "dark"
    ? theme : "light";
} catch {}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,400..800;1,400..800&amp;display=swap" />
        <script dangerouslySetInnerHTML={{ __html: initializeTheme }} />
      </head>
      <body id="top">{children}</body>
    </html>
  );
}
