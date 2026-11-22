"use client";

import { Search, X } from "lucide-react";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { education, experience, expertise, person, projects } from "../content/portfolio";

type SearchEntry = {
  title: string;
  category: string;
  href: string;
  keywords: string;
};

const sections: SearchEntry[] = [
  { title: "Selected work", category: "Section", href: "#work", keywords: "projects portfolio" },
  { title: "Technical expertise", category: "Section", href: "#expertise", keywords: "skills technologies tools" },
  { title: "Experience", category: "Section", href: "#experience", keywords: "employment career work history" },
  { title: "About me", category: "Section", href: "#about", keywords: person.about },
  { title: "Get in touch", category: "Section", href: "#contact", keywords: `contact email phone linkedin github ${person.email} ${person.phone}` },
];

const entries: SearchEntry[] = [
  ...sections,
  ...projects.map(({ id, name, category, description, features, technologies }) => ({
    title: name,
    category: "Project",
    href: `#${id}-heading`,
    keywords: [category, description, ...technologies, ...features.flatMap(({ title, text }) => [title, text])].join(" "),
  })),
  ...expertise.flatMap(([category, skills], group) => skills.map((title, index) => ({
    title,
    category,
    href: `#skill-${group}-${index}`,
    keywords: `skill ${category}`,
  }))),
  { title: experience.company, category: "Experience", href: "#experience", keywords: `${experience.role} ${experience.summary} ${experience.location}` },
  { title: education.institution, category: "Education", href: "#education", keywords: `${education.degree} ${education.location}` },
];

function normalize(value: string) {
  return value.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();
}

const index = entries.map((entry) => ({
  entry,
  title: normalize(entry.title),
  text: normalize(`${entry.title} ${entry.category} ${entry.keywords}`),
}));

function findResults(query: string) {
  const phrase = normalize(query);
  if (!query.trim()) return sections;
  if (!phrase) return [];

  const terms = phrase.split(" ");
  return index
    .filter(({ text }) => terms.every((term) => text.includes(term)))
    .map(({ entry, title }) => ({
      entry,
      score: title === phrase ? 3 : title.startsWith(phrase) ? 2 : terms.every((term) => title.includes(term)) ? 1 : 0,
    }))
    .sort((first, second) => second.score - first.score)
    .map(({ entry }) => entry);
}

export function SiteSearch() {
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const [query, setQuery] = useState("");
  const results = findResults(query);

  function openSearch() {
    if (!dialog.current || dialog.current.open) return;
    dialog.current.showModal();
    input.current?.focus();
  }

  useEffect(() => {
    function openFromShortcut(event: globalThis.KeyboardEvent) {
      if (!(event.ctrlKey || event.metaKey) || event.altKey || event.shiftKey || event.key.toLowerCase() !== "k") return;
      event.preventDefault();
      openSearch();
    }

    window.addEventListener("keydown", openFromShortcut);
    return () => window.removeEventListener("keydown", openFromShortcut);
  }, []);

  function navigateResults(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.nativeEvent.isComposing) return;
    const links = Array.from(list.current?.querySelectorAll<HTMLAnchorElement>("a") ?? []);
    if (!links.length) return;

    if (event.target === input.current && event.key === "Enter") {
      event.preventDefault();
      links[0].click();
      return;
    }

    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    const current = links.findIndex((link) => link === event.target);
    if (current < 0 && event.target !== input.current) return;
    event.preventDefault();
    if (event.key === "ArrowDown") {
      links[current + 1]?.focus();
    } else if (current === 0) {
      input.current?.focus();
    } else {
      links[current < 0 ? links.length - 1 : current - 1]?.focus();
    }
  }

  return (
    <>
      <button type="button" className="icon-button search-trigger" aria-label="Search portfolio" aria-haspopup="dialog" aria-keyshortcuts="Control+K Meta+K" onClick={openSearch}>
        <Search size={18} aria-hidden="true" />
        <kbd aria-hidden="true">Ctrl + K</kbd>
      </button>
      <dialog
        ref={dialog}
        className="site-search"
        aria-labelledby="site-search-title"
        onClose={() => setQuery("")}
        onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}
        onKeyDown={navigateResults}
      >
        <div className="site-search-content">
          <div className="site-search-heading">
            <h2 id="site-search-title">Search portfolio</h2>
            <button type="button" className="icon-button" aria-label="Close search" onClick={() => dialog.current?.close()}>
              <X size={18} aria-hidden="true" />
            </button>
          </div>
          <input
            ref={input}
            type="search"
            aria-label="Search projects, skills, and sections"
            placeholder="Search projects, skills, and more"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <p className={results.length ? "sr-only" : "site-search-empty"} role="status">
            {results.length ? `${results.length} ${results.length === 1 ? "result" : "results"}` : "No results found."}
          </p>
          <ul ref={list} className="site-search-results" aria-label="Search results">
            {results.map(({ href, title, category }) => (
              <li key={`${href}-${title}`}>
                <a href={href} onClick={() => dialog.current?.close()}>
                  <span>{title}</span>
                  <span className="site-search-category">{category}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </dialog>
    </>
  );
}
