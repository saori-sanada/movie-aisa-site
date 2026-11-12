"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { AisaWorkDetail } from "../data/aisaWorkDetails";
import styles from "./AisaAnalyticsPreview.module.css";

const basePath = process.env.GITHUB_ACTIONS === "true" ? "/movie-aisa-site" : "";

type Preview = NonNullable<AisaWorkDetail["preview"]>;

export function AisaAnalyticsPreview({ preview }: { preview: Preview }) {
  const [activeId, setActiveId] = useState(preview.tabs[0]?.id ?? "");
  const [zoomedTab, setZoomedTab] = useState<Preview["tabs"][number] | null>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const activeTab = preview.tabs.find((tab) => tab.id === activeId) ?? preview.tabs[0];

  useEffect(() => {
    viewportRef.current?.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [activeId]);

  useEffect(() => {
    if (!zoomedTab) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setZoomedTab(null);
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [zoomedTab]);

  if (!activeTab) return null;

  return <section className={styles.shell} aria-label="分析画面プレビュー">
    <div className={styles.headingRow}>
      <div>
        <p className={styles.eyebrow}>SCREEN PREVIEW</p>
        <h2>分析画面を見る</h2>
      </div>
      <span className={styles.badge}>画像プレビュー</span>
    </div>
    <p className={styles.description}>実際のアプリ画面を、タブごとに確認できます。枠内をスクロールしてご覧ください。</p>
    <div className={styles.tabs} role="tablist" aria-label="分析画面の種類">
      {preview.tabs.map((tab) => <button
        key={tab.id}
        type="button"
        role="tab"
        aria-selected={activeTab.id === tab.id}
        aria-controls={`aisa-preview-panel-${tab.id}`}
        className={activeTab.id === tab.id ? styles.tabActive : styles.tab}
        onClick={() => setActiveId(tab.id)}
      >{tab.label}</button>)}
    </div>
    <div
      ref={viewportRef}
      id={`aisa-preview-panel-${activeTab.id}`}
      className={styles.viewport}
      role="tabpanel"
      aria-label={`${activeTab.label}の画像プレビュー`}
    >
      <div className={styles.canvas}>
        <button type="button" className={styles.imageButton} onClick={() => setZoomedTab(activeTab)} aria-label={`${activeTab.label}を拡大表示`}>
          <Image
            unoptimized
            src={`${basePath}${activeTab.src}`}
            alt={activeTab.alt}
            width={activeTab.width}
            height={activeTab.height}
            sizes="(max-width: 900px) 680px, 100vw"
            className={styles.previewImage}
          />
        </button>
      </div>
    </div>
    <p className={styles.hint}>画像をクリックすると拡大表示できます。</p>
    {zoomedTab ? <div className={styles.modalBackdrop} role="presentation" onClick={() => setZoomedTab(null)}>
      <div className={styles.modal} role="dialog" aria-modal="true" aria-label={`${zoomedTab.label}の拡大表示`} onClick={(event) => event.stopPropagation()}>
        <button type="button" className={styles.closeButton} onClick={() => setZoomedTab(null)} aria-label="拡大表示を閉じる">閉じる ×</button>
        <Image
          unoptimized
          src={`${basePath}${zoomedTab.src}`}
          alt={zoomedTab.alt}
          width={zoomedTab.width}
          height={zoomedTab.height}
          sizes="96vw"
          className={styles.modalImage}
        />
      </div>
    </div> : null}
  </section>;
}
