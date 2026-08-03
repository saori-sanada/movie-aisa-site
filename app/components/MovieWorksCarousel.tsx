"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent, type WheelEvent } from "react";
import type { MovieWork } from "../data/movieWorks";
import styles from "./MovieWorksCarousel.module.css";

type WorkStyle = CSSProperties & { "--work-background": string };

function WorkCard({ work }: { work: MovieWork }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoVisible, setVideoVisible] = useState(false);

  const playPreview = async () => {
    const video = videoRef.current;
    if (
      !video ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) return;

    try {
      await video.play();
      setVideoVisible(true);
    } catch {
      setVideoVisible(false);
    }
  };

  const stopPreview = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
    setVideoVisible(false);
  };

  const card = (
    <article
      className={styles.card}
      onMouseEnter={playPreview}
      onMouseLeave={stopPreview}
      style={{ "--work-background": work.backgroundColor } as WorkStyle}
    >
      <div className={styles.media}>
        <Image className={styles.thumbnail} src={work.thumbnail} alt={work.alt} fill draggable={false} sizes="(max-width: 768px) 100vw, (max-width: 1023px) 50vw, 34vw" />
        {work.previewVideo ? (
          <video
            ref={videoRef}
            className={`${styles.preview}${videoVisible ? ` ${styles.previewVisible}` : ""}`}
            src={work.previewVideo}
            muted
            playsInline
            preload="none"
            poster={work.thumbnail}
            onError={() => setVideoVisible(false)}
          />
        ) : null}
      </div>
      <span className={styles.category}>{work.category}</span>
      <h3 className={styles.title}>{work.title}</h3>
    </article>
  );

  return work.detailUrl ? (
    <Link className={styles.cardLink} href={work.detailUrl} aria-label={`${work.title}の詳細を見る`}>
      {card}
    </Link>
  ) : (
    <div className={styles.cardStatic}>{card}</div>
  );
}

export function MovieWorksCarousel({ works }: { works: MovieWork[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const dragRef = useRef<{ pointerId: number; startX: number; startLeft: number } | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [dragging, setDragging] = useState(false);

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const slides = Array.from(track.querySelectorAll<HTMLElement>("[data-work-index]"));
    if (!slides.length) return;

    const step = slides.length > 1 ? slides[1].offsetLeft - slides[0].offsetLeft : slides[0].offsetWidth;
    const nextVisibleCount = Math.max(1, Math.min(works.length, Math.round(track.clientWidth / step)));
    const nextIndex = Math.max(0, Math.min(works.length - nextVisibleCount, Math.round(track.scrollLeft / step)));
    setVisibleCount(nextVisibleCount);
    setCurrentIndex(nextIndex);
    setScrollProgress(track.scrollWidth > track.clientWidth ? track.scrollLeft / (track.scrollWidth - track.clientWidth) : 0);
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
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
  }, []);

  const handleScroll = () => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(measure);
  };

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    const slide = track?.querySelector<HTMLElement>(`[data-work-index="${index}"]`);
    if (!track || !slide) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left: slide.offsetLeft, behavior: reducedMotion ? "auto" : "smooth" });
  };

  const maxIndex = Math.max(0, works.length - visibleCount);
  const move = (direction: -1 | 1) => scrollToIndex(Math.max(0, Math.min(maxIndex, currentIndex + direction)));

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      move(-1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      move(1);
    }
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    dragRef.current = { pointerId: event.pointerId, startX: event.clientX, startLeft: event.currentTarget.scrollLeft };
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    event.preventDefault();
    event.currentTarget.scrollLeft = drag.startLeft - (event.clientX - drag.startX);
  };

  const finishDrag = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const track = event.currentTarget;
    const slides = Array.from(track.querySelectorAll<HTMLElement>("[data-work-index]"));
    const step = slides.length > 1 ? slides[1].offsetLeft - slides[0].offsetLeft : slides[0]?.offsetWidth || 1;
    const target = Math.max(0, Math.min(maxIndex, Math.round(track.scrollLeft / step)));
    if (track.hasPointerCapture(event.pointerId)) track.releasePointerCapture(event.pointerId);
    dragRef.current = null;
    setDragging(false);
    scrollToIndex(target);
  };

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    if (!event.shiftKey || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
    event.preventDefault();
    event.currentTarget.scrollLeft += event.deltaY;
  };

  const progressWidth = visibleCount / works.length * 100;
  const progressLeft = scrollProgress * (100 - progressWidth);
  const rangeEnd = Math.min(works.length, currentIndex + visibleCount);

  return (
    <div className={styles.carousel} aria-roledescription="カルーセル" aria-label="制作実績">
      <div className={styles.headingRow}>
        <div className="movie-design-heading"><span>WORKS</span><h2>制作実績</h2></div>
        <div className={styles.controlGroup}>
          <span className={styles.hint}>DRAG / SCROLL</span>
          <span className={styles.count}>{currentIndex + 1}–{rangeEnd} / {works.length}</span>
          <div className={styles.controls} aria-label="作品の表示操作">
            <button className={styles.arrow} type="button" aria-label="前の作品" disabled={currentIndex === 0} onClick={() => move(-1)}>←</button>
            <button className={styles.arrow} type="button" aria-label="次の作品" disabled={currentIndex >= maxIndex} onClick={() => move(1)}>→</button>
          </div>
        </div>
      </div>

      <div
        ref={trackRef}
        className={`${styles.track}${dragging ? ` ${styles.dragging}` : ""}`}
        role="region"
        aria-label="作品一覧。左右キーでも移動できます"
        tabIndex={0}
        onScroll={handleScroll}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
        onWheel={handleWheel}
        onDragStart={(event) => event.preventDefault()}
      >
        {works.map((work, index) => (
          <div className={styles.slide} data-work-index={index} role="group" aria-label={`${index + 1} / ${works.length}: ${work.title}`} key={work.slug}>
            <WorkCard work={work} />
          </div>
        ))}
      </div>

      <div className={styles.progress} role="progressbar" aria-label="作品一覧の進行位置" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(scrollProgress * 100)}>
        <span className={styles.progressIndicator} style={{ left: `${progressLeft}%`, width: `${progressWidth}%` }} />
      </div>

      <div className={styles.dots} aria-label="作品を選択">
        {works.map((work, index) => (
          <button
            className={`${styles.dot}${currentIndex === index ? ` ${styles.dotActive}` : ""}`}
            type="button"
            aria-label={`${index + 1}番目の作品を表示`}
            aria-current={currentIndex === index ? "true" : undefined}
            onClick={() => scrollToIndex(index)}
            key={work.slug}
          />
        ))}
      </div>
      <p className={styles.mobileCount} aria-hidden="true">{currentIndex + 1} / {works.length}</p>
      <p className={styles.srOnly} aria-live="polite">{currentIndex + 1}番目の作品を表示中、全{works.length}作品</p>
    </div>
  );
}
