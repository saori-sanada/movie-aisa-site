"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { topContent } from "../data/top";

type ActiveBrand = "movie" | "aisa" | null;
type IntroMode = "pending" | "full" | "short";

export function TopGateway() {
  const [active, setActive] = useState<ActiveBrand>(null);
  const [introMode, setIntroMode] = useState<IntroMode>("pending");
  const [interactive, setInteractive] = useState(false);
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const returning = sessionStorage.getItem("top-intro-seen") === "true";
    const mode: Exclude<IntroMode, "pending"> = returning ? "short" : "full";
    const duration = reducedMotion ? 160 : mode === "full" ? 2400 : 420;

    setIntroMode(mode);
    sessionStorage.setItem("top-intro-seen", "true");
    const readyTimer = window.setTimeout(() => setInteractive(true), duration);

    const close = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setActive(null);
    };
    document.addEventListener("pointerdown", close);
    return () => {
      window.clearTimeout(readyTimer);
      document.removeEventListener("pointerdown", close);
    };
  }, []);

  const activate = (brand: Exclude<ActiveBrand, null>) => {
    if (interactive) setActive(brand);
  };

  return <main ref={rootRef} className={`top-gateway is-intro-${introMode}${interactive ? " is-ready" : ""}${active ? ` is-${active}` : ""}`} onMouseLeave={() => setActive(null)} aria-label="真田紗織 ポートフォリオ">
    <div className="top-art" aria-hidden="true">
      <div className="top-world top-world-movie"><div className="top-world-image" /></div>
      <div className="top-world top-world-aisa"><div className="top-world-image" /></div>
      <div className="top-art-shade top-art-shade-movie" />
      <div className="top-art-shade top-art-shade-aisa" />
    </div>
    <div className="top-intro-dim" aria-hidden="true" />

    <header className="top-identity"><span>{topContent.owner}</span><span>{topContent.role}</span></header>
    <div className="top-owner" aria-label={`${topContent.owner}, ${topContent.role}`}>
      <strong>SAORI SANADA</strong>
      <span>Creative Producer</span>
    </div>

    <div className="top-hit top-hit-movie" aria-hidden="true" onMouseEnter={() => activate("movie")} />
    <div className="top-hit top-hit-aisa" aria-hidden="true" onMouseEnter={() => activate("aisa")} />

    <div className="top-copy" aria-label={`${topContent.slogan} ${topContent.sloganJa}`}><h1><span>Unlock</span><span>Potential.</span></h1><p>{topContent.sloganJa}</p></div>

    <div className="top-brands">
      <div className="top-brand top-brand-movie">
        <strong>まなだMOViE</strong>
        <span>VIDEO / CREATE</span>
      </div>
      <div className="top-brand top-brand-aisa">
        <strong>aisa</strong>
        <span>AI / EXPAND</span>
      </div>
    </div>

    {active && (() => {
      const content = topContent.brands[active];
      return <Link className={`top-card top-card-${active}`} href={content.href} aria-label={active === "movie" ? "まなだMOViEのページを見る" : "AI自動化 aisaのページを見る"}>
        <p className="top-card-label">{content.label}</p>
        <h2>{content.title}</h2>
        <p className="top-card-description">{content.description.map(line => <span key={line}>{line}</span>)}</p>
        <span className="top-card-action">{content.action}<span aria-hidden="true">→</span></span>
      </Link>;
    })()}

    <div className="mobile-home-complete">
      <img
        src="/top/home-mobile-9x16.png"
        alt="まなだMOViEとaisaのスマートフォン用ポートフォリオビジュアル"
        width="941"
        height="1672"
      />
      <Link
        href="/movie"
        aria-label="動画制作を見る"
        className="mobile-home-link mobile-home-link--movie"
      />
      <Link
        href="/aisa"
        aria-label="AI事業を見る"
        className="mobile-home-link mobile-home-link--aisa"
      />
    </div>

    <div className="top-mobile-worlds">
      {(["movie", "aisa"] as const).map((brand) => {
        const content = topContent.brands[brand];
        return (
          <div key={brand}>
            <section className={`top-mobile-world top-mobile-world-${brand}`}>
              <div className={`top-mobile-image top-mobile-image-${brand}`}>
                <div className="top-mobile-brand">
                  <strong>{brand === "movie" ? "まなだMOViE" : "aisa"}</strong>
                  <span>{content.label}</span>
                </div>
              </div>
              <Link className={`top-mobile-card top-card-${brand}`} href={content.href}>
                <h2>{content.title}</h2>
                <p>{content.description.map((line) => <span key={line}>{line}</span>)}</p>
                <span className="top-card-action">{content.action}<span aria-hidden="true">→</span></span>
              </Link>
            </section>
            {brand === "movie" && (
              <section className="top-mobile-slogan" aria-label="Unlock Potential">
                <span>Unlock</span>
                <span>Potential</span>
              </section>
            )}
          </div>
        );
      })}
    </div>

    <p className="top-instruction">SELECT A WORLD</p>
  </main>;
}
