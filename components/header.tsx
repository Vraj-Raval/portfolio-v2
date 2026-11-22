"use client";

import { Moon, Sun } from "lucide-react";
import { useState } from "react";
import { SiteSearch } from "./site-search";

const links = [
  ["Work", "#work"],
  ["Skills", "#expertise"],
  ["Experience", "#experience"],
  ["About", "#about"],
  ["Contact", "#contact"],
];

let themeAudio: AudioContext | undefined;

async function playThemeClick() {
  themeAudio ??= new AudioContext();
  const audio = themeAudio;
  if (audio.state !== "running") await audio.resume();

  const duration = 0.05;
  const buffer = audio.createBuffer(1, Math.ceil(duration * audio.sampleRate), audio.sampleRate);
  const samples = buffer.getChannelData(0);
  for (let i = 0; i < samples.length; i++) {
    const elapsed = i / audio.sampleRate;
    samples[i] = (Math.random() * 2 - 1) * Math.min(elapsed / 0.002, 1) * Math.exp(-elapsed / 0.009);
  }

  const click = audio.createBufferSource();
  const filter = audio.createBiquadFilter();
  const volume = audio.createGain();
  click.buffer = buffer;
  filter.type = "bandpass";
  filter.frequency.value = 960;
  filter.Q.value = 0.65;
  volume.gain.value = 0.24;
  click.connect(filter).connect(volume).connect(audio.destination);
  click.onended = () => {
    click.disconnect();
    filter.disconnect();
    volume.disconnect();
  };
  click.start();
}

export function Header() {
  const [themeAnnouncement, setThemeAnnouncement] = useState("");

  function toggleTheme() {
    const root = document.documentElement;
    const theme = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = theme;
    void playThemeClick().catch(() => {});
    setThemeAnnouncement(theme === "dark" ? "Dark theme enabled" : "Light theme enabled");
    try { localStorage.setItem("portfolio-theme", theme); } catch {}
  }

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <nav aria-label="Main" className="main-nav">
          {links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <div className="header-actions">
          <SiteSearch />
          <button type="button" className="icon-button theme-toggle" aria-label="Toggle color theme" onClick={toggleTheme}>
            <Moon className="theme-toggle-moon" size={18} aria-hidden="true" />
            <Sun className="theme-toggle-sun" size={18} aria-hidden="true" />
          </button>
        </div>
        <span className="sr-only" role="status">{themeAnnouncement}</span>
      </div>
    </header>
  );
}