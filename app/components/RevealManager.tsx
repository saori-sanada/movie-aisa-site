"use client";

import { useLayoutEffect } from "react";

export function RevealManager() {
  useLayoutEffect(() => {
    const selector = [
      ".section-heading", ".section-description", ".strength-card", ".work-card",
      ".capability-grid > article", ".case-card", ".process-grid > article",
      ".service-list > article", ".problem-list > article", ".movie-stats > *",
      ".movie-contact > *", ".aisa-contact > *",
    ].join(",");
    const elements = Array.from(document.querySelectorAll<HTMLElement>(selector));
    elements.forEach((element) => {
      element.classList.add("scroll-reveal");
      const siblings = element.parentElement ? Array.from(element.parentElement.children).filter(x => x.matches(selector)) : [];
      const siblingIndex = siblings.indexOf(element);
      element.style.setProperty("--reveal-delay", `${Math.min(Math.max(siblingIndex, 0), 3) * .08}s`);
    });
    if (!('IntersectionObserver' in window)) { elements.forEach(e=>e.classList.add("is-visible")); return; }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting || entry.boundingClientRect.top < window.innerHeight) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
    }), { threshold: .12 });
    elements.forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  return null;
}
