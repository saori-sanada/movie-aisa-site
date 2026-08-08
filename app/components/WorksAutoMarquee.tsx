"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  type CSSProperties,
  type FocusEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
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

const COPIES = [0, 1, 2] as const;
const RESUME_DELAY_MS = 850;
const SECONDS_PER_ITEM = 5;

export function WorksAutoMarquee({ items, brand, heading }: WorksAutoMarqueeProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const primaryGroupRef = useRef<HTMLDivElement>(null);
  const loopWidthRef = useRef(0);
  const itemStepRef = useRef(1);
  const frameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const pausedRef = useRef(false);
  const hoveredRef = useRef(false);
  const touchingRef = useRef(false);
  const reducedMotionRef = useRef(false);
  const hoverCapableRef = useRef(false);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearResumeTimer = useCallback(() => {
    if (resumeTimerRef.current !== null) {
      clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
  }, []);

  const setPaused = useCallback((paused: boolean) => {
    pausedRef.current = paused;
    lastTimeRef.current = null;
  }, []);

  const measure = useCallback(() => {
    const viewport = viewportRef.current;
    const group = primaryGroupRef.current;
    if (!viewport || !group || items.length === 0) return;

    const slides = group.querySelectorAll<HTMLElement>("[data-work-slide]");
    const first = slides[0];
    const second = slides[1];
    const step = first
      ? second
        ? second.offsetLeft - first.offsetLeft
        : first.offsetWidth
      : 1;
    const loopWidth = group.offsetWidth;

    itemStepRef.current = Math.max(1, step);
    loopWidthRef.current = loopWidth;

    if (loopWidth > 0 && (viewport.scrollLeft < loopWidth * 0.5 || viewport.scrollLeft >= loopWidth * 2.5)) {
      viewport.scrollLeft = loopWidth;
    }
  }, [items.length]);

  useEffect(() => {
    const viewport = viewportRef.current;
    const group = primaryGroupRef.current;
    if (!viewport || !group) return;

    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(group);
    measure();
    return () => observer.disconnect();
  }, [measure]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hoverMedia = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updateMotionPreference = () => {
      reducedMotionRef.current = media.matches;
      lastTimeRef.current = null;
    };
    const updateHoverCapability = () => {
      hoverCapableRef.current = hoverMedia.matches;
    };
    updateMotionPreference();
    updateHoverCapability();
    media.addEventListener("change", updateMotionPreference);
    hoverMedia.addEventListener("change", updateHoverCapability);

    const tick = (time: number) => {
      const viewport = viewportRef.current;
      const loopWidth = loopWidthRef.current;
      const previousTime = lastTimeRef.current;

      const hovered = Boolean(viewport && hoverCapableRef.current && viewport.matches(":hover"));
      if (viewport && loopWidth > 0 && !pausedRef.current && !hovered && !reducedMotionRef.current && previousTime !== null) {
        const elapsed = Math.min(48, time - previousTime);
        const pixelsPerMillisecond = itemStepRef.current / (SECONDS_PER_ITEM * 1000);
        viewport.scrollLeft += elapsed * pixelsPerMillisecond;

        if (viewport.scrollLeft >= loopWidth * 2) viewport.scrollLeft -= loopWidth;
        if (viewport.scrollLeft < loopWidth * 0.5) viewport.scrollLeft += loopWidth;
      }

      lastTimeRef.current = time;
      frameRef.current = window.requestAnimationFrame(tick);
    };

    frameRef.current = window.requestAnimationFrame(tick);
    return () => {
      media.removeEventListener("change", updateMotionPreference);
      hoverMedia.removeEventListener("change", updateHoverCapability);
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
      clearResumeTimer();
    };
  }, [clearResumeTimer]);

  const pause = () => {
    clearResumeTimer();
    setPaused(true);
  };

  const resumeWhenReady = (delay = 0) => {
    clearResumeTimer();
    resumeTimerRef.current = setTimeout(() => {
      if (!hoveredRef.current && !touchingRef.current) setPaused(false);
    }, delay);
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch" || event.pointerType === "pen") touchingRef.current = true;
    pause();
  };

  const handlePointerEnd = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch" || event.pointerType === "pen") {
      touchingRef.current = false;
      resumeWhenReady(RESUME_DELAY_MS);
    }
  };

  const handleFocus = () => pause();
  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) resumeWhenReady();
  };

  const renderItem = (item: WorksMarqueeItem, copyIndex: number, itemIndex: number) => {
    const isPrimaryCopy = copyIndex === 1;
    const media = item.thumbnail ? (
      <Image
        className={styles.image}
        src={item.thumbnail}
        alt={isPrimaryCopy ? item.alt : ""}
        fill
        draggable={false}
        sizes="(max-width: 768px) 78vw, (max-width: 1100px) 29vw, 380px"
      />
    ) : (
      <span className={styles.placeholder} role={isPrimaryCopy ? "img" : undefined} aria-label={isPrimaryCopy ? item.alt : undefined}>
        <i aria-hidden="true" />
        <b aria-hidden="true" />
      </span>
    );

    const content = (
      <span
        className={styles.media}
        style={{ "--work-background": item.backgroundColor } as MarqueeStyle}
      >
        {media}
      </span>
    );

    return (
      <div className={styles.slide} data-work-slide key={`${copyIndex}-${item.slug}`}>
        {item.detailEnabled && item.detailUrl ? (
          <Link
            className={styles.itemLink}
            href={item.detailUrl}
            aria-label={isPrimaryCopy ? `${item.title}の詳細を見る` : undefined}
            tabIndex={isPrimaryCopy ? 0 : -1}
          >
            {content}
          </Link>
        ) : (
          <span className={styles.itemStatic}>{content}</span>
        )}
        {isPrimaryCopy ? <span className={styles.srOnly}>{itemIndex + 1} / {items.length}: {item.title}</span> : null}
      </div>
    );
  };

  return (
    <div className={`${styles.carousel} ${styles[brand]}`}>
      {heading}
      <div
        ref={viewportRef}
        className={styles.viewport}
        role="region"
        aria-label="制作実績。横方向にスクロールして閲覧できます"
        tabIndex={0}
        onPointerEnter={(event) => {
          if (event.pointerType !== "mouse") return;
          hoveredRef.current = true;
          pause();
        }}
        onPointerLeave={(event) => {
          if (event.pointerType !== "mouse") return;
          hoveredRef.current = false;
          resumeWhenReady();
        }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onFocusCapture={handleFocus}
        onBlurCapture={handleBlur}
      >
        <div className={styles.track}>
          {COPIES.map((copyIndex) => (
            <div
              ref={copyIndex === 1 ? primaryGroupRef : undefined}
              className={styles.group}
              aria-hidden={copyIndex === 1 ? undefined : "true"}
              key={copyIndex}
            >
              {items.map((item, itemIndex) => renderItem(item, copyIndex, itemIndex))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
