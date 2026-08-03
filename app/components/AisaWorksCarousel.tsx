"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import type { aisaWorks } from "../data/aisa";
import pageStyles from "../aisa/AisaPage.module.css";
import styles from "./AisaWorksCarousel.module.css";

type AisaWork = (typeof aisaWorks)[number];

export function AisaWorksCarousel({ works }: { works: readonly AisaWork[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [progress, setProgress] = useState(0);

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const slides = Array.from(track.querySelectorAll<HTMLElement>("[data-aisa-work-index]"));
    if (!slides.length) return;
    const step = slides.length > 1 ? slides[1].offsetLeft - slides[0].offsetLeft : slides[0].offsetWidth;
    const count = Math.max(1, Math.min(works.length, Math.round(track.clientWidth / step)));
    const index = Math.max(0, Math.min(works.length - count, Math.round(track.scrollLeft / step)));
    setVisibleCount(count);
    setCurrentIndex(index);
    setProgress(track.scrollWidth > track.clientWidth ? track.scrollLeft / (track.scrollWidth - track.clientWidth) : 0);
  }, [works.length]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    measure();
    return () => observer.disconnect();
  }, [measure]);

  useEffect(() => () => {
    if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
  }, []);

  const handleScroll = () => {
    if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    frameRef.current = window.requestAnimationFrame(measure);
  };

  const maxIndex = Math.max(0, works.length - visibleCount);
  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    const slide = track?.querySelector<HTMLElement>(`[data-aisa-work-index="${index}"]`);
    if (!track || !slide) return;
    track.scrollTo({ left: slide.offsetLeft, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };
  const move = (direction: -1 | 1) => scrollToIndex(Math.max(0, Math.min(maxIndex, currentIndex + direction)));
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
    if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
  };

  const indicatorWidth = visibleCount / works.length * 100;
  const indicatorLeft = progress * (100 - indicatorWidth);
  const rangeEnd = Math.min(works.length, currentIndex + visibleCount);

  return (
    <div className={styles.carousel} aria-roledescription="カルーセル" aria-label="aisa 制作実績">
      <div className={styles.headingRow}>
        <div className={pageStyles.heading}><span>WORKS</span><h2>制作実績</h2></div>
        <div className={styles.controls} aria-label="制作実績の表示操作">
          <span>SCROLL</span>
          <strong>{currentIndex + 1}–{rangeEnd} / {works.length}</strong>
          <button type="button" aria-label="前の制作実績" disabled={currentIndex === 0} onClick={() => move(-1)}>←</button>
          <button type="button" aria-label="次の制作実績" disabled={currentIndex >= maxIndex} onClick={() => move(1)}>→</button>
        </div>
      </div>

      <div ref={trackRef} className={styles.track} tabIndex={0} onScroll={handleScroll} onKeyDown={handleKeyDown} aria-label="制作実績一覧。左右キーまたは横スクロールで移動できます">
        {works.map((work, index) => (
          <div className={styles.slide} data-aisa-work-index={index} role="group" aria-label={`${index + 1} / ${works.length}: ${work.title}`} key={work.title}>
            <article className={pageStyles.workCard} tabIndex={0}>
              {work.image ? (
                <span className={pageStyles.workImage}><Image src={work.image} alt={work.alt} fill sizes="(max-width: 768px) 100vw, 34vw" /></span>
              ) : (
                <span className={`${pageStyles.workImage} ${pageStyles.workPlaceholder}`} role="img" aria-label={work.alt}>
                  <small>{work.visualLabel}</small><i aria-hidden="true" /><b aria-hidden="true" />
                </span>
              )}
              <h3>{work.title}</h3>
              <p>{work.description.split("\n").map((line) => <span key={line}>{line}</span>)}</p>
            </article>
          </div>
        ))}
      </div>

      <div className={styles.progress} role="progressbar" aria-label="制作実績の表示位置" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress * 100)}>
        <span style={{ left: `${indicatorLeft}%`, width: `${indicatorWidth}%` }} />
      </div>
      <div className={styles.dots} aria-label="制作実績を選択">
        {works.map((work, index) => <button key={work.title} type="button" aria-label={`${index + 1}番目の制作実績`} aria-current={currentIndex === index ? "true" : undefined} onClick={() => scrollToIndex(Math.min(index, maxIndex))} />)}
      </div>
      <p className={styles.mobileCount} aria-hidden="true">{currentIndex + 1} / {works.length}</p>
      <p className={styles.srOnly} aria-live="polite">{currentIndex + 1}番目から表示中、全{works.length}件</p>
    </div>
  );
}
