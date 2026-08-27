"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export function MovieWorkGallery({ images, title }: { images: readonly string[]; title: string }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const goTo = (index: number) => {
    const next = (index + images.length) % images.length;
    viewportRef.current?.children[next]?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    setActive(next);
  };
  return <div className="movie-work-gallery"><div ref={viewportRef} className="movie-work-gallery-viewport" onScroll={(event) => { const el = event.currentTarget; setActive(Math.round(el.scrollLeft / el.clientWidth)); }}>
    {images.map((src, index) => <div className="movie-work-gallery-slide" key={src}><Image unoptimized src={src} alt={`${title} ${index + 1}枚目`} fill sizes="(max-width: 900px) calc(100vw - 32px), 750px" /></div>)}
  </div><div className="movie-work-gallery-controls"><button type="button" onClick={() => goTo(active - 1)} aria-label="前の画像">←</button><div className="movie-work-gallery-dots">{images.map((src, index) => <button key={src} type="button" className={index === active ? "is-active" : ""} onClick={() => goTo(index)} aria-label={`${index + 1}枚目を表示`} />)}</div><button type="button" onClick={() => goTo(active + 1)} aria-label="次の画像">→</button><span>{active + 1} / {images.length}</span></div></div>;
}
