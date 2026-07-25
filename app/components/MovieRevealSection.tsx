"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export function MovieRevealSection({ children, className, id }: { children: ReactNode; className: string; id?: string }) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || !("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1, rootMargin: "0px 0px -5% 0px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <section ref={ref} id={id} className={`${className} movie-reveal-section${visible ? " is-visible" : ""}`}>{children}</section>;
}
