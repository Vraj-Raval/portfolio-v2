"use client";

import { SunMoon } from "lucide-react";
import { useState } from "react";

const links = [
  ["Work", "#work"],
  ["Skills", "#expertise"],
  ["Experience", "#experience"],
  ["About", "#about"],
  ["Contact", "#contact"],
];

export function Header() {
  const [themeAnnouncement, setThemeAnnouncement] = useState("");

  function toggleTheme() {
    const root = document.documentElement;
    const theme = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = theme;
    setThemeAnnouncement(theme === "dark" ? "Dark theme enabled" : "Light theme enabled");
    try { localStorage.setItem("portfolio-theme", theme); } catch {}
  }

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <nav aria-label="Main" className="main-nav">
          {links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <button type="button" className="icon-button" aria-label="Toggle color theme" onClick={toggleTheme}>
          <SunMoon size={18} aria-hidden="true" />
        </button>
        <span className="sr-only" role="status">{themeAnnouncement}</span>
      </div>
    </header>
  );
}