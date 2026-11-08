import Image from "next/image";
import Link from "next/link";
import { aisaWorkDetails, type AisaWorkDetail } from "../data/aisaWorkDetails";
import styles from "../aisa/AisaWorkDetail.module.css";

const basePath = process.env.GITHUB_ACTIONS === "true" ? "/movie-aisa-site" : "";

export function AisaWorkDetailPage({ work }: { work: AisaWorkDetail }) {
  const mediaClass = work.mediaType === "image"
    ? "movie-work-detail-video-wrap movie-work-detail-image-wrap movie-work-detail-media-16-9"
    : "movie-work-detail-video-wrap movie-work-detail-media-16-9";

  const usesAisaLavenderTheme = work.slug === "ai-promotion-video" || work.slug === "supervision-mail" || work.slug === "video-auto-edit" || work.slug === "ai-site-production" || work.slug === "interview-booking";
  const titleLines = work.titleLines ?? [work.title];

  return <div className={`${usesAisaLavenderTheme ? styles.aisaPromotionPage : ""} movie-work-detail-page`}>
    <main className="movie-work-detail">
      <Link href="/aisa#works" className="movie-work-detail-back-link">← WORKSへ戻る</Link>
      <div className="movie-work-detail-grid">
        <div className={work.slug === "video-auto-edit" ? styles.videoAutoEditMediaColumn : undefined}>
        <figure className={mediaClass}>
          {work.mediaType === "image" ? <Image unoptimized src={`${basePath}${work.media}`} alt={work.title} width={864} height={496} /> : work.media ? <video controls playsInline preload="metadata" poster={work.poster ? `${basePath}${work.poster}` : undefined}><source src={`${basePath}${work.media}`} type="video/mp4" />お使いのブラウザでは動画を再生できません。</video> : <div className={styles.videoPlaceholder} role="img" aria-label={`${work.title}の紹介動画は準備中です`}>{work.poster ? <Image unoptimized src={`${basePath}${work.poster}`} alt="" fill sizes="(max-width: 900px) 100vw, 65vw" className={styles.videoPlaceholderPoster} /> : null}<div className={styles.videoPlaceholderOverlay}><span>INTRODUCTION VIDEO</span><strong>紹介動画を準備中</strong></div></div>}
        </figure>
        {work.slug === "video-auto-edit" && work.fullMedia ? <section className={styles.videoAutoEditFullVideo}>
          <h2>完成動画</h2>
          <p>実際に自動編集で制作した完成動画です。</p>
          <div className="movie-work-detail-video-wrap movie-work-detail-media-16-9">
            <video controls playsInline preload="metadata" poster={work.fullPoster ? `${basePath}${work.fullPoster}` : undefined}><source src={`${basePath}${work.fullMedia}`} type="video/mp4" />お使いのブラウザでは動画を再生できません。</video>
          </div>
        </section> : null}
        </div>
        <aside className="movie-work-detail-info">
          <p className="movie-work-detail-category">{work.category}</p>
          <h1 className={work.slug === "ai-promotion-video" ? styles.aiPromotionTitle : undefined}>{titleLines.map((line) => <span className={styles.aisaTitleLine} key={line}>{line}</span>)}</h1>
          <p className="movie-work-detail-subtitle">{work.subtitle}</p>
          <section><p className="movie-work-detail-label">ABOUT</p><p className="movie-work-detail-summary">{work.about}</p></section>
          {work.features?.length ? <section><p className="movie-work-detail-label">FUNCTIONS</p><ul className={styles.featureList}>{work.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></section> : null}
          <section><p className="movie-work-detail-label">ROLE</p><p className="movie-work-detail-role">{work.role}</p></section>
          {work.tools.length ? <section><p className="movie-work-detail-label">TOOLS</p><div className="movie-work-detail-tool-list">{work.tools.map((tool) => <span key={tool.name}><strong>{tool.name}</strong><small>{tool.detail}</small></span>)}</div></section> : null}
        </aside>
      </div>
    </main>
  </div>;
}

export function getAisaWorkDetail(slug: string) { return aisaWorkDetails[slug as keyof typeof aisaWorkDetails]; }
