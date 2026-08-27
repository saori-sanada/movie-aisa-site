"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
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
const FIRST_AUTOPLAY_DELAY_MS = 150;
const AUTOPLAY_DELAY_MS = 2500;
const SLIDE_DURATION_MS = 550;
const SWIPE_CLICK_THRESHOLD_PX = 10;
const AUTOPLAY_APPROACH_MARGIN = "0px 0px 40% 0px";

const modulo = (value: number, length: number) => ((value % length) + length) % length;

export function WorksAutoMarquee({ items, brand, heading }: WorksAutoMarqueeProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const primaryGroupRef = useRef<HTMLDivElement>(null);
  const itemStepRef = useRef(1);
  const slideAnimationRef = useRef<Animation | null>(null);
  const autoplayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollEndTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animatingRef = useRef(false);
  const pausedRef = useRef(false);
  const hoveredRef = useRef(false);
  const visibleRef = useRef(false);
  const readyRef = useRef(false);
  const hasStartedAutoplayRef = useRef(false);
  const reducedMotionRef = useRef(false);
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null);
  const pointerMovedRef = useRef(false);
  const suppressClickUntilRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [carouselReady, setCarouselReady] = useState(false);

  const clearAutoplay = useCallback(() => {
    if (autoplayTimerRef.current !== null) {
      clearTimeout(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
  }, []);

  const normalizePosition = useCallback((logicalIndex?: number) => {
    const viewport = viewportRef.current;
    if (!viewport || items.length === 0) return;
    const step = itemStepRef.current;
    const currentAbsolute = Math.round(viewport.scrollLeft / step);
    const logical = logicalIndex ?? modulo(currentAbsolute, items.length);
    viewport.scrollLeft = (items.length + logical) * step;
    setActiveIndex(logical);
  }, [items.length]);

  const scheduleAutoplayRef = useRef<(delay?: number) => void>(() => undefined);

  const animateTo = useCallback((absoluteIndex: number, logicalIndex: number) => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track || !readyRef.current || animatingRef.current || items.length === 0) return;
    clearAutoplay();
    slideAnimationRef.current?.cancel();

    const start = viewport.scrollLeft;
    const target = absoluteIndex * itemStepRef.current;
    const distance = target - start;
    animatingRef.current = true;
    setIsAnimating(true);
    viewport.classList.add(styles.animating);
    const animation = track.animate(
      [
        { transform: "translate3d(0, 0, 0)" },
        { transform: `translate3d(${-distance}px, 0, 0)` },
      ],
      { duration: SLIDE_DURATION_MS, easing: "cubic-bezier(.45, 0, .55, 1)", fill: "forwards" },
    );
    slideAnimationRef.current = animation;
    animation.onfinish = () => {
      viewport.scrollLeft = target;
      animation.cancel();
      slideAnimationRef.current = null;
      animatingRef.current = false;
      setIsAnimating(false);
      viewport.classList.remove(styles.animating);
      normalizePosition(logicalIndex);
      scheduleAutoplayRef.current();
    };
  }, [clearAutoplay, items.length, normalizePosition]);

  const moveBy = useCallback((direction: -1 | 1) => {
    const viewport = viewportRef.current;
    if (!viewport || animatingRef.current || items.length === 0) return;
    const currentAbsolute = Math.round(viewport.scrollLeft / itemStepRef.current);
    const targetAbsolute = currentAbsolute + direction;
    animateTo(targetAbsolute, modulo(targetAbsolute, items.length));
  }, [animateTo, items.length]);

  const moveTo = useCallback((logicalIndex: number) => {
    if (animatingRef.current || items.length === 0) return;
    animateTo(items.length + logicalIndex, logicalIndex);
  }, [animateTo, items.length]);

  const scheduleAutoplay = useCallback((delay = AUTOPLAY_DELAY_MS) => {
    clearAutoplay();
    if (!readyRef.current || !visibleRef.current || pausedRef.current || reducedMotionRef.current || items.length < 2) return;
    autoplayTimerRef.current = setTimeout(() => {
      const viewport = viewportRef.current;
      const hoverCapable = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      if (viewport && hoverCapable && viewport.matches(":hover")) {
        scheduleAutoplayRef.current();
        return;
      }
      moveBy(1);
    }, delay);
  }, [clearAutoplay, items.length, moveBy]);

  useEffect(() => {
    scheduleAutoplayRef.current = scheduleAutoplay;
  }, [scheduleAutoplay]);

  const measure = useCallback(() => {
    const viewport = viewportRef.current;
    const group = primaryGroupRef.current;
    if (!viewport || !group || items.length === 0) return;
    const slides = group.querySelectorAll<HTMLElement>("[data-work-slide]");
    const first = slides[0];
    const second = slides[1];
    itemStepRef.current = Math.max(1, second ? second.offsetLeft - first.offsetLeft : first?.offsetWidth ?? 1);
    normalizePosition(activeIndex);
  }, [activeIndex, items.length, normalizePosition]);

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
    const group = primaryGroupRef.current;
    if (!group || readyRef.current) return;
    let cancelled = false;
    const prepareCarousel = async () => {
      const initialImages = Array.from(group.querySelectorAll("img")).slice(0, Math.min(4, items.length));
      await Promise.all(initialImages.map(async (image) => {
        if (!image.complete) {
          await new Promise<void>((resolve) => {
            image.addEventListener("load", () => resolve(), { once: true });
            image.addEventListener("error", () => resolve(), { once: true });
          });
        }
        await image.decode?.().catch(() => undefined);
      }));
      await document.fonts?.ready;
      await new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
      if (cancelled) return;
      measure();
      readyRef.current = true;
      setCarouselReady(true);
      if (visibleRef.current) {
        const delay = hasStartedAutoplayRef.current ? AUTOPLAY_DELAY_MS : FIRST_AUTOPLAY_DELAY_MS;
        hasStartedAutoplayRef.current = true;
        scheduleAutoplayRef.current(delay);
      }
    };
    void prepareCarousel();
    return () => { cancelled = true; };
  }, [items.length, measure]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => {
      reducedMotionRef.current = motion.matches;
      scheduleAutoplayRef.current();
    };
    const trackMousePosition = (event: globalThis.PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const viewport = viewportRef.current;
      if (!viewport) return;
      const rect = viewport.getBoundingClientRect();
      const isInside = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
      if (isInside === hoveredRef.current) return;
      hoveredRef.current = isInside;
      if (isInside) {
        pausedRef.current = true;
        clearAutoplay();
      } else if (!viewport.contains(document.activeElement)) {
        pausedRef.current = false;
        scheduleAutoplayRef.current();
      }
    };
    updateMotion();
    motion.addEventListener("change", updateMotion);
    document.addEventListener("pointermove", trackMousePosition);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting;
      if (!entry.isIntersecting) {
        clearAutoplay();
        return;
      }
      if (!readyRef.current) return;
      const delay = hasStartedAutoplayRef.current ? AUTOPLAY_DELAY_MS : FIRST_AUTOPLAY_DELAY_MS;
      hasStartedAutoplayRef.current = true;
      scheduleAutoplayRef.current(delay);
    }, { rootMargin: AUTOPLAY_APPROACH_MARGIN, threshold: 0.01 });
    visibilityObserver.observe(viewport);
    return () => {
      motion.removeEventListener("change", updateMotion);
      document.removeEventListener("pointermove", trackMousePosition);
      visibilityObserver.disconnect();
      clearAutoplay();
      if (scrollEndTimerRef.current !== null) clearTimeout(scrollEndTimerRef.current);
      slideAnimationRef.current?.cancel();
    };
  }, [clearAutoplay, scheduleAutoplay]);

  const handleScroll = () => {
    if (animatingRef.current || items.length === 0) return;
    const viewport = viewportRef.current;
    if (!viewport) return;
    const logical = modulo(Math.round(viewport.scrollLeft / itemStepRef.current), items.length);
    setActiveIndex(logical);
    if (scrollEndTimerRef.current !== null) clearTimeout(scrollEndTimerRef.current);
    scrollEndTimerRef.current = setTimeout(() => {
      normalizePosition(logical);
      scheduleAutoplay();
    }, 180);
  };

  const pause = () => {
    pausedRef.current = true;
    clearAutoplay();
  };

  const resume = () => {
    pausedRef.current = false;
    scheduleAutoplay();
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse") return;
    pointerStartRef.current = { x: event.clientX, y: event.clientY };
    pointerMovedRef.current = false;
    pause();
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse") {
      pause();
      return;
    }
    const start = pointerStartRef.current;
    if (!start) return;
    if (Math.hypot(event.clientX - start.x, event.clientY - start.y) > SWIPE_CLICK_THRESHOLD_PX) {
      pointerMovedRef.current = true;
    }
  };

  const handlePointerEnd = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse") return;
    if (pointerMovedRef.current) suppressClickUntilRef.current = Date.now() + 400;
    pointerStartRef.current = null;
    resume();
  };

  const handleClickCapture = (event: MouseEvent<HTMLDivElement>) => {
    if (pointerMovedRef.current || Date.now() < suppressClickUntilRef.current) {
      event.preventDefault();
      event.stopPropagation();
    }
    pointerMovedRef.current = false;
  };

  const handleFocus = () => pause();
  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) resume();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      moveBy(-1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      moveBy(1);
    }
  };

  const renderItem = (item: WorksMarqueeItem, copyIndex: number, itemIndex: number) => {
    const isPrimaryCopy = copyIndex === 1;
    const isInitialThumbnail = isPrimaryCopy && itemIndex < 4;
    const media = item.thumbnail ? (
      <Image
        className={styles.image}
        src={item.thumbnail}
        alt={isPrimaryCopy ? item.alt : ""}
        fill
        draggable={false}
        priority={isInitialThumbnail}
        sizes="(max-width: 768px) 78vw, (max-width: 1100px) 30vw, 400px"
      />
    ) : (
      <span className={styles.placeholder} role={isPrimaryCopy ? "img" : undefined} aria-label={isPrimaryCopy ? item.alt : undefined}>
        <i aria-hidden="true" />
        <b aria-hidden="true" />
      </span>
    );

    const content = (
      <span className={styles.media} style={{ "--work-background": item.backgroundColor } as MarqueeStyle}>
        {media}
        {brand === "aisa" ? <span className={styles.comingSoon} aria-hidden="true">COMING SOON</span> : null}
        {item.detailEnabled && item.detailUrl ? <span className={styles.detailCue} aria-hidden="true">詳しく見る <span>→</span></span> : null}
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
    <div className={`${styles.carousel} ${styles[brand]}`} data-carousel-ready={carouselReady} aria-busy={!carouselReady}>
      {heading}
      <div className={styles.controls} aria-label="制作実績のスライド操作">
        <button type="button" className={styles.arrow} onClick={() => moveBy(-1)} disabled={isAnimating} aria-label="前の作品を見る">←</button>
        <button type="button" className={styles.arrow} onClick={() => moveBy(1)} disabled={isAnimating} aria-label="次の作品を見る">→</button>
      </div>
      <div
        ref={viewportRef}
        className={styles.viewport}
        role="region"
        aria-label={`制作実績カルーセル。全${items.length}作品中${activeIndex + 1}作品目`}
        tabIndex={0}
        onScroll={handleScroll}
        onMouseEnter={() => { hoveredRef.current = true; pause(); }}
        onMouseLeave={() => { hoveredRef.current = false; resume(); }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onClickCapture={handleClickCapture}
        onFocusCapture={handleFocus}
        onBlurCapture={handleBlur}
        onKeyDown={handleKeyDown}
      >
        <div ref={trackRef} className={styles.track}>
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
      <div className={styles.dots} role="group" aria-label="作品位置">
        {items.map((item, index) => (
          <button
            type="button"
            className={`${styles.dot}${index === activeIndex ? ` ${styles.activeDot}` : ""}`}
            aria-label={`${index + 1}作品目へ移動`}
            aria-current={index === activeIndex ? "true" : undefined}
            onClick={() => moveTo(index)}
            disabled={isAnimating}
            key={item.slug}
          />
        ))}
      </div>
      <p className={styles.status} aria-live="polite">{items.length}作品中 {activeIndex + 1}作品目</p>
    </div>
  );
}
