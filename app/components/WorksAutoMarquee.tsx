"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, type CSSProperties, type PointerEvent, type ReactNode } from "react";
import styles from "./WorksAutoMarquee.module.css";

export type WorksMarqueeItem = {
  slug: string;
  title: string;
  thumbnail: string | null;
  alt: string;
  detailUrl: string | null;
  detailEnabled: boolean;
  backgroundColor?: string;
};

type MarqueeStyle = CSSProperties & { "--work-background"?: string };

type WorksAutoMarqueeProps = {
  items: readonly WorksMarqueeItem[];
  brand: "movie" | "aisa";
  heading: ReactNode;
};

const SPEED_PX_PER_SECOND = 30;

export function WorksAutoMarquee({ items, brand, heading }: WorksAutoMarqueeProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const firstGroupRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const positionRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const manualResumeTimerRef = useRef<number | null>(null);

  const moveBy = (direction: -1 | 1) => {
    const viewport = viewportRef.current;
    const firstGroup = firstGroupRef.current;
    const firstSlide = firstGroup?.querySelector<HTMLElement>("[data-work-slide]");
    const secondSlide = firstGroup?.querySelector<HTMLElement>("[data-work-slide]:nth-child(2)");
    if (!viewport || !firstSlide) return;
    const step = secondSlide
      ? secondSlide.offsetLeft - firstSlide.offsetLeft
      : firstSlide.offsetWidth;
    pausedRef.current = true;
    if (manualResumeTimerRef.current !== null) window.clearTimeout(manualResumeTimerRef.current);
    viewport.scrollBy({ left: direction * step, behavior: "smooth" });
    const setWidth = firstGroup.scrollWidth || firstGroup.getBoundingClientRect().width;
    manualResumeTimerRef.current = window.setTimeout(() => {
      if (setWidth > 0) {
        if (viewport.scrollLeft >= setWidth) viewport.scrollLeft -= setWidth;
        if (viewport.scrollLeft < 0) viewport.scrollLeft += setWidth;
      }
      positionRef.current = viewport.scrollLeft;
      lastTimeRef.current = null;
      pausedRef.current = false;
      manualResumeTimerRef.current = null;
    }, 500);
  };

  useEffect(() => {
    const viewport = viewportRef.current;
    const firstGroup = firstGroupRef.current;
    if (!viewport || !firstGroup || items.length < 1) return;
    positionRef.current = viewport.scrollLeft;

    const tick = (time: number) => {
      const previous = lastTimeRef.current ?? time;
      const elapsed = Math.min(100, time - previous);
      lastTimeRef.current = time;
      if (!pausedRef.current) {
        const setWidth = firstGroup.scrollWidth || firstGroup.getBoundingClientRect().width;
        if (setWidth > 0) {
          positionRef.current += SPEED_PX_PER_SECOND * (elapsed / 1000);
          while (positionRef.current >= setWidth) positionRef.current -= setWidth;
          viewport.scrollLeft = positionRef.current;
        }
      }
      rafIdRef.current = requestAnimationFrame(tick);
    };
    rafIdRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current);
      if (manualResumeTimerRef.current !== null) window.clearTimeout(manualResumeTimerRef.current);
    };
  }, [items.length]);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") {
      pausedRef.current = true;
      event.currentTarget.setPointerCapture?.(event.pointerId);
    }
  };

  const handlePointerEnd = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") {
      const viewport = viewportRef.current;
      if (viewport) positionRef.current = viewport.scrollLeft;
      lastTimeRef.current = null;
      pausedRef.current = false;
    }
  };

  const renderItem = (item: WorksMarqueeItem, copyIndex: number, itemIndex: number) => {
    const content = (
      <span className={styles.media} style={{ "--work-background": item.backgroundColor } as MarqueeStyle}>
        {item.thumbnail ? (
          <Image className={styles.image} src={item.thumbnail} alt={copyIndex === 0 ? item.alt : ""} fill draggable={false} priority={copyIndex === 0 && itemIndex < 4} sizes="(max-width: 768px) 78vw, (max-width: 1100px) 30vw, 400px" />
        ) : (
          <span className={styles.placeholder} role={copyIndex === 0 ? "img" : undefined} aria-label={copyIndex === 0 ? item.alt : undefined}><i aria-hidden="true" /><b aria-hidden="true" /></span>
        )}
        {brand === "aisa" ? <span className={styles.comingSoon} aria-hidden="true">COMING SOON</span> : null}
        {item.detailEnabled && item.detailUrl ? <span className={styles.detailCue} aria-hidden="true">詳しく見る <span>→</span></span> : null}
      </span>
    );
    return (
      <div className={styles.slide} data-work-slide key={`${copyIndex}-${item.slug}`}>
        {item.detailEnabled && item.detailUrl ? <Link className={styles.itemLink} href={item.detailUrl} aria-label={copyIndex === 0 ? `${item.title}の詳細を見る` : undefined} tabIndex={copyIndex === 0 ? 0 : -1}>{content}</Link> : <span className={styles.itemStatic}>{content}</span>}
      </div>
    );
  };

  return (
    <div className={`${styles.carousel} ${styles[brand]}`}>
      {heading}
      <div className={styles.controls} aria-label="制作実績のスライド操作">
        <button type="button" className={styles.arrow} onClick={() => moveBy(-1)} aria-label="前の作品を見る">←</button>
        <button type="button" className={styles.arrow} onClick={() => moveBy(1)} aria-label="次の作品を見る">→</button>
      </div>
      <div ref={viewportRef} className={styles.viewport} role="region" aria-label={`制作実績カルーセル。全${items.length}作品`} tabIndex={0} onPointerDown={handlePointerDown} onPointerUp={handlePointerEnd} onPointerCancel={handlePointerEnd}>
        <div className={styles.track}>
          <div ref={firstGroupRef} className={styles.group}>{items.map((item, index) => renderItem(item, 0, index))}</div>
          <div className={styles.group} aria-hidden="true">{items.map((item, index) => renderItem(item, 1, index))}</div>
        </div>
      </div>
    </div>
  );
}
