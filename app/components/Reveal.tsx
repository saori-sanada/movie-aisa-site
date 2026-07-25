"use client";

import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";

export function Reveal({ children, className = "", delay = 0, hero = false }: { children: ReactNode; className?: string; delay?: number; hero?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(hero);
  useEffect(() => {
    if (hero || !ref.current || !('IntersectionObserver' in window)) { setVisible(true); return; }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting || entry.boundingClientRect.top < window.innerHeight) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.2 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hero]);
  return <div ref={ref} className={`reveal ${hero ? "hero-reveal" : ""} ${visible ? "is-visible" : ""} ${className}`} style={{ "--reveal-delay": `${delay}s` } as CSSProperties}>{children}</div>;
}
