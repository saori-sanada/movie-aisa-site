import Image from "next/image";
import Link from "next/link";
import { aisaWorkDetails, type AisaWorkDetail } from "../data/aisaWorkDetails";
import styles from "../aisa/AisaWorkDetail.module.css";

const basePath = process.env.GITHUB_ACTIONS === "true" ? "/movie-aisa-site" : "";

export function AisaWorkDetailPage({ work }: { work: AisaWorkDetail }) {
  const mediaClass = work.mediaType === "image"
    ? "movie-work-detail-video-wrap movie-work-detail-image-wrap movie-work-detail-media-16-9"
    : "movie-work-detail-video-wrap movie-work-detail-media-16-9";

  const usesAisaLavenderTheme = work.slug === "ai-promotion-video" || work.slug === "supervision-mail" || work.slug === "video-auto-edit" || work.slug === "ai-site-production";
  const titleLines = work.titleLines ?? [work.title];

  return <div className={`${usesAisaLavenderTheme ? styles.aisaPromotionPage : ""} movie-work-detail-page`}>
    <main className="movie-work-detail">
      <Link href="/aisa#works" className="movie-work-detail-back-link">← WORKSへ戻る</Link>
      <div className="movie-work-detail-grid">
        <div className={work.slug === "video-auto-edit" ? styles.videoAutoEditMediaColumn : undefined}>
        <figure className={mediaClass}>
          {work.mediaType === "image" ? <Image unoptimized src={`${basePath}${work.media}`} alt={work.title} width={864} height={496} /> : <video controls playsInline preload="metadata" poster={work.poster ? `${basePath}${work.poster}` : undefined}><source src={`${basePath}${work.media}`} type="video/mp4" />お使いのブラウザでは動画を再生できません。</video>}
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
          <section><p className="movie-work-detail-label">ROLE</p><p className="movie-work-detail-role">{work.role}</p></section>
          <section><p className="movie-work-detail-label">TOOLS</p><div className="movie-work-detail-tool-list">{work.tools.map((tool) => <span key={tool.name}><strong>{tool.name}</strong><small>{tool.detail}</small></span>)}</div></section>
        </aside>
      </div>
    </main>
  </div>;
}

export function getAisaWorkDetail(slug: string) { return aisaWorkDetails[slug as keyof typeof aisaWorkDetails]; }
