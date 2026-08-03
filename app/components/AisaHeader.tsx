"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { aisaNavigation } from "../data/aisa";
import styles from "../aisa/AisaPage.module.css";

type SectionId = "aisa-top" | "services" | "works" | "profile" | "contact";

export function AisaHeader() {
  const [activeSection, setActiveSection] = useState<SectionId>("aisa-top");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const sections = ["aisa-top", "services", "works", "profile", "contact"]
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
        if (current) setActiveSection(current.id as SectionId);
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
    document.body.classList.toggle("aisa-menu-open", menuOpen);
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
    if (menuOpen) window.requestAnimationFrame(() => menuRef.current?.querySelector<HTMLElement>("nav a")?.focus());
    return () => {
      document.body.classList.remove("aisa-menu-open");
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOutside);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const navigateToSection = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#") || !window.matchMedia("(max-width: 768px)").matches) {
      closeMenu();
      return;
    }
    event.preventDefault();
    closeMenu();
    const target = document.getElementById(href.slice(1));
    if (!target) return;
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", href);
    }));
  };

  return (
    <header className={styles.header} ref={menuRef}>
      <a className={styles.mobileBrand} href="#aisa-top" aria-label="aisa（AI活用）トップ" onClick={(event) => navigateToSection(event, "#aisa-top")}>
        <strong>aisa</strong><span>AI活用</span>
      </a>
      <button
        ref={toggleRef}
        className={styles.menuToggle}
        type="button"
        aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"}
        aria-expanded={menuOpen}
        aria-controls="aisa-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span /><span /><span />
      </button>
      <nav id="aisa-navigation" className={menuOpen ? styles.menuOpen : ""} aria-label="aisa ページ内ナビゲーション">
        {aisaNavigation.map((item) => {
          const active = item.sectionId !== "home" && item.sectionId === activeSection;
          return item.href.startsWith("/") ? (
            <Link key={item.href} href={item.href} onClick={closeMenu}>{item.label}</Link>
          ) : (
            <a key={item.href} href={item.href} onClick={(event) => navigateToSection(event, item.href)} className={active ? styles.active : ""} aria-current={active ? "location" : undefined}>{item.label}</a>
          );
        })}
      </nav>
      {menuOpen && <button className={styles.menuBackdrop} type="button" aria-label="メニューを閉じる" onClick={closeMenu} />}
    </header>
  );
}
