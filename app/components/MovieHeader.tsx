"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { moviePage } from "../data/moviePage";

type SectionId = "movie-top" | "services" | "works" | "profile";

export function MovieHeader() {
  const [activeSection, setActiveSection] = useState<SectionId | null>("movie-top");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const sections = ["movie-top", "services", "works", "profile", "contact"]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    let frame = 0;
    const updateActiveSection = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const marker = Math.min(180, window.innerHeight * 0.3);
        const current = sections.find((section) => {
          const rect = section.getBoundingClientRect();
          return rect.top <= marker && rect.bottom > marker;
        });
        setActiveSection(current && current.id !== "contact" ? current.id as SectionId : null);
      });
    };
    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("movie-menu-open", menuOpen);
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    const closeOutside = (event: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOutside);
    if (menuOpen) {
      window.requestAnimationFrame(() => menuRef.current?.querySelector<HTMLElement>("nav a")?.focus());
    }
    return () => {
      document.body.classList.remove("movie-menu-open");
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOutside);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="movie-design-header" ref={menuRef}>
      <a className="movie-mobile-brand" href="#movie-top" onClick={closeMenu}>MOViE</a>
      <button
        ref={toggleRef}
        className="movie-menu-toggle"
        type="button"
        aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"}
        aria-expanded={menuOpen}
        aria-controls="movie-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span /><span /><span />
      </button>
      <nav id="movie-navigation" className={menuOpen ? "is-open" : ""} aria-label="まなだMOViE ナビゲーション">
        {moviePage.navigation.map((item) => {
          const active = "sectionId" in item && item.sectionId === activeSection;
          const content = <span>{item.label}</span>;
          return item.href.startsWith("/")
            ? <Link key={item.href} href={item.href} onClick={closeMenu} className={active ? "is-active" : ""} aria-current={active ? "location" : undefined}>{content}</Link>
            : <a key={item.href} href={item.href} onClick={closeMenu} className={active ? "is-active" : ""} aria-current={active ? "location" : undefined}>{content}</a>;
        })}
      </nav>
      {menuOpen && <button className="movie-menu-backdrop" type="button" aria-label="メニューを閉じる" onClick={closeMenu} />}
    </header>
  );
}
