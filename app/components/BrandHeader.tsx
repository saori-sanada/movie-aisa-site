"use client";

import Link from "next/link";
import { useState } from "react";
import { mobileNavigation, pageNavigation } from "../data/navigation";

type BrandHeaderProps = {
  brand: "movie" | "aisa";
  navItems?: { label: string; href: string }[];
};

export function BrandHeader({ brand, navItems }: BrandHeaderProps) {
  const [open, setOpen] = useState(false);
  const isMovie = brand === "movie";
  const items = navItems ?? pageNavigation[brand];
  const home = `/${brand}`;

  return (
    <header className={`site-header ${brand}-header`}>
      <div className="header-inner">
        <Link className={isMovie ? "movie-logo" : "aisa-logo"} href={home} aria-label={`${isMovie ? "まなだMOViE" : "aisa"} トップ`}>
          {isMovie ? <>まなだ<span>MOViE</span></> : <>aisa<span>.</span></>}
        </Link>
        <nav className="desktop-nav" aria-label="メインナビゲーション">
          {items.map((item) => item.href.startsWith("/") ? <Link key={item.href} href={item.href}>{item.label}</Link> : <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>
        <button className="menu-button" type="button" aria-expanded={open} aria-controls={`${brand}-mobile-nav`} onClick={() => setOpen(!open)}>
          <span>{open ? "閉じる" : "メニュー"}</span><span aria-hidden="true">{open ? "×" : "＋"}</span>
        </button>
      </div>
      {open && (
        <nav id={`${brand}-mobile-nav`} className="mobile-nav" aria-label="モバイルナビゲーション">
          {mobileNavigation.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}<span aria-hidden="true">→</span></Link>)}
          <a href="#contact" onClick={() => setOpen(false)}>お問い合わせ<span aria-hidden="true">↘</span></a>
        </nav>
      )}
    </header>
  );
}
