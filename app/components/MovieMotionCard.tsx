"use client";

import { useEffect, useRef, type CSSProperties, type MouseEvent, type PointerEvent, type ReactNode } from "react";

type MotionStyle = CSSProperties & { "--tilt-x": string; "--tilt-y": string };

export function MovieMotionCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const cardRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const clearWhenOutside = (event: Event) => {
      const card = cardRef.current;
      if (card && event.target instanceof Node && !card.contains(event.target)) {
        card.classList.remove("is-hovered");
        card.style.setProperty("--tilt-x", "0deg");
        card.style.setProperty("--tilt-y", "0deg");
      }
    };
    window.addEventListener("mousemove", clearWhenOutside);
    return () => window.removeEventListener("mousemove", clearWhenOutside);
  }, []);

  const updateTilt = (event: MouseEvent<HTMLElement>) => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) return;
    const card = event.currentTarget;
    card.classList.add("is-hovered");
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.setProperty("--tilt-x", `${(-y * 3).toFixed(2)}deg`);
    card.style.setProperty("--tilt-y", `${(x * 3).toFixed(2)}deg`);
  };

  const resetTilt = (event: MouseEvent<HTMLElement> | PointerEvent<HTMLElement>) => {
    event.currentTarget.classList.remove("is-hovered");
    event.currentTarget.style.setProperty("--tilt-x", "0deg");
    event.currentTarget.style.setProperty("--tilt-y", "0deg");
  };

  const style = { "--tilt-x": "0deg", "--tilt-y": "0deg" } as MotionStyle;
  return <article ref={cardRef} className={`movie-motion-card ${className}`} style={style} onMouseMove={updateTilt} onMouseLeave={resetTilt} onPointerLeave={resetTilt}>{children}</article>;
}
